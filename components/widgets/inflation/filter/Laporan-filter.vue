<template>
  <nav class="w-100">
    <div class="d-flex justify-content-between">
      <div class="col-lg-3">
        <multiselect ref="yearFilter" v-model="localSelectedYear" :options="yearFilter" placeholder="Tahun"
          @input="onYearChange" label="year" track-by="year" :allow-empty="false" :tag-placeholder="''"></multiselect>
      </div>
      <div class="col-lg-9 pr-0">
        <multiselect ref="workunitSelection" v-model="localSelectedWorkunit" :options="workunits"
          placeholder="Perangkat Daerah" label="name" track-by="id" @input="onWorkunitChange"
          @open="adjustDropdownWidth('workunitSelection')" :allow-empty="false" :tag-placeholder="''">
        </multiselect>
      </div>
      <!-- <div class="col-lg-3 pr-0">
        <multiselect ref="quarterMultiselect" v-model="localSelectedQuarter" :options="quarterOptions"
          placeholder="Triwulan" label="label" track-by="id" @input="onQuarterChange" :allow-empty="false"
          :tag-placeholder="''">
        </multiselect>
      </div> -->
    </div>

  </nav>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from 'vuex';
import quartersJsonData from "@/components/widgets/inflation/filter/quarters.json";
import workunitsJsonData from "@/components/widgets/inflation/filter/workunits.json";

export default {
  name: 'ReportFilterComponent',
  components: {
    Multiselect,
  },
  data() {
    return {
      localSelectedYear: null,
      localSelectedWorkunit: null,
      localSelectedQuarter: null,
      workunits: workunitsJsonData.data || [],
      quarterOptions: quartersJsonData.data || [],
    }
  },
  computed: {
    ...mapState({
      yearFilter: state => state.inflationReport.yearFilter,
      yearFilterStatus: state => state.inflationReport.yearFilterStatus,
      selectedYear: state => state.inflationReport.selectedYear,
      selectedWorkunit: state => state.inflationReport.selectedWorkunit,
      selectedQuarter: state => state.inflationReport.selectedQuarter
    }),
    // Check if any filter is active
    isFilterActive() {
      return this.localSelectedYear !== null || this.localSelectedWorkunit !== null || this.localSelectedQuarter !== null;
    }
  },
  watch: {
    selectedYear(newVal) {
      this.localSelectedYear = newVal; // Sync local data with Vuex state
    },
    selectedWorkunit(newVal) {
      this.localSelectedWorkunit = newVal;
    },
    selectedQuarter(newVal) {
      this.localSelectedQuarter = newVal;
    },
    localSelectedYear(newVal) {
      if (newVal !== this.selectedYear) {
        this.setSelectedYear(newVal); // Sync Vuex state with local data if they differ
      }
    },
    localSelectedWorkunit(newVal) {
      if (newVal !== this.selectedWorkunit) {
        this.setSelectedWorkunit(newVal);
      }
    },
    localSelectedQuarter(newVal) {
      if (newVal !== this.selectedQuarter) {
        this.setSelectedQuarter(newVal);
      }
    }
  },
  created() {
    this.$store.dispatch('inflationReport/fetchYearFilter');
    this.localSelectedYear = this.selectedYear;
    this.localSelectedWorkunit = this.selectedWorkunit;
    this.localSelectedQuarter = this.selectedQuarter;
  },
  mounted() {
    // Select the multiselect options by class and modify the attributes
    this.$nextTick(() => {
      const options = document.querySelectorAll('.multiselect__option');
      options.forEach(option => {
        option.removeAttribute('data-deselect'); // Remove the data-deselect attribute
      });
    });
  },
  methods: {
    ...mapActions('inflationReport', ['setSelectedYear', 'setSelectedWorkunit', 'setSelectedQuarter', 'setSelectedFilters']),
    adjustDropdownWidth(refName) {
      this.$nextTick(() => {
        const multiselect = this.$refs[refName].$el;
        const dropdown = multiselect.querySelector('.multiselect__content-wrapper');
        if (dropdown) {
          const parentWidth = multiselect.offsetWidth;
          const longestOption = this.workunits.reduce((longest, current) => {
            return current.name.length > longest.name.length ? current : longest;
          }, { name: '' });
          const tempDiv = document.createElement('div');
          tempDiv.style.position = 'absolute';
          tempDiv.style.visibility = 'hidden';
          tempDiv.style.whiteSpace = 'nowrap';
          tempDiv.innerText = longestOption.name;
          document.body.appendChild(tempDiv);
          const requiredWidth = tempDiv.offsetWidth + 30; // add some padding
          document.body.removeChild(tempDiv);
          dropdown.style.width = requiredWidth > parentWidth ? requiredWidth + 'px' : parentWidth + 'px';
        }
      });
    },
    onYearChange(value) {
      console.log('Selected Year:', value);
      this.setSelectedYear(value); // Commit the selected year to Vuex
      this.emitFilterChange();
      this.$emit('year-change', { profile: value });
    },

    // Handle Workunit selection change
    onWorkunitChange(value) {
      this.setSelectedWorkunit(value);
      this.emitFilterChange();
    },

    // Handle Quarter selection change
    onQuarterChange(value) {
      console.log('quater changed:', value);
      this.setSelectedQuarter(value);
      this.emitFilterChange();
    },
    emitFilterChange() {
      const filters = {
        year: this.localSelectedYear,
        workunit: this.localSelectedWorkunit,
        quarter: this.localSelectedQuarter,
      };
      this.setSelectedFilters(filters); // This will dispatch the Vuex action to update the store and fetch data if necessary.
    },
  }
}
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

::v-deep(.multiselect__single) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

::v-deep(.multiselect__content-wrapper) {
  position: absolute;
  right: 0;
  left: auto;
  z-index: 1000;
}

::v-deep(.multiselect__option[data-deselect]:after) {
  content: none !important;
}
</style>