import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    roleList: [],
    roleListStatus: null,
});

export const mutations = {
    SET_ROLE_LIST(state, data) {
        state.roleList = data;
        state.roleListStatus = data.status;
    },
    SET_ROLE_LIST_FAILURE(state, data) {
        state.roleListStatus = data.status;
    },
}

export const actions = {
    init({ state, dispatch }) {
        dispatch('validate')
    },

    //get role detail  
    async getRoleDetail({ commit }, { id } = {}) {
        //init param
        var param = '&id='+id;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$roleDetailRepo.getByParam(normalParam);

            responseHelper.statusCheck(response.status, response.message);

            commit('SET_ROLE_LIST', response)
        } catch (error) {
            commit('SET_ROLE_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //update role  
    async updateRole({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('update role', normalPayload);
        
        try {
            var response = await this.$roleUpdateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //delete group  
    async deleteGroup({ commit, dispatch, getters }, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            var response = await this.$groupDeleteRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },
}
