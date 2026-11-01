<template>
  <nav class="w-50">
    <div v-if="isLoading">
      <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'36.8px'" :borderRadius="'8px'" />
    </div>
    <div v-else>
      <multiselect v-model="localSelectedYear" :options="yearFilter" placeholder="Tahun" @input="onFilterChange"
        label="year" track-by="year"></multiselect>
    </div>
  </nav>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProfilFilterComponent',
  components: {
    Multiselect,
  },
  data() {
    return {
      localSelectedYear: null,
      isLoading: true,
    }
  },
  computed: {
    ...mapState({
      yearFilter: state => state.inflationProfile.yearFilter,
      yearFilterStatus: state => state.inflationProfile.yearFilterStatus,
      selectedYear: state => state.inflationProfile.selectedYear // Map selectedYear from Vuex
    })
  },
  watch: {
    selectedYear(newVal) {
      this.selectedYearLocal = newVal; // Sync local data with Vuex state
    },
    localSelectedYear(newVal) {
      if (newVal !== this.selectedYear) {
        this.setSelectedYear(newVal); // Sync Vuex state with local data if they differ
      }
    }
  },
  created() {
    this.$store.dispatch('inflationProfile/fetchYearFilter');
    this.localSelectedYear = this.selectedYear; // Initialize local data with Vuex state
  },

  methods: {
    ...mapActions('inflationProfile', ['setSelectedYear']),
    onFilterChange(value) {
      console.log('Selected Year:', value);
      this.setSelectedYear(value); // Commit the selected year to Vuex
      this.$emit('filter-change', { profile: value });
    }
  },
  mounted() {
    // Simulate loading time or fetch data
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Example delay of 2 seconds
  },
}
</script>