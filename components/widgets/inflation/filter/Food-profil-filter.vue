<template>
  <nav class="w-50">
    <multiselect v-model="localSelectedYear" :options="yearFilter" placeholder="Tahun" @input="onYearChange"
      label="year" track-by="year"></multiselect>
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
    }
  },
  computed: {
    ...mapState({
      yearFilter: state => state.foodProfile.yearFilter,
      yearFilterStatus: state => state.foodProfile.yearFilterStatus,
      selectedYear: state => state.foodProfile.selectedYear 
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
    this.$store.dispatch('foodProfile/fetchYearFilter');
    this.localSelectedYear = this.selectedYear; // Initialize local data with Vuex state
  },

  methods: {
    ...mapActions('foodProfile', ['setSelectedYear', 'setSelectedFilters']),
    onYearChange(value) {
      console.log('Selected Year:', value);
      this.setSelectedYear(value); // Commit the selected year to Vuex
      this.emitFilterChange();
      this.$emit('year-change', { profile: value });
    },
    emitFilterChange() {
      const filters = {
        year: this.localSelectedYear,
      };
      this.setSelectedFilters(filters); // This will dispatch the Vuex action to update the store and fetch data if necessary.
    },
  }
}
</script>