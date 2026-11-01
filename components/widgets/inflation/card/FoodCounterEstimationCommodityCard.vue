<template>
    <div v-if="isMetricLoading || !metricData" class="card stretch stretch-full">
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
    <div v-else class="card stretch stretch-full card-change bg-white">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Pantauan Harga Komoditas Berdasarkan Bulan <span class="badge badge-outline-primary badge-secondary">{{ `${metricData.nama_bulan}  -  ${year}` }}</span></h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="target-vs-realisasi-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="target-vs-realisasi-popover" triggers="hover" placement="right"
                    custom-class="custom-popover">
                    <template v-slot:title>
                        Pantauan Harga Komoditas Berdasarkan Bulan
                    </template>
                    <div>
                        Pemantauan komoditas selama bulan terakhir menunjukkan perubahan harga di mana beberapa komoditas mengalami kenaikan harga, penurunan harga, sementara yang lain menunjukkan stabilitas harga berdasarkan data e-pasar
                    </div>
                </b-popover>
            </div>
        </div><!-- end card header -->
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
                        <h4 class="fs-30 counter">{{ metricData.komoditas_naik }}</h4>
                        <h2 class="fs-13 tx-spacing-1">Komoditas Naik</h2>
                    </div>
                </div>
                <div class="col-sm-4 d-flex pb-3">
                    <div
                        class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded">
                        <div class="avatar-text bg-gray-200 mx-auto mb-2">
                            <i class="feather-check-circle"></i>
                        </div>
                        <h4 class="fs-30 counter">{{ metricData.komoditas_turun }}
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
                        <h4 class="fs-30 counter">{{ metricData.komoditas_stabil }}
                        </h4>
                        <h2 class="fs-13 tx-spacing-1">Komoditas Tetap</h2>
                    </div>
                </div>

            </div>


        </div>
        <div class="card-footer">
            <a href="#laporan" class="btn btn-primary w-100">Lihat Laporan</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'FoodCounterEstimationCommodityCard',
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
    watch: {
        metricData: {
            handler(newValue) {
                // Ensure the metricData has the necessary properties before updating the chart
                if (this.metricData && typeof this.metricData.persen_naik !== 'undefined') {
                    this.series = [this.metricData.persen_naik];
                    console.log('metric data, handler');
                }
            },
            immediate: true
        }
    },
    components: {
        apexchart1: () => import("vue-apexcharts"),
    },
    computed: {
        ...mapGetters('foodProfile',{
            year: 'getYear' 
        }),
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
                    height: 350,
                    type: 'radialBar',
                    toolbar: {
                        show: false,
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
                labels: ['Persentase Naik'],
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
}
</script>
<style>
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

.commodity-info .apexcharts-menu.apexcharts-menu-open {
    min-width: 120px;
}
</style>