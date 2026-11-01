<template>
    <div v-if="isMetricLoading || !metricData">
        <!-- shimmer -->
        <div class="widget-simple text-center card">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="d-flex justify-content-center">
                    <div class="boxed-section col-lg-6 pt-2">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'" :borderRadius="'8px'" />
                    </div>
                    <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                    <div class="boxed-section col-lg-6 py-2">
                        <div class="text-left">
                            <div class="d-flex gap-2">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'39px'"
                                    :borderRadius="'8px'" />
                            </div>
                            <div class="d-flex mt-1  gap-2 pt-3">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'39px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of shimmer -->
    </div>
    <div v-else>
        <div class="widget-simple text-center card card-change">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Sebaran Pasar</h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="pengendalian-inflasi" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>

                        <b-popover target="pengendalian-inflasi" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Total Pasar
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
                    <div class="d-flex justify-content-center">
                        <div class="boxed-section col-lg-6 py-4 bg-light border border-1 rounded">
                            <h3 class="text-muted font-13 counter mt-0">Total Pasar</h3>
                            <h2 class="text-muted m-0"><span><span>
                                        {{ metricData.total_pasar }}
                                    </span></span></h2>
                        </div>
                        <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                        <div class="boxed-section col-lg-6 py-2 rounded px-0 d-flex align-items-center">
                            <div class="text-left">
                                <div class="d-flex gap-2">
                                    <div class="flex-shrink-0">
                                        <i class="ri-map-pin-user-fill text-primary"></i>
                                    </div>
                                    <div class="flex-grow-1 ms-2 text-muted">
                                        Pedagang : <b>{{ metricData.jumlah_pedagang }}</b>
                                    </div>
                                </div>
                                <div class="d-flex mt-2  gap-2 border-top pt-3">
                                    <div class="flex-shrink-0">
                                        <i class=" ri-store-3-fill text-primary"></i>
                                    </div>
                                    <div class="flex-grow-1 ms-2 text-muted">
                                        LOS : <b>{{ metricData.jumlah_pedagang_los }}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
