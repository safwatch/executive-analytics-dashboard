<template>
  <nav class="w-100">
    <div class="d-flex justify-content-end card-danger bg-transparent">
      <div class="col-lg-5">
        <multiselect ref="yearFilter" v-model="localSelectedYear" :options="yearFilter" placeholder="Tahun"
          @input="onFilterChange" label="year" track-by="year"></multiselect>
      </div>
      <div class="col-lg-5 pr-0">
        <multiselect ref="monthMultiselect" v-model="selectedMonth" :options="monthOptions" placeholder="Bulan"
          label="label" track-by="value">
        </multiselect>
      </div>
    </div>

  </nav>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ReportFilterComponent',
  components: {
    Multiselect,
  },
  data() {
    return {
      localSelectedYear: null,
      selectedMonth: null,
      monthOptions: [
        { value: 'Jan', label: 'Januari' },
        { value: 'Feb', label: 'Februari' },
        { value: 'Mar', label: 'Maret' },
        { value: 'Apr', label: 'April' },
        { value: 'May', label: 'Mei' },
        { value: 'Jun', label: 'Juni' },
        { value: 'Jul', label: 'Juli' },
        { value: 'Aug', label: 'Agustus' },
        { value: 'Sep', label: 'September' },
        { value: 'Oct', label: 'Oktober' },
        { value: 'Nov', label: 'November' },
        { value: 'Dec', label: 'Desember' },
      ],
    }
  },
  computed: {
    ...mapState({
      yearFilter: state => state.inflationReport.yearFilter,
      yearFilterStatus: state => state.inflationReport.yearFilterStatus,
      selectedYear: state => state.inflationReport.selectedYear // Map selectedYear from Vuex
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
    this.$store.dispatch('inflationReport/fetchYearFilter');
    this.localSelectedYear = this.selectedYear; // Initialize local data with Vuex state
  },

  methods: {
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
    ...mapActions('inflationReport', ['setSelectedYear']),
    onFilterChange(value) {
      console.log('Selected Year:', value);
      this.setSelectedYear(value); // Commit the selected year to Vuex
      this.$emit('filter-change', { profile: value });
    }
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
</style>