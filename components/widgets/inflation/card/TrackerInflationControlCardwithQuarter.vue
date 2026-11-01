<template>
    <div v-if="isMetricLoading || !metricData" class="row">
        <div class="col-xl-12">
            <!-- shimmer -->
            <div class="card card-height-100">
                <div class="card-header align-items-center d-flex border-bottom bg-white">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="card-body pt-3 h-100 px-4">
                    <div class="col-xl-12 filter-card d-flex px-2">
                        <div class="tabs d-flex gap-2">
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                        </div>
                    </div>
                    <div class="w-100 d-flex flex-column">
                        <div class="d-flex justify-content-center mb-3">
                            <div class="col-xl-12 d-flex justify-content-center gap-4">
                                <div class="boxed-section col-lg-6 pt-2 px-0">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="boxed-section col-lg-6 pt-2 px-0">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 d-flex justify-content-between gap-4 mt-0">
                            <div class="col-12 col-sm-4 col-md-12 col-lg-5 px-0">
                                <ul class="p-0 m-0 list-group list-group-flush border-dashed">
                                    <li class="d-flex gap-4 align-items-center pb-3 list-group-item px-0">
                                        <div class="row align-items-center g-3 w-100">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                            <div class="col w-100">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                    </li>
                                    <li class="d-flex gap-4 align-items-center pb-3 list-group-item px-0">
                                        <div class="row align-items-center g-3 w-100">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                            <div class="col w-100">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                    </li>
                                    <li class="d-flex gap-4 align-items-center pb-3 list-group-item px-0">
                                        <div class="row align-items-center g-3 w-100">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                            <div class="col w-100">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                    </li>
                                    <li class="d-flex gap-4 align-items-center pb-3 list-group-item px-0">
                                        <div class="row align-items-center g-3 w-100">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                            <div class="col w-100">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                    </li>
                                    <li class="d-flex gap-4 align-items-center pb-3 list-group-item px-0">
                                        <div class="row align-items-center g-3 w-100">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                            <div class="col w-100">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-12 col-sm-8 col-md-12 col-lg-7 d-flex w-100 justify-content-center align-items-center"
                                style="position: relative;">
                                <SieShimmer :shape="'circle'" :width="'100%'" :height="'250px'" :borderRadius="'8px'" />
                            </div>
                        </div>

                    </div>
                </div><!-- end card -->
            </div>
            <!-- end of shimmer -->
        </div>
    </div>
    <div v-else class="row">
        <div class="col-xl-12">
            <div class="card card-height-100">
                <div class="card-header align-items-center d-flex border-bottom bg-white">
                    <h4 class="card-title mb-0 flex-grow-1 text-muted">Pemantauan Pengendalian Inflasi</h4>
                    <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                        <a href="javascript:void(0);" id="tren-rerata-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="tren-rerata-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Tren Rata-rata Inflasi
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
                <div class="card-body pt-3">
                    <div class="card-body row pb-0">
                        <div class="tabs">

                            <button type="button"
                                :class="['btn', 'btn-sm', quarterActiveTab === 'all' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                style="height: 29.31px;" @click="setQuarter('all')">
                                <i class="ri-dashboard-2-line fs-18" style="line-height: 1.2em;"></i>
                            </button>

                            <!-- Q1 tab -->
                            <button type="button"
                                :class="['btn', 'btn-sm', quarterActiveTab === '1' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="setQuarter('1')">
                                Triwulan 1
                            </button>

                            <!-- Q2 tab -->
                            <button type="button"
                                :class="['btn', 'btn-sm', quarterActiveTab === '2' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="setQuarter('2')">
                                Triwulan 2
                            </button>

                            <!-- Q3 tab -->
                            <button type="button"
                                :class="['btn', 'btn-sm', quarterActiveTab === '3' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="setQuarter('3')">
                                Triwulan 3
                            </button>

                            <!-- Q4 tab -->
                            <button type="button"
                                :class="['btn', 'btn-sm', quarterActiveTab === '4' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="setQuarter('4')">
                                Triwulan 4
                            </button>
                        </div>
                        <div class="tab-content col-xl-12">
                            <div class="w-100 d-flex flex-column">
                                <!-- <div class="d-flex justify-content-between">
                                        <div class="mt-lg-4 mt-lg-2 mb-lg-6 mb-2">
                                            <h2 class="mb-0">32</h2>
                                            <p class="mb-0">Rencana Aksi</p>
                                        </div>
                                        <div class="mt-lg-4 mt-lg-2 mb-lg-6 mb-2">
                                            <p class="mb-0">Realisasi Anggaran</p>
                                            <h2 class="mb-0">4,8 Milyar</h2>
                                        </div>
                                    </div> -->
                                <div class="d-flex justify-content-center">
                                    <div
                                        class="boxed-section col-lg-6 py-4 bg-light border border-1 rounded text-center">
                                        <h3 class="text-muted font-13 counter mt-0">Rencana Aksi</h3>
                                        <h2 class="text-muted m-0"><span><span>
                                                    {{ metricData.actionplan }}
                                                </span></span></h2>
                                    </div>
                                    <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                                    <div v-if="isLoadingPartRealizationBudget" class="boxed-section col-lg-6 pt-2 px-0">
                                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                    <div v-else
                                        class="boxed-section col-lg-6 bg-light py-4 border border-1 rounded text-center">
                                        <h3 class="text-muted font-13 counter mt-0">Realisasi Anggaran</h3>
                                        <h2 v-if="metricData.list[0].count_kunci_strategi != 0 && metricData.list[0].kunci_strategi !== null"
                                            class="text-muted m-0"><span><span>
                                                    <a id="budget-tooltip" variant="light" v-b-tooltip.hover
                                                        :title="'Total Outstanding : ' + formattedBudgetRealization"
                                                        style="display: inline-block;">
                                                        {{ acronymBudgetRealization }}
                                                    </a>
                                                </span></span></h2>
                                        <h2 v-else class="text-muted m-0">
                                            <span><span>
                                                    0
                                                </span></span>
                                        </h2>
                                        <!-- <div class="d-flex justify-content-center mt-2 mb-0">
                                            <div class="align-self-center"><span
                                                    class="badge bg-success text-white mb-0"><i
                                                        class="ri-arrow-up-line align-middle"></i>
                                                    10 %
                                                </span></div>
                                            <div class="ml-2 text-left">
                                                <p class="mb-0 text-muted"> dari tahun sebelumnya</p>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between mt-0">
                                    <div class="col-12 col-sm-4 col-md-12 px-0"
                                        :class="metricData.list[0].count_kunci_strategi != 0 && metricData.list[0].kunci_strategi !== null ? 'col-lg-5' : 'd-none'">
                                        <ul v-if="metricData.list[0].count_kunci_strategi != 0 && metricData.list[0].kunci_strategi !== null"
                                            class="p-0 m-0 list-group list-group-flush border-dashed">
                                            <li v-for="(strategy, index) in metricData.list" :key="index"
                                                class="d-flex gap-4 align-items-center pb-3 list-group-item px-0">
                                                <h3><b-badge
                                                        :class="index % 2 === 0 ? 'badge-soft-success' : 'badge-soft-primary'">{{
                                                            strategy.count_kunci_strategi
                                                        }}</b-badge></h3>
                                                <div>
                                                    <h6 class="mb-0 text-wrap">{{ strategy.kunci_strategi }}</h6>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="isLoadingPartRadialChart"
                                        class="col-12 col-sm-8 col-md-12 col-lg-7 d-flex w-100 justify-content-center align-items-center"
                                        style="position: relative;">
                                        <SieShimmer :shape="'circle'" :width="'100%'" :height="'250px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                    <div v-else class="col-12 col-sm-8 col-md-12 col-lg-6" style="position: relative;">
                                        <div class="tracker_with_description">
                                            <apexchart :options="trackerChart" :series="seriesTracker" height="340">
                                            </apexchart>
                                            <div class="conversation-list mt-3" style="min-height: auto;">
                                                <div class="conversation-text" style="width: 100%;">
                                                    <div class="ctext-wrap">Capaian berdasarkan perbandingan jumlah
                                                        kegiatan (Target
                                                        &
                                                        Realisasi)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div><!-- end card -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        isLoadingPartRealizationBudget: {
            type: Boolean,
            required: true
        },
        isLoadingPartRadialChart: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Object,
            required: true,
            default: () => ({})
        },
        metricStatus: {
            type: String,
            required: true,
            default: ""
        }
    },
    data() {
        return {
            seriesTracker: [0],
            currentTheme: {
                primary: "#1abc9c",
                surface: "#f5f5f5",
                "on-background": "#000000",
            },
            variableTheme: {
                "disabled-opacity": 0.6,
                "high-emphasis-opacity": 1,
            },
        }
    },
    watch: {
        metricData: {
            handler(newValue) {
                // Ensure the metricData has the necessary properties before updating the chart
                if (newValue && typeof newValue.progress_percentage !== 'undefined') {
                    let progressValue = newValue.progress_percentage;
                    // Check if progress_percentage is a string and contains '%'
                    if (typeof progressValue === 'string' && progressValue.includes('%')) {
                        // Remove the '%' sign and convert to a numeric value
                        progressValue = parseFloat(progressValue.replace('%', '').trim());
                    } else if (typeof progressValue === 'number') {
                        // If it's a number, just use the value directly
                        progressValue = progressValue;
                    }                    

                    // Ensure the cleaned value is a valid number before updating the chart series
                    if (!isNaN(progressValue)) {
                        this.seriesTracker = [progressValue];  // Pass the cleaned value to the series
                        console.log('Updated metric data:', this.seriesTracker);
                    } else {
                        console.error('Invalid progress percentage value:', newValue.progress_percentage);
                    }
                }
            },
            immediate: true // Run the watcher immediately in case the data is already available
        }
    },
    methods: {
        // for tracker
        hexToRgb(hex) {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r},${g},${b}`;
        },
        // Format budget values into a more human-readable format
        formatBudget(budget) {
            if (budget === 0) {
                return "Masih kosong.";
            }
            const absValue = Math.abs(budget);

            // Check for Milyar (Billion), Juta (Million), Ribu (Thousand)
            if (absValue >= 1e9) {
                return `${(budget / 1e9).toFixed(1)} Miliar`;
            } else if (absValue >= 1e6) {
                return `${(budget / 1e6).toFixed(1)} Juta`;
            } else if (absValue >= 1e3) {
                return `${(budget / 1e3).toFixed(1)} Ribu`;
            } else {
                return budget.toString(); // Return small values as they are
            }
        },
        // Method to format the number with a point separator
        formatWithPointSeparator(value) {
            if (value === null || value === undefined) return '0';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },

        // Method to format the number using acronyms
        formatWithAcronyms(value) {
            if (value === null || value === undefined) return '0';
            const billion = 1000000000;
            const million = 1000000;
            let formattedValue;

            if (value >= billion) {
                formattedValue = (value / billion).toFixed(2) + ' Milyar';
            } else if (value >= million) {
                formattedValue = (value / million).toFixed(2) + ' Juta';
            } else {
                formattedValue = value.toString();
            }

            return formattedValue;
        },
        // This method will be called when a tab is clicked
        setQuarter(quarterId) {
            this.$store.dispatch('inflationSummary/setQuarterActiveTab', quarterId);
            this.$store.dispatch('inflationSummary/fetchActionPlanAndStrategiesOfWorkunitsData', { quarter_id: quarterId }); // Dispatch action to update the store with the selected quarter
        }
    },
    computed: {
        quarterActiveTab() {
            return this.$store.getters['inflationSummary/getQuarterActiveTab'];
        },
        trackerChart() {
            return {
                labels: ["Capaian"],
                chart: { type: "radialBar" },
                plotOptions: {
                    radialBar: {
                        offsetY: 10,
                        startAngle: -140,
                        endAngle: 130,
                        hollow: { size: "65%" },
                        track: {
                            background: this.currentTheme.surface,
                            strokeWidth: "100%"
                        },
                        dataLabels: {
                            name: {
                                offsetY: -20,
                                color: `rgba(${this.hexToRgb(this.currentTheme["on-background"])},${this.variableTheme["disabled-opacity"]})`,
                                fontSize: "13px",
                                fontWeight: "400",
                                fontFamily: "Public Sans"
                            },
                            value: {
                                offsetY: 10,
                                color: `rgba(${this.hexToRgb(this.currentTheme["on-background"])},${this.variableTheme["high-emphasis-opacity"]})`,
                                fontSize: "38px",
                                fontWeight: "400",
                                fontFamily: "Public Sans"
                            }
                        }
                    }
                },
                colors: [this.currentTheme.primary],
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        shadeIntensity: 0.5,
                        gradientToColors: [this.currentTheme.primary],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 0.6,
                        stops: [30, 70, 100]
                    }
                },
                stroke: { dashArray: 10 },
                grid: {
                    padding: {
                        top: -20,
                        bottom: 5
                    }
                },
                states: {
                    hover: { filter: { type: "none" } },
                    active: { filter: { type: "none" } }
                },
                responsive: [
                    {
                        breakpoint: 960,
                        options: { chart: { height: 340 } }
                    }
                ]
            };
        },
        // Option 1: Format with point separator (Indonesian format)
        formattedBudgetRealization() {
            return this.formatWithPointSeparator(this.metricData.budget_realization);
        },

        // Option 2: Format using acronyms
        acronymBudgetRealization() {
            return this.formatWithAcronyms(this.metricData.budget_realization);
        }
    },
}
</script>