<script>

import { mapState, mapActions } from 'vuex';

// add content
import OverwatchIPHCommodityComponent from '~/components/widgets/inflation/Overwatch-IPH-commodity.vue'


export default {
  head() {
    return {
      title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
    }
  },
  name: 'app-viz',
  components: {
    'default-component': OverwatchIPHCommodityComponent,
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
        text: 'Berdasarkan Komoditias',
        active: true,
      },
      ],
      currentTab: 'default',
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