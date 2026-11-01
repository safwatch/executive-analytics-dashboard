<template>
    <div>
      <apexchart type="bar" height="500" :options="chartOptions" :series="seriesData"></apexchart>
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
      sortedData() {
        // Sort the data by ranking or any other logic
        return this.data.sort((a, b) => a.ranking - b.ranking);
      },
      seriesData() {
        return [
          {
            name: "Tingkat Inflasi (%)",
            data: this.sortedData.map((item) => parseFloat(item.tingkat_inflasi)),
          },
        ];
      },
      chartOptions() {
        return {
          chart: {
            type: "bar",
            height: 500,
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "28.3px",
              borderRadius: 4,
              borderRadiusApplication: 'end',
              distributed: true,
              dataLabels: {
                position: "top",
              },
            },
          },
          colors: this.sortedData.map(item =>
            item.highlight === "1" ? '#f39c12' : '#1abc9c'
          ),
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetX: -26,
            style: {
              fontSize: "12px",
              colors: ["#000"],
            },
          },
          xaxis: {
            categories: this.sortedData.map((item) => item.nama_kabupaten_kota),
            title: {
              text: "Tingkat Inflasi (%)",
            },
          },
          yaxis: {
            title: {
              text: "",
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "%";
              },
            },
          },
          legend: {
            show: false,
          },
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  