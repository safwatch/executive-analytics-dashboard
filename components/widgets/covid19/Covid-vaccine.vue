<script>

import Highcharts from "highcharts";
import HighchartsVue from 'highcharts-vue'

const data = {
    chart: {
        type: "column"
    },
    title: {
        text: ""
    },
    xAxis: {
        categories: [
            'Tenaga Kesehatan',
            'Petugas Publik',
            'Lansia',
            'Masyarakat',
            'Remaja',
            'Anak-Anak',
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
            '<td style="padding:0"><b>{point.y:.1f} kasus</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Dosis 1',
        data: [65, 59, 80, 81, 56, 89],
        color: '#FBE05A'

    }, {
        name: 'Dosis 2',
        data: [56, 59, 80, 81, 56, 89],
        color: '#4285f4'

    }, {
        name: 'Dosis 3',
        data: [89, 40, 32, 65, 59, 80],
        color: '#88CA63'

    }]
};

export default {
    components: {
        HighchartsVue
    },
    data() {
        return {
            chartOptions: data
        };
    }
};
</script>

<template>
  <section class="charts">
        <highcharts :options="chartOptions"></highcharts>
    </section>
</template>
