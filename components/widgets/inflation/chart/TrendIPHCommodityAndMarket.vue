<template>
    <!-- shimmer -->
    <div v-if="isTabLoading || !iphDataChart" class="card card-height-100">
        <div class="card-header">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pt-3 h-100 px-4">
            <div class="row filter-card d-flex px-3">
                <div class="tabs d-flex gap-2">
                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                </div>
                <div class="tab-content col-xl-12">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'" :borderRadius="'8px'" />
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>
    <!-- end of shimmer -->
    <div v-else class="card card-height-100 card-change">
        <div class="card-header">
            <h5 class="card-title" v-if="activeIPHTab === 'IPH'">Indeks Perkembangan Harga</h5>
            <h5 class="card-title" v-if="activeIPHTab === 'Komoditas'">Tren Status Komoditas Pekan Terakhir</h5>
            <h5 class="card-title" v-if="activeIPHTab === 'Pasar'">Kenaikan Komoditas Berdasarkan Pasar Pada Akhir
                Bulan</h5>
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
                        <apexchart :key="chartKey" class="apex-charts" height="500" type="line" :series="IPHDataChartSeries"
                            :options="IPHDataChartOptions"></apexchart>
                    </div>
                    <!-- Komoditas content -->
                    <div v-if="activeIPHTab === 'Komoditas'" class="col-xl-12 px-0">
                        <apexchart :key="chartKey2" :series="CommodityDataChartSeries" :options="CommodityDataChartOptions" height="500">
                        </apexchart>
                    </div>
                    <!-- Pasar content -->
                    <div v-else-if="activeIPHTab === 'Pasar'" class="col-xl-12 px-0">
                        <apexchart :series="MarketDataChartSeries" :options="MarketDataChartOptions" height="500">
                        </apexchart>
                    </div>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>
</template>

<script>
export default {
    props: {
        isTabLoading: {
            type: Boolean,
            required: true
        },
        iphDataChart: {
            type: [Array, Object],
            required: true,
            default: () => ({})
        },
        iphDataChartStatus: {
            type: String,
            required: true,
            default: ""
        },
        CommodityChangeChart: {
            type: Array,
            required: true,
            default: () => [],
        },
        aggCommodityChangeStatus: {
            type: String,
            required: true,
            default: ""
        },
        MarketPriceChangeChart: {
            type: [Array, Object],
            required: true,
            default: () => ({})
        },
        aggMarketPriceChangeStatus: {
            type: String,
            required: true,
            default: ""
        },
    },
    watch: {
        // watch props that passed down
        iphDataChart: {
            immediate: true,
            handler(newVal) {
                this.updateIPHChartData(newVal);
                this.chartKey += 1;
            }
        },


        CommodityChangeChart: {
            immediate: true,
            handler(newVal) {
                this.updateCommodityChartData(newVal);
                this.chartKey += 2;
            }
        },
        MarketPriceChangeChart: {
            immediate: true,
            handler(newVal) {
                this.updateMarketPriceChartData(newVal);
            }
        },
    },
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            chartKey: 0,
            chartKey2: 0,
            chartKey3: 0,
            activeIPHTab: 'IPH',
            IPHDataChartSeries: [],
            IPHDataChartOptions: {},
            CommodityDataChartSeries: [],
            CommodityDataChartOptions: {},
            MarketDataChartSeries: [],
            MarketDataChartOptions: {},
        }
    },
    methods: {
        updateIPHChartData(data) {
            const seriesData = data.map(item => {
                if (item.iph != null && item.iph !== '') {
                    return parseFloat(item.iph);
                } else {
                    return 0;
                }
            });
            if (Array.isArray(data)) {
                console.log('iph data', data);

                this.IPHDataChartSeries = [{
                    name: 'Indeks Perkembangan Harga',
                    data: data.map(item => parseFloat(item.iph) || 0) // Handle NaN
                }];

                this.IPHDataChartOptions = {
                    chart: {
                        height: 500,
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
                        categories: data.map(item => `${item.nama_bulan} ${item.tahun}`), // Format month-year
                        title: {
                            text: 'Bulan'
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Index Perkembangan Harga'
                        },
                        min: Math.min(...seriesData) - 1,
                        max: Math.max(...seriesData) + 1,
                        tickAmount: 5,
                        labels: {
                            formatter: function (value) {
                                return parseFloat(value.toFixed(3)); // Menghilangkan trailing zero
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                                const month = dataPointIndex >= 0 ? data[dataPointIndex].nama_bulan : ''; // Get the month for the hovered point

                                // Check if the value is 0, null or NaN and return 'No data' if so
                                if (value === 0 || value === null || isNaN(value)) {
                                    return `<span class="badge badge-outline-danger badge-primary"> No data </span>`;
                                }

                                return `<span class="badge badge-outline-primary badge-primary"> ${value.toFixed(2)}%</span>`;
                            }
                        },
                        x: {
                            formatter: function (value, { dataPointIndex }) {
                                const month = data[dataPointIndex].nama_bulan;
                                const year = data[dataPointIndex].tahun;
                                const fullMonth = `${month} - ${year}`;
                                return toTitleCase(fullMonth); // Convert month and year to title case
                            }
                        },
                        marker: {
                            show: true
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
                };
            }
        },


        updateCommodityChartData(data) {
            // Prepare categories (dates)
            const categories = data.map(item => formatDateToIndonesian(item.date));

            // Prepare the series data for naik, turun, and stabil, ensuring no NaN values
            const naikData = data.map(item => {
                return item.naik !== null && !isNaN(item.naik) ? parseFloat(item.naik) : 0; // Ensure valid number
            });
            const turunData = data.map(item => {
                return item.turun !== null && !isNaN(item.turun) ? parseFloat(item.turun) : 0; // Ensure valid number
            });
            const stabilData = data.map(item => {
                return item.stabil !== null && !isNaN(item.stabil) ? parseFloat(item.stabil) : 0; // Ensure valid number
            });

            // Check if all values are valid, if not log or handle the error
            if (naikData.includes(NaN) || turunData.includes(NaN) || stabilData.includes(NaN)) {
                console.error('Invalid data detected, please check input values.');
            }

            // Set chart series with the prepared data
            this.CommodityDataChartSeries = [
                {
                    name: 'Naik',
                    data: naikData,
                },
                {
                    name: 'Turun',
                    data: turunData,
                },
                {
                    name: 'Stabil',
                    data: stabilData,
                },
            ];


            this.CommodityDataChartOptions = {
                chart: {
                    height: 500,
                    type: "line",
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "12px",
                        colors: ["#304758"],
                    },
                    background: {
                        enabled: true,
                        foreColor: "#fff",
                        borderRadius: 2,
                        opacity: 0.9,
                    },
                },
                stroke: {
                    curve: "smooth",
                    width: 2,
                },
                xaxis: {
                    categories: categories, // Set categories (dates) on the x-axis
                },
                yaxis: {
                    title: {
                        text: 'Total Komoditas',
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
                    colors: ["#F06548", "#0AB39C", "#FFC107"],
                    type: "solid",
                },

            }
        },

        updateMarketPriceChartData(data) {
            // Prepare categories (markets) for the x-axis
            const categories = data.map(item => item.market);

            // Prepare the series data for naik, turun, and stabil, ensuring no NaN values
            const naikData = data.map(item => {
                return item.naik !== null && !isNaN(item.naik) ? parseFloat(item.naik) : 0; // Ensure valid number
            });
            const turunData = data.map(item => {
                return item.turun !== null && !isNaN(item.turun) ? parseFloat(item.turun) : 0; // Ensure valid number
            });
            const stabilData = data.map(item => {
                return item.stabil !== null && !isNaN(item.stabil) ? parseFloat(item.stabil) : 0; // Ensure valid number
            });

            // Check if all values are valid, if not log or handle the error
            if (naikData.includes(NaN) || turunData.includes(NaN) || stabilData.includes(NaN)) {
                console.error('Invalid data detected, please check input values.');
            }

            // Set the chart series with the prepared data
            this.MarketDataChartSeries = [
                {
                    name: 'Naik',
                    data: naikData,
                },
                {
                    name: 'Turun',
                    data: turunData,
                },
                {
                    name: 'Stabil',
                    data: stabilData,
                },
            ];

            // Set chart options with the prepared categories
            this.MarketDataChartOptions = {
                chart: {
                    height: 500,
                    type: "line",
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "12px", // Font size
                        colors: ["#304758"], // Text color
                    },
                    background: {
                        enabled: true,
                        foreColor: "#fff", // Text color in background
                        borderRadius: 2,
                        opacity: 0.9,
                    },
                },
                stroke: {
                    curve: "smooth",
                    width: 2,
                },
                xaxis: {
                    categories: categories, // Set the x-axis categories (markets)
                },
                yaxis: {
                    title: {
                        text: 'Total Komoditas',
                    },
                    labels: {
                        formatter: function (value) {
                            return "" + value + ""; // No decimal point for y-axis
                        },
                    },
                    tickAmount: 5,
                },
                colors: ["#F06548", "#0AB39C", "#FFC107"], // Series colors
                fill: {
                    colors: ["#F06548", "#0AB39C", "#FFC107"], // Fill colors
                    type: "solid",
                },
            };
        }
    },
}
// Utility function to format date to "dd MMM yyyy" (e.g., "19 Januari 2025")
function formatDateToIndonesian(dateString) {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero
    const month = months[date.getMonth()]; // Get month name in Indonesian
    const year = date.getFullYear(); // Get the full year

    return `${day} ${month} ${year}`;
}

// Helper function to convert string to title case
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
</script>