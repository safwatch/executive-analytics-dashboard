<template>
    <div class="row" v-if="isLoading">
        <!-- shimmer -->

        <div class="col-xl-12">
            <div class="card stretch stretch-full">
                <div class="card-header">
                    <SieShimmer :shape="'rectangle'" :width="'25%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="card-body custom-card-action">
                    <div class="card-body pt-3">
                        <div class="row filter-card d-flex">
                            <div class="card-body pt-3 h-100 px-0">
                                <div class="row filter-card d-flex px-3">
                                    <div class="tabs d-flex gap-2">
                                        <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'"
                                            :borderRadius="'8px'" />
                                        <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                    <div class="tab-content col-xl-12">
                                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
            </div>
        </div>

        <!-- end of shimmer -->
    </div>
    <div class="row" v-else>
        <div class="col-xl-12">
            <div class="card stretch stretch-full card-danger bg-transparent">
                <div class="card-header">
                    <h5 class="card-title">Treemap Komoditas</h5>
                </div>
                <div class="card-body custom-card-action">
                    <div class="card-body pt-3">
                        <div class="row filter-card d-flex">
                            <div class="tabs">

                                <!-- IPH tab -->
                                <button type="button"
                                    :class="['btn', 'btn-sm', activeCommodityTreemapTab === 'Inflasi' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                    @click="activeCommodityTreemapTab = 'Inflasi'">
                                    Inflasi
                                </button>

                                <!-- Komoditas tab -->
                                <button type="button"
                                    :class="['btn', 'btn-sm', activeCommodityTreemapTab === 'Deflasi' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                    @click="activeCommodityTreemapTab = 'Deflasi'">
                                    Deflasi
                                </button>
                            </div>
                            <div class="tab-content col-xl-12">
                                <!-- IPH content -->
                                <div v-if="activeCommodityTreemapTab === 'Inflasi'" class="col-xl-12 px-0">
                                    <apexchart :key="chartKey" :options="treemapInflasichartOptions.chartOptions"
                                        :series="treemapInflasichartOptions.series" height="550">
                                    </apexchart>
                                </div>
                                <!-- Komoditas content -->
                                <div v-if="activeCommodityTreemapTab === 'Deflasi'" class="col-xl-12 px-0">
                                    <apexchart :key="chartKey2" :options="treemapDeflasichartOptions.chartOptions"
                                        :series="treemapDeflasichartOptions.series" height="550">
                                    </apexchart>
                                </div>
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import { mapState, mapActions } from "vuex";


const dataTreemapInflasi = {
    series: [
        {
            data: [],
        },
    ],
    chartOptions: {
        chart: {
            height: 550,
            type: 'treemap',
        },
        title: {
            text: '',
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
            },
            formatter: function (text, op) {
                return [text, op.value] + " %";
            },
            offsetY: -4,
        },
        plotOptions: {
            treemap: {
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                    ranges: [
                        {
                            from: -6,
                            to: 0,
                            color: '#52B12C',
                        },
                        {
                            from: 0.001,
                            to: 600,
                            color: '#CD363A',
                        },
                    ],
                },
            },
        },
    }
}
const dataTreemapDeflasi = {
    series: [
        {
            data: [],
        },
    ],
    chartOptions: {
        chart: {
            height: 550,
            type: 'treemap',
        },
        title: {
            text: '',
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
            },
            formatter: function (text, op) {
                return [text, op.value] + " %";
            },
            offsetY: -4,
        },
        plotOptions: {
            treemap: {
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                    ranges: [
                        {
                            from: -200,
                            to: 0,
                            color: '#52B12C',
                        },
                        {
                            from: 0.001,
                            to: 6,
                            color: '#CD363A',
                        },
                    ],
                },
            },
        },
    }
}

export default {
    name: 'InflationTreeMap',
    computed: {
        ...mapState('foodProfile', {
            selectedYear: state => state.selectedYear,
            inflationTreeMapDataInflasi: state => state.inflationTreeMapInflasi,
            inflationTreeMapDataDeflasi: state => state.inflationTreeMapDeflasi,
            inflationTreeMapStatus: state => state.inflationTreeMapStatus,
        }),
    },
    watch: {
        selectedYear(newVal) {
            this.fetchDataMapInflation({ yearObject: newVal, type: 'inflasi' }).then(() => {
                this.isLoading = false;
                this.chartKey += 1;
            });
            this.fetchDataMapInflation({ yearObject: newVal, type: 'deflasi' }).then(() => {
                this.isLoading = false;
                this.chartKey2 += 1;

            });
        },
        inflationTreeMapDataInflasi(newVal) {
            if (newVal) {
                // Transformasi data dari newVal.result ke format yang diinginkan
                const updatedData = newVal.map(item => ({
                    x: item.name, // Ambil nama sebagai x
                    y: item.percentage_change, // Ambil percentage_change sebagai y
                }));

                // Perbarui series pada dataTreemapInflasi
                this.treemapInflasichartOptions.series[0].data = updatedData;

                // Debugging log untuk memastikan data sudah ter-update
                // console.log('Updated dataTreemapInflasi series:', this.treemapInflasichartOptions.series[0].data);
            } else {
                console.error('Data baru tidak valid:', newVal);
            }

            // Paksa re-render ApexCharts
            this.chartKey += 1;
        },
        inflationTreeMapDataDeflasi(newVal) {
            if (newVal) {
                // Transformasi data dari newVal.result ke format yang diinginkan
                const updatedData = newVal.map(item => ({
                    x: item.name, // Ambil nama sebagai x
                    y: item.percentage_change, // Ambil percentage_change sebagai y
                }));

                // Perbarui series pada dataTreemapInflasi
                this.treemapDeflasichartOptions.series[0].data = updatedData;

                // Debugging log untuk memastikan data sudah ter-update
                // console.log('Updated dataTreemapDeflasi series:', this.treemapDeflasichartOptions.series[0].data);
            } else {
                console.error('Data baru tidak valid:', newVal);
            }
            this.chartKey2 += 1;
            // console.log('IPHDataChart ::', this.IPHDataChart.series[0].data);
        },

        inflationTreeMapStatus(newVal) {
            console.log('watcher inflationTreeMapStatus', newVal);
            if (newVal === 'failed') {
                // Perbarui series pada dataTreemapInflasi
                this.treemapDeflasichartOptions.series[0].data = [];
                this.treemapInflasichartOptions.series[0].data = [];
                this.chartKey += 1;
                this.chartKey2 += 1;

            }
        },
    },
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            // treemap
            treemapInflasichartOptions: dataTreemapInflasi,
            treemapDeflasichartOptions: dataTreemapDeflasi,
            activeCommodityTreemapTab: 'Inflasi',
            chartKey: 0,
            chartKey2: 0,

            isLoading: false,
        }
    },
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    mounted() {
        this.fetchDataMapInflation({ yearObject: this.selectedYear, type: 'inflasi' }).then(() => {
            this.isLoading = false;
        });
        this.fetchDataMapInflation({ yearObject: this.selectedYear, type: 'deflasi' }).then(() => {
            this.isLoading = false;
        });
    },
    methods: {
        ...mapActions('foodProfile', ['fetchDataMapInflation']),

    }
}
</script>