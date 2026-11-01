import commodityDetails from "@/components/widgets/inflation/commodity-item-price.json";
import axios from 'axios';

import { responseHelper } from '../helpers/response.helper';
import { payloadHelper } from '../helpers/payload.helper';

const state = () => ({
  selectedCommodity: null,  // Array to store selected commodity details

  inflationCommodityWeek : [],
  inflationCommodityWeekStatus : null,

  inflationCommodity : [],
  inflationCommodityStatus : null,

  itemFilter : [],
  itemFilterStatus : null,

});

const mutations = {
  SET_SELECTED_COMMODITY(state, commodity) {
    console.log('Committing commodity:', commodity); // Debugging
    state.selectedCommodity = commodity; // Commit the commodity object
  },

  SET_SELECTED_COMMODITY(state, commodity) {
    console.log('Committing commodity:', commodity); // Debugging
    state.selectedCommodity = commodity; // Commit the commodity object
  },

  SET_INFLATION_COMMODITY_WEEK(state, data) {
    state.inflationCommodityWeek = data;
    state.inflationCommodityWeekStatus = 'success';
  },

  SET_INFLATION_COMMODITY_WEEK_FAILURE(state, commodity) {
    state.inflationCommodityWeekStatus = 'failure'; // Commit the commodity object
  },

  SET_INFLATION_COMMODITY(state, data) {
    state.inflationCommodity = data;
    state.inflationCommodityStatus = 'success';
  },

  SET_INFLATION_COMMODITY_FAILURE(state, commodity) {
    state.inflationCommodityStatus = 'failure'; // Commit the commodity object
  },

  SET_ITEM_FILTER(state, data) {
      state.itemFilter = data;
      state.itemFilterStatus = data.status;
  },

  SET_ITEM_FILTER_FAILURE(state, data) {
      state.itemFilterStatus = data.status;
  },
};

const actions = {
  setSelectedCommodity({ commit }, selectedCommodity) {
    console.log('Action received ID:', selectedCommodity); // Debugging

    // Convert the selectedCommodityId to an integer
    const commodityId = parseInt(selectedCommodity?.id, 10);

    if (isNaN(commodityId)) {
      console.error('Invalid ID:', selectedCommodity); // Log an error if ID is not a valid number
      commit('SET_SELECTED_COMMODITY', null); // Clear the selection if the ID is invalid
      return;
    }

    // Find the commodity in the data by ID
    // const selectedCommodity = commodityDetails.data.find(item => item.id === commodityId) || null;
    commit('SET_SELECTED_COMMODITY', selectedCommodity);
  },

  async fetchDataCommoditiesWeek({ commit }, {commodityId}) {
      // console.log('vuex fetchDataCommoditiesWeek', commodityId);
        let normalParam = payloadHelper.normalParam('');

        if (commodityId) {
            // console.log('vuex fetchDataCommoditiesWeek', commodityId);

            normalParam = payloadHelper.normalParam(`&commodity_id=${commodityId}`); 
        }

        try {
            const response = await this.$inflationFoodStatusCommodity.getByParam(normalParam);
            if (response.status === 'OK' && Array.isArray(response.result) && response.result.length > 0) {

                const data = response.result;  // Assuming the first entry is the relevant data
                commit('SET_INFLATION_COMMODITY_WEEK', data);           // Commit the data to the store
               
            } else {
                commit('SET_INFLATION_COMMODITY_WEEK_FAILURE', 'failure'); // Handle failure case
            }

            // console.log('response fetchDataCommoditiesWeek', response);
            
        } catch (error) {
            console.log('error', error);
            
        }
    },

  async fetchDataCommodities({ commit }, {commodityId}) {
    // console.log('vuex fetchDataCommodities', commodityId);
      let normalParam = payloadHelper.normalParam('');

      if (commodityId) {
          // console.log('vuex fetchDataCommodities', commodityId);

          normalParam = payloadHelper.normalParam(`&comodity_id=${commodityId}`); 
      }

      try {
          const response = await this.$inflationFoodCommodity.getByParam(normalParam);
          if (response.status === 'OK' && Array.isArray(response.result) && response.result.length > 0) {

              const data = response.result;  // Assuming the first entry is the relevant data
              commit('SET_INFLATION_COMMODITY', data);           // Commit the data to the store
             
          } else {
              commit('SET_INFLATION_COMMODITY_FAILURE', 'failure'); // Handle failure case
          }

          // console.log('response fetchDataCommodities', response);

      } catch (error) {
          console.log('error', error);
          
      }
  },

  async fetchDataFilterCommodities({ commit }, { } = {}) {
      let normalParam = payloadHelper.normalParam('');

      try {
          var response = await this.$inflationFilterComodity.getByParam(normalParam);
          if (response.status === 'OK' && Array.isArray(response.result) && response.result.length > 0) {

              const data = response.result;  // Assuming the first entry is the relevant data
              commit('SET_ITEM_FILTER', data);           // Commit the data to the store
            
          } else {
              commit('SET_ITEM_FILTER_FAILURE', 'failure'); // Handle failure case
          }
          // var status = responseHelper.statusCheck(response.status, response.message);
          // commit('SET_YEAR_FILTER', response);
          // return status;
      } catch (error) {
          commit('SET_ITEM_FILTER_FAILURE', error.message);
          console.log('error catch', error.message);
      }
  },
  
};


const getters = {
  selectedCommodity: state => state.selectedCommodity,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};