<template>
    <div v-if="isLoading" class="card stretch stretch-full">
        <div class="card-header">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body custom-card-action">
            <div class="text-center mb-4 d-flex justify-content-center">
                <SieShimmer :shape="'circle'" :width="'250px'" :height="'250px'" :borderRadius="'8px'" />
            </div>
            <div class="row g-4 commodity-info">
                <div class="col-sm-4 d-flex pb-4">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'150px'" :borderRadius="'8px'" />
                </div>
                <div class="col-sm-4 d-flex pb-4">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'150px'" :borderRadius="'8px'" />
                </div>
                <div class="col-sm-4 d-flex pb-4">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'150px'" :borderRadius="'8px'" />
                </div>
            </div>


        </div>
        <div class="card-footer">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'30px'" :borderRadius="'8px'" />
        </div>
    </div>
    <div v-else class="card stretch stretch-full">
        <div class="card-header">
            <h5 class="card-title">Total Komoditas Inflasi</h5>
            <div class="card-header-action">
                <div class="card-header-btn">
                    <div data-bs-toggle="tooltip" title="Delete">
                        <a href="javascript:void(0);" class="avatar-text avatar-xs bg-danger" data-bs-toggle="remove">
                        </a>
                    </div>
                    <div data-bs-toggle="tooltip" title="Refresh">
                        <a href="javascript:void(0);" class="avatar-text avatar-xs bg-warning" data-bs-toggle="refresh">
                        </a>
                    </div>
                    <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                        <a href="javascript:void(0);" class="avatar-text avatar-xs bg-success" data-bs-toggle="expand">
                        </a>
                    </div>
                </div>
                <div class="dropdown">
                    <a href="javascript:void(0);" class="avatar-text avatar-sm" data-bs-toggle="dropdown"
                        data-bs-offset="25, 25">
                        <div data-bs-toggle="tooltip" title="Options">
                            <i class="feather-more-vertical"></i>
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" class="dropdown-item"><i class="feather-at-sign"></i>New</a>
                        <a href="javascript:void(0);" class="dropdown-item"><i class="feather-calendar"></i>Event</a>
                        <a href="javascript:void(0);" class="dropdown-item"><i class="feather-bell"></i>Snoozed</a>
                        <a href="javascript:void(0);" class="dropdown-item"><i class="feather-trash-2"></i>Deleted</a>
                        <div class="dropdown-divider"></div>
                        <a href="javascript:void(0);" class="dropdown-item"><i class="feather-settings"></i>Settings</a>
                        <a href="javascript:void(0);" class="dropdown-item"><i class="feather-life-buoy"></i>Tips &
                            Tricks</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body custom-card-action">
            <div class="text-center mb-0">
                <apexchart1 :options="goalProgressChartOptions" :series="series" height="350">
                </apexchart1>
            </div>
            <div class="row g-4 commodity-info">
                <div class="col-sm-4 d-flex pb-3">
                    <div
                        class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded">
                        <div class="avatar-text bg-gray-200 mx-auto mb-2">
                            <i class="feather-activity"></i>
                        </div>
                        <h4 class="fs-30 counter">{{ inflationCommodityGaugeData?.[0]?.komoditas_naik || '0' }}</h4>
                        <h2 class="fs-13 tx-spacing-1">Komoditas Naik</h2>
                    </div>
                </div>
                <div class="col-sm-4 d-flex pb-3">
                    <div
                        class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded">
                        <div class="avatar-text bg-gray-200 mx-auto mb-2">
                            <i class="feather-check-circle"></i>
                        </div>
                        <h4 class="fs-30 counter">{{ inflationCommodityGaugeData?.[0]?.komoditas_turun || '0' }}
                        </h4>
                        <h2 class="fs-13 tx-spacing-1">Komoditas Turun</h2>
                    </div>
                </div>
                <div class="col-sm-4 d-flex pb-3">
                    <div
                        class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded">
                        <div class="avatar-text bg-gray-200 mx-auto mb-2">
                            <i class="feather-users"></i>
                        </div>
                        <h4 class="fs-30 counter">{{ inflationCommodityGaugeData?.[0]?.komoditas_stabil || '0' }}
                        </h4>
                        <h2 class="fs-13 tx-spacing-1">Komoditas Tetap</h2>
                    </div>
                </div>

                <!-- <div class="col-sm-6 d-flex pb-4">
                        <div
                            class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded">
                            <div class="avatar-text bg-gray-200 mx-auto mb-2">
                                <i class="feather-dollar-sign"></i>
                            </div>
                            <h4 class="fs-30 counter">0</h4>
                            <h2 class="fs-13 tx-spacing-1">Komoditas Inflasi</h2>
                        </div>
                    </div> -->
            </div>


        </div>
        <div class="card-footer">
            <a href="#laporan" class="btn btn-primary w-100">Lihat Laporan</a>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: 'CountCommodityInflationCard',
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        ...mapState('foodProfile', {
            selectedYear: state => state.selectedYear,
            inflationGauge: state => state.inflationGauge,
            // inflationPriceDevStatus: state => state.inflationPriceDevStatus,
        }),
    },
    watch: {
        selectedYear(newVal) {
            this.fetchDataGaugeInflation(newVal).then(() => {
                this.isLoading = false;
            });
        },
        inflationGauge(newVal) {
            this.inflationCommodityGaugeData = newVal;
            this.series = [newVal[0].total_komoditas];

        },
    },
    components: {
        apexchart1: () => import("vue-apexcharts"),
    },
    data() {
        return {
            isLoading: true,
            commodityData: {},
            inflationCommodityGaugeData: '',

            // goal progress
            series: [0],
            goalProgressChartOptions: {
                chart: {
                    height: 350, // Set the height
                    type: 'radialBar',
                    toolbar: {
                        show: true, // Show the toolbar
                    },
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 225,
                        hollow: {
                            margin: 0,
                            size: '70%',
                            background: '#fff',
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24,
                            },
                        },
                        track: {
                            background: '#fff',
                            strokeWidth: '67%',
                            margin: 0, // Margin in pixels
                            dropShadow: {
                                enabled: true,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: 0.35,
                            },
                        },
                        dataLabels: {
                            show: true,
                            name: {
                                offsetY: -10,
                                show: true,
                                color: '#888',
                                fontSize: '17px',
                            },
                            value: {
                                formatter: function (val) {
                                    return parseInt(val) + "%";
                                },
                                color: '#111',
                                fontSize: '36px',
                                show: true,
                            },
                        },
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#ABE5A1'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100],
                    },
                },
                stroke: {
                    lineCap: 'round',
                },
                labels: ['Persentase'],
                tooltip: {
                    enabled: true,
                    shared: false,
                    custom: function ({ seriesIndex, dataPointIndex, w }) {
                        const percentage = w.config.series[seriesIndex]; // Access the single value in series
                        const description = 'Komoditas Mengalami Kenaikan Harga'; // Your custom description text

                        console.log('Tooltip - percentage:', percentage); // Debugging line to check the value of percentage

                        return `<div class="apexcharts-tooltip-title" style="font-size:12px"> 
                        <span style="color: #fff;">${description}</span><br />
                        <span>Persentase: ${percentage}%</span>
                    </div>`;
                    },
                    style: {
                        fontSize: '11px',
                        color: '#fff',
                    },
                    theme: 'dark', // Customize the tooltip theme
                },
            },
        }
    },
    mounted() {
        this.fetchDataGaugeInflation({
            yearObject: '2024',
        }).then(() => {
            // this.isLoading = false;
        });
    },
    methods: {
        ...mapActions('foodProfile', ['fetchDataGaugeInflation']),

    },
}
</script>
<style scoped>
.commodity-info h4.counter {
    line-height: 50px;
    color: white;
    background: -webkit-linear-gradient(337deg, #4fc6e1 0%, #4fc6e1 19.37%, #1abc9c 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    padding: 0 2px;
}

.commodity-info>div:first-child h4.counter {
    background: -webkit-linear-gradient(337deg, #F66451 0%, #F66451 19.37%, #b22010 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}

.commodity-info>div:last-child h4.counter {
    background: -webkit-linear-gradient(337deg, #FEC95F 0%, #FEC95F 19.37%, #a06e0b 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}
</style>