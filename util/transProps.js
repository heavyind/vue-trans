

export default {
  props: {
    name: {
      type: String,
      required: false
    },
    initOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    delay: {
      type: [Number, Object, null],
      required: false,
      default: null
    },
    duration: {
      type: [Number, Object, null],
      required: false,
      default: null
    },
    easing: {
      type: [String, Object, null],
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
