<template>
    <div v-if="isChartLoading || !chartData" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div><!-- end card header -->

        <!-- card body -->
        <div class="card-body d-flex">
            <div class="col-xl-12 px-0">
                <div class="d-flex justify-content-start mt-0">
                    <div class="col-xl-11 align-self-center px-0">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'400px'" :borderRadius="'8px'" />
                    </div>
                    <div class="col-xl-1 px-0 ml-2">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'400px'" :borderRadius="'8px'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Heatmap Neraca Pangan</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="target-vs-realisasi-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="target-vs-realisasi-popover" triggers="hover" placement="right"
                    custom-class="custom-popover">
                    <template v-slot:title>
                        Target Vs. Realisasi
                    </template>
                    <div>
                        Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                        periode satu tahun. Ini
                        adalah cara untuk
                        menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan
                        membandingkan
                        indeks harga
                        konsumen (CPI) atau
                        indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan
                        bulan
                        atau kuartal yang sama
                        pada tahun
                        sebelumnya.
                    </div>
                </b-popover>
            </div>
        </div><!-- end card header -->

        <!-- card body -->
        <div class="card-body d-flex">
            <div v-if="!chartData.length" class="col-xl-12 px-0">
                <b-alert show variant="warning">
                    <i class="fe-info mr-2"></i>Tidak ada data yang tersedia.
                </b-alert>
            </div>
            <div v-else class="col-xl-12 px-0">
                <div id="heatmapChart" style="width: 100%; height: 400px; position: relative"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Highcharts from 'highcharts';
import HeatmapModule from 'highcharts/modules/heatmap';

// Initialize the Heatmap module
HeatmapModule(Highcharts);

export default {
    props: {
        isChartLoading: {
            type: Boolean,
            required: true
        },
        chartData: {
            type: Array,
            required: true,
            default: () => [], // Default to empty array to prevent errors
        },
        chartStatus: {
            type: String,
            required: true,
            default: ""
        },
    },
    watch: {
        chartData: {
            immediate: true,
            handler(newData) {
                if (newData && Array.isArray(newData) && newData.length > 0) {
                    this.renderHeatmapChart();
                } else {
                    console.warn('Invalid or empty data for heatmap:', newData);
                }
            },
        },
    },
    methods: {
        renderHeatmapChart() {
            if (!this.chartData || this.chartData.length === 0) {
                console.error('Chart data is missing or not an array');
                return;
            }

            this.$nextTick(() => {
                Highcharts.chart('heatmapChart', {
                    chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    title: {
                        text: '',
                        style: {
                            fontSize: '1em'
                        }
                    },
                    xAxis: {
                        categories: [
                            'Beras', 'Bawang Merah', 'Bawang Putih', 'Cabe Besar', 'Cabe Rawit',
                            'Daging Ayam', 'Daging Sapi', 'Telur Ayam Ras', 'Gula Pasir', 'Minyak Goreng',
                        ],
                        lineColor: '#98A6AD',
                        labels: {
                            style: {
                                fontFamily: 'Poppins, sans-serif', // Set font family here
                                color: '#98A6AD',
                                fontSize: '11px',
                            }
                        }
                    },
                    yAxis: {
                        categories: [
                            'Desember', 'November', 'Oktober', 'September', 'Agustus',
                            'Juli', 'Juni', 'Mei', 'April', 'Maret', 'Februari', 'Januari',
                        ],
                        title: null,
                        reversed: true,
                        labels: {
                            style: {
                                fontFamily: 'Poppins, sans-serif', // Set font family here
                                color: '#98A6AD',
                                fontSize: '11px',
                            }
                        }
                    },
                    accessibility: {
                        point: {
                            descriptionFormat: '{(add index 1)}. ' +
                                '{series.xAxis.categories.(x)} sales ' +
                                '{series.yAxis.categories.(y)}, {value}.'
                        }
                    },
                    colorAxis: {
                        min: 0,
                        minColor: '#FFFFFF',
                        maxColor: Highcharts.getOptions().colors[0],
                    },
                    legend: {
                        align: 'right',
                        layout: 'vertical',
                        margin: 0,
                        verticalAlign: 'top',
                        y: 25,
                        symbolHeight: 280,
                        itemStyle: {
                            fontFamily: 'Poppins, sans-serif',
                            color: '#98A6AD',
                            fontSize: '11px'
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return `di Bulan <b>${this.series.yAxis.categories[this.point.y]}</b> dengan nama komoditas<br>
                    <b>${this.series.xAxis.categories[this.point.x]} </b> memiliki indeks :  <b>${this.point.value}</b>`;
                        },
                        style: {
                            fontFamily: 'Poppins, sans-serif' // Set font family here
                        }

                    },
                    series: [{
                        name: 'Neraca Pangan',
                        borderWidth: 0,
                        data: this.chartData,
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            style: {
                                fontFamily: 'Poppins, sans-serif' // Set font family here
                            }
                        },
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                yAxis: {
                                    labels: {
                                        formatter: function () {
                                            return this.value.substring(0, 1);
                                        }
                                    }
                                }
                            }
                        }]
                    },
                    exporting: {
                        enabled: false // This disables the toolbar
                    }
                });
            });
        },
        // for heatmap
        generateHeatmapChartOptions(categories, count, yrange, colorRanges) {
            const series = categories.map((category) => ({
                name: category,
                data: this.generateData(count, yrange),
            }));

            return {
                series: series,
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        radius: 0,
                        useFillColorAsStroke: true,
                        colorScale: {
                            ranges: colorRanges,
                        },
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 1,
                },
                title: {
                    text: '',
                },
                legend: {
                    show: true, // Show the legend
                    position: 'bottom', // Position the legend at the bottom
                },
            };
        },
        generateData(count, yrange) {
            const series = [];
            for (let i = 0; i < count; i++) {
                const x = (i + 1).toString();
                const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
                series.push({ x, y });
            }
            return series;
        },
    }
}
</script>

<style scoped>
#heatmapChart {
    width: 100%;
    height: 400px;
}
</style>