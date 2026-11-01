<script>
import Tableau from './dataviz/Tableau.vue';

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
      title: 'Ringkasan Kemiskinan',
      items: [{
        text: 'Sampeu',
        href: '/',
      },
      {
        text: 'Kemiskinan',
        href: '/',
      },
      {
        text: 'Ringkasan',
        active: true,
      },
      ],
      isFixed: false,
      containerWidth: 0,
      value: null,
      value1: null,
      value2: null,
      // width: 1215,
      height: 6027,
      // Tableau DataViz
      // url: 'https://public.tableau.com/views/DASHBOARD-SERVER/SIE?:language=en-US&:display_count=n&:origin=viz_share_link',
      url: 'https://public.tableau.com/views/SIE-Sektor-Ekonomi_17096046655040/DASHBOARD?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link',
      filters: {
        'Storm Name': ['CELIA', 'BLAS', 'AGATHA'],
        'Basin': 'East Pacific'
      },
      // height: 1000,
      width: 1143,
    }
  }
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
              <div class="d-flex justify-content-center">
                <Tableau :url="url" :height="height" :width="width" :filters="filters" ref="tableau"></Tableau>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>