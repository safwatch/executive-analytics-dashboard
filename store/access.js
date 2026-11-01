import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    accessList: [],
    accessListStatus: null,
});

export const mutations = {
    SET_ACCESS_LIST(state, data) {
        state.accessList = data;
        state.accessListStatus = data.status;
    },
    SET_ACCESS_LIST_FAILURE(state, data) {
        state.accessListStatus = data.status;
    },
}

export const actions = {
    init({dispatch }) {
        dispatch('validate')
    },

    //get access list 
    async getAccesList({ commit}, { start, limit, search, type } = {}) {

        var param = '&start='+start+'&limit='+limit+'&search='+search+'&type='+type;

        let normalParam = payloadHelper.normalParam(param);

        console.log('normalParam', normalParam);

        try {
            var response = await this.$permissionListRepo.getByParam(normalParam);

            responseHelper.statusCheck(response.status, response.message);

            commit('SET_ACCESS_LIST', response)
        } catch (error) {
            commit('SET_ACCESS_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //insert Access 
    async insertAccess({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('normalPayload', normalPayload);
        
        try {
            var response = await this.$permissionCreateRepo.post(normalPayload);

            console.log(response);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //update Access  
    async updateAccess({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('update access', normalPayload);
        
        try {
            var response = await this.$permissionUpdateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //update Access  
    async updateStatusAccess({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('update status access', normalPayload);
        
        try {
            var response = await this.$permissionStatusUpdateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //delete access
    async deleteAccess({}, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            var response = await this.$permissionDeleteRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },
}
