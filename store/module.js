import { responseHelper } from '../helpers/response.helper';
import { userService } from '../helpers/auth/user.service';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    moduleList: [],
    moduleListStatus: null,
});

export const mutations = {
    SET_MODULE_LIST(state, data) {
        state.moduleList = data;
        state.moduleListStatus = data.status;
    },
    SET_MODULE_LIST_FAILURE(state, data) {
        state.groupListStatus = data.status;
    },
}

export const actions = {
    init({ state, dispatch }) {
        dispatch('validate')
    },

    //get module list 
    async getModule({ commit}, { start, limit, search, share } = {}) {
        //init param
        var userToken = userService.getToken();

        var param = '&start='+start+'&limit='+limit+'&search='+search+'&share='+share;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$moduleListRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_MODULE_LIST', response)

            return status
        } catch (error) {
            commit('SET_MODULE_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //insert module list 
    async insertModule({ commit, dispatch, getters }, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            var response = await this.$moduleCreateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //store module list 
    async updateModule({ commit, dispatch, getters }, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('update module', normalPayload);
        
        try {
            var response = await this.$moduleUpdateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //delete module 
    async deleteModule({ commit, dispatch, getters }, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            var response = await this.$moduleDeleteRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },
}
