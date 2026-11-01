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
            <div class="widget-simple text-center card card-change">
                <div class="card-body">
                    <div class="card-head-title position-relative">
                        <h4 class="card-head text-muted mt-0">Indeks Perkembangan Harga <br /> (IPH)</h4>
                        <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                            <a href="javascript:void(0);" id="iph-popover" class="text-muted" variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>
                            <b-popover target="iph-popover" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Indeks Perkembangan Harga (IPH)
                                </template>
                                <div>
                                    Indeks perkembangan harga adalah angka yang menunjukkan perubahan harga rata-rata
                                    dari suatu kelompok barang/jasa dalam periode waktu mingguan, data minggu terakhir
                                    pada suatu bulan.
                                </div>
                            </b-popover>
                        </div>
                    </div>
                    <h3 :class="h3Class" class="counter py-3 mt-0" style="line-height: 30px;">
                        {{ directionSymbol }} {{ formattedValue }}
                    </h3>
                    <!-- Conditional rendering based on whether data is null -->
                    <div v-if="IPHData.value !== '0.00'" class="d-flex justify-content-center">
                        <div v-if="IPHData.status === 'TETAP'" class="d-flex justify-content-center">
                            <div class="align-self-center">
                                <span class="badge bg-warning text-white mb-0">
                                    <i class="ri-checkbox-blank-circle-line"></i>
                                    STABIL
                                </span>
                            </div>
                            <div class="ml-2">
                                <p class="mb-0 text-muted"> dari bulan
                                    <b-badge class="badge-outline-primary"> <span class="badge badge-primary">{{
                                        previousMonth.toUpperCase()
                                            }}</span> {{
                                                previousYear }}</b-badge>
                                </p>
                            </div>
                        </div>
                        <div v-else class="d-flex justify-content-center">
                            <div class="align-self-center">
                                <span class="badge bg-light mb-0" :class="h3Class">
                                    <i v-if="IPHData.status === 'NAIK'" class="ri-arrow-up-line align-middle"></i>
                                    <i v-else class="ri-arrow-down-line align-middle"></i>
                                    {{ IPHData.change_percentage }} %
                                </span>
                            </div>
                            <div class="ml-2">
                                <p class="mb-0 text-muted"> dari bulan
                                    <b-badge class="badge-outline-primary"> <span class="badge badge-primary">{{
                                        previousMonth.toUpperCase()
                                            }}</span> {{
                                                previousYear }}</b-badge>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-muted font-13 mb-0">Data tidak tersedia</p>
                    </div>
                </div>
                <div class="card-footer position-relative w-100 bg-transparent pb-0 ">
                    <div class="position-absolute utl-bottom-0 utl-right-0">
                        <a href="javascript:void(0);" v-b-modal.modal-IPH-Series
                            class="pl-4 btn btn-light btn-sm btn-goto-detail bg-transparent text-primary border-0">
                            Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                        </a>
                    </div>
                    <!-- Modal content -->
                    <b-modal id="modal-IPH-Series" title="Indeks Perkembangan Harga Detail" title-class="font-14"
                        dialog-class="modal-xl custom-modal" hide-footer>
                        <component :is="currentModalComponent" />
                        <template v-slot:modal-footer>
                            <b-button variant="secondary" @click="closeModal">Close</b-button>
                        </template>
                    </b-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import IPHYearSeriesTrend from "../chart/IPHYearSeriesTrend.vue";

export default {
    name: 'IPHProfilCard',
    data() {
        return {
            isLoading: true,
            modalComponent: null,
        }
    },
    components:{
        'iph-year-seriestrend': IPHYearSeriesTrend,
    },
    computed: {
        ...mapState('inflationProfile', {
            IPHData: state => state.IPHData,
            IPHStatus: state => state.IPHStatus,
            selectedYear: state => state.selectedYear,
        }),
        previousMonth() {
            if (this.IPHData.month_id === '1') {
                return 'Desember';
            } else {
                const months = [
                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                ];
                return months[this.IPHData.month_id - 2];
            }
        },
        previousYear() {
            if (this.IPHData.month_id === '1') {
                return this.IPHData.year - 1;
            }
            return this.IPHData.year;
        },
        h3Class() {
            return this.IPHData.status === 'TURUN' ? 'text-success' :
                this.IPHData.status === 'NAIK' ? 'text-danger' : 'text-muted';
        },
        directionSymbol() {
            return this.IPHData.status === 'TURUN' ? '▼' :
                this.IPHData.status === 'NAIK' ? '▲' : '';
        },
        formattedValue() {
            // Parse the string to a number before applying toFixed
            return this.IPHData.value ?
                parseFloat(this.IPHData.value).toFixed(2).replace('.', ',') :
                '0,00';
        },
        message() {
            if (this.IPHData.value === '0.00') {

            } else {

            }
            return `Inflasi tahun ${this.IPHData.tahun}: ${parseFloat(this.IPHData.inflasi_tahun_ini).toFixed(2)}% ${this.directionSymbol} dari ${parseFloat(this.IPHData.inflasi_tahun_sebelumnya).toFixed(2)}%`;
        },
        currentModalComponent() {
            return 'iph-year-seriestrend'
        },
    },
    watch: {
        selectedYear(newVal) {
            if (newVal) {
                this.isLoading = true;
                this.fetchIPHDataByYear(newVal).then(() => {
                    this.isLoading = false;
                });
            }
        },
        IPHStatus(newVal) {
            if (newVal === 'success') {
                this.isLoading = false; // Stop loading shimmer when data is ready
            }
        },
    },
    mounted() {
        // Check if the data is already loaded in Vuex before showing shimmer
        if (this.IPHStatus === 'success') {
            this.isLoading = false;  // Data is already fetched, no need to show shimmer
        } else {
            if (this.selectedYear) {
                this.fetchIPHDataByYear(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            } else {
                this.fetchIPHDataRecap().then(() => {
                    this.isLoading = false;
                });
            }
        }
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchIPHDataByYear', 'fetchIPHDataRecap']),
    },
};
</script>

<style>
.btn-goto-detail {
    border-top-left-radius: 10rem !important;
    border-bottom-left-radius: 0.25rem !important;
}

.custom-modal .page-title-box {
    margin-left: 0 !important;
    margin-right: 0 !important;
    display: none !important;
}

.custom-modal .row.d-flex.align-items-center {
    display: none !important;
}

.custom-modal .card-body {
    padding-top: 0 !important;
}

.custom-modal .modal-content {
    border-radius: 15px !important;
}
</style>