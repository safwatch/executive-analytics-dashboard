import { responseHelper } from '../helpers/response.helper';
import { userService } from '../helpers/auth/user.service';
import { payloadHelper } from '../helpers/payload.helper';

export const state = () => ({
    covidCaseRecList: [],
    covidCaseRecListStatus: null,
    covidNationList: [],
    covidNationListStatus: null,
    covidSubdistrictList: [],
    covidSubdistrictListStatus: null,
    covidDistrictList: [],
    covidDistrictListStatus: null,
});

export const mutations = {
    SET_COVID_CASE_REC_LIST(state, data) {
        state.covidCaseRecList = data;
        state.covidCaseRecListStatus = data.status;
    },
    SET_COVID_CASE_REC_LIST_FAILURE(state, data) {
        state.covidCaseRecListStatus = data.status;
    },
    SET_COVID_NATION_LIST(state, data) {
        state.covidNationList = data;
        state.covidNationListStatus = data.status;
    },
    SET_COVID_NATION_LIST_FAILURE(state, data) {
        state.covidNationListStatus = data.status;
    },
    SET_COVID_SUBDISTRICT_LIST(state, data) {
        state.covidSubdistrictList = data;
        state.covidSubdistrictListStatus = data.status;
    },
    SET_COVID_SUBDISTRICT_LIST_FAILURE(state, data) {
        state.covidSubdistrictListStatus = data.status;
    },
    SET_COVID_DISTRICT_LIST(state, data) {
        state.covidDistrictList = data;
        state.covidDistrictListStatus = data.status;
    },
    SET_COVID_DISTRICT_LIST_FAILURE(state, data) {
        state.covidDistrictListStatus = data.status;
    },
    //donation
    SET_COVID_DONATION_LIST(state, data) {
        state.covidDonationList = data;
        state.covidDonationListStatus = data.status;
    },
    SET_COVID_DONATION_LIST_FAILURE(state, data) {
        state.covidDonationListStatus = data.status;
    },
    SET_COVID_DONATION_YEAR_LIST(state, data) {
        state.covidDonationYearList = data;
        state.covidDonationYearListStatus = data.status;
    },
    SET_COVID_DONATION_YEAR_LIST_FAILURE(state, data) {
        state.covidDonationYearListStatus = data.status;
    },
}

export const actions = {
    init({ state, dispatch }) {
        // dispatch('validate')
    },

    //get covid case recap
    async getCovidCaseRec({ commit}, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$healthCovidCaseRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_COVID_CASE_REC_LIST', response)

            return status;
        } catch (error) {
            commit('SET_COVID_CASE_REC_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get covid nation
    async getCovidNation({ commit}, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$healthCovidNationRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_COVID_NATION_LIST', response)

            return status;
        } catch (error) {
            commit('SET_COVID_NATION_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get covid subdistrict
    async getCovidSubdistrict({ commit}, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$healthCovidSubdistrictRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_COVID_SUBDISTRICT_LIST', response);

            return status;
        } catch (error) {
            commit('SET_COVID_SUBDISTRICT_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get covid district
    async getCovidDistrict({ commit}, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$healthCovidDistrictRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_COVID_DISTRICT_LIST', response)

            return status;
        } catch (error) {
            commit('SET_COVID_DISTRICT_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },

    //get covid donation
    async getCovidDonation({ commit}, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$healthCovidDonRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_COVID_DONATION_LIST', response)

            return status;
        } catch (error) {
            commit('SET_COVID_DONATION_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },
    //get covid donation year
    async getCovidDonationYear({ commit}, { } = {}) {
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$healthCovidDonYearRepo.getByParam(normalParam);

            var status = responseHelper.statusCheck(response.status, response.message);

            commit('SET_COVID_DONATION_YEAR_LIST', response)

            return status;
        } catch (error) {
            commit('SET_COVID_DONATION_YEAR_LIST_FAILURE', error.message)
            console.log('error catch', error.message);
        }

    },
}
