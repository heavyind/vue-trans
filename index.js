import transStore from "./lib/store";
import Trans from "./lib/Trans";
import TransLink from "./lib/TransLink";
import TransRouterView from "./lib/TransRouterView";
import transProps from "./util/transProps";
import cfgDefault from "./util/config";
import * as e from "./util/e";


export default {
  install(Vue, _cfg) {

    if (typeof _cfg === "undefined") {
      throw new Error(e.cfgUndefined);
    }

    if (typeof _cfg.store === "undefined") {
      throw new Error(e.storeUndefined);
    }

    const cfg = { ...cfgDefault, ..._cfg };

    cfg.store.registerModule(cfg.storeNamespace, transStore);

    Vue.mixin({
      computed: {
        [`${cfg.mixinNamespace}`] () {
          return {
            initialize: () => {
              cfg.store.dispatch(`${cfg.storeNamespace}/initialize`);
            }
          };
        }
      }
    });

    Vue.component(cfg.transComponentName, Trans(Vue));
    Vue.component(cfg.transLinkComponentName, TransLink(Vue));
    Vue.component(cfg.transRouterViewComponentName, TransRouterView(Vue));
  },

  // For convenience
  transProps
};
