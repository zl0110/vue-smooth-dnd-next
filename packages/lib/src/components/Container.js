import { defineComponent, h, ref, onMounted, onUnmounted } from 'vue';
import { smoothDnD, dropHandlers } from 'smooth-dnd-next';
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
};

export default defineComponent({
  name: 'Container',
  props: {
    orientation: { type: String, default: 'vertical' },
    removeOnDropOut: { type: Boolean, default: false },
    autoScrollEnabled: { type: Boolean, default: true },
    animationDuration: { type: Number, default: 250 },
    behaviour: String,
    groupName: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    dragBeginDelay: Number,
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    getGhostParent: Function,
    dropPlaceholder: [Object, Boolean],
    tag: {
      validator: validateTagProp,
      default: 'div',
    }
  },
  emits: ['drop', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drop-ready' ],
  setup(props, { emit, slots }) {
    const containerRef = ref(null);
    let container = null;

    onMounted(() => {
      const options = { ...props };
      for (const key in eventEmitterMap) {
        options[eventEmitterMap[key]] = (eventProps) => {
          emit(key, eventProps);
        };
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
          // ignore
        }
      }
    });

    const tagProps = getTagProps(props.tag);

    return () => h(
      tagProps.value,
      {
        ...props,
        ref:containerRef
      },
      slots.default()
    );
  }
});
