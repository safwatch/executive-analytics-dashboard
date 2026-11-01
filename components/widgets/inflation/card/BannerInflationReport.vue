<template>
    <div>
        <!-- shimmer -->
        <div v-if="isLoading" class="card card-height-100">
            <div class="card-header align-items-center d-flex border-bottom bg-white">
                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
            </div><!-- end card header -->

            <!-- card body -->
            <div class="card-body d-flex">
                <div class="w-100">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'339px'" :borderRadius="'8px'" />
                </div>
            </div>
            <!-- end card body -->
        </div><!-- end card -->
        <!-- end of shimmer -->
        <div v-else class="card card-height-100">
            <div class="card-header align-items-center d-flex border-bottom bg-white">
                <h4 class="card-title mb-0 flex-grow-1 text-muted">Laporan pengendalian inflasi Kota
                    Civic</h4>
                <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                    <a href="javascript:void(0);" id="sebaran-pangan-popover" class="text-muted" variant="light">
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <b-popover target="sebaran-pangan-popover" triggers="hover" placement="right"
                        custom-class="custom-popover">
                        <template v-slot:title>
                            Sebaran Komoditas Pangan
                        </template>
                        <div>
                            Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                            periode satu tahun. Ini
                            adalah cara untuk
                            menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan
                            membandingkan
                            indeks harga
                            konsumen (CPI) atau
                            indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan
                            bulan
                            atau kuartal yang sama
                            pada tahun
                            sebelumnya.
                        </div>
                    </b-popover>
                </div>
            </div><!-- end card header -->

            <!-- card body -->
            <div class="card-body d-flex">
                <div class="d-flex table-card align-items-end">
                    <img src="~/assets/images/inflation/economy-inflation.png" class="img-fluid"
                        alt="Pengendalian inflasi" />
                </div>
            </div>
            <!-- end card body -->
        </div><!-- end card -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            isLoading: true, 
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }
}
</script>