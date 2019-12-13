
var PageHome = {
  template: "<div><trans name='fifo' :duration='1500'>Home</trans></div>"
};

var PageAbout = {
  template: "<div><trans name='fifo' :duration='1500'>About</trans></div>"
};

var routes = [
  { path: "/", component: PageHome },
  { path: "/about", component: PageAbout }
]

var router = new VueRouter({ routes });
var store = new Vuex.Store({});

Vue.use(VueTrans, { store, mixin: true });

new Vue({
  el: "#app",
  mounted () {
    this.$trans.initialize();
  },
  store,
  router
})
