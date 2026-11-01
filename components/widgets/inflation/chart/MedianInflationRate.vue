<template>

    <div class="card card-height-100  card-danger">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Tren Inflasi 2021 - 2024</h4>
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
            <apexchart type="line" height="350" :options="linewithDataChart2.chartOptions"
                :series="linewithDataChart2.series">
            </apexchart>
            <!-- Your chart component or content here -->
        </div><!-- end card -->
    </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import { mapState, mapActions } from "vuex";

const data2 = {
    series: [
        {
            name: "Monthly Inflation",
            data: [28, 29, 33, 36, 32, 32, 33, 30, 29, 31, 32, 33] // Replace with actual data from 2016 to 2024
        },
        {
            name: "Annual Inflation",
            data: [12, 11, 14, 18, 17, 13, 13, 12, 15, 16, 14, 17] // Replace with actual data from 2016 to 2024
        }
    ],
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
            text: 'Average Inflation Trend (2016-2024)',
            align: 'left'
        },
        xaxis: {
            categories: [
                'Jan 2016', 'Feb 2016', 'Mar 2016', 'Apr 2016', 'May 2016', 'Jun 2016',
                'Jul 2016', 'Aug 2016', 'Sep 2016', 'Oct 2016', 'Nov 2016', 'Dec 2016',
                'Jan 2017', 'Feb 2017', 'Mar 2017', 'Apr 2017', 'May 2017', 'Jun 2017',
                // Add all months from 2016-2024...
                'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
                'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'
            ],
            labels: {
                rotate: -45, // Rotates the x-axis labels
                style: {
                    fontSize: '10px'
                },
                trim: true, // Trims long labels
                maxHeight: 100 // Prevents labels from getting too long
            },
            tickPlacement: 'on'
        },
        yaxis: {
            title: {
                text: 'Inflation Rate (%)'
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (val) {
                    return val.toFixed(2) + "%";
                }
            }
        },
        markers: {
            size: 4,
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2) + "%";
            }
        }
    }
}
export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            linewithDataChart2: data2
        }
    },
}
</script>