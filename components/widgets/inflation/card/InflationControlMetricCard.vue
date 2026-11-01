<template>
    <div v-if="isMetricLoading || !metricData" class="card card-animate">
        <div class="card-body">
            <div class="card-head-title position-relative">
                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
            </div>
            <div class="d-flex justify-content-center">
                <div class="boxed-section col-lg-6 p-0 pr-1 pt-2">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'" :borderRadius="'8px'" />
                </div>
                <div class="boxed-section col-lg-6 p-0 pl-1 pt-2">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'" :borderRadius="'8px'" />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="card card-animate">
        <div class="card-body">
            <div class="card-head-title position-relative">
                <h4 class="card-head text-muted mt-0">Pengendalian Inflasi</h4>
                <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                    <a href="javascript:void(0);" id="pengendalian-inflasi" class="text-muted" variant="light">
                        <i class="fa fa-info-circle"></i>
                    </a>

                    <b-popover target="pengendalian-inflasi" triggers="hover" placement="right"
                        custom-class="custom-popover">
                        <template v-slot:title>
                            Pengendalian Inflasi
                        </template>
                        <div>
                            Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                            periode satu
                            tahun. Ini
                            adalah cara untuk
                            menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan
                            indeks
                            harga
                            konsumen (CPI) atau
                            indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan
                            atau kuartal
                            yang sama
                            pada tahun
                            sebelumnya.
                        </div>
                    </b-popover>
                </div>
            </div>
            <div class="d-flex justify-content-center text-center">
                <div class="boxed-section col-lg-6 py-4 bg-light border border-1 rounded">
                    <h3 class="text-muted font-13 counter mt-0">Strategi</h3>
                    <h2 class="text-muted m-0"><span><span>
                                {{ metricData.total_kunci_strategi }}
                            </span></span></h2>
                </div>
                <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                <div class="boxed-section col-lg-6 bg-light py-4 border border-1 rounded">
                    <h3 class="text-muted font-13 counter mt-0">Rencana Aksi</h3>
                    <h2 class="text-muted m-0"><span><span>
                                {{ metricData.total_kunci_rencana_aksi }}
                            </span></span></h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InflationControlMetricCard',
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