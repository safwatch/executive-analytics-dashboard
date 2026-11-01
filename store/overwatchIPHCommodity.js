import axios from "axios";

import { responseHelper } from "../helpers/response.helper";
import { payloadHelper } from "../helpers/payload.helper";

const state = () => ({
  selectedYear: null,
  currentFilters: {
    year: null,
  },

  inflationPriceDev: [],
  inflationPriceDevStatus: null,

  inflationCommodityDev: [],
  inflationCommodityDevStatus: null,

  inflationMarketDev: [],
  inflationMarketDevStatus: null,

  inflationCommodityMonth1: [],
  inflationCommodityMonth2: [],
  inflationCommodityMonth3: [],
  inflationCommodityMonth4: [],
  inflationCommodityMonthStatus: null,
  inflationCommodityDefMonth1: [],
  inflationCommodityDefMonth2: [],
  inflationCommodityDefMonth3: [],
  inflationCommodityDefMonth4: [],

  inflationGauge: [],
  inflationGaugeStatus: [],

  inflationTreeMapInflasi: [],
  inflationTreeMapDeflasi: [],
  inflationTreeMapStatus: [],

  annualTrend: [],
  annualTrendStatus: null,
  monthlyTrend: [],
  monthlyTrendStatus: null,
  inflationControl: [],
  inflationControlStatus: null,
  budget: [],
  budgetStatus: null,
  yearFilter: [],
  yearFilterStatus: null,

  civicVsJabarVsNational: [],
  civicVsJabarVsNationalStatus: null,
  civicVsBandungRayaVsJabar: [],
  civicVsBandungRayaVsJabarStatus: null,

  // Work in Progress

  // IPH Data Metriks
  IPHMetric: {},
  IPHMetricStatus: null,
  isLoadingIPHMetric: true,
  isIPHMetricFetched: false,

  // 1.1 Indeks Perkembangan Harga
  iphDataChart: [],
  iphDataChartStatus: null,
  isLoadingIPHDataChart: true,
  isIPHDataChartFetched: false,

  // 1.2 Aggregate Commodity (Up, Down & Stable)
  aggCommodityChangeChart: [],
  aggCommodityChangeStatus: null,
  isLoadingAggCommodityChangeChart: true,
  isAggCommodityChangeFetched: false,

  // 1.3 Aggregate Market Price Change Occured (Up, Down & Stable)
  aggMarketPriceChangeChart: [],
  aggMarketPriceChangeStatus: null,
  isLoadingAggMarketPriceChangeChart: true,
  isAggMarketPriceChangeFetched: false,

  // 1.4 Total Agg Commodity
  aggTotalCommodityMetric: null,
  aggTotalCommodityStatus: null,
  isLoadingAggTotalCommodity: true,
  isAggTotalCommodityFetched: false,

  // 1.5 Market Summary
  aggMarketSummaryMetric: null,
  aggMarketSummaryStatus: null,
  isLoadingAggMarketSummary: true,
  isAggMarketSummaryFetched: false,

  // 1.6 IPH Estimation Monthly
  iphEstimationMetric: null,
  iphEstimationStatus: null,
  isLoadingIPHEstimation: true,
  isIPHEstimationFetched: false,

  // 1.7 IPH Estimation Monthly
  cheapMarketMetric: null,
  cheapMarketStatus: null,
  isLoadingCheapMarket: true,
  isCheapMarketFetched: false,

  // 1.8 Commodity Treemap Metric
  commodityTreemapMetric: null,
  commodityTreemapStatus: null,
  isLoadingCommodityTreemap: true,
  isCommodityTreemapFetched: false,

  // 1.8 Commodity Latest Quarter
  commodityLatestQuarterMetric: null,
  commodityLatestQuarterStatus: null,
  isLoadingCommodityLatestQuarter: true,
  isCommodityLatestQuarterFetched: false,

  // 1.9 IPH Commodity Treemap
  iphCommodityTreemapChart: null,
  iphCommodityTreemapStatus: null,
  isLoadingIPHCommodityTreemap: true,
  isIPHCommodityTreemapFetched: false,

  // IPH Commodity Naik
  iphCommodityNaikMetric: null,
  iphCommodityNaikLatestStatus: null,
  isLoadingCommodityNaik: true,
  isIPHCommodityNaikFetched: false,

  // IPH Commodity Turun
  iphCommodityTurunMetric: null,
  iphCommodityTurunLatestStatus: null,
  isLoadingCommodityTurun: true,
  isIPHCommodityTurunFetched: false,

  // IPH Commodity Tetap
  iphCommodityTetapMetric: null,
  iphCommodityTetapLatestStatus: null,
  isLoadingCommodityTetap: true,
  isIPHCommodityTetapFetched: false,

  //heatmap
  heatmapComodityMonitoring: [],
  heatmapComodityMonitoringStatus: null,
  isLoadingHeatmapCommodityMonitoring: true,
  isHeatmapCommodityMonitoringFetched: false,

  // Pemantauan Komoditas Bulan .. tahun ...
  monthlyComodityMonitoring: null,
  monthlyComodityMonitoringStatus: null,
  isLoadingMonthlyComodityMonitoring: true,
  isMonthlyComodityMonitoringFetched: false,

  //Peta Sebaran Komoditas Per Pasar
  marketComodityDistribution: [],
  marketComodityDistributionStatus: null,
  isLoadingMarketComodityDistribution: true,
  isMarketComodityDistributionFetched:false,

  //Filter Peta Sebaran Komoditas Per Pasar
  selectedMarket: [],
});

const getters = {
  getYear(state) {
    // Check if selectedYear exists and has a year
    return state.selectedYear && state.selectedYear.year
      ? state.selectedYear.year
      : new Date().getFullYear();
  },
  getCurrentYear: () => {
    return new Date().getFullYear(); // Get the current year
  },

  //Peta Sebaran Komoditas Per Pasar
  isLoading: (s) => s.isLoadingMarketComodityDistribution,
  fetchStatus: (s) => s.marketComodityDistributionStatus,

   // Normalisasi field API → format komponen
  mappedCommodities: (s) =>
    (s.marketComodityDistribution || []).map((it) => {
      const pct = Number(it.percentage_change) || 0;
      const absPct = Math.abs(pct);
      const status = (it.status || "").toUpperCase(); // NAIK/TURUN/STABIL
      const changeType = status === "NAIK" ? "up" : status === "TURUN" ? "down" : "stable";
      return {
        id: it.comodity_id,
        market_id: it.pasar_id,
        market_name: it.nama_pasar,
        name: it.nama_komoditas,
        previous_price: Number(it.harga_sebelumnya) || 0,
        current_price: Number(it.harga_terbaru) || 0,
        price: `Rp ${Number(it.harga_terbaru || 0).toLocaleString("id-ID")}/kg`,
        price_change: status === "STABIL" ? "Stabil" : `${status === "NAIK" ? "Naik" : "Turun"} ${absPct}%`,
        price_change_percentage: absPct,
        change_type: changeType, // 'up' | 'down' | 'stable'
        date: it.tanggal,
      };
    }),

  // Filter client-side: prioritas pakai marketId kalau ada; kalau tidak, pakai nama
  commoditiesBySelectedMarket: (s, g) => {
    const byId = s.currentFilters.marketId;
    if (byId) return g.mappedCommodities.filter((it) => it.market_id === Number(byId));

    const name = (s.currentFilters.marketName || "").trim().toLowerCase();
    if (!name) return g.mappedCommodities;
    return g.mappedCommodities.filter(
      (it) => (it.market_name || "").trim().toLowerCase() === name
    );
  },

  currentMarketName: (s) => s.currentFilters.marketName,

};

const mutations = {
  SET_SELECTED_YEAR(state, yearObject) {
    state.selectedYear = yearObject; // Store the entire object
  },
  SET_CURRENT_FILTERS(state, filters) {
    state.currentFilters = filters;
  },

  SET_ANNUAL_TREND(state, data) {
    state.annualTrend = data;
    state.annualTrendStatus = data.status;
  },
  SET_ANNUAL_TREND_FAILURE(state, data) {
    state.annualTrendStatus = data.status;
  },
  SET_MONTHLY_TREND(state, data) {
    state.monthlyTrend = data;
    state.monthlyTrendStatus = data.status;
  },
  SET_MONTHLY_TREND_FAILURE(state, data) {
    state.monthlyTrendStatus = data.status;
  },
  SET_INFLATION_CONTROL(state, data) {
    state.inflationControl = data;
    state.inflationControlStatus = data.status;
  },
  SET_INFLATION_CONTROL_FAILURE(state, data) {
    state.inflationControlStatus = data.status;
  },
  SET_BUDGET(state, data) {
    state.budget = data;
    state.budgetStatus = data.status;
  },
  SET_BUDGET_FAILURE(state, data) {
    state.budgetStatus = data.status;
  },
  SET_YEAR_FILTER(state, data) {
    state.yearFilter = data;
    state.yearFilterStatus = data.status;
  },
  SET_YEAR_FILTER_FAILURE(state, data) {
    state.yearFilterStatus = data.status;
  },
  SET_FIVE_YEAR_TREND(state, data) {
    state.fiveYearTrend = data;
    state.fiveYearTrendStatus = "success";
  },
  SET_INFLATION_PRICE_DEV(state, data) {
    state.inflationPriceDev = data;
    state.inflationPriceDevStatus = "success";
  },
  SET_INFLATION_PRICE_DEV_FAILURE(state, data) {
    state.inflationPriceDevStatus = "failure";
  },
  SET_INFLATION_COMMODITY_MONTH1(state, data) {
    state.inflationCommodityMonth1 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_MONTH2(state, data) {
    state.inflationCommodityMonth2 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_MONTH3(state, data) {
    state.inflationCommodityMonth3 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_MONTH4(state, data) {
    state.inflationCommodityMonth4 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_DEF_MONTH1(state, data) {
    state.inflationCommodityDefMonth1 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_DEF_MONTH2(state, data) {
    state.inflationCommodityDefMonth2 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_DEF_MONTH3(state, data) {
    state.inflationCommodityDefMonth3 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_DEF_MONTH4(state, data) {
    state.inflationCommodityDefMonth4 = data;
    state.inflationCommodityMonthStatus = "success";
  },
  SET_INFLATION_COMMODITY_MONTH_FAILURE(state, data) {
    state.inflationCommodityMonthStatus = "failure";
  },
  SET_INFLATION_GAUGE(state, data) {
    state.inflationGauge = data;
    state.inflationGaugeStatus = "success";
  },
  SET_INFLATION_GAUGE_FAILURE(state) {
    state.inflationGauge = null;
    state.inflationGaugeStatus = "failure";
  },
  SET_FIVE_YEAR_TREND_FAILURE(state) {
    state.fiveYearTrendStatus = "failure";
  },
  SET_CIMAHI_VS_JABAR_VS_NATIONAL(state, data) {
    state.civicVsJabarVsNational = data;
    state.civicVsJabarVsNationalStatus = data.status;
  },
  SET_CIMAHI_VS_JABAR_VS_NATIONAL_FAILURE(state, data) {
    state.civicVsJabarVsNationalStatus = data.status;
  },
  SET_CIMAHI_VS_BANDUNGRAYA_VS_JABAR(state, data) {
    state.civicVsBandungRayaVsJabar = data;
    state.civicVsBandungRayaVsJabarStatus = data.status;
  },
  SET_CIMAHI_VS_BANDUNGRAYA_VS_JABAR_FAILURE(state, data) {
    state.civicVsBandungRayaVsJabarStatus = data.status;
  },
  SET_INFLATION_TREE_MAP_INFLASI(state, data) {
    state.inflationTreeMapInflasi = data;
    state.inflationTreeMapStatus = data.status;
  },
  SET_INFLATION_TREE_MAP_DEFLASI(state, data) {
    state.inflationTreeMapDeflasi = data;
    state.inflationTreeMapStatus = data.status;
  },
  SET_INFLATION_TREE_MAP_FAILURE(state, data) {
    state.inflationTreeMapStatus = data.status;
  },

  SET_INFLATION_COMMODITY_DEV(state, data) {
    state.inflationCommodityDev = data;
    state.inflationCommodityDevStatus = "success";
  },
  SET_INFLATION_COMMODITY_DEV_FAILURE(state) {
    state.inflationCommodityDevStatus = "failure";
  },

  SET_INFLATION_MARKET_DEV(state, data) {
    state.inflationMarketDev = data;
    state.inflationMarketDevStatus = "success";
  },
  SET_INFLATION_MARKET_DEV_FAILURE(state) {
    state.inflationMarketDevStatus = "failure";
  },

  // IPH
  SET_IPH_METRIC_DATA(state, data) {
    state.IPHMetric = data;
    state.isIPHMetricFetched = true;
  },
  SET_IPH_METRIC_STATUS(state, status) {
    state.IPHMetricStatus = status;
  },
  SET_LOADING_IPH_METRIC(state, isLoading) {
    state.isLoadingIPHMetric = isLoading;
  },

  // IPH Data Mutations
  SET_IPH_DATA_CHART(state, data) {
    state.iphDataChart = data;
    state.isIPHDataChartFetched = true;
  },
  SET_IPH_DATA_CHART_STATUS(state, status) {
    state.iphDataChartStatus = status;
  },
  SET_LOADING_IPH_DATA_CHART(state, isLoading) {
    state.isLoadingIPHDataChart = isLoading;
  },

  // Aggregate Commodity Change Mutations
  SET_AGG_COMMODITY_CHANGE_CHART(state, data) {
    state.aggCommodityChangeChart = data;
    state.isAggCommodityChangeFetched = true;
  },
  SET_AGG_COMMODITY_CHANGE_STATUS(state, status) {
    state.aggCommodityChangeStatus = status;
  },
  SET_LOADING_AGG_COMMODITY_CHANGE_CHART(state, isLoading) {
    state.isLoadingAggCommodityChangeChart = isLoading;
  },

  // Aggregate Market Price Change that occured
  SET_AGG_MARKET_PRICE_CHANGE_CHART(state, data) {
    state.aggMarketPriceChangeChart = data;
    state.isAggMarketPriceChangeFetched = true;
  },
  SET_AGG_MARKET_PRICE_CHANGE_STATUS(state, status) {
    state.aggMarketPriceChangeStatus = status;
  },
  SET_LOADING_AGG_MARKET_PRICE_CHANGE_CHART(state, isLoading) {
    state.isLoadingAggMarketPriceChangeChart = isLoading;
  },
  // Strategy Metric Mutations
  SET_AGG_TOTAL_COMMODITY(state, data) {
    state.aggTotalCommodityMetric = data;
    state.isAggTotalCommodityFetched = true;
  },
  SET_AGG_TOTAL_COMMODITY_STATUS(state, status) {
    state.aggTotalCommodityStatus = status;
  },
  SET_LOADING_AGG_TOTAL_COMMODITY(state, isLoading) {
    state.isLoadingAggTotalCommodity = isLoading;
  },
  // Market Summary Mutations
  SET_AGG_MARKET_SUMMARY(state, data) {
    state.aggMarketSummaryMetric = data;
    state.isAggMarketSummaryFetched = true;
  },
  SET_AGG_MARKET_SUMMARY_STATUS(state, status) {
    state.aggMarketSummaryStatus = status;
  },
  SET_LOADING_AGG_MARKET_SUMMARY(state, isLoading) {
    state.isLoadingAggMarketSummary = isLoading;
  },

  // IPH Estimation Mutations
  SET_IPH_ESTIMATION(state, data) {
    state.iphEstimationMetric = data;
    state.isIPHEstimationFetched = true;
  },
  SET_IPH_ESTIMATION_STATUS(state, status) {
    state.iphEstimationStatus = status;
  },
  SET_LOADING_IPH_ESTIMATION(state, isLoading) {
    state.isLoadingIPHEstimation = isLoading;
  },

  // IPH Estimation Mutations
  SET_CHEAP_MARKET(state, data) {
    state.cheapMarketMetric = data;
    state.isCheapMarketFetched = true;
  },
  SET_CHEAP_MARKET_STATUS(state, status) {
    state.cheapMarketStatus = status;
  },
  SET_LOADING_CHEAP_MARKET(state, isLoading) {
    state.isLoadingCheapMarket = isLoading;
  },

  // Commodity Treemap Metric
  SET_COMMODITY_TREEMAP(state, data) {
    state.commodityTreemapMetric = data;
    state.isCommodityTreemapFetched = true;
  },
  SET_COMMODITY_TREEMAP_STATUS(state, status) {
    state.commodityTreemapStatus = status;
  },
  SET_LOADING_COMMODITY_TREEMAP(state, isLoading) {
    state.isLoadingCommodityTreemap = isLoading;
  },

  // IPH Commodity Naik
  SET_IPH_COMMODITY_NAIK(state, data) {
    state.iphCommodityNaikMetric = data;
    state.isIPHCommodityNaikFetched = true;
  },

  SET_IPH_COMMODITY_LATEST_STATUS(state, status) {
    state.iphCommodityNaikLatestStatus = status;
  },

  SET_LOADING_IPH_COMMODITY_NAIK(state, isLoading) {
    state.isLoadingCommodityNaik = isLoading;
  },

  // IPH Commodity Turun
  SET_IPH_COMMODITY_TURUN(state, data) {
    state.iphCommodityTurunMetric = data;
    state.isIPHCommodityTurunFetched = true;
  },

  SET_IPH_COMMODITY_LATEST_STATUS(state, status) {
    state.iphCommodityTurunLatestStatus = status;
  },

  SET_LOADING_IPH_COMMODITY_TURUN(state, isLoading) {
    state.isLoadingCommodityTurun = isLoading;
  },

  // IPH Commodity Tetap
  SET_IPH_COMMODITY_TETAP(state, data) {
    state.iphCommodityTetapMetric = data;
    state.isIPHCommodityTetapFetched = true;
  },

  SET_IPH_COMMODITY_LATEST_STATUS(state, status) {
    state.iphCommodityTetapLatestStatus = status;
  },

  SET_LOADING_IPH_COMMODITY_TETAP(state, isLoading) {
    state.isLoadingCommodityTetap = isLoading;
  },

  // Commodity Latest Quarter
  SET_COMMODITY_LATEST_QUARTER(state, data) {
    state.commodityLatestQuarterMetric = data;
    state.isCommodityLatestQuarterFetched = true;
  },
  SET_COMMODITY_LATEST_QUARTER_STATUS(state, status) {
    state.commodityLatestQuarterStatus = status;
  },
  SET_LOADING_COMMODITY_LATEST_QUARTER(state, isLoading) {
    state.isLoadingCommodityLatestQuarter = isLoading;
  },

  // IPH Commodity Treemap
  SET_IPH_COMMODITY_TREEMAP(state, data) {
    state.iphCommodityTreemapChart = data;
    state.isIPHCommodityTreemapFetched = true;
  },
  SET_IPH_COMMODITY_TREEMAP_STATUS(state, status) {
    state.iphCommodityTreemapStatus = status;
  },
  SET_LOADING_IPH_COMMODITY_TREEMAP(state, isLoading) {
    state.isLoadingIPHCommodityTreemap = isLoading;
  },

  // Heatmap Pemantauan komoditas 20 treemap
  SET_HEATMAP_COMODITY_MONITORING(state, data) {
    state.heatmapComodityMonitoring = data;
    state.isHeatmapCommodityMonitoringFetched = true;
  },
  SET_HEATMAP_COMODITY_MONITORING_STATUS(state, status) {
    state.heatmapComodityMonitoringStatus = status;
  },
  SET_LOADING_HEATMAP_COMODITY_MONITORING(state, isLoading) {
    state.isLoadingHeatmapCommodityMonitoring = isLoading;
  },

  // Pemantauan Komoditas Bulan ... tahun ...
  SET_MONTHLY_COMODITY_MONITORING(state, data) {
    state.monthlyComodityMonitoring = data.list_komoditas_detail;
    state.month = data.nama_bulan;
    state.year = data.tahun;
    state.isMonthlyComodityMonitoringFetched = true;
    console.log("Data Bulan: ", state.month);
    console.log("Data Tahun: ", state.year);
  },
  SET_MONTHLY_COMODITY_MONITORING_STATUS(state, status) {
    state.monthlyComodityMonitoringStatus = status;
  },

  SET_LOADING_MONTHLY_COMODITY_MONITORING(state, isLoading) {
    state.isLoadingMonthlyComodityMonitoring = isLoading;
  },

  //Peta Sebaran Komoditas Per Pasar
  SET_MARKET_COMODITY_DISTRIBUTION(state, list) {
    state.marketComodityDistribution = Array.isArray(list) ? list : [];
    state.isMarketComodityDistributionFetched = true;
  },

  SET_MARKET_COMODITY_DISTRIBUTION_STATUS(state, status) {
    state.marketComodityDistributionStatus = status;
  },

  SET_LOADING_MARKET_COMODITY_DISTRIBUTION(state, isLoading) {
   state.isLoadingMarketComodityDistribution = isLoading;
  },

    SET_MARKET_NAME(state, payload) {
    // Terima "Pasar Antri" atau object { nama_pasar: "Pasar Antri" }
    const name = typeof payload === "string"
      ? payload
      : payload?.nama_pasar || payload?.market_name || null;
    state.currentFilters.marketName = name;
  },

  SET_MARKET_ID(state, id) {
    state.currentFilters.marketId = id ?? null; // bisa undefined/null
  },

  SET_SELECTED_MARKET(state, market) {
    state.selectedMarket = market; // Commit the market object
  }
};

const actions = {
  setSelectedMarket({ commit }, selectedMarket) {
    commit('SET_SELECTED_MARKET', selectedMarket)
  },

  async fetchInitialData({ dispatch, state }) {
    // This will fetch data only if the data hasn't been fetched yet.
    if (!state.isIPHDataChartFetched) {
      // await dispatch("fetchCommodityLatestQuarterData");
      await dispatch("fetchIPHCommodityTreemapData");
      // await dispatch("fetchIPHCommodityNaik");
      // await dispatch("fetchIPHCommodityTurun");
      // await dispatch("fetchIPHCommodityTetap");
    }
  },

  async getAnnualTrend({ commit }, {} = {}) {
    let normalParam = payloadHelper.normalParam("");

    try {
      var response = await this.$inflationProfileRepo.getAnnualTrend(
        normalParam
      );
      var status = responseHelper.statusCheck(
        response.status,
        response.message
      );
      commit("SET_ANNUAL_TREND", response);
      return status;
    } catch (error) {
      commit("SET_ANNUAL_TREND_FAILURE", error.message);
      console.log("error catch", error.message);
    }
  },
  async getMonthlyTrend({ commit }, {} = {}) {
    let normalParam = payloadHelper.normalParam("");

    try {
      var response = await this.$inflationProfileRepo.getMonthlyTrend(
        normalParam
      );
      var status = responseHelper.statusCheck(
        response.status,
        response.message
      );
      commit("SET_MONTHLY_TREND", response);
      return status;
    } catch (error) {
      commit("SET_MONTHLY_TREND_FAILURE", error.message);
      console.log("error catch", error.message);
    }
  },
  async getInflationControl({ commit }, {} = {}) {
    let normalParam = payloadHelper.normalParam("");

    try {
      var response = await this.$inflationProfileRepo.getInflationControl(
        normalParam
      );
      var status = responseHelper.statusCheck(
        response.status,
        response.message
      );
      commit("SET_INFLATION_CONTROL", response);
      return status;
    } catch (error) {
      commit("SET_INFLATION_CONTROL_FAILURE", error.message);
      console.log("error catch", error.message);
    }
  },
  async getBudget({ commit }, {} = {}) {
    let normalParam = payloadHelper.normalParam("");

    try {
      var response = await this.$inflationProfileRepo.getBudget(normalParam);
      var status = responseHelper.statusCheck(
        response.status,
        response.message
      );
      commit("SET_BUDGET", response);
      return status;
    } catch (error) {
      commit("SET_BUDGET_FAILURE", error.message);
      console.log("error catch", error.message);
    }
  },
  async getYearFilter({ commit }, {} = {}) {
    let normalParam = payloadHelper.normalParam("");

    try {
      var response = await this.$inflationProfileRepo.getYearFilter(
        normalParam
      );
      var status = responseHelper.statusCheck(
        response.status,
        response.message
      );
      commit("SET_YEAR_FILTER", response);
      return status;
    } catch (error) {
      commit("SET_YEAR_FILTER_FAILURE", error.message);
      console.log("error catch", error.message);
    }
  },
  async getCivicVsJabarVsNational({ commit }, {} = {}) {
    let normalParam = payloadHelper.normalParam("");

    try {
      var response =
        await this.$inflationProfileRepo.getCivicVsJabarVsNational(
          normalParam
        );
      var status = responseHelper.statusCheck(
        response.status,
        response.message
      );
      commit("SET_CIMAHI_VS_JABAR_VS_NATIONAL", response);
      return status;
    } catch (error) {
      commit("SET_CIMAHI_VS_JABAR_VS_NATIONAL_FAILURE", error.message);
      console.log("error catch", error.message);
    }
  },
  async getCivicVsBandungRayaVsJabar({ commit }, {} = {}) {
    let normalParam = payloadHelper.normalParam("");

    try {
      var response =
        await this.$inflationProfileRepo.getCivicVsBandungRayaVsJabar(
          normalParam
        );
      var status = responseHelper.statusCheck(
        response.status,
        response.message
      );
      commit("SET_CIMAHI_VS_BANDUNGRAYA_VS_JABAR", response);
      return status;
    } catch (error) {
      commit("SET_CIMAHI_VS_BANDUNGRAYA_VS_JABAR_FAILURE", error.message);
      console.log("error catch", error.message);
    }
  },
  async fetchYearFilter({ commit }) {
    try {
      const response = await this.$inflationYearFilterRepo.get();
      commit("SET_YEAR_FILTER", response.data);
    } catch (error) {
      commit("SET_YEAR_FILTER_FAILURE", error);
    }
  },

  setSelectedFilters({ commit, dispatch }, filters) {
    commit("SET_CURRENT_FILTERS", filters);

    // Only dispatch fetch if valid filters are set
    if (filters.year) {
      dispatch("fetchIPHMetricData");
      dispatch("fetchIPHChartData");
      dispatch("fetchAggCommodityChangeChartData");
      dispatch("fetchAggMarketPriceChangeChartData");
      dispatch("fetchAggTotalCommodityData");
      dispatch("fetchAggMarketSummaryData");
      dispatch("fetchIPHEstimationData");

      dispatch("fetchCheapMarketData");
      // dispatch("fetchCommodityLatestQuarterData");
      dispatch("fetchIPHCommodityTreemapData");
      // dispatch("fetchIPHCommodityNaik");
      // dispatch("fetchIPHCommodityTurun");
      // dispatch("fetchIPHCommodityTetap");
    }
  },

  async resetFilters({ commit, dispatch }) {
    commit("RESET_FILTERS");

    // Fetch initial data after resetting filters
    // await dispatch('fetchInitialData');
  },
  setSelectedYear({ commit, dispatch }, yearObject) {
    commit("SET_SELECTED_YEAR", yearObject);
  },

  async fetchMtMFullYear({ commit }, yearObject) {
    try {
      const response = await axios.get(
        `/api/inflation-mtm/year/${yearObject.year}`
      );
      if (response.data && response.data.status) {
        const processedData = Object.values(response.data.data).map((item) => ({
          month: item.nama_bulan,
          inflationRate:
            item.tingkat_inflasi !== null
              ? parseFloat(item.tingkat_inflasi.toString().replace(",", "."))
              : null,
          satuan: item.satuan,
        }));
        commit("SET_MTM_FULL_YEAR", processedData);
      } else {
        commit("SET_MTM_FULL_YEAR_FAILURE");
      }
    } catch (error) {
      commit("SET_MTM_FULL_YEAR_FAILURE");
      console.error("Error fetching MtM full-year data:", error);
    }
  },

  // Fetch MtM By Year action
  async fetchDataPrice({ commit }, yearObject) {
    let normalParam = payloadHelper.normalParam("");

    if (yearObject && yearObject.year) {
      console.log("vuex inflation food", yearObject.year);
      normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);
    }
    try {
      const response = await this.$inflationPriceDevIndex.getByParam(
        normalParam
      );
      if (
        response.status === "OK" &&
        Array.isArray(response.result) &&
        response.result.length > 0
      ) {
        const data = response.result; // Assuming the first entry is the relevant data
        commit("SET_INFLATION_PRICE_DEV", data); // Commit the data to the store
        commit("SET_SELECTED_YEAR", yearObject); // Update the selected year in the state
      } else {
        console.log("SET_INFLATION_PRICE_DEV_FAILURE");
        commit("SET_INFLATION_PRICE_DEV_FAILURE", "failure"); // Handle failure case
      }

      // console.log('SET_INFLATION_PRICE_DEV', response);
    } catch (error) {
      console.log("error", error);
    }
  },

  async fetchDataCommodity({ commit }, yearObject) {
    let normalParam = payloadHelper.normalParam("");

    console.log("vuex inflation commodity food");

    if (yearObject && yearObject.year) {
      normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);
    }
    try {
      const response = await this.$inflationCommodityDevIndex.getByParam(
        normalParam
      );
      if (
        response.status === "OK" &&
        Array.isArray(response.result) &&
        response.result.length > 0
      ) {
        const data = response.result; // Assuming the first entry is the relevant data
        commit("SET_INFLATION_COMMODITY_DEV", data); // Commit the data to the store
        commit("SET_SELECTED_YEAR", yearObject); // Update the selected year in the state
      } else {
        commit("SET_INFLATION_COMMODITY_DEV_FAILURE", "failure"); // Handle failure case
      }

      // console.log('SET_INFLATION_COMMODITY_DEV', response.result);
    } catch (error) {
      console.log("error", error);
    }
  },

  async fetchDataMarket({ commit }, yearObject) {
    let normalParam = payloadHelper.normalParam("");

    if (yearObject && yearObject.year) {
      console.log("vuex inflation market food", yearObject.year);
      normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);
    }
    try {
      const response = await this.$inflationMarketDevIndex.getByParam(
        normalParam
      );
      if (
        response.status === "OK" &&
        Array.isArray(response.result) &&
        response.result.length > 0
      ) {
        const data = response.result; // Assuming the first entry is the relevant data
        commit("SET_INFLATION_MARKET_DEV", data); // Commit the data to the store
        commit("SET_SELECTED_YEAR", yearObject); // Update the selected year in the state
      } else {
        commit("SET_INFLATION_MARKET_DEV_FAILURE", "failure"); // Handle failure case
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  // Fetch Commodity Month By Year action
  async fetchDataCommodityMonth({ commit }, { yearObject, monthIndex, type }) {
    // console.log('type', type);
    let normalParam = payloadHelper.normalParam("");

    if (yearObject && yearObject.year) {
      // console.log('vuex inflation food commodity', yearObject.year);
      normalParam = payloadHelper.normalParam(
        `&tahun=${yearObject.year}&filter=${type}`
      );
    } else {
      normalParam = payloadHelper.normalParam(`&tahun=2024&filter=${type}`);
    }

    try {
      let response = "";
      if (monthIndex == 1) {
        response = await this.$inflationCommodityMonth1.getByParam(normalParam);
      } else if (monthIndex == 2) {
        response = await this.$inflationCommodityMonth2.getByParam(normalParam);
      } else if (monthIndex == 3) {
        response = await this.$inflationCommodityMonth3.getByParam(normalParam);
      } else {
        response = await this.$inflationCommodityMonth4.getByParam(normalParam);
      }

      if (
        response.status === "OK" &&
        Array.isArray(response.result) &&
        response.result.length > 0
      ) {
        const data = response.result; // Assuming the first entry is the relevant data
        if (monthIndex == 1) {
          commit("SET_INFLATION_COMMODITY_MONTH1", data); // Commit the data to the store
        } else if (monthIndex == 2) {
          commit("SET_INFLATION_COMMODITY_MONTH2", data); // Commit the data to the store
        } else if (monthIndex == 3) {
          commit("SET_INFLATION_COMMODITY_MONTH3", data); // Commit the data to the store
        } else {
          commit("SET_INFLATION_COMMODITY_MONTH4", data); // Commit the data to the store
        }
        commit("SET_SELECTED_YEAR", yearObject); // Update the selected year in the state
      } else {
        commit("SET_INFLATION_COMMODITY_MONTH_FAILURE", "failure"); // Handle failure case
      }

      // console.log('SET_INFLATION_COMMODITY_MONTH', response);
    } catch (error) {
      console.log("error", error);
    }
  },

  // Fetch Commodity Month By Year action
  async fetchDataCommodityDefMonth(
    { commit },
    { yearObject, monthIndex, type }
  ) {
    // console.log('type def', type);
    let normalParam = payloadHelper.normalParam("");

    if (yearObject && yearObject.year) {
      normalParam = payloadHelper.normalParam(
        `&tahun=${yearObject.year}&filter=${type}`
      );
    } else {
      normalParam = payloadHelper.normalParam(`&tahun=2024&filter=${type}`);
    }

    // console.log('normal param def', normalParam);

    try {
      let response = "";
      if (monthIndex == 1) {
        response = await this.$inflationCommodityMonth1.getByParam(normalParam);
      } else if (monthIndex == 2) {
        response = await this.$inflationCommodityMonth2.getByParam(normalParam);
      } else if (monthIndex == 3) {
        response = await this.$inflationCommodityMonth3.getByParam(normalParam);
      } else {
        response = await this.$inflationCommodityMonth4.getByParam(normalParam);
      }

      if (
        response.status === "OK" &&
        Array.isArray(response.result) &&
        response.result.length > 0
      ) {
        const data = response.result; // Assuming the first entry is the relevant data
        if (monthIndex == 1) {
          commit("SET_INFLATION_COMMODITY_DEF_MONTH1", data); // Commit the data to the store
        } else if (monthIndex == 2) {
          commit("SET_INFLATION_COMMODITY_DEF_MONTH2", data); // Commit the data to the store
        } else if (monthIndex == 3) {
          commit("SET_INFLATION_COMMODITY_DEF_MONTH3", data); // Commit the data to the store
        } else {
          commit("SET_INFLATION_COMMODITY_DEF_MONTH4", data); // Commit the data to the store
        }
        commit("SET_SELECTED_YEAR", yearObject); // Update the selected year in the state
      } else {
        commit("SET_INFLATION_COMMODITY_MONTH_FAILURE", "failure"); // Handle failure case
      }

      // console.log('SET_INFLATION_COMMODITY_DEF_DEF_MONTH', response);
    } catch (error) {
      console.log("error", error);
    }
  },

  // Fetch gauge Inflation
  async fetchDataGaugeInflation({ commit }, yearObject) {
    let normalParam = payloadHelper.normalParam("");

    if (yearObject.year) {
      // console.log('vuex gauge inflation food', yearObject.year);
      normalParam += `&tahun=${yearObject.year}`;
    }

    if (yearObject?.month) {
      normalParam += `&bulan=${yearObject.month}`
    }

    try {
      const response = await this.$inflationGaugeCommoddity.getByParam(
        normalParam
      );
      if (
        response.status === "OK" &&
        Array.isArray(response.result) &&
        response.result.length > 0
      ) {
        const data = response.result; // Assuming the first entry is the relevant data
        commit("SET_INFLATION_GAUGE", data); // Commit the data to the store
      } else {
        commit("SET_INFLATION_GAUGE_FAILURE", "failure"); // Handle failure case
      }

      // console.log('SET_INFLATION_GAUGE', response);
    } catch (error) {
      console.log("error", error);
      commit("SET_INFLATION_GAUGE_FAILURE", "failure"); // Handle failure case
    }
  },

  // Fetch tree map Inflation
  async fetchDataMapInflation({ commit }, { yearObject, type }) {
    let normalParam = payloadHelper.normalParam("");

    if (yearObject && yearObject.year) {
      console.log("vuex tremap inflation food yearObject", yearObject.year);

      normalParam = payloadHelper.normalParam(
        `&tahun=${yearObject.year}&filter=${type}`
      );
    } else {
      normalParam = payloadHelper.normalParam(`&tahun=2024&filter=${type}`);
    }

    try {
      const response = await this.$inflationTreeMapCommoddity.getByParam(
        normalParam
      );
      if (
        response.status === "OK" &&
        Array.isArray(response.result) &&
        response.result.length > 0
      ) {
        const data = response.result; // Assuming the first entry is the relevant data

        if (type === "inflasi") {
          commit("SET_INFLATION_TREE_MAP_INFLASI", data); // Commit the data to the store
        } else {
          commit("SET_INFLATION_TREE_MAP_DEFLASI", data); // Commit the data to the store
        }
      } else {
        commit("SET_INFLATION_TREE_MAP_FAILURE", "failure"); // Handle failure case
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  // 1.0.1
  //------------------------------------------------------------------------------------------------------------//

  // Fetch IPH Metric
  async fetchIPHMetricData({ commit, state }) {
    console.log('=== DEBUG: fetchIPHMetricData started ===');
    commit("SET_LOADING_IPH_METRIC", true);
    commit("SET_IPH_METRIC_STATUS", "loading");

    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");
    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      console.log('API params:', normalParam);
      const response = await this.$inflationIPHRepo.getByParam(normalParam);

      console.log('API Response:', response);

      if (response && response.status === "OK" && response.result) {
        console.log('Data received successfully:', response.result);
        commit("SET_IPH_METRIC_DATA", response.result);
        commit("SET_IPH_METRIC_STATUS", "success");
        commit("SET_IPH_METRIC_FETCHED", true);
      } else {
        console.warn('Invalid response format:', response);
        commit("SET_IPH_METRIC_STATUS", "error");
        commit("SET_IPH_METRIC_DATA", []);
      }
    } catch (error) {
      console.error('API Error:', error);
      commit("SET_IPH_METRIC_STATUS", "error");
      commit("SET_IPH_METRIC_DATA", []);
    } finally {
      commit("SET_LOADING_IPH_METRIC", false);
      console.log('=== DEBUG: fetchIPHMetricData completed ===');
    }
  },

  // Tab Chart Data for IPH, Commodity & Market
  async fetchIPHChartData({ commit, state }) {
    commit("SET_LOADING_IPH_DATA_CHART", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodIPHMonthlyRepo.getByParam(normalParam);

      if (response.result && response.status === "OK") {
        commit("SET_IPH_DATA_CHART", response.result);
        commit("SET_IPH_DATA_CHART_STATUS", "success");
      } else {
        commit("SET_IPH_DATA_CHART_STATUS", "error");
      }
    } catch (error) {
      commit("SET_IPH_DATA_CHART_STATUS", "error");
      console.error("Error fetching IPH Chart data:", error);
    } finally {
      commit("SET_LOADING_IPH_DATA_CHART", false);
    }
  },

  // Tab Chart Data for Aggregate Commodity Change Item
  async fetchAggCommodityChangeChartData({ commit, state }) {
    commit("SET_LOADING_AGG_COMMODITY_CHANGE_CHART", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodAggCommodityChangeRepo.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        commit("SET_AGG_COMMODITY_CHANGE_CHART", response.result);
        commit("SET_AGG_COMMODITY_CHANGE_STATUS", "success");
      } else {
        commit("SET_AGG_COMMODITY_CHANGE_STATUS", "error");
      }
    } catch (error) {
      commit("SET_AGG_COMMODITY_CHANGE_STATUS", "error");
      console.error("Error fetching Aggregate Commodity Change data:", error);
    } finally {
      commit("SET_LOADING_AGG_COMMODITY_CHANGE_CHART", false);
    }
  },

  // Tab Chart Data for IPH, Commodity & Market
  async fetchAggMarketPriceChangeChartData({ commit, state }) {
    commit("SET_LOADING_AGG_MARKET_PRICE_CHANGE_CHART", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodAggMarketPriceChangeRepo.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        commit("SET_AGG_MARKET_PRICE_CHANGE_CHART", response.result);
        commit("SET_AGG_MARKET_PRICE_CHANGE_STATUS", "success");
      } else {
        commit("SET_AGG_MARKET_PRICE_CHANGE_STATUS", "error");
      }
    } catch (error) {
      commit("SET_AGG_MARKET_PRICE_CHANGE_STATUS", "error");
      console.error(
        "Error fetching Aggregate Market Price Change data:",
        error
      );
    } finally {
      commit("SET_LOADING_AGG_MARKET_PRICE_CHANGE_CHART", false);
    }
  },

  // Total Commodity Metric
  async fetchAggTotalCommodityData({ commit, state }) {
    commit("SET_LOADING_AGG_TOTAL_COMMODITY", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$totalCommodity.getByParam(normalParam);

      if (response.result && response.status === "OK") {
        commit("SET_AGG_TOTAL_COMMODITY", response.result[0]);
        commit("SET_AGG_TOTAL_COMMODITY_STATUS", "success");
      } else {
        commit("SET_AGG_TOTAL_COMMODITY_STATUS", "error");
      }
    } catch (error) {
      commit("SET_AGG_TOTAL_COMMODITY_STATUS", "error");
      console.error("Error fetching Total Commodity data:", error);
    } finally {
      commit("SET_LOADING_AGG_TOTAL_COMMODITY", false);
    }
  },

  // Total Market about Merchant / Vendor
  async fetchAggMarketSummaryData({ commit, state }) {
    commit("SET_LOADING_AGG_MARKET_SUMMARY", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$distributionMarket.getByParam(normalParam);

      if (response.result && response.status === "OK") {
        commit("SET_AGG_MARKET_SUMMARY", response.result[0]);
        commit("SET_AGG_MARKET_SUMMARY_STATUS", "success");
      } else {
        commit("SET_AGG_MARKET_SUMMARY_STATUS", "error");
      }
    } catch (error) {
      commit("SET_AGG_MARKET_SUMMARY_STATUS", "error");
      console.error("Error fetching Total Commodity data:", error);
    } finally {
      commit("SET_LOADING_AGG_MARKET_SUMMARY", false);
    }
  },

  // IPH estimation counter
  async fetchIPHEstimationData({ commit, state, getters }) {
    commit("SET_LOADING_IPH_ESTIMATION", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    } else {
      normalParam += `&tahun=${getters.getCurrentYear}`;
    }

    try {
      const response = await this.$inflationGaugeCommoddity.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        commit("SET_IPH_ESTIMATION", response.result[0]);
        commit("SET_IPH_ESTIMATION_STATUS", "success");
      } else {
        commit("SET_IPH_ESTIMATION_STATUS", "error");
      }
    } catch (error) {
      commit("SET_AGG_MARKET_SUMMARY_STATUS", "error");
      console.error(
        "Error fetching IPH Estimation Summary Big Number data:",
        error
      );
    } finally {
      commit("SET_LOADING_IPH_ESTIMATION", false);
    }
  },

  // IPH Cheap Market
  async fetchCheapMarketData({ commit, state, getters }) {
    commit("SET_LOADING_CHEAP_MARKET", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    } else {
      normalParam += `&tahun=${getters.getCurrentYear}`;
    }

    try {
      const response = await this.$foodAggCheapMarketRepo.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        commit("SET_CHEAP_MARKET", response.result);
        commit("SET_CHEAP_MARKET_STATUS", "success");
      } else {
        commit("SET_CHEAP_MARKET_STATUS", "error");
      }
    } catch (error) {
      commit("SET_AGG_MARKET_SUMMARY_STATUS", "error");
      console.error("Error fetching cheap market data:", error);
    } finally {
      commit("SET_LOADING_CHEAP_MARKET", false);
    }
  },

  // IPH Commodity Treemap
  async fetchCommodityTreemapData({ commit, state, getters }) {
    commit("SET_LOADING_COMMODITY_TREEMAP", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodAggCheapMarketRepo.getByParam(
        normalParam
      ); // belum di fetch ganti dengan real endpoint

      if (response.result && response.status === "OK") {
        commit("SET_CHEAP_MARKET", response.result);
        commit("SET_CHEAP_MARKET_STATUS", "success");
      } else {
        commit("SET_CHEAP_MARKET_STATUS", "error");
      }
    } catch (error) {
      commit("SET_AGG_MARKET_SUMMARY_STATUS", "error");
      console.error("Error fetching cheap market data:", error);
    } finally {
      commit("SET_LOADING_CHEAP_MARKET", false);
    }
  },

  // Commodity Latest Quarter
  async fetchCommodityLatestQuarterData({ commit, state, getters }) {
    commit("SET_LOADING_COMMODITY_LATEST_QUARTER", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodCommodityLatestQuarterRepo.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        commit("SET_COMMODITY_LATEST_QUARTER", response.result);
        commit("SET_COMMODITY_LATEST_QUARTER_STATUS", "success");
      } else {
        commit("SET_COMMODITY_LATEST_QUARTER_STATUS", "error");
      }
    } catch (error) {
      commit("SET_COMMODITY_LATEST_QUARTER_STATUS", "error");
      console.error("Error fetching commodity latest quarter data:", error);
    } finally {
      commit("SET_LOADING_COMMODITY_LATEST_QUARTER", false);
    }
  },

  // IPH Commodity Naik
  async fetchIPHCommodityNaik({ commit, state, getters }) {
    commit("SET_LOADING_IPH_COMMODITY_NAIK", true);
    const list_komoditas = [
      {
        nama_bulan: "Oktober",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "October",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "October",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "November",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "November",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "November",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "Desember",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "December",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "December",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "Januari",
        tahun: "2025",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "January",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "January",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
    ];

    const list_komoditas_obj = list_komoditas.reduce((obj, item) => {
      obj[item.nama_bulan] = item;
      return obj;
    }, {});

    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodCommodityLatestQuarterRepo.getByParam(
        normalParam
      );
      commit("SET_IPH_COMMODITY_NAIK", list_komoditas_obj);

      if (response.result && response.status === "OK") {
        commit("SET_IPH_COMMODITY_NAIK", list_komoditas_obj);
        commit("SET_IPH_COMMODITY_LATEST_STATUS", "success");
      } else {
        commit("SET_IPH_COMMODITY_LATEST_STATUS", "error");
      }
    } catch (error) {
      commit("SET_IPH_COMMODITY_LATEST_STATUS", "error");
      console.error("Error fetching commodity latest quarter data:", error);
    } finally {
      commit("SET_LOADING_IPH_COMMODITY_NAIK", false);
    }

    // if (list_komoditas) {
    //     commit("SET_IPH_COMMODITY_NAIK", list_komoditas);
    //     commit('SET_IPH_COMMODITY_LATEST_STATUS', 'success');
    // }
    // commit('SET_LOADING_IPH_COMMODITY_NAIK', false);
  },

  async fetchIPHCommodityTurun({ commit, state, getters }) {
    commit("SET_LOADING_IPH_COMMODITY_TURUN", true);
    const list_komoditas = [
      {
        nama_bulan: "Oktober",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "October",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "October",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "November",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "November",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "November",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "Desember",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "December",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "December",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "Januari",
        tahun: "2025",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "January",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "January",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
    ];

    const list_komoditas_obj = list_komoditas.reduce((obj, item) => {
      obj[item.nama_bulan] = item;
      return obj;
    }, {});

    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodCommodityLatestQuarterRepo.getByParam(
        normalParam
      );
      commit("SET_IPH_COMMODITY_TURUN", list_komoditas_obj);

      if (response.result && response.status === "OK") {
        commit("SET_IPH_COMMODITY_TURUN", list_komoditas_obj);
        commit("SET_IPH_COMMODITY_LATEST_STATUS", "success");
      } else {
        commit("SET_IPH_COMMODITY_LATEST_STATUS", "error");
      }
    } catch (error) {
      commit("SET_IPH_COMMODITY_LATEST_STATUS", "error");
      console.error("Error fetching commodity latest quarter data:", error);
    } finally {
      commit("SET_LOADING_IPH_COMMODITY_TURUN", false);
    }

    // if (list_komoditas) {
    //     commit("SET_IPH_COMMODITY_TURUN", list_komoditas);
    //     commit('SET_IPH_COMMODITY_LATEST_STATUS', 'success');
    // }
    // commit('SET_LOADING_IPH_COMMODITY_TURUN', false);
  },

  async fetchIPHCommodityTetap({ commit, state, getters }) {
    commit("SET_LOADING_IPH_COMMODITY_TETAP", true);
    const list_komoditas = [
      {
        nama_bulan: "Oktober",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "October",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "October",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "November",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "November",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "November",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "Desember",
        tahun: "2024",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "December",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "December",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
      {
        nama_bulan: "Januari",
        tahun: "2025",
        list_komoditas_detail: [
          {
            current_price: "12833",
            id_komoditas: 121,
            month: "January",
            name: "Beras Medium",
            percentage_change: 0.65,
            previous_price: "12750",
            status: "Naik",
          },
          {
            current_price: "15000",
            id_komoditas: 122,
            month: "January",
            name: "Gula Pasir",
            percentage_change: -0.5,
            previous_price: "15100",
            status: "Turun",
          },
        ],
      },
    ];

    const list_komoditas_obj = list_komoditas.reduce((obj, item) => {
      obj[item.nama_bulan] = item;
      return obj;
    }, {});

    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodCommodityLatestQuarterRepo.getByParam(
        normalParam
      );
      commit("SET_IPH_COMMODITY_TETAP", list_komoditas_obj);

      if (response.result && response.status === "OK") {
        commit("SET_IPH_COMMODITY_TETAP", list_komoditas_obj);
        commit("SET_IPH_COMMODITY_LATEST_STATUS", "success");
      } else {
        commit("SET_IPH_COMMODITY_LATEST_STATUS", "error");
      }
    } catch (error) {
      commit("SET_IPH_COMMODITY_LATEST_STATUS", "error");
      console.error("Error fetching commodity latest quarter data:", error);
    } finally {
      commit("SET_LOADING_IPH_COMMODITY_TETAP", false);
    }

    // if (list_komoditas) {
    //     commit("SET_IPH_COMMODITY_TURUN", list_komoditas);
    //     commit('SET_IPH_COMMODITY_LATEST_STATUS', 'success');
    // }
    // commit('SET_LOADING_IPH_COMMODITY_TURUN', false);
  },

  // IPH Commodity Treemap
  async fetchIPHCommodityTreemapData({ commit, state, getters }) {
    commit("SET_LOADING_IPH_COMMODITY_TREEMAP", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");

    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$foodIPHCommodityTreemapRepo.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        commit("SET_IPH_COMMODITY_TREEMAP", response.result);
        commit("SET_IPH_COMMODITY_TREEMAP_STATUS", "success");
      } else {
        commit("SET_IPH_COMMODITY_TREEMAP_STATUS", "error");
      }
    } catch (error) {
      commit("SET_IPH_COMMODITY_TREEMAP_STATUS", "error");
      console.error("Error fetching commodity latest quarter data:", error);
    } finally {
      commit("SET_LOADING_IPH_COMMODITY_TREEMAP", false);
    }
  },

  // Heatmap Pemantauan komoditas 20 treemap
  async fetchHeatmapCommodityMonitoring({ commit, state }) {
    commit("SET_LOADING_HEATMAP_COMODITY_MONITORING", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");
    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {
      const response = await this.$heatmapComodityMonitoringRepo.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        if (response.result.length > 0) {
          const commodityData = response.result[0].data;
          const heatmapSeries = Object.values(commodityData).map(
            (commodity) => {
              const data = [];
              let weekCounter = 0;

              // Iterate over the weeks and add data, placing `-` after every 4 weeks
              for (let week in commodity) {
                // Directly round the percentage value
                const roundedValue = commodity[week]?.percentage?.toFixed(2);
                data.push(parseFloat(roundedValue)); // Convert string back to float and add to data

                weekCounter++;
                if (weekCounter % 4 === 0) {
                  data.push("-1"); // Add a space (represented by "-") after every 4 weeks
                }
              }

              return {
                name: commodity[Object.keys(commodity)[0]].name,
                status: commodity[Object.keys(commodity)[0]].status,
                data: data,
              };
            }
          );

          commit("SET_HEATMAP_COMODITY_MONITORING", heatmapSeries);
          console.log("heatmapSeries", heatmapSeries);
        } else {
          commit("SET_HEATMAP_COMMODITY_MONITORING", []);
        }
        commit("SET_HEATMAP_COMODITY_MONITORING_STATUS", "success");
      } else {
        commit("SET_HEATMAP_COMODITY_MONITORING_STATUS", "error");
        commit("SET_HEATMAP_COMODITY_MONITORING", []);
      }
    } catch (error) {
      console.error("Error fetching heatmap commodity monitoring data:", error);
      commit("SET_HEATMAP_COMODITY_MONITORING_STATUS", "error");
      commit("SET_HEATMAP_COMODITY_MONITORING", []);
    } finally {
      commit("SET_LOADING_HEATMAP_COMODITY_MONITORING", false);
    }
  },

  // Pemantauan Komoditas Bulan ... tahun ...
  async fetchMonthlyComodityMonitoring({ commit, state }) {
    commit("SET_LOADING_MONTHLY_COMODITY_MONITORING", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");
    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    try {

      const response = await this.$monthlyComodityMonitoringRepo.getByParam(
        normalParam
      );

      console.log(response);

      if (response.result && response.status === "OK") {
        commit("SET_MONTHLY_COMODITY_MONITORING", response.result);
        commit("SET_MONTHLY_COMODITY_MONITORING_STATUS", "success");
      } else {
        commit("SET_MONTHLY_COMODITY_MONITORING_STATUS", "error");
      }
    } catch (error) {
      commit("SET_MONTHLY_COMODITY_MONITORING_STATUS", "error");
      console.error("Error fetching data:", error);
    } finally {
      commit("SET_LOADING_MONTHLY_COMODITY_MONITORING", false);
    }
  },

  //Peta Sebaran Komoditas Per Pasar
  async fetchMarketComodityDistribution({ commit, state }) {
    commit("SET_LOADING_MARKET_COMODITY_DISTRIBUTION", true);
    const { year } = state.currentFilters;

    let normalParam = payloadHelper.normalParam("");
    if (year) {
      normalParam += `&tahun=${year.year}`;
    }

    // if (marketName) normalParam += `&nama_pasar=${encodeURIComponent(marketName)}`;

    try {

      const response = await this.$marketComodityDistributionRepo.getByParam(
        normalParam
      );

      if (response.result && response.status === "OK") {
        commit("SET_MARKET_COMODITY_DISTRIBUTION", response.result);
        commit("SET_MARKET_COMODITY_DISTRIBUTION_STATUS", "success");
      } else {
        commit("SET_MARKET_COMODITY_DISTRIBUTION_STATUS", "error");
      }
    } catch (error) {
      commit("SET_MARKET_COMODITY_DISTRIBUTION_STATUS", "error");
      console.error("Error fetching data:", error);
    } finally {
      commit("SET_LOADING_MARKET_COMODITY_DISTRIBUTION", false);
    }
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
