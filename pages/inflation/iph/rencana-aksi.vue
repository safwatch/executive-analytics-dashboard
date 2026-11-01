<script>

import { mapState, mapActions } from 'vuex';

// add content
import IPHRencanaAksiComponent from '~/components/widgets/inflation/IPH-rencana-aksi.vue'


export default {
  head() {
    return {
      title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
    }
  },
  name: 'app-viz',
  components: {
    'default-component': IPHRencanaAksiComponent,
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
        text: 'Strategi dan Rencana Aksi',
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