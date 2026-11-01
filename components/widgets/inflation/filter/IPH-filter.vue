<template>
    <div class="row align-items-start">
        <div class="col d-flex flex-row-reverse">
            <div class="d-flex w-25 gap-5 pl-4">
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
            <div class="d-flex w-25 gap-5">
                <label for="tahun" class="col-form-label">Bulan</label>
                <div class="w-100">
                    <multiselect v-model="localSelectedMonth" :options="monthFilters" placeholder="Bulan"
                        @input="onMonthChange" label="month" track-by="month" :allow-empty="false" :tag-placeholder="''">
                    </multiselect>
                </div>
            </div>
        </div>
        
        <!-- <div class="col-auto">
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
            localSelectedMonth: null,
            monthFilters: [
                {id : 1, month : 'Januari'},
                {id : 2, month : 'Februari'},
                {id : 3, month : 'Maret'},
                {id : 4, month : 'April'},
                {id : 5, month : 'Mei'},
                {id : 6, month : 'Juni'},
                {id : 7, month : 'Juli'},
                {id : 8, month : 'Agustus'},
                {id : 9, month : 'September'},
                {id : 10, month : 'Oktober'},
                {id : 11, month : 'November'},
                {id : 12, month : 'Desember'},
            ],
        }
    },
    computed: {
        ...mapState({
            yearFilter: state => state.inflationSummary.yearFilter,
            yearFilterStatus: state => state.inflationSummary.yearFilterStatus,
            selectedYear: state => state.inflationSummary.selectedYear, // Map selectedYear from Vuex
            
            monthFilter: state => state.inflationSummary.monthFilter,
            monthFilterStatus: state => state.inflationSummary.monthFilterStatus,
            selectedMonth: state => state.inflationSummary.selectedMonth,
            

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
        },
        selectedMonth(newValue) {
            this.selectedMonthLocal = newValue;
        },
        localSelectedMonth(newValue) {
            if (newValue !== this.selectedMonth) {
                this.setSelectedMonth(newValue);
            }
        }
    },
    created() {
        this.$store.dispatch('inflationSummary/fetchYearFilter');
        this.$store.dispatch('inflationSummary/fetchMonthFilter');
        this.localSelectedYear = this.selectedYear; // Initialize local data with Vuex state
        this.localSelectedMonth = this.selectedMonth;
    },

    methods: {
        ...mapActions('inflationSummary', ['setSelectedYear', 'setSelectedMonth', 'setSelectedFilters']),
        onYearChange(value) {
            // console.log('Selected Year:', value);
            this.setSelectedYear(value); // Commit the selected year to Vuex
            this.emitFilterChange();
            this.$emit('year-change', { profile: value });
        },
        onMonthChange(value) {
            // console.log('Selected Month:', value);
            this.setSelectedMonth(value);
            this.emitFilterChange();
            this.$emit('month-change', { profile: value });
        },
        emitFilterChange() {
            const filters = {
                year: this.localSelectedYear,
                month: this.localSelectedMonth,
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