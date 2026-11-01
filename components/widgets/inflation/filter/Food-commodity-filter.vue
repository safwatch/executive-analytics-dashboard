<template>
  <nav class="w-50 d-flex justify-content-between  card-danger bg-transparent position-relative">
    <a v-if="showClearSelection" href="javascript:void(0);" :class="{ 'fade-out': !showClearSelection }"
      class="d-flex align-items-center select-clear-selection" @click="clearSelection">
      <i class="mdi mdi-close fs-18"></i>
    </a>
    <multiselect v-model="localSelectedCommodities" :options="commodityOptions" placeholder="Pilih Komoditas"
      @input="onFilterChange" label="name" track-by="id"></multiselect>
  </nav>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapActions } from 'vuex';
import commodityJsonData from "@/components/widgets/inflation/filter/commodity-item.json";

export default {
  name: 'FoodCommodityFilterComponent',
  components: {
    Multiselect,
  },
  computed: {
    ...mapState('foodCommodity', {
      itemFilter: state => state.itemFilter,
      selectedCommodity: state => Array.isArray(state.selectedCommodity) ? state.selectedCommodity : [], // Ensure it's always an array
    })
  },
  data() {
    return {
      localSelectedCommodities: [], // Local state for selected commodities
      showClearSelection: false,
      // commodityOptions: commodityJsonData.data || [], // Load options from JSON
      commodityOptions: []
    };
  },

  watch: {
    selectedCommodity(newVal) {
      console.log('selectedCommodity changed:', newVal); // Debugging log
      this.showClearSelection = newVal !== null;
    },
    itemFilter(newVal) {
      this.commodityOptions = newVal;
    }
  },
  mounted() {
    this.fetchDataFilterCommodities().then(() => {
    });
  },
  methods: {
    ...mapActions('foodCommodity', ['setSelectedCommodity']),
    ...mapActions('foodCommodity', ['fetchDataFilterCommodities']),
    onFilterChange(selectedCommodity) {
      console.log('onFilterChange called with:', selectedCommodity); // Debugging

      // Check if selectedCommodity is a reactive object and unwrap it
      const selectedId = selectedCommodity && selectedCommodity.id ? selectedCommodity.id : null;

      // Control the visibility of the "Clear Selection" button
      this.showClearSelection = !!selectedId;

      this.setSelectedCommodity(selectedCommodity); // Commit IDs to Vuex
      this.$emit('filter-change', { commodityId: selectedId });
    },
    // Method to clear the selection
    clearSelection() {
      console.log('clearSelection called'); // Debugging log
      this.localSelectedCommodities = []; // Clear the local selected commodity immediately
      // Start the fade-out by setting showClearSelection to false after a delay
      setTimeout(() => {
        this.showClearSelection = false; // Hide the clear selection button after fade-out
        this.setSelectedCommodity(null);  // Update Vuex store to null
      }, 300); // Timeout duration matches the CSS transition durationll
    },
  }

};
</script>

<style scoped>
::v-deep(.multiselect__option) {
  display: flex;
  align-items: center;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Ensure the selected value in the input is truncated */
::v-deep(.multiselect__single) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Align the dropdown to the right */
::v-deep(.multiselect__content-wrapper) {
  position: absolute;
  right: 0;
  left: auto;
  /* Ensure the dropdown aligns to the right */
  z-index: 1000;
  /* Adjust z-index if necessary */
}

::v-deep(.select-clear-selection) {
  position: absolute;
  right: 25px;
  height: 100%;
  width: auto;
  z-index: 5;
}
</style>
