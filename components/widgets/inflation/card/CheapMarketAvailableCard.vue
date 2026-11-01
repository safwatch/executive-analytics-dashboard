<template>
    <div>
        <!-- shimmer -->
        <div v-if="isLoading" class="card card-animate">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="d-flex justify-content-between">
                    <div class="w-100">
                        <div class="boxed-section col-lg-12 pt-2 px-0">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'78px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex justify-content-start mt-2">
                            <div class="w-100">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
        <!-- end of shimmer  -->
        <div v-else class="card card-animate card-change">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Pasar Murah
                    </h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="cheapmarket-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="cheapmarket-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Pasar Murah
                            </template>
                            <div>
                                Total dari gabungan antara kegiatan <span class="badge badge-outline-primary badge-secondary">Bazar Pangan</span> dan <span class="badge badge-outline-primary badge-secondary">Pasar Murah</span>.
                            </div>
                        </b-popover>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <span class="position-absolute zi2 badge badge-soft-secondary badge-secondary">Bulan : {{cheapMarketData.bulan_kegiatan[0]}}</span>
                    <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded text-center">
                        <h2 class="text-muted m-0"><span><span>
                                    {{cheapMarketData.total_kegiatan}}x
                                </span></span></h2>
                    </div>
                    <div class="d-flex mt-1">
                        <div class="align-self-center">
                            <span class="badge bg-light mb-0 text-muted">
                                Kegiatan
                            </span>
                        </div>
                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
    </div>
</template>
<script>
import { payloadHelper } from '~/helpers/payload.helper';

export default {
    data() {
        return {
            isLoading: true,
            cheapMarketData: {}
        }
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchCheapMarketAvailable();
            }
        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        async fetchCheapMarketAvailable() {
            let normalParam = payloadHelper.normalParam('');
            return this.$summaryAggCheapMarketAvailable.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        this.cheapMarketData = response.result;
                    }
                    console.log('cheapMarketData ::', this.cheapMarketData);
                })
                .finally(() => {
                    console.log('cheapMarketData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching cheap market data:', error);
                });
        },
    },
}
</script>