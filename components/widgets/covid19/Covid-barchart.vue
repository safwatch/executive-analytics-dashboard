<script>
// import {
//     Bar
// } from 'vue-chartjs'

// import HighchartsVue from 'highcharts-vue'

// export default {
//     extends: Bar,
//     mounted() {
//         this.renderChart({
//             labels: [
//                 'Melong',
//                 'Cibeureum',
//                 'Cibeber',
//                 'Leuwigajah',
//                 'Utama',
//                 'Baros',
//                 'Cigugur Tengah',
//                 'Karangmekar',
//                 'Setiamanah',
//                 'Padasuka',
//                 'Civic',
//                 'Cibabat',
//                 'Citeureup',
//                 'Pasirkaliki',
//                 'Cipageran',
//                 'Luar Kota',
//             ],
//             datasets: [{
//                     barPercentage: 0.7,
//                     categoryPercentage: 0.5,
//                     label: 'Sembuh',
//                     backgroundColor: '#1abc9c',
//                     borderColor: '#1abc9c',
//                     hoverBackgroundColor: '#1abc9c',
//                     hoverBorderColor: '#1abc9c',
//                     data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81, 65, 59, 80, 81],
//                 },
//                 {
//                     barPercentage: 0.7,
//                     categoryPercentage: 0.5,
//                     label: 'Konfirmasi Aktif',
//                     backgroundColor: '#f7b84b',
//                     borderColor: '#f7b84b',
//                     hoverBackgroundColor: '#f7b84b',
//                     hoverBorderColor: '#f7b84b',
//                     data: [56, 59, 80, 81, 56, 89, 65, 59, 80, 40, 32, 65, 59, 80, 65, 59],
//                 },
//                 {
//                     barPercentage: 0.7,
//                     categoryPercentage: 0.5,
//                     label: 'Meninggal',
//                     backgroundColor: '#f1556c',
//                     borderColor: '#f1556c',
//                     hoverBackgroundColor: '#f1556c',
//                     hoverBorderColor: '#f1556c',
//                     data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59, 89, 40, 65, 59],
//                 },
//             ],
//         }, {
//             responsive: true,
//             maintainAspectRatio: false,
//             legend: {
//                 display: true,
//             },
//             scales: {
//                 yAxes: [{
//                     gridLines: {
//                         display: false,
//                     },
//                     stacked: false,
//                     ticks: {
//                         stepSize: 20,
//                     },
//                 }, ],
//                 xAxes: [{
//                     stacked: false,
//                     gridLines: {
//                         color: 'rgba(0,0,0,0.01)',
//                     },
//                 }, ],
//             },
//         })
//     },
// }

 
// const data = {
   
//     chart: {
//         type: "column"
//     },
//     title: {
//         text: ""
//     },
//     xAxis: {
//         categories: [
//             'Melong',
//             'Cibeureum',
//             'Cibeber',
//             'Leuwigajah',
//             'Utama',
//             'Baros',
//             'Cigugur Tengah',
//             'Karangmekar',
//             'Setiamanah',
//             'Padasuka',
//             'Civic',
//             'Cibabat',
//             'Citeureup',
//             'Pasirkaliki',
//             'Cipageran',
//             'Luar Kota',
//         ],
//         crosshair: true
//     },
//     yAxis: {
//         min: 0,
//         title: {
//             text: 'Jumlah Kasus'
//         }
//     },
//     tooltip: {
//         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//             '<td style="padding:0"><b>{point.y:.1f} kasus</b></td></tr>',
//         footerFormat: '</table>',
//         shared: true,
//         useHTML: true
//     },
//     plotOptions: {
//         column: {
//             pointPadding: 0.2,
//             borderWidth: 0
//         }
//     },
//     series: [{
//         name: 'Sembuh',
//         data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81, 65, 59, 80, 81],
//         color: '#88CA63'

//     }, {
//         name: 'Konfirmasi Aktif',
//         data: [56, 59, 80, 81, 56, 89, 65, 59, 80, 40, 32, 65, 59, 80, 65, 59],
//         color: '#FBE05A'

//     }, {
//         name: 'Meninggal',
//         data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59, 89, 40, 65, 59],
//         color: '#D84542'

//     }]
// };

export default {
    props: {
        categories:{
            type: Array,
            default: () => [],
            required: true,
        },
        title: {
            type: String,
            // required: true,
        },
        series: {
            type: Array,
            default: () => [],
        },
       
    },

    components: {
        // HighchartsVue
    },
    mounted() {
        this.pushToChartOption(this.categories, this.series);
        // console.log('charti',this.chartOptions.xAxis.series);
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: "column"
                },
                title: {
                    text: "Jumlah Kasus"
                },
                xAxis: {
                    categories :[],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    // tickInterval: 5,
                    title: {
                        text: 'Jumlah Kasus'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} kasus</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        borderWidth: 3,
                        dataLabels: {
                            enabled: true,
                            format: '<span style="font-weight:normal;">{point.y}</span>'
                        }
                    }
                },
                series: [],
                exporting: {
                    buttons: {
                        contextButton: {
                            menuItems: ['viewFullscreen', 'downloadPNG', 'downloadJPEG', 'downloadPDF']
                        }
                    }
                },
            }
        };
    },
    methods: {
            pushToChartOption(categories, series) {
                this.chartOptions.series = series;
                this.chartOptions.xAxis.categories = categories;

                // console.log('chartu', this.chartOptions.xAxis);
                
            }
        },
        
};
</script>

<template>
  <section class="charts">
        <highcharts :options="chartOptions"></highcharts>
    </section>
</template>
