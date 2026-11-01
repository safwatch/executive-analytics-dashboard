import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    mainPageConfig: [],
    configStatus: null,
});

export const mutations = {
    SET_MAIN_PAGE_CONFIG(state, data) {
        state.mainPageConfig = data;
        state.configStatus = data.status;
        saveState('mainPageConfig', data)
    },
    SET_MAIN_PAGE_CONFIG_FAILURE(state, data) {
        state.configStatus = data.status;
    },
}

export const actions = {
    init({ dispatch }) {
        dispatch('validate')
    },

    //get menu permission list 
    async getMainConfig({ commit}, {id} = {}) {
        var param = '&id='+id;
        //init param
        let normalParam = payloadHelper.normalParam(param);
        
        try {

            var response = await this.$configDetailRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            console.log('response config main', response);

            commit('SET_MAIN_PAGE_CONFIG', response)

            return status
        } catch (error) {
            commit('SET_SET_MAIN_PAGE_CONFIG_FAILURE', error.message)
            
            console.log('error catch', error.message);
        }

    },

    //get menu permission list 
    async updateMainConfig({ commit}, {payload} = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            
            var response = await this.$configUpdateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            console.log('response', response);

            return response;
        } catch (error) {
            commit('SET_MAIN_PAGE_CONFIG_FAILURE', error.message)
            
            console.log('error catch', error.message);
        }

    },

    async importCSV({ }, {payload} = {}) {
        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
        console.log('payload : ', normalPayload);

            var response = await this.$importCsvRepo.postFile(normalPayload);
            responseHelper.statusCheck(response.status, response.message);
            console.log('response :', response);
            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }
    }
}

// ===
// Private helpers
// ===

function saveState(key, data) {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(data.result))
    }
}
