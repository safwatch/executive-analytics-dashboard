<template>
    <div v-if="isMetricLoading || !metricData">
        <div class="row justify-content-between d-flex">
            <div class="d-flex pt-2 title-component pb-4 col col-lg-12">
                <SieShimmer :shape="'rectangle'" :width="'25%'" :height="'20px'" :borderRadius="'8px'" />
            </div>
            <div class="col col-xl-12">
                <div class="card-header align-items-center d-flex">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0">
                    <ul class="list-group list-group-flush border-dashed">
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                        <li class="list-group-item ps-0">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                        :borderRadius="'10px'" />
                                </div>
                                <div class="col">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                                <div class="col-auto">
                                    <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
        </div>
    </div>
    <div v-else>
        <div class="row justify-content-between d-flex position-relative">
            <div class="d-flex title-component pt-2 pb-4 col col-lg-12">
                <h5 class="card-title fs-14 mb-1">Pemantauan 10 Komoditas Berdasarkan 4 Bulan Terakhir</h5>
                <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                    <a href="javascript:void(0);" id="watch-comodity-latest-quarter-popover" class="text-muted"
                        variant="light">
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <b-popover target="watch-comodity-latest-quarter-popover" triggers="hover" placement="right"
                        custom-class="custom-popover">
                        <template v-slot:title>
                            Pemantauan 10 Komoditas Berdasarkan 4 Bulan Terakhir
                        </template>
                        <div>
                            Pemantauan 10 komoditas selama 4 bulan terakhir menunjukkan tren harga dan volume
                            perdagangan yang signifikan, di
                            mana beberapa komoditas mengalami fluktuasi harga akibat faktor musiman, perubahan
                            permintaan, dan kondisi cuaca
                            yang mempengaruhi produksi.
                        </div>
                    </b-popover>
                </div>
            </div>
            <!-- <pre>{{ monthsData }}</pre> -->
            <div v-if="dataList?.length === 0" class="col-lg-12 px-0 d-flex justify-content-center">
                <div class="col col-xl-12 mb-2">
                    <div class="widget-simple card">
                        <div class="card-body pt-0 px-0 cardy-box">
                            <b-alert show variant="warning">
                                <i class="fe-info mr-2"></i>Tidak ada data yang tersedia.
                            </b-alert>
                        </div><!-- end card body -->
                    </div>
                </div>
            </div>
            <div class="col col-xl-12 mb-2" style="min-height: 80vh;">
                <div class="widget-simple card">
                    <!-- <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">
                            {{ monthData.nama_bulan }} - {{ monthData.tahun }}
                        </h4>
                    </div> -->
                    <div class="card-body pt-0 px-0 cardy-box">
                        <ul class="list-group list-group-flush border-dashed">
                            <li v-if="listData.length === 0" class="list-group-item text-center">
                                No data available for this month
                            </li>
                            <li v-for="commodity in listData" :key="commodity.name"
                                class="list-group-item ps-0">
                                <div class="row align-items-center g-3">
                                    <div class="col-auto">
                                        <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                            <div class="text-center">
                                                <CommodityImage :src="getSvgSrc(commodity.name)"
                                                    :altText="commodity.name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <a href="#" class="text-reset fs-14 mb-0 font-weight-bold">{{ commodity.name }}</a><br>
                                        <!-- <span class="text-reset fs-14 mb-0">Harga Sebelumnya :{{ `Rp ${parseInt(commodity.previous_price).toLocaleString("id-ID")}/kg` }}</span><br> -->
                                        <span class="text-reset fs-12 mb-0">Harga Saat ini : {{ `Rp
                                            ${parseInt(commodity.price_today).toLocaleString("id-ID")}/kg` }}</span>
                                    </div>
                                    <div class="col-auto">
                                        <span v-if="commodity.status === 'Turun'"
                                            class="fs-12 badge badge-outline-success badge-secondary">
                                            <i class="ri-arrow-down-line"></i> {{ commodity.percentage_change }}%
                                        </span>
                                        <span v-else-if="commodity.status === 'Stabil'"
                                            class="fs-12 badge badge-outline-warning badge-secondary">
                                            <i class="ri-checkbox-blank-circle-line"></i> {{ commodity.percentage_change
                                            }}%
                                        </span>
                                        <span v-else class="fs-12 badge badge-outline-danger badge-danger">
                                            <i class="ri-arrow-up-line"></i> {{ commodity.percentage_change }}%
                                        </span>
                                    </div>
                                    <div v-if="selectedCommodity !== commodity.comodity_id"
                                        class="position-relative w-100 mb-1 text-right">
                                        <a href="javascript:void(0);"
                                            @click="expandDetail(commodity.comodity_id, index)"
                                            class="btn btn-light btn-sm text-primary border-0">
                                            Lihat grafik <i class="mdi mdi-chevron-double-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="row detail-commodity" v-show="selectedCommodity === commodity.comodity_id">
                                    <div class="col-md-12 mt-3">
                                        <h6 class="text-muted">Perbandingan setiap bulan</h6>
                                        <hr />
                                    </div>
                                    <div class="col-md-12 mt-3">
                                        <div class="card p-2 mb-2">
                                            <!-- <div class="row align-items-center g-3"> -->
                                            <apexchart :key="commodity.comodity_id" class="apex-charts" height="500"
                                                type="line" :series="IPHDataChartSeries" :options="IPHDataChartOptions">
                                            </apexchart>
                                            <!-- </div> -->
                                        </div>
                                    </div>
                                    <div class="position-relative w-100 mb-1 text-right">
                                        <a href="javascript:void(0);" @click="closeDetail"
                                            class="btn btn-light btn-sm text-danger border-0">
                                            Tutup grafik <i class="mdi mdi-chevron-double-left"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div><!-- end card body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommodityImage from '../helpers/CommodityImage.vue';
import { getSvgSrc } from '~/helpers/svg.helper';
import { gsap } from "gsap";
import { mapState, mapActions } from 'vuex';

export default {
    name: 'IPHCommodityNaik',
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Object,
            required: true,
            default: {},
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
        listData: {
            type: Array,
            required: true,
            default: []
        },
        graphicData: {
            type: Object,
            required: true,
            default: {}
        }
    },
    data() {
        return {
            monthsData: [],
            monthsDetail: [],
            monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            selectedCommodity: null,
            IPHDataChartSeries: [],
            IPHDataChartOptions: {},
        };
    },
    methods: {
        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },
        setChartData(id) {
            function sortByYearMonth(data) {
                return data.sort((a, b) => {
                    const yearA = parseInt(a.tahun);
                    const yearB = parseInt(b.tahun);
                    const monthA = parseInt(a.bulan);
                    const monthB = parseInt(b.bulan);

                    if (yearA !== yearB) {
                    return yearA - yearB;
                    }
                
                    return monthA - monthB;
                });
            }

            const selectedComodity = this.graphicData?.[id];
            let data = [];

            if (selectedComodity) {
                Object.keys(selectedComodity).forEach((item) => {
                    const value = selectedComodity[item];
                    const name = this.monthNames[Number(value?.bulan) - 1];
                    const newValue = {
                        ...value,
                        nama_bulan: name,
                        current_price: value?.price_today,
                    }
                    data = [...data, newValue];
                })
            }
            
            const sorted = sortByYearMonth(data);
            data = sorted;

            this.IPHDataChartSeries = [{
                name: 'Perbandingan Harga',
                data: data.map(item => parseInt(item.current_price) || 0) // Handle NaN
            }];

            const seriesData = data.map(item => {
                if (item.current_price != null && item.current_price !== '') {
                    return parseInt(item.current_price);
                } else {
                    return 0;
                }
            });

            this.IPHDataChartOptions = {
                chart: {
                    height: 300,
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#4fc6e1', '#1abc9c'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: [3, 3],
                    curve: 'smooth'
                },
                title: {
                    text: '',
                    align: 'left',
                    style: {
                        fontSize: '14px',
                        color: '#666'
                    }
                },
                labels: {
                    formatter: function (value) {
                        return value; //.toFixed(3).replace('.', ','); // Mengubah titik menjadi koma
                    }
                },
                grid: {
                    row: {
                        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.2
                    },
                    borderColor: '#f1f3fa'
                },
                markers: {
                    style: 'inverted',
                    size: 6
                },
                xaxis: {
                    categories: data.map(item => `${item.nama_bulan} ${item.tahun}`), // Format month-year
                    title: {
                        text: 'Bulan'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Perbandingan Harga'
                    },
                    min: Math.min(...seriesData) - 1,
                    max: Math.max(...seriesData) + 1,
                    tickAmount: 5,
                    labels: {
                        formatter: function (value) {
                            return 'Rp ' + parseInt(value).toLocaleString('ID-id'); // .toFixed(3) Menghilangkan trailing zero
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                            const month = dataPointIndex >= 0 ? data[dataPointIndex].nama_bulan : ''; // Get the month for the hovered point

                            // Check if the value is 0, null or NaN and return 'No data' if so
                            if (value === 0 || value === null || isNaN(value)) {
                                return `<span class="badge badge-outline-danger badge-primary"> No data </span>`;
                            }

                            return `<span class="badge badge-outline-primary badge-primary"> ${value}</span>`;
                        }
                    },
                    x: {
                        formatter: function (value, { dataPointIndex }) {
                            const month = data[dataPointIndex].nama_bulan;
                            const year = data[dataPointIndex].tahun;
                            const fullMonth = `${month} - ${year}`;
                            return toTitleCase(fullMonth); // Convert month and year to title case
                        }
                    },
                    marker: {
                        show: true
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                },
                responsive: [{
                    breakpoint: 600,
                    options: {
                        chart: {
                            toolbar: {
                                show: false
                            }
                        },
                        legend: {
                            show: false
                        },
                    }
                }]
            };
        },
        expandDetail(id, index) {
            this.setChartData(id)
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

                // gsap.to(selectedItem.querySelector(".w-100.position-relative"), {
                //     minHeight: "80vh",
                //     duration: 0.5,
                //     ease: "power2.out",
                // });

                // gsap.to(selectedItem.querySelector(".detail-commodity"), {
                //     opacity: 1,
                //     duration: 1,
                // });
            });
        },
        closeDetail() {
            if (this.selectedCommodity === null) return;

            // Reset the selected commodity to null to hide the details
            this.selectedCommodity = null;

            this.$nextTick(() => {
                const commodityItems = Array.isArray(this.$refs.commodity)
                    ? this.$refs.commodity
                    : [this.$refs.commodity];


            });
        },
    },
    watch: {
        inflationGauge(result) {
            const summary = result?.[0];

            this.summary = summary;
            console.log(12345, summary)
        },
    },
    components: {
        CommodityImage,
        apexchart: () => import("vue-apexcharts"),
    },
    computed: {
        ...mapState('overwatchIPHCommodity', [
            'inflationGauge',
        ]),
    },
    mounted() {
        
    }
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
</script>
<style scoped>
.cardy-box {
    background: #fff;
    border-radius: 0px 0px 3px 3px;
}
</style>