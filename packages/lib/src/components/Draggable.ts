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
  setup(props, { slots }) {
    return () => {
      const tagProps = getTagProps(props, constants.wrapperClass);
      return h(
        tagProps.value,
        {
          ...tagProps.props,
          ...props,
        },
        slots.default?.()
      );
    }
  }
});