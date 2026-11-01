import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';


const state = () => ({
    currentFilters: {
        year: null,
        month: null,
    },
    yearFilter: [],
    yearFilterStatus: null,
    selectedYear: null,
    selectedMonth: null,
    
});

const mutations = {
    SET_YEAR_FILTER(state, data) {
        state.yearFilter = data;
        state.yearFilterStatus = data.status;
    },
    SET_YEAR_FILTER_FAILURE(state, data) {
        state.yearFilterStatus = data.status;
    },
    SET_SELECTED_YEAR(state, yearObject) {
        state.selectedYear = yearObject; // Store the entire object
    },
    SET_SELECTED_MONTH(state, month) {
        state.selectedMonth = month;
    },

    

    // ABOUT FILTER
    SET_CURRENT_FILTERS(state, filters) {
        state.currentFilters = filters;
    },

    RESET_FILTERS(state) {
        state.currentFilters = {
            year: null,
            month: null,
        };
        state.isMtMDataFetched = false;
        // Reset other data related to filters
        state.mtmMetricData = null;
        state.mtmChartData = null;

        // fetched to false
        state.isStrategiMetricFetched = false;
        state.isActionPlanMetricFetched = false;
        state.isWorkunitMetricFetched = false;
        state.isTargetVsRealizationChartFetched = false;
        state.isTrackerInflationControlCardFetched = false;
    },
}

const actions = {
    async fetchInitialData({ dispatch, state }) {
        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isMtMDataFetched) {
            await dispatch('fetchReportMtMData');
        }
        
    },
    async getYearFilter({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');
        try {
            var response = await this.$inflationProfileRepo.getYearFilter(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_YEAR_FILTER', response);
            return status;
        } catch (error) {
            commit('SET_YEAR_FILTER_FAILURE', error.message);
            console.log('error catch', error.message);
        }
    },
    async fetchYearFilter({ commit }) {
        try {
            const response = await this.$inflationYearFilterRepo.get();
            commit('SET_YEAR_FILTER', response.data);
        } catch (error) {
            commit('SET_YEAR_FILTER_FAILURE', error);
        }
    },

    setSelectedFilters({ commit, dispatch }, filters) {
        commit('SET_CURRENT_FILTERS', filters);

        // Only dispatch fetch if valid filters are set
        if (filters.year) {
            dispatch('fetchReportMtMData');
        }
        // Only dispatch fetch if valid filters are set
        if (filters.month) {
            dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
        }
    },
    async resetFilters({ commit, dispatch }) {
        commit('RESET_FILTERS');

        // Fetch initial data after resetting filters
        await dispatch('fetchInitialData');
        // await dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
        // await dispatch('fetchFoodBalanceChart');
        // await dispatch('fetchMonthlyIPHData');
        // await dispatch('fetchYearlyIPHData');
    },
    setSelectedYear({ commit, dispatch }, yearObject) {
        commit('SET_SELECTED_YEAR', yearObject);
        // After committing, trigger functions
        dispatch('fetchReportMtMData', yearObject);
    },
    setSelectedMonth({ commit }, month) {
        commit('SET_SELECTED_MONTH', month);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
