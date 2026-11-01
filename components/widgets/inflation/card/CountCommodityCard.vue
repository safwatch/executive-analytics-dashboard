<template>
    <div v-if="isMetricLoading || !metricData">
        <!-- shimmer -->
        <div class="widget-simple text-center card">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column py-2 w-100">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'100px'" :borderRadius="'8px'" />
                    </div>
                </div>
            </div>
        </div>
        <!-- end of shimmer -->
    </div>
    <div v-else>
        <div class="widget-simple text-center card">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Total Komoditas</h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="popover-realisasi-anggaran" class="text-muted"
                            variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>

                        <b-popover target="popover-realisasi-anggaran" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Realisasi Anggaran
                            </template>
                            <div>
                                Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                                periode satu
                                tahun. Ini
                                adalah cara untuk
                                menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan
                                membandingkan
                                indeks
                                harga
                                konsumen (CPI) atau
                                indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan
                                bulan
                                atau kuartal
                                yang sama
                                pada tahun
                                sebelumnya.
                            </div>
                        </b-popover>
                    </div>
                </div>
                <div class="d-flex flex-column py-2">
                    <span class="position-absolute zi2 badge badge-soft-secondary badge-secondary">Sumber:
                        E-Pasar</span>
                    <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded mb-2">
                        <h2 class="text-muted m-0"><span><span>
                                    {{ metricData.jumlah_komoditas }}
                                </span></span></h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'CountCommodityCard',
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Object,
            required: true,
            default: {},
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
    },
}
</script>
<style>
.zi2 {
    z-index: 2;
}
</style>