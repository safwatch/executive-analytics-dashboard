<template>
    <div>
        <!-- shimmer -->
        <div v-if="isChartLoading || !metricData || !chartData" class="card card-animate">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="d-flex justify-content-between">
                    <div class="w-100">
                        <h2 class="my-3 ff-secondary fw-semibold d-flex justify-content-center">
                            <SieShimmer :shape="'rectangle'" :width="'65px'" :height="'44px'" :borderRadius="'8px'" />
                        </h2>
                        <div class="d-flex justify-content-between  flex-row-reverse mt-4">
                            <div class="align-self-center">
                                <SieShimmer :shape="'rectangle'" :width="'50px'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
        <!-- end of shimmer  -->
        <div v-else class="card card-animate card-danger">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Indeks Inflasi Bulanan (MtM)<br />&nbsp;</h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="mtm-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="mtm-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Month to Month (MtM)
                            </template>
                            <div>
                                Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa
                                selama
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
                </div>
                <div class="d-flex justify-content-between w-100">
                    <div class="w-100">
                        <div v-if="metricStatus === 'success'" style="z-index:2" class="position-relative">
                            <h2 :class="directionClass" class="mt-1 ff-secondary fw-semibold text-center">
                                <span class="counter-value">{{ directionSymbol }} {{ formattedMtMValue }}</span>
                            </h2>
                            <div class="d-flex flex-row-reverse">
                                <div class="align-self-center">
                                    <span class="badge bg-light mb-0" :class="textClass">
                                        <i v-if="metricData.keterangan === 'Turun'"
                                            class="ri-arrow-down-line align-middle"></i>
                                        <i v-else class="ri-arrow-up-line align-middle"></i>
                                        {{ metricData.perubahan_inflasi }} %
                                    </span>
                                </div>
                                <div class="ml-2" style="visibility: hidden;">
                                    <p class="mb-0 text-muted"> Dibanding bulan sebelumnya</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="align-self-center">
                            <p class="text-muted font-13 mb-0">Data tidak tersedia</p>
                        </div>
                        <div class="viz-small">
                            <ReportMtMChildComponentChart :loadingState="isChartLoading" :data="chartData" />
                        </div>

                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
    </div>
</template>
<script>

import ReportMtMChildComponentChart from "@/components/widgets/inflation/card/ReportMtMChildComponentChart.vue";

export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
        ReportMtMChildComponentChart,
    },
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        isChartLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Object,
            required: true,
            default: () => []
        },
        chartData: {
            type: Array,
            required: true,
            default: [],
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
        chartStatus: {
            type: String,
            required: true,
            default: "",
        }
    },
    computed: {
        directionClass() {
            return this.metricData && this.metricData.keterangan === 'Turun' ? 'text-success' :
                this.metricData && this.metricData.keterangan === 'Naik' ? 'text-danger' : 'text-muted';
        },
        textClass() {
            return this.metricData && this.metricData.keterangan === 'Turun' ? 'text-success' :
                this.metricData && this.metricData.keterangan === 'Naik' ? 'text-danger' : '';
        },
        directionSymbol() {
            return this.metricData && this.metricData.keterangan === 'Turun' ? '▼' :
                this.metricData && this.metricData.keterangan === 'Naik' ? '▲' : '';
        },
        formattedMtMValue() {
            return this.metricData && this.metricData.tingkat_inflasi
                ? parseFloat(this.metricData.tingkat_inflasi).toFixed(2).replace('.', ',')
                : '0,00';
        },
    }
}
</script>