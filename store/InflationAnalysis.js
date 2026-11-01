// store/modules/InflationAnalysis.js
import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';


const state = () => ({
    cpiData: {},
    cpiDataStatus: null,
    foodBalanceData: {},
    foodBalanceDataStatus: null,
    isLoadingFoodBalance: false,
    monthFoodBalance: '',
    yearFoodBalance: '',
});

const mutations = {
    SET_CPI_DATA(state, data) {
        state.cpiData = data;
        state.cpiDataStatus = 'success';
    },
    SET_CPI_DATA_FAILURE(state) {
        state.cpiDataStatus = 'failure';
        state.cpiData = {};
    },
    SET_FOOD_BALANCE_DATA(state, data) {
        state.foodBalanceData = data;
        if (data.length > 0) {
            const firstItem = data[0];
            state.monthFoodBalance = firstItem.month;
            state.yearFoodBalance = firstItem.year;
        }
        state.foodBalanceDataStatus = "success";
    },
    SET_FOOD_BALANCE_DATA_STATUS(state, status) {
        state.foodBalanceDataStatus = status;
    },
    SET_LOADING_STATUS(state, isLoading) {
        state.isLoadingFoodBalance = isLoading;
    },
};

const actions = {
    async fetchCPIData({ commit }) {
        const year = getters.getCurrentYear;
        console.log('tahun CPI', year);
        try {
            const response = await this.inflationCPIRecapVizRepo.getById(year);
            if (response.data && response.data.status) {
                commit('SET_CPI_DATA', response.data.data);
            } else {
                commit('SET_CPI_DATA_FAILURE');
            }
        } catch (error) {
            commit('SET_CPI_DATA_FAILURE');
            console.error('Error fetching CPI data:', error);
        }
    },
    async fetchFoodBalanceData({ commit }) {
        commit('SET_LOADING_STATUS', true);
        //init param
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$FoodCommodityBalanceRepo.getByParam(normalParam);

            if (response.result && response.status === "OK") {
                commit("SET_FOOD_BALANCE_DATA", response.result);
                commit('SET_FOOD_BALANCE_DATA_STATUS', 'success');
            } else {
                commit('SET_FOOD_BALANCE_DATA_STATUS', 'error');
            }
        } catch (error) {
            commit('SET_FOOD_BALANCE_DATA_STATUS', 'error');
            console.error('Error fetching Food Balance data:', error);
        }finally {
            commit('SET_LOADING_STATUS', false);
        }
    },
};

const getters = {
    getCurrentYear: () => {
        return new Date().getFullYear(); // Get the current year
    },
    cpiData: state => state.cpiData,
    cpiDataStatus: state => state.cpiDataStatus,
    foodBalanceData: (state) => state.foodBalanceData,
    foodBalanceDataStatus: (state) => state.foodBalanceDataStatus,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
