<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

// vuex store
import { mapState, mapActions } from 'vuex';

// add content
import ProfilComponent from '~/components/widgets/inflation/Profil-inflasi.vue'
import AnalisisComponent from '~/components/widgets/inflation/Analisis-inflasi.vue'
import LaporanComponent from '~/components/widgets/inflation/Laporan-inflasi.vue'

// add filter for content
import ProfilFilterComponent from '~/components/widgets/inflation/filter/Profil-filter.vue'
import LaporanFilterComponent from '~/components/widgets/inflation/filter/Laporan-filter.vue'

export default {
  head() {
    return {
      title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
    }
  },
  name: 'app-viz',
  components: {
    'profil-component': ProfilComponent,
    'analisis-component': AnalisisComponent,
    'laporan-component': LaporanComponent,
    'profil-filter-component': ProfilFilterComponent,
    'laporan-filter-component': LaporanFilterComponent,
  },
  data() {
    return {
      title: 'Profile Inflasi Eksekutif',
      items: [{
        text: 'Sampeu',
        href: '/',
      },
      {
        text: 'Inflasi Daerah',
        href: '/',
      },
      {
        text: 'Profil Inflasi Eksekutif',
        active: true,
      },
      ],
      currentTab: 'profil',
      currentFilter: {},
    }
  },
  computed: {
    ...mapState({
      selectedYear: state => state.inflationReport.selectedYear,
      selectedWorkunit: state => state.inflationReport.selectedWorkunit,
      selectedQuarter: state => state.inflationReport.selectedQuarter
    }),
    // Check if any filter is active
    isReportFilterActive() {
      return this.selectedYear !== null || this.selectedWorkunit !== null || this.selectedQuarter !== null;
    },
    currentTabComponent() {
      return this.currentTab + '-component'
    },
    currentFilterComponent() {
      if (this.currentTab === 'profil') {
        return 'profil-filter-component'
      } else if (this.currentTab === 'laporan') {
        return 'laporan-filter-component'
      }
      return null
    },
    showFilter() {
      return this.currentTab === 'profil' || this.currentTab === 'laporan'
    }
  },
  methods: {
    ...mapActions('inflationReport', ['setSelectedYear', 'setSelectedWorkunit', 'setSelectedQuarter', 'resetFilters']),
    setActiveTab(tab) {
      this.currentTab = tab;
      this.currentFilter = {}; // Reset filter when changing tabs
      window.location.hash = tab; // Update URL hash
    },
    onFilterChange(filter) {
      console.log('Filter received in parent:', filter); // Debugging line
      this.currentFilter = filter;
    },
    checkHash() {
      const hash = window.location.hash.replace('#', '');
      if (['profil', 'analisis', 'laporan'].includes(hash)) {
        this.currentTab = hash;
      }
    },
    // Method to reset all filters
    resetFilters() {
      this.setSelectedYear(null);
      this.setSelectedWorkunit(null);
      this.setSelectedQuarter(null);

      // Dynamically access the filter component's ref based on the current tab
      const filterRef = `${this.currentTab}FilterComponent`;

      if (this.$refs[filterRef]) {
        this.$refs[filterRef].localSelectedYear = null;
        this.$refs[filterRef].localSelectedWorkunit = null;
        this.$refs[filterRef].localSelectedQuarter = null;
      }

       // Reset filters in the Vuex store
       this.$store.dispatch('inflationReport/resetFilters');
    }
  },
  mounted() {
    this.checkHash();
    window.addEventListener('hashchange', this.checkHash);
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.checkHash);
  }

}
</script>
<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-xl-12">
        <!-- card-top-navbar -->
        <div class="card card-top-navbar">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <nav :class="isReportFilterActive ? 'col-lg-4' : 'col-lg-5'"
                class="navbar navbar-expand-lg navbar-light p-0">
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li :class="['nav-item', { active: currentTab === 'profil' }]">
                      <a class="nav-link" href="#profil" @click="setActiveTab('profil')">Profil <span
                          class="sr-only">(current)</span></a>
                    </li>
                    <li :class="['nav-item', { active: currentTab === 'analisis' }]">
                      <a class="nav-link" href="#analisis" @click="setActiveTab('analisis')">Analisis</a>
                    </li>
                    <li :class="['nav-item', { active: currentTab === 'laporan' }]">
                      <a class="nav-link" href="#laporan" @click="setActiveTab('laporan')">Laporan</a>
                    </li>
                  </ul>
                </div>
              </nav>
              <div v-if="currentTab === 'laporan'" :class="isReportFilterActive ? 'col-lg-1' : ''">
                <button v-if="isReportFilterActive" @click="resetFilters" class="btn btn-warning btn-rounded w-100"><i
                    class="mdi mdi-refresh fs-14 text-dark"></i></button>
              </div>
              <nav v-if="showFilter" :class="isReportFilterActive ? 'col-lg-7' : 'col-lg-7'"
                class="navbar navbar-light flex-row-reverse p-0">
                <component :is="currentFilterComponent" :ref="`${currentTab}FilterComponent`"
                  @filter-change="onFilterChange"></component>
              </nav>
            </div>
          </div>
        </div>
        <!-- end of card-top-navbar -->
      </div>
    </div>
    <component :is="currentTabComponent" :filter="currentFilter"></component>
  </div>
</template>