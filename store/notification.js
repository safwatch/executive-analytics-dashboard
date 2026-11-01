export const state = () =>({
    type: null,
    active: null,
    message: null
});

export const mutations = {
    success(state, message) {
        state.type = 'success';
        state.active = 'success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'danger';
        state.active = true;
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.active = null;
        state.message = null;
    },
    nonActive(state) {
        state.active = false;
    },
    
};

export const actions = {
    success({ commit }, message) {
        commit('success', message);
        setTimeout(() => {
            commit('clear');
          }, 2000)
    },
    error({ commit }, message) {
        commit('error', message);
        setTimeout(() => {
            commit('clear');
          }, 2000)
    },
    clear({ commit }) {
        commit('clear');
    }
};
