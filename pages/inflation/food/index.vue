<script>

import { mapState, mapActions } from 'vuex';

// add content
import ProfilComponent from '~/components/widgets/inflation/Food-profile.vue'
import KomoditasComponent from '~/components/widgets/inflation/Food-commodity.vue'
import AnalisisComponent from '~/components/widgets/inflation/Food-analysis.vue'
import LaporanComponent from '~/components/widgets/inflation/Food-report.vue'

// add filter for content
import ProfilFilterComponent from '~/components/widgets/inflation/filter/Food-profil-filter.vue'
import KomoditasFilterComponent from '~/components/widgets/inflation/filter/Food-commodity-filter.vue'
import AnalisisFilterComponent from '~/components/widgets/inflation/filter/Food-analisis-filter.vue'
import LaporanFilterComponent from '~/components/widgets/inflation/filter/Food-laporan-filter.vue'

export default {
  head() {
    return {
      title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
    }
  },
  name: 'app-viz',
  components: {
    'profil-component': ProfilComponent,
    'komoditas-component': KomoditasComponent,
    'analisis-component': AnalisisComponent,
    'laporan-component': LaporanComponent,
    'profil-filter-component': ProfilFilterComponent,
    'komoditas-filter-component': KomoditasFilterComponent,
    'analisis-filter-component': AnalisisFilterComponent,
    'laporan-filter-component': LaporanFilterComponent,
  },
  methods: {
  },
  data() {
    return {
      title: 'Inflasi Pangan',
      items: [{
        text: 'Sampeu',
        href: '/',
      },
      {
        text: 'Inflasi Daerah',
        href: '/',
      },
      {
        text: 'Inflasi Pangan',
        active: true,
      },
      ],
      currentTab: 'profil',
      currentFilter: {},
    }
  },
  computed: {
    currentTabComponent() {
      return this.currentTab + '-component'
    },
    currentFilterComponent() {
      if (this.currentTab === 'profil') {
        return 'profil-filter-component'
      } else if (this.currentTab === 'komoditas') {
        return 'komoditas-filter-component'
      } else if (this.currentTab === 'analisis') {
        return 'analisis-filter-component'
      } else if (this.currentTab === 'laporan') {
        return 'laporan-filter-component'
      }
      return null
    },
    showFilter() {
      return this.currentTab === 'profil' || this.currentTab === 'komoditas' || this.currentTab === 'analisis' || this.currentTab === 'laporan'
    }
  },
  methods: {
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
      if (['profil', 'komoditas', 'analisis', 'laporan'].includes(hash)) {
        this.currentTab = hash;
      }
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
              <nav class="navbar navbar-expand-lg navbar-light p-0 col-lg-5">
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li :class="['nav-item', { active: currentTab === 'profil' }]">
                      <a class="nav-link" href="#profil" @click="setActiveTab('profil')">Profil <span
                          class="sr-only">(current)</span></a>
                    </li>
                    <li :class="['nav-item', { active: currentTab === 'komoditas' }]">
                      <a class="nav-link" href="#komoditas" @click="setActiveTab('komoditas')">Komoditas</a>
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
              <nav v-if="showFilter" class="navbar navbar-light flex-row-reverse col-lg-7 p-0">
                <component :is="currentFilterComponent" @filter-change="onFilterChange"></component>
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