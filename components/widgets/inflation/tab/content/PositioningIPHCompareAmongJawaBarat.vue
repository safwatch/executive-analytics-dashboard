<template>
    <div>
        <apexchart type="bar" height="620" :options="chartOptions" :series="seriesData"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        dataComparation: {
            type: Array,
            required: true, // This data will come from the parent component
        },
    },
    computed: {
        // Sorting the dataComparation by highest indeks_perkembangan_harga to lowest
        sortedData() {
            return this.dataComparation.sort((a, b) => {
                const aIPH = a.indeks_perkembangan_harga ? parseFloat(a.indeks_perkembangan_harga) : 0;
                const bIPH = b.indeks_perkembangan_harga ? parseFloat(b.indeks_perkembangan_harga) : 0;
                return bIPH - aIPH; 
            });
        },
        // Creating seriesData for ApexChart
        seriesData() {
            if (Array.isArray(this.dataComparation)) {
                return [
                    {
                        name: "IPH",
                        data: this.sortedData.map((item) => {
                            // Simply return the indeks_perkembangan_harga value
                            return item.indeks_perkembangan_harga ? parseFloat(item.indeks_perkembangan_harga) : 0;
                        }),
                    },
                ];
            }
            return []; // Return an empty array if dataComparation is not an array
        },
        chartOptions() {
            return {
                chart: {
                    type: "bar",
                    height: 620,
                    toolbar: {
                        show: false, // Disable the toolbar
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: "24.5px",
                        borderRadius: 4,
                        borderRadiusApplication: 'end',
                        distributed: true,
                        dataLabels: {
                            position: "top",
                        },
                    },
                },
                colors: this.dataComparation.map((item) =>
                    item.nama_kabupaten_kota === "KOTA CIMAHI" ? '#f39c12' : '#1abc9c'
                ),
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        // Display "No Data" for regions with 0 value (no inflation data)
                        const regionData = opts.w.config.series[0].data[opts.dataPointIndex];
                        return regionData === 0 ? "No Data" : val + "%";
                    },
                    offsetX: -26,
                    style: {
                        fontSize: "12px",
                        colors: ["#000"],
                    },
                },
                xaxis: {
                    categories: this.dataComparation.map((item) => item.nama_kabupaten_kota),
                    title: {
                        text: "Tingkat Indeks Perkembangan Harga (%)",
                    },
                },
                yaxis: {
                    title: {
                        text: "",
                    },
                },
                title: {
                    text: "",
                    align: "center",
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val === 0 ? "No Data" : val + "%";
                        },
                    },
                    x: {
                        formatter: function (value, { dataPointIndex, w }) {
                            const category = w.config.xaxis.categories[dataPointIndex];
                            return category;
                        }
                    },
                    marker: {
                        show: true,
                    },
                },
                legend: {
                    show: false, 
                },
            };
        },
    },
};
</script>

<style>
.iph-tooltip {
    z-index: 9999 !important;
}
</style>