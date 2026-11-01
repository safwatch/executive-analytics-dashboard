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
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'104px'" :borderRadius="'8px'" />
                        </div>
                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
        <!-- end of shimmer  -->
        <div v-else class="card card-animate card-change">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Kerjasama Antar Daerah
                    </h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="regional-coop-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="regional-coop-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Kerjasama Antar Daerah
                            </template>
                            <div>
                                Merupakan jumlah Kerjasama dari berbagai daerah atau wilayah penghasil pangan untuk menjaga stabilitas pangan.
                            </div>
                        </b-popover>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <span class="position-absolute zi2 badge badge-soft-secondary badge-secondary">Tahun : {{regionalCooperationData.tahun}}</span>
                    <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded text-center">
                        <h2 class="text-muted py-1 my-2"><span><span>
                                    {{regionalCooperationData.total_kerjasama_antar_daerah}}
                                </span></span></h2>
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
            regionalCooperationData: {}
        }
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchRegionalCooperation();
            }
        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        async fetchRegionalCooperation() {
            let normalParam = payloadHelper.normalParam('');
            return this.$summaryAggRegionalCooperationQuota.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        this.regionalCooperationData = response.result;
                    }
                    console.log('regionalCooperationData ::', this.regionalCooperationData);
                })
                .finally(() => {
                    console.log('regionalCooperationData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching cheap market data:', error);
                });
        },
    },
}
</script>