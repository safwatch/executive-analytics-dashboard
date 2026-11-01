<script>
import SimpleShimmer from "simple-shimmer";


export default {
    components: {
        SimpleShimmer,
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
    <simple-shimmer :style="{height:'350px', width:'80px', borderRadius:'8px'}"/>
        <!-- <highcharts :options="chartOptions"></highcharts> -->
    </section>
</template>
