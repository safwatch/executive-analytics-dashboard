<script>

import { mapState, mapActions } from 'vuex';

// add content
import OverviewSummaryComponent from '~/components/widgets/inflation/Overview-summary.vue'


export default {
  head() {
    return {
      title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
    }
  },
  name: 'inflation-overview',
  components: {
    'overview-summary-component': OverviewSummaryComponent,
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
        text: 'Pemantauan IPH (Harga)',
        href: '/',
      },
      {
        text: 'Ringkasan',
        active: true,
      },
      ],
      currentTab: 'overview-summary',
    }
  },
  computed: {
    currentTabComponent() {
      return this.currentTab + '-component'
    },
  },
  methods: {
    setActiveTab(tab) {
      this.currentTab = tab;
      window.location.hash = tab; // Update URL hash
    },
  },
  mounted() {
  },
}
</script>
<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <component :is="currentTabComponent"></component>
  </div>
</template>
