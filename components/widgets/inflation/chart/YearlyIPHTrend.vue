<template>
  <div v-if="isLoading">
    <div class="card">
      <div class="card-header border-bottom align-items-center d-flex bg-white">
        <SieShimmer :shape="'rectangle'" :width="'30%'" :height="'20px'" :borderRadius="'8px'" />
      </div>
      <div class="card-body">
        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'" :borderRadius="'8px'" />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="card card-change">
      <div class="card-header border-bottom align-items-center d-flex bg-white">
        <h4 class="card-title mb-0 flex-grow-1 text-muted">Tren IPH Pertahun</h4>
      </div>
      <div class="card-body">
        <apexchart class="apex-charts" height="400" widht="100%" type="line" :series="vizcharts.series"
          :options="vizcharts.chartOptions"></apexchart>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    apexchart: () => import("vue-apexcharts"),
  },
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState('inflationProfile', {
      IPHYearlyTrend: state => state.IPHYearlyTrend,
      IPHYearlyTrendStatus: state => state.IPHYearlyTrendStatus,
      selectedYear: state => state.selectedYear
    }),
    vizcharts() {
      const categories = this.IPHYearlyTrend.map((item) => item.nama_bulan);
      const seriesData = this.IPHYearlyTrend.map(item => {
        if (item.iph != null && item.iph !== '') {
          return parseFloat(item.iph.replace(',', '.'));
        } else {
          return 0; 
        }
      });
      const yearData = this.IPHYearlyTrend.length > 0 ? this.IPHYearlyTrend[0].tahun : new Date().getFullYear();
      console.log(seriesData);
      return {
        series: [
          {
            name: '',
            data: seriesData,
          },
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: { enabled: false },
            toolbar: { show: false },
            shadow: {
              enabled: false,
              color: '#bbb',
              top: 3,
              left: 2,
              blur: 3,
              opacity: 1,
            },
          },
          stroke: {
            width: 3,
            curve: 'smooth',
          },
          xaxis: {
            categories: categories,
            title: {
              text: 'Bulan',
            },
          },
          title: {
            text: ``,
            align: 'left',
            style: {
              fontSize: '14px',
              color: '#666',
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#4FC6AB'],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          markers: {
            size: 4,
            opacity: 0.9,
            colors: ['#56c2d6'],
            strokeColor: '#fff',
            strokeWidth: 2,
            style: 'inverted',
            hover: {
              size: 7,
            },
          },
          yaxis: {
            title: {
              text: `Indeks Perkembangan Harga - ${yearData} (%)`,
            },
            min: Math.min(...seriesData) - 1,
            max: Math.max(...seriesData) + 1,
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                const month = categories[dataPointIndex]; // Get the month for the hovered point

                // Check if the value is null or undefined, and return 'No data' if so
                // Check if value is NaN and return 'No Data' if true
                if (value === 0) {
                  return `IPH <span class="badge badge-outline-danger badge-primary">` + toTitleCase(month) + `</span> : No data`;
                }

                return `IPH <span class="badge badge-outline-primary badge-primary">` + toTitleCase(month) + `</span> : ${value.toFixed(2)}%`;
              }
            },
            x: {
              formatter: function (value, { dataPointIndex }) {
                const year = yearData;
                const fullMonth = categories[dataPointIndex] + " - " + yearData;
                return toTitleCase(fullMonth); // Convert month and year to title case
              }
            },
            marker: {
              show: true
            }
          },
          responsive: [
            {
              breakpoint: 600,
              options: {
                chart: {
                  toolbar: { show: false },
                },
                legend: { show: false },
              },
            },
          ],
        },
      };
    },
  },
  watch: {
    selectedYear() {
      if (this.selectedYear) {
        this.isLoading = true;
        this.fetchIPHYearlyTrendByYear(this.selectedYear).then(() => {
          this.isLoading = false;
        });
      } else {
        this.fetchIPHYearlyTrendRecap().then(() => {
          this.isLoading = false;
        });
      }
    },
    IPHYearlyTrendStatus(newVal) {
      if (newVal === 'success') {
        this.isLoading = false; // Stop loading shimmer when data is ready
      }
    }
  },
  mounted() {
    if (this.IPHYearlyTrendStatus === 'success') {
      this.isLoading = false;  // Data is already fetched, no need to show shimmer
    } else {
      if (this.selectedYear) {
        this.fetchIPHYearlyTrendByYear(this.selectedYear).then(() => {
          this.isLoading = false;
        });
      } else {
        this.fetchIPHYearlyTrendRecap().then(() => {
          this.isLoading = false;
        });
      }
    }
  },
  methods: {
    ...mapActions('inflationProfile', ['fetchIPHYearlyTrendByYear', 'fetchIPHYearlyTrendRecap']),
  }
};
// Helper function to convert string to title case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
</script>
