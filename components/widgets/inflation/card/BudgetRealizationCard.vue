<template>
    <div>
        <div v-if="isLoading">
            <!-- shimmer -->
            <div class="widget-simple text-center card">
                <div class="card-body">
                    <div class="card-head-title position-relative">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div>
                    <div class="d-flex  flex-column ">
                        <div class="boxed-section col-lg-12 pt-2 px-0">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'73px'" :borderRadius="'8px'" />
                        </div>
                        <div class="boxed-section col-lg-12 pt-2 px-0">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'27px'" :borderRadius="'8px'" />
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
                        <h4 class="card-head text-muted mt-0">Realisasi Anggaran</h4>
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
                                    Total Realisasi Anggaran dan Realisasi Kinerja Pengendalian Inflasi.
                                </div>
                            </b-popover>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="boxed-section col-lg-12 py-3 bg-light border border-1 rounded mb-2">
                            <h2 class="text-muted m-0"><span><span>
                                        {{ displayPersentaseCapaian }}
                                    </span></span></h2>
                        </div>
                        <div class="boxed-section col-lg-12 bg-light border border-1 rounded py-1">
                            Anggaran terserap: {{ formattedAnggaranTerserap }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            isLoading: true, // Controls the loading state
        };
    },
    computed: {
        ...mapState('inflationProfile', {
            budgetRealization: state => state.budgetRealization,
            budgetRealizationStatus: state => state.budgetRealizationStatus,
            selectedYear: state => state.selectedYear
        }),
        displayPersentaseCapaian() {
            return this.budgetRealization.persentaseCapaian === "Unknown" || !this.budgetRealization.persentaseCapaian
                ? "No Data"
                : this.budgetRealization.persentaseCapaian;
        },
        formattedAnggaranTerserap() {
            // Format the anggaran_terserap as millions or thousands as needed
            const terserap = this.budgetRealization.anggaranTerserap;
            return terserap;
        }
    },
    watch: {
        budgetRealizationStatus(newStatus) {
            if (newStatus === 'success' || newStatus === 'failure') {
                this.isLoading = false; // Disable loading when data is fetched
            }
        },
        selectedYear() {
            if (this.selectedYear) {
                this.isLoading = true;
                this.fetchBudgetRealizationByYear(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            } else {
                this.fetchBudgetRealizationRecap().then(() => {
                    this.isLoading = false;
                });
            }
        }
    },
    mounted() {
        // Check if the data is already loaded in Vuex before showing shimmer
        if (this.budgetRealizationStatus === 'success') {
            this.isLoading = false;  // Data is already fetched, no need to show shimmer
        } else {
            if (this.selectedYear) {
                this.fetchBudgetRealizationByYear(this.selectedYear);
            } else {
                this.fetchBudgetRealizationRecap();
            }
        }
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchBudgetRealizationRecap', 'fetchBudgetRealizationByYear'])
    }
};
</script>
