<template>
    <!-- shimmer -->
    <div v-if="isLoading" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pt-3 h-100 px-4">
            <div class="row filter-card d-flex flex-row-reverse px-2">
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
    <div v-else class="card card-height-100 card-danger">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Tren IPH berdasarkan tahun</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="tren-rerata-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="tren-rerata-popover" triggers="hover" placement="right"
                    custom-class="custom-popover">
                    <template v-slot:title>
                        Tren IPH berdasarkan tahun
                    </template>
                    <div>
                        Tren Indeks Perkembangan Harga berdasarkan 3 tahun terakhir, untuk memantau tren dan menunjukkan bagaimana indeks harga bergerak (meningkat, menurun, atau stabil) selama tiga tahun terakhir.
                    </div>
                </b-popover>
            </div>
        </div>
        <div class="card-body pt-3">
            <apexchart type="line" height="350" :options="linewithDataChart2.chartOptions"
                :series="linewithDataChart2.series">
            </apexchart>
        </div>
    </div>
</template>

<script>
import { payloadHelper } from '~/helpers/payload.helper';

const data2 = {
    series: [],
    chartOptions: {
        chart: {
            type: 'line',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: '',
            align: 'left'
        },
        xaxis: {
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni',
                'Juli', 'Agu', 'Sep', 'Okt', 'Nov', 'Des' 
            ],
            labels: {
                rotate: -45,
                style: {
                    fontSize: '10px'
                },
                trim: true,
                maxHeight: 100
            },
            tickPlacement: 'on'
        },
        yaxis: {
            title: {
                text: 'Tingkat Inflasi (%)'
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (val) {
                    if (val == 0) {
                        return "No data";
                    } else {
                        return val.toFixed(2) + "%";
                    }
                }
            }
        },
        markers: {
            size: 4
        },
        dataLabels: {
            enabled: false,
            formatter: function (val) {
                if (val == 0) {
                    return "No data";
                } else {
                    return val.toFixed(2);
                }

            }
        },
        colors: [], // Custom colors for each year
        fill: {
            opacity: [] // Custom opacity for each series
        }
    }
}

export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            isLoading: true,
            linewithDataChart2: data2,
            currentYear: null, // To hold the current year from API
            startYear: null, // To hold the start year from API (current year - 4)
        }
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchInflationData();
            }
        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        async fetchInflationData() {
            console.log('fetchInflationYearSeriesData started');
            let normalParam = payloadHelper.normalParam('');

            // Create a color palette
            const colorPalette = ['#1abc9c', '#e74c3c', '#8e44ad', '#3498db', '#2ecc71'];

            return this.$inflationDataYearSeriesRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        const apiData = response.result;
                        const series = [];
                        const categories = [
                            'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
                            'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
                        ];

                        this.currentYear = apiData[0].tahun;
                        console.log(apiData);
                        this.startYear = this.currentYear - 4;

                        // Map the API data to the series for the chart
                        apiData.forEach((yearData, index) => {
                            series.push({
                                name: `${yearData.tahun}`,
                                data: yearData.data_per_year.map(val => val !== null ? val : 0), // Handle null values
                            });
                        });

                        // Set the chart data dynamically
                        this.linewithDataChart2.series = series;
                        this.linewithDataChart2.chartOptions.xaxis.categories = categories;

                        // Customize colors and opacity based on the year
                        this.linewithDataChart2.chartOptions.colors = apiData.map((item, index) => {
                            return item.tahun == this.currentYear ? '#f39c12' : colorPalette[index % colorPalette.length]; // Different colors for current year
                        });

                        // Set the fill opacity based on the year
                        this.linewithDataChart2.chartOptions.fill = {
                            type: 'solid',
                            opacity: apiData.map(item => {
                                return item.tahun == this.currentYear ? 1 : 0.1;
                            })
                        };

                        // Update marker size based on the current year
                        this.linewithDataChart2.chartOptions.markers = {
                            size: apiData.map(item => {
                                return item.tahun == this.currentYear ? 4 : 2; // Larger marker for current year
                            }),
                            opacity: apiData.map(item => {
                                return item.tahun == this.currentYear ? 1 : 0.1; // Full opacity for current year, reduced for others
                            })
                        };

                        // Customize tooltip to sort by higher values
                        // this.linewithDataChart2.chartOptions.tooltip = {
                        //     shared: true,
                        //     intersect: false,
                        //     y: {
                        //         formatter: function (val) {
                        //             return val.toFixed(2) + "%";
                        //         }
                        //     },
                        //     custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                        //         // Get the data for the current data point
                        //         let sortedData = series.map((s, index) => ({
                        //             name: w.globals.seriesNames[index],
                        //             value: s[dataPointIndex]
                        //         }));

                        //         // Sort the data by value (descending)
                        //         sortedData.sort((a, b) => b.value - a.value);

                        //         // Create the tooltip content
                        //         let tooltipContent = `<div class="apexcharts-tooltip-title">${w.globals.labels[dataPointIndex]}</div>`;
                        //         sortedData.forEach((item) => {
                        //             tooltipContent += `
                        //         <div>
                        //             <span style="color:${w.globals.colors[seriesIndex]}">${item.name}: </span>
                        //             <span>${item.value.toFixed(2)}%</span>
                        //         </div>`;
                        //         });

                        //         return tooltipContent;
                        //     }
                        // };
                    }
                })
                .finally(() => {
                    console.log('fetchInflationYearSeriesData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching inflation year series data:', error);
                });
        },
        // Display the aggregate year range
        getAggregateYear() {
            if (this.currentYear && this.startYear) {
                return `${this.startYear} - ${this.currentYear}`;
            }
            return 'Loading...';
        }
    }
}
</script>

<style scoped>
/* Optional custom styles */
</style>