import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    permissionList: [],
    permissionListStatus: null,
});

export const mutations = {
    SET_PERMISSION_LIST(state, data) {
        state.permissionList = data;
        state.permissionListStatus = data.status;
        saveState('currentMenu', data)
    },
    SET_PERMISSION_LIST_FAILURE(state, data) {
        state.permissionListStatus = data.status;
    },
}

export const actions = {
    init({ dispatch }) {
        dispatch('validate')
    },

    //get menu permission list 
    async getPermissionMenu({ commit}, {} = {}) {

        //init param
        let normalParam = payloadHelper.normalParam('');
        
        try {
            var response = await this.$permissionMenuRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_PERMISSION_LIST', response)

            return status;
        } catch (error) {
            commit('SET_PERMISSION_LIST_FAILURE', error.message)
            
            console.log('error catch', error.message);
        }

    },
}

// ===
// Private helpers
// ===

function saveState(key, data) {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(data.result))
    }
}
