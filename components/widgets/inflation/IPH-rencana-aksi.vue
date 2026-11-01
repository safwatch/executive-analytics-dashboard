<template>
    <div>
        <div class="row">
            <div class="col-12 p-0">
                <div class="body-parameter" :class="{ 'fixed': isFixed }" ref="content">
                    <div class="container p-0">
                        <div class="col-12 p-0">
                            <component :is="currentFilterComponent"></component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="d-flex col-xl-12 px-0">
                <div class="col-xl-6">
                    <component :is="currentPositioningInflasiComponent"></component>
                </div>
                <div class="col-xl-6">
                    <component :is="currentFoodCommodityDistributionComponent"></component>
                </div>
            </div>
        </div>
        <div class="row">
            <InflationActionPlan />
            <div class="col-xl-6 mb-0">
                <div class="card stretch stretch-full">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <h4 class="card-title mb-0 flex-grow-1 text-muted">Proyeksi Dampak Operasi Pasar Beras</h4>
                        <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                            <a href="javascript:void(0);" id="target-vs-realisasi-popover" class="text-muted"
                                variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>
                            <b-popover target="target-vs-realisasi-popover" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Proyeksi Dampak Operasi Pasar Beras
                                </template>
                                <div>
                                    Menampilkan perkiraan penurunan harga setelah intervensi.
                                </div>
                            </b-popover>
                        </div>
                    </div>
                    <div class="card-body custom-card-action">
                        <div class="row">
                            <div class="col-sm-12 text-center mb-0">
                                <apexchart key="1" class="apex-charts" height="200"
                                    type="line" :options="IPHRencanaAksiChartOptions" :series="series">
                                </apexchart>
                                <div class="text-left mt-2">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <p>Sebelum Aksi<br>Rp 15.000/kg (Civic Selatan)</p>
                                        </div>
                                        <div class="col-sm-4">
                                            <p>Setelah Aksi (Prediksi)<br>Rp 13.500/kg (Turun 10%)</p>
                                        </div>
                                        <div class="col-sm-4">
                                            <p>Target Penurunan Harga<br>12%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-sm-4">
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <b-modal id="market-detail-modal" title="Detail Rencana Aksi" dialog-class="modal-xl custom-modal"
                hide-footer>
                <div class="container">
                    <ul class="commoditylist list-unstyled row mb-4">
                        <div class="commodity-item col-sm-12 col-md-12 col-xl-12" ref="commodity">
                            <table class="table table-borderless table-hover table-centered m-0">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Aksi</th>
                                        <th>Status</th>
                                        <th>Dampak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01 Nov 2024</td>
                                        <td>Operasi Pasar Beras</td>
                                        <td><i style="color: green;" class="fa fa-fw fa-check-square"></i>Selesai</td>
                                        <td>
                                            Setelah Aksi Rp 13.500/kg (Turun 10%)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ul>
                </div>
            </b-modal>
            <!-- shimmer -->
            <!-- <div class="col-xl-12 mb-3">
                <div class="card card-height-100">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <h4 class="card-title mb-0 flex-grow-1 text-muted">Peta Aksi Pengendalian Inflasi Civic Administration
                        </h4>
                        <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                            <a href="javascript:void(0);" id="map-pasar-popover" class="text-muted" variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>
                            <b-popover target="map-pasar-popover" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Peta Aksi Pengendalian Inflasi Civic Administration
                                </template>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate repellendus
                                    distinctio
                                    neque pariatur quo molestiae enim, ea adipisci odio, perferendis iste ratione
                                    quam
                                    ipsam
                                    sunt? Esse optio cupiditate placeat dicta!
                                </div>
                            </b-popover>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="city-map" class="w-100 align-items-center" style="min-height: 500px;"></div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { gsap } from "gsap";

// library for map 
import * as echarts from "echarts";
import civicJsonData from "@/components/widgets/civic-kecamatan.json";
import marketPoints from "@/components/widgets/titik-wilayah-kecamatan.json";

import CommodityImage from './helpers/CommodityImage.vue';
import { getSvgSrc } from '~/helpers/svg.helper';

// import components
import WatcherCommodityLatestQuarter from './card/WatcherCommodityLatestQuarter.vue';
import IPHCommodityNaik from './card/IPHCommodityNaik.vue';
import FoodBalanceTreeMapIPH from "./chart/FoodBalanceTreeMapIPH.vue";
import IPHCommodityTurun from './card/IPHCommodityTurun.vue';
import IPHCommodityStabil from './card/IPHCommodityStabil.vue';

// commodities list 
import commodityList from "./commodities-list.json";
import IPHFilterComponent from '~/components/widgets/inflation/filter/IPH-filter.vue'
import PositioningInflasiComponent from '~/components/widgets/inflation/tab/PositioningInflasi.vue'
import FoodCommodityDistributionComponent from '~/components/widgets/inflation/card/FoodCommodityDistribution.vue'
import InflationActionPlan from './action-plan/InflationActionPlan.vue';

export default {
    name: 'OverwatchIPHByCommodityComponent',
    components: {
        WatcherCommodityLatestQuarter,
        IPHCommodityNaik,
        IPHCommodityTurun,
        IPHCommodityStabil,
        FoodBalanceTreeMapIPH,
        CommodityImage,
        InflationActionPlan,
        apexchart: () => import("vue-apexcharts"),
        'iph-filter-component': IPHFilterComponent,
        'iph-positioning-inflasi-component' : PositioningInflasiComponent,
        'iph-food-comodity-distribution' : FoodCommodityDistributionComponent,
    },
    computed: {
        ...mapState('overwatchIPHCommodity', [

            'iphCommodityNaikMetric',
            'iphCommodityNaikLatestStatus',
            'isLoadingCommodityNaik',
            'isIPHCommodityNaikFetched',

            'iphCommodityTurunMetric',
            'iphCommodityTurunLatestStatus',
            'isLoadingCommodityTurun',
            'isIPHCommodityTurunFetched',

            'iphCommodityTetapMetric',
            'iphCommodityTetapLatestStatus',
            'isLoadingCommodityTetap',
            'isIPHCommodityTetapFetched',

            'commodityLatestQuarterMetric',
            'commodityLatestQuarterStatus',
            'isLoadingCommodityLatestQuarter',
            'isCommodityLatestQuarterFetched',

            'iphCommodityTreemapChart',
            'iphCommodityTreemapStatus',
            'isLoadingIPHCommodityTreemap',
            'isIPHCommodityTreemapFetched',

            // Year Data
            'selectedYear',
        ]),
        currentFilterComponent() {
            return 'iph-filter-component'
        },
        currentPositioningInflasiComponent() {
            return 'iph-positioning-inflasi-component'
        },
        currentFoodCommodityDistributionComponent() {
            return 'iph-food-comodity-distribution'
        },
    },
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            isFixed: false,
            containerWidth: 0,
            isLoading: true,
            // goal progress
            series: [15],
            goalProgressChartOptions: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 225,
                        hollow: {
                            margin: 0,
                            size: '70%',
                            background: '#fff',
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24,
                            },
                        },
                        track: {
                            background: '#fff',
                            strokeWidth: '67%',
                            margin: 0,
                            dropShadow: {
                                enabled: true,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: 0.35,
                            },
                        },
                        dataLabels: {
                            show: true,
                            name: {
                                offsetY: -10,
                                show: true,
                                color: '#888',
                                fontSize: '17px',
                            },
                            value: {
                                formatter: function (val) {
                                    return parseInt(val) + "%";
                                },
                                color: '#111',
                                fontSize: '36px',
                                show: true,
                            },
                        },
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#ABE5A1'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100],
                    },
                },
                stroke: {
                    lineCap: 'round',
                },
                labels: ['Persentase Naik'],
            },
            
            series: [{
                name: "Desktops",
                data: [15000, 14500, 14000, 13500]
            }],
            IPHRencanaAksiChartOptions: {
                chart: {
                    height: 300,
                    zoom: { enabled: false },
                    toolbar: { show: false }
                },
                colors: ['#4fc6e1', '#1abc9c'],
                dataLabels: { enabled: false },
                stroke: {
                    width: [3, 3],
                    curve: 'smooth'
                },
                grid: {
                    row: {
                        colors: ['transparent', 'transparent'],
                        opacity: 0.2
                    },
                    borderColor: '#f1f3fa'
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr'],
                    title: { text: 'Bulan' }
                },
                yaxis: {
                    title: { text: 'Pemantauan Harga' }
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
                        chart: { toolbar: { show: false } },
                        legend: { show: false }
                    }
                }]
            },

            // IPHRencanaAksiChartOptions: {
            //     series: [{
            //         name: "Desktops",
            //         data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            //     }],
            //     chart: {
            //         height: 300,
            //         zoom: {
            //             enabled: false
            //         },
            //         toolbar: {
            //             show: false
            //         }
            //     },
            //     colors: ['#4fc6e1', '#1abc9c'],
            //     dataLabels: {
            //         enabled: false,
            //     },
            //     stroke: {
            //         width: [3, 3],
            //         curve: 'smooth'
            //     },
            //     title: {
            //         text: '',
            //         align: 'left',
            //         style: {
            //             fontSize: '14px',
            //             color: '#666'
            //         }
            //     },
            //     labels: {
            //         formatter: function (value) {
            //             return value;
            //         }
            //     },
            //     grid: {
            //         row: {
            //             colors: ['transparent', 'transparent'],
            //             opacity: 0.2
            //         },
            //         borderColor: '#f1f3fa'
            //     },
            //     markers: {
            //         style: 'inverted',
            //         size: 6
            //     },
            //     xaxis: {
            //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            //         title: {
            //             text: 'Bulan'
            //         }
            //     },
            //     yaxis: {
            //         title: {
            //             text: 'Perbandingan Harga'
            //         },
            //         labels: 'Label y axis'
            //     },
            //     tooltip: {
            //         enabled: true,
            //         y: {
            //             formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
            //                 const month = dataPointIndex >= 0 ? data[dataPointIndex].nama_bulan : '';

            //                 if (value === 0 || value === null || isNaN(value)) {
            //                     return `<span class="badge badge-outline-danger badge-primary"> No data </span>`;
            //                 }

            //                 return `<span class="badge badge-outline-primary badge-primary"> ${value}</span>`;
            //             }
            //         },
            //         x: {
            //             formatter: function (value, { dataPointIndex }) {
            //                 const month = data[dataPointIndex].nama_bulan;
            //                 const year = data[dataPointIndex].tahun;
            //                 const fullMonth = `${month} - ${year}`;
            //                 return toTitleCase(fullMonth);
            //             }
            //         },
            //         marker: {
            //             show: true
            //         }
            //     },
            //     legend: {
            //         position: 'top',
            //         horizontalAlign: 'right',
            //         floating: true,
            //         offsetY: -25,
            //         offsetX: -5
            //     },
            //     responsive: [{
            //         breakpoint: 600,
            //         options: {
            //             chart: {
            //                 toolbar: {
            //                     show: false
            //                 }
            //             },
            //             legend: {
            //                 show: false
            //             },
            //         }
            //     }]
            // },
            Overwatch20CommodityDetailComponent: WatcherCommodityLatestQuarter,
            WacthIPHCommodityNaik: IPHCommodityNaik,
            WacthIPHCommodityTurun: IPHCommodityTurun,
            WacthIPHCommodityTetap: IPHCommodityStabil,

            // heatmap 
            heatmapSeries: [
                {
                    name: 'Beras Medium',
                    // data: [52, 89, 35, 63, 2, 47, 99, 26, 17, 44, 3, 81, 57, 78, 56, 92]
                    data: [16, 18, 15, 16, null, 23, 17, 15, 10, null, 10, 10, 29, 25, null, 25, 24, 25, 14]
                },
                {
                    name: 'Daging Ayam Broiler',
                    // data: [94, 56, 33, 55, 22, 39, 60, 58, 83, 74, 90, 7, 14, 71, 34, 1]
                    data: [14, 26, 19, 25, null, 23, 26, 23, 6, null, 8, 13, 25, 21, null, 22, 33, 20, 21]
                },
                {
                    name: 'Telur Ayam Broiler',
                    // data: [11, 16, 9, 43, 18, 26, 60, 79, 93, 68, 99, 23, 4, 35, 74, 53]
                    data: [9, 26, 22, 33, null, 23, 30, 24, 12, null, 9, 20, 30, 20, null, 30, 30, 15, 17]
                },
                {
                    name: 'Bawang Merah',
                    // data: [44, 72, 98, 7, 18, 56, 33, 57, 90, 15, 39, 4, 42, 88, 10, 20]
                    data: [6, 30, 22, 41, null, 26, 39, 31, 8, null, 12, 29, 37, 28, null, 38, 29, 24, 20]
                },
                {
                    name: 'Cabe Merah',
                    // data: [21, 65, 37, 98, 30, 79, 41, 91, 50, 3, 77, 92, 82, 40, 71, 15]
                    data: [6, 36, 28, 37, null, 28, 36, 32, 11, null, 10, 25, 41, 36, null, 47, 27, 20, 22]
                },
                {
                    name: 'Cabe Rawit Merah',
                    // data: [57, 90, 12, 99, 49, 28, 77, 61, 64, 36, 48, 10, 55, 43, 93, 89]
                    data: [15, 44, 30, 34, null, 26, 33, 32, 13, null, 11, 25, 37, 41, null, 55, 28, 24, 20]
                },
                {
                    name: 'Minyak Goreng (Kemasan)',
                    // data: [19, 47, 82, 4, 56, 74, 67, 91, 1, 33, 51, 62, 29, 11, 72, 58]
                    data: [17, 42, 38, 37, null, 35, 29, 39, 22, null, 8, 21, 43, 38, null, 64, 25, 25, 16]
                },
                {
                    name: 'Gula Pasir Lokal',
                    // data: [62, 34, 14, 81, 93, 54, 26, 46, 83, 17, 50, 24, 74, 35, 96, 65]
                    data: [14, 44, 38, 45, null, 42, 32, 38, 25, null, 8, 25, 43, 36, null, 68, 27, 23, 18]
                },
                {
                    name: 'Bawang Putih',
                    // data: [29, 70, 60, 77, 89, 55, 23, 19, 16, 90, 10, 56, 31, 68, 82, 27]
                    data: [18, 41, 43, 48, null, 50, 37, 46, 22, null, 12, 21, 43, 45, null, 72, 32, 31, 17]
                },
                {
                    name: 'Daging Sapi',
                    // data: [39, 18, 91, 68, 45, 2, 87, 72, 76, 58, 66, 12, 7, 28, 8, 53]
                    data: [23, 41, 45, 57, null, 57, 43, 51, 20, null, 13, 26, 49, 41, null, 71, 35, 38, 26]
                },
                {
                    name: 'Tepung Terigu Curah',
                    // data: [56, 71, 94, 32, 3, 25, 17, 48, 58, 75, 14, 12, 19, 99, 41, 55]
                    data: [22, 41, 42, 55, null, 54, 45, 50, 19, null, 20, 21, 44, 37, null, 80, 32, 43, 28]
                },
                {
                    name: 'Pisang 1 Kg',
                    // data: [21, 50, 76, 3, 66, 30, 44, 85, 17, 54, 91, 9, 75, 60, 4, 20]
                    data: [28, 37, 47, 52, null, 52, 48, 48, 24, null, 19, 30, 50, 43, null, 86, 32, 51, 29]
                },
                {
                    name: 'Jeruk 1 Kg',
                    // data: [60, 93, 79, 16, 5, 24, 91, 43, 37, 88, 49, 9, 55, 7, 31, 52]
                    data: [37, 46, 42, 61, null, 47, 51, 51, 27, null, 27, 33, 46, 52, null, 81, 40, 58, 37]
                },
                {
                    name: 'Susu Kental Manis',
                    // data: [13, 74, 62, 46, 18, 86, 12, 70, 58, 91, 28, 59, 27, 9, 51, 100]
                    data: [39, 48, 46, 56, null, 50, 59, 46, 36, null, 30, 39, 53, 56, null, 88, 35, 64, 39]
                },
                {
                    name: 'Kol/Kubis',
                    // data: [88, 44, 79, 33, 49, 12, 80, 23, 57, 41, 71, 95, 7, 65, 68, 13]
                    data: [42, 57, 52, 62, null, 48, 63, 52, 40, null, 26, 45, 59, 57, null, 91, 40, 64, 48]
                },
                {
                    name: 'Tomat',
                    // data: [26, 80, 21, 72, 56, 49, 35, 38, 10, 19, 91, 64, 25, 29, 63, 13]
                    data: [45, 65, 58, 65, null, 54, 64, 55, 49, null, 35, 40, 62, 53, null, 91, 48, 61, 44]
                },
                {
                    name: 'Tempe 1 Kg',
                    // data: [51, 82, 39, 74, 3, 92, 77, 46, 88, 62, 14, 5, 24, 67, 17, 60]
                    data: [41, 68, 63, 74, null, 51, 72, 64, 47, null, 32, 41, 63, 52, null,100, 43, 68, 40]
                },
                {
                    name: 'Ikan Teri Kering',
                    // data: [79, 93, 31, 46, 66, 9, 85, 64, 18, 39, 5, 59, 80, 91, 16, 22]
                    data: [39, 73, 65, 70, null, 55, 68, 65, 49, null,38, 40, 63, 57, null, 100, 48, 66, 39]
                },
                {
                    name: 'Kacang Kedelai',
                    // data: [88, 12, 50, 68, 9, 70, 48, 33, 54, 94, 43, 18, 41, 76, 21, 8]
                    data: [38, 79, 73, 66, null, 61, 65, 65, 47, null,37, 46, 62, 53, null, 100, 47, 68, 44]
                },
                {
                    name: 'Udang',
                    // data: [2, 45, 98, 49, 57, 73, 56, 26, 3, 87, 88, 62, 81, 28, 39, 95]
                    data: [44, 74, 79, 71, null, 56, 64, 73, 49, null, 41, 55, 57, 57, null, 100, 45, 71, 50]
                },

            ],
            heatmapOptions: {
                chart: {
                    height: 350,
                    type: 'heatmap',
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    heatmap: {
                        // Define the color scale from red (low) to green (high)
                        colorScale: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 10,
                                    color: '#0B6623' // Hijau Tua (Aman)
                                },
                                {
                                    from: 11,
                                    to: 20,
                                    color: '#1F7A34' // Hijau Lebih Cerah
                                },
                                {
                                    from: 21,
                                    to: 30,
                                    color: '#4CAF50' // Hijau Sedang
                                },
                                {
                                    from: 31,
                                    to: 40,
                                    color: '#4DA35A' // Hijau Muda
                                },
                                {
                                    from: 41,
                                    to: 50,
                                    color: '#67B66D' // Hijau Sangat Muda
                                },
                                {
                                    from: 51,
                                    to: 60,
                                    color: '#E5C100' // Kuning (Mulai Waspada)
                                },
                                {
                                    from: 61,
                                    to: 70,
                                    color: '#E59800' // Oranye Muda
                                },
                                {
                                    from: 71,
                                    to: 80,
                                    color: '#DB6800' // Oranye Tua (Waspada)
                                },
                                {
                                    from: 81,
                                    to: 90,
                                    color: '#C52E17' // Merah (Bahaya)
                                },
                                {
                                    from: 91,
                                    to: 100,
                                    color: '#B90004' // Merah Tua (Sangat Bahaya)
                                },
                            ]
                        }
                    },
                },
                title: {
                    text: ''
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            if (val === null) {
                                return '';
                            } else {
                                return `${val}%`;
                            }
                        }
                    }
                },
                legend: {
                    show: 'true',
                    position: 'bottom',
                },
                xaxis: {
                    position: 'top',
                    categories: [
                        'Minggu ke-1', 'Minggu ke-2', 'Minggu ke-3', 'Minggu ke-4', '-', 'Minggu ke-5', 'Minggu ke-6', 'Minggu ke-7',
                        'Minggu ke-8', '-', 'Minggu ke-9', 'Minggu ke-10', 'Minggu ke-11', 'Minggu ke-12', '-', 'Minggu ke-13', 'Minggu ke-14', 'Minggu ke-15', 'Minggu ke-16'
                    ], // Custom labels for each period
                    labels: {
                        rotate: -90 // Pastikan teks tetap lurus
                    }
                }
            },

            // map data
            geoJson: civicJsonData,
            points: marketPoints,
            clickedMarket: {},

            // animate detail
            commodities: [
                { name: "Gold" },
                { name: "Silver" },
                { name: "Crude Oil" },
                { name: "Wheat" },
            ],
            commodities2: commodityList,
            selectedIndex: null,
            selectedCommodity: null,
            commodityDetails: "",
            loading: false,
            colorGeoJson: [
                {
                    name: "Civic Selatan",
                    areaColors: "#FF0000"
                },
                {
                    name: "Civic Tengah",
                    areaColors: "#FFFF00"
                },
                {
                    name: "Civic Utara",
                    areaColors: "#0000FF"
                }
            ]
        }
    },
    mounted() {
        if (!this.isCommodityLatestQuarterFetched) {
            this.fetchInitialData();
        }
        console.log('point : ', this.points);
        

        // map 
        this.$nextTick(() => {
            // Initial render with zoom level based on window size
            const windowWidth = window.innerWidth;
            let zoomLevel = windowWidth <= 480 ? 0.5 : windowWidth <= 768 ? 0.8 : 1;
            this.renderChart(zoomLevel);

            // Add resize listener
            window.addEventListener('resize', this.handleResize);
        });
    },
    beforeDestroy() {
        // Clean up the resize event listener when the component is destroyed
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        ...mapActions('overwatchIPHCommodity', ['fetchInitialData']),
        // gsap
        animateBox() {
            gsap.to(this.$refs.box, {
                duration: 0.5,
                x: 100,
                backgroundColor: "green",
                scale: 1.2,
                ease: "power2.out",
            });
        },
        // end of gsap
        renderChart(zoomLevel) {
            let chartDom = document.getElementById("city-map");

            if (!chartDom) {
                console.error("Chart DOM element not found.");
                return;
            }

            // Check if the chart instance already exists
            let myChart = echarts.getInstanceByDom(chartDom);

            // If no existing chart instance, create one; otherwise, reuse the existing one
            if (!myChart) {
                myChart = echarts.init(chartDom);
            }

            echarts.registerMap("Civic", this.geoJson);

            // Set the market points with custom symbols based on inflation data
            
            let marketData = this.points.map(point => {
                return {
                    name: point.name,
                    value: [point.longitude, point.latitude],
                    inflation: point.inflation,
                    symbol: 'circle', // Default symbol
                    symbolSize: 16, // Size of the symbol
                    itemStyle: { color: point.color },
                    // Animation for the symbol (waving effect)
                    animation: true,
                    animationDuration: 2000, // Duration of the animation
                    animationEasing: 'cubicInOut',
                };
            });

            let option = {
                tooltip: {
                    trigger: "item",
                    showDelay: 0,
                    transitionDuration: 0.2,
                    backgroundColor: '#1768e8', // Background color of the tooltip
                    borderColor: '#1768e8', // Border color of the tooltip
                    borderWidth: 1, // Border width of the tooltip
                    textStyle: {
                        color: '#fff', // Font color
                        fontSize: 12, // Font size
                        fontFamily: 'Poppins, sans-serif', // Font family
                        fontWeight: 'bold', // Font weight
                    },
                    formatter: function (params) {
                        return `<div style="text-align: center;">
                                <strong>${params.name}</strong><br/>
                                <span style="color: #FFD700;">Coordinates: ${params.value[1]}, ${params.value[0]}</span>
                                </div>`;
                    },
                },
                geo: {
                    map: "Civic",
                    roam: false,
                    zoom: zoomLevel,
                    aspectScale: 0.75, // scale: [1.5, 1],
                    itemStyle: {
                        normal: {
                            borderColor: '#111', // Set the border color of regions
                            borderWidth: 0.5, // Set the border width of regions
                            areaColor: '#B3E5FC', // Set the fill color of regions
                        },
                        emphasis: {
                            areaColor: '#FFCC80', // Highlight color when hovered
                        },
                    },
                    emphasis: {
                        label: {
                            show: false,
                        },
                    },
                    label: {
                        show: false, // Disable labels by default
                        emphasis: {
                            show: false, // Disable labels on hover and click
                        },
                    },
                },
                series: [
                    {
                        // setting peta nya
                        name: "Civic Kelurahan",
                        type: "map",
                        roam: false,
                        map: "Civic",
                        zoom: zoomLevel,
                        itemStyle: {
                            normal: {
                                borderColor: '#FFFFFF',
                                borderWidth: 0.5,
                                areaColor: '#AEB0C0', //marketData.areaColors,
                            },
                            emphasis: {
                                areaColor: '#FFCC80',
                            },
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                        },
                        label: {
                            show: false, // Disable labels by default
                            emphasis: {
                                show: false, // Disable labels on hover and click
                            },
                        },
                        tooltip: {
                            show: false, // Disable tooltip for this series
                        },
                        // data: this.colorGeoJson.map(area => ({
                        //     name: area.name,
                        //     itemStyle: {
                        //         normal: {
                        //             areaColor: area.areaColors, // Gunakan warna dari JSON
                        //         }
                        //     }
                        // })),
                    },
                    {
                        // untuk setting dots nya
                        name: "Markets",
                        type: "scatter",
                        coordinateSystem: "geo",
                        data: marketData,
                        symbolSize: 15, // Fixed size for all points
                        itemStyle: {
                            normal: {
                                color: '#1768e8', // Color of the dots
                                borderColor: '#fff', // Border color of the dots
                                borderWidth: 2, // Border width of the dots
                                shadowColor: 'rgba(0, 0, 0, 0.0)', // Shadow color
                                shadowBlur: 10, // Shadow blur effect
                            },
                            emphasis: {
                                color: '#0f26db', // Color when a point is hovered
                                borderColor: '#fff', // Border color when hovered
                                borderWidth: 3, // Border width when hovered
                                shadowColor: 'rgba(0, 0, 0, 0.0)', // Stronger shadow when hovered
                                shadowBlur: 15, // Increased shadow blur when hovered
                            },
                        },
                        label: {
                            formatter: "{b}",
                            position: "top",
                            show: true,
                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                        },
                        tooltip: {
                            show: false,
                            formatter: function (params) {
                                return `${params.name}`;
                            },
                        },
                        // Add click event listener
                        events: {
                            click: (params) => {
                                console.log('Market Point Clicked:', params.name); // Log the name to the console
                            }
                        }
                    },
                ],
            };

            myChart.setOption(option);

            // Event listener for clicking on regions
            myChart.on('click', (params) => {
                console.log(params);
                if (params.componentType === 'series' && params.seriesType === 'map') {
                    const clickedRegionName = params.name;

                    // Reset all regions to the default color
                    option.series[0].data.forEach((region) => {
                        if (region.itemStyle) {
                            delete region.itemStyle;
                        }
                    });

                    // Set the clicked region to a new color
                    const region = option.series[0].data.find(
                        (item) => item.name === clickedRegionName
                    );
                    if (region) {
                        region.itemStyle = {
                            normal: {
                                areaColor: '#FFD700', // New color for the clicked region
                            },
                        };
                    }

                    myChart.setOption(option);
                }
                // Handle market point clicks (scatter)
                if (params.componentType === 'series' && params.seriesType === 'scatter') {
                    const clickedMarket = params.data; // Get the market data
                    console.log('Clicked market:', clickedMarket);

                    // Set the clicked market details to be used in the modal
                    this.clickedMarket = clickedMarket; // Assuming clickedMarket is a data property

                    // Show the modal with market details
                    this.$bvModal.show("market-detail-modal"); // Show modal using BootstrapVue's modal system
                }
            });

            // Apply transform to all canvas elements under chartDom
            const canvasElements = chartDom.querySelectorAll('canvas');
            canvasElements.forEach(canvasElement => {
                canvasElement.classList.add('d-flex');
                canvasElement.style.transform = 'scale(1.25, 1)';
                canvasElement.style.transformOrigin = 'center center';
                canvasElement.style.transformOrigin = 'center'; // Ensure scaling happens from the center
                canvasElement.style.margin = '0 auto'; // Center the canvas element horizontally
            });

            // Resize the chart based on the window size
            this.resizeChart(myChart);
        },
        // resize map based on window size
        // Debounced function to avoid rapid re-rendering
        debounce(func, wait) {
            let timeout;
            return function () {
                const context = this, args = arguments;
                const later = function () {
                    clearTimeout(timeout);
                    func.apply(context, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Resize chart only when necessary and debounce it
        resizeChart(chartInstance) {
            window.addEventListener('resize', this.debounce(() => {
                if (window.innerWidth <= 767.98) {
                    chartInstance.getDom().style.width = '90%';
                } else {
                    chartInstance.getDom().style.width = '100%';
                }
                chartInstance.resize();
            }, 300));
        },

        handleResize() {
            const windowWidth = window.innerWidth;
            console.log(windowWidth);
            let zoomLevel;
            if (window.innerWidth <= 480) {
                zoomLevel = 0.5; // Smaller zoom for mobile or zoomed-out browsers
            } else if (window.innerWidth <= 768) {
                zoomLevel = 0.8; // Medium zoom for tablets/small desktops
            } else if (window.innerWidth <= 1866) {
                zoomLevel = 1.2; // Adjust for medium to large screens
            } else {
                zoomLevel = 1.3; // Default zoom for larger screens
            }

            // Update the chart with the new zoom level
            this.renderChart(zoomLevel);
        },

        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },

        // animation modal
        expandDetail(id, index) {
            if (this.selectedCommodity === id) return; // Prevent unnecessary re-click

            this.selectedCommodity = id;

            this.$nextTick(() => {
                const commodityItems = Array.isArray(this.$refs.commodity)
                    ? this.$refs.commodity
                    : [this.$refs.commodity];

                const selectedItem = commodityItems[index];

                // Animate width change
                gsap.to(selectedItem, { width: "100%", duration: 0.5, ease: "power2.out" });

                // Hide other items
                commodityItems.forEach((item, i) => {
                    if (i !== index) {
                        gsap.to(item, {
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => {
                                item.style.display = "none";
                            },
                        });
                    }
                });

                gsap.to(selectedItem.querySelector(".w-100.position-relative"), {
                    minHeight: "80vh",
                    duration: 0.5,
                    ease: "power2.out",
                });

                gsap.to(selectedItem.querySelector(".detail-commodity"), {
                    opacity: 1,
                    duration: 1,
                });
            });
        },

        closeDetail() {
            if (this.selectedCommodity === null) return;

            this.$nextTick(() => {
                const commodityItems = Array.isArray(this.$refs.commodity)
                    ? this.$refs.commodity
                    : [this.$refs.commodity];

                const index = this.commodities2.findIndex(
                    (c) => c.id === this.selectedCommodity
                );
                const selectedItem = commodityItems[index];

                if (!selectedItem) {
                    console.warn("GSAP target not found: selectedItem is null.");
                    return;
                }
                gsap.to(selectedItem.querySelector(".w-100.position-relative"), {
                    minHeight: "auto",
                    duration: 0.2,
                    ease: "power2.out",
                });
                // Fade out details and collapse
                gsap.to(selectedItem.querySelector(".detail-commodity"), {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        this.selectedCommodity = null;

                        // Animate back to normal width
                        gsap.to(selectedItem, { width: "33.3333%", duration: 0.5 });

                        // Restore other items
                        commodityItems.forEach((item) => {
                            if (item) {
                                item.style.display = "block"; // Show all items again
                                gsap.to(item, { opacity: 1, duration: 0.5 });
                            }
                        });
                    },
                });
            });
        },


        async expandItem(index) {
            if (this.selectedIndex !== null) return; // Prevent multiple opens

            this.selectedIndex = index;
            this.loading = true;

            // Animate expansion
            this.$nextTick(() => {
                const selectedItem = this.$refs.items[index];

                // Hide other items
                this.$refs.items.forEach((item, i) => {
                    if (i !== index) {
                        gsap.to(item, {
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => {
                                item.style.display = "none";
                            }
                        });
                    }
                });
            });

            // Fetch data (simulate API delay)
            setTimeout(async () => {
                try {
                    setTimeout(() => {
                        this.commodityDetails = "This is a sample commodity description.";
                        this.loading = false;
                    }, 1000);

                } catch (error) {
                    this.commodityDetails = "Failed to fetch data.";
                }
                this.loading = false;

                // Fade in the details content
                this.$nextTick(() => {
                    const details = this.$refs.items[index].querySelector(".details");
                    gsap.fromTo(details, { opacity: 0 }, { opacity: 1, duration: 0.5 });
                });
            }, 1000);
        },

        closeItem() {
            if (this.selectedIndex === null) return;

            // Fade out details
            const index = this.selectedIndex;
            const selectedItem = this.$refs.items[index];

            // Fade out details and collapse
            gsap.to(selectedItem.querySelector(".details"), {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    this.selectedIndex = null;
                    this.commodityDetails = "";

                    // Restore other items
                    this.$refs.items.forEach((item) => {
                        item.style.display = "flex"; // Show all items again
                        gsap.to(item, { opacity: 1, duration: 0.5 });
                    });
                },
            });
        },
        getDateAcquired() {
            const months = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];
            const monthName = months[parseInt(6) - 1].toUpperCase();
            return `Update data terakhir : <span class="badge badge-outline-primary badge-primary">${monthName} 2024</span>`;
        },
    },
}
</script>
<style scoped>
.custom-col {
    flex: 0 0 20%;
    max-width: 20%;
}

@media (max-width: 768px) {
    .custom-col {
        flex: 0 0 100%;
        max-width: 100%;
        margin-bottom: 10px;
    }
}

.commodity-icon svg {
    max-height: 26px;
    width: auto;
    display: block;
    width: 100%;
}

::v-deep .title-component {
    display: none !important;
}

.fullmap-wrapper {
    width: 100%;
    position: relative;
    min-height: 200px;
    max-width: 1285px;
    align-items: center;
    justify-content: center;
    margin-bottom: 400px;
}

.fullmap-wrapper.single-wrapper {
    margin-bottom: 200px;
}

#city-map {
    width: 100%;
    height: 800px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* Allow absolute positioning within */
}

@media (max-width: 767.98px) {
    #city-map {
        width: 90%;
        /* Set width to 90% on small screens */
    }
}

.commodity-info a.counter {
    line-height: 50px;
    color: white;
    background: -webkit-linear-gradient(337deg, #4fc6e1 0%, #4fc6e1 19.37%, #1abc9c 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    padding: 0 2px;
}

.commodity-info>div:first-child a.counter {
    background: -webkit-linear-gradient(337deg, #F66451 0%, #F66451 19.37%, #b22010 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}

.commodity-info>div:last-child a.counter {
    background: -webkit-linear-gradient(337deg, #FEC95F 0%, #FEC95F 19.37%, #a06e0b 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}

.legend-map span.counter {
    line-height: 50px;
    color: white;
    background: -webkit-linear-gradient(337deg, #14D87A 0%, #14D87A 19.37%, #018947 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    padding: 0 2px;
}

.legend-map>div:first-child span.counter {
    background: -webkit-linear-gradient(337deg, #F66451 0%, #F66451 19.37%, #b22010 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}

.legend-map>div:last-child span.counter {
    background: -webkit-linear-gradient(337deg, #FEC95F 0%, #FEC95F 19.37%, #a06e0b 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}

/* Add this to your component's <style scoped> section */
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

.multiline-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* Number of lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 140px;
}

.no-ellipsis {
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    overflow: visible;
    max-width: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.commodity-item {
    transition: all 0.5s ease;
}

.commodity-item.active {
    cursor: default;
}

.content {
    text-align: center;
}

.details {
    padding: 10px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
}

.close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
}
</style>