<template>
    <div>
        <div class="card stretch stretch-full">
            <div class="card-header align-items-center d-flex border-bottom bg-white">
                <h4 class="card-title mb-0 flex-grow-1 text-muted">
                    Pantauan Harga {{ total ?? '' }} Komoditas Berdasarkan Bulan
                </h4>
                <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                    <a href="javascript:void(0);" id="target-vs-realisasi-popover" class="text-muted" variant="light">
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <b-popover target="target-vs-realisasi-popover" triggers="hover" placement="right" custom-class="custom-popover">
                        <template v-slot:title>
                            Pantauan Harga {{ total ?? '' }} Komoditas Berdasarkan Bulan
                        </template>
                        <div>
                            Pemantauan komoditas selama bulan terakhir menunjukkan perubahan harga di mana
                            beberapa komoditas mengalami kenaikan
                            harga, penurunan harga, sementara yang lain menunjukkan stabilitas harga
                            berdasarkan data e-pasar
                        </div>
                    </b-popover>
                </div>
            </div><!-- end card header -->
            <div v-if="loading" class="card-body custom-card-action">
                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'500px'" :borderRadius="'3px'" />
            </div>
            <div class="card-body custom-card-action" v-if="!loading">
                <h6 class="mt-0 mb-0 text-muted" v-html="getDateAcquired()"></h6>
                <div class="text-center mb-0">
                    <apexchart :options="goalProgressChartOptions" :series="series" height="350">
                    </apexchart>
                </div>
                <div class="row g-4 commodity-info">
                    <div class="col-sm-4 d-flex pb-3">
                        <div class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded position-relative">
                            <div class="avatar-text bg-gray-200 mx-auto mb-2">
                                <i class="feather-activity"></i>
                            </div>
                            <a href="javascript:void(0);" v-b-modal.modal-fullWidth-komoditas-naik class="fs-30 counter">{{ this.summary?.komoditas_naik ?? '-' }}</a>
                            <h2 class="fs-13 tx-spacing-1">Komoditas Naik</h2>
                            <div class="position-absolute utl-bottom-0 utl-right-0 w-100">
                                <a href="javascript:void(0);" v-b-modal.modal-fullWidth-komoditas-naik
                                class="pl-4 btn btn-light btn-sm btn-goto-detail bg-transparent text-primary border-0">
                                Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 d-flex pb-3">
                        <div class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded position-relative">
                            <div class="avatar-text bg-gray-200 mx-auto mb-2">
                                <i class="feather-check-circle"></i>
                            </div>
                            <a href="javascript:void(0);" v-b-modal.modal-fullWidth-komoditas-turun class="fs-30 counter">{{ this.summary?.komoditas_turun ?? '-' }}</a>
                            <h2 class="fs-13 tx-spacing-1">Komoditas Turun</h2>
                            <div class="position-absolute utl-bottom-0 utl-right-0 w-100">
                                <a href="javascript:void(0);" v-b-modal.modal-fullWidth-komoditas-turun
                                class="pl-4 btn btn-light btn-sm btn-goto-detail bg-transparent text-primary border-0">
                                Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 d-flex pb-3">
                        <div class="flex-fill d-flex flex-column justify-content-center px-4 py-3 pb-4 text-center border border-dashed rounded position-relative">
                            <div class="avatar-text bg-gray-200 mx-auto mb-2">
                                <i class="feather-users"></i>
                            </div>
                            <a href="javascript:void(0);" v-b-modal.modal-fullWidth-komoditas-tetap class="fs-30 counter">{{ this.summary?.komoditas_stabil ?? '-' }}</a>
                            <h2 class="fs-13 tx-spacing-1">Komoditas Tetap</h2>
                            <div class="position-absolute utl-bottom-0 utl-right-0 w-100">
                                <a href="javascript:void(0);" v-b-modal.modal-fullWidth-komoditas-tetap
                                class="pl-4 btn btn-light btn-sm btn-goto-detail bg-transparent text-primary border-0">
                                Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal detail pantauan 20 komoditas -->
        <!-- Modal content -->
        <b-modal id="modal-fullWidth-komoditas-turun" :title="`Pantauan Harga ${summary?.list_komoditas_turun?.length ?? ''} Komoditas (MtM)`" title-class="font-14" dialog-class="modal-lg custom-modal" hide-footer>
            <!-- load the detail component -->
            <component :is="WacthIPHCommodityTurun" :isMetricLoading="loading"
                :metricData="iphCommodityTurunMetric || {}" :metricStatus="iphCommodityTurunLatestStatus || ''"
                :listData="summary?.list_komoditas_turun" :graphicData="summary?.grafik_harga_komoditas_turun" />
        </b-modal>
        <b-modal id="modal-fullWidth-komoditas-naik" :title="`Pantauan Harga ${summary?.list_komoditas_naik?.length ?? ''} Komoditas (MtM)`" title-class="font-14" dialog-class="modal-md custom-modal" hide-footer>
        <!-- load the detail component -->
            <component :is="WacthIPHCommodityNaik" :isMetricLoading="loading"
                :metricData="iphCommodityNaikMetric || {}" :metricStatus="iphCommodityNaikLatestStatus || ''"
                :listData="summary?.list_komoditas_naik" :graphicData="summary?.grafik_harga_komoditas_naik" />
            </b-modal>
        <b-modal id="modal-fullWidth-komoditas-tetap" :title="`Pantauan Harga ${summary?.list_komoditas_stabil?.length ?? ''} Komoditas (MtM)`" title-class="font-14" dialog-class="modal-md custom-modal" hide-footer>
            <!-- load the detail component -->
            <component :is="WacthIPHCommodityTetap" :isMetricLoading="loading"
                :metricData="iphCommodityTetapMetric || {}" :metricStatus="iphCommodityTetapLatestStatus || ''" 
                :listData="summary?.list_komoditas_stabil" :graphicData="summary?.grafik_harga_komoditas_stabil" />
        </b-modal>
        <!-- end of modal detail pantauan 20 komoditas -->
        <!-- end of Pantauan 20 Komoditas Card -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import IPHCommodityNaik from '../card/IPHCommodityNaik.vue';
import IPHCommodityTurun from '../card/IPHCommodityTurun.vue';
import IPHCommodityStabil from '../card/IPHCommodityStabil.vue';

export default {
    components: {
        IPHCommodityNaik,
        IPHCommodityTurun,
        IPHCommodityStabil,
        apexchart: () => import("vue-apexcharts"),
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

            'inflationGauge',
            'inflationGaugeStatus'
        ]),

        ...mapState('inflationSummary', ['selectedYear', 'selectedMonth']),
    },
    async mounted() {
        this.loading = true;
        this.fetchDataGaugeInflation({  });
        this.loading = false;
    },
    data() {
        return {
            series: [],
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
            loading: false,
            summary: null,
            WacthIPHCommodityNaik: IPHCommodityNaik,
            WacthIPHCommodityTurun: IPHCommodityTurun,
            WacthIPHCommodityTetap: IPHCommodityStabil,
            month: null,
            year: null,
            total: null,
            monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        }
    },
    watch: {
        inflationGauge(result) {
            const summary = result?.[0];

            this.summary = summary;
            this.series = [summary?.persen_naik ?? 0];

            const komoditasNaik = summary?.list_komoditas_naik ?? [];
            const komoditasTurun = summary?.list_komoditas_turun ?? [];
            const komoditasStabil = summary?.list_komoditas_stabil ?? [];

            const total = komoditasNaik?.length + komoditasTurun?.length + komoditasStabil?.length;
            this.total = total;
        },
        async selectedYear(year) {
            this.loading = true;
            this.year = year?.year;
            await this.fetchDataGaugeInflation({ year: this.year, month: this.month });
            this.loading = false;
        },
        async selectedMonth(month) {
            this.loading = true;
            this.month = month?.id;
            await this.fetchDataGaugeInflation({ year: this.year, month: this.month });
            this.loading = false;
        },
    },
    methods: {
        ...mapActions('overwatchIPHCommodity', [
            'fetchDataGaugeInflation',
        ]),
        getDateAcquired() {
            const summary = this.summary;

            let years = [];
            const graphics = { ...summary?.grafik_harga_komoditas_naik, ...summary?.grafik_harga_komoditas_stabil, ...summary?.grafik_harga_komoditas_turun };
            Object.keys(graphics).forEach((key) => {
                const value = graphics[key];
                Object.keys(value).forEach((key) => {
                    const item = value[key];
                    years = [...years, item?.tahun]
                })
            })
            years = [...new Set(years)].sort().reverse();

            const summaryMonth = this.monthNames[Number(summary?.kode_bulan) - 1];
            const month = summaryMonth ?? this.selectedMonth?.month ?? '';
            const year = years?.[0] ?? this?.selectedYear?.year ?? '';            

            const monthYearName = `${month} ${year}`;
            return `Data terakhir : <span class="badge badge-outline-primary badge-primary">${monthYearName}</span>`;
        },
    }
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