

const state = {
  show: false,
  initFlag: false,
  explicitDuration: null,
  durationRegister: []
};

const mutations = {

  _show (state) {
    state.show = true;
  },

  _hide (state) {
    state.show = false;
  },

  _triggerInitFlag (state) {
    state.initFlag = true;
  },

  _setExplicitDuration (state, d) {
    state.explicitDuration = d;
  },

  _clearExplicitDuration (state) {
    state.explicitDuration = null;
  },

  _registerDuration (state, d) {
    state.durationRegister.push(d);
  },

  _clearDurationRegister (state) {
    state.durationRegister = [];
  }
};

const actions = {

  show ({ commit }) {
    commit("_show");
  },

  hide ({ commit }) {
    commit("_hide");
  },

  setExplicitDuration ({ commit }, d) {
    commit("_setExplicitDuration", d);
  },

  registerDuration ({ commit }, t) {
    commit("_registerDuration", t);
  },

  resetNavigation ({ commit }) {
    commit("_clearExplicitDuration");
    commit("_clearDurationRegister");
  },

  initialize ({ commit }) {
    commit("_show");
    commit("_triggerInitFlag");
  }
};

const getters = {
  routeDuration (state) {
    if (state.explicitDuration !== null) { return state.explicitDuration; }
    if (state.durationRegister && state.durationRegister.length > 0) {
      return Math.max(...state.durationRegister);
    }
    return 0;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
