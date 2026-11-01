<template>
    <div class="row">
        <div class="col-xl-12 pt-5">
            <div v-if="!isLoadingChart" class="card card-height-100">
                <div class="card-header align-items-center d-flex border-bottom bg-white">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="card-body pt-3 h-100 px-4">
                    <div class="row filter-card d-flex flex-row-reverse px-2">
                        <div class="tabs d-flex gap-2">
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                        </div>
                        <div class="tab-content col-xl-12">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'" :borderRadius="'8px'" />
                        </div>
                    </div><!-- end card body -->
                </div><!-- end card -->
            </div>
            <div v-else class="card card-height-100">
                <div class="card-header align-items-center d-flex border-bottom bg-white">
                    <h4 class="card-title mb-0 flex-grow-1 text-muted">Komoditas</h4>
                    <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                        <a href="javascript:void(0);" id="tren-rerata-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="tren-rerata-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Komoditas
                            </template>
                            <div>
                                Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                                periode satu tahun. Ini
                                adalah cara untuk
                                menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan
                                indeks harga
                                konsumen (CPI) atau
                                indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan
                                atau kuartal yang sama
                                pada tahun
                                sebelumnya.
                            </div>
                        </b-popover>
                    </div>
                </div>
                <!-- card body -->
                <div class="card-body pt-3">
                    <div class="row filter-card d-flex flex-row-reverse">
                        <div class="tabs pr-4">
                            <!-- Tahun lalu tab -->
                            <button type="button"
                                :class="['btn', 'btn-sm', commodityActiveTab === 'Satuan' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="commodityActiveTab = 'Satuan'">
                                Status Komoditas
                            </button>

                            <!-- Bulan tab -->
                            <button type="button"
                                :class="['btn', 'btn-sm', commodityActiveTab === 'All' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="commodityActiveTab = 'All'">
                                Komoditas
                            </button>
                        </div>
                        <div class="tab-content col-xl-12">
                            <!-- Tahun lalu content -->
                            <div v-if="commodityActiveTab === 'Satuan'" class="col-xl-12 px-0">
                                <apexchart :key="chartKey" :series="commodityLineAreaChart.series"
                                    :options="commodityLineAreaChart.chartOptions" height="290"></apexchart>
                            </div>
                            <!-- Bulan content -->
                            <div v-else-if="commodityActiveTab === 'All'" class="col-xl-12 px-0">
                                <p>Komoditas</p>
                                <div class="card-danger bg-transparent">
                                    <apexchart :key="chartKey2" :series="commodityLineChart.series"
                                        :options="commodityLineChart.chartOptions" height="290"></apexchart>
                                </div>
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div><!-- end card -->
                <!-- end card body -->
            </div><!-- end card -->
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";

const dataStatCommodity = {
    series: [],
    chartOptions: {
        chart: {
            height: 290,
            type: "area",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories: [],
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return "Rp." + value + "k";
                },
            },
            tickAmount: 5,
        },
        colors: ["#F06548", "#0AB39C", "#FFC107"],
        fill: {
            opacity: 0.06,
            colors: ["#F06548", "#0AB39C", "#FFC107"],
            type: "solid",
        },
    },
};

const dataCommodity = {
    chartOptions: {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
        },
        colors: ['#4fc6e1', '#1abc9c'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            // width: [3, 3],
            // curve: 'smooth'
        },
        title: {
            text: '',
            align: 'left',
            style: {
                fontSize: '14px',
                color: '#666'
            }
        },
        labels: {
            formatter: function (value) {
                return value.toFixed(3).replace('.', ','); // Mengubah titik menjadi koma
            }
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2
            },
            borderColor: '#f1f3fa'
        },
        markers: {
            style: 'inverted',
            size: 6
        },
        xaxis: {
            categories: [],
            title: {
                text: 'Tanggal'
            }
        },
        yaxis: {
            title: {
                text: 'Harga'
            },
            tickAmount: 5,
            labels: {
                formatter: function (value) {
                    return parseFloat(value.toFixed(3)); // Menghilangkan trailing zero
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
            }
        }]
    },
    series: [{
        name: 'Indeks Inflasi',
        data: []
    }],
};


export default {
    computed: {
        ...mapState('foodCommodity', {
            selectedYear: state => state.selectedYear,
            inflationCommodityWeek: state => state.inflationCommodityWeek,
            inflationCommodityWeekStatus: state => state.inflationCommodityWeekStatus,
            inflationCommodity: state => state.inflationCommodity,
            inflationCommodityStatus: state => state.inflationCommodityStatus
        }),
    },
    watch: {
        selectedYear(newVal) {
            // this.fetchDataPrice(this.selectedYear);
        },

        inflationCommodityWeek(newVal) {
            const rawResult = newVal[0];
            const categories = Object.keys(rawResult).sort();

            // console.log('inflationCommodityWeekStatus', newVal);

            const seriesData = [
                {
                    name: "Naik",
                    data: categories.map((date) => rawResult[date].naik),
                },
                {
                    name: "Turun",
                    data: categories.map((date) => rawResult[date].turun),
                },
                {
                    name: "Stabil",
                    data: categories.map((date) => rawResult[date].stabil),
                },
            ];

            // Update commodityLineAreaChart
            this.commodityLineAreaChart = {
                ...this.commodityLineAreaChart,
                series: seriesData,
                chartOptions: {
                    ...this.commodityLineAreaChart.chartOptions,
                    xaxis: { categories },
                },
            };
        },

        inflationCommodityWeekStatus(newVal) {
            if (newVal === 'failure') {
                let categories = [];
                let seriesData = [];
                console.log('inflationCommodityWeekStatus', newVal);
                this.commodityLineAreaChart = {
                    ...this.commodityLineAreaChart,
                    chartOptions: {
                        ...this.commodityLineAreaChart.chartOptions,
                        xaxis: {
                            ...this.commodityLineAreaChart.chartOptions.xaxis,
                            categories: categories,
                        },
                    },
                    series: [{
                        ...this.commodityLineAreaChart.series[0],
                        data: seriesData,
                    }],
                };

                // Paksa re-render ApexCharts
                this.chartKey += 1;

            }
        },

        inflationCommodity(newVal) {
            const result = newVal;
            const categories = result.map(item => item.tanggal);
            const seriesData = result.map(item => parseFloat(item.price_today));

            // Update data chart
            this.commodityLineChart = {
                ...this.commodityLineChart,
                chartOptions: {
                    ...this.commodityLineChart.chartOptions,
                    xaxis: {
                        ...this.commodityLineChart.chartOptions.xaxis,
                        categories: categories,
                    },
                },
                series: [{
                    ...this.commodityLineChart.series[0],
                    data: seriesData,
                }],
            };

            // Paksa re-render ApexCharts
            this.chartKey2 += 1;
        },

        inflationCommodityStatus(newVal) {
            if (newVal === 'failed') {
                const categories = [];
                const seriesData = [];

                // Update data chart
                this.commodityLineChart = {
                    ...this.commodityLineChart,
                    chartOptions: {
                        ...this.commodityLineChart.chartOptions,
                        xaxis: {
                            ...this.commodityLineChart.chartOptions.xaxis,
                            categories: categories,
                        },
                    },
                    series: [{
                        ...this.commodityLineChart.series[0],
                        data: seriesData,
                    }],
                };

                // Paksa re-render ApexCharts
                this.chartKey += 1;
            }

        },
    },
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    mounted() {
        this.fetchDataCommoditiesWeek({ commodityId: '121' }).then(() => {
            this.isLoading = false;
        });

        this.fetchDataCommodities({ commodityId: '121' }).then(() => {
            this.isLoading = false;
        });
    },
    data() {
        return {
            commodityActiveTab: 'Satuan',
            commodityLineAreaChart: dataStatCommodity,
            commodityLineChart: dataCommodity,
            isLoading: false,
            isLoadingChart: false,
            chartKey: 1,
            chartKey2: 1
        };
    },
    methods: {
        ...mapActions('foodCommodity', ['fetchDataCommoditiesWeek', 'fetchDataCommodities']),
    },
}

</script>