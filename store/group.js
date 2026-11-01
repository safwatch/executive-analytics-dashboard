import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    groupList: [],
    groupListStatus: null,
});

export const mutations = {
    SET_GROUP_LIST(state, data) {
        state.groupList = data;
        state.groupListStatus = data.status;
    },
    SET_GROUP_LIST_FAILURE(state, data) {
        state.groupListStatus = data.status;
    },
}

export const actions = {
    init({ state, dispatch }) {
        dispatch('validate')
    },

    //get group list 
    async getGroup({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start='+start+'&limit='+limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$groupListRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_GROUP_LIST', response)

            return status
        } catch (error) {
            commit('SET_GROUP_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //insert module list 
    async insertGroup({ commit, dispatch, getters }, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            var response = await this.$groupCreateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //store group list 
    async updateGroup({ commit, dispatch, getters }, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('update group', normalPayload);
        
        try {
            var response = await this.$groupUpdateRepo.post(normalPayload);

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
