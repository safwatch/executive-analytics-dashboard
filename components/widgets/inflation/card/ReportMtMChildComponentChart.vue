<template>
    <div v-if="loadingState">
        <!-- Show a spinner or shimmer when loading -->
        <div class="viz-small">
            <b-spinner variant="primary" small label="Loading Chart..." class="mt-3"></b-spinner>
        </div>
    </div>

    <!-- Render the chart when not loading -->
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

export default {
    components: {
        apexchart: VueApexCharts
    },
    props: {
        loadingState: {
            type: Boolean,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
    },
    computed: {
        vizcharts() {
            // Ensure that `this.data` is an array before using .map()
            const categories = Array.isArray(this.data) ? this.data.map(item => item.month) : [];
            const seriesData = Array.isArray(this.data) ? this.data.map(item => item.inflationRate) : [];
            const yearData = Array.isArray(this.data) ? [...new Set(this.data.map(item => item.year))] : [];

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
                            formatter: (value, { dataPointIndex }) => {
                                const month = categories[dataPointIndex];
                                if (value === null || value === undefined || isNaN(value)) {
                                    return `Indeks inflasi : <span class="badge badge-outline-danger">No Data</span>`;
                                }
                                return `Indeks inflasi <span class="badge badge-outline-primary">${month}</span> : ${value.toFixed(2)}%`;
                            }
                        },
                        x: {
                            formatter: (value, { dataPointIndex }) => {
                                const year = yearData[0];
                                const fullMonth = `${categories[dataPointIndex]} - ${year}`;
                                return toTitleCase(fullMonth);
                            }
                        },
                    },
                },
            };
        }
    }
};

// Helper function to convert string to title case
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
</script>