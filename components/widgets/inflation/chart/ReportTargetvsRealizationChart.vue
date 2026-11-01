<template>

    <!-- shimmer -->
    <div v-if="isChartLoading || !chartData" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pb-3">
            <div class="tabs d-flex gap-2 pb-2">
                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
            </div>
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'400px'" :borderRadius="'8px'" />
        </div><!-- end card body -->
    </div><!-- end card -->
    <!-- end of shimmer -->
    <div v-else class="card card-height-100 card-danger">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Target Vs. Realisasi</h4>
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
        <div class="card-body">
            <div class="col-xl-12 px-0">
                <div class="tabs">
                    <button type="button"
                        :class="['btn', 'btn-sm', activeTab === 'Target Realization' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="activeTab = 'Target Realization'">
                        Target & Realisasi
                    </button>
                    <button type="button"
                        :class="['btn', 'btn-sm', activeTab === 'Budget' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="activeTab = 'Anggaran'">
                        Anggaran
                    </button>
                </div>
            </div>
            <div class="col-xl-12 px-0 d-flex h-100 align-items-center">
                <div v-if="chartData.totalRealisasiTriwulan === undefined && chartData.totalTargetTriwulan === undefined"
                    class="col-xl-12 px-0">
                    <div class="d-flex justify-content-center mb-3">
                        <svg id="fi_17134613" width="64" height="64" enable-background="new 0 0 512 512"
                            viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <g>
                                    <path
                                        d="m410.706 414.184h-379.535v-259.762c0-13.037 10.569-23.606 23.606-23.606h332.323c13.037 0 23.606 10.569 23.606 23.606z"
                                        fill="#fff"></path>
                                    <path
                                        d="m387.106 130.816h-114.918c-.835 6.169-1.266 12.465-1.266 18.859 0 77.117 62.706 139.856 139.784 139.856v-135.103c0-13.041-10.566-23.612-23.6-23.612z"
                                        fill="#d2dcfd"></path>
                                    <path
                                        d="m263.926 390.915v23.268h-85.975v-23.268h-167.951v19.171c0 24.068 19.501 43.579 43.557 43.579h334.763c24.056 0 43.557-19.511 43.557-43.579v-19.171z"
                                        fill="#bc9af4"></path>
                                    <ellipse cx="410.706" cy="149.675" fill="#fd7da0" rx="91.294" ry="91.341">
                                    </ellipse>
                                </g>
                                <g>
                                    <g fill="#fd6050">
                                        <path
                                            d="m207.652 278.006c-.035-.092-.07-.183-.108-.273-1.769-4.303-5.916-7.081-10.566-7.081-.004 0-.008 0-.012 0-4.655.004-8.802 2.792-10.563 7.102-.031.075-.061.15-.089.226l-23.611 62.027c-1.965 5.162.626 10.938 5.788 12.903 5.162 1.966 10.938-.626 12.903-5.788l.735-1.931h29.491l.718 1.902c1.511 4.005 5.316 6.474 9.358 6.474 1.173 0 2.366-.208 3.528-.646 5.167-1.949 7.776-7.718 5.827-12.886zm-17.911 47.186 7.2-18.914 7.134 18.914z">
                                        </path>
                                        <path
                                            d="m348.658 340.036-23.396-62.03c-.035-.093-.071-.185-.109-.277-1.77-4.3-5.916-7.077-10.565-7.077h-.01c-4.653.004-8.8 2.789-10.563 7.095-.031.077-.063.155-.092.233l-23.611 62.027c-1.965 5.162.627 10.938 5.788 12.903 5.162 1.966 10.939-.626 12.903-5.788l.735-1.931h29.491l.718 1.902c1.511 4.005 5.316 6.474 9.358 6.474 1.172 0 2.365-.208 3.527-.646 5.166-1.948 7.775-7.718 5.826-12.885zm-41.308-14.844 7.2-18.914 7.134 18.914z">
                                        </path>
                                        <path
                                            d="m119.857 272.513h-17.282c-2.656 0-5.202 1.056-7.078 2.936s-2.927 4.429-2.922 7.084l.124 61.052c.005 2.655 1.066 5.2 2.95 7.072 1.874 1.863 4.409 2.908 7.05 2.908h.038c.523-.002 12.862-.05 17.801-.136 19.679-.344 33.961-17.331 33.961-40.39 0-24.24-13.921-40.526-34.642-40.526zm.33 60.919c-1.778.031-4.624.058-7.51.078l-.083-40.997h7.262c13.586 0 14.642 15.711 14.642 20.526.001 10.026-4.424 20.22-14.311 20.393z">
                                        </path>
                                        <path
                                            d="m282.935 280.651c0-5.523-4.478-10-10-10h-34.726c-5.523 0-10 4.477-10 10s4.477 10 10 10h7.293v52.914c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10v-52.914h7.433c5.522 0 10-4.477 10-10z">
                                        </path>
                                        <path
                                            d="m197.741 252.086c4.641-1.449 7.64-5.741 7.64-11.032l-.587-60.793c-.053-5.522-4.54-9.976-10.096-9.903-5.522.053-9.956 4.574-9.903 10.096l.303 31.356-25.549-37.016c-2.486-3.602-7.024-5.168-11.205-3.867-4.179 1.302-7.025 5.17-7.025 9.547v62.796c0 5.523 4.477 10 10 10s10-4.477 10-10v-30.704l24.21 35.075c2.852 4.127 7.646 5.872 12.212 4.445z">
                                        </path>
                                        <path
                                            d="m259.118 253.271c22.851 0 41.44-18.597 41.44-41.457s-18.59-41.457-41.44-41.457-41.44 18.597-41.44 41.457 18.59 41.457 41.44 41.457zm0-62.913c11.822 0 21.44 9.625 21.44 21.457s-9.618 21.457-21.44 21.457-21.44-9.625-21.44-21.457 9.618-21.457 21.44-21.457z">
                                        </path>
                                    </g>
                                    <path
                                        d="m512 149.675c0-55.88-45.44-101.341-101.294-101.341-45.837 0-84.659 30.616-97.111 72.481h-258.824c-18.527 0-33.6 15.079-33.6 33.612v226.488h-11.171c-5.523 0-10 4.477-10 10v19.171c0 29.543 24.025 53.579 53.557 53.579h334.763c29.531 0 53.557-24.036 53.557-53.579v-19.171c0-5.523-4.478-10-10-10h-11.171v-130.389c51.178-5.04 91.294-48.346 91.294-100.851zm-101.294-81.341c44.825 0 81.294 36.49 81.294 81.341s-36.469 81.341-81.294 81.341c-44.826 0-81.295-36.49-81.295-81.341s36.469-81.341 81.295-81.341zm11.171 341.753c0 18.516-15.054 33.579-33.557 33.579h-334.763c-18.503 0-33.557-15.063-33.557-33.579v-9.171h147.951v13.268c0 5.523 4.477 10 10 10h85.975c5.522 0 10-4.477 10-10v-13.268h147.951zm-157.951-29.171c-5.522 0-10 4.477-10 10v13.268h-65.975v-13.268c0-5.523-4.477-10-10-10h-136.78v-226.488c0-7.506 6.101-13.612 13.6-13.612h255.024c-.254 2.92-.384 5.875-.384 8.86 0 52.504 40.117 95.811 91.295 100.851v130.389z"
                                        fill="#052a75"></path>
                                    <path
                                        d="m410.706 95.695c-29.753 0-53.958 24.215-53.958 53.98s24.205 53.98 53.958 53.98c29.752 0 53.957-24.215 53.957-53.98s-24.205-53.98-53.957-53.98zm0 20c5.732 0 11.136 1.429 15.877 3.949l-45.891 45.915c-2.517-4.743-3.944-10.15-3.944-15.884 0-18.737 15.233-33.98 33.958-33.98zm0 67.96c-5.732 0-11.136-1.429-15.877-3.948l45.891-45.915c2.516 4.743 3.943 10.149 3.943 15.883 0 18.737-15.233 33.98-33.957 33.98z"
                                        fill="#fff"></path>
                                </g>
                            </g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                        </svg>
                    </div>
                    <b-alert show variant="warning">
                        <i class="fe-info mr-2"></i>Tidak ada data yang tersedia.
                    </b-alert>
                </div>
                <apexchart class="apex-charts w-100" height="380" type="line" :series="linewithDataChart.series"
                    :options="linewithDataChart.chartOptions">
                </apexchart>
            </div>
        </div>
    </div>

</template>
<script>
const lineChartOptions = {
    chart: {
        zoom: { enabled: false },
        toolbar: { show: false }
    },
    colors: ['#4fc6e1', '#1abc9c'],
    dataLabels: { enabled: true },
    stroke: { width: [3, 3], curve: 'smooth' },
    grid: {
        row: { colors: ['transparent', 'transparent'], opacity: 0.2 },
        borderColor: '#f1f3fa'
    },
    markers: { style: 'inverted', size: 6 },
    xaxis: {
        categories: ['Triwulan 1', 'Triwulan 2', 'Triwulan 3', 'Triwulan 4'],
        title: { text: 'Triwulan' }
    },
    yaxis: {
        title: { text: 'Pencapaian Target & Realisasi' }
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
};

export default {
    props: {
        isChartLoading: {
            type: Boolean,
            required: true
        },
        chartData: {
            type: Object,
            required: true,
            default: () => ({ totalTargetTriwulan: [], totalRealisasiTriwulan: [] })
        },
        chartStatus: {
            type: String,
            required: true,
            default: ""
        },
    },
    data() {
        return {
            linewithDataChart: {
                activeTab: 'Target Realization',
                tabs: ['Target Realization', 'Budget'],
                series: [],
                chartOptions: lineChartOptions
            },
        }
    },
    watch: {
        chartData: {
            immediate: true,
            handler(newData) {
                this.updateChartSeries(newData);
            }
        }
    },
    methods: {
        updateChartSeries(data) {
            // Update the series data based on the props chartData
            this.linewithDataChart.series = [
                {
                    name: 'Target',
                    data: data.totalTargetTriwulan || []
                },
                {
                    name: 'Realisasi',
                    data: data.totalRealisasiTriwulan || []
                }
            ];
        }
    },
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
}
</script>