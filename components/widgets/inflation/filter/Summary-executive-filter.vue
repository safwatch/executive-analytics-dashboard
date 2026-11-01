<template>
    <div class="row align-items-start">
        <div class="col d-flex flex-row-reverse">
            <div class="d-flex w-25 gap-5">
                <label for="tahun" class="col-form-label">Tahun</label>
                <div class="w-100">
                    <!-- <a href="javascript:void(0);" class="d-flex align-items-center select-clear-selection">
                        <i class="mdi mdi-refresh fs-18"></i>
                    </a> -->
                    <multiselect v-model="localSelectedYear" :options="yearFilter" placeholder="Tahun"
                        @input="onYearChange" label="year" track-by="year" :allow-empty="false" :tag-placeholder="''">
                    </multiselect>
                </div>
            </div>
        </div>
        <!-- 
        <div class="col-auto">
            <button type="submit" class="btn btn-rounded btn-dark"><i class=" ri-filter-fill"></i></button>
        </div> -->
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from 'vuex';

export default {
    name: 'SummaryExecutiveFilterComponent',
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
            yearFilter: state => state.inflationSummary.yearFilter,
            yearFilterStatus: state => state.inflationSummary.yearFilterStatus,
            selectedYear: state => state.inflationSummary.selectedYear // Map selectedYear from Vuex
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
        this.$store.dispatch('inflationSummary/fetchYearFilter');
        this.localSelectedYear = this.selectedYear; // Initialize local data with Vuex state
    },

    methods: {
        ...mapActions('inflationSummary', ['setSelectedYear', 'setSelectedFilters']),
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
<style>

.select-clear-selection {
  position: absolute;
  right: 25px;
  height: 100%;
  width: auto;
  z-index: 5;
}
</style>