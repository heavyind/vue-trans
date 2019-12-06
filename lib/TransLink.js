

export default (Vue) => {
  return {
    props: {
      to: {
        required: true,
        type: String
      },
      duration: {
        required: false,
        type: [Number, null],
        default: null
      },
      activeClass: {
        type: String,
        required: false,
        default: "trans-link-active"
      }
    },
    computed: {
      isExact () {
        return this.$route.path === this.to ? true : false;
      },
      classes () {
        return {
          [this.activeClass]: this.isExact
        };  
      }
    },
    methods: {
      transHide () {
        this.$store.dispatch("trans/hide");
      },
      setExplicitDuration (d) {
        this.$store.dispatch("trans/setExplicitDuration", d);
      },
      handleClick(e) {
        e.preventDefault();
        if (this.duration !== null) {
          this.setExplicitDuration(this.duration);
        }
        if (this.to !== this.$route.path) {
          // Likely move transHide out of nextTick
          Vue.nextTick(() => {
            this.transHide();
            this.$router.push(this.to);
          });
        } 
      }
    },
    render (h) {
      const data = {
        class: this.classes,
        attrs: {
          href: this.to
        },
        on: {
          click: this.handleClick
        }
      };
      return h("a", data, this.$slots.default);
    }
  };
};
