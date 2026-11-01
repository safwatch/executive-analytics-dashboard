<template>
    <div>
        <!-- shimmer -->
        <div v-if="isMetricLoading || !metricData" class="card card-animate">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="d-flex  flex-column ">
                    <div class="boxed-section col-lg-12 pt-2 px-0">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'96px'" :borderRadius="'8px'" />
                    </div>
                </div>
            </div>
        </div>
        <!-- end of shimmer -->
        <div v-else class="card card-animate card-warning">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Strategi<br /> Pengendalian Inflasi</h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="iph-card-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="iph-card-popover" triggers="hover" placement="right"
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
                <div class="d-flex justify-content-between">
                    <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded text-center">
                        <h2 v-if="metricStatus === 'success'" class="text-muted m-0">
                            <span>
                                <span>
                                    {{ metricData.value }}
                                </span>
                            </span>
                        </h2>
                        <h2 v-else class="text-muted m-0">
                            <span>
                                <span>
                                    0
                                </span>
                            </span>
                        </h2>
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
    }
}
</script>