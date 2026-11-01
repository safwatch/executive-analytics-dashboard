<template>
  <client-only>
    <div id="city-map" style="height: 252px;"></div>
  </client-only>
</template>

<script>
import * as echarts from "echarts";
import civicJsonData from "@/components/widgets/civic-kecamatan.json";
import marketPoints from "@/components/widgets/titik-pasar.json"; // Assuming your JSON is stored in this file

export default {
  data() {
    return {
      geoJson: civicJsonData,
      points: marketPoints, // Using the provided market data
    };
  },
  mounted() {
    console.log(this.geoJson);
    console.log(this.points);
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  methods: {
    renderChart() {
      let chartDom = document.getElementById("city-map");
      if (!chartDom) {
        console.error("Chart DOM element not found.");
        return;
      }
      let myChart = echarts.init(chartDom);

      echarts.registerMap("Civic", this.geoJson);

      // Hub point and lines data setup (from your original method)
      const hubPoint = this.points.find(point => point.name === "Pasar Antri");

      if (!hubPoint) {
        console.error("Hub point 'Pasar Antri' not found in the points data.");
        return;
      }

      const linesData = this.points
        .filter(point => point.name !== "Pasar Antri") // Exclude the hub itself
        .map(point => ({
          fromName: hubPoint.name, // Connecting from "Pasar Antri"
          toName: point.name, // To each market point
          coords: [[hubPoint.longitude, hubPoint.latitude], [point.longitude, point.latitude]], // Coordinates for the line
        }));

      let option = {
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          backgroundColor: '#1768e8', // Background color of the tooltip
          borderColor: '#1768e8', // Border color of the tooltip
          borderWidth: 1, // Border width of the tooltip
          textStyle: {
            color: '#fff', // Font color
            fontSize: 12, // Font size
            fontFamily: 'Poppins, sans-serif', // Font family
            fontWeight: 'bold', // Font weight
          },
          formatter: function (params) {
            return `<div style="text-align: center;">
                  <strong>${params.name}</strong><br/>
                  <span style="color: #FFD700;">Coordinates: ${params.value[1]}, ${params.value[0]}</span>
                </div>`;
          },
        },
        geo: {
          map: "Civic",
          roam: false,
          zoom: 1.2,
          aspectScale: 0.75, // scale: [1.5, 1],
          itemStyle: {
            normal: {
              borderColor: '#111', // Set the border color of regions
              borderWidth: 0.5, // Set the border width of regions
              areaColor: '#B3E5FC', // Set the fill color of regions
            },
            emphasis: {
              areaColor: '#FFCC80', // Highlight color when hovered
            },
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          label: {
            show: false, // Disable labels by default
            emphasis: {
              show: false, // Disable labels on hover and click
            },
          },
        },
        series: [
          {
            name: "Civic Kelurahan",
            type: "map",
            roam: false,
            map: "Civic",
            zoom: 1.2,
            itemStyle: {
              normal: {
                borderColor: '#AEB0C0', // Set the border color of regions
                borderWidth: 0.5, // Set the border width of regions
                areaColor: '#f3f6f9', // Set the fill color of regions
              },
              emphasis: {
                areaColor: '#FFCC80', // Highlight color when hovered
              },
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            label: {
              show: false, // Disable labels by default
              emphasis: {
                show: false, // Disable labels on hover and click
              },
            },
            tooltip: {
              show: false, // Disable tooltip for this series
            },
            data: [
              { name: "Civic Tengah", value: 1000 },
              { name: "Civic Utara", value: 2000 },
              // Additional region data
            ],
          },
          {
            name: "Markets",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.points.map(point => ({
              name: point.name,
              value: [point.longitude, point.latitude],
            })),
            symbolSize: 12, // Fixed size for all points
            itemStyle: {
              normal: {
                color: '#1768e8', // Color of the dots
                borderColor: '#fff', // Border color of the dots
                borderWidth: 2, // Border width of the dots
                shadowColor: 'rgba(0, 0, 0, 0.0)', // Shadow color
                shadowBlur: 10, // Shadow blur effect
              },
              emphasis: {
                color: '#e5a016', // Color when a point is hovered
                borderColor: '#fff', // Border color when hovered
                borderWidth: 3, // Border width when hovered
                shadowColor: 'rgba(0, 0, 0, 0.0)', // Stronger shadow when hovered
                shadowBlur: 15, // Increased shadow blur when hovered
              },
            },
            label: {
              formatter: "{b}",
              position: "top",
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            tooltip: {
              formatter: function (params) {
                return `${params.name}`;
              },
            },
            // Add click event listener
            events: {
              click: (params) => {
                console.log('Market Point Clicked:', params.name); // Log the name to the console
              }
            }
          },
          {
            name: "JVM Lines",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 2,
            effect: {
              show: true,
              period: 3, // Speed of the moving point along the line
              trailLength: 0.7, // Length of the trail behind the moving point
              color: '#fff', // Color of the moving point
              symbolSize: 3, // Size of the moving point
            },
            lineStyle: {
              normal: {
                color: '#ffa022', // Color of the line
                width: 1.6, // Width of the line
                opacity: 0.6, // Opacity of the line
                curveness: 0.2, // Curveness of the line
              },
            },
            data: linesData, // Lines connecting the hub to market points
          }
        ],
      };

      myChart.setOption(option);

      // Apply transform to all canvas elements under chartDom
      const canvasElements = chartDom.querySelectorAll('canvas');
      canvasElements.forEach(canvasElement => {
        canvasElement.style.transform = 'scale(1.3, 1)';
        canvasElement.style.transformOrigin = 'center center';
      });

      // Event listener for clicking on regions
      myChart.on('click', (params) => {
        console.log(params);
        if (params.componentType === 'series' && params.seriesType === 'map') {
          const clickedRegionName = params.name;

          // Reset all regions to the default color
          option.series[0].data.forEach((region) => {
            if (region.itemStyle) {
              delete region.itemStyle;
            }
          });

          // Set the clicked region to a new color
          const region = option.series[0].data.find(
            (item) => item.name === clickedRegionName
          );
          if (region) {
            region.itemStyle = {
              normal: {
                areaColor: '#FFD700', // New color for the clicked region
              },
            };
          }

          myChart.setOption(option);
        }
      });

    },
  }

};
</script>

<style scoped>
#city-map {
  width: 100%;
  height: 400px;
  overflow: hidden;
}
</style>
