<script>
import Tableau from './Tableau.vue';

export default {
  head() {
    return {
      title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
    }
  },
  name: 'app-viz',
  components: {
    Tableau
  },
  methods: {
    testSize() {
        this.height = 500,
        this.width = 500
    },
    testFilters() {
      this.filters = {}
    },
    testExport() {
      this.$refs.tableau.viz.showExportPDFDialog()
    }
  },
  data() {
    return {
      title: 'Tableu DataViz',
      items: [{
        text: 'Sampeu',
        href: '/',
      },
      {
        text: 'Kemiskinan',
        href: '/',
      },
      {
        text: 'Data Viz',
        active: true,
      },
      ],
      isFixed: false,
      containerWidth: 0,
      value: null,
      value1: null,
      value2: null,
      // Tableau DataViz
      url: 'https://public.tableau.com/views/HBCUsOverview/HBCUsOverview?:language=en-US&:display_count=n&:origin=viz_share_link',
      filters: {
        'Storm Name': ['CELIA', 'BLAS', 'AGATHA'],
        'Basin': 'East Pacific'
      },
      height: 1227,
      width: 1600,
    }
  },
  mounted() {

  },
}
</script>
<style>
#app-viz {
  font-family: "Roboto", sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div id="app-viz">
              <div class="button-list mb-2">
                <b-button size="md" variant="light" @click="testFilters">Change Filter</b-button>
                <b-button size="md" variant="light" @click="testSize">Change Size</b-button>
                <b-button size="md" variant="light" @click="testExport">Export PDF</b-button>
              </div>
              <div class="d-flex justify-content-center">
                <Tableau :url="url" :height="this.height" :width="this.width" :filters="filters" ref="tableau"></Tableau>
                <div id="some-place"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>