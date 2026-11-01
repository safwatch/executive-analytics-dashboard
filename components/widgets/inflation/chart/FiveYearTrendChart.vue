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
    <div class="card card-danger">
      <div class="card-header border-bottom align-items-center d-flex bg-white">
        <h4 class="card-title mb-0 flex-grow-1 text-muted">Tren inflasi 5 tahunan</h4>
      </div>
      <div class="card-body">
        <div id="fiveYearTrendChart" style="width: 100%; height: 400px; position: relative"></div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import Highcharts from 'highcharts';

export default {
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapState('inflationProfile', {
      fiveYearTrend: state => state.fiveYearTrend,
      fiveYearTrendStatus: state => state.fiveYearTrendStatus,
      selectedYear: state => state.selectedYear
    }),
    fiveYearTrendChartOptions() {
      if (!Array.isArray(this.fiveYearTrend) || this.fiveYearTrend.length === 0) {
        return {};
      }

      const categories = this.fiveYearTrend.map(item => item.tahun.toString()); // Updated to use 'tahun'
      const seriesData = this.fiveYearTrend.map(item => {
        const inflation = parseFloat(item.tingkat_inflasi.replace(',', '.')); // Updated to use 'tingkat_inflasi'
        return isNaN(inflation) ? null : inflation; // Handle invalid or missing inflation data
      });

      return {
        chart: {
          type: 'spline'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: categories,
          title: {
            text: 'Tahun'
          },
          min: 0,
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          tickPosition: 'inside'
        },
        yAxis: {
          title: {
            text: 'Tingkat Inflasi (%)'
          },
          min: 0,
          max: 10
        },
        series: [
          {
            name: 'Tingkat Inflasi',
            data: seriesData,
            lineWidth: 3 // Adjust the thickness of the line here (default is 2)
          }
        ],
        tooltip: {
          useHTML: true,
          backgroundColor: '#ffffff',
          borderColor: '#cccccc',
          borderRadius: 4,
          borderWidth: 1,
          shadow: true,
          style: {
            color: '#333333',
            fontSize: '13px',
            padding: '10px',
            lineHeight: '18px',
            zIndex: 9999,
            width: '400px'
          },
          formatter: function () {
            const inflationValue = this.y !== null ? `${this.y}%` : 'No Data'; // Handle "No Data"
            return `
              <div class="popover bs-popover-right" role="tooltip">
                <div class="arrow"></div>
                <h3 class="popover-header">Tahun: ${this.x}</h3>
                <div class="popover-body">Tingkat Inflasi: <strong>${inflationValue}</strong></div>
              </div>`;
          }
        }
      };
    }
  },
  watch: {
    fiveYearTrend(newVal) {
      if (this.fiveYearTrendStatus === 'success') {
        this.renderChart();
      }
      this.isLoading = false; // Stop loading when data is fetched
    }
  },
  mounted() {
    this.isLoading = true;  // Set loading before fetching data
    if (this.selectedYear) {
      console.log('called fetchFiveYearTrendByYear');
      this.fetchFiveYearTrendByYear(this.selectedYear).then(() => {
        this.isLoading = false;
      });
    } else {
      this.fetchFiveYearTrendRecap().then(() => {
        this.isLoading = false;
      });
    }
  },
  methods: {
    ...mapActions('inflationProfile', ['fetchFiveYearTrendByYear', 'fetchFiveYearTrendRecap']),
    renderChart() {
      this.$nextTick(() => {
        if (Object.keys(this.fiveYearTrendChartOptions).length) {
          Highcharts.chart('fiveYearTrendChart', this.fiveYearTrendChartOptions);
        }
      });
    }
  }
};
</script>

<style>
#fiveYearTrendChart {
  width: 100%;
  height: 400px;
}

/* Bootstrap popover style */
.popover {
  max-width: 406px;
  /* Max width of the popover */
}

.popover-header {
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: bold;
}

.popover-body {
  padding: 9px 14px;
  color: #333;
}

.popover .arrow {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}

.bs-popover-top .arrow {
  bottom: calc(-0.5em - 1px);
  left: 50%;
  margin-left: -0.5em;
  border-width: 0 0.5em 0.5em;
  border-top-color: #cccccc;
}
</style>