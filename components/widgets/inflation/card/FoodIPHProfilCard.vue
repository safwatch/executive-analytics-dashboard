<template>
    <div>
        <!-- shimmer -->
        <div v-if="isMetricLoading || !metricData">
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
                                    Indeks perkembangan harga adalah angka yang menunjukkan perubahan harga rata-rata dari suatu kelompok barang/jasa dalam periode waktu mingguan, data yang tersedia pada widget ini adalah data <span class="badge badge-outline-primary badge-secondary">IPH Terbaru.</span>
                                </div>
                            </b-popover>
                        </div>
                    </div>
                    <h3 :class="h3Class" class="counter py-3 mt-0" style="line-height: 30px;">
                        {{ directionSymbol }} {{ formattedValue }}
                    </h3>
                    <!-- Conditional rendering based on whether data is null -->
                    <div v-if="metricData.iph !== '0.00'" class="d-flex justify-content-center">
                        <div v-if="metricData.status === 'TETAP'" class="d-flex justify-content-center">
                            <div class="align-self-center">
                                <span class="badge bg-warning text-white mb-0">
                                    <i class="ri-checkbox-blank-circle-line"></i>
                                    STABIL
                                </span>
                            </div>
                            <div class="ml-2">
                                <p class="mb-0 text-muted"> dari bulan
                                    <b-badge class="badge-outline-primary"> <span class="badge badge-primary">{{
                                            previousMonth
                                            }}</span> {{
                                                previousYear }}</b-badge>
                                </p>
                            </div>
                        </div>
                        <div v-else class="d-flex justify-content-center">
                            <div class="align-self-center">
                                <span class="badge bg-light mb-0" :class="h3Class">
                                    <i v-if="metricData.status === 'NAIK'" class="ri-arrow-up-line align-middle"></i>
                                    <i v-else class="ri-arrow-down-line align-middle"></i>
                                    {{ metricData.persentase_perubahan }} %
                                </span>
                            </div>
                            <div class="ml-2">
                                <p class="mb-0 text-muted"> dari bulan
                                    <b-badge class="badge-outline-primary"> <span class="badge badge-primary">{{
                                            previousMonth
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FoodIPHProfilCard',
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
    computed: {
        previousMonth() {
            if (this.metricData.kode_bulan === '1') {
                return 'Desember';
            } else {
                const months = [
                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                ];
                return months[this.metricData.kode_bulan - 2];
            }
        },
        previousYear() {
            if (this.metricData.kode_bulan === '1') {
                return this.metricData.tahun - 1;
            }
            return this.metricData.tahun;
        },
        h3Class() {
            return this.metricData.status === 'TURUN' ? 'text-success' :
                this.metricData.status === 'NAIK' ? 'text-danger' : 'text-muted';
        },
        directionSymbol() {
            return this.metricData.status === 'TURUN' ? '▼' :
                this.metricData.status === 'NAIK' ? '▲' : '';
        },
        formattedValue() {
            // Parse the string to a number before applying toFixed
            return this.metricData.iph ?
                parseFloat(this.metricData.iph).toFixed(2).replace('.', ',') :
                '0,00';
        },
        message() {
            if (this.metricData.iph === '0.00') {

            } else {

            }
            return `Inflasi tahun ${this.metricData.tahun}: ${parseFloat(this.metricData.inflasi_tahun_ini).toFixed(2)}% ${this.directionSymbol} dari ${parseFloat(this.metricData.inflasi_tahun_sebelumnya).toFixed(2)}%`;
        }
    },
};
</script>

<style scoped></style>