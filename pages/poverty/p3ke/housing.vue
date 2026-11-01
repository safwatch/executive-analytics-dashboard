<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

import SumberListrikLMap from "./leaflet/SumberListrik.vue";
import FasilitasBabLMap from "./leaflet/FasilitasBab.vue";

import HousingRutilahuAgGrid from "./ag-grid/rutilahu-grid.vue";
import HousingSumberListrikAgGrid from "./ag-grid/sumberlistrik-grid.vue";
import HousingFasilitasBabUmumAgGrid from "./ag-grid/fasilitasBabBersama-grid.vue";
import HousingFasilitasBabBukanSendiriUmumAgGrid from "./ag-grid/fasilitasBabBukanPribadiUmum-grid.vue";

const SampeuColors = [
    '#FF8C00', // Dark orange
    '#FFD700', // Gold
    '#3b82f6', // Dodger blue
    '#32CD32', // Lime green
    '#fc719e', // Hot pink
    // '#fde725', // Dark orange
    // '#dde318', // Gold
    // '#bade28', // Dodger blue
    // '#95d840', // Lime green
    // '#75d054
];
// get monochrome of colors
const colorsOrange = Highcharts.getOptions().colors.map((c, i) =>
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    Highcharts.color('#FEB56A')
        .brighten((i - 0.5) / 7)
        .get()
);

const colorsRed = Highcharts.getOptions().colors.map((c, i) =>
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    Highcharts.color('#d73027')
        .brighten((i - 0.9) / 7)
        .get()
);

// data berdasarkan jenis lantai, dinding & genteng
const data1 = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: processCategories([
            'GENTENG',
            'ASBES/SENG',
            'BETON',
            'LAINNYA',
            'KAYU/SIRAP',
            'JERAMI/IJUK/RUMBIA/DAUN-DAUNAN',
            'BAMBU'
        ]),
        title: {
            text: ''
        },
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Jumlah Rumah Kepala Keluarga',
            align: 'high',
        },
    },
    tooltip: {
        valueSuffix: ' Rumah Kepala Keluarga'
    },
    plotOptions: {
        bar: {
            pointWidth: 40,
            borderRadius: 0, // This ensures bars have no rounded corners
            dataLabels: {
                enabled: true,
                formatter: function () {
                    const color = parseFloat(this.point.options.percentage) < 10 ? '#F1546C' : 'black';
                    // const color = this.series.data.indexOf(this.point) >= this.series.data.length - 4 ? 'red' : 'black';
                    return `<span style="color: ${color};"><b>${this.y}</b><br/>(${this.point.options.percentage}%)</span>`;
                    // Format label to show percentage value from the point's userOptions
                    // return `<b>${this.y}</b> <br/> (${this.point.options.percentage}%)`;
                },
                // align: 'right',
                // inside: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 0,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Jumlah Rumah',
        data: [
            { y: 39215, percentage: '80.80', color: parseFloat('80.80') < 10 ? '#F1546C' : null },
            { y: 5832, percentage: '12.02', color: parseFloat('12.02') < 10 ? '#F1546C' : null },
            { y: 3403, percentage: '7.01', color: parseFloat('7.01') < 10 ? '#F1546C' : null },
            { y: 50, percentage: '0.10', color: parseFloat('0.10') < 10 ? '#F1546C' : null },
            { y: 25, percentage: '0.05', color: parseFloat('0.05') < 10 ? '#F1546C' : null },
            { y: 4, percentage: '0.01', color: parseFloat('0.01') < 10 ? '#F1546C' : null },
            { y: 3, percentage: '0.01', color: parseFloat('0.01') < 10 ? '#F1546C' : null }
        ]
    }]
}
const data2 = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Tembok', 'Kayu/Papan', 'Bambu', 'Lainnya', 'Seng'],
        title: {
            text: ''
        },
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Jumlah Rumah Kepala Keluarga',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' Rumah Kepala Keluarga'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 0,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Jumlah Rumah',
        data: [48028, 290, 146, 65, 3]
    }]
}
const data3 = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: processCategories(['Keramik/Granit/Marmer/Ubin/Tegel/Teraso', 'Semen', 'Kayu/Papan', 'Tanah', 'Lainnya', 'Bambu']),
        title: {
            text: ''
        },
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Jumlah Rumah Kepala Keluarga',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' Rumah Kepala Keluarga'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 0,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Jumlah Rumah',
        data: [44681, 3600, 153, 61, 28, 9]
    }]
}

// data berdasarkan sumber penerangan
const data4 = {
    chart: {
        type: 'pie',
        events: {
            render: function () {
                if (!this.centerLabel) {
                    this.centerLabel = this.renderer.label('')
                        .addClass('center-label')
                        .attr({
                            zIndex: 5
                        })
                        .add();
                }
                var total = this.series[0].data.reduce((sum, point) => sum + point.y, 0);
                this.centerLabel.attr({
                    text: `Total:<br><span style="font-size:1.5em">${total}</span>`,
                    x: this.plotLeft + (this.plotWidth * 0.5),
                    y: this.plotTop + (this.plotHeight * 0.5) - 28,
                    align: 'center'
                });
            }
        }
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: colorsOrange,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y} <br/> {point.percentage:.2f} %',
                connectorColor: 'silver'
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Persentase',
        colorByPoint: true,
        data: [
            { name: 'CIMAHI SELATAN', y: 15, percentage: 62.50, },
            { name: 'CIMAHI UTARA', y: 5, percentage: 20.83, },
            { name: 'CIMAHI TENGAH', y: 4, percentage: 16.67, }
        ]
    }]
}

// data berdasarkan fasilitas BAB
const data5 = {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['CIMAHI SELATAN', 'CIMAHI TENGAH', 'CIMAHI UTARA']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Jumlah Fasilitas Buang Air Besar'
        },
        labels: {
            formatter: function () {
                return Highcharts.numberFormat(this.value, 0, ',', '.');
            }
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            },
            formatter: function () {
                // Format number with thousand separator
                return Highcharts.numberFormat(this.total, 0, ',', '.');
            }
        }
    },
    tooltip: {
        formatter: function () {
            let s = `<b>${this.x}</b>`;
            this.points.forEach(function (point) {
                s += `<br/>${point.series.name}: ${Highcharts.numberFormat(point.y, 0, ',', '.')}`;
            });
            return s;
        },
        shared: true
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    // Use Highcharts.numberFormat to add thousand separators
                    return Highcharts.numberFormat(this.y, 0, ',', '.');
                }
            }
        },
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Kosong',
        data: [290, 135, 116] // Replace with your actual data
    }, {
        name: 'Lainnya',
        data: [4781, 3094, 1336] // Replace with your actual data
    }, {
        name: 'Milik sendiri',
        data: [14216, 9483, 10464]
    }, {
        name: 'Umum/Bersama',
        data: [2013, 1608, 996] // Replace with your actual data
    }]
}

// data berdasarkan Bahan Bakar Memasak
const data6 = {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['CIMAHI SELATAN', 'CIMAHI TENGAH', 'CIMAHI UTARA']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Jumlah Rumah Tangga'
        },
        stackLabels: {
            enabled: false // Not using stacking in a grouped chart
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} households</b></td></tr>',
        footerFormat: '</table>',
        shared: false,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.15,
            groupPadding: 0.05,
            borderWidth: 0,
            grouping: true, // This enables grouping
            dataLabels: {
                enabled: true
            },
            borderRadius: 0
            ,
            borderWidth: 0,
            grouping: true, // This enables grouping
            dataLabels: {
                enabled: true
            },
            borderRadius: 0
        }
    },
    colors: SampeuColors,
    series: [{
        name: 'Arang/Kayu',
        data: [48, 28, 32] // Example data for each sub-district
    }, {
        name: 'Lainnya',
        data: [37, 29, 13] // Example data for each sub-district
    }, {
        name: 'Minyak Tanah',
        data: [34, 28, 10] // Example data for each sub-district
    }]
}

// data berdasarkan Sumber Air Minum Masyarakat
const data7 = {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['CIMAHI SELATAN', 'CIMAHI TENGAH', 'CIMAHI UTARA']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Jumlah Fasilitas Buang Air Besar'
        },
        labels: {
            formatter: function () {
                return Highcharts.numberFormat(this.value, 0, ',', '.');
            }
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            },
            formatter: function () {
                // Format number with thousand separator
                return Highcharts.numberFormat(this.total, 0, ',', '.');
            }
        }
    },
    legend: {
        align: 'left',      // Aligns the legend to the right side of the chart
        verticalAlign: 'top', // Positions the legend at the top of the chart
        layout: 'vertical',   // Arranges the legend items vertically
        x: 70,                // Horizontal offset from the align position
        y: 20,              // Vertical offset from the verticalAlign position
        floating: true,      // Allows the legend to float over the chart
        borderWidth: 1,      // Border width for the legend
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white', // Legend background color
        shadow: false,        // Adds a shadow effect to the legend
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        },
        itemHoverStyle: {
            color: '#FF0000' // Color when hovered
        },
        itemHiddenStyle: {
            color: '#CCCCCC' // Color when item is hidden
        }
    },
    tooltip: {
        formatter: function () {
            let s = `<b>${this.x}</b>`;
            this.points.forEach(function (point) {
                s += `<br/>${point.series.name}: ${Highcharts.numberFormat(point.y, 0, ',', '.')}`;
            });
            return s;
        },
        shared: true
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    // Use Highcharts.numberFormat to add thousand separators
                    return Highcharts.numberFormat(this.y, 0, ',', '.');
                }
            }
        },
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    colors: SampeuColors,
    series: [{
        name: 'LAINNYA',
        data: [74, 58, 160]
    },
    {
        name: 'SUMUR TIDAK TERLINDUNG',
        data: [108, 91, 86]
    },
    {
        name: 'AIR PERMUKAAN (SUNGAI, DANAU, DLL)',
        data: [5, 4, 3]
    }]
}
export default {
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
        }
    },
    components: {
        HighchartsVue,
        SumberListrikLMap,
        FasilitasBabLMap,
        HousingRutilahuAgGrid,
        HousingSumberListrikAgGrid,
        HousingFasilitasBabUmumAgGrid,
        HousingFasilitasBabBukanSendiriUmumAgGrid
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.getCizitenHousingRoofType();
            }
            console.log(Highcharts.getOptions().colors);
        });
    },
    data() {
        return {
            moduleId: 'citizen_housing',
            permissionIndex: false,
            title: 'Kondisi Perumahan Warga',
            items: [{
                text: 'Sampeu',
                href: '/',
            },
            {
                text: 'Kemiskinan',
                href: '/',
            },
            {
                text: 'Kondisi Perumahan Warga',
                active: true,
            },
            ],
            citizenRoofTypeLoading: true,
            chartOptions1: data1,
            chartOptions2: data2,
            chartOptions3: data3,
            chartOptions4: data4,
            chartOptions5: data5,
            chartOptions6: data6,
            chartOptions7: data7,
        }
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        getCizitenHousingRoofType() {
            console.log('get all roof type');
            this.citizenRoofTypeLoading = false;
        },
    },
    middleware: "router-auth"
}
function processCategories(categories) {
    console.log('called categories formater');
    return categories.map(category => {
        // Split the category by slashes
        const parts = category.split('/');
        if (parts.length > 2) {
            // Rejoin the first two parts with a slash, add a line break, then join the rest
            return parts.slice(0, 2).join('/') + '/<br/>' + parts.slice(2).join('/');
        }
        return category;
    });
}
</script>

<style>
.center-label {
    text-align: center;
    vertical-align: middle;
}
</style>

<template>
    <div>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="mt-1 mb-3">SEBARAN KONDISI RUMAH PENDUDUK BERDASARKAN JENIS ATAP <br />(POPULASI
                                DATA
                                P3KE
                                TAHUN 2023)</h6>
                            <div class="avatar-sm ml-5">
                                <span class="avatar-title bg-soft-primary rounded">
                                    <svg id="Roof" data-name="Roof" width="24" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 30 15.68">
                                        <defs>
                                            <style>
                                                .cls-1 {
                                                    fill: #000;
                                                }
                                            </style>
                                        </defs>
                                        <title>roof (2)</title>
                                        <path class="cls-1"
                                            d="M522,553.2c.36-.66.62-1.38.92-2.07q1.92-4.43,3.82-8.87a3.07,3.07,0,0,1,1.51-1.64c.31-.15.56-.11.69.12a.44.44,0,0,1-.25.64,2.42,2.42,0,0,0-1.2,1.37c-.19.5-.42,1-.65,1.52a4.26,4.26,0,0,1,4.28.52l.79-3.66h-1.36a1.22,1.22,0,0,1-.27,0,.41.41,0,0,1-.37-.42.41.41,0,0,1,.38-.44H544a3.65,3.65,0,0,1,2.14.65,2.69,2.69,0,0,1,1,1.21q2.36,5.46,4.72,10.93a1.33,1.33,0,0,1,.1.48c0,.46,0,.92,0,1.38a.72.72,0,0,1-.41.69.65.65,0,0,1-.76-.12,4.58,4.58,0,0,0-2.25-1.1.44.44,0,0,1-.39-.55c.06-.25.3-.36.61-.3a5.08,5.08,0,0,1,2.32,1.05v-1c0-.1-.09-.15-.15-.21a4.2,4.2,0,0,0-6.07,0c-.47.48-.63.63-1.22,0a4.19,4.19,0,0,0-6.23.15c-.35.4-.55.39-.95,0a4.2,4.2,0,0,0-6-.28c-.13.12-.25.25-.37.38-.27.3-.52.31-.78,0a4.35,4.35,0,0,0-1.7-1.21,4.2,4.2,0,0,0-4.64,1,.3.3,0,0,0-.11.25v.88c.32-.2.61-.41.93-.57a5.08,5.08,0,0,1,5.71.82c.15.14.23.14.39,0a5.08,5.08,0,0,1,6.91,0c.13.12.2.14.35,0a5.07,5.07,0,0,1,6.93,0c.15.14.22.13.37,0a4.91,4.91,0,0,1,2.15-1.19c.31-.08.55,0,.63.24s0,.49-.36.59a4.65,4.65,0,0,0-2,1.16c-.46.45-.78.44-1.25,0a4.23,4.23,0,0,0-6,0,1,1,0,0,1-.55.36.89.89,0,0,1-.76-.34,4.22,4.22,0,0,0-6,0c-.54.53-.83.53-1.36,0a4.23,4.23,0,0,0-5.69-.21c-.27.23-.53.43-.92.29-.21-.08-.29-.28-.43-.42Zm1.59-1.39a5.22,5.22,0,0,1,5.88.63c.18-.85.35-1.67.54-2.49a.51.51,0,0,0-.16-.53,3.8,3.8,0,0,0-4.14-.63,2.54,2.54,0,0,0-1.48,1.51C524,550.8,523.79,551.28,523.57,551.81Zm20.94.63a5.26,5.26,0,0,1,5.88-.64c-.34-.76-.64-1.46-.95-2.16a.2.2,0,0,0-.08-.08,3.79,3.79,0,0,0-5.3-.07.35.35,0,0,0-.11.38C544.14,550.72,544.32,551.56,544.51,552.44Zm-7.09-.16a5.17,5.17,0,0,1,6.05-.24.12.12,0,0,0,0-.14l-.45-2.09a.52.52,0,0,0-.14-.25,3.79,3.79,0,0,0-5.35,0,.33.33,0,0,0-.13.25Zm-.92,0c.06-.06,0-.13,0-.19,0-.73,0-1.45,0-2.17a.46.46,0,0,0-.17-.38,3.66,3.66,0,0,0-3.92-.84,2.16,2.16,0,0,0-1.72,1.94,10,10,0,0,1-.3,1.44C533.07,550.83,533.93,550.86,536.5,552.25Zm-6.23-3.62c.19-.91.37-1.76.57-2.62a.33.33,0,0,0-.13-.37,3.13,3.13,0,0,0-2.9-.76,2.41,2.41,0,0,0-1.95,1.61c-.09.27-.23.53-.35.8s-.18.45-.3.73A4.77,4.77,0,0,1,530.27,548.63Zm18.48-.61-.9-2.1a.61.61,0,0,0-.1-.14,3.24,3.24,0,0,0-4.55-.1c-.06.06-.13.11-.11.22.2.9.39,1.8.6,2.73A4.77,4.77,0,0,1,548.75,548Zm-12.21.44c0-.8,0-1.56,0-2.32a.63.63,0,0,0-.24-.55,3.19,3.19,0,0,0-3.45-.52,1.67,1.67,0,0,0-1.24,1.47,3.36,3.36,0,0,1-.13.63c-.07.35-.14.7-.22,1.07C533.65,547.28,534.57,547.32,536.54,548.46Zm6.17-.2c-.18-.82-.35-1.58-.51-2.34a.41.41,0,0,0-.15-.21,3.24,3.24,0,0,0-4.45-.06.54.54,0,0,0-.19.43c0,.47,0,.94,0,1.41v1A4.8,4.8,0,0,1,542.71,548.26Zm-6.22-3.63a.78.78,0,0,0,0-.07c0-1.1,0-2.19,0-3.28,0-.15-.07-.15-.18-.15H533c-.15,0-.19,0-.21.19-.13.64-.28,1.28-.41,1.91-.09.4-.17.8-.27,1.25a4.16,4.16,0,0,1,4.42.15Zm.93,0a4.24,4.24,0,0,1,4.46-.19c-.23-1.11-.46-2.17-.69-3.22,0-.15-.14-.11-.22-.11h-3.34c-.2,0-.22.07-.22.23,0,.59,0,1.17,0,1.76Zm9.72-.38c-.3-.69-.57-1.34-.87-2a2,2,0,0,0-1.36-1.06,15.77,15.77,0,0,0-2.84-.13l.79,3.67A4.25,4.25,0,0,1,547.14,544.27Z"
                                            transform="translate(-521.98 -540.25)" />
                                    </svg>
                                    <!-- <img src="~/assets/images/housing/roof.svg" alt="Roof" class="img-responsive"/> -->
                                </span>
                            </div>
                        </div>
                        <section class="charts">
                            <highcharts :options="chartOptions1"></highcharts>
                        </section>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="mt-1 mb-3">SEBARAN KONDISI RUMAH PENDUDUK BERDASARKAN JENIS DINDING
                                <br />(POPULASI
                                DATA
                                P3KE
                                TAHUN 2023)</h6>
                            <div class="avatar-sm ml-5">
                                <span class="avatar-title bg-soft-primary rounded">
                                    <!-- <img src="~/assets/images/housing/roof.svg" alt="Roof" class="img-responsive"/> -->
                                    <svg id="wall" data-name="wall" width="24" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 30 24.75">
                                        <defs>
                                            <style>
                                                .cls-1 {
                                                    fill: #040404;
                                                }
                                            </style>
                                        </defs>
                                        <title>brick</title>
                                        <path class="cls-1"
                                            d="M471.71,565.4a1,1,0,0,1,1-.48h14.47c.34,0,.55.18.55.44s-.21.44-.55.44h-4.54c-.27,0-.32.07-.31.32,0,1.09,0,2.19,0,3.28,0,.21,0,.3.27.29,2.77,0,5.53,0,8.29,0,.2,0,.27,0,.26-.25,0-1.13,0-2.27,0-3.4,0-.18,0-.25-.24-.24h-1.72a.51.51,0,0,1-.52-.25.42.42,0,0,1,.36-.62c.79,0,1.58,0,2.37,0a.63.63,0,0,1,.62.68c0,.54,0,1.08,0,1.61,0,.74,0,1.47,0,2.2,0,.2.05.26.26.26,1.2,0,2.4,0,3.6,0,.79,0,1,.2,1,1,0,1.16,0,2.32,0,3.48,0,.25,0,.33.32.33,1.22,0,2.44,0,3.66,0,.65,0,.89.24.89.88v3.89c0,.63-.24.88-.87.88h-3.72c-.2,0-.28,0-.28.27,0,1.12,0,2.25,0,3.37,0,.21.05.28.27.28h3.72c.63,0,.88.25.88.86v3.93c0,.6-.25.86-.85.86h-28.3a.9.9,0,0,1-.85-.48V582.8s.06,0,.07,0a.43.43,0,0,1,.52-.16.46.46,0,0,1,.29.49c0,.24,0,.47,0,.7s0,.24.22.24h3.55c.19,0,.22-.07.22-.24q0-1.72,0-3.45c0-.19-.06-.23-.24-.23h-2.81c-.3,0-.7-.11-.87,0s0,.58-.06.89,0,.47-.29.58-.44-.06-.59-.24Zm10.16,9.07H486c.25,0,.31-.07.3-.31,0-1.1,0-2.21,0-3.31,0-.22,0-.3-.28-.3q-4.14,0-8.29,0c-.23,0-.26.08-.26.28,0,1.13,0,2.25,0,3.37,0,.23.07.27.28.27Zm9.67-3.9h-4.1c-.25,0-.3.08-.3.31,0,1.11,0,2.21,0,3.31,0,.22,0,.3.29.3h8.28c.23,0,.27-.08.26-.28,0-1.12,0-2.25,0-3.37,0-.23-.07-.27-.28-.27ZM481.87,584H486c.19,0,.27,0,.27-.25,0-1.14,0-2.29,0-3.43,0-.2-.07-.24-.25-.24h-8.34c-.21,0-.24.07-.24.25,0,1.13,0,2.27,0,3.4,0,.22.06.27.28.27Zm9.68,0h4.19c.17,0,.24,0,.23-.23v-3.48c0-.17-.06-.21-.21-.21h-8.38c-.2,0-.24.07-.24.25,0,1.13,0,2.25,0,3.37,0,.25.08.3.32.3ZM477,569.69c1.38,0,2.76,0,4.13,0,.22,0,.3,0,.3-.28,0-1.11,0-2.22,0-3.34,0-.21-.05-.27-.27-.27h-8.32c-.2,0-.26,0-.26.25,0,1.12,0,2.24,0,3.37,0,.24.09.27.3.27C474.25,569.68,475.63,569.69,477,569.69Zm0,5.66h-4.22c-.19,0-.24,0-.24.24q0,1.71,0,3.42c0,.18,0,.23.23.23h8.37c.19,0,.25,0,.25-.24q0-1.69,0-3.39c0-.21-.06-.26-.26-.26Zm19.39,3.89h4.12c.24,0,.29-.06.28-.29q0-1.68,0-3.36c0-.19,0-.24-.24-.24h-8.34c-.2,0-.26,0-.26.26,0,1.12,0,2.24,0,3.36,0,.23.07.27.28.27ZM477,588.79h4.19c.2,0,.26,0,.26-.26q0-1.68,0-3.36c0-.23-.06-.27-.28-.27h-8.31c-.21,0-.26.05-.26.25,0,1.13,0,2.25,0,3.37,0,.22.05.27.27.27Zm19.42,0h4.19c.18,0,.25,0,.24-.23,0-1.14,0-2.29,0-3.43,0-.19-.06-.23-.24-.23h-8.34c-.21,0-.26.06-.26.26,0,1.11,0,2.22,0,3.34,0,.25.08.29.31.29Zm-9.68-13.44h-4.16c-.2,0-.27,0-.26.25q0,1.7,0,3.39c0,.22.06.25.26.25h8.28c.21,0,.29,0,.28-.26,0-1.12,0-2.25,0-3.37,0-.23-.07-.26-.28-.26Zm0,9.55h-4.19c-.21,0-.25.05-.25.25,0,1.14,0,2.27,0,3.4,0,.19.05.24.24.24h8.34c.2,0,.24,0,.24-.24,0-1.13,0-2.27,0-3.4,0-.2-.05-.25-.26-.25ZM474.6,570.57h-1.78c-.17,0-.24,0-.24.22q0,1.74,0,3.48c0,.17.05.22.21.22h3.57c.17,0,.21-.06.21-.22q0-1.74,0-3.48c0-.17-.05-.22-.21-.22Z"
                                            transform="translate(-471.71 -564.92)" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <section class="charts">
                            <highcharts :options="chartOptions2"></highcharts>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-8 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="mt-1 mb-3">SEBARAN KONDISI RUMAH PENDUDUK BERDASARKAN JENIS LANTAI (POPULASI DATA
                                P3KE
                                TAHUN 2023)</h6>
                            <div class="avatar-sm ml-5">
                                <span class="avatar-title bg-soft-primary rounded">
                                    <!-- <img src="~/assets/images/housing/roof.svg" alt="Roof" class="img-responsive"/> -->
                                    <svg id="Tile" data-name="tile" width="22" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 30 30">
                                        <defs>
                                            <style>
                                                .cls-1 {
                                                    fill: #020202;
                                                }
                                            </style>
                                        </defs>
                                        <title>floor (1)</title>
                                        <path class="cls-1"
                                            d="M470.19,592V565.51c0-.41.19-.65.52-.64s.51.23.51.64q0,14.36,0,28.7c0,.47-.18.65-.64.65h-28.7c-.48,0-.65-.18-.65-.67V565.55c0-.44.17-.68.5-.68s.53.23.53.69v26.49c.11-.06.13-.16.17-.23,1.28-2.57,2.56-5.13,3.85-7.7a1.17,1.17,0,0,0,.12-.52V569.7c0-.46.18-.7.52-.7s.51.25.51.69v2.58c0,3.62,0,7.24,0,10.86,0,.26,0,.36.33.36H464.7c.28,0,.32-.08.32-.34V569.8c0-.1,0-.21,0-.32a.52.52,0,0,1,.52-.48.51.51,0,0,1,.51.49c0,.1,0,.21,0,.32v13.77a1.14,1.14,0,0,0,.13.55L470,591.8l.13.24Zm-20.54,1.8h5.83c.15,0,.24,0,.23-.2,0-.68,0-1.35,0-2,0-.14,0-.18-.18-.18h-5.1c-.1,0-.19,0-.22.13C450,592.3,449.84,593.05,449.65,593.83Zm10.13,0h2.74c.21,0,.29,0,.23-.25-.18-.65-.34-1.29-.49-1.94,0-.17-.1-.22-.28-.22h-5c-.18,0-.21.06-.21.22,0,.64,0,1.29,0,1.93,0,.22.06.27.27.26Zm-17.2,0h5.75c.1,0,.23.07.28-.12.18-.76.37-1.51.57-2.29h-5.24a.19.19,0,0,0-.21.11Zm27.28,0c-.39-.8-.77-1.55-1.15-2.31,0-.12-.15-.1-.24-.1h-5c-.16,0-.2,0-.16.2.18.64.34,1.29.48,1.93,0,.22.13.29.36.29,1.64,0,3.27,0,4.91,0Zm-10.53-3.44h2.35c.21,0,.27,0,.21-.25-.17-.65-.34-1.31-.49-2,0-.17-.12-.22-.29-.22H457c-.21,0-.24.08-.24.26,0,.63,0,1.25,0,1.88,0,.23,0,.31.3.3C457.8,590.37,458.56,590.39,459.33,590.39Zm-6.24,0h2.39c.18,0,.24,0,.24-.23,0-.66,0-1.32,0-2,0-.19-.06-.24-.24-.24h-4.13c-.2,0-.26.08-.3.25-.15.64-.31,1.29-.48,1.93-.06.21,0,.26.19.26Zm-8.79,0h5c.15,0,.2-.07.23-.2.16-.66.32-1.33.5-2,.05-.2,0-.23-.2-.23h-4.1a.25.25,0,0,0-.26.13Zm23.85,0L467,588.05c-.06-.12-.16-.09-.25-.09h-4.1c-.21,0-.23.07-.18.25.17.63.33,1.26.48,1.9.05.21.12.3.36.29h4.85Zm-14.61-3.46h1.91c.18,0,.27,0,.26-.23q0-1,0-2c0-.18-.06-.21-.22-.2H452.2c-.18,0-.25.06-.28.22-.16.66-.32,1.32-.49,2-.06.2,0,.23.18.23Zm7.54,0c-.19-.77-.38-1.51-.56-2.25,0-.13-.09-.16-.22-.16h-3.36c-.19,0-.2.08-.2.23,0,.65,0,1.29,0,1.94,0,.19,0,.26.24.25h4.1Zm-15,0,.09,0h4c.18,0,.21-.07.25-.22.15-.65.32-1.29.49-1.94.07-.23,0-.26-.22-.26-.92,0-1.83,0-2.75,0a.83.83,0,0,0-.95.6C446.68,585.71,446.35,586.29,446.05,586.88Zm15.49-2.36c.18.74.37,1.45.54,2.17,0,.21.13.24.32.24h3.78c.06,0,.15,0,.2-.06l-1.1-2.21a.21.21,0,0,0-.22-.13Z"
                                            transform="translate(-441.23 -564.86)" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <section class="charts">
                            <highcharts :options="chartOptions3"></highcharts>
                        </section>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h6 class="mt-1 mb-3">DATA RUMAH TIDAK LAYAK HUNI</h6>
                        <section class="jumbotron p-3 mb-0">
                            <h1 class="mt-0">2</h1>
                            <div class="col-xl-12 mt-3 mt-xl-0 p-0">
                                <h6 class="header-title">Filter Kondisi Rumah</h6>
                                <p class="sub-header mb-1" style="font-size:12px;">Setelah melalui beberapa filter maka
                                    didapatkan data berikut</p>
                                <ol style="font-size:12px;">
                                    <li>Jenis Lantai (jenis_lantai) : TANAH, BAMBU, KAYU/PAPAN</li>
                                    <li>Jenis Dinding (jenis_dinding) : BAMBU, KAYU/PAPAN</li>
                                    <li>Jenis Atap (jenis_atap) : BAMBU, KAYU/SIRAP, JERAMI/IJUK/RUMBIA/ DAUN-DAUNAN
                                    </li>
                                    <li>
                                        Desil
                                        <ul>
                                            <li>1 - 4</li>
                                        </ul>
                                    </li>
                                    <li>Pekerjaan Kepala Keluarga : exclude PEJABAT NEGARA, PENSIUNAN, PNS/TNI/POLRI
                                    </li>
                                </ol>
                            </div>
                            <!-- <button type="button" class="btn btn-danger btn-md">Lihat Tabel</button> -->
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div style="padding: 4px;">
                            <h5 class="mt-1 mb-3">Daftar Keluarga RUTILAHU (Rumah Tidak Layak Huni) Desil 1 - 4 Menurut
                                Program
                                PPKE di Civic Administration</h5>
                        </div>
                        <HousingRutilahuAgGrid />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="mt-1 mb-3">PERSENTASE KELUARGA YANG SUMBER PENERANGANNYA TIDAK MENGGUNAKAN
                                LISTRIK DI
                                SETIAP KECAMATAN</h6>
                            <div class="avatar-sm ml-5">
                                <span class="avatar-title bg-soft-primary rounded" style="min-width: 32px;"">
                                    <!-- <img src="~/assets/images/housing/roof.svg" alt="Roof" class="img-responsive"/> -->
                                    <svg id="Layer_1" data-name="Layer 1" width="17" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 30 39.5">
                                        <title>lamp</title>
                                        <path
                                            d="M378.4,547.3a1,1,0,0,1-.6-1c.1-1.2,0-2.5,0-3.7a.8.8,0,0,1,.6-.9.7.7,0,0,1,.9.6v4.3a.7.7,0,0,1-.5.7Z"
                                            transform="translate(-363.5 -507.8)" />
                                        <path
                                            d="M377.9,516.2v-7.7c.1-.4.3-.7.7-.7a.8.8,0,0,1,.7.5,1.1,1.1,0,0,1,.1.5v7.4h.7a1.6,1.6,0,0,1,1.6,1.7v1.5l2.9,1a15.3,15.3,0,0,1,8.6,10.8,14.5,14.5,0,0,1,.3,3c.1.6-.2.8-.9.8h-7.7a6.5,6.5,0,0,1-6.9,5.6,6.4,6.4,0,0,1-5.8-5.6h-7.5c-1,0-1.2-.2-1.1-1.1a14.4,14.4,0,0,1,.9-5.1,14.8,14.8,0,0,1,6.2-7.3,12.5,12.5,0,0,1,4.6-1.9c.3-.1.4-.2.4-.5a4.9,4.9,0,0,1-.1-1.2,1.7,1.7,0,0,1,1.8-1.7ZM392,533.5a13.5,13.5,0,0,0-26.9,0Zm-18.1,1.6a4.8,4.8,0,0,0,4.8,4,4.7,4.7,0,0,0,4.6-4Zm3.2-15.8h2.8c.1,0,.3-.1.3-.2v-1.3h-3.1Z"
                                            transform="translate(-363.5 -507.8)" />
                                        <path
                                            d="M390,540.5a.8.8,0,0,1-1,.7l-.3-.2-3.3-1.9a.9.9,0,0,1-.5-.8.7.7,0,0,1,1.1-.6l1,.6,2.5,1.4A.9.9,0,0,1,390,540.5Z"
                                            transform="translate(-363.5 -507.8)" />
                                        <path
                                            d="M375.3,541.3a.8.8,0,0,1-.2.5l-1.9,3.3c-.3.5-.7.7-1.2.4s-.4-.6-.2-1.1l2-3.4c.2-.3.4-.5.8-.4s.4.3.6.4A.4.4,0,0,1,375.3,541.3Z"
                                            transform="translate(-363.5 -507.8)" />
                                        <path
                                            d="M371.6,537.5c.2.2.5.3.6.5a.9.9,0,0,1-.1.7c0,.2-.2.3-.3.4l-3.4,2a.6.6,0,0,1-.9-.1.8.8,0,0,1-.3-.7l.5-.6,3.4-2Z"
                                            transform="translate(-363.5 -507.8)" />
                                        <path
                                            d="M385.6,545l-.5.6a.8.8,0,0,1-.9-.2c-.1-.1-.2-.2-.2-.3l-1.9-3.2a1.4,1.4,0,0,1-.2-.6.6.6,0,0,1,.5-.7.8.8,0,0,1,.8.2l.3.3,1.8,3.2Z"
                                            transform="translate(-363.5 -507.8)" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <section class="charts">
                            <highcharts :options="chartOptions4"></highcharts>
                        </section>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h6 class="mt-1 mb-3">PETA PERSEBARAN KELUARGA YANG SUMBER PENERANGANNYA TIDAK MENGGUNAKAN
                            LISTRIK
                        </h6>
                        <section class="maps">
                            <SumberListrikLMap />
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div style="padding: 4px;">
                            <h5 class="mt-1 mb-3">Daftar Keluarga Yang Sumber Penerangannya Tidak Menggunakan Listrik
                                Menurut
                                Program
                                PPKE di Civic Administration</h5>
                        </div>
                        <HousingSumberListrikAgGrid />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="mt-1 mb-3">PERSENTASE KELUARGA DENGAN FASILITAS YANG DIMILIKI DI
                                SETIAP KECAMATAN</h6>
                            <div class="avatar-sm ml-5">
                                <span class="avatar-title bg-soft-primary rounded">
                                    <!-- <img src="~/assets/images/housing/roof.svg" alt="Roof" class="img-responsive"/> -->
                                    <svg id="Layer_1" data-name="Layer 1" width="22" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 30 33.4">
                                        <defs>
                                            <style>
                                                .cls-1 {
                                                    fill: #040404;
                                                }

                                                .cls-2 {
                                                    fill: #010101;
                                                }

                                                .cls-3 {
                                                    fill: #020202;
                                                }

                                                .cls-4 {
                                                    fill: #030303;
                                                }

                                                .cls-5 {
                                                    fill: #090909;
                                                }

                                                .cls-6 {
                                                    fill: #050505;
                                                }
                                            </style>
                                        </defs>
                                        <title>toilet-squat</title>
                                        <path class="cls-1"
                                            d="M-118.5,381.1h-5a4.9,4.9,0,0,1-3.6-1.5.2.2,0,0,1-.2-.2,4,4,0,0,0-2.6-1.4c-1.5-.2-2.2-1.1-2.3-2.7-.3-3.1-.5-6.3-.8-9.5s-.3-4.4-.5-6.5a2.9,2.9,0,0,1,2.4-3.3,10.4,10.4,0,0,0,3.7-1.7,13.7,13.7,0,0,0,1.7-1.7,38.3,38.3,0,0,0,2.8-2.9,5.9,5.9,0,0,1,8.8,0l3.3,3.4a8.9,8.9,0,0,0,4.5,2.8l.8.2a2.8,2.8,0,0,1,2,2.8l-.3,4.2c-.1,2-.3,4-.5,6s-.3,4.4-.5,6.6a2.5,2.5,0,0,1-2,2.3,5.3,5.3,0,0,0-1.8.4,8,8,0,0,0-1.3,1.3,5.2,5.2,0,0,1-3.5,1.4Zm0-1.1h4.9a4.5,4.5,0,0,0,3.1-1.2l1.1-1.2.6-.3,1.8-.4c.7-.2,1.1-.6,1.1-1.2a19.4,19.4,0,0,0,.2-2.4l.6-6.8c.2-2.5.4-5,.5-7.6a1.7,1.7,0,0,0-1.2-1.8l-1-.3a8.5,8.5,0,0,1-4.5-2.6l-3.5-3.7a4.8,4.8,0,0,0-7.4,0l-3.4,3.6a8.4,8.4,0,0,1-3.1,2.2,10.4,10.4,0,0,1-2.5.8,1.7,1.7,0,0,0-1.2,1.8l.3,4.8.6,7.8c.2,1.4.3,2.8.4,4.1a1.4,1.4,0,0,0,1.1,1.3l1.9.4.5.3,1.2,1.2a3.7,3.7,0,0,0,3,1.2Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-1"
                                            d="M-110.7,367.3c0,2.5-.1,5.1-.2,7.7a3.1,3.1,0,0,1-2.6,3.1h-9.3a3,3,0,0,1-3.2-3.1c-.2-2.8-.2-5.7-.3-8.5l-.3-6.7a4.9,4.9,0,0,1,1.4-3.7l4.5-4.2a3.3,3.3,0,0,1,4.5,0l4.4,4.2a4.4,4.4,0,0,1,1.4,3.5Zm-1-.5c.1-2.1.1-4.6.2-7.1a3.4,3.4,0,0,0-1.1-2.8l-4.2-4a2.2,2.2,0,0,0-3.3,0l-4.3,4a3.7,3.7,0,0,0-1.1,2.8,14.8,14.8,0,0,0,.1,2.1c.1,4.4.3,8.9.5,13.3a1.9,1.9,0,0,0,2,2h8.8a2,2,0,0,0,2.1-2C-111.9,372.5-111.8,369.9-111.7,366.8Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-2"
                                            d="M-129.1,361.5h-1.1a.6.6,0,0,1-.6-.5.6.6,0,0,1,.6-.6h2.2a.5.5,0,0,1,.6.6.5.5,0,0,1-.5.5Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-2"
                                            d="M-107.9,361.5H-109c-.4,0-.6-.2-.6-.5a.5.5,0,0,1,.6-.6h2.2a.6.6,0,0,1,.6.6c0,.3-.2.5-.6.5Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-2"
                                            d="M-129.1,364.6h-1.1a.6.6,0,0,1-.6-.6.6.6,0,0,1,.6-.5h2.3a.5.5,0,0,1,.5.5c0,.4-.2.6-.5.6Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-2"
                                            d="M-107.9,363.5h1.1a.6.6,0,0,1,.6.5.6.6,0,0,1-.6.6H-109a.6.6,0,0,1-.6-.6c0-.3.2-.5.6-.5Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-3"
                                            d="M-128.9,367.6h-1a.6.6,0,0,1-.6-.5.6.6,0,0,1,.6-.5h2a.5.5,0,0,1,.5.5c0,.3-.2.5-.6.5Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-3"
                                            d="M-108,366.6h.9c.4,0,.6.2.6.5s-.2.5-.6.5H-109c-.4,0-.6-.2-.6-.5s.2-.5.6-.5Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-4"
                                            d="M-128.8,370.7h-.8c-.4,0-.6-.2-.6-.5s.2-.5.6-.5h1.7a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-4"
                                            d="M-108.2,370.7h-.8c-.4,0-.6-.2-.6-.5a.5.5,0,0,1,.5-.5h1.8a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5h-.9Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-5"
                                            d="M-128.7,373.8h-.6c-.4,0-.6-.2-.6-.5a.6.6,0,0,1,.5-.6h1.5a.6.6,0,0,1,.5.6c0,.3-.2.5-.6.5Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-5"
                                            d="M-108.3,373.8h-.7c-.4,0-.6-.2-.6-.5a.6.6,0,0,1,.5-.6h1.5a.6.6,0,0,1,.5.6.5.5,0,0,1-.5.5h-.7Z"
                                            transform="translate(133.5 -347.7)" />
                                        <path class="cls-6"
                                            d="M-121.9,371.1a3.5,3.5,0,0,1,3.4-3.4,3.4,3.4,0,0,1,3.4,3.5,3.4,3.4,0,0,1-3.4,3.4A3.5,3.5,0,0,1-121.9,371.1Zm3.4-2.3a2.3,2.3,0,0,0-2.3,2.3,2.3,2.3,0,0,0,2.3,2.4,2.4,2.4,0,0,0,2.4-2.4A2.4,2.4,0,0,0-118.5,368.8Z"
                                            transform="translate(133.5 -347.7)" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <section class="charts">
                            <highcharts :options="chartOptions5"></highcharts>
                        </section>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h6 class="mt-1 mb-3">PETA PERSEBARAN KELUARGA YANG TIDAK MEMILIKI FASILITAS BAB SENDIRI</h6>
                        <section class="maps">
                            <FasilitasBabLMap />
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div style="padding: 4px;">
                            <h5 class="mt-1 mb-3">Daftar Rumah Tangga Yang Memakai Fasilitas Bab Milik Umum/Bersama
                                Menurut
                                Program
                                Ppke Di Civic Administration</h5>
                        </div>
                        <HousingFasilitasBabUmumAgGrid />
                    </div>
                </div>
            </div>
            <div class="col-xl-12 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div style="padding: 4px;">
                            <h5 class="mt-1 mb-3">Daftar Rumah Tangga Yang Tidak Memiliki Fasilitas BAB Sendiri &
                                Bersama
                                (Umum) Menurut
                                Program
                                PPKE di Civic Administration</h5>
                        </div>
                        <HousingFasilitasBabBukanSendiriUmumAgGrid />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="mt-1 mb-3">PERSENTASE BAHAN BAKAR MEMASAK YANG DIGUNAKAN KELUARGA SETIAP
                                KELURAHAN
                                (DILUAR PEMAKAIAN GAS/LISTRIK)</h6>
                            <div class="avatar-sm ml-5">
                                <span class="avatar-title bg-soft-primary rounded" style="min-width:32px;">
                                    <svg id="Layer_1" width="18" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 30 35.4">
                                        <defs>
                                            <style>
                                                .cls-cooking-1 {
                                                    fill: #020202;
                                                }

                                                .cls-cooking-2 {
                                                    fill: #050505;
                                                }

                                                .cls-cooking-3 {
                                                    fill: #040404;
                                                }
                                            </style>
                                        </defs>
                                        <title>cooking</title>
                                        <path class="cls-cooking-1"
                                            d="M-206.4,416.3v11.9a4.2,4.2,0,0,1-2.5,4.1,3.9,3.9,0,0,1-1.8.4h-19a4.2,4.2,0,0,1-4.2-4.1V410.8a10.1,10.1,0,0,1,1.2-4.8c.2-.3.2-.4-.1-.6l-.2-.3a.9.9,0,0,0-1-.3,2,2,0,0,1-2.2-1.2,1.9,1.9,0,0,1,.4-2.2l3.5-3.5a1.9,1.9,0,0,1,2.3-.4,2.1,2.1,0,0,1,1.1,2.4c-.1.2-.1.4.1.5s.5.6.8.7.6-.2.9-.3a11.3,11.3,0,0,1,4.5-.9h11.8a4.2,4.2,0,0,1,4.4,4.4Zm-1.4,0V404.2a2.8,2.8,0,0,0-2.9-2.9h-12.1a5.8,5.8,0,0,0-1.9.2,9.7,9.7,0,0,0-7.8,9.7v17a2.9,2.9,0,0,0,3.1,3.1h18.5a2.9,2.9,0,0,0,3.1-3.1Zm-22.4-16.9c0-.4-.3-.5-.5-.7s-.4,0-.6.2l-3.5,3.5c-.3.3-.3.5,0,.8s.6.4.9.1,2.3-2.4,3.5-3.5A.8.8,0,0,0-230.2,399.4Zm1,2.5-.5-.4c-.1-.3-.3-.3-.5,0l-1.8,1.8c-.5.5-.5.5,0,1s.3.2.4,0a11.4,11.4,0,0,1,2.2-2.2C-229.3,402.1-229.3,402-229.2,401.9Z"
                                            transform="translate(236.4 -397.3)" />
                                        <path class="cls-cooking-2"
                                            d="M-212.3,412.5a2.1,2.1,0,0,1-.5,1.3l-1.9,2.4a.8.8,0,0,0-.2.7v6a.8.8,0,0,0,.2.7l1.9,2.4a2,2,0,0,1-.9,3.3,1.9,1.9,0,0,1-2.2-.7l-1.6-2a.6.6,0,0,0-.5-.2h-4.3a.7.7,0,0,0-.6.3l-1.4,1.8a1.9,1.9,0,0,1-2.9.4,1.9,1.9,0,0,1-.3-2.9c.6-.8,1.3-1.6,1.9-2.5s.2-.3.2-.6v-6a.7.7,0,0,0-.2-.6c-.6-.8-1.3-1.6-1.9-2.5a1.9,1.9,0,0,1,.3-2.9,1.9,1.9,0,0,1,2.9.4l1.5,1.9a.6.6,0,0,0,.5.2h4.3a.6.6,0,0,0,.5-.2,15.6,15.6,0,0,1,1.6-2,1.9,1.9,0,0,1,2.2-.7A2.2,2.2,0,0,1-212.3,412.5Zm-13.7-.7a.5.5,0,0,0-.6.4.6.6,0,0,0,.1.7c.7,1,1.5,1.9,2.2,2.8a1.4,1.4,0,0,1,.3.9v6.7a1.3,1.3,0,0,1-.3.8l-2.1,2.7c-.4.4-.4.8,0,1.1s.7.2,1-.2l1.8-2.3a1,1,0,0,1,.8-.4h5.3a1.2,1.2,0,0,1,.8.4l1.8,2.3c.1.2.2.3.4.3a.7.7,0,0,0,.8-.3.8.8,0,0,0-.1-.8l-2.2-2.8a1.3,1.3,0,0,1-.3-.8v-6.8a1.1,1.1,0,0,1,.3-.8l2.1-2.7a.8.8,0,0,0,0-1.1c-.4-.3-.7-.2-1.1.3a18.4,18.4,0,0,0-1.7,2.2,1.1,1.1,0,0,1-.9.4h-5.1a1,1,0,0,1-.9-.4l-1.8-2.3A.6.6,0,0,0-226,411.8Z"
                                            transform="translate(236.4 -397.3)" />
                                        <path class="cls-cooking-2"
                                            d="M-216.7,403.2h5.1c1.1,0,1.5.4,1.5,1.4v2.6a1.2,1.2,0,0,1-1.3,1.3h-10.5a1.3,1.3,0,0,1-1.4-1.4v-2.5c0-1,.4-1.4,1.4-1.4Zm0,1.3h-4.9c-.3,0-.3.1-.3.3v2c0,.2,0,.3.3.3h9.8c.3,0,.3-.1.3-.3v-1.9c0-.3,0-.4-.3-.4Z"
                                            transform="translate(236.4 -397.3)" />
                                        <path class="cls-cooking-3"
                                            d="M-220.2,423.8a3.1,3.1,0,0,1-2.8-4.4,14.9,14.9,0,0,1,2.4-3.2.7.7,0,0,1,.9,0,14.9,14.9,0,0,1,2.4,3.2A3.2,3.2,0,0,1-220.2,423.8Zm0-1.4a1.7,1.7,0,0,0,1.6-2.5,9,9,0,0,0-1.4-2c-.1-.2-.2-.1-.3,0a9,9,0,0,0-1.4,2A1.7,1.7,0,0,0-220.2,422.4Z"
                                            transform="translate(236.4 -397.3)" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <section class="charts">
                            <highcharts :options="chartOptions6"></highcharts>
                        </section>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="mt-1 mb-3">PERSENTASE PENGGUNAAN SUMBER AIR MINUM </h6>
                            <div class="avatar-sm ml-5">
                                <span class="avatar-title bg-soft-primary rounded">
                                    <svg id="Layer_1" width="18px" data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 38.1">
                                        <title>galon</title>
                                        <path
                                            d="M-90.3,23.6h-.4a3.4,3.4,0,0,0-.9-2,4.2,4.2,0,0,0,.9-2.5,4.2,4.2,0,0,0-.9-2.4,3.6,3.6,0,0,0,.9-2.4V10.5l-1.8-2.6L-98,6.1V.9h-7.3V6.1l-5.4,1.8-1.9,2.6v3.8a3.5,3.5,0,0,0,1,2.4,3.7,3.7,0,0,0-1,2.4,3.7,3.7,0,0,0,1,2.5,3.5,3.5,0,0,0-1,2.4,3.5,3.5,0,0,0,1,2.4,3.7,3.7,0,0,0-1,2.5v3.7l3.2,3.2h12.8A7.9,7.9,0,0,0-90.3,39a7.7,7.7,0,0,0,7.7-7.7,7.6,7.6,0,0,0-7.7-7.7M-102.9,3.3h2.5V5.8h-2.5Zm-6,12.2a1.3,1.3,0,0,1-1.3-1.2v-3l1-1.3,5.3-1.8h4.5L-94,10l.9,1.3v3a1.3,1.3,0,0,1-1.2,1.2H-98v2.4h3.7a1.3,1.3,0,0,1,1.2,1.2,1.3,1.3,0,0,1-1.2,1.3h-14.6a1.3,1.3,0,0,1-1.3-1.3,1.3,1.3,0,0,1,1.3-1.2h3.6V15.5Zm11.2,17.8h-10.7l-1.8-1.7V28.9a1.3,1.3,0,0,1,1.3-1.3h11.8a7.8,7.8,0,0,0-.9,3.7,6.4,6.4,0,0,0,.3,2m-11.2-8.1a1.2,1.2,0,0,1-1.3-1.2,1.2,1.2,0,0,1,1.3-1.2h14.6A1.2,1.2,0,0,1-93.1,24h0A11.8,11.8,0,0,0-95,25.2Zm18.6,11.4a5.3,5.3,0,0,1-5.3-5.3A5.3,5.3,0,0,1-90.3,26,5.3,5.3,0,0,1-85,31.3a5.3,5.3,0,0,1-5.3,5.3"
                                            transform="translate(112.6 -0.9)" />
                                        <polygon
                                            points="24 27 22.3 28.7 20.6 27 18.9 28.7 20.6 30.4 18.9 32.1 20.6 33.8 22.3 32.1 24 33.8 25.7 32.1 24 30.4 25.7 28.7 24 27" />
                                        <rect x="9.7" y="14.6" width="2.4" height="2.43" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <section class="charts">
                            <highcharts :options="chartOptions7"></highcharts>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>