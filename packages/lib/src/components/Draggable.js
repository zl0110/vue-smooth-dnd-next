import { defineComponent, h } from 'vue';
import { constants } from 'smooth-dnd-next';
import { getTagProps, validateTagProp } from '../utils/utils';

export default defineComponent({
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div'
    },
  },
  setup(props, {slots}) {
    return () => {
      //wrap child
      const tagProps = getTagProps(props.tag, constants.wrapperClass);
      return h(
          tagProps.value,
          props,
          slots.default()
      );
    }
  }
});
