<template>
  <nav class="w-50 d-flex justify-content-between  card-danger bg-transparent">
    <a v-if="showClearSelection" href="javascript:void(0);" :class="{ 'fade-out': !showClearSelection }"
      class="d-flex align-items-center select-clear-selection" @click="clearSelection">
      <i class="mdi mdi-refresh fs-18"></i>
    </a>
    <multiselect v-model="localSelectedMarket" :options="marketOptions" placeholder="Pilih Pasar"
      @input="onFilterChange" label="name" mu track-by="id" :multiple="true"></multiselect>
  </nav>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MarketFilterComponent',
  components: {
    Multiselect,
  },
  computed: {
    ...mapState('overwatchIPHCommodity', {
      selectedMarket: state => Array.isArray(state.selectedMarket) ? state.selectedMarket : [], // Ensure it's always an array
    })
  },
  data() {
    return {
      localSelectedMarket: [],
      showClearSelection: false,
      marketOptions: [
        {
                    id: 1,
                    name: 'Pasar Atas',
                },
                {
                    id: 2,
                    name: 'Pasar Antri',
                },
                {
                    id: 3,
                    name: 'Pasar Baros',
                },
                {
                    id: 4,
                    name: 'Pasar Cimindi',
                },
                {
                    id: 5,
                    name: 'Pasar Rancabentang',
                },
                {
                    id: 6,
                    name: 'Pasar Melong',
                },
      ]
    };
  },

  watch: {
    selectedMarket(newVal) {
      this.showClearSelection = newVal !== null;
    },
  },
  methods: {
    ...mapActions('overwatchIPHCommodity', ['setSelectedMarket']),
    onFilterChange(selectedMarket) {
      // console.log('onFilterChange called with:', selectedMarket);

      // Control the visibility of the "Clear Selection" button
      this.showClearSelection = selectedMarket?.length > 0;

      this.setSelectedMarket(selectedMarket); // Commit IDs to Vuex
      this.$emit('filter-change', { selectedMarket });
    },
    // Method to clear the selection
    clearSelection() {
      console.log('clearSelection called'); // Debugging log
      this.localSelectedMarket = []; // Clear the local selected commodity immed
      setTimeout(() => {
        this.showClearSelection = false; // Hide the clear selection button after fade-out
        this.setSelectedMarket([]);  // Update Vuex store to null
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
