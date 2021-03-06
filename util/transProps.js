

export const transProps = {
  props: {
    name: {
      type: String,
      required: false
    },
    overrides: {
      type: Array,
      required: false,
      default: () => []
    },
    state: {
      type: Boolean,
      required: false,
      default: null
    },
    keepAlive: {
      type: Number,
      required: false,
      default: null
    },
    initOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    delay: {
      type: [Number, Object],
      required: false,
      default: null
    },
    duration: {
      type: [Number, Object],
      required: false,
      default: null
    },
    easing: {
      type: [String, Object],
      required: false,
      default: null
    },
    beforeEnter: {
      type: Function,
      required: false
    },
    enter: {
      type: Function,
      required: false
    },
    afterEnter: {
      type: Function,
      required: false
    },
    enterCancelled: {
      type: Function,
      required: false
    },
    beforeLeave: {
      type: Function,
      required: false
    },
    leave: {
      type: Function,
      required: false
    },
    afterLeave: {
      type: Function,
      required: false
    },
    leaveCancelled: {
      type: Function,
      required: false
    }
  }
};
