<template>
    <div>
        <!-- shimmer -->
        <div v-if="isMetricLoading || !metricData" class="card card-animate">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="d-flex justify-content-between">
                    <div class="w-100">
                        <div class="boxed-section col-lg-12 pt-2 px-0">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'96px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex justify-content-start mt-4">
                            <div class="align-self-center">
                                <SieShimmer :shape="'rectangle'" :width="'50px'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </div>
                            <div class="ml-2">
                                <SieShimmer :shape="'rectangle'" :width="'150px'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
        <!-- end of shimmer  -->
        <div v-else class="card card-animate card-warning">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Rencana Aksi <br />Pengendalian Inflasi</h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="ikp-card-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="ikp-card-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Indeks Ketahanan Pangan
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
                <div class="d-flex flex-column">
                    <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded text-center">
                        <h2 v-if="metricData" class="text-muted m-0">
                            <span>
                                <span>
                                    {{ formattedMetricValue }}
                                </span>
                            </span>
                        </h2>
                        <h2 v-else class="text-muted m-0">
                            No Data
                        </h2>
                    </div>
                    <div class="d-flex mt-2">
                        <div class="align-self-center">
                            <span class="badge bg-light mb-0" :class="textClass">
                                <i v-if="metricData.current > metricData.previous" class="ri-arrow-up-line align-middle"></i>
                                <i v-else class="ri-arrow-down-line align-middle"></i>
                                {{ metricData.percentage }} %
                            </span>
                        </div>
                        <div class="ml-2">
                            <p class="mb-0 text-muted"> dari tahun <b-badge
                                    class="badge-outline-primary">{{ metricData.year -
                                    1}}</b-badge>
                            </p>
                        </div>
                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
    </div>
</template>
<script>
export default {
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Object,
            required: true,
            default: () => []
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
    },
    computed: {
        directionClass() {
            if (!this.metricData) {
                return 'text-muted';
            }
            const current = this.metricData.current;
            const previous = this.metricData.previous;

            return current < previous ? 'text-danger' :
                current > previous ? 'text-success' : 'text-muted';
        },
        textClass() {
            if (!this.metricData) {
                return '';
            }
            const current = this.metricData.current;
            const previous = this.metricData.previous;

            return current < previous ? 'text-danger' :
                current > previous ? 'text-success' : '';
        },
        directionSymbol() {
            if (!this.metricData) {
                return '';
            }
            const current = this.metricData.current;
            const previous = this.metricData.previous;

            return current < previous ? '▼' :
                current > previous ? '▲' : ''; // No symbol if they are equal
        },
        formattedMetricValue() {
            return this.metricData && this.metricData.current
                ? parseFloat(this.metricData.current).toFixed(0).replace('.', ',')
                : '0';
        },
    },
}
</script>