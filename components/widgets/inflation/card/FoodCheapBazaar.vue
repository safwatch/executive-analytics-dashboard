<template>
    <div v-if="isMetricLoading || !metricData">
        <!-- shimmer -->
        <div class="widget-simple text-center card ">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <h3 class="counter py-4 mt-0  d-flex justify-content-center" style="line-height: 30px;">
                    <SieShimmer :shape="'circle'" :width="'100%'" :height="'35px'" />
                </h3>
                <p class="text-muted font-13 mb-0">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :borderRadius="'8px'" />
                </p>
            </div>
        </div>
        <!-- end of shimmer -->
    </div>
    <div v-else>
        <div class="widget-simple text-center card card-change">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Pasar Murah</h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="mtm-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="mtm-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Pasar Murah
                            </template>
                            <div>
                                Total dari gabungan antara kegiatan <span
                                    class="badge badge-outline-primary badge-secondary">Bazar Pangan</span>
                                dan <span class="badge badge-outline-primary badge-secondary">Pasar Murah</span>.
                            </div>
                        </b-popover>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <span v-if="metricData[0].bulan_kegiatan === 0" class="position-absolute zi2 badge badge-soft-secondary badge-secondary">Bulan :
                        No data</span>
                    <span v-else class="position-absolute zi2 badge badge-soft-secondary badge-secondary">Bulan :
                        {{ metricData[0].bulan_kegiatan }}</span>
                    <div v-if="metricData[0].bulan_kegiatan === 0" class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded text-center">
                        <b-badge href="#" class="badge-outline-danger my-2">Tidak ada data</b-badge>
                    </div>
                    <div v-else class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded text-center">
                        <h2 class="text-muted m-0"><span><span>
                                {{ metricData[0].total_kegiatan }}x
                                </span></span></h2>
                    </div>
                    <div class="d-flex mt-1">
                        <div class="align-self-center">
                            <span class="badge bg-light mb-0 text-muted">
                                kegiatan
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FoodCheapBazaarCard',
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Array,
            required: true,
            default: [],
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
    },
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
</script>