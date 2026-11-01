import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';
import CryptoJS from 'crypto-js';


export const state = () => ({
    p3keIndividuList: [],
    p3keKeluargaList: [],
    p3keKeluargaRutilahuList: [],
    p3keKeluargaBukanListrikList: [],
    p3keKeluargaFasilitasBABBersamaList: [],
    p3keKeluargaFasilitasBABBukanPribadiUmumList: [],
    // separator between list and status
    p3keIndividuListStatus: null,
    p3keKeluargaListStatus: null,
    p3keKeluargaRutilahuListStatus: null,
    p3keKeluargaBukanListrikListStatus: null,
    p3keKeluargaFasilitasBABBersamaListStatus: null,
    p3keKeluargaFasilitasBABBukanPribadiUmumListStatus: null,
});

export const mutations = {
    SET_P3KE_INDIVIDU_LIST(state, data) {
        state.p3keIndividuList = data;
        state.p3keIndividuListStatus = data.status;
    },
    SET_P3KE_KELUARGA_LIST(state, data) {
        state.p3keKeluargaList = data;
        state.p3keKeluargaListStatus = data.status;
    },
    SET_P3KE_KELUARGA_RUTILAHU_LIST(state, data) {
        state.p3keKeluargaRutilahuList = data;
        state.p3keKeluargaRutilahuListStatus = data.status;
    },
    SET_P3KE_KELUARGA_BUKAN_LISTRIK_LIST(state, data) {
        state.p3keKeluargaBukanListrikList = data;
        state.p3keKeluargaBukanListrikListStatus = data.status;
    },
    SET_P3KE_KELUARGA_FASILITAS_BAB_BERSAMA_LIST(state, data) {
        state.p3keKeluargaFasilitasBABBersamaList = data;
        state.p3keKeluargaFasilitasBABBersamaListStatus = data.status;
    },
    SET_P3KE_KELUARGA_FASILITAS_BAB_BUKAN_PRIBADI_UMUM_LIST(state, data) {
        state.p3keKeluargaFasilitasBABBukanPribadiUmumList = data;
        state.p3keKeluargaFasilitasBABBukanPribadiUmumListStatus = data.status;
    },
    SET_P3KE_INDIVIDU_LIST_FAILURE(state, data) {
        state.p3keIndividuListStatus = data.status;
    },
    SET_P3KE_KELUARGA_LIST_FAILURE(state, data) {
        state.p3keKeluargaListStatus = data.status;
    },
    SET_P3KE_KELUARGA_RUTILAHU_LIST_FAILURE(state, data) {
        state.p3keKeluargaRutilahuListStatus = data.status;
    },
    SET_P3KE_KELUARGA_BUKAN_LISTRIK_LIST_FAILURE(state, data) {
        state.p3keKeluargaBukanListrikListStatus = data.status;
    },
    SET_P3KE_KELUARGA_FASILITAS_BAB_BERSAMA_LIST_FAILURE(state, data) {
        state.p3keKeluargaFasilitasBABBersamaListStatus = data.status;
    },
    SET_P3KE_KELUARGA_FASILITAS_BAB_BUKAN_PRIBADI_UMUM_LIST_FAILURE(state, data) {
        state.p3keKeluargaFasilitasBABBersamaListStatus = data.status;
    },
}

export const actions = {
    init({ dispatch }) {
        dispatch('validate')
    },

    //get individu list 
    async getAllP3keIndividu({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start=' + start + '&limit=' + limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$p3keIndividuRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_P3KE_INDIVIDU_LIST', response);

            return status
        } catch (error) {
            commit('SET_P3KE_INDIVIDU_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get keluarga list 
    async getAllP3keKeluarga({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start=' + start + '&limit=' + limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$p3keKeluargaRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_P3KE_KELUARGA_LIST', response);

            return status
        } catch (error) {
            commit('SET_P3KE_KELUARGA_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get keluarga rutilahu list 
    async getAllP3keKeluargaRutilahu({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start=' + start + '&limit=' + limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$p3keKeluargaRutilahuRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_P3KE_KELUARGA_RUTILAHU_LIST', response);
            
            return status;
        } catch (error) {
            commit('SET_P3KE_KELUARGA_RUTILAHU_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get sumber listrik keluarga list 
    async getAllP3keKeluargaBukanListrik({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start=' + start + '&limit=' + limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$p3keKeluargaBukanListrikRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_P3KE_KELUARGA_BUKAN_LISTRIK_LIST', response);
            
            return status;
        } catch (error) {
            commit('SET_P3KE_KELUARGA_BUKAN_LISTRIK_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get fasilitas bab yang milik bersama / umum 
    async getAllP3keKeluargaFasilitasBABBersama({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start=' + start + '&limit=' + limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$p3keKeluargaFasilitasBABBersamaRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_P3KE_KELUARGA_FASILITAS_BAB_BERSAMA_LIST', response);
            
            return status;
        } catch (error) {
            commit('SET_P3KE_KELUARGA_FASILITAS_BAB_BERSAMA_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get fasilitas bab yang tidak milik pribadi & bersama / umum 
    async getAllP3keKeluargaFasilitasBABBukanPribadiUmum({ commit }, { start, limit } = {}) {
        //init param
        var param = '&start=' + start + '&limit=' + limit;
        let normalParam = payloadHelper.normalParam(param);

        try {
            var response = await this.$p3keKeluargaFasilitasBABBukanPribadiUmumRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_P3KE_KELUARGA_FASILITAS_BAB_BUKAN_PRIBADI_UMUM_LIST', response);
            
            return status;
        } catch (error) {
            commit('SET_P3KE_KELUARGA_FASILITAS_BAB_BUKAN_PRIBADI_UMUM_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },
}
