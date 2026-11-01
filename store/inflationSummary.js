import Vue from 'vue';

import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';


const state = () => ({
    quarterActiveTab: 'all',
    commoditiesWithPriceIncrease: [],
    currentFilters: {
        year: null,
    },
    yearFilter: [],
    yearFilterStatus: null,

    monthFilter: [],
    monthFilterStatus: null,
    // YoY Card
    yoyMetricData: null,
    yoyChartData: null,
    isLoadingYoYMetric: true,
    isLoadingYoYChart: true,
    yoyMetricStatus: null,
    yoyChartStatus: null,
    isYoYDataFetched: false,
    // MtM Card
    mtmMetricData: null,
    mtmChartData: null,
    isLoadingMtMMetric: true,
    isLoadingMtMChart: true,
    mtmMetricStatus: null,
    mtmChartStatus: null,
    isMtMDataFetched: false,
    // Action Plan Card
    actionPlanMetric: null,
    actionPlanStatus: null,
    isLoadingActionPlan: true,
    isActionPlanMetricFetched: false,
    // Market Spread Card
    marketSpreadMetric: null,
    marketSpreadStatus: null,
    isLoadingMarketSpread: true,
    isMarketSpreadMetricFetched: false,

    // Yearly Inflation, IPH, and Target vs. Realization
    yearlyInflationData: [],
    yearlyInflationStatus: null,
    isLoadingYearlyInflation: true,
    isYearlyInflationChartTabFetched: false,

    yearlyIPHData: [],
    yearlyIPHStatus: null,
    isLoadingYearlyIPH: true,
    isYearlyIPHChartTabFetched: false,

    yearlyTargetRealizationData: [],
    yearlyTargetRealizationStatus: null,
    isLoadingYearlyTargetRealization: true,
    isYearlyTargetRealizationChartTabFetched: false,

    // Inflation By Commodity
    inflationByCommodityData: [],
    inflationByCommodityStatus: null,
    isLoadingInflationByCommodity: true,
    isInflationByCommodityChartTabFetched: false,

    // Inflation By Commodity with Pasar
    pasarData: {},
    inflationByPasarStatus: null,
    isLoadingInflationByPasar: true,
    isInflationByPasarCardFetched: false,
    fetchedPasarIds: [],

    // Tracker Inflation Control
    trackerInflationControlCard: null,
    trackerInflationControlCardStatus: null,
    isLoadingTrackerInflationControlCard: true,
    isTrackerInflationControlCardFetched: false,
    // for partial tracker
    quarterActiveTab: 'all',
    isLoadingPartRealizationBudget: false,
    isLoadingPartRadialChart: false,

    // Strategy Metric
    strategiMetric: null,
    strategiMetricStatus: null,
    isLoadingStrategiMetric: true,
    isStrategiMetricFetched: false,

    // Target vs Realization Chart
    targetVsRealizationChart: null,
    targetVsRealizationChartStatus: null,
    isLoadingTargetVsRealizationChart: true,
    isTargetVsRealizationChartFetched: false,

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
    SET_MONTH_FILTER(state, data) {
        state.monthFilter = data;
        state.monthFilterStatus = data.status;
    },
    SET_MONTH_FILTER_FAILURE(state, data) {
        state.monthFilterStatus = data.status;
    },
    SET_SELECTED_MONTH(state, monthObject) {
        state.selectedMonth = monthObject;
    },
    SET_CURRENT_FILTERS(state, filters) {
        state.currentFilters = filters;
    },

    // YoY Card
    SET_YOY_METRIC(state, data) {
        state.yoyMetricData = data;
        state.isYoYDataFetched = true;  // Set the flag to true when data is fetched
    },
    SET_YOY_METRIC_STATUS(state, status) {
        state.yoyMetricStatus = status;
    },
    SET_YOY_CHART(state, data) {
        state.yoyChartData = data;
        state.isYoYDataFetched = true;  // Set the flag to true when data is fetched
    },
    SET_YOY_CHART_STATUS(state, status) {
        state.yoyChartStatus = status;
    },
    SET_LOADING_YOY_METRIC(state, isLoading) {
        state.isLoadingYoYMetric = isLoading;
    },
    SET_LOADING_YOY_CHART(state, isLoading) {
        state.isLoadingYoYChart = isLoading;
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

    // Market Spread Mutations
    SET_MARKET_SPREAD_METRIC(state, data) {
        state.marketSpreadMetric = data;
        state.isMarketSpreadMetricFetched = true;
    },
    SET_MARKET_SPREAD_METRIC_STATUS(state, status) {
        state.marketSpreadStatus = status;
    },
    SET_LOADING_MARKET_SPREAD_METRIC(state, isLoading) {
        state.isLoadingMarketSpread = isLoading;
    },

    // Yearly Inflation Mutations
    SET_YEARLY_INFLATION_METRIC(state, data) {
        state.yearlyInflationData = data;
        state.isYearlyInflationChartTabFetched = true;
    },
    SET_YEARLY_INFLATION_METRIC_STATUS(state, status) {
        state.yearlyInflationStatus = status;
    },
    SET_LOADING_YEARLY_INFLATION_METRIC(state, isLoading) {
        state.isLoadingYearlyInflation = isLoading;
    },

    // Yearly IPH Mutations
    SET_YEARLY_IPH_METRIC(state, data) {
        state.yearlyIPHData = data;
        state.isYearlyIPHChartTabFetched = true;
    },
    SET_YEARLY_IPH_METRIC_STATUS(state, status) {
        state.yearlyIPHStatus = status;
    },
    SET_LOADING_YEARLY_IPH_METRIC(state, isLoading) {
        state.isLoadingYearlyIPH = isLoading;
    },

    // Yearly Target Realization Mutations
    SET_YEARLY_TARGET_REALIZATION_METRIC(state, data) {
        state.yearlyTargetRealizationData = data;
        state.isYearlyTargetRealizationChartTabFetched = true;
    },
    SET_YEARLY_TARGET_REALIZATION_METRIC_STATUS(state, status) {
        state.yearlyTargetRealizationStatus = status;
    },
    SET_LOADING_YEARLY_TARGET_REALIZATION_METRIC(state, isLoading) {
        state.isLoadingYearlyTargetRealization = isLoading;
    },

    // Inflation By Commodity Mutations
    SET_INFLATION_BY_COMMODITY_METRIC(state, data) {
        state.inflationByCommodityData = data;
        state.isInflationByCommodityChartTabFetched = true;
    },
    SET_INFLATION_BY_COMMODITY_METRIC_STATUS(state, status) {
        state.inflationByCommodityStatus = status;
    },
    SET_LOADING_INFLATION_BY_COMMODITY_METRIC(state, isLoading) {
        state.isLoadingInflationByCommodity = isLoading;
    },
    // Mutation to set the commodity data in the store    
    SET_PASAR_DATA(state, { pasarId, data }) {
        Vue.set(state.pasarData, pasarId, data || {});
        // Ensure fetchedPasarIds is an array
        if (!Array.isArray(state.fetchedPasarIds)) {
            state.fetchedPasarIds = [];
        }

        // Add pasarId to fetchedPasarIds if it is not already included
        if (!state.fetchedPasarIds.includes(pasarId)) {
            state.fetchedPasarIds.push(pasarId);
        }

        // Check if all pasarIds are fetched
        const allPasarIds = [1, 2, 3, 4, 5, 6];
        if (allPasarIds.every(id => state.fetchedPasarIds.includes(id))) {
            state.isInflationByPasarCardFetched = true;
        }
    },
    SET_COMMODITIES_WITH_PRICE_INCREASE(state, commodities) {
        state.commoditiesWithPriceIncrease = commodities;
    },

    SET_INFLATION_BY_PASAR_STATUS(state, status) {
        state.inflationByPasarStatus = status;
    },
    SET_LOADING_INFLATION_BY_PASAR(state, loading) {
        state.isLoadingInflationByPasar = loading;
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
    // Part of Tracker Loading
    SET_QUARTER_ACTIVE_TAB(state, tab) {
        state.quarterActiveTab = tab;
    },
    SET_LOADING_BUDGET_PART_INFLATION_CONTROL_CARD(state, isLoading) {
        state.isLoadingPartRealizationBudget = isLoading;
    },
    SET_LOADING_RADIAL_CHART_PART_INFLATION_CONTROL_CARD(state, isLoading) {
        state.isLoadingPartRadialChart = isLoading;
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

    RESET_FILTERS(state) {
        state.currentFilters = {
            year: null,
        };
        state.isMtMDataFetched = false;
        state.isYoYDataFetched = false;
        state.isActionPlanMetricFetched = false;
        state.isMarketSpreadMetricFetched = false;
        state.isYearlyInflationChartTabFetched = false;
        state.isYearlyIPHChartTabFetched = false;
        state.isYearlyTargetRealizationChartTabFetched = false;
        state.isInflationByCommodityChartTabFetched = false;
        state.isTrackerInflationControlCardFetched = false;
        state.isStrategiMetricFetched = false;
        state.isTargetVsRealizationChartFetched = false;
    },
}

const actions = {

    async fetchInitialData({ dispatch, state }) {
        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isYoYDataFetched) {
            await dispatch('fetchSummaryYoYData');
        }

        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isMtMDataFetched) {
            await dispatch('fetchSummaryMtMData');
        }

        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isActionPlanMetricFetched) {
            await dispatch('fetchActionPlanMetric');
        }

        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isMarketSpreadMetricFetched) {
            await dispatch('fetchMarketSpreadMetric');
        }

        // This will fetch data only if the data hasn't been fetched yet.
        if (!state.isYearlyInflationChartTabFetched) {
            await dispatch('fetchYearlyInflationData');
        }

        if (!state.isYearlyIPHChartTabFetched) {
            await dispatch('fetchYearlyIPHData');
        }

        if (!state.isYearlyTargetRealizationChartTabFetched) {
            await dispatch('fetchYearlyTargetRealizationData');
        }

        if (!state.isTrackerInflationControlCardFetched) {
            await dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
        }

        if (!state.isInflationByCommodityChartTabFetched) {
            await dispatch('fetchInflationBySelectedPasarCommodityData');
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
    async getMonthFilter({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');
        try {
            var response = await this.$inflationProfileRepo.getYearFilter(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_MONTH_FILTER', response);
            return status;
        } catch (error) {
            commit('SET_MONTH_FILTER_FAILURE', error.message);
            console.log('error catch', error.message);
        }
    },
    async fetchMonthFilter({ commit }) {
        try {
            const response = await this.$inflationYearFilterRepo.get();
            commit('SET_MONTH_FILTER', response.data);
        } catch (error) {
            commit('SET_MONTH_FILTER_FAILURE', error);
        }
    },

    setSelectedFilters({ commit, dispatch }, filters) {
        commit('SET_CURRENT_FILTERS', filters);

        // Only dispatch fetch if valid filters are set
        if (filters.year) {
            dispatch('fetchSummaryYoYData');
            dispatch('fetchSummaryMtMData');
            dispatch('fetchActionPlanMetric');
            dispatch('fetchMarketSpreadMetric');
            dispatch('fetchYearlyInflationData');
            dispatch('fetchYearlyIPHData');
            dispatch('fetchYearlyTargetRealizationData');
            dispatch('fetchActionPlanAndStrategiesOfWorkunitsData');
            dispatch('fetchInflationBySelectedPasarCommodityData');
        }
    },
    async resetFilters({ commit, dispatch }) {
        commit('RESET_FILTERS');

        // Fetch initial data after resetting filters
        // await dispatch('fetchInitialData');
    },
    setSelectedYear({ commit, dispatch }, yearObject) {
        commit('SET_SELECTED_YEAR', yearObject);
    },

    setSelectedMonth({ commit, dispatch }, monthObject) {
        commit('SET_SELECTED_MONTH', monthObject);
    },

    // 1. YoY Metric
    async fetchSummaryYoYData({ commit, state }) {
        const { year } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&tahun=${year.year}`;
        }

        // Load Metric Data
        commit('SET_LOADING_YOY_METRIC', true);
        try {
            const metricParam = payloadHelper.normalParam(normalParam);
            const metricResponse = await this.$inflationYoYRepo.getByParam(metricParam);
            if (metricResponse.status === 'OK') {
                const result = metricResponse.result[0]; // Access the first element of result array
                const processedData = {
                    tingkat_inflasi: result.inflasi_tahun_ini,
                    tingkat_inflasi_sebelumnya: result.inflasi_tahun_sebelumnya,
                    perubahan_inflasi: result.agg_inflasi_index,
                    satuan: result.satuan,
                    tahun: result.tahun,
                    status: result.status
                };
                commit('SET_YOY_METRIC', processedData);
                commit('SET_YOY_METRIC_STATUS', 'success');
            } else {
                commit('SET_YOY_METRIC_STATUS', 'failure');
            }
            commit('SET_LOADING_YOY_METRIC', false);
        } catch (error) {
            console.error('Error fetching YoY metric:', error);
            commit('SET_YOY_METRIC_STATUS', 'failure');
            commit('SET_LOADING_YOY_METRIC', false);
        }

        // Load Chart Data
        commit('SET_LOADING_YOY_CHART', true);
        try {
            const chartParam = payloadHelper.normalParam(normalParam);
            const chartResponse = await this.$inflationYoYFullYearRepo.getByParam(chartParam);
            if (chartResponse.status === "OK" && Array.isArray(chartResponse.result)) {
                const processedData = chartResponse.result.map(item => {
                    // Check if tingkat_inflasi is not null
                    const inflationRate = item.tingkat_inflasi ?
                        parseFloat(item.tingkat_inflasi.replace(',', '.')) : null;

                    return {
                        inflationRate,
                        year: item.tahun,
                        unit: item.satuan,
                    };
                });
                commit('SET_YOY_CHART', processedData);
                commit('SET_YOY_CHART_STATUS', 'success');
            } else {
                commit('SET_YOY_CHART_STATUS', 'failure');
            }
            commit('SET_LOADING_YOY_CHART', false);
        } catch (error) {
            console.error('Error fetching YoY chart:', error);
            commit('SET_YOY_CHART_STATUS', 'failure');
            commit('SET_LOADING_YOY_CHART', false);
        }
    },

    // 2. MtM Card
    async fetchSummaryMtMData({ commit, state }) {
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

    // 3. Action Plan & 8. Tracker Inflation Control Card
    async fetchActionPlanAndStrategiesOfWorkunitsData({ commit, state }, payload) {
        const { year } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        // If payload is provided, we need to convert it to query parameters
        if (payload) {
            // Iterate over the payload object and append each key-value pair to the query string
            for (const [key, value] of Object.entries(payload)) {
                normalParam += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        }

        if (year) {
            normalParam += `&year=${year.year}`;
        }

        if (!payload) {
            commit('SET_LOADING_ACTION_PLAN_METRIC', true);
            commit('SET_LOADING_TRACKER_INFLATION_CONTROL_CARD', true);
        } else {
            commit('SET_LOADING_BUDGET_PART_INFLATION_CONTROL_CARD', true);
            commit('SET_LOADING_RADIAL_CHART_PART_INFLATION_CONTROL_CARD', true);
        }

        try {
            // Group 1 API requests (strategiMetric, actionPlanMetric, trackerInflationControlCard)
            const group1Requests = this.$reportActionPlanAndStrategiesRepo.getByParam(normalParam);

            // Group 2 API request (targetVsRealizationChart)
            const group2Request = this.$summaryTargetAndRealizationRepo.getByParam(normalParam);

            const [group1Response, group2Response] = await Promise.all([
                group1Requests,
                group2Request,
            ]);

            // Handle group 1 response (strategiMetric, actionPlanMetric, trackerInflationControlCard)
            if (group1Response.status === 'OK') {
                console.log('OK group 1', group1Response);
                const strategiMetricData = {
                    value: group1Response.result.total_kunci_strategi
                };
                const actionPlanData = {
                    current: group1Response.result.total_action_plans,
                    previous: group1Response.result.total_action_plans_before,
                    year: group1Response.result.year,
                    percentage: group1Response.result.percentage,
                };
                let trackerInflationControlData = {
                    list: group1Response.result.breakdown,
                    actionplan: group1Response.result.total_action_plans,
                    budget_realization: group2Response.result.jumlah_anggaran_realisasi,
                    progress_percentage: group2Response.result.progress_factor || 0,
                };

                let budgetRealization = 0;

                if (payload && payload.quarter_id) {
                    // Calculate budget_realization if percentage_realisasi_selected_quarters is available
                    const percentageRealisasi = parseFloat(group2Response.result.percentage_realisasi_selected_quarters.replace('%', '').trim());
                    if (payload.quarter_id === 'all') {
                        budgetRealization = group2Response.result.jumlah_anggaran_realisasi;
                    } else {
                        budgetRealization = Math.round(group2Response.result.jumlah_anggaran_realisasi * (percentageRealisasi / 100));
                    }

                    console.log(budgetRealization);

                    trackerInflationControlData = {
                        list: group1Response.result.breakdown,
                        actionplan: group1Response.result.total_action_plans,
                        budget_realization: budgetRealization,
                        progress_percentage: group2Response.result.percentage_realisasi_selected_quarters || 0,
                    };
                }

                commit('SET_STRATEGI_METRIC', strategiMetricData);
                // commit('SET_ACTION_PLAN_METRIC', actionPlanData);
                commit('SET_TRACKER_INFLATION_CONTROL_CARD', trackerInflationControlData);

                commit('SET_STRATEGI_METRIC_STATUS', 'success');
                // commit('SET_ACTION_PLAN_METRIC_STATUS', 'success');
                commit('SET_TRACKER_INFLATION_CONTROL_CARD_STATUS', 'success');
            } else {
                commit('SET_STRATEGI_METRIC_STATUS', 'failure');
                // commit('SET_ACTION_PLAN_METRIC_STATUS', 'failure');
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

        } catch (error) {
            // Handle errors and set failure statuses for each group
            console.error('Error fetching grouped metrics:', error);
            // commit('SET_ACTION_PLAN_METRIC_STATUS', 'failure');
            commit('SET_TRACKER_INFLATION_CONTROL_CARD_STATUS', 'failure');
        } finally {
            if (!payload) {
                // Set loading states to false after API calls complete
                commit('SET_LOADING_ACTION_PLAN_METRIC', false);
                commit('SET_LOADING_TRACKER_INFLATION_CONTROL_CARD', false);
            } else {
                commit('SET_LOADING_BUDGET_PART_INFLATION_CONTROL_CARD', false);
                commit('SET_LOADING_RADIAL_CHART_PART_INFLATION_CONTROL_CARD', false);
            }
        }
    },

    // 4. Market Spread
    // Action Plan Card Async Method
    async fetchActionPlanMetric({ commit, state }) {
        commit('SET_LOADING_ACTION_PLAN_METRIC', true);
        const { year } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&tahun=${year.year}`;
        }

        try {
            const response = await this.$inflationActionPlanAndStrategiesRepo.getByParam(normalParam);

            if (response.result && response.status === "OK") {
                commit("SET_ACTION_PLAN_METRIC", response.result);
                commit('SET_ACTION_PLAN_METRIC_STATUS', 'success');
            } else {
                commit('SET_ACTION_PLAN_METRIC_STATUS', 'error');
            }
        } catch (error) {
            commit('SET_ACTION_PLAN_METRIC_STATUS', 'error');
            console.error('Error fetching Action Plan metric:', error);
        } finally {
            commit('SET_LOADING_ACTION_PLAN_METRIC', false);
        }
    },

    // Market Spread Card Async Method
    async fetchMarketSpreadMetric({ commit, state }) {
        commit('SET_LOADING_MARKET_SPREAD_METRIC', true);
        const { year } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&tahun=${year.year}`;
        }

        try {
            const response = await this.$civicMarketListRepo.getByParam(normalParam);

            if (response.result && response.status === "OK") {
                commit("SET_MARKET_SPREAD_METRIC", response.result);
                commit('SET_MARKET_SPREAD_METRIC_STATUS', 'success');
            } else {
                commit('SET_MARKET_SPREAD_METRIC_STATUS', 'error');
            }
        } catch (error) {
            commit('SET_MARKET_SPREAD_METRIC_STATUS', 'error');
            console.error('Error fetching Market Spread metric:', error);
        } finally {
            commit('SET_LOADING_MARKET_SPREAD_METRIC', false);
        }
    },

    // Yearly Inflation Async Method
    async fetchYearlyInflationData({ commit, state, getters }) {
        commit('SET_LOADING_YEARLY_INFLATION_METRIC', true);
        const { year } = state.currentFilters;

        // Initialize parameters for current year and previous year
        let normalParam1 = payloadHelper.normalParam('');
        let normalParam2 = payloadHelper.normalParam('');

        if (year) {
            normalParam1 += `&tahun=${year.year}`;
            normalParam2 += `&tahun=${year.year - 1}`;
        } else {
            normalParam1 += `&tahun=${getters.getCurrentYear}`;
            normalParam2 += `&tahun=${getters.getPreviousYear}`;
        }

        try {
            // Fetch data for the current year
            const responseYear1 = await this.$inflationMtMFullYearRepo.getByParam(normalParam1);
            // Fetch data for the previous year
            const responseYear2 = await this.$inflationMtMFullYearRepo.getByParam(normalParam2);

            // Check if both responses are valid
            if (responseYear1.result && responseYear1.status === "OK" && responseYear2.result && responseYear2.status === "OK") {
                // Combine both results into one array for storage
                const combinedResults = {
                    currentYear: responseYear1.result,
                    previousYear: responseYear2.result
                };
                commit("SET_YEARLY_INFLATION_METRIC", combinedResults);
                commit('SET_YEARLY_INFLATION_METRIC_STATUS', 'success');
            } else {
                commit('SET_YEARLY_INFLATION_METRIC_STATUS', 'error');
            }
        } catch (error) {
            commit('SET_YEARLY_INFLATION_METRIC_STATUS', 'error');
            console.error('Error fetching Yearly Inflation data:', error);
        } finally {
            commit('SET_LOADING_YEARLY_INFLATION_METRIC', false);
        }
    },


    // Yearly IPH Async Method
    async fetchYearlyIPHData({ commit, state }) {
        commit('SET_LOADING_YEARLY_IPH_METRIC', true);
        const { year } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&year=${year.year}`;
        }

        try {
            const response = await this.$iph12WeeksRepo.getByParam(normalParam);

            if (response.result && response.status === "OK") {
                // Check if result is an array before attempting to reverse it
                if (Array.isArray(response.result)) {
                    commit("SET_YEARLY_IPH_METRIC", response.result.reverse());
                } else {
                    // If result is not an array, handle accordingly (e.g., set as empty array or log a message)
                    console.warn("Expected an array, but got:", response.result);
                    commit("SET_YEARLY_IPH_METRIC", []);
                }
                commit('SET_YEARLY_IPH_METRIC_STATUS', 'success');
            } else {
                commit('SET_YEARLY_IPH_METRIC_STATUS', 'error');
                console.warn('No valid data found for the selected year.');
            }
        } catch (error) {
            commit('SET_YEARLY_IPH_METRIC_STATUS', 'error');
            console.error('Error fetching Yearly IPH data:', error);
        } finally {
            commit('SET_LOADING_YEARLY_IPH_METRIC', false);
        }
    },

    // Yearly Target Realization Async Method
    async fetchYearlyTargetRealizationData({ commit, state }) {
        commit('SET_LOADING_YEARLY_TARGET_REALIZATION_METRIC', true);
        const { year } = state.currentFilters;

        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&year=${year.year}`;
        }

        try {
            const response = await this.$reportTargetAndRealizationRepo.getByParam(normalParam);

            if (response.result && response.status === "OK") {
                commit("SET_YEARLY_TARGET_REALIZATION_METRIC", response.result);
                commit('SET_YEARLY_TARGET_REALIZATION_METRIC_STATUS', 'success');
            } else {
                commit('SET_YEARLY_TARGET_REALIZATION_METRIC_STATUS', 'error');
            }
        } catch (error) {
            commit('SET_YEARLY_TARGET_REALIZATION_METRIC_STATUS', 'error');
            console.error('Error fetching Yearly Target Realization data:', error);
        } finally {
            commit('SET_LOADING_YEARLY_TARGET_REALIZATION_METRIC', false);
        }
    },

    // Inflation By Commodity Async Method
    async fetchInflationBySelectedPasarCommodityData({ commit, dispatch, state }) {
        console.log('1. fetching data inflation by selected pasar commodity');
        console.time("processTime");
        commit('SET_LOADING_INFLATION_BY_COMMODITY_METRIC', true); // Set loading state

        const { year } = state.currentFilters; // Extract year from current filters
        let normalParam = payloadHelper.normalParam('');

        if (year) {
            normalParam += `&year=${year.year}`; // Append year to normal parameters
        }

        // Define pasar IDs instead of commodity IDs
        const pasarIds = [1, 2, 3, 4, 5, 6]; // Your pasar IDs

        try {
            // Prepare an array to hold promises for fetching each pasar
            const fetchPromises = pasarIds.map((pasarId) =>
                fetchCommodityForPasarId(this, pasarId, normalParam)
            );

            // Wait for all fetches to complete
            const results = await Promise.all(fetchPromises);

            // Process results to update the store
            results.forEach((result, index) => {
                if (result && result.status === 'OK' && result.result) {
                    commit('SET_PASAR_DATA', {
                        pasarId: pasarIds[index],
                        data: result.result,
                    });
                } else {
                    // Set default values if data is missing or response is unexpected
                    commit('SET_PASAR_DATA', {
                        pasarId: pasarIds[index],
                        data: [
                            {
                                commodity_name: 'No Data',
                                current_average_price: 'No Data',
                                previous_average_price: 'No Data',
                                status: 'No Data',
                            },
                        ],
                    });
                }
            });

            // Aggregate data after all pasar data is fetched
            if (state.isInflationByPasarCardFetched) {
                dispatch('aggregatePriceIncreaseCommodities');
            }

        } catch (error) {
            commit('SET_INFLATION_BY_COMMODITY_METRIC_STATUS', 'error');
            console.error('Error fetching all pasar data:', error);
        } finally {
            // commit('SET_LOADING_INFLATION_BY_COMMODITY_METRIC', false);
        }
    },

    aggregatePriceIncreaseCommodities({ state, commit }) {
        commit('SET_INFLATION_BY_COMMODITY_METRIC_STATUS', 'success');
        console.log('2. count the commodities that increased');
        console.timeEnd("processTime");
        const allPricesData = {};

        // Step 1: Organize data by commodity across all pasar
        Object.values(state.pasarData).forEach(pasar => {
            pasar.forEach(commodity => {
                const name = commodity.commodity_name;
                if (!allPricesData[name]) {
                    allPricesData[name] = {
                        currentPrices: [],
                        previousPrices: [],
                    };
                }
                if (commodity.current_average_price !== 'No Data') {
                    allPricesData[name].currentPrices.push({
                        price: parseFloat(commodity.current_average_price),
                        price_date: commodity.price_date
                    });
                }
                if (commodity.previous_average_price !== 'No Data') {
                    allPricesData[name].previousPrices.push({
                        price: parseFloat(commodity.previous_average_price),
                        price_date: commodity.previous_price_date
                    });
                }
            });
        });

        console.dir(allPricesData);

        // Step 2: Calculate average and determine price status for each commodity
        const commoditiesWithIncrease = Object.keys(allPricesData).map(commodityName => {
            const data = allPricesData[commodityName];
            const currentAvg = data.currentPrices.reduce((a, b) => a + b.price, 0) / data.currentPrices.length;
            const previousAvg = data.previousPrices.reduce((a, b) => a + b.price, 0) / data.previousPrices.length;

            const percentageChange = ((currentAvg - previousAvg) / previousAvg) * 100;
            const status = percentageChange > 0 ? 'Naik' : (percentageChange < 0 ? 'Turun' : 'Stabil');

            // Get price range for this commodity
            const minPrice = Math.min(...data.currentPrices.map(c => c.price));
            const maxPrice = Math.max(...data.currentPrices.map(c => c.price));

            // Find the latest price date for current and previous data
            const latestCurrentDate = data.currentPrices.length > 0 ? data.currentPrices[0].price_date : null;
            const latestPreviousDate = data.previousPrices.length > 0 ? data.previousPrices[0].price_date : null;

            return {
                commodity_name: commodityName,
                current_average_price: currentAvg.toFixed(2),
                previous_average_price: previousAvg.toFixed(2),
                percentage_change: `${Math.abs(percentageChange).toFixed(2)}%`,
                status,
                price_range: `Rp. ${minPrice} - Rp. ${maxPrice}`,
                latest_price_date: latestCurrentDate,
                previous_price_date: latestPreviousDate
            };
        });

        // Step 3: Filter only commodities with "Naik" status and commit to state
        const onlyIncreasedCommodities = commoditiesWithIncrease.filter(c => c.status === 'Naik');
        commit('SET_COMMODITIES_WITH_PRICE_INCREASE', onlyIncreasedCommodities);
        commit('SET_LOADING_INFLATION_BY_COMMODITY_METRIC', false);
    },

    setQuarterActiveTab({ commit }, tab) {
        commit('SET_QUARTER_ACTIVE_TAB', tab);
    },


}

const getters = {
    getCurrentYear: () => {
        return new Date().getFullYear(); // Get the current year
    },
    getPreviousYear: (state, getters) => {
        return getters.getCurrentYear - 1; // Get the previous year using the current year getter
    },
    getQuarterActiveTab(state) {
        return state.quarterActiveTab;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

// Helper function outside the Vuex actions
async function fetchCommodityForPasarId(context, pasarId, normalParam) {
    const param = `${normalParam}&pasar_id=${pasarId}`; // Use pasar_id in the parameters
    try {
        const response = await context.$summaryPasarCommodityAggregatePricesRepo.getByParam(param);
        return response; // Return the response object as-is
    } catch (error) {
        console.error(`Failed to fetch data for pasarId ${pasarId}:`, error);
        return { status: 'error', data: null }; // Return default if fetch fails
    }
}