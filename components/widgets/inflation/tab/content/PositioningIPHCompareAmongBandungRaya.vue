<template>
    <div>
        <apexchart type="bar" :options="chartOptions" :series="seriesData"></apexchart>
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
        // Sorting the dataComparation by highest tingkat_inflasi to lowest
        sortedData() {
            return this.dataComparation.sort((a, b) => {
                const aInflasi = a.tingkat_inflasi ? parseFloat(a.tingkat_inflasi) : 0;
                const bInflasi = b.tingkat_inflasi ? parseFloat(b.tingkat_inflasi) : 0;
                return bInflasi - aInflasi; // Sort descending by tingkat_inflasi
            });
        },
        // Creating seriesData for ApexChart
        seriesData() {
            if (Array.isArray(this.dataComparation)) {
                return [
                    {
                        name: "IPH",
                        data: this.sortedData.map((item) => {
                            // Simply return the tingkat_inflasi value
                            return item.tingkat_inflasi ? parseFloat(item.tingkat_inflasi) : 0;
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
                    height: 250,
                    toolbar: {
                        show: false, // Disable the toolbar
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: "28.3px",
                        borderRadius: 4,
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
                        text: "Indeks Perkembangan Harga (IPH) (%)",
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
                    fixed: {
                        enabled: true, // Fix the tooltip position
                        position: "top", // Set position to top, can also be 'left', 'right', 'bottom'
                        offsetX: 0, // Horizontal offset
                        offsetY: 0, // Vertical offset
                    },
                    cssClass: 'iph-tooltip',
                    y: {
                        formatter: (val, { series, seriesIndex, dataPointIndex, w }) => {
                            // Use sortedData to get the description for the hovered bar
                            const deskripsi = this.sortedData[dataPointIndex]?.deskripsi || "No data available";
                            return ` ${val}% - <span class="badge badge-danger badge-pill">Keterangan : ${deskripsi} </span> `;
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
                    show: false, // Disable the legend
                },
            };
        },
    },
};
</script>

<style>
.iph-tooltip {
    z-index: 9999 !important;
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
}
</style>