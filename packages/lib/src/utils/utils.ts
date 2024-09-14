export type TagProps = {
  value: string;
  props: Record<string, any>;
};

/**
 * Checks if tag or tag.value (ref) is string function or object
 * @param {*} tag
 * @returns boolean
 */
export function validateTagProp (tag: TagProps): boolean {
    if (tag) {
      if (typeof tag === 'string') return true;
      if (typeof tag === 'object') {
        if (
          typeof tag.value === 'string' ||
          typeof tag.value === 'function' ||
          typeof tag.value === 'object'
        ) {
          return true;
        }
      }
      return false;
    }
    return true;
  }
  
  export function getTagProps (props: any, tagClasses?: string): TagProps {
    const tag = props.tag;
    if (tag) {
      if (typeof tag === 'string') {
        const result: TagProps = { value: tag, props: {} };
        if (tagClasses) {
          result.props = { class: tagClasses };
        }
        return result;
      } else if (typeof tag === 'object') {
        const result: TagProps = { value: tag.value || 'div', props: tag.props || {} };
        if (tagClasses) {
          if (result.props.class) {
            if (Array.isArray(result.props.class)) {
              result.props.class.push(tagClasses);
            } else {
              result.props.class = [tagClasses, result.props.class];
            }
          } else {
            result.props.class = tagClasses;
          }
        }
        return result;
      }
    }
    return { value: 'div', props: {} };
  }
  