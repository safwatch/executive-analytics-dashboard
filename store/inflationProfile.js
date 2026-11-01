import axios from 'axios';

import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';


const state = () => ({
    selectedYear: null,
    YoY: [],
    YoYStatus: null,
    MtM: [],
    MtMStatus: null,
    MtMFullYear: [],
    MtMFullYearStatus: null,
    strategi: 0,
    strategiStatus: null,
    rencanaAksi: 0,
    rencanaAksiStatus: null,
    budgetRealization: {
        persentaseCapaian: '0 %',
        anggaranTerserap: 0
    },
    budgetRealizationStatus: null,
    fiveYearTrend: [],
    fiveYearTrendStatus: null,


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

    // IPH
    IPHData: [],
    IPHStatus: null,

    // IPH Yearly
    IPHYearlyTrend: [],
    IPHYearlyTrendStatus: null,

    workunit: 0,
    workunitStatus: null,

    strategiListStatus: null,
    strategiRencanaAksiList: [],

    monitoringInflationControlList: [],
    monitoringInflationControlStatus: null,

    monitoringCommodityList: [],
    monitoringCommodityStatus: null,

    //IPH rencana aksi
    inflationActionPlanList: [],
    inflationActionPlanListStatus: null,

    inflationActionPlanDetail: [],
    inflationActionPlanDetailStatus: null,
});

const mutations = {
    SET_SELECTED_YEAR(state, yearObject) {
        state.selectedYear = yearObject; // Store the entire object
    },
    SET_YOY(state, data) {
        state.YoY = {
            inflasi_tahun_ini: data.inflasi_tahun_ini || '0.00',
            inflasi_tahun_sebelumnya: data.inflasi_tahun_sebelumnya || '0.00',
            satuan: data.satuan || 'PERSEN',
            status: data.status || 'unknown',
            agg_inflasi_index: data.agg_inflasi_index || '0.00',
            tahun: data.tahun || '',
        };
        state.YoYStatus = 'success';
    },
    SET_YOY_STATUS(state, status) {
        state.YoYStatus = status; // Set the status as 'success' or 'failure'
    },
    SET_MTM(state, data) {
        state.MtM = {
            tingkat_inflasi: data.tingkat_inflasi || '0.00',
            tingkat_inflasi_sebelumnya: data.tingkat_inflasi_sebelumnya || '0.00',
            perubahan_inflasi: data.perubahan_inflasi || '0.00',
            keterangan: data.keterangan || 'unknown',
            nama_bulan: data.nama_bulan || '',
            satuan: data.satuan || 'PERSEN',
            tahun: data.tahun || '',
        };
        state.MtMStatus = 'success';
    },
    SET_MTM_STATUS(state, status) {
        state.MtMStatus = status; // Set the status as 'success' or 'failure'
    },
    SET_MTM_FULL_YEAR(state, data) {
        state.MtMFullYear = data;
        state.MtMFullYearStatus = 'success';
    },
    SET_MTM_FULL_YEAR_STATUS(state, status) {
        state.MtMFullYearStatus = status; // 'success' or 'failure'
    },
    SET_STRATEGI_RENCANA_AKSI(state, data) {
        state.strategi = parseInt(data.total_kunci_strategi, 10) || 0;
        state.rencanaAksi = parseInt(data.total_kunci_rencana_aksi, 10) || 0;
        state.strategiStatus = 'success';
        state.rencanaAksiStatus = 'success';
    },
    SET_STRATEGI_RENCANA_AKSI_LIST(state, data) {
        state.strategiListStatus = 'success'
        state.strategiRencanaAksiList = data;
    },
    SET_STRATEGI_RENCANA_AKSI_STATUS(state, status) {
        state.strategiStatus = status;
        state.rencanaAksiStatus = status;
    },
    SET_BUDGET_REALIZATION(state, data) {
        state.budgetRealization = {
            persentaseCapaian: data.persentase_capaian || '0.00 %',
            anggaranTerserap: data.anggaran_terserap || 0,
        };
        state.budgetRealizationStatus = 'success';
    },
    SET_BUDGET_REALIZATION_STATUS(state, status) {
        state.budgetRealizationStatus = status; // Set status as 'success' or 'failure'
    },
    SET_FIVE_YEAR_TREND(state, data) {
        state.fiveYearTrend = data;
        state.fiveYearTrendStatus = 'success';
    },
    SET_FIVE_YEAR_TREND_STATUS(state, status) {
        state.fiveYearTrendStatus = status;
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
        state.fiveYearTrendStatus = 'success';
    },
    SET_FIVE_YEAR_TREND_FAILURE(state) {
        state.fiveYearTrendStatus = 'failure';
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

    // IPH
    SET_IPH_DATA(state, data) {
        state.IPHData = data;
        state.IPHStatus = 'success';
    },
    SET_IPH_STATUS(state, status) {
        state.IPHStatus = status;
    },
    // IPH Yearly
    SET_IPH_YEARLY_TREND(state, data) {
        state.IPHYearlyTrend = data;
        state.IPHYearlyTrendStatus = 'success';
    },
    SET_IPH_YEARLY_TREND_STATUS(state, status) {
        state.IPHYearlyTrendStatus = status;
    },
    // Workunit 
    SET_WORKUNIT_RENCANA_AKSI(state, data) {
        state.workunit = data;
        state.workunitStatus = 'success';
    },
    SET_WORKUNIT_RENCANA_AKSI_STATUS(state, status) {
        state.workunitStatus = status;
    },
    // Action plan & Strategies
    SET_ACTIONPLAN_AND_STRATEGIES(state, data) {
        state.strategi = parseInt(data.total_strategi, 10) || 0;
        state.rencanaAksi = parseInt(data.total_rencana_aksi, 10) || 0;
        state.strategiStatus = 'success';
        state.rencanaAksiStatus = 'success';
    },
    SET_ACTIONPLAN_AND_STRATEGIES_STATUS(state, status) {
        state.strategiStatus = status;
        state.rencanaAksiStatus = status;
    },
    SET_MONITORING_INFLACTION_CONTROL_LIST(state, data) {
         state.monitoringInflationControlList = data;
         state.monitoringInflationControlStatus = 'success'
    },
    SET_MONITORING_INFLACTION_CONTROL_STATUS(state, status) {
        state.monitoringInflationControlStatus = status;
    },
    SET_MONITORING_COMMODITY_LIST(state, data) {
         state.monitoringCommodityList = data;
         state.monitoringCommodityStatus = 'success'
    },
    SET_MONITORING_COMMODITY_STATUS(state, status) {
        state.monitoringCommodityStatus = status;
    },
    SET_INFLATION_ACTION_PLAN_LIST(state, data) {
         state.inflationActionPlanList = data;
         state.inflationActionPlanListStatus = 'success'
    },
    SET_INFLATION_ACTION_PLAN_LIST_STATUS(state, status) {
        state.inflationActionPlanListStatus = status;
    },
    SET_INFLATION_ACTION_PLAN_DETAIL(state, data) {
         state.inflationActionPlanDetail = data;
         state.inflationActionPlanDetailStatus = 'success'
    },
    SET_INFLATION_ACTION_PLAN_DETAIL_STATUS(state, status) {
        state.inflationActionPlanDetailStatus = status;
    },
}

const actions = {
    async getYoY({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationYoYRepo.getByParam(normalParam);
            console.log("response get params YoY from the getYoY : ", response);
            if (response.status === "OK") {
                const result = response.result[0]; // Access the first element of result array
                const processedData = {
                    value: parseFloat(result.inflasi_tahun_ini.replace(',', '.')),
                    previousValue: parseFloat(result.inflasi_tahun_sebelumnya.replace(',', '.')),
                    aggInflasiIndex: parseFloat(result.agg_inflasi_index.replace(',', '.')),
                    satuan: result.satuan,
                    status: result.status, // 'NAIK' or 'TURUN'
                    year: result.tahun,
                };
                commit('SET_YOY', processedData);
                commit('SET_YOY_STATUS', 'success'); // Update status to 'success'
            } else {
                // If response is invalid or has no data
                commit('SET_YOY_STATUS', 'failure'); // Update status to 'failure'
            }
        } catch (error) {
            commit('SET_YOY_STATUS', 'failure'); // Update status to 'failure'
            console.error('Error fetching YoY data:', error); // Log the error
        }
    },

    // fetch YoY By Year and Recap action
    async fetchYoYDataByYear({ commit }, yearObject) {
        // Prepare parameters using payloadHelper
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`); // Add 'tahun' to the parameters
        try {
            // Fetch data using the repository method instead of axios
            const response = await this.$inflationYoYRepo.getByParam(normalParam);

            if (response.status === 'OK' && Array.isArray(response.result) && response.result.length > 0) {
                const data = response.result[0];  // Assuming the first entry is the relevant data
                commit('SET_YOY', data);           // Commit the data to the store
                commit('SET_SELECTED_YEAR', yearObject);  // Update the selected year in the state
            } else {
                commit('SET_YOY_STATUS', 'failure');   // Handle failure case
            }
        } catch (error) {
            commit('SET_YOY_STATUS', 'failure');   // Handle error case
            console.error('Error fetching YoY data:', error);
        }
    },

    // Action to fetch YoY data for the initial view (recap)
    async fetchYoYDataRecap({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            // Fetch data using the repository method instead of axios
            const response = await this.$inflationYoYRepo.getByParam(normalParam);
            console.log("response get params YoY from the YoY recap : ", response);
            if (response.status === 'OK' && Array.isArray(response.result) && response.result.length > 0) {
                const data = response.result[0];  // Assuming the first entry is the relevant data
                commit('SET_YOY', data);           // Commit the data to the store
                commit('SET_YOY_STATUS', 'success'); // Update status to 'success'
            } else {
                commit('SET_YOY_STATUS', 'failure');   // Handle failure case
            }
        } catch (error) {
            commit('SET_YOY_STATUS', 'failure');
            console.error('Error fetching YoY recap data:', error);
        }
    },
    async getMtM({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationMtMRepo.getByParam(normalParam);
            console.log("response get params MtM from the getMtM: ", response);
            if (response.status === "OK") {
                const result = response.result[0]; // Access the first element of result array
                const processedData = {
                    tingkat_inflasi: result.tingkat_inflasi,
                    tingkat_inflasi_sebelumnya: result.tingkat_inflasi_sebelumnya,
                    perubahan_inflasi: result.perubahan_inflasi,
                    keterangan: result.keterangan,
                    nama_bulan: result.nama_bulan,
                    satuan: result.satuan,
                    tahun: result.tahun,
                };
                commit('SET_MTM', processedData);
                commit('SET_MTM_STATUS', 'success'); // Update status to 'success'
            } else {
                commit('SET_MTM_STATUS', 'failure'); // Update status to 'failure'
            }
        } catch (error) {
            commit('SET_MTM_STATUS', 'failure'); // Update status to 'failure'
            console.error('Error fetching MtM data:', error);
        }
    },
    // Fetch MtM By Year action
    async fetchMtMDataByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`); // Add 'tahun' to the parameters

        try {
            const response = await this.$inflationMtMRepo.getByParam(normalParam);
            if (response.status === 'OK' && Array.isArray(response.result) && response.result.length > 0) {
                const data = response.result[0];  // Assuming the first entry is the relevant data
                commit('SET_MTM', data);           // Commit the data to the store
                commit('SET_SELECTED_YEAR', yearObject);  // Update the selected year in the state
            } else {
                commit('SET_MTM_STATUS', 'failure'); // Handle failure case
            }
        } catch (error) {
            commit('SET_MTM_STATUS', 'failure'); // Handle error case
            console.error('Error fetching MtM data by year:', error);
        }
    },

    // Action to fetch MtM data for the initial view (recap)
    async fetchMtMDataRecap({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationMtMRepo.getByParam(normalParam);
            if (response.status === 'OK' && Array.isArray(response.result) && response.result.length > 0) {
                const data = response.result[0];  // Assuming the first entry is the relevant data
                commit('SET_MTM', data);           // Commit the data to the store
                commit('SET_MTM_STATUS', 'success'); // Update status to 'success'
            } else {
                commit('SET_MTM_STATUS', 'failure'); // Handle failure case
            }
        } catch (error) {
            commit('SET_MTM_STATUS', 'failure'); // Handle error case
            console.error('Error fetching MtM recap data:', error);
        }
    },

    // Fetch MtM Full Year Recap
    async fetchMtMFullYearRecap({ commit }) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationMtMFullYearRepo.getByParam(normalParam);
            if (response.status === "OK" && Array.isArray(response.result)) {
                const processedData = response.result.map(item => {
                    // Check if tingkat_inflasi is not null
                    const inflationRate = item.tingkat_inflasi ?
                        parseFloat(item.tingkat_inflasi.replace(',', '.')) : null;

                    return {
                        month: item.nama_bulan,
                        inflationRate,
                        year: item.tahun,
                    }
                });
                commit('SET_MTM_FULL_YEAR', processedData);
                commit('SET_MTM_FULL_YEAR_STATUS', 'success');
            } else {
                commit('SET_MTM_FULL_YEAR_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_MTM_FULL_YEAR_STATUS', 'failure');
            console.error('Error fetching MtM full-year recap:', error);
        }
    },

    // Fetch MtM Full Year by Selected Year
    async fetchMtMFullYearByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);

        try {
            const response = await this.$inflationMtMFullYearRepo.getByParam(normalParam);
            if (response.status === "OK" && Array.isArray(response.result)) {
                const processedData = response.result.map(item => ({
                    month: item.nama_bulan,
                    inflationRate: parseFloat(item.tingkat_inflasi.replace(',', '.')),
                    year: item.tahun,
                }));
                commit('SET_MTM_FULL_YEAR', processedData);
                commit('SET_MTM_FULL_YEAR_STATUS', 'success');
            } else {
                commit('SET_MTM_FULL_YEAR_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_MTM_FULL_YEAR_STATUS', 'failure');
            console.error('Error fetching MtM full-year data by year:', error);
        }
    },

    // Fetch Strategi and Rencana Aksi for the initial view (recap)
    async fetchStrategiRencanaAksiRecap({ commit }, params) {
        let normalParam = payloadHelper.normalParam('');
        if (params?.year) {
            normalParam += `&tahun=${params?.year}`
        }

        try {
            const response = await this.$inflationActionPlanAndStrategiesRepo.getByParam(normalParam);

            if (response.status === 'OK') {
                commit('SET_STRATEGI_RENCANA_AKSI', response.result); // Commit result to both strategi and rencanaAksi
                commit('SET_STRATEGI_RENCANA_AKSI_STATUS', 'success');
            } else {
                commit('SET_STRATEGI_RENCANA_AKSI_STATUS', 'failure'); // Handle failure
            }
        } catch (error) {
            commit('SET_STRATEGI_RENCANA_AKSI_STATUS', 'failure');
            console.error('Error fetching strategi and rencanaAksi:', error);
        }
    },

    // Fetch Strategi list
    async fetchStrategiRencanaAksiList({ commit }) {
        let normalParam = payloadHelper.normalParam('');
        normalParam += '&year=2024'

        try {
            const response = await this.$inflationActionPlanAndStrategyListRepo.getByParam(normalParam);

            if (response.status) {
                commit('SET_STRATEGI_RENCANA_AKSI_LIST', response.data); // Commit result to both strategi and rencanaAksi
                commit('SET_STRATEGI_RENCANA_AKSI_LIST_STATUS', 'success');
            } else {
                commit('SET_STRATEGI_RENCANA_AKSI_LIST_STATUS', 'failure'); // Handle failure
            }
        } catch (error) {
            commit('SET_STRATEGI_RENCANA_AKSI_LIST_STATUS', 'failure');
            console.error('Error fetching strategi and rencanaAksi:', error);
        }
    },

    // Fetch monitoring control
    async fetchMonitoringInflationControl({ commit }, params) {
        let normalParam = payloadHelper.normalParam('');
        normalParam += `&year=${params?.year ?? 2024}`

        try {
            const response = await this.$monitoringInflationControlRepo.getByParam(normalParam);

            if (response.status === 'OK') {
                commit('SET_MONITORING_INFLACTION_CONTROL_LIST', response.result); // Commit result to both strategi and rencanaAksi
                commit('SET_MONITORING_INFLACTION_CONTROL_STATUS', 'success');
            } else {
                commit('SET_MONITORING_INFLACTION_CONTROL_STATUS', 'failure'); // Handle failure
            }
        } catch (error) {
            // commit('SET_STRATEGI_RENCANA_AKSI_LIST_STATUS', 'failure');
            console.error('Error fetching strategi and rencanaAksi:', error);
        }
    },

    // Fetch commodity monitoring
    async fetchMonitoringCommodity({ commit }) {
        let normalParam = payloadHelper.normalParam('');
        normalParam += '&year=2024'

        try {
            const response = await this.$monitoringCommodityRepo.getByParam(normalParam);

            if (response.status === 'OK') {
                commit('SET_MONITORING_COMMODITY_LIST', response.result); // Commit result to both strategi and rencanaAksi
                commit('SET_MONITORING_COMMODITY_STATUS', 'success');
            } else {
                commit('SET_MONITORING_COMMODITY_STATUS', 'failure'); // Handle failure
            }
        } catch (error) {
            // commit('SET_STRATEGI_RENCANA_AKSI_LIST_STATUS', 'failure');
            console.error('Error fetching pemantauan komoditas:', error);
        }
    },

    // Fetch Strategi and Rencana Aksi based on selected year
    async fetchStrategiRencanaAksiByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);

        try {
            const response = await this.$inflationActionPlanAndStrategiesRepo.getByParam(normalParam);

            if (response.status === 'OK') {
                commit('SET_STRATEGI_RENCANA_AKSI', response.result); // Commit result to both strategi and rencanaAksi
                commit('SET_SELECTED_YEAR', yearObject); // Update the selected year in the state
                commit('SET_STRATEGI_RENCANA_AKSI_STATUS', 'success');
            } else {
                commit('SET_STRATEGI_RENCANA_AKSI_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_STRATEGI_RENCANA_AKSI_STATUS', 'failure');
            console.error('Error fetching strategi and rencanaAksi by year:', error);
        }
    },

    // Fetch Budget Realization for Recap
    async fetchBudgetRealizationRecap({ commit }) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationBNBudgetRealizationRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_BUDGET_REALIZATION', response.result);
                commit('SET_BUDGET_REALIZATION_STATUS', 'success');
            } else {
                commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            console.error('Error fetching budget realization data:', error);
        }
    },

    // Fetch Budget Realization by Year
    async fetchBudgetRealizationByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);

        try {
            const response = await this.$inflationBNBudgetRealizationRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_BUDGET_REALIZATION', response.result);
                commit('SET_SELECTED_YEAR', yearObject);  // Set selected year in state
                commit('SET_BUDGET_REALIZATION_STATUS', 'success');
            } else {
                commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            console.error('Error fetching budget realization by year:', error);
        }
    },

    async fetchFiveYearTrendRecap({ commit }) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$fiveYearTrendRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_FIVE_YEAR_TREND', response.result);
            } else {
                commit('SET_FIVE_YEAR_TREND_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_FIVE_YEAR_TREND_STATUS', 'failure');
            console.error('Error fetching five-year trend recap:', error);
        }
    },

    async fetchFiveYearTrendByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&year=${yearObject.year}`);

        try {
            const response = await this.$fiveYearTrendRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                console.log("response get params from the getFiveYearTrendByYear: ", response.result);
                commit('SET_FIVE_YEAR_TREND', response.result);
                commit('SET_BUDGET_REALIZATION_STATUS', 'success');
            } else {
                commit('SET_FIVE_YEAR_TREND_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_FIVE_YEAR_TREND_STATUS', 'failure');
            console.error('Error fetching five-year trend by year:', error);
        }
    },

    async getAnnualTrend({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$inflationProfileRepo.getAnnualTrend(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_ANNUAL_TREND', response);
            return status;
        } catch (error) {
            commit('SET_ANNUAL_TREND_FAILURE', error.message);
            console.log('error catch', error.message);
        }
    },
    async getMonthlyTrend({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$inflationProfileRepo.getMonthlyTrend(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_MONTHLY_TREND', response);
            return status;
        } catch (error) {
            commit('SET_MONTHLY_TREND_FAILURE', error.message);
            console.log('error catch', error.message);
        }
    },
    async getInflationControl({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$inflationProfileRepo.getInflationControl(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_INFLATION_CONTROL', response);
            return status;
        } catch (error) {
            commit('SET_INFLATION_CONTROL_FAILURE', error.message);
            console.log('error catch', error.message);
        }
    },
    async getBudget({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$inflationProfileRepo.getBudget(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_BUDGET', response);
            return status;
        } catch (error) {
            commit('SET_BUDGET_FAILURE', error.message);
            console.log('error catch', error.message);
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
    async getCivicVsJabarVsNational({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$inflationProfileRepo.getCivicVsJabarVsNational(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_CIMAHI_VS_JABAR_VS_NATIONAL', response);
            return status;
        } catch (error) {
            commit('SET_CIMAHI_VS_JABAR_VS_NATIONAL_FAILURE', error.message);
            console.log('error catch', error.message);
        }
    },
    async getCivicVsBandungRayaVsJabar({ commit }, { } = {}) {
        let normalParam = payloadHelper.normalParam('');

        try {
            var response = await this.$inflationProfileRepo.getCivicVsBandungRayaVsJabar(normalParam);
            var status = responseHelper.statusCheck(response.status, response.message);
            commit('SET_CIMAHI_VS_BANDUNGRAYA_VS_JABAR', response);
            return status;
        } catch (error) {
            commit('SET_CIMAHI_VS_BANDUNGRAYA_VS_JABAR_FAILURE', error.message);
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

    async fetchMtMFullYear({ commit }, yearObject) {
        try {
            const response = await axios.get(`/api/inflation-mtm/year/${yearObject.year}`);
            if (response.data && response.data.status) {
                const processedData = Object.values(response.data.data).map(item => ({
                    month: item.nama_bulan,
                    inflationRate: item.tingkat_inflasi !== null ? parseFloat(item.tingkat_inflasi.toString().replace(',', '.')) : null,
                    satuan: item.satuan
                }));
                commit('SET_MTM_FULL_YEAR', processedData);
            } else {
                commit('SET_MTM_FULL_YEAR_FAILURE');
            }
        } catch (error) {
            commit('SET_MTM_FULL_YEAR_FAILURE');
            console.error('Error fetching MtM full-year data:', error);
        }
    },

    // Fetch IPH 
    async fetchIPHDataByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);
        console.log('IPH By Year');
        try {
            const response = await this.$inflationIPHRepo.getByParam(normalParam);
            if (response.status === 'OK' && response.result) {
                // Process the data as needed
                const processedData = {
                    value: parseFloat(response.result.iph.replace(',', '.')),
                    status: response.result.status || 'Unknown',
                    year: response.result.tahun,
                    month: response.result.nama_bulan,
                    change_percentage: response.result.persentase_perubahan,
                    month_id: response.result.kode_bulan
                };
                commit('SET_IPH_DATA', processedData);
                commit('SET_SELECTED_YEAR', yearObject);
            } else {
                commit('SET_IPH_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_IPH_STATUS', 'failure');
            console.error('Error fetching IPH data by year:', error);
        }
    },

    // Action to fetch IPH data recap (without specific year)
    async fetchIPHDataRecap({ commit }) {
        console.log('IPH Recap');
        let normalParam = payloadHelper.normalParam('');
        try {
            const response = await this.$inflationIPHRepo.getByParam(normalParam);
            if (response.status === 'OK' && response.result) {
                const result = response.result; 
                const processedData = {
                    value: parseFloat(result.iph.replace(',', '.')),
                    status: result.status || 'Unknown',
                    year: result.tahun,
                    month: result.nama_bulan,
                    change_percentage: result.persentase_perubahan,
                    month_id: result.kode_bulan 
                };
                commit('SET_IPH_DATA', processedData);
            } else {
                commit('SET_IPH_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_IPH_STATUS', 'failure');
            console.error('Error fetching IPH data recap:', error);
        }
    },

    // IPH By Year (12 Months straightforward) 
    async fetchIPHYearlyTrendRecap({ commit }) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationIPHByYearTrendRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_IPH_YEARLY_TREND', response.result);
            } else {
                commit('SET_IPH_YEARLY_TREND_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_IPH_YEARLY_TREND_STATUS', 'failure');
            console.error('Error fetching iph-yearly trend recap:', error);
        }
    },

    async fetchIPHYearlyTrendByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);

        try {
            const response = await this.$inflationIPHByYearTrendRepo.getByParam(normalParam);
            console.log('response by year IPH yearly : ', response);
            if (response.status === 'OK') {
                commit('SET_IPH_YEARLY_TREND', response.result);
                commit('SET_IPH_YEARLY_TREND_STATUS', 'success');
            } else {
                commit('SET_IPH_YEARLY_TREND_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_IPH_YEARLY_TREND_STATUS', 'failure');
            console.error('Error fetching iph-yearly trend by year:', error);
        }
    },

    // Total Workunit
    async fetchAggWorkunitRecap({ commit }) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationTotalWorkunitRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_WORKUNIT_RENCANA_AKSI', response.result);
            } else {
                commit('SET_WORKUNIT_RENCANA_AKSI_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_WORKUNIT_RENCANA_AKSI_STATUS', 'failure');
            console.error('Error fetching workunit total recap:', error);
        }
    },

    async fetchAggWorkunitByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);

        try {
            const response = await this.$inflationTotalWorkunitRepo.getByParam(normalParam);
            console.log('response by year Total Workunit : ', response);
            if (response.status === 'OK') {
                commit('SET_WORKUNIT_RENCANA_AKSI', response.result);
                commit('SET_WORKUNIT_RENCANA_AKSI_STATUS', 'success');
            } else {
                commit('SET_WORKUNIT_RENCANA_AKSI_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_WORKUNIT_RENCANA_AKSI_STATUS', 'failure');
            console.error('Error fetching workunit total by year:', error);
        }
    },

    // Action Plan Strategies
    async fetchAggActPlanStrategiesRecap({ commit }) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationBNActionPlanStrategiesRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_ACTIONPLAN_AND_STRATEGIES', response.result);
            } else {
                commit('SET_ACTIONPLAN_AND_STRATEGIES_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_ACTIONPLAN_AND_STRATEGIES_STATUS', 'failure');
            console.error('Error fetching action plan & strategy recap:', error);
        }
    },

    async fetchAggActPlanStrategiesByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);

        try {
            const response = await this.$inflationBNActionPlanStrategiesRepo.getByParam(normalParam);
            console.log('response by year Action Plan & Strategy : ', response);
            if (response.status === 'OK') {
                commit('SET_ACTIONPLAN_AND_STRATEGIES', response.result);
                commit('SET_ACTIONPLAN_AND_STRATEGIES_STATUS', 'success');
            } else {
                commit('SET_ACTIONPLAN_AND_STRATEGIES_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_ACTIONPLAN_AND_STRATEGIES_STATUS', 'failure');
            console.error('Error fetching action plan and strategy by year:', error);
        }
    },

    // Budget Realization
    async fetchAggBudgetRealizationRecap({ commit }) {
        let normalParam = payloadHelper.normalParam('');

        try {
            const response = await this.$inflationBNBudgetRealizationRepo.getByParam(normalParam);
            if (response.status === 'OK') {
                commit('SET_BUDGET_REALIZATION', response.result);
            } else {
                commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            console.error('Error fetching budget realization recap:', error);
        }
    },

    async fetchAggBudgetRealizationByYear({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam(`&tahun=${yearObject.year}`);

        try {
            const response = await this.$inflationBNBudgetRealizationRepo.getByParam(normalParam);
            console.log('response by year budget realization : ', response);
            if (response.status === 'OK') {
                commit('SET_BUDGET_REALIZATION', response.result);
                commit('SET_BUDGET_REALIZATION_STATUS', 'success');
            } else {
                commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_BUDGET_REALIZATION_STATUS', 'failure');
            console.error('Error fetching budget realization by year:', error);
        }
    },

    // Fetch Strategi list
    async fetchInflationActionPlanList({ commit }, yearObject) {
        let normalParam = payloadHelper.normalParam('');
        if (yearObject?.year) {
            normalParam += `&year=${yearObject?.year}`
        }

        try {
            const response = await this.$inflationActionPlanListRepo.getByParam(normalParam);

            if (response.status) {
                commit('SET_INFLATION_ACTION_PLAN_LIST', response.data);
                commit('SET_INFLATION_ACTION_PLAN_LIST_STATUS', 'success');
            } else {
                commit('SET_INFLATION_ACTION_PLAN_LIST_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_INFLATION_ACTION_PLAN_LIST_STATUS', 'failure');
            console.error('Error fetching rencana aksi inflasi:', error);
        }
    },

    // Fetch Strategi detail
    async fetchInflationActionPlanDetail({ commit }, params) {
        let normalParam = payloadHelper.normalParam('');
        const year = params?.year;
        const kunci_strategi = params?.kunci_strategi;

        if (year) {
            normalParam += `&year=${year}`
        }
        if (kunci_strategi) {
            normalParam += `&kunci_strategi=${kunci_strategi}`
        }

        try {
            const response = await this.$inflationActionPlanDetailRepo.getByParam(normalParam);

            if (response.status) {
                commit('SET_INFLATION_ACTION_PLAN_DETAIL', response.data);
                commit('SET_INFLATION_ACTION_PLAN_DETAIL_STATUS', 'success');
            } else {
                commit('SET_INFLATION_ACTION_PLAN_DETAIL_STATUS', 'failure');
            }
        } catch (error) {
            commit('SET_INFLATION_ACTION_PLAN_DETAIL_STATUS', 'failure');
            console.error('Error fetching detail rencana aksi inflasi:', error);
        }
    },


    setSelectedYear({ commit, dispatch }, yearObject) {
        commit('SET_SELECTED_YEAR', yearObject);
        dispatch('fetchIPHYearlyTrendByYear', yearObject);
        dispatch('fetchIPHDataByYear', yearObject);
        dispatch('fetchYoYDataByYear', yearObject);
        dispatch('fetchMtMDataByYear', yearObject);
        dispatch('fetchMtMFullYearByYear', yearObject);
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
