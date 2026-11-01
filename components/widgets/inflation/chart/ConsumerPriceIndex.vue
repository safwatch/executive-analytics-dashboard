<template>
    <!-- shimmer -->
    <div v-if="isLoading" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pb-3">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'400px'" :borderRadius="'8px'" />
        </div><!-- end card body -->
    </div><!-- end card -->
    <!-- end of shimmer -->

    <div v-else class="card card-height-100 card-danger">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Indeks Harga Konsumen</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="ihk-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="ihk-popover" triggers="hover" placement="right" custom-class="custom-popover">
                    <template v-slot:title>
                        Indeks Harga Konsumen
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
        <div class="card-body py-0 pb-3">
            <h6 class="mt-4 mb-0 text-muted" v-html="getTitle()"></h6>
            <div v-if="cpiDataStatus === 'success'">
                <apexchart type="bar" height="400" :options="chartOptions" :series="seriesData"></apexchart>
            </div>
            <div v-else>
                <div class="col-xl-12 py-5">
                    <p class="text-muted">No data available for the current month.</p>
                </div>
            </div>
        </div><!-- end card body -->
    </div><!-- end card -->
</template>

<script>
import { payloadHelper } from '~/helpers/payload.helper';

export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            isLoading: true, // State for shimmer loader
            cpiData: {}, // CPI data fetched from API
            cpiDataStatus: '', // Status of CPI data loading (success or error)
        };
    },
    computed: {
        seriesData() {
            return [{
                name: 'Indeks Harga Konsumen',
                data: this.cpiData.map(item => parseFloat(item.laju_inflasi)) // Extracting inflation rates as numbers
            }];
        },
        chartOptions() {
            const categories = this.cpiData.map(item => this.toTitleCase(item.kelompok_pengeluaran)); // Extracting the 'kelompok_pengeluaran'

            const colors = ['#fbc7cd', '#f7b5a5', '#f9d776', '#a5dfcc', '#d6e3f3', '#c5c0ff', '#f5c2e7', '#e7e7e7', '#fbc8a5', '#c49b8c', '#f6b0a5', '#d9b2ae']; // Custom colors

            return {
                chart: {
                    type: 'bar',
                    height: 400,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 4,
                        barHeight: '85%',
                        distributed: true, // Distribute colors across the bars
                    },
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: categories, // Use the extracted categories
                    title: {
                        text: '',
                        style: {
                            fontWeight: 'normal' // Remove bold from axis title
                        }
                    },
                    labels: {
                        style: {
                            colors: '#9aa0ac',
                            fontSize: '12px',
                            fontWeight: 'normal' // Remove bold from labels
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#9aa0ac',
                            fontSize: '12px',
                            fontWeight: 'normal' // Remove bold from labels
                        }
                    }
                },
                colors: colors, // Apply the color array to bars
                grid: {
                    show: true,
                    borderColor: '#f1f1f1'
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return `${val}`; // Formatting tooltip to show percentage
                        }
                    }
                },
                legend: {
                    show: false
                }
            };
        }
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchCPIData();
            }
        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        async fetchCPIData() {
            let normalParam = payloadHelper.normalParam('');
            return this.$consumerPriceIndexRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        this.cpiData = response.result;
                        this.cpiDataStatus = 'success';
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
        toTitleCase(str) {
            return str.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase());
        },
        getUniqueYears() {
            // Extract unique years from the data
            const uniqueYears = [...new Set(this.cpiData.map(item => item.tahun))];
            return uniqueYears;
        },
        getLatestYear() {
            const uniqueYears = this.getUniqueYears();
            // Sort the years in descending order and get the latest one
            return Math.max(...uniqueYears.map(year => parseInt(year)));
        },
        getTitle() {
            const latestYear = this.getLatestYear();
            return `Update data terakhir : <span class="badge badge-outline-primary badge-primary">${latestYear}</span>`;
        },
    }
};
</script>

<style scoped>
/* Custom styles for your chart can be added here */
</style>
