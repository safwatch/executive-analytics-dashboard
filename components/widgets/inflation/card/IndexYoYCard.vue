<template>
    <div>
        <!-- shimmer -->
        <div v-if="isLoading">
            <div class="widget-simple text-center card">
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
        </div>
        <!-- end of shimmer -->
        <div v-else>
            <div class="widget-simple text-center card card-danger">
                <div class="card-body">
                    <div class="card-head-title position-relative">
                        <h4 class="card-head text-muted mt-0">Indeks Inflasi Tahunan (YoY)</h4>
                        <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                            <custom-popover></custom-popover>
                        </div>
                    </div>
                    <h3 :class="h3Class" class="counter py-4 mt-0" style="line-height: 30px;">
                        {{ directionSymbol }} {{ formattedValue }}
                    </h3>
                    <!-- Conditional rendering based on whether data is null -->
                    <div v-if="YoY.inflasi_tahun_ini !== '0.00'" class="d-flex justify-content-center">
                        <div class="align-self-center">
                            <span class="badge bg-light text-success mb-0">
                                <i v-if="YoY.status === 'NAIK'" class="ri-arrow-up-line align-middle"></i>
                                <i v-else class="ri-arrow-down-line align-middle"></i>
                                {{ YoY.inflasi_tahun_ini }} %
                            </span>
                        </div>
                        <div class="ml-2">
                            <p class="mb-0 text-muted"> dari tahun
                                <b-badge class="badge-outline-primary">{{previousYear}}</b-badge>
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-muted font-13 mb-0">Data tidak tersedia</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import CustomPopover from '~/components/Popover.vue';

export default {
    name: 'IndexYoYCard',
    components: {
        CustomPopover,
    },
    data() {
        return {
            isLoading: true,
        }
    },
    computed: {
        ...mapState('inflationProfile', {
            YoY: state => state.YoY,
            YoYStatus: state => state.YoYStatus,
            selectedYear: state => state.selectedYear
        }),
        previousYear() {
            return this.YoY.tahun ? this.YoY.tahun - 1 : 'Unknown';
        },
        h3Class() {
            return this.YoY.status === 'TURUN' ? 'text-success' :
                this.YoY.status === 'NAIK' ? 'text-danger' : 'text-muted';
        },
        directionSymbol() {
            return this.YoY.status === 'TURUN' ? '▼' :
                this.YoY.status === 'NAIK' ? '▲' : '';
        },
        formattedValue() {
            // Parse the string to a number before applying toFixed
            return this.YoY.inflasi_tahun_ini ?
                parseFloat(this.YoY.inflasi_tahun_ini).toFixed(2).replace('.', ',') :
                '0,00';
        },
        message() {
            if (this.YoY.inflasi_tahun_ini === '0.00') {

            } else {

            }
            return `Inflasi tahun ${this.YoY.tahun}: ${parseFloat(this.YoY.inflasi_tahun_ini).toFixed(2)}% ${this.directionSymbol} dari ${parseFloat(this.YoY.inflasi_tahun_sebelumnya).toFixed(2)}%`;
        }
    },
    watch: {
        selectedYear() {
            if (this.selectedYear) {
                this.isLoading = true;
                this.fetchYoYDataByYear(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            } else {
                this.fetchYoYDataRecap().then(() => {
                    this.isLoading = false;
                });
            }
        },
        YoYStatus(newVal) {
            if (newVal === 'success') {
                this.isLoading = false; // Stop loading shimmer when data is ready
            }
        }
    },
    mounted() {
        // Check if the data is already loaded in Vuex before showing shimmer
        if (this.YoYStatus === 'success') {
            this.isLoading = false;  // Data is already fetched, no need to show shimmer
        } else {
            if (this.selectedYear) {
                this.fetchYoYDataByYear(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            } else {
                this.fetchYoYDataRecap().then(() => {
                    this.isLoading = false;
                });
            }
        }

        // Simulate loading time or fetch data
        // setTimeout(() => {
        //     this.isLoading = false;
        // }, 2000); // Example delay of 2 seconds
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchYoYDataByYear', 'fetchYoYDataRecap']),
    }
};
</script>

<style scoped></style>