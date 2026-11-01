<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <SummaryYoYCardwithChart :isMetricLoading="isLoadingYoYMetric" :isChartLoading="isLoadingYoYChart"
                    :metricData="yoyMetricData || {}" :metricStatus="yoyMetricStatus || ''"
                    :chartData="yoyChartData || []" :chartStatus="yoyChartStatus || ''" />
            </div> <!-- end col-->

            <div class="col-md-3">
                <SummaryMtMCardwithChart :isMetricLoading="isLoadingMtMMetric" :isChartLoading="isLoadingMtMChart"
                    :metricData="mtmMetricData || {}" :metricStatus="mtmMetricStatus || ''"
                    :chartData="mtmChartData || []" :chartStatus="mtmChartStatus || ''" />
            </div> <!-- end col-->

            <div class="col-md-3">
                <InflationControlMetricCard :isMetricLoading="isLoadingActionPlan" :metricData="actionPlanMetric || {}"
                    :metricStatus="actionPlanStatus || ''" />
            </div> <!-- end card-->

            <div class="col-xl-3 col-md-6">
                <MarketSpreadCard :isMetricLoading="isLoadingMarketSpread" :metricData="marketSpreadMetric || []"
                    :metricStatus="marketSpreadStatus || ''" />
            </div>

        </div> <!-- end col-->
        <div class="row">
            <div class="col-xl-6">
                <InflationIPHTargetRealizationCard
                    :isTabLoading="isLoadingYearlyInflation || isLoadingYearlyIPH || isLoadingYearlyTargetRealization"
                    :yearlyInflationData="yearlyInflationData || {}" :yearlyIPHData="yearlyIPHData || []"
                    :yearlyTargetRealizationData="yearlyTargetRealizationData || {}"
                    :yearlyInflationStatus="yearlyInflationStatus || ''" :yearlyIPHStatus="yearlyIPHStatus || ''"
                    :yearlyTargetRealizationStatus="yearlyTargetRealizationStatus || ''" />
            </div>
            <div class="col-xl-6 col-md-6">
                <SummaryDoughnutCommodityCard :isMetricLoading="isLoadingInflationByCommodity"
                    :metricData="commoditiesWithPriceIncrease || []" :metricStatus="marketSpreadStatus || ''" />
            </div><!-- end col -->
        </div>
        <TrackerInflationControlCardwithQuarter :isMetricLoading="isLoadingTrackerInflationControlCard" :isLoadingPartRealizationBudget="isLoadingPartRealizationBudget" :isLoadingPartRadialChart="isLoadingPartRadialChart" 
            :metricData="trackerInflationControlCard || {}" :metricStatus="trackerInflationControlCardStatus || ''" />

        <!-- <LottieIcon :animationData="animationJson" :loop="true" :autoplay="true" /> -->
    </div> <!-- end row-->
</template>
<script>
import { mapState, mapActions } from 'vuex';

// SVG Animation
import LottieIcon from '@/components/LottieIcon.vue';
import animationJson from '@/assets/json/lottie/tap.json';

import SummaryYoYCardwithChart from "./card/SummaryYoYCardwithChart.vue";
import SummaryMtMCardwithChart from "./card/SummaryMtMCardwithChart.vue";
import InflationControlMetricCard from "./card/InflationControlMetricCard.vue";
import MarketSpreadCard from "./card/MarketSpreadCard.vue";
import InflationIPHTargetRealizationCard from "./card/InflationIPHTargetRealizationCard.vue";
import SummaryDoughnutCommodityCard from "./card/SummaryDoughnutCommodityCard.vue";
import TrackerInflationControlCardwithQuarter from "./card/TrackerInflationControlCardwithQuarter.vue";

export default {
    name: 'SummaryExecutiveComponent',
    components: {
        SummaryYoYCardwithChart,
        SummaryMtMCardwithChart,
        InflationControlMetricCard,
        MarketSpreadCard,
        InflationIPHTargetRealizationCard,
        SummaryDoughnutCommodityCard,
        TrackerInflationControlCardwithQuarter,
        LottieIcon,
    },
    computed: {
        ...mapState('inflationSummary', [
            // YoY Card
            'yoyMetricData',
            'yoyChartData',
            'isLoadingYoYMetric',
            'isLoadingYoYChart',
            'yoyMetricStatus',
            'yoyChartStatus',
            'isYoYDataFetched',
            // MtM Card
            'mtmMetricData',
            'mtmChartData',
            'isLoadingMtMMetric',
            'isLoadingMtMChart',
            'mtmMetricStatus',
            'mtmChartStatus',
            'isMtMDataFetched',
            // Action Plan Card
            'actionPlanMetric',
            'actionPlanStatus',
            'isLoadingActionPlan',
            'isActionPlanMetricFetched',
            // Market Spread Card
            'marketSpreadMetric',
            'marketSpreadStatus',
            'isLoadingMarketSpread',
            'isMarketSpreadMetricFetched',
            // Yearly 'Inflation', 'IPH', and Target vs. Realization
            'yearlyInflationData',
            'yearlyInflationStatus',
            'isLoadingYearlyInflation',
            'isYearlyInflationChartTabFetched',
            'yearlyIPHData',
            'yearlyIPHStatus',
            'isLoadingYearlyIPH',
            'isYearlyIPHChartTabFetched',
            'yearlyTargetRealizationData',
            'yearlyTargetRealizationStatus',
            'isLoadingYearlyTargetRealization',
            'isYearlyTargetRealizationChartTabFetched',
            // Inflation By Commodity
            'inflationByCommodityData',
            'inflationByCommodityStatus',
            'isLoadingInflationByCommodity',
            'isInflationByCommodityChartTabFetched',
            // Tracker Inflation Control
            'trackerInflationControlCard',
            'trackerInflationControlCardStatus',
            'isLoadingTrackerInflationControlCard',
            'isTrackerInflationControlCardFetched',
            'isLoadingPartRealizationBudget',
            'isLoadingPartRadialChart',
            // Strategy Metric
            // 'strategiMetric', not used
            // 'strategiMetricStatus', not used
            // 'isLoadingStrategiMetric', not used
            // 'isStrategiMetricFetched', not used,
            'commoditiesWithPriceIncrease',
        ]),
    },
    data() {
        return {
            animationJson,
        }
    },
    mounted() {
        if (!this.isMtMDataFetched && !this.isYoYDataFetched) {
            this.fetchInitialData();
        }
    },
    methods: {
        ...mapActions('inflationSummary', ['fetchInitialData']),
    }
}
</script>
