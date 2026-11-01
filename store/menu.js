import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    menuList: [],
    menuListAll: [],
    menuListStatus: null,
    menuListAllStatus: null,
});

export const mutations = {
    SET_MENU_LIST(state, data) {
        state.menuList = data;
        state.menuListStatus = data.status;
    },
    SET_MENU_LIST_ALL(state, data) {
        state.menuListAll = data;
        state.menuListStatus = data.status;
    },
    SET_MENU_LIST_FAILURE(state, data) {
        state.menuListStatus = data.status;
    },
    SET_MENU_LIST_ALL_FAILURE(state, data) {
        state.menuListStatus = data.status;
    },
}

export const actions = {
    init({ dispatch }) {
        dispatch('validate')
    },

    //get menu list 
    async getMenu({ commit}, { start, limit, search, isFeature } = {}) {
        //init param
        var param = '&start='+start+'&limit='+limit+'&search='+search+'&is_feature='+isFeature;
        let normalParam = payloadHelper.normalParam(param);

        console.log ('normal param in get meny ', normalParam);
        
        try {

            var response = await this.$menuListRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);
            
            //set in store
            commit('SET_MENU_LIST', response);

            return status;
        } catch (error) {
            commit('SET_MENU_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get menu list 
    async getMenuAll({ commit}, {start, limit} = {}) {
        //init param
        var param = '&start='+start+'&limit='+limit;
        let normalParam = payloadHelper.normalParam(param);
        
        try {
            var response = await this.$menuListRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_MENU_LIST_ALL', response)

            return status
        } catch (error) {
            commit('SET_MENU_LIST_ALL_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get menu last position
    async getMenuLastPostion({ commit}, {} = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');
        
        try {
            var response = await this.$menuLastRepo.getByParam(normalParam);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch getMenuLastPostion', error.message);
        }

    },

    //insert menu list 
    async insertMenu({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('insert menu', normalPayload);
        
        try {
            var response = await this.$menuCreateRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //store menu list 
    async updateMenu({}, { payload } = {}) {
        //init param

        let normalPayload = payloadHelper.normalPayload(payload);

        console.log('update menu', normalPayload);
        
        try {
            var response = await this.$menuUpdateRepo.post(normalPayload);

            console.log('response update menu', response);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },

    //delete menu 
    async deleteMenu({}, { payload } = {}) {
        //init param
        let normalPayload = payloadHelper.normalPayload(payload);
        
        try {
            var response = await this.$menuDeleteRepo.post(normalPayload);

            responseHelper.statusCheck(response.status, response.message);

            return response;
        } catch (error) {
            console.log('error catch', error.message);
        }

    },
}
