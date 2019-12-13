import Trans from "./lib/Trans";
import TransLink from "./lib/TransLink";
import TransRouterView from "./lib/TransRouterView";
import { transStore } from "./lib/store";
import { transProps } from "./util/transProps";
import { cfgDefault } from "./util/config";
import { createTransMixin } from "./lib/mixin";
import * as e from "./util/e";


export default {
  install(Vue, _cfg) {

    if (typeof _cfg === "undefined") {
      throw new Error(e.cfgUndefined);
    }

    if (typeof _cfg.store === "undefined") {
      throw new Error(e.cfgStoreUndefined);
    }

    if (typeof _cfg.router === "undefined") {
      throw new Error(e.cfgRouterUndefined);
    }

    const cfg = { ...cfgDefault, ..._cfg };

    const store = cfg.store;
    const router = cfg.router;

    store.registerModule(cfg.storeNamespace, transStore);

    cfg.router.beforeEach((to, from, next) => {
      store.dispatch(`${cfg.storeNamespace}/hide`);
      next();
    });

    if (cfg.mixin) {
      Vue.mixin(createTransMixin(cfg));
    }

    Vue.component(cfg.transComponentName, Trans(Vue, cfg));
    Vue.component(cfg.transLinkComponentName, TransLink(Vue, cfg));
    Vue.component(cfg.transViewComponentName, TransRouterView(Vue, cfg));
  },

  // For convenience
  transProps,
  createTransMixin
};
