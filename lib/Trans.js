import transProps from "../util/transProps";
import { normalizeTime } from "../util/helpers";


export default (Vue) => {
  return {
    name: "component-trans",
    mixins: [transProps],
    computed: {
      transShow () {
        return this.$store.state.trans.show;
      },
      transShowOnce () {
        return this.$store.state.trans.initFlag;
      },
      state () {
        return this.initOnly === true ? this.transShowOnce : this.transShow;
      },
      appear () {
        return !this.initOnly;
      }
    },
    methods: {
      normalizeTime,
      registerDuration (d) {
        this.$store.dispatch("trans/registerDuration", d);
      },
      attachDuration (el, duration) {
        el.style.transitionDuration = `${duration}ms`;
      },
      attachDelay (el, delay) {
        el.style.transitionDelay = `${delay}ms`;
      },
      attachEasing (el, e) {
        el.style.transitionTimingFunction = e;
      },
      _beforeEnter (el) {
        if (this.delay !== null) {
          console.log("The delay is", this.delay);
          const delay = typeof this.delay === "number" ? this.delay : this.delay.enter;
          this.attachDelay(el, delay);
        }
        if (this.duration !== null) {
          const duration = typeof this.duration === "number" ? this.duration : this.duration.enter;
          this.attachDuration(el, duration);
        }
        if (this.easing !== null) {
          const easing = typeof this.easing === "string" ? this.easing : this.easing.enter;
          this.attachEasing(el, easing);
        }
        if (this.beforeEnter) { this.beforeEnter(); }
      },
      _enter () {
        if (this.enter) { this.enter(); }
      },
      _afterEnter () {
        if (this.afterEnter) { this.afterEnter(); }
      },
      _enterCancelled () {
        if (this.enterCancelled) { this.enterCancelled(); }
      },
      _beforeLeave (el) {
        if (this.delay !== null) {
          const delay = typeof this.delay === "number" ? this.delay : this.delay.leave;
          this.attachDelay(el, delay);
        }
        if (this.duration !== null) {
          const duration = typeof this.duration === "number" ? this.duration : this.duration.leave;
          this.attachDuration(el, duration);
        }
        if (this.easing !== null) {
          const easing = typeof this.easing === "string" ? this.easing : this.easing.leave;
          this.attachEasing(el, easing);
        }
        if (this.beforeLeave) { this.beforeLeave(); }
      },
      _leave () {
        if (this.leave) { this.leave(); }
      },
      _afterLeave () {
        if (this.afterLeave) { this.afterLeave(); }
      },
      _leaveCancelled () {
        if (this.leaveCancelled) { this.leaveCancelled(); }
      }
    },
    watch: {
      transShow (b) {
        if (!b) {
          const f = () => {
            const computedDur = window.getComputedStyle(this.$refs.el).transitionDuration;
            const computedDel = window.getComputedStyle(this.$refs.el).transitionDelay;
            const normalizedDur = this.normalizeTime(computedDur);
            const normalizedDel = this.normalizeTime(computedDel);
            this.registerDuration(normalizedDur + normalizedDel);
          };
          // Likely prefer to run immediately
          Vue.nextTick(f);
        }
      }
    },
    render (h) {
      const tData = {
        attrs: {
          name: this.name
        },
        props: {
          appear: this.appear
        },
        on: {
          beforeEnter: this._beforeEnter,
          enter: this._enter,
          afterEnter: this._afterEnter,
          enterCancelled: this._enterCancelled,
          beforeLeave: this._beforeLeave,
          leave: this._leave,
          afterLeave: this._afterLeave,
          leaveCancelled: this._leaveCancelled
        }
      };
      return h("transition", tData, [
        h(
          "div",
          {
            ref: "el",
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: this.state,
                expression: ""
              }
            ]
          },
          this.$slots.default
        )
      ]);
    }
  };
};
