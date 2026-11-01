import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';


const state = () => ({
    currentFilters: {
        year: null,
        workunit: null,
        quarter: null,
    },
    yearFilter: [],
    yearFilterStatus: null,
    selectedYear: null,
    selectedWorkunit: null,
    selectedQuarter: null,
    // MtM Card
    mtmMetricData: null,
    mtmChartData: null,
    isLoadingMtMMetric: true,
    isLoadingMtMChart: true,
    mtmMetricStatus: null,
    mtmChartStatus: null,
    isMtMDataFetched: false,
    // Strategy Card
    strategiMetric: null,
    strategiMetricStatus: null,
    isLoadingStrategiMetric: true,
    isStrategiMetricFetched: false,
    // Action Plan Card
    actionPlanMetric: null,
    actionPlanStatus: null,
    isLoadingActionPlan: true,
    isActionPlanMetricFetched: false,
    // Workunit Card
    workunitMetric: null,
    workunitStatus: null,
    isLoadingWorkunit: true,
    isWorkunitMetricFetched: false,
    // Target vs Realization Chart
    targetVsRealizationChart: null,
    targetVsRealizationChartStatus: null,
    isLoadingTargetVsRealizationChart: true,
    isTargetVsRealizationChartFetched: false,
    // Tracker Inflation Control
    trackerInflationControlCard: null,
    trackerInflationControlCardStatus: null,
    isLoadingTrackerInflationControlCard: true,
    isTrackerInflationControlCardFetched: false,
    // Food Balance Chart
    foodBalanceChart: [],
    foodBalanceStatus: null,
    isLoadingFoodBalanceChart: true,
    isFoodBalanceChartFetched: false,

    // IPH
    monthlyIPHData: [], 
    monthlyIPHStatus: null,  
    isLoadingMonthlyIPH: true,  
    isMonthlyIPHChartTabFetched: false,

    yearlyIPHData: [],  
    yearlyIPHStatus: null,  
    isLoadingYearlyIPH: true, 
    isYearlyIPHChartTabFetched: false,
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
    SET_SELECTED_WORKUNIT(state, workunit) {
        state.selectedWorkunit = workunit;
    },
    SET_SELECTED_QUARTER(state, quarter) {
        state.selectedQuarter = quarter;
    },

    // MtM Card
    SET_MTM_METRIC(state, data) {
        state.mtmMetricData = data;
        state.isMtMDataFetched = true;  // Set the flag to true when data is fetched
    },
    SET_MTM_METRIC_STATUS(state, status) {
        state.mtmMetricStatus = status;
    },
    SET_MTM_CHART(state, data) {
        state.mtmChartData = data;
        state.isMtMDataFetched = true;  // Set the flag to true when data is fetched
    },
    SET_MTM_CHART_STATUS(state, status) {
        state.mtmChartStatus = status;
    },
    SET_LOADING_MTM_METRIC(state, isLoading) {
        state.isLoadingMtMMetric = isLoading;
    },
    SET_LOADING_MTM_CHART(state, isLoading) {
        state.isLoadingMtMChart = isLoading;
    },
    RESET_MTM_DATA(state) {
        state.mtmMetricData = null;
        state.mtmChartData = null;
        state.isMtMDataFetched = false;
    },

    // Strategy Metric Mutations
    SET_STRATEGI_METRIC(state, data) {
        state.strategiMetric = data;
        state.isStrategiMetricFetched = true;
    },
    SET_STRATEGI_METRIC_STATUS(state, status) {
        state.strategiMetricStatus = status;
    },
    SET_LOADING_STRATEGI_METRIC(state, isLoading) {
        state.isLoadingStrategiMetric = isLoading;
    },

    // Action Plan Mutations
    SET_ACTION_PLAN_METRIC(state, data) {
        state.actionPlanMetric = data;
        state.isActionPlanMetricFetched = true;
    },
    SET_ACTION_PLAN_METRIC_STATUS(state, status) {
        state.actionPlanStatus = status;
    },
    SET_LOADING_ACTION_PLAN_METRIC(state, isLoading) {
        state.isLoadingActionPlan = isLoading;
    },

    // Workunit Metric Mutations
    SET_WORKUNIT_METRIC(state, data) {
        state.workunitMetric = data;
        state.isWorkunitMetricFetched = true;
    },
    SET_WORKUNIT_METRIC_STATUS(state, status) {
        state.workunitStatus = status;
    },
    SET_LOADING_WORKUNIT_METRIC(state, isLoading) {
        state.isLoadingWorkunit = isLoading;
    },

    // Target vs Realization Mutations
    SET_TARGET_VS_REALIZATION_METRIC(state, data) {
        state.targetVsRealizationChart = data;
        state.isTargetVsRealizationChartFetched = true;
    },
    SET_TARGET_VS_REALIZATION_METRIC_STATUS(state, status) {
        state.targetVsRealizationChartStatus = status;
    },
    SET_LOADING_TARGET_VS_REALIZATION_METRIC(state, isLoading) {
        state.isLoadingTargetVsRealizationChart = isLoading;
    },

    // Tracker Inflation Control Mutations
    SET_TRACKER_INFLATION_CONTROL_CARD(state, data) {
        state.trackerInflationControlCard = data;
        state.isTrackerInflationControlCardFetched = true;
    },
    SET_TRACKER_INFLATION_CONTROL_CARD_STATUS(state, status) {
        state.trackerInflationControlCardStatus = status;
    },
    SET_LOADING_TRACKER_INFLATION_CONTROL_CARD(state, isLoading) {
        state.isLoadingTrackerInflationControlCard = isLoading;
    },

    SET_FOOD_BALANCE_CHART(state, data) {
        state.foodBalanceChart = data;
        state.isFoodBalanceChartFetched = true;
    },
    SET_FOOD_BALANCE_STATUS(state, status) {
        state.foodBalanceStatus = status;
    },
    SET_LOADING_FOOD_BALANCE_CHART(state, isLoading) {
        state.isLoadingFoodBalanceChart = isLoading;
    },

    // IPH 
    // Monthly Data
    SET_LOADING_MONTHLY_IPH(state, isLoading) {
        state.isLoadingMonthlyIPH = isLoading;
    },
    SET_MONTHLY_IPH_DATA(state, data) {
        state.monthlyIPHData = data;
        state.isMonthlyIPHChartTabFetched = true;
    },
    SET_MONTHLY_IPH_STATUS(state, status) {
        state.monthlyIPHStatus = status;
    },

    // Yearly Data
    SET_LOADING_YEARLY_IPH(state, isLoading) {
        state.isLoadingYearlyIPH = isLoading;
    },
    SET_YEARLY_IPH_DATA(state, data) {
        state.yearlyIPHData = data;
        state.isYearlyIPHChartTabFetched = true;
    },
    SET_YEARLY_IPH_STATUS(state, status) {
        state.yearlyIPHStatus = status;
    },

    // ABOUT FILTER
    SET_CURRENT_FILTERS(state, filters) {
        state.currentFilters = filters;
    },

    RESET_FILTERS(state) {
        state.currentFilters = {
            year: null,
            workunit: null,
            quarter: null,
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
        // Fetch only if the data hasn't been fetched yet for each respective card.
        if (!state.isStrategiMetricFetched || !state.isActionPlanMetricFetched || !state.isTrackerInflationControlCardFetched || !state.isWorkunitMetricFetched || !state.isTargetVsRealizationChartFetched) {
            await dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
        }

        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isFoodBalanceChartFetched) {
            await dispatch('fetchFoodBalanceChart');
        }

        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isYearlyIPHChartTabFetched) {
            await dispatch('fetchYearlyIPHData');
        }

        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isMonthlyIPHChartTabFetched) {
            await dispatch('fetchMonthlyIPHData');
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

    async fetchReportMtMData({ commit, state }) {
        const { year } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&tahun=${year.year}`;
        }

        // Load Metric Data
        commit('SET_LOADING_MTM_METRIC', true);
        try {
            const metricParam = payloadHelper.normalParam(normalParam);
            const metricResponse = await this.$inflationMtMRepo.getByParam(metricParam);
            if (metricResponse.status === 'OK') {
                const result = metricResponse.result[0]; // Access the first element of result array
                const processedData = {
                    tingkat_inflasi: result.tingkat_inflasi,
                    tingkat_inflasi_sebelumnya: result.tingkat_inflasi_sebelumnya,
                    perubahan_inflasi: result.perubahan_inflasi,
                    keterangan: result.keterangan,
                    nama_bulan: result.nama_bulan,
                    satuan: result.satuan,
                    tahun: result.tahun,
                };
                commit('SET_MTM_METRIC', processedData);
                commit('SET_MTM_METRIC_STATUS', 'success');
            } else {
                commit('SET_MTM_METRIC_STATUS', 'failure');
            }
            commit('SET_LOADING_MTM_METRIC', false);
        } catch (error) {
            console.error('Error fetching MtM metric:', error);
            commit('SET_MTM_METRIC_STATUS', 'failure');
            commit('SET_LOADING_MTM_METRIC', false);
        }

        // Load Chart Data
        commit('SET_LOADING_MTM_CHART', true);
        try {
            const chartParam = payloadHelper.normalParam(normalParam);
            const chartResponse = await this.$inflationMtMFullYearRepo.getByParam(chartParam);
            if (chartResponse.status === "OK" && Array.isArray(chartResponse.result)) {
                const processedData = chartResponse.result.map(item => {
                    // Check if tingkat_inflasi is not null
                    const inflationRate = item.tingkat_inflasi ?
                        parseFloat(item.tingkat_inflasi.replace(',', '.')) : null;

                    return {
                        inflationRate,
                        month: item.nama_bulan,
                        year: item.tahun,  
                    };
                });
                commit('SET_MTM_CHART', processedData);
                commit('SET_MTM_CHART_STATUS', 'success');
            } else {
                commit('SET_MTM_CHART_STATUS', 'failure');
            }
            commit('SET_LOADING_MTM_CHART', false);
        } catch (error) {
            console.error('Error fetching MtM chart:', error);
            commit('SET_MTM_CHART_STATUS', 'failure');
            commit('SET_LOADING_MTM_CHART', false);
        }
    },

    async fetchActionPlanAndStrategiesOfWorkunitsData({ commit, state }) {
        const { year, workunit, quarter } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&year=${year.year}`;
        }

        if (workunit) {
            normalParam += `&workunit_id=${workunit.code_workunit}`;
        }

        if (quarter) {
            normalParam += `&triwulan_id=${quarter.id}`;
        }

        // Set all loading states to true before making API calls
        commit('SET_LOADING_STRATEGI_METRIC', true);
        commit('SET_LOADING_ACTION_PLAN_METRIC', true);
        commit('SET_LOADING_TRACKER_INFLATION_CONTROL_CARD', true);
        commit('SET_LOADING_WORKUNIT_METRIC', true);
        commit('SET_LOADING_TARGET_VS_REALIZATION_METRIC', true);

        try {
            // Group 1 API requests (strategiMetric, actionPlanMetric, trackerInflationControlCard)
            const group1Requests = this.$reportActionPlanAndStrategiesRepo.getByParam(normalParam);

            // Group 2 API request (targetVsRealizationChart)
            const group2Request = this.$reportTargetAndRealizationRepo.getByParam(normalParam);

            // Group 3 API request (workunitMetric)
            const group3Request = this.$reportTotalWorkunitByYearRepo.getByParam(normalParam);

            // Await all requests simultaneously
            const [group1Response, group2Response, group3Response] = await Promise.all([
                group1Requests,
                group2Request,
                group3Request,
            ]);

            // Handle group 1 response (strategiMetric, actionPlanMetric, trackerInflationControlCard)
            if (group1Response.status === 'OK') {
                const strategiMetricData = {
                    value: group1Response.result.total_kunci_strategi
                };
                const actionPlanData = {
                    current: group1Response.result.total_action_plans,
                    previous: group1Response.result.total_action_plans_before,
                    year: group1Response.result.year,
                    percentage: group1Response.result.percentage,
                };
                const trackerInflationControlData = {
                    list: group1Response.result.breakdown,
                    actionplan: group1Response.result.total_action_plans,
                    budget_realization: group2Response.result.jumlah_anggaran_realisasi,
                    progress_percentage: group2Response.result.achievement_rate || 0,
                };

                commit('SET_STRATEGI_METRIC', strategiMetricData);
                commit('SET_ACTION_PLAN_METRIC', actionPlanData);
                commit('SET_TRACKER_INFLATION_CONTROL_CARD', trackerInflationControlData);

                commit('SET_STRATEGI_METRIC_STATUS', 'success');
                commit('SET_ACTION_PLAN_METRIC_STATUS', 'success');
                commit('SET_TRACKER_INFLATION_CONTROL_CARD_STATUS', 'success');
            } else {
                commit('SET_STRATEGI_METRIC_STATUS', 'failure');
                commit('SET_ACTION_PLAN_METRIC_STATUS', 'failure');
                commit('SET_TRACKER_INFLATION_CONTROL_CARD_STATUS', 'failure');
            }

            // Handle group 2 response (workunitMetric)
            if (group2Response.status === 'OK') {
                const targetVsRealizationChartData = {
                    totalTargetTriwulan: group2Response.result.total_target_triwulan,
                    totalRealisasiTriwulan: group2Response.result.total_realisasi_triwulan,
                };
                const trackerInflationControlCardData = {
                    totalRealisasiTriwulan: group2Response.result.total_realisasi_triwulan,
                }
                commit('SET_TARGET_VS_REALIZATION_METRIC', targetVsRealizationChartData);
                commit('SET_TARGET_VS_REALIZATION_METRIC_STATUS', 'success');
            } else {
                commit('SET_TARGET_VS_REALIZATION_METRIC_STATUS', 'failure');
            }

            // Handle group 3 response (targetVsRealizationChart)
            if (group3Response.status === 'OK') {
                const workunitData = group3Response.result;
                commit('SET_WORKUNIT_METRIC', workunitData);
                commit('SET_WORKUNIT_METRIC_STATUS', 'success');
                console.log('workunit :', workunitData);
            } else {
                commit('SET_TARGET_VS_REALIZATION_METRIC_STATUS', 'failure');
            }
        } catch (error) {
            // Handle errors and set failure statuses for each group
            console.error('Error fetching grouped metrics:', error);
            commit('SET_STRATEGI_METRIC_STATUS', 'failure');
            commit('SET_ACTION_PLAN_METRIC_STATUS', 'failure');
            commit('SET_TRACKER_INFLATION_CONTROL_CARD_STATUS', 'failure');
            commit('SET_TARGET_VS_REALIZATION_METRIC_STATUS', 'failure');
            commit('SET_WORKUNIT_METRIC_STATUS', 'failure');
        } finally {
            // Set loading states to false after API calls complete
            commit('SET_LOADING_STRATEGI_METRIC', false);
            commit('SET_LOADING_ACTION_PLAN_METRIC', false);
            commit('SET_LOADING_TRACKER_INFLATION_CONTROL_CARD', false);
            commit('SET_LOADING_WORKUNIT_METRIC', false);
            commit('SET_LOADING_TARGET_VS_REALIZATION_METRIC', false);
        }
    },

    async fetchFoodBalanceChart({ commit, state }) {
        const { year, workunit, quarter } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&year=${year.year}`;
        }

        commit('SET_LOADING_FOOD_BALANCE_CHART', true);
        try {
            const response = await this.$reportFoodBalanceRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_FOOD_BALANCE_CHART', response.result);
                commit('SET_FOOD_BALANCE_STATUS', 'success');
            } else {
                commit('SET_FOOD_BALANCE_STATUS', 'failure');
            }
        } catch (error) {
            console.error('Error fetching food balance chart:', error);
            commit('SET_FOOD_BALANCE_STATUS', 'failure');
        } finally {
            commit('SET_LOADING_FOOD_BALANCE_CHART', false);
        }
    },

    async fetchMonthlyIPHData({ commit, state }) {
        const { year, workunit, quarter } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&year=${year.year}`;
        }

        if (quarter) {
            normalParam += `&triwulan_id=${quarter.id}`;
        }
        
        try {
          commit('SET_LOADING_MONTHLY_IPH', true);
          const response = await this.$reportIPHMonthlyRepo.getByParam(normalParam); //$repository.fetchMonthlyIPH();
          if (response.status === 'OK') {
            commit('SET_MONTHLY_IPH_DATA', response.result);
            commit('SET_MONTHLY_IPH_STATUS', 'success');
          } else {
            commit('SET_MONTHLY_IPH_STATUS', 'failure');
          }
        } catch (error) {
          commit('SET_MONTHLY_IPH_STATUS', 'error');
        } finally {
          commit('SET_LOADING_MONTHLY_IPH', false);
        }
      },
    
      async fetchYearlyIPHData({ commit, state }) {
        const { year, workunit, quarter } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&year=${year.year}`;
        }

        if (quarter) {
            normalParam += `&triwulan_id=${quarter.id}`;
        }

        try {
          commit('SET_LOADING_YEARLY_IPH', true);
          const response = await this.$reportIPHYearlyRepo.getByParam(normalParam) //$repository.fetchYearlyIPH();
          if (response.status === 'OK') {
            commit('SET_YEARLY_IPH_DATA', response.result);
            commit('SET_YEARLY_IPH_STATUS', 'success');
          } else {
            commit('SET_YEARLY_IPH_STATUS', 'failure');
          }
        } catch (error) {
          commit('SET_YEARLY_IPH_STATUS', 'error');
        } finally {
          commit('SET_LOADING_YEARLY_IPH', false);
        }
      },

    setSelectedFilters({ commit, dispatch }, filters) {
        commit('SET_CURRENT_FILTERS', filters);

        // Only dispatch fetch if valid filters are set
        if (filters.year) {
            dispatch('fetchReportMtMData');
            dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
            dispatch('fetchFoodBalanceChart');
            dispatch('fetchMonthlyIPHData');
            dispatch('fetchYearlyIPHData');
        }
        // Only dispatch fetch if valid filters are set
        if (filters.workunit) {
            dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
        }

        // Only dispatch fetch if valid filters are set
        if (filters.quarter) {
            dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
        }
    },
    async resetFilters({ commit, dispatch }) {
        commit('RESET_FILTERS');

        // Fetch initial data after resetting filters
        await dispatch('fetchInitialData');
        await dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
        await dispatch('fetchFoodBalanceChart');
        await dispatch('fetchMonthlyIPHData');
        await dispatch('fetchYearlyIPHData');
    },
    setSelectedYear({ commit, dispatch }, yearObject) {
        commit('SET_SELECTED_YEAR', yearObject);
        // After committing, trigger functions
        dispatch('fetchReportMtMData', yearObject);
    },
    setSelectedWorkunit({ commit }, workunit) {
        commit('SET_SELECTED_WORKUNIT', workunit);
    },
    setSelectedQuarter({ commit }, quarter) {
        commit('SET_SELECTED_QUARTER', quarter);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
