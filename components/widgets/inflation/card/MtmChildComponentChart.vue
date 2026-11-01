<template>
    <div v-if="isLoading">
        <div class="viz-small">
            <b-spinner variant="primary" small label="Small Spinner" class="mt-3"></b-spinner>
        </div>
    </div>
    <!-- end of shimmer -->
    <div v-else>
        <div class="viz-small">
            <apexchart class="apex-charts" type="area" height="90" :series="vizcharts.series"
                :options="vizcharts.chartOptions">
            </apexchart>
        </div>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            isLoading: true,
        }
    },
    computed: {
        ...mapState('inflationProfile', {
            MtMFullYear: state => state.MtMFullYear,
            MtMFullYearStatus: state => state.MtMFullYearStatus,
            selectedYear: state => state.selectedYear
        }),
        vizcharts() {
            const categories = this.MtMFullYear.map(item => item.month);
            const seriesData = this.MtMFullYear.map(item => item.inflationRate);
            // Get unique year data using Set to ensure uniqueness
            const yearData = [...new Set(this.MtMFullYear.map(item => item.year))];

            return {
                series: [{
                    name: '',
                    data: seriesData
                }],
                chartOptions: {
                    chart: {
                        sparkline: {
                            enabled: true
                        },
                    },
                    stroke: {
                        width: 2,
                        curve: 'smooth'
                    },
                    colors: ['#4fc6e1'],
                    title: {
                        text: '',
                        offsetX: 10,
                        style: {
                            fontSize: '22px'
                        }
                    },
                    subtitle: {
                        text: '',
                        offsetX: 10,
                        offsetY: 35,
                        style: {
                            fontSize: '13px'
                        }
                    },
                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                                const month = categories[dataPointIndex]; // Get the month for the hovered point

                                // Check if the value is null or undefined, and return 'No data' if so
                                // Check if value is NaN and return 'No Data' if true
                                if (value === null || value === undefined || isNaN(value)) {
                                    return `Indeks inflasi <span class="badge badge-outline-danger badge-primary">` + toTitleCase(month) + `</span> : No data`;
                                }

                                return `Indeks inflasi <span class="badge badge-outline-primary badge-primary">` + toTitleCase(month) + `</span> : ${value.toFixed(2)}%`;
                            }
                        },
                        x: {
                            formatter: function (value, { dataPointIndex }) {
                                const year = yearData[0];
                                const fullMonth = categories[dataPointIndex] + " - " + year;
                                return toTitleCase(fullMonth); // Convert month and year to title case
                            }
                        },
                        marker: {
                            show: true
                        }
                    }
                },
            };
        },
    },
    mounted() {
        if (this.selectedYear) {
            this.fetchMtMFullYearByYear(this.selectedYear).then(() => {
                this.isLoading = false;
            });
        } else {
            this.fetchMtMFullYearRecap().then(() => {
                this.isLoading = false;
            });
        }
    },
    watch: {
        MtMFullYearStatus(newVal) {
            if (newVal === 'success') {
                this.isLoading = false;
            }
        }
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchMtMFullYearRecap', 'fetchMtMFullYearByYear']),
    }
};

// Helper function to convert string to title case
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
</script>
