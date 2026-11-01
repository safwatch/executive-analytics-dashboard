<template>
    <div v-if="isMetricLoading || !metricData">
        <div class="row justify-content-between d-flex">
            <div class="d-flex pt-2 title-component pb-4 col col-lg-12">
                <SieShimmer :shape="'rectangle'" :width="'25%'" :height="'20px'" :borderRadius="'8px'" />
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0">
                    <ul class="list-group list-group-flush border-dashed">
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0">
                    <ul class="list-group list-group-flush border-dashed">
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0">
                    <ul class="list-group list-group-flush border-dashed">
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0">
                    <ul class="list-group list-group-flush border-dashed">
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
        </div>
    </div>
    <div v-else>
        <div class="row justify-content-between d-flex position-relative">
            <div class="d-flex title-component pt-2 pb-4 col col-lg-12">
                <h5 class="card-title fs-14 mb-1">Pemantauan 10 Komoditas Berdasarkan 4 Bulan Terakhir</h5>
                <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                    <a href="javascript:void(0);" id="watch-comodity-latest-quarter-popover" class="text-muted"
                        variant="light">
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <b-popover target="watch-comodity-latest-quarter-popover" triggers="hover" placement="right"
                        custom-class="custom-popover">
                        <template v-slot:title>
                            Pemantauan 10 Komoditas Berdasarkan 4 Bulan Terakhir
                        </template>
                        <div>
                            Pemantauan 10 komoditas selama 4 bulan terakhir menunjukkan tren harga dan volume
                            perdagangan yang signifikan, di
                            mana beberapa komoditas mengalami fluktuasi harga akibat faktor musiman, perubahan
                            permintaan, dan kondisi cuaca
                            yang mempengaruhi produksi.
                        </div>
                    </b-popover>
                </div>
            </div>
            <!-- <pre>{{ monthsData }}</pre> -->
            <div v-if="monthsData === 0" class="col-lg-12 px-0 d-flex justify-content-center">
                <div v-for="(monthData, index) in metricData" :key="index" class="col col-xl-3 mb-2">
                    <div class="widget-simple card">
                        <div class="card-header align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">{{ getMonthTitleNoData(index) }}</h4>
                        </div><!-- end card header -->
                        <div class="card-body pt-0 px-0 cardy-box">
                            <b-alert show variant="warning">
                                <i class="fe-info mr-2"></i>Tidak ada data yang tersedia.
                            </b-alert>
                        </div><!-- end card body -->
                    </div>
                </div>
            </div>
            <div v-for="(monthData, index) in monthsData" :key="index" class="col col-xl-3 mb-2">
                <div class="widget-simple card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">
                            {{ monthData.nama_bulan }} - {{ monthData.tahun }}
                        </h4>
                    </div><!-- end card header -->
                    <div class="card-body pt-0 px-0 cardy-box">
                        <ul class="list-group list-group-flush border-dashed">
                            <li v-if="monthData.list_komoditas_detail.length === 0" class="list-group-item text-center">
                                No data available for this month
                            </li>
                            <li v-for="commodity in monthData.list_komoditas_detail" :key="commodity.name"
                                class="list-group-item ps-0">
                                <div class="row align-items-center g-3">
                                    <div class="col-auto">
                                        <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                            <div class="text-center">
                                                <CommodityImage :src="getSvgSrc(commodity.name)"
                                                    :altText="commodity.name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <a href="#" class="text-reset fs-14 mb-0">{{ commodity.name }}</a>
                                    </div>
                                    <div class="col-auto">
                                        <span v-if="commodity.status === 'Turun'"
                                            class="fs-12 badge badge-outline-success badge-secondary">
                                            <i class="ri-arrow-down-line"></i> {{ commodity.percentage_change }}%
                                        </span>
                                        <span v-else-if="commodity.status === 'Stabil'"
                                            class="fs-12 badge badge-outline-warning badge-secondary">
                                            <i class="ri-checkbox-blank-circle-line"></i> {{ commodity.percentage_change
                                            }}%
                                        </span>
                                        <span v-else class="fs-12 badge badge-outline-danger badge-danger">
                                            <i class="ri-arrow-up-line"></i> {{ commodity.percentage_change }}%
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div><!-- end card body -->
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import CommodityImage from '../helpers/CommodityImage.vue';
import { getSvgSrc } from '~/helpers/svg.helper';

export default {
    name: 'WatcherCommodityLatestQuarter',
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Object,
            required: true,
            default: {},
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
    },
    data() {
        return {
            monthsData: [],
            monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
        };
    },
    methods: {
        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },
        setDynamicMonths() {
            // Initialize monthsData to hold the data for the last 4 months
            this.monthsData = [];

            let startMonth = this.currentMonth - 1;  // Start from the previous month
            if (startMonth < 0) {
                startMonth = 11;  // December
            }

            for (let i = 0; i < 4; i++) {
                // Calculate the month and year
                const monthIndex = (startMonth - i + 12) % 12;  // Adjust month index
                const year = startMonth - i < 0 ? this.currentYear - 1 : this.currentYear;

                // Use the calculated month index to determine the correct key (data_1_bulan_sebelumnya, etc.)
                const monthKey = `data_${4 - i}_bulan_sebelumnya`;  // Adjusting for correct key
                const data = this.metricData[monthKey] || {}; // Retrieve data for that month from metricData

                // Push the full month data to monthsData, including nama_bulan and tahun
                if (data.nama_bulan && data.tahun) {
                    this.monthsData.push({
                        nama_bulan: data.nama_bulan,
                        tahun: data.tahun,
                        list_komoditas_detail: data.list_komoditas_detail || [],
                    });
                } else {
                    // If no valid data found, just push empty data structure
                    this.monthsData.push({
                        nama_bulan: 'Unknown',
                        tahun: 'Unknown',
                        list_komoditas_detail: [],
                    });
                }
            }

            console.log('month data : ', this.monthsData); // Check how data looks
        },
    },
    watch: {
        metricData(newData) {
            if (newData && Object.keys(newData).length > 0) {
                this.setDynamicMonths();
            } else {
                this.monthsData = 0;
            }
        }
    },
    created() {
        this.setDynamicMonths();
    },
    components: {
        CommodityImage,
    },
}
</script>
<style scoped>
.cardy-box {
    height: 300px;
    min-height: 344px;
    overflow-y: scroll;
    background: #fff;
    border-radius: 0px 0px 3px 3px;
}
</style>