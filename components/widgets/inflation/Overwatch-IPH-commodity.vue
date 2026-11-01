<template>
  <div>
    <div class="row">
      <div class="col-12 p-0">
        <div class="body-parameter" :class="{ 'fixed': isFixed }" ref="content">
          <div class="container p-0">
            <div class="col-12 p-0">
              <component :is="currentFilterComponent"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="d-flex col-xl-12 px-0 row">
        <div class="col-xl-6">
          <!-- Pantauan 20 Komoditas Card -->
          <MonitoringCommodityPerMonth />
        </div>
        <div class="col-xl-6">
          <FoodBalanceTreeMapIPH />
        </div>
      </div>
    </div>
    <!-- Heatmap -->
    <div class="row">
      <div class="col-xl-12 mb-0">
        <div class="card card-height-100">
          <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Pemantauan fluktuasi 20 komoditas treemap</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
              <a href="javascript:void(0);" id="fluktuasi-popover" class="text-muted" variant="light">
                <i class="fa fa-info-circle"></i>
              </a>
              <b-popover target="fluktuasi-popover" triggers="hover" placement="right" custom-class="custom-popover">
                <template v-slot:title>
                  Pemantauan fluktuasi 20 komoditas treemap
                </template>
                <div>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate repellendus distinctio neque
                  pariatur
                  quo molestiae enim.
                </div>
              </b-popover>
            </div>
          </div>

          <div class="card-body">
            <h6 class="mt-0 mb-0 text-muted" v-html="getDateAcquired()"></h6>
            <apexchart type="heatmap" :options="heatmapOptions" :series="heatmapSeries"></apexchart>
          </div>

        </div>
      </div>
    </div>
    <!-- end of Heatmap -->

    <!-- Harga Komoditas Perpasar -->
    <div class="row">
      <b-modal id="market-detail-modal-lainnya" title="Detail Komoditas Pasar Cimindi" dialog-class="modal-xl custom-modal" hide-footer>
        <div class="container">
          <ul class="commoditylist list-unstyled row mb-4">
            <div v-for="(commodity, index) in commodities2" :key="commodity.id" class="commodity-item" :class="{
              'col-sm-12 col-md-6 col-xl-4': selectedCommodity !== commodity.id,
              'col-md-12': selectedCommodity === commodity.id,
            }" ref="commodity">
              <li class="w-100 mt-3 position-relative pb-0"
                :class="commodity.change_type === 'up' ? 'commodity-high' : 'commodity-low'">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                      <div class="text-center">
                        <CommodityImage :src="getSvgSrc(commodity.name)" />
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <a href="#" class="text-reset fs-14 mb-0 font-weight-bold" :class="{
                      'multiline-ellipsis': selectedCommodity !== commodity.id,
                      'no-ellipsis': selectedCommodity === commodity.id
                    }">
                      {{ commodity.name }}

                    </a>
                    <span>Sebelumnya : {{ (commodity.change_type) === 'up' ? `Rp
                      ${parseInt(commodity.current_price - ((commodity.current_price *
                      commodity.price_change_percentage) / 100)).toLocaleString("id-ID")}/kg`
                      : `Rp
                      ${parseInt(commodity.current_price + ((commodity.current_price *
                        commodity.price_change_percentage) / 100)).toLocaleString("id-ID")}/kg`
                    }} </span><br>
                    <span :class="commodity.change_type === 'up' ? 'text-danger' : 'text-success'">Saat
                      ini
                      : {{ commodity.price }}</span>
                  </div>
                  <div class="col-auto">
                    <span class="fs-12 badge"
                      :class="commodity.change_type === 'up' ? 'badge-outline-danger badge-danger' : 'badge-outline-success badge-success'">
                      <i :class="commodity.change_type === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'"
                        class="align-middle"></i>
                      {{ commodity.price_change }}
                    </span>
                  </div>
                </div>

                <!-- Details Section -->
                <div class="row detail-commodity" v-show="selectedCommodity === commodity.id">
                  <div class="col-md-12 mt-3">
                    <h6 class="text-muted">Perbandingan dengan kota/kab lain</h6>
                    <hr />
                  </div>
                  <div class="col-md-4 mt-3">
                    <div class="card p-2 mb-2">
                      <div class="row align-items-center g-3">
                        <div class="col">
                          <h5 class="mt-0 mb-1">Kota Bogor</h5>
                          <span class="font-13">Rp 12.400/kg</span>
                        </div>
                        <div class="col-auto">
                          <span class="badge float-right badge-soft-danger">
                            <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mt-3">
                    <div class="card p-2 mb-2">
                      <div class="row align-items-center g-3">
                        <div class="col">
                          <h5 class="mt-0 mb-1">Kota Bandung</h5>
                          <span class="font-13">Rp 12.111/kg</span>
                        </div>
                        <div class="col-auto">
                          <span class="badge float-right badge-soft-danger">
                            <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mt-3 ">
                    <div class="card p-2 mb-2">
                      <div class="row align-items-center g-3">
                        <div class="col">
                          <h5 class="mt-0 mb-1">Kota Banjar</h5>
                          <span class="font-13">Rp 12.320/kg</span>
                        </div>
                        <div class="col-auto">
                          <span class="badge float-right badge-soft-danger">
                            <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mt-3 ">
                    <div class="card p-2 mb-2">
                      <div class="row align-items-center g-3">
                        <div class="col">
                          <h5 class="mt-0 mb-1">Kota Bekasi</h5>
                          <span class="font-13">Rp 12.833/kg</span>
                        </div>
                        <div class="col-auto">
                          <span class="badge float-right badge-soft-danger">
                            <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="position-relative w-100 mb-3 text-right">
                    <a href="javascript:void(0);" @click="closeDetail"
                      class="btn btn-light btn-sm text-danger border-0">
                      Tutup perbandingan <i class="mdi mdi-chevron-double-left"></i>
                    </a>
                  </div>
                </div>

                <!-- View Detail Button -->
                <div v-if="selectedCommodity !== commodity.id" class="position-relative w-100 mb-3 text-right">
                  <a href="javascript:void(0);" @click="expandDetail(commodity.id, index)"
                    class="btn btn-light btn-sm text-primary border-0">
                    Lihat perbandingan <i class="mdi mdi-chevron-double-right"></i>
                  </a>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </b-modal>

      <!-- shimmer -->
      <div class="col-xl-12 mb-3">
        <CommodityDistributionMap />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { gsap } from "gsap";

import CommodityImage from './helpers/CommodityImage.vue';
import { getSvgSrc } from '~/helpers/svg.helper';

// import components
import WatcherCommodityLatestQuarter from './card/WatcherCommodityLatestQuarter.vue';
import FoodBalanceTreeMapIPH from "./chart/FoodBalanceTreeMapIPH.vue";

import MonitoringCommodityPerMonth from './iph/MonitoringCommodityPerMonth.vue';

// commodities list
import commodityList from "./commodities-list.json";
import IPHFilterComponent from '~/components/widgets/inflation/filter/IPH-filter.vue';
import { mapGetters } from 'vuex/dist/vuex.common.js';
import CommodityDistributionMap from './iph/CommodityDistributionMap.vue';

export default {
  name: 'OverwatchIPHByCommodityComponent',
  components: {
    WatcherCommodityLatestQuarter,
    FoodBalanceTreeMapIPH,
    CommodityImage,
    MonitoringCommodityPerMonth,
    CommodityDistributionMap,
    apexchart: () => import("vue-apexcharts"),
    'iph-filter-component': IPHFilterComponent,
  },
  computed: {
    ...mapState('overwatchIPHCommodity', [
      'commodityLatestQuarterMetric',
      'commodityLatestQuarterStatus',
      'isLoadingCommodityLatestQuarter',
      'isCommodityLatestQuarterFetched',

      'iphCommodityTreemapChart',
      'iphCommodityTreemapStatus',
      'isLoadingIPHCommodityTreemap',
      'isIPHCommodityTreemapFetched',

      // heatmap 20 komoditas
      'heatmapComodityMonitoring',
      'heatmapComodityMonitoringStatus',
      'isLoadingHeatmapCommodityMonitoring',
      'isHeatmapCommodityMonitoringFetched',

      // Peta Sebaran Komoditas Per Pasar



      // Year Data
      'selectedYear',
    ]),
    ...mapGetters('overwatchIPHCommodity', [
      'isLoading',
      'fetchStatus',
      'mappedCommodities',
      'commoditiesBySelectedMarket',
      'currentMarketName',
    ]),

    // heatmapSeries() {
    //     //const seriesData = [];

    //     return this.heatmapComodityMonitoring.map(item => ({
    //         name: item.name,
    //         data: item.data,
    //         status: item.status, // Adjust based on how your data is structured
    //     })) || [];
    // },
    heatmapSeries() {
      return this.heatmapComodityMonitoring.map(item => ({
        name: item.name,
        data: item.data.map((value, index) => ({
          x: `Minggu ke-${index + 1}`,
          y: value === "-1" ? -1 : Number(value),
          status: item.status || 'Tidak Diketahui'
        }))
      }));
    },

    currentFilterComponent() {
      return 'iph-filter-component'
    },
  },
  props: {
    filter: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isFixed: false,
      containerWidth: 0,
      isLoading: true,
      // goal progress
      
      Overwatch20CommodityDetailComponent: WatcherCommodityLatestQuarter,

      // heatmap
      heatmapOptions: {
        chart: {
          height: 350,
          type: 'heatmap',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          heatmap: {
            colorScale: {
              ranges: [
                { from: -1, to: -1, color: '#ffffff' },
                { from: 0, to: 10, color: '#0B6623' },
                { from: 11, to: 20, color: '#1F7A34' },
                { from: 21, to: 30, color: '#4CAF50' },
                { from: 31, to: 40, color: '#4DA35A' },
                { from: 41, to: 50, color: '#67B66D' },
                { from: 51, to: 60, color: '#E5C100' },
                { from: 61, to: 70, color: '#E59800' },
                { from: 71, to: 80, color: '#DB6800' },
                { from: 81, to: 90, color: '#C52E17' },
                { from: 91, to: 100, color: '#B90004' },
              ]
            }
          }
        },
        title: {
          text: ''
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const seriesData = w.config.series[seriesIndex].data[dataPointIndex];
            if (!seriesData || seriesData.y === -1) return ''; // hide for "-1"

            const value = seriesData.y;
            const status = seriesData.status;

            // Tentukan warna badge berdasarkan status
            let badgeColor;
            let badgeText;

            if (status === 'Naik') {
              badgeColor = 'red'; // Warna merah untuk status Naik
              badgeText = 'Naik';
            } else if (status === 'Turun') {
              badgeColor = 'green'; // Warna hijau untuk status Turun
              badgeText = 'Turun';
            } else {
              badgeColor = 'blue'; // Warna biru untuk status Stabil
              badgeText = 'Stabil';
            }

            return `
              <div style="padding: 5px;">
                  <strong>${w.config.series[seriesIndex].name}</strong><br/>
                  Nilai: ${value}%<br/>
                  Status: <span style="background-color: ${badgeColor}; color: white; padding: 2px; border-radius: 2px; opacity: 80%">
                  ${badgeText}
                  </span>
              </div>
            `;
          }
        },

        legend: {
          show: true,
          position: 'bottom',
        },
        xaxis: {
          position: 'top',
          categories: this.generateCategoryLabels(),
          labels: {
            rotate: -90
          }
        }
      },

      // map data
      clickedMarket: {},

      // animate detail
      commodities: [
        { name: "Gold" },
        { name: "Silver" },
        { name: "Crude Oil" },
        { name: "Wheat" },
      ],
      commodities2: commodityList,
      selectedIndex: null,
      selectedCommodity: null,
      commodityDetails: "",
      loading: false,
    }
  },
  mounted() {
    if (!this.isCommodityLatestQuarterFetched) {
      this.fetchInitialData();
    }

    // Dispatch data heatmap
    if (!this.isHeatmapCommodityMonitoringFetched) {
      this.fetchHeatmapCommodityMonitoring();
    }
  },

  methods: {
    ...mapActions('overwatchIPHCommodity', ['fetchInitialData', 'fetchHeatmapCommodityMonitoring']),


    // Sebaran Pasar
    // gsap
    animateBox() {
      gsap.to(this.$refs.box, {
        duration: 0.5,
        x: 100,
        backgroundColor: "green",
        scale: 1.2,
        ease: "power2.out",
      });
    },

    getSvgSrc(commodityName) {
      return getSvgSrc(commodityName);
    },

    // animation modal
    expandDetail(id, index) {
      if (this.selectedCommodity === id) return; // Prevent unnecessary re-click

      this.selectedCommodity = id;

      this.$nextTick(() => {
        const commodityItems = Array.isArray(this.$refs.commodity)
          ? this.$refs.commodity
          : [this.$refs.commodity];

        const selectedItem = commodityItems[index];

        // Animate width change
        gsap.to(selectedItem, { width: "100%", duration: 0.5, ease: "power2.out" });

        // Hide other items
        commodityItems.forEach((item, i) => {
          if (i !== index) {
            gsap.to(item, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                item.style.display = "none";
              },
            });
          }
        });

        gsap.to(selectedItem.querySelector(".w-100.position-relative"), {
          minHeight: "80vh",
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(selectedItem.querySelector(".detail-commodity"), {
          opacity: 1,
          duration: 1,
        });
      });
    },

    closeDetail() {
      if (this.selectedCommodity === null) return;

      this.$nextTick(() => {
        const commodityItems = Array.isArray(this.$refs.commodity)
          ? this.$refs.commodity
          : [this.$refs.commodity];

        const index = this.commodities2.findIndex(
          (c) => c.id === this.selectedCommodity
        );
        const selectedItem = commodityItems[index];

        if (!selectedItem) {
          console.warn("GSAP target not found: selectedItem is null.");
          return;
        }
        gsap.to(selectedItem.querySelector(".w-100.position-relative"), {
          minHeight: "auto",
          duration: 0.2,
          ease: "power2.out",
        });
        // Fade out details and collapse
        gsap.to(selectedItem.querySelector(".detail-commodity"), {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            this.selectedCommodity = null;

            // Animate back to normal width
            gsap.to(selectedItem, { width: "33.3333%", duration: 0.5 });

            // Restore other items
            commodityItems.forEach((item) => {
              if (item) {
                item.style.display = "block"; // Show all items again
                gsap.to(item, { opacity: 1, duration: 0.5 });
              }
            });
          },
        });
      });
    },


    async expandItem(index) {
      if (this.selectedIndex !== null) return; // Prevent multiple opens

      this.selectedIndex = index;
      this.loading = true;

      // Animate expansion
      this.$nextTick(() => {
        const selectedItem = this.$refs.items[index];

        // Hide other items
        this.$refs.items.forEach((item, i) => {
          if (i !== index) {
            gsap.to(item, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                item.style.display = "none";
              }
            });
          }
        });
      });

      // Fetch data (simulate API delay)
      setTimeout(async () => {
        try {
          setTimeout(() => {
            this.commodityDetails = "This is a sample commodity description.";
            this.loading = false;
          }, 1000);

        } catch (error) {
          this.commodityDetails = "Failed to fetch data.";
        }
        this.loading = false;

        // Fade in the details content
        this.$nextTick(() => {
          const details = this.$refs.items[index].querySelector(".details");
          gsap.fromTo(details, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        });
      }, 1000);
    },

    closeItem() {
      if (this.selectedIndex === null) return;

      // Fade out details
      const index = this.selectedIndex;
      const selectedItem = this.$refs.items[index];

      // Fade out details and collapse
      gsap.to(selectedItem.querySelector(".details"), {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          this.selectedIndex = null;
          this.commodityDetails = "";

          // Restore other items
          this.$refs.items.forEach((item) => {
            item.style.display = "flex"; // Show all items again
            gsap.to(item, { opacity: 1, duration: 0.5 });
          });
        },
      });
    },

    // Heatmap Component
    getDateAcquired() {
      const monthName = 'Juni 2025'; // Pastikan ini dinamis sesuai kebutuhan
      return `Update data terakhir : <span class="badge badge-outline-primary badge-primary">${monthName}</span>`;
    },

    generateCategoryLabels() {
      const weeks = [];
      for (let i = 1; i <= 16; i++) {
        weeks.push(`Minggu ke-${i}`);
        if (i % 4 === 0) {
          weeks.push('-'); // Add a separator after every 4th week
        }
      }
      return weeks;
    },


  },
}
</script>

<style scoped>
.custom-col {
  flex: 0 0 20%;
  max-width: 20%;
}

@media (max-width: 768px) {
  .custom-col {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 10px;
  }
}

.commodity-icon svg {
  max-height: 26px;
  width: auto;
  display: block;
  width: 100%;
}

::v-deep .title-component {
  display: none !important;
}

.fullmap-wrapper {
  width: 100%;
  position: relative;
  min-height: 200px;
  max-width: 1285px;
  align-items: center;
  justify-content: center;
  margin-bottom: 400px;
}

.fullmap-wrapper.single-wrapper {
  margin-bottom: 200px;
}

#city-map {
  width: 100%;
  height: 800px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* Allow absolute positioning within */
}

@media (max-width: 767.98px) {
  #city-map {
    width: 90%;
    /* Set width to 90% on small screens */
  }
}

.commodity-info a.counter {
  line-height: 50px;
  color: white;
  background: -webkit-linear-gradient(337deg, #4fc6e1 0%, #4fc6e1 19.37%, #1abc9c 61.81%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 3px transparent;
  padding: 0 2px;
}

.commodity-info>div:first-child a.counter {
  background: -webkit-linear-gradient(337deg, #F66451 0%, #F66451 19.37%, #b22010 61.81%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 3px transparent;
}

.commodity-info>div:last-child a.counter {
  background: -webkit-linear-gradient(337deg, #FEC95F 0%, #FEC95F 19.37%, #a06e0b 61.81%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 3px transparent;
}

.legend-map span.counter {
  line-height: 50px;
  color: white;
  background: -webkit-linear-gradient(337deg, #14D87A 0%, #14D87A 19.37%, #018947 61.81%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 3px transparent;
  padding: 0 2px;
}

.legend-map>div:first-child span.counter {
  background: -webkit-linear-gradient(337deg, #F66451 0%, #F66451 19.37%, #b22010 61.81%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 3px transparent;
}

.legend-map>div:last-child span.counter {
  background: -webkit-linear-gradient(337deg, #FEC95F 0%, #FEC95F 19.37%, #a06e0b 61.81%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 3px transparent;
}

/* Add this to your component's <style scoped> section */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

.multiline-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /* Number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 140px;
}

.no-ellipsis {
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
  overflow: visible;
  max-width: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.commodity-item {
  transition: all 0.5s ease;
}

.commodity-item.active {
  cursor: default;
}

.content {
  text-align: center;
}

.details {
  padding: 10px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
}
</style>
