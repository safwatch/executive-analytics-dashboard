<script>
import HighchartsVue from 'highcharts-vue'

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
        HighchartsVue
    },
    mounted() {
        this.pushToChartOption(this.categories, this.series);
        // console.log('charti',this.series);
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: "line"
                },
                title: {
                    text: ""
                },
                xAxis: {
                    categories: [
                        // '2020',
                        // '2021',
                        // '2022',
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Jumlah Orang'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} pengaduan</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [
                //     {
                //     name: 'Layak',
                //     data: [165, 493, 639],
                //     color: '#88CA63'}, 
                //     {
                //         name: 'Tidak Layak',
                //         data: [81, 256, 281],
                //         color: '#D84542'
                //    }
            ]
            }
        };
    },
    methods: {
            pushToChartOption(categories, series) {
                this.chartOptions.series = series;
                this.chartOptions.xAxis.categories = categories;                
            }
        },
};
</script>

<template>
  <section class="charts">
        <highcharts :options="chartOptions"></highcharts>
    </section>
</template>
