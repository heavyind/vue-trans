

export default (Vue) => {
  const RouterView = Vue.component("router-view");
  return {
    name: "trans-router-view",
    computed: {
      routeDuration () {
        return this.$store.getters["trans/routeDuration"];
      }
    },
    methods: {
      transHide () {
        this.$store.dispatch("trans/hide"); 
      },
      transShow () {
        this.$store.dispatch("trans/show");
      },
      transReset () {
        this.$store.dispatch("trans/resetNavigation");
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
