import { createStore } from 'vuex';
const state = {
  count: 0,
  token: '0a',
  userInfo: {},
  menuCollapsed: false,
};

const mutations = {
  increment(state) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  },
  saveToken(state, token) {
    state.token = 'Bearer ' + token;
  },
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  toggleCollapsed(state) {
    state.menuCollapsed = !state.menuCollapsed;
  },
  openCollapsed(state) {
    state.menuCollapsed = false;
  },
};

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment');
    }
  },
  incrementAsync({ commit, state }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment');
        resolve();
      }, 1000);
    });
  },
};

const getters = {
  evenOrOdd: (state) => (state.count % 2 === 0 ? 'even' : 'odd'),
};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});
