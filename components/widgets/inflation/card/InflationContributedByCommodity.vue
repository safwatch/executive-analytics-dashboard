<template>
    <!-- shimmer for header and chart -->
    <div v-if="isLoading" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pt-3 h-100 px-4">
            <div class="row filter-card d-flex px-2">
                <div class="col-xl-12">
                    <div class="w-100 pb-3 d-flex justify-content-center">
                        <SieShimmer :shape="'circle'" :width="'100%'" :height="'250px'" :borderRadius="'8px'" />
                    </div>
                    <div class="w-100 pb-0">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'180px'" :borderRadius="'8px'" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- main content -->
    <div v-else class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Pemantauan 20 Komoditas</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="kpit-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="kpit-popover" triggers="hover" placement="right" custom-class="custom-popover">
                    <template v-slot:title>
                        Pemantauan 20 Komoditas
                    </template>
                    <div>
                        Pemantauan 20 komoditas pangan merupakan widget yang sistematis terhadap harga 20 jenis Komoditas Pangan di pasar-pasar yang berbeda. Widget ini bertujuan untuk memantau stabilitas harga pangan.
                    </div>
                </b-popover>
            </div>
        </div>

        <!-- Doughnut chart section -->
        <div class="card-body">
            <h6 class="mt-0 mb-4 text-muted" v-html="getDateAcquired()"></h6>
            <div class="chart-commodity" id="scrollspy-commodity">
                <DoughnutCommodityChart :data="commodityChartData" />
            </div>
            <div class="table-responsive mt-3 mb-0">
                <div class="scrollable-container" id="scrollspy-commodity-list" data-spy="scroll"
                    data-target="#scrollspy-commodity" data-offset="0" style="height: 175px;">
                    <div v-for="(commodity, index) in commodityList" :key="index"
                        class="col-xl-12 py-2 d-flex justify-content-between align-items-center">
                        <p class="text-truncate mb-0">
                            <CommodityImage class="mr-3" :src="getSvgSrc(commodity.commodity_name)"
                                                        :altText="commodity.commodity_name" />{{ commodity.commodity_name }}
                        </p>
                        <p
                            :class="commodity.percentage_change > 0 ? 'text-danger fw-medium mb-0' : 'text-success fw-medium mb-0'">
                            <i
                                :class="commodity.percentage_change > 0 ? 'ri-arrow-up-s-fill align-middle' : 'ri-arrow-down-s-fill align-middle'"></i>
                            {{ commodity.percentage_change }}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { payloadHelper } from '~/helpers/payload.helper';
import { getSvgSrc } from '~/helpers/svg.helper';
import CustomPopover from '~/components/Popover.vue';
import DoughnutCommodityChart from "../chart/DoughnutCommodityChart.vue";
import CommodityImage from '../helpers/CommodityImage.vue';

export default {
    components: {
        CustomPopover,
        DoughnutCommodityChart,
        CommodityImage,
    },
    data() {
        return {
            isLoading: true, // For shimmer on the chart and header
            commodityList: [],
            commodityChartData: [],
        };
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchCommodityData();
            }
        });

        console.log(this.commodities);
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        // Fetch data for all commodities
        async fetchCommodityData() {
            const commodityIds = [121, 137, 122, 132, 138, 127, 128, 124, 125, 149, 129, 159, 123, 131, 130, 163, 142, 126, 148, 151];

            try {
                // Sequentially fetching data for each commodity
                for (let i = 0; i < commodityIds.length; i++) {
                    await this.fetchCommodityForId(commodityIds[i], i);
                }

                // After all data is fetched, mark loading as complete
                this.isLoading = false;
            } catch (error) {
                console.error("Error fetching commodity data:", error);
            }
        },
        // Fetch commodity data by ID and update the respective index in the commodity list
        async fetchCommodityForId(commodityId, index) {
            try {
                const param = payloadHelper.normalParam(`&commodity_id=${commodityId}`);
                const response = await this.$commodityAggregatePricesRepo.getByParam(param);

                // Check if the response is OK and update commodity data
                if (response.status === 'OK') {
                    this.$set(this.commodityList, index, {
                        commodity_name: response.result.commodity_name,
                        current_average_price: response.result.current_average_price,
                        previous_average_price: response.result.previous_average_price,
                        percentage_change: response.result.percentage_change,
                        month_period: response.result.month_period,
                        status: response.result.status,
                    });

                    // Also update the chart data for Doughnut chart
                    this.commodityChartData.push({
                        name: response.result.commodity_name,
                        y: response.result.percentage_change,
                    });
                } else {
                    // If no data, update commodity with "No Data"
                    this.$set(this.commodityList, index, {
                        commodity_name: 'No Data',
                        current_average_price: 'No Data',
                        previous_average_price: 'No Data',
                        percentage_change: 'No Data',
                        month_period: 'No Data',
                        status: 'No Data',
                    });
                }
            } catch (error) {
                console.error(`Error fetching data for Commodity ID ${commodityId}:`, error);
                // Handle error for individual commodity
                this.$set(this.commodityList, index, {
                    commodity_name: 'No Data',
                    current_average_price: 'No Data',
                    previous_average_price: 'No Data',
                    percentage_change: 'No Data',
                    month_period: 'No Data',
                    status: 'No Data',
                });
            }
        },

        // Get the "date acquired" based on month_period
        getDateAcquired() {
            const monthPeriods = this.commodityList.map(item => item.month_period);

            // Remove any 'No Data' entries
            const validMonths = monthPeriods.filter(month => month !== 'No Data');

            // Check if all months are the same
            const uniqueMonths = [...new Set(validMonths)];

            if (uniqueMonths.length === 1) {
                return `Update data terakhir : <span class="badge badge-outline-primary badge-primary">${uniqueMonths[0]}</span>`;
            } else if (uniqueMonths.length > 1) {
                return `Update data terakhir : <span class="badge badge-outline-primary badge-primary">${uniqueMonths.join(
                    ' & '
                )}</span>`;
            } else {
                return 'Update data terakhir : <span class="badge badge-outline-danger badge-danger">No data</span>';
            }
        },
        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },
    },
}
</script>