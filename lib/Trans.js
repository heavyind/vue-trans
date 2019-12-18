import { transProps } from "../util/transProps";
import { normalizeTime, find } from "../util/helpers";


export default (Vue, cfg) => {
  return {
    name: "Trans",
    mixins: [transProps],
    computed: {
      transShow () {
        return this.$store.state[cfg.storeNamespace].show;
      },
      transShowOnce () {
        return this.$store.state[cfg.storeNamespace].initFlag;
      },
      _state () {
        const transShouldShow = this.state !== null ? this.state : this.transShow;
        return this.initOnly === true ? this.transShowOnce : transShouldShow;
      },
      appear () {
        return !this.initOnly;
      },
      to () {
        return this.$store.state[cfg.storeNamespace].route.to;
      },
      from () {
        return this.$store.state[cfg.storeNamespace].route.from;
      },
      override () {
        if (!this.to || !this.from) { return this.name; }
        if (this.overrides && this.overrides.length > 0) {
          const firstMatch = find((o) => o.match(this.to, this.from), this.overrides);
          if (firstMatch) {
            return firstMatch.trans;
          } 
        }
        return undefined;
      },
      _name () {
        if (this.override) { return this.override.name; }
        return this.name;
      }
    },
    methods: {
      normalizeTime,
      registerDuration (d) {
        this.$store.dispatch(`${cfg.storeNamespace}/registerDuration`, d);
      },
      toMilliseconds (type, d) {
        return typeof d === "number" ? d : d[type];
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
          const delay = typeof this.delay === "number" ? this.delay : this.delay.enter;
          this.attachDelay(el, delay);
        }
        // This desperately needs to be refactored. There should internally be the idea of a "transition object"
        // that all this information is recorded to before being passed along for real, rather than attaching
        // all this information to the instance and then altering it.

        // Enter duration
        if (this.override && this.override.duration) {
          this.attachDuration(el, this.toMilliseconds("enter", this.override.duration));
        } else if (this.duration) {
          this.attachDuration(el, this.toMilliseconds("enter", this.duration));
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

        // Leave delay
        if (this.override && this.override.delay) {
          this.attachDelay(el, this.toMilliseconds("leave", this.override.delay));
        } else if (this.delay !== null) {
          this.attachDelay(el, this.toMilliseconds("leave", this.delay));
        }

        // Leave duration
        if (!this.override) {
          // Because attaching explicit leave/enter handles both cases
          // Attaching a raw integer handles both cases
          // But specifying a particular route only handles one, then the duration dangles
          // on beforeLeave, causing a page delay for no reason
          this.attachDuration(el, 0);
        }

        if (this.override && this.override.duration) {
          this.attachDuration(el, this.toMilliseconds("leave", this.override.duration));
        } else if (this.duration) {
          this.attachDuration(el, this.toMilliseconds("leave", this.duration));
        } 

        // Leave easing
        if (this.easing !== null) {
          const easing = typeof this.easing === "string" ? this.easing : this.easing.leave;
          this.attachEasing(el, easing);
        }

        // Callback
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
            if (!this.initOnly) {
              this.registerDuration(normalizedDur + normalizedDel);
            }
          };
          Vue.nextTick(f);
        }
      }
    },
    render (h) {
      const duration = this.keepAlive !== null ? this.keepAlive : undefined;
      const tData = {
        attrs: {
          name: this._name,
          duration
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
                value: this._state,
                expression: ""
              }
            ]
          },
          this.$slots.default
        )
      ]);
    },
    mounted () {
      const calcOverrides = this.override;
    }
  };
};
