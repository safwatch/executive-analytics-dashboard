<template>
    <!-- Tab of IPH, Commodity & Market -->
    <div class="card card-height-100">
        <div class="card-header border-bottom bg-white">
            <h5 class="card-title text-muted">Indeks Perkembangan Harga</h5>
        </div>
        <div class="card-body pt-3 h-100 px-4">
            <div class="row filter-card d-flex h-100 px-3">
                <div class="tab-content d-flex w-100 align-items-center">
                    <!-- IPH content -->
                    <apexchart class="apex-charts w-100" height="380" type="line"
                        :series="IPHDataChart.series" :options="IPHDataChart.chartOptions">
                    </apexchart>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    computed: {
        ...mapState('inflationProfile', {
            IPHYearlyTrend: state => state.IPHYearlyTrend,
            IPHYearlyTrendStatus: state => state.IPHYearlyTrendStatus,
        }),
    },
    data() {

        return {
            IPHDataChart: {
                series: [],
                chartOptions: {
                }
            },
        }
    },
    mounted() {
        this.fetchIPHYearlyTrendByYear({ year: 2024 });
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchIPHYearlyTrendByYear']),
    },
    watch: {
        IPHYearlyTrend(result) {
            const rawData = result?.map((item) => Number(item?.iph ?? 0));
            const categories = result?.map((item) => `${item?.nama_bulan} ${item?.tahun}`);

            const threshold = 3;

            const upwardSpikes = [];
            const downwardSpikes = [];

            for (let i = 1; i < rawData.length; i++) {
                const change = rawData[i] - rawData[i - 1];

                if (change >= threshold) {
                    upwardSpikes.push(i);
                } else if (change <= -threshold) {
                    downwardSpikes.push(i);
                }
            }

            // Markers and Annotations
            const discreteMarkers = [
                ...upwardSpikes.map(i => ({
                    seriesIndex: 0,
                    dataPointIndex: i,
                    fillColor: '#e74c3c',  // red
                    strokeColor: '#c0392b',
                    size: 8,
                    shape: 'circle'
                })),
                ...downwardSpikes.map(i => ({
                    seriesIndex: 0,
                    dataPointIndex: i,
                    fillColor: '#3498db',  // blue
                    strokeColor: '#2c3e50',
                    size: 8,
                    shape: 'circle'
                }))
            ];

            const annotations = [
                ...upwardSpikes.map(i => ({
                    x: categories[i],
                    y: rawData[i],
                    marker: { size: 6, fillColor: '#e74c3c' },
                    label: {
                        text: `▲ Naik Signifikan: ${rawData[i]}`,
                        borderColor: '#e74c3c',
                        style: { background: '#e74c3c', color: '#fff' },
                        offsetY: -10
                    }
                })),
                ...downwardSpikes.map(i => ({
                    x: categories[i],
                    y: rawData[i],
                    marker: { size: 6, fillColor: '#3498db' },
                    label: {
                        text: `▼ Turun Signifikan: ${rawData[i]}`,
                        borderColor: '#3498db',
                        style: { background: '#3498db', color: '#fff' },
                        offsetY: -10
                    }
                }))
            ];

            const newData = {
                series: [
                    {
                        name: 'Indeks Inflasi',
                        data: rawData
                    }
                ],
                chartOptions: {
                    chart: {
                        zoom: { enabled: false },
                        toolbar: { show: false }
                    },
                    colors: ['#1abc9c'],
                    dataLabels: { enabled: false },
                    stroke: {
                        width: 3,
                        curve: 'smooth'
                    },
                    grid: {
                        row: {
                            colors: ['transparent', 'transparent'],
                            opacity: 0.2
                        },
                        borderColor: '#f1f3fa'
                    },
                    markers: {
                        size: 5,
                        discrete: discreteMarkers
                    },
                    annotations: {
                        yaxis: [
                            {
                                y: 25,
                                y2: 0,
                                fillColor: '#d4edda',
                                opacity: 0.3,
                                label: {
                                    text: '',
                                    style: {
                                        background: '#28a745',
                                        color: '#fff'
                                    }
                                }
                            },
                            {
                                y: 30,
                                borderColor: '#ff0000',
                                label: {
                                    borderColor: '#ff0000',
                                    style: {
                                        color: '#fff',
                                        background: '#ff0000',
                                    },
                                    text: '⚠️ Bahaya: Melebihi Batas Aman',
                                }
                            }
                        ],
                        points: annotations
                    },
                    xaxis: {
                        categories: categories,
                        title: {
                            text: 'Bulan'
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Index Perkembangan Harga'
                        },
                        labels: {
                            formatter: function (val) {
                                return val.toFixed(2);
                            }
                        }
                        // min: 0,
                        // max: 40
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                    },
                    responsive: [
                        {
                            breakpoint: 600,
                            options: {
                                chart: {
                                    toolbar: { show: false }
                                },
                                legend: {
                                    show: false
                                }
                            }
                        }
                    ]
                }
            };

            this.IPHDataChart = newData;
        }
    }
}
</script>

<style scoped>
::v-deep(.apexcharts-point-annotations text),
::v-deep(.apexcharts-xaxis-annotations text),
::v-deep(.apexcharts-yaxis-annotations text) {
    fill: #fff !important;
}
</style>