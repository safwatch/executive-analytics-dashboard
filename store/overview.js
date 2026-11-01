import axios from "axios";
import { responseHelper } from "../helpers/response.helper";
import { payloadHelper } from "../helpers/payload.helper";

export const state = () => ({
  selectedYear: null,
  currentFilters: {
    year: null,
  },

  monthlyComoditityMonitoring: [],
  monthlyComoditityMonitorinngStatus: null,
  isLoadingMonthlyComoditityMonitoring: true,
  isMonthlyComoditityMonitoringFethced: false,
});

export const getters = {
  getYear(state) {
    // Check if selectedYear exists and has a year
    return state.selectedYear && state.selectedYear.year
      ? state.selectedYear.year
      : new Date().getFullYear();
  },
  getCurrentYear: () => {
    return new Date().getFullYear(); // Get the current year
  },
};

export const mutations = {
  SET_MONTHLY_COMODITY_MONITORING() {
    state.monthlyComoditityMonitoring = data;
    state.isMonthlyComoditityMonitoringFethced = true;

  },
  SET_MONTHLY_COMODITY_MONITORING_STATUS(state, status) {
    state.monthlyComoditityMonitorinngStatus = status;
  },

  SET_LOADING_MONTHLY_COMODITY_MONITORING(state, isLoading) {
    state.isLoadingMonthlyComoditityMonitoring = isLoading;
  }

};

export const actions = {
  async fetchMonthlyComodityMonitoring({ commit }) {
    // Simulasikan mengambil data dari API atau sumber lain
    const commodities = [
      {
        name: "Beras Medium",
        status: "Naik",
        percentage_change: 0.19,
        image: "beras_medium.svg",
      },
      {
        name: "Cabe Merah",
        status: "Stabil",
        percentage_change: 0,
        image: "cabe_merah.svg",
      },
      {
        name: "Bawang Merah",
        status: "Turun",
        percentage_change: 0.17,
        image: "bawang_merah.svg",
      },
      {
        name: "Gula Pasir Lokal",
        status: "Turun",
        percentage_change: 2.5,
        image: "gula_pasir_lokal.svg",
      },
      {
        name: "Daging Sapi",
        status: "Turun",
        percentage_change: 3.12,
        image: "daging_sapi.svg",
      },
      {
        name: "Bawang Putih",
        status: "Turun",
        percentage_change: 0.12,
        image: "bawang_putih.svg",
      },
      {
        name: "Beras Premium",
        status: "Stabil",
        percentage_change: 0,
        image: "beras_premium.svg",
      },
      {
        name: "Udang",
        status: "Turun",
        percentage_change: 1.0,
        image: "udang.svg",
      },
    ];
    commit("SET_COMMODITIES", commodities);
  },
};



export default {
  store: true,
};
