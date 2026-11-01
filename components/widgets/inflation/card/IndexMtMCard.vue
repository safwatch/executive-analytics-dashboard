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
            <h4 class="card-head text-muted mt-0">Indeks Inflasi Bulanan (MtM)</h4>
            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
              <a href="javascript:void(0);" id="mtm-popover" class="text-muted" variant="light">
                <i class="fa fa-info-circle"></i>
              </a>
              <b-popover target="mtm-popover" triggers="hover" placement="right" custom-class="custom-popover">
                <template v-slot:title>
                  Month to Month (MtM)
                </template>
                <div>
                  Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                  periode satu tahun. Ini
                  adalah cara untuk
                  menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan
                  indeks harga
                  konsumen (CPI) atau
                  indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan
                  atau kuartal yang sama
                  pada tahun
                  sebelumnya.
                </div>
              </b-popover>
            </div>
          </div>
          <div v-if="MtMStatus === 'success'">
            <h3 :class="directionClass" class="counter py-4 mt-0" style="line-height: 30px;">
              {{ directionSymbol }} {{ formattedMtMValue }}
            </h3>
            <p class="text-muted font-13 mb-0">Perubahan: 
              <span class="badge bg-light mb-0" :class="textClass"> 
              <i v-if="MtM.keterangan === 'Turun'"
                  class="ri-arrow-down-line align-middle"></i>
              <i v-else
                  class="ri-arrow-up-line align-middle"></i>
                {{ MtM.perubahan_inflasi }}%</span> </p>
            <!-- <p class="text-muted font-13 mb-0">data terakhir adalah: {{ MtM.nama_bulan }}</p> -->
          </div>
          <div v-else>
            <p class="text-muted font-13 mb-0">Data tidak tersedia</p>
          </div>
          <!-- Include the MtM Full-Year Chart Component -->
          <MtMFullYearChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MtMFullYearChart from './MtmChildComponentChart.vue';

export default {
  components: {
    MtMFullYearChart
  },
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState('inflationProfile', {
      MtM: state => state.MtM,
      MtMStatus: state => state.MtMStatus,
      selectedYear: state => state.selectedYear
    }),
    directionClass() {
      return this.MtM.keterangan === 'Turun' ? 'text-success' :
        this.MtM.keterangan === 'Naik' ? 'text-danger' : 'text-muted';
    },
    textClass() {
      return this.MtM.keterangan === 'Turun' ? 'text-success' :
        this.MtM.keterangan === 'Naik' ? 'text-danger' : ''; // No symbol for 'unknown'
    },
    directionSymbol() {
      return this.MtM.keterangan === 'Turun' ? '▼' :
        this.MtM.keterangan === 'Naik' ? '▲' : ''; // No symbol for 'unknown'
    },
    formattedMtMValue() {
      return this.MtM.tingkat_inflasi ? parseFloat(this.MtM.tingkat_inflasi).toFixed(2).replace('.', ',') : '0,00';
    },
    message() {
      return this.MtMStatus === 'success' ? 'Data loaded successfully' : 'No data available';
    }
  },
  mounted() {
    // Check if the data is already loaded in Vuex before showing shimmer
    if (this.MtMStatus === 'success') {
      this.isLoading = false;  // Data is already fetched, no need to show shimmer
    } else {
      if (this.selectedYear) {
        this.fetchMtMDataByYear(this.selectedYear);
      } else {
        this.fetchMtMDataRecap();
      }
      console.log("Mtm ??? ", this.MtM);
    }
  },
  watch: {
    selectedYear() {
      if (this.selectedYear) {
        this.isLoading = true;
        this.fetchMtMDataByYear(this.selectedYear).then(() => {
          this.isLoading = false;
        });
      } else {
        this.fetchMtMDataByYear().then(() => {
          this.isLoading = false;
        });
      }
    },
    MtMStatus(newVal) {
      if (newVal === 'success') {
        this.isLoading = false;
      }
    }
  },
  methods: {
    ...mapActions('inflationProfile', ['fetchMtMDataByYear', 'fetchMtMDataRecap']),
  }
};
</script>