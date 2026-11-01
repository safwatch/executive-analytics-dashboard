<template>
    <div>
        <div class="row">
            <div class="col-xl-6">
                <div class="row h-100">
                    <div class="col-xl-12">
                        <BannerInflationReport />
                    </div><!-- end col -->
                </div> <!-- end row-->
            </div><!-- end col -->

            <div class="col-xl-6">

                <div class="row">
                    <div class="col-md-6">
                        <ReportMtMCard :isMetricLoading="isLoadingMtMMetric" :isChartLoading="isLoadingMtMChart"
                            :metricData="mtmMetricData || {}" :metricStatus="mtmMetricStatus || ''"
                            :chartData="mtmChartData || []" :chartStatus="mtmChartStatus || ''" />
                    </div> <!-- end col-->

                    <div class="col-md-6">
                        <InflationControllingStrategic :isMetricLoading="isLoadingStrategiMetric"
                            :metricData="strategiMetric || {}" :metricStatus="strategiMetricStatus || ''" />
                    </div> <!-- end col-->
                </div> <!-- end row-->

                <div class="row">
                    <div class="col-md-6">
                        <InflationControllingActPlan :isMetricLoading="isLoadingActionPlan"
                            :metricData="actionPlanMetric || {}" :metricStatus="actionPlanStatus || ''" />
                    </div> <!-- end col-->

                    <div class="col-md-6">
                        <InflationControllingWorkunits :isMetricLoading="isLoadingWorkunit"
                            :metricData="workunitMetric || {}" :metricStatus="workunitStatus || ''" />
                    </div> <!-- end col-->
                </div> <!-- end row-->

            </div> <!-- end col-->


        </div> <!-- end row-->


        <div class="row">
            <div class="col-xl-6">
                <ReportTargetvsRealizationChart :isChartLoading="isLoadingTargetVsRealizationChart"
                    :chartData="targetVsRealizationChart || {}" :chartStatus="targetVsRealizationChartStatus || ''" />
            </div>
            <div class="col-xl-6">
                <TrackerInflationControl :isMetricLoading="isLoadingTrackerInflationControlCard"
                    :metricData="trackerInflationControlCard || {}"
                    :metricStatus="trackerInflationControlCardStatus || ''" />
            </div>
        </div>

        <div class="row">
            <div class="col-xl-6">
                <HeatmapFoodBalanceChart :isChartLoading="isLoadingFoodBalanceChart" :chartData="foodBalanceChart || []"
                    :chartStatus="foodBalanceStatus || ''" />
            </div>
            <div class="col-xl-6">
                <ReportIndexPriceChangesChart :isTabLoading="isLoadingMonthlyIPH || isLoadingYearlyIPH"  :monthlyIPHData="monthlyIPHData || []"
                :yearlyIPHData="yearlyIPHData|| []" :monthlyIPHStatus="monthlyIPHStatus || ''" :yearlyIPHStatus="yearlyIPHStatus || ''" :selectedYear="selectedYear || {}"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import BannerInflationReport from "./card/BannerInflationReport.vue";
import ReportMtMCard from "./card/ReportMtMCard.vue";
import ReportTargetvsRealizationChart from "./chart/ReportTargetvsRealizationChart.vue";
import HeatmapFoodBalanceChart from "./chart/HeatmapFoodBalanceChart.vue";
import ReportIndexPriceChangesChart from "./chart/ReportIndexPriceChangesChart.vue";
import InflationControllingStrategic from "./card/InflationControllingStrategic.vue";
import InflationControllingActPlan from "./card/InflationControllingActPlan.vue";
import InflationControllingWorkunits from "./card/InflationControllingWorkunits.vue";
import TrackerInflationControl from "./card/TrackerInflationControl.vue";

export default {
    name: 'LaporanComponent',
    components: {
        BannerInflationReport,
        ReportMtMCard,
        InflationControllingStrategic,
        InflationControllingActPlan,
        InflationControllingWorkunits,
        ReportTargetvsRealizationChart,
        TrackerInflationControl,
        HeatmapFoodBalanceChart,
        ReportIndexPriceChangesChart
    },
    computed: {
        ...mapState('inflationReport', [
            'mtmMetricData',
            'mtmMetricStatus',
            'mtmChartData',
            'mtmChartStatus',
            'isLoadingMtMMetric',
            'isLoadingMtMChart',
            'isMtMDataFetched',
            // Strategy Card
            'strategiMetric',
            'strategiMetricStatus',
            'isLoadingStrategiMetric',
            'isStrategiMetricFetched',
            // Action Plan Card
            'actionPlanMetric',
            'actionPlanStatus',
            'isLoadingActionPlan',
            'isActionPlanMetricFetched',
            // Workunit Card
            'workunitMetric',
            'workunitStatus',
            'isLoadingWorkunit',
            'isWorkunitMetricFetched',
            // Target vs Realization Chart
            'targetVsRealizationChart',
            'targetVsRealizationChartStatus',
            'isLoadingTargetVsRealizationChart',
            'isTargetVsRealizationChartFetched',
            // Tracker Inflation Control
            'trackerInflationControlCard',
            'trackerInflationControlCardStatus',
            'isLoadingTrackerInflationControlCard',
            'isTrackerInflationControlCardFetched',
            // Food Balance Chart
            'foodBalanceChart',
            'foodBalanceStatus',
            'isLoadingFoodBalanceChart',
            'isFoodBalanceChartFetched',
            // IPH
            'monthlyIPHData', 
            'monthlyIPHStatus', 
            'isLoadingMonthlyIPH', 
            'isMonthlyIPHChartTabFetched',
            'yearlyIPHData', 
            'yearlyIPHStatus', 
            'isLoadingYearlyIPH', 
            'isYearlyIPHChartTabFetched',
            // Year Data
            'selectedYear',
        ]),
    },
    mounted() {
        if (!this.isMtMDataFetched) {
            this.fetchInitialData();
        }
    },
    methods: {
        ...mapActions('inflationReport', ['fetchInitialData']),
    }
}
</script>