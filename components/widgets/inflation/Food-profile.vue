<template>
    <div>
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <FoodIPHProfilCard :isMetricLoading="isLoadingIPHMetric" :metricData="IPHMetric || {}"
                    :metricStatus="IPHMetricStatus || ''" />
            </div>

            <div class="col-xl-3 col-md-6">
                <FoodCheapBazaar :isMetricLoading="isLoadingCheapMarket" :metricData="cheapMarketMetric || []"
                    :metricStatus="cheapMarketStatus || ''" />
            </div>

            <div class="col-xl-3 col-md-6">
                <MarketDistributionCard :isMetricLoading="isLoadingAggMarketSummary"
                    :metricData="aggMarketSummaryMetric || {}" :metricStatus="aggMarketSummaryStatus || ''" />
            </div>

            <div class="col-xl-3 col-md-6">
                <CountCommodityCard :isMetricLoading="isLoadingAggTotalCommodity"
                    :metricData="aggTotalCommodityMetric || {}" :metricStatus="aggTotalCommodityStatus || ''" />
            </div>
        </div>


        <div class="row">
            <div class="d-flex col-xl-12 px-0">
                <div class="col-xl-6">
                    <!-- Tab of IPH, Commodity & Market -->
                    <TrendIPHCommodityAndMarket
                        :isTabLoading="isLoadingIPHDataChart || isLoadingAggCommodityChangeChart || isLoadingAggMarketPriceChangeChart"
                        :iphDataChart="iphDataChart || []" :CommodityChangeChart="aggCommodityChangeChart || []"
                        :MarketPriceChangeChart="aggMarketPriceChangeChart || []"
                        :iphDataChartStatus="iphDataChartStatus || ''"
                        :aggCommodityChangeStatus="aggCommodityChangeStatus || ''"
                        :aggMarketPriceChangeStatus="aggMarketPriceChangeStatus || ''" />
                </div>
                <div class="col-xl-6">
                    <!-- Counter Commodity -->
                    <FoodCounterEstimationCommodityCard :isMetricLoading="isLoadingIPHEstimation"
                        :metricData="iphEstimationMetric || {}" :metricStatus="iphEstimationStatus || ''" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 mb-3">
                <WatcherCommodityLatestQuarter :isMetricLoading="isLoadingCommodityLatestQuarter"
                :metricData="commodityLatestQuarterMetric || {}" :metricStatus="commodityLatestQuarterStatus || ''" />
            </div>
        </div>
        <div class="row">
            <!-- shimmer -->
            <div class="col-xl-12">
                <FluctuationCommodityTreemap :isChartLoading="isLoadingIPHCommodityTreemap"
                :chartData="iphCommodityTreemapChart || []" :chartStatus="iphCommodityTreemapStatus || ''"  />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import FoodIPHProfilCard from './card/FoodIPHProfilCard.vue';
import FoodCheapBazaar from './card/FoodCheapBazaar.vue';
import FoodCounterEstimationCommodityCard from './card/FoodCounterEstimationCommodityCard.vue';
import WatcherCommodityLatestQuarter from './card/WatcherCommodityLatestQuarter.vue';
import DynamicPopover from '~/components/DynamicPopover.vue';
import MarketDistributionCard from "./card/MarketDistributionCard.vue";
import CountCommodityCard from "./card/CountCommodityCard.vue";
import InflationPriceDevIndex from "./chart/InflationPriceDevIndex.vue";
import TrendIPHCommodityAndMarket from "./chart/TrendIPHCommodityAndMarket.vue";
import InflationCommodityMonth from './card/InflationCommodityMonth.vue';
import FoodCountCommodityCard from './card/FoodCountCommodityCard.vue';
import DeflasiCommodityMonth from './card/DeflasiCommodityMonth.vue';
import InflationTreeMap from './chart/InflationTreeMap.vue';
import FluctuationCommodityTreemap from './chart/FluctuationCommodityTreemap.vue';



export default {
    name: 'FoodProfilInflasiComponent',
    components: {
        FoodIPHProfilCard,
        FoodCheapBazaar,
        FoodCountCommodityCard,
        FoodCounterEstimationCommodityCard,
        TrendIPHCommodityAndMarket,
        WatcherCommodityLatestQuarter,
        DynamicPopover,
        MarketDistributionCard,
        CountCommodityCard,
        InflationPriceDevIndex,
        InflationCommodityMonth,
        DeflasiCommodityMonth,
        InflationTreeMap,
        FluctuationCommodityTreemap,
        apexchart: () => import("vue-apexcharts"),
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

            // IPH Metric
            'IPHMetric',
            'IPHMetricStatus',
            'isLoadingIPHMetric',
            'isIPHMetricFetched',

            //Count Commodity Card

            'aggTotalCommodityMetric',
            'aggTotalCommodityStatus',
            'isLoadingAggTotalCommodity',
            'isAggTotalCommodityFetched',

            'aggMarketSummaryMetric',
            'aggMarketSummaryStatus',
            'isLoadingAggMarketSummary',
            'isAggMarketSummaryFetched',

            'iphEstimationMetric',
            'iphEstimationStatus',
            'isLoadingIPHEstimation',
            'isIPHEstimationFetched',

            'cheapMarketMetric',
            'cheapMarketStatus',
            'isLoadingCheapMarket',
            'isCheapMarketFetched',

            'commodityLatestQuarterMetric',
            'commodityLatestQuarterStatus',
            'isLoadingCommodityLatestQuarter',
            'isCommodityLatestQuarterFetched',

            'iphCommodityTreemapChart',
            'iphCommodityTreemapStatus',
            'isLoadingIPHCommodityTreemap',
            'isIPHCommodityTreemapFetched',

            // Year Data
            'selectedYear',
        ]),
    },
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        ...mapActions('foodProfile', ['fetchInitialData']),
    },
    data() {
        return {
            isFixed: false,
            containerWidth: 0,
            isLoading: true,
        }
    },
    mounted() {
        if (!this.isIPHDataChartFetched) {
            this.fetchInitialData();
        }
    },
}
</script>
<style scoped>
.custom-col {
    flex: 0 0 20%;
    max-width: 20%;
}

@media (max-width: 768px) {
    .custom-col {
        flex: 0 0 100%;
        max-width: 100%;
        margin-bottom: 10px;
    }
}

.commodity-icon svg {
    max-height: 26px;
    width: auto;
    display: block;
    width: 100%;
}
</style>