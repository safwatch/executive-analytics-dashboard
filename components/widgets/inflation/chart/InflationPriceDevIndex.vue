<template>
    <div class="col-xl-6">
        <div class="card card-height-100">
            <div class="card-header">
                <h5 class="card-title" v-if="activeIPHTab === 'IPH'">Indeks Perkembangan Harga</h5>
                <h5 class="card-title" v-if="activeIPHTab === 'Komoditas'">Tren Status Komoditas Pekan Terakhir</h5>
                <h5 class="card-title" v-if="activeIPHTab === 'Pasar'">Kenaikan Komoditas Berdasarkan Pasar Pada Akhir
                    Bulan</h5>
                <div class="card-header-action">
                    <div class="card-header-btn">
                        <div data-bs-toggle="tooltip" title="Delete">
                            <a href="javascript:void(0);" class="avatar-text avatar-xs bg-danger"
                                data-bs-toggle="remove"> </a>
                        </div>
                        <div data-bs-toggle="tooltip" title="Refresh">
                            <a href="javascript:void(0);" class="avatar-text avatar-xs bg-warning"
                                data-bs-toggle="refresh"> </a>
                        </div>
                        <div data-bs-toggle="tooltip" title="Maximize/Minimize">
                            <a href="javascript:void(0);" class="avatar-text avatar-xs bg-success"
                                data-bs-toggle="expand"> </a>
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
                            <a href="javascript:void(0);" class="dropdown-item"><i
                                    class="feather-calendar"></i>Event</a>
                            <a href="javascript:void(0);" class="dropdown-item"><i class="feather-bell"></i>Snoozed</a>
                            <a href="javascript:void(0);" class="dropdown-item"><i
                                    class="feather-trash-2"></i>Deleted</a>
                            <div class="dropdown-divider"></div>
                            <a href="javascript:void(0);" class="dropdown-item"><i
                                    class="feather-settings"></i>Settings</a>
                            <a href="javascript:void(0);" class="dropdown-item"><i class="feather-life-buoy"></i>Tips &
                                Tricks</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body pt-3 h-100 px-4">
                <div class="row filter-card d-flex h-100 px-3">
                    <div class="tabs">

                        <!-- IPH tab -->
                        <button type="button"
                            :class="['btn', 'btn-sm', activeIPHTab === 'IPH' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                            @click="activeIPHTab = 'IPH'">
                            IPH
                        </button>

                        <!-- Komoditas tab -->
                        <button type="button"
                            :class="['btn', 'btn-sm', activeIPHTab === 'Komoditas' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                            @click="activeIPHTab = 'Komoditas'">
                            Komoditas
                        </button>

                        <!-- Pasar tab -->
                        <button type="button"
                            :class="['btn', 'btn-sm', activeIPHTab === 'Pasar' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                            @click="activeIPHTab = 'Pasar'">
                            Pasar
                        </button>
                    </div>
                    <div class="tab-content col-xl-12">
                        <!-- IPH content -->
                        <div v-if="activeIPHTab === 'IPH'" class="col-xl-12 px-0">

                            <apexchart :key="chartKey" class="apex-charts" height="500" type="line"
                                :series="IPHDataChart.series" :options="IPHDataChart.chartOptions"></apexchart>
                        </div>
                        <!-- Komoditas content -->
                        <div v-if="activeIPHTab === 'Komoditas'" class="col-xl-12 px-0">
                            <apexchart :key="chartKey2" :series="CommodityDataChart.series"
                                :options="CommodityDataChart.chartOptions" height="500"></apexchart>
                        </div>
                        <!-- Pasar content -->
                        <div v-else-if="activeIPHTab === 'Pasar'" class="col-xl-12 px-0">
                            <apexchart :series="MarketDataChart.series" :options="MarketDataChart.chartOptions"
                                height="500"></apexchart>
                        </div>
                    </div>
                </div><!-- end card body -->
            </div><!-- end card -->
        </div>
    </div>
</template>

<script>
import { payloadHelper } from '~/helpers/payload.helper';
import VueApexCharts from "vue-apexcharts";
import DynamicPopover from '~/components/DynamicPopover.vue';
import { mapState, mapActions } from "vuex";



const dataIPHs = {
    chartOptions: {
        chart: {
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#4fc6e1', '#1abc9c'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth'
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
            title: {
                text: 'Bulan'
            }
        },
        yaxis: {
            title: {
                text: 'Indeks Inflasi'
            },
            min: undefined, // Membiarkan ApexCharts menentukan nilai minimum otomatis
            max: undefined,
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
        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }],
};

const dataComoditys = {
    series: [],
    chartOptions: {
        chart: {
            height: 290,
            type: "line",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: true, // Aktifkan dataLabels
            style: {
                fontSize: "12px", // Ukuran font
                colors: ["#304758"], // Warna teks
            },
            background: {
                enabled: true, // Aktifkan background teks
                foreColor: "#fff", // Warna teks di background
                borderRadius: 2,
                opacity: 0.9,
            },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories: [],
        },
        yaxis: {
            title: {
                text: 'Total Komoditas'
            },
            labels: {
                formatter: function (value) {
                    return "" + value + "";
                },
            },
            tickAmount: 5,
        },
        colors: ["#F06548", "#0AB39C", "#FFC107"],
        fill: {
            // opacity: 0.06,
            colors: ["#F06548", "#0AB39C", "#FFC107"],
            type: "solid",
        },
    },
};

const dataMarkets = {
    series: [],
    chartOptions: {
        chart: {
            height: 290,
            type: "line",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: true, // Aktifkan dataLabels
            style: {
                fontSize: "12px", // Ukuran font
                colors: ["#304758"], // Warna teks
            },
            background: {
                enabled: true, // Aktifkan background teks
                foreColor: "#fff", // Warna teks di background
                borderRadius: 2,
                opacity: 0.9,
            },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories: [],
        },
        yaxis: {
            title: {
                text: 'Total Komoditas'
            },
            labels: {
                formatter: function (value) {
                    return "" + value + "";
                },
            },
            tickAmount: 5,
        },
        colors: ["#F06548", "#0AB39C", "#FFC107"],
        fill: {
            // opacity: 0.06,
            colors: ["#F06548", "#0AB39C", "#FFC107"],
            type: "solid",
        },
    },
};


export default {
    computed: {
        ...mapState('foodProfile', {
            selectedYear: state => state.selectedYear,
            inflationPriceDev: state => state.inflationPriceDev,
            inflationCommodityDev: state => state.inflationCommodityDev,
            inflationMarketDev: state => state.inflationMarketDev,
            inflationPriceDevStatus: state => state.inflationPriceDevStatus,
            inflationCommodityDevStatus: state => state.inflationCommodityDevStatus,
            inflationMarketDevStatus: state => state.inflationMarketDevStatus,

        }),
    },
    watch: {
        selectedYear(newVal) {
            this.fetchDataPrice(this.selectedYear);
        },
        inflationPriceDev(newVal) {
            const result = newVal;
            const categories = result.map(item => item.nama_bulan);
            const seriesData = result.map(item => parseFloat(item.iph));

            // Update data chart
            this.IPHDataChart = {
                ...this.IPHDataChart,
                chartOptions: {
                    ...this.IPHDataChart.chartOptions,
                    xaxis: {
                        ...this.IPHDataChart.chartOptions.xaxis,
                        categories: categories,
                    },
                },
                series: [{
                    ...this.IPHDataChart.series[0],
                    data: seriesData,
                }],
            };

            // Paksa re-render ApexCharts
            this.chartKey += 1;
        },
        inflationPriceDevStatus(newVal) {
            if (newVal === 'failed') {
                const categories = [];
                const seriesData = [];

                // Update data chart
                this.IPHDataChart = {
                    ...this.IPHDataChart,
                    chartOptions: {
                        ...this.IPHDataChart.chartOptions,
                        xaxis: {
                            ...this.IPHDataChart.chartOptions.xaxis,
                            categories: categories,
                        },
                    },
                    series: [{
                        ...this.IPHDataChart.series[0],
                        data: seriesData,
                    }],
                };

                // Paksa re-render ApexCharts
                this.chartKey += 1;
            }

        },

        inflationCommodityDev(newVal) {
            // Proses JSON
            const rawResult = newVal[0];
            const categories = Object.keys(rawResult).sort();

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

            // Update dataComoditys
            this.CommodityDataChart = {
                ...this.CommodityDataChart,
                series: seriesData,
                chartOptions: {
                    ...this.CommodityDataChart.chartOptions,
                    xaxis: { categories },
                },
            };

            // Paksa re-render ApexCharts
            this.chartKey2 += 1;
        },
        inflationCommodityDevStatus(newVal) {
            if (newVal === 'failure') {
                const categories = [];
                const seriesData = [];

                // Update data chart
                this.CommodityDataChart = {
                    ...this.CommodityDataChart,
                    chartOptions: {
                        ...this.CommodityDataChart.chartOptions,
                        xaxis: {
                            ...this.CommodityDataChart.chartOptions.xaxis,
                            categories: categories,
                        },
                    },
                    series: [{
                        ...this.CommodityDataChart.series[0],
                        data: seriesData,
                    }],
                };
                // Paksa re-render ApexCharts
                this.chartKey2 += 1;
            }

        },

        inflationMarketDev(newVal) {
            // Proses JSON
            const rawResult = newVal[0];
            const categories = Object.keys(rawResult).sort();

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

            // Update dataComoditys
            this.MarketDataChart = {
                ...this.MarketDataChart,
                series: seriesData,
                chartOptions: {
                    ...this.MarketDataChart.chartOptions,
                    xaxis: { categories },
                },
            };

            // Paksa re-render ApexCharts
            this.chartKey3 += 1;
        },

        inflationMarketDevStatus(newVal) {
            console.log('inflationMarketDevStatus', newVal)
            if (newVal === 'failure') {
                const categories = [];
                const seriesData = [];

                // Update data chart
                this.MarketDataChart = {
                    ...this.MarketDataChart,
                    chartOptions: {
                        ...this.MarketDataChart.chartOptions,
                        xaxis: {
                            ...this.MarketDataChart.chartOptions.xaxis,
                            categories: categories,
                        },
                    },
                    series: [{
                        ...this.MarketDataChart.series[0],
                        data: seriesData,
                    }],
                };
                // Paksa re-render ApexCharts
                this.chartKey3 += 1;
            }

        },
    },
    components: {
        DynamicPopover,
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            chartKey: 0,
            chartKey2: 0,
            chartKey3: 0,
            isLoading: true,
            dataResult: {},
            activeIPHTab: 'IPH',
            IPHDataChart: dataIPHs,
            CommodityDataChart: dataComoditys,
            MarketDataChart: dataMarkets,
        }
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchDataPrice(this.selectedYear).then(() => {
                    this.isLoading = false;
                });

                this.fetchDataCommodity(this.selectedYear).then(() => {
                    this.isLoading = false;
                });

                this.fetchDataMarket(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            }
        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },

        ...mapActions('foodProfile', ['fetchDataCommodity', 'fetchDataPrice', 'fetchDataMarket']),
    },
}
</script>