<template>
  <div>
    <div class="row">
      <div class="col-xl-6">

        <div class="row">
          <div class="col-xl-12">
            <OverviewPositioningInflasi />
          </div> <!-- end col-->
        </div> <!-- end row-->

      </div>
      <div class="col-xl-3">

        <div class="row">
          <div class="col-xl-12">
            <IPHProfilCardModalChart />
          </div> <!-- end col-->
        </div> <!-- end row-->

      </div>
      <div class="col-xl-3">

        <div class="row">
          <div class="col-xl-12">
            <ActionPlanAndStrategicCardWithDetail />
          </div> <!-- end col-->
        </div> <!-- end row-->

      </div>
    </div>
    <div class="row">
      <div class="d-flex col-xl-12 px-0">
        <div class="col-xl-6">
          <!-- Tab of IPH, Commodity & Market -->
          <OverviewIPH />
        </div>
        <div class="col-xl-6">
          <MonitoringInflationControl />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4">
        <!-- <OverviewMonitoringCommodity /> -->
        <div class="widget-simple card">
          <div class="card-header">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Pemantauan Komoditas - Bulan July 2025</h4>
          </div>
          <div class="card-body pt-0 px-0 cardy-box">
            <div v-if="isLoadingMonthlyComodityMonitoring">Loading...</div>
            <ul v-else class="list-group list-group-flush border-dashed">
              <li class="list-group-item ps-0" v-for="commodity in monthlyComodityMonitoring" :key="commodity.id">
                <div class="row align-items-center g-3">
                  <div class="col-auto">
                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                      <div class="text-center">
                        <CommodityImage :src="getSvgSrc(commodity.name)" :altText="commodity.name" />
                      </div>
                    </div>
                  </div>
                  <div class="col"><span>{{ commodity.name }}</span></div>
                  <div class="col-auto">
                    <span v-if="commodity.percentage_change < 0"
                      class="fs-12 badge badge-outline-success badge-secondary">
                      <i class="ri-arrow-down-line"></i> {{ commodity.percentage_change }}%
                    </span>
                    <span v-else-if="commodity.percentage_change === 0"
                      class="fs-12 badge badge-outline-warning badge-secondary">
                      <i class="ri-checkbox-blank-circle-line"></i> {{ commodity.percentage_change }}%
                    </span>
                    <span v-else class="fs-12 badge badge-outline-danger badge-danger">
                      <i class="ri-arrow-up-line"></i> {{ commodity.percentage_change }}%
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <FoodBalanceTreeMapIPH />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { gsap } from "gsap";
import DynamicPopover from '~/components/DynamicPopover.vue';

import CommodityImage from './helpers/CommodityImage.vue';
import { getSvgSrc } from '~/helpers/svg.helper';

// import components
import OverviewPositioningInflasi from "./tab/OverviewPositioningInflasi.vue";
import ActionPlanAndStrategicCardWithDetail from './card/ActionPlanAndStrategicCardWithDetail.vue';
import IPHProfilCardModalChart from './card/IPHProfilCardModalChart.vue';
import TrendIPHCommodityAndMarket from "./chart/TrendIPHCommodityAndMarket.vue";
import FoodBalanceTreeMapIPH from "./chart/FoodBalanceTreeMapIPH.vue";
import MonitoringInflationControl from "./card/MonitoringInflationControl.vue";
import OverviewIPH from './card/OverviewIPH.vue';
import OverviewMonitoringCommodity from './card/OverviewMonitoringCommodity.vue';


export default {
  name: 'OverviewFoodInflationComponent',
  components: {
    OverviewPositioningInflasi,
    ActionPlanAndStrategicCardWithDetail,
    IPHProfilCardModalChart,

    TrendIPHCommodityAndMarket,
    FoodBalanceTreeMapIPH,

    DynamicPopover,
    CommodityImage,
    OverviewIPH,
    MonitoringInflationControl,
    apexchart: () => import("vue-apexcharts"),
    OverviewMonitoringCommodity,
  },
  computed: {
    ...mapState('foodProfile', [
      'iphDataChart',
      'iphDataChartStatus',
      'isLoadingIPHDataChart',
      'isIPHDataChartFetched',
      'aggCommodityChangeChart',
      'aggCommodityChangeStatus',
      'isLoadingAggCommodityChangeChart',
      'isAggCommodityChangeFetched',
      'aggMarketPriceChangeChart',
      'aggMarketPriceChangeStatus',
      'isLoadingAggMarketPriceChangeChart',
      'aggMarketPriceChangeFetched',
    ]),

    ...mapState('overwatchIPHCommodity', [
      'monthlyComodityMonitoring',
      'monthlyComodityMonitoringStatus',
      'isLoadingMonthlyComodityMonitoring',
      'isMonthlyComodityMonitoringFetched',
      'month',
      'year',
    ]),
  },
  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.loadMonthlyCommodityData();
  },
  methods: {
    ...mapActions('overwatchIPHCommodity', ['fetchMonthlyComodityMonitoring']),

    loadMonthlyCommodityData() {
      this.fetchMonthlyComodityMonitoring();
    },
    getSvgSrc(commodityName) {
      return getSvgSrc(commodityName);
    },
  },
  watch: {
    monthlyComodityMonitoring(result) {
      
    }
  }
}
</script>
<style scoped>
::v-deep(.apexcharts-point-annotations text),
::v-deep(.apexcharts-xaxis-annotations text),
::v-deep(.apexcharts-yaxis-annotations text) {
  fill: #fff !important;
}
</style>
