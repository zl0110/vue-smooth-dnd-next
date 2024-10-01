import { defineComponent, h, ref, onMounted, onUnmounted, PropType } from 'vue';
import { smoothDnD, dropHandlers, ContainerOptions } from 'smooth-dnd-next';
import { getTagProps, validateTagProp } from '../utils/utils';

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler;
smoothDnD.wrapChild = false;

const eventEmitterMap = {
  'drag-start': 'onDragStart',
  'drag-end': 'onDragEnd',
  'drop': 'onDrop',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drop-ready': 'onDropReady'
} as const;

export default defineComponent({
  name: 'Container',
  props: {
    orientation: { type: String, default: 'vertical' },
    removeOnDropOut: { type: Boolean, default: false },
    autoScrollEnabled: { type: Boolean, default: true },
    animationDuration: { type: Number, default: 250 },
    behaviour: String as PropType<ContainerOptions['behaviour']>,
    groupName: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    lockAxis: String as PropType<ContainerOptions['lockAxis']>,
    dragClass: String,
    dropClass: String,
    dragBeginDelay: Number,
    getChildPayload: Function as PropType<ContainerOptions['getChildPayload']>,
    shouldAnimateDrop: Function as PropType<ContainerOptions['shouldAnimateDrop']>,
    shouldAcceptDrop: Function as PropType<ContainerOptions['shouldAcceptDrop']>,
    getGhostParent: Function as PropType<ContainerOptions['getGhostParent']>,
    dropPlaceholder: [Object, Boolean] as PropType<ContainerOptions['dropPlaceholder']>,
    tag: {
      validator: validateTagProp,
      default: 'div',
    }
  },
  emits: ['drop', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drop-ready' ],
  setup(props, { emit, slots }) {
    const containerRef = ref<HTMLElement | null>(null);
    let container: ReturnType<typeof smoothDnD> | null = null;

    onMounted(() => {
      const options: ContainerOptions = { ...props } as ContainerOptions;
      
      // 修改这部分代码
      for (const [eventName, optionKey] of Object.entries(eventEmitterMap)) {
        options[optionKey] = ((eventProps: any) => {
          emit(eventName as keyof typeof eventEmitterMap, eventProps);
        }) as any;
      }

      if (containerRef.value) {
        container = smoothDnD(containerRef.value, options);
      }
    });

    onUnmounted(() => {
      if (container) {
        try {
          container.dispose();
        } catch {
          console.error('Error disposing container');
        }
      }
    });

    const tagProps = getTagProps(props);

    return () => h(
      tagProps.value,
      {
        ...tagProps.props,
        ...props,
        ref: containerRef
      },
      slots.default!()
    );
  }
});
