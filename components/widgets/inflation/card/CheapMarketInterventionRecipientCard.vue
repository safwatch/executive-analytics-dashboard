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
                        <div class="d-flex justify-content-between mt-2">
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
        <div v-else class="card card-animate card-change">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Penerima Manfaat <br />Pasar Murah
                    </h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="cheapmarketrecepient-popover" class="text-muted"
                            variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="cheapmarketrecepient-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Penerima Manfaat Pasar Murah
                            </template>
                            <div>
                                Total dari penerima manfaat Pasar Murah Sebagai bentuk pengendalian inflasi Civic Administration.
                            </div>
                        </b-popover>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div class="boxed-section col-lg-12 py-2 bg-light border border-1 rounded text-center">
                        <h2 class="text-muted m-0"><span><span>
                                    {{ cheapMarketRecepientData.jumlah_penerima_manfaat_sekarang }}
                                </span></span></h2>
                    </div>
                    <div class="d-flex justify-content-between mt-3 mb-1">
                        <div class="align-self-center">
                            <span :class="getBadgeClass(cheapMarketRecepientData.status_perubahan)"> <i
                                    :class="getIconClass(cheapMarketRecepientData.status_perubahan)" class="align-middle"></i>
                                {{ cheapMarketRecepientData.persentase_perubahan || 'N/A' }} %
                            </span>
                        </div>
                        <div class="ml-2">
                            <p class="mb-0 text-muted fs-12"> Dibanding bulan <span
                                    class="fs-9 badge badge-outline-primary badge-secondary">{{
                                        cheapMarketRecepientData.bulan_sebelumnya  }}</span></p>
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
            cheapMarketRecepientData: {}
        }
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchCheapMarketInterventionRecepient();
            }
        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        async fetchCheapMarketInterventionRecepient() {
            let normalParam = payloadHelper.normalParam('');
            return this.$summaryAggIndividualCheapFoodIntervention.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        this.cheapMarketRecepientData = response.result.perubahan;
                    }
                    console.log('cheapMarketRecepientData :', this.cheapMarketRecepientData);
                })
                .finally(() => {
                    console.log('cheapMarketRecepientData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching cheap market data:', error);
                });
        },
        getBadgeClass(keterangan) {
            return keterangan === 'NAIK' ? 'badge bg-light text-danger' : 'badge bg-light text-success';
        },
        getIconClass(keterangan) {
            return keterangan === 'TURUN' ? 'ri-arrow-down-line' : 'ri-arrow-up-line';
        },
    },
}
</script>