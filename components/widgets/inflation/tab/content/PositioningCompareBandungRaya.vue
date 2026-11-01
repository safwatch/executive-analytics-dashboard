<template>
    <div>
      <apexchart type="bar" :options="chartOptions" :series="seriesData"></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from "vue-apexcharts";
  
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    props: {
      data: {
        type: Array,
        required: true, // This data will come from the parent component
      },
    },
    computed: {
      // Include all data but display "No Data" for missing values
      sortedData() {
        return this.data.sort((a, b) => {
          if (a.ranking && b.ranking) {
            return a.ranking - b.ranking;
          }
          return 0;
        });
      },
      seriesData() {
        return [
          {
            name: "Tingkat Inflasi",
            data: this.sortedData.map((item) => {
              // Replace null values with 0 to hide the bar, we'll handle the label
              return item.tingkat_inflasi ? parseFloat(item.tingkat_inflasi) : 0;
            }),
          },
        ];
      },
      chartOptions() {
        return {
          chart: {
            type: "bar",
            toolbar: {
              show: false, // Disable the toolbar
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "28.3px",
              borderRadius: 4,
              distributed: true,
              dataLabels: {
                position: "top",
              },
            },
          },
          colors: this.sortedData.map((item) =>
            item.nama_wilayah === "KOTA CIMAHI" ? '#f39c12' : '#1abc9c'
          ),
          dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
              // Display "No Data" for regions with 0 value (no inflation data)
              const regionData = opts.w.config.series[0].data[opts.dataPointIndex];
              return regionData === 0 ? "No Data" : val + "%";
            },
            offsetX: -26,
            style: {
              fontSize: "12px",
              colors: ["#000"],
            },
          },
          xaxis: {
            categories: this.sortedData.map((item) => item.nama_wilayah),
            title: {
              text: "Tingkat Inflasi (%)",
            },
          },
          yaxis: {
            title: {
              text: "",
            },
          },
          title: {
            text: "",
            align: "center",
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val === 0 ? "No Data" : val + "%";
              },
            },
          },
          legend: {
            show: false, // Disable the legend
          },
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  