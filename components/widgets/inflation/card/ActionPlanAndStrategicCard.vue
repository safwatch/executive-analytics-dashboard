<template>
    <div>
        <div v-if="isLoading">
            <!-- shimmer -->
            <div class="widget-simple text-center card">
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
            <!-- end of shimmer -->
        </div>
        <div v-else>
            <div class="widget-simple text-center card card-change">
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
                                    Total Strategi Pengendalian Inflasi dan Total Rencana Aksi yang dilakukan oleh Perangkat Daerah di Civic Administration.
                                </div>
                            </b-popover>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="boxed-section col-lg-6 py-4 bg-light border border-1 rounded">
                                <h3 class="text-muted font-13 counter mt-0">Strategi</h3>
                                <h2 class="text-muted m-0"><span><span>
                                            {{ strategi }}
                                        </span></span></h2>
                            </div>
                            <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                            <div class="boxed-section col-lg-6 bg-light py-4 border border-1 rounded">
                                <h3 class="text-muted font-13 counter mt-0">Rencana Aksi</h3>
                                <h2 class="text-muted m-0"><span><span>
                                            {{ rencanaAksi }}
                                        </span></span></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="card-footer position-relative w-100 bg-transparent">
                    <div class="position-absolute utl-bottom-0 utl-right-0">
                        <a href="javascript:void(0);" class="pl-4 btn btn-primary btn-sm btn-goto-detail">
                            Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                        </a>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            isLoading: true,
        }
    },
    computed: {
        ...mapState('inflationProfile', {
            strategi: state => state.strategi,
            strategiStatus: state => state.strategiStatus,
            rencanaAksi: state => state.rencanaAksi,
            rencanaAksiStatus: state => state.rencanaAksiStatus,
            selectedYear: state => state.selectedYear
        })
    },
    watch: {
        strategiStatus(newStatus) {
            if (newStatus === 'success' || newStatus === 'failure') {
                this.isLoading = false; // Disable loading when the request completes
            }
        },
        rencanaAksiStatus(newStatus) {
            if (newStatus === 'success' || newStatus === 'failure') {
                this.isLoading = false; // Disable loading when the request completes
            }
        },
        selectedYear() {
            if (this.selectedYear) {
                this.isLoading = true;
                this.fetchAggActPlanStrategiesByYear(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            } else {
                this.fetchAggActPlanStrategiesRecap().then(() => {
                    this.isLoading = false;
                });
            }
        }
    },
    mounted() {
        // Check if the data is already loaded in Vuex before showing shimmer
        if (this.rencanaAksiStatus === 'success' && this.strategiStatus === 'success') {
            this.isLoading = false;  // Data is already fetched, no need to show shimmer
        } else {
            if (this.selectedYear) {
                this.fetchAggActPlanStrategiesByYear(this.selectedYear);
            } else {
                this.fetchAggActPlanStrategiesRecap();
            }
        }
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchAggActPlanStrategiesRecap', 'fetchAggActPlanStrategiesByYear'])
    }
};
</script>