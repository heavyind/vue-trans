

export default (Vue, cfg) => {
  const RouterView = Vue.component("router-view");
  return {
    name: "TransRouterView",
    computed: {
      routeDuration () {
        return this.$store.getters[`${cfg.storeNamespace}/routeDuration`];
      }
    },
    methods: {
      transHide () {
        this.$store.dispatch(`${cfg.storeNamespace}/hide`); 
      },
      transShow () {
        this.$store.dispatch(`${cfg.storeNamespace}/show`);
      },
      transReset () {
        this.$store.dispatch(`${cfg.storeNamespace}/resetNavigation`);
      },
      beforeLeave () {
        this.transHide();
      },
      beforeEnter () {
        this.transShow();
        this.transReset();
      }
    },
    render (h) {
      const data = {
        props: {
          mode: "out-in",
          duration: this.routeDuration
        },
        on: {
          beforeLeave: this.beforeLeave,
          beforeEnter: this.beforeEnter
        }
      };
      return h("transition", data, [h("router-view")]);
    }
  };
};
