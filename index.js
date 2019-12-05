import transStore from "./lib/store";
import Trans from "./lib/Trans";
import TransLink from "./lib/TransLink";
import TransRouterView from "./lib/TransRouterView";
export { default as transProps } from "./lib/mixinTransProps";


export default {
  install(Vue, store) {

    if (store === undefined) {
      throw new Error("Trans depends on Vuex. Please pass a store into the plugin.");
    }

    store.registerModule("trans", transStore);

    Vue.mixin({
      methods: {
        transInitialize: () => store.dispatch("trans/initialize")
      } 
    });

    Vue.component("trans", Trans(Vue));
    Vue.component("trans-link", TransLink(Vue));
    Vue.component("trans-router-view", TransRouterView(Vue));
  }
};
