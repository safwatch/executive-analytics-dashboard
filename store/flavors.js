export const state = () => ({
    clientId: null,
    clientSecret: null,
    endpoint: null,
});

  export const mutations = {
    CHANGE_FLAVOR(state, { clientId, clientSecret, endpoint }) {
      state.clientId = clientId;
      state.clientSecret = clientSecret;
      state.endpoint = endpoint;
    },
  };

  export const actions = {
    changeFlavor({ commit }, { clientId, clientSecret, endpoint }) {
      console.log('in store :', endpoint)
      commit("CHANGE_FLAVOR", {clientId, clientSecret, endpoint});
    },
  };

  // export { state, mutations, actions };
