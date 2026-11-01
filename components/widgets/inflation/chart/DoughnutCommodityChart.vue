<template>
    <div>
        <apexchart class="apex-charts" height="320" type="donut" :options="chartOptions" :series="seriesData">
        </apexchart>
    </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";

export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    props: {
        data: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    computed: {
        seriesData() {
            // Extract the percentage change for each commodity
            return this.data.map(commodity => commodity.y);
        },
        chartOptions() {
            return {
                labels: this.data.map(commodity => commodity.name),
                legend: {
                    show: true,
                    position: 'right',
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return `${val}%`;
                        }
                    }
                },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    show: false,
                                    label: 'Total',
                                    formatter: () => {
                                        // Calculate the total of percentage changes for all commodities
                                        const total = this.seriesData.reduce((a, b) => a + b, 0);
                                        return `${total.toFixed(2)}%`;
                                    },
                                }
                            }
                        }
                    }
                },
                colors: [
                    '#f39c12', '#e74c3c', '#8e44ad', '#3498db', '#2ecc71',
                    '#f1c40f', '#e67e22', '#1abc9c', '#9b59b6', '#34495e',
                    '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#d35400',
                    '#7f8c8d', '#95a5a6', '#f39c12', '#16a085', '#2c3e50'
                ],
                dataLabels: {
                    enabled: false,
                    formatter: function (val) {
                        return `${val.toFixed(2)}%`;
                    }
                }
            };
        }
    }
}
</script>