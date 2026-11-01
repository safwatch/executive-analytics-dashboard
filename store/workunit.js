import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    workunitList: [],
    workUnitListStatus: null,
    workunitListAll: [],
    workUnitListAllStatus: null,
});

export const mutations = {
    SET_WORK_UNIT_LIST(state, data) {
        state.workunitList = data;
    },
    SET_WORK_UNIT_LIST_FAILURE(state, data) {
        state.workUnitListStatus = data.status;
    },
    SET_WORK_UNIT_ALL_LIST(state, data) {
        state.workunitListAll = data;
    },
    SET_WORK_UNIT_ALL_LIST_FAILURE(state, data) {
        state.workUnitListAllStatus = data.status;
    },
}

export const actions = {
    init({ dispatch }) {
        dispatch('validate')
    },

    //get work unit list 
    async getWorkUnit({ commit}, { start, limit, search, isFeature } = {}) {
        //init param
        var param = '&start='+start+'&limit='+limit+'&search='+search+'&is_feature='+isFeature;
        let normalParam = payloadHelper.normalParam(param);

        console.log ('normal param in get work unit ', normalParam);
        
        try {

            var response = await this.$workUnitListRepo.getByParam(normalParam);

            responseHelper.statusCheck(response.status, response.message);

            commit('SET_WORK_UNIT_LIST', response)
        } catch (error) {
            commit('SET_WORK_UNIT_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get work unit all list 
    async getWorkUnitAll({ commit}, { start, limit, search, isFeature } = {}) {
        //init param
        var param = '&start='+start+'&limit='+limit+'&search='+search+'&is_feature='+isFeature;
        let normalParam = payloadHelper.normalParam(param);

        console.log ('normal param in get work unit all', normalParam);
        
        try {

            var response = await this.$workUnitListRepo.getByParam(normalParam);

            responseHelper.statusCheck(response.status, response.message);

            commit('SET_WORK_UNIT_ALL_LIST', response)
        } catch (error) {
            commit('SET_WORK_UNIT_ALL_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //insert work unit list 
    async insertWorkUnit({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('insert menu', normalPayload);
        
        try {
            var response = await this.$workUnitCreateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //update work unit 
    async updateWorkUnit({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('update menu', normalPayload);
        
        try {
            var response = await this.$workUnitUpdateRepo.post(normalPayload);

            console.log('response update menu', response);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //delete work unit  
    async deleteWorkUnit({}, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            var response = await this.$workUnitDeleteRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },
}
