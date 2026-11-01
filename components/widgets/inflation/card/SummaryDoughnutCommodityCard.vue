<template>
    <!-- shimmer -->
    <div v-if="isMetricLoading || !metricData" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pt-3 h-100 px-4">
            <div class="row filter-card d-flex px-2">
                <div class="col-xl-12">
                    <div class="w-100 pb-3 d-flex justify-content-center">
                        <SieShimmer :shape="'circle'" :width="'100%'" :height="'250px'" :borderRadius="'8px'" />
                    </div>
                    <div class="table-responsive mt-3">
                        <table class="table table-sm table-centered align-middle table-nowrap mb-0">
                            <tbody class="border-0">
                                <tr>
                                    <td class="d-flex" style="width:220px">
                                        <div class="h-auto d-flex">
                                            <div class="text-center align-self-center w-100 commodity-icon">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                        </div>
                                        <div
                                            class="col-xl-12 px-0 commodity d-flex flex-column justify-content-center ml-3">
                                            <p class="text-truncate mb-1 fs-12">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </p>
                                            <p class="price mb-0">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </p>
                                        </div>
                                    </td>
                                    <td style="width:40%;">
                                        <p class="text-muted mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    </td>
                                    <td class="text-end">
                                        <p class="text-success fw-medium mb-0">
                                            <SieShimmer :shape="'rectangle'" :width="'80px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="d-flex">
                                        <div class="h-auto d-flex">
                                            <div class="text-center align-self-center w-100 commodity-icon">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                        </div>
                                        <div
                                            class="col-xl-12 px-0 commodity d-flex flex-column justify-content-center ml-3">
                                            <p class="text-truncate mb-1 fs-12">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </p>
                                            <p class="price mb-0">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </p>
                                        </div>
                                    </td>
                                    <td style="width:40%;">
                                        <p class="text-muted mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    </td>
                                    <td class="text-end">
                                        <p class="text-success fw-medium mb-0">
                                            <SieShimmer :shape="'rectangle'" :width="'80px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="d-flex">
                                        <div class="h-auto d-flex">
                                            <div class="text-center align-self-center w-100 commodity-icon">
                                                <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'40px'"
                                                    :borderRadius="'10px'" />
                                            </div>
                                        </div>
                                        <div
                                            class="col-xl-12 px-0 commodity d-flex flex-column justify-content-center ml-3">
                                            <p class="text-truncate mb-1 fs-12">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </p>
                                            <p class="price mb-0">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </p>
                                        </div>
                                    </td>
                                    <td style="width:40%;">
                                        <p class="text-muted mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                    </td>
                                    <td class="text-end">
                                        <p class="text-success fw-medium mb-0">
                                            <SieShimmer :shape="'rectangle'" :width="'80px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>
    <!-- end of shimmer -->
    <div v-else class="card card-height-100 card-danger">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Top Komoditas Penyebab Inflasi</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="kpit-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="kpit-popover" triggers="hover" placement="right" custom-class="custom-popover">
                    <template v-slot:title>
                        Top Komoditas Penyebab Inflasi
                    </template>
                    <div>
                        Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                        periode satu tahun. Ini
                        adalah cara untuk
                        menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan
                        indeks harga
                        konsumen (CPI) atau
                        indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan
                        atau kuartal yang sama
                        pada tahun
                        sebelumnya.
                    </div>
                </b-popover>
            </div>
        </div>
        <div v-if="!metricData.length" class="card-body">
            <div class="col-xl-12 px-0">
                <b-alert show variant="warning">
                    <i class="fe-info mr-2"></i>Tidak ada data yang tersedia.
                </b-alert>
            </div>
        </div>
        <div v-else class="card-body">
            <h6 class="mt-0 mb-4 text-muted" v-html="lastUpdatedDate"></h6>
            <apexchart class="apex-charts" height="320" type="donut" :series="DoughtnutSeries"
                :options="DoughtnutChartOptions">
            </apexchart>
            <div class="table-responsive mt-3">
                <div class="scrollable-container" id="scrollspy-commodity-list" data-spy="scroll"
                    data-target="#scrollspy-commodity" data-offset="0" style="height: 240px;">
                    <table class="table table-sm table-centered align-middle table-nowrap mb-0">
                        <tbody class="border-0">
                            <tr v-for="(commodity, index) in metricData" :key="index">
                                <td class="d-flex" style="width:220px">
                                    <div class="h-auto d-flex">
                                        <div class="text-center align-self-center w-100 commodity-icon">
                                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                                <div class="text-center commodity-icon">
                                                    <CommodityImage :src="getSvgSrc(commodity.commodity_name)"
                                                        :altText="commodity.commodity_name" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-xl-12 px-0 commodity d-flex flex-column justify-content-center ml-3">
                                        <p class="text-truncate mb-1 fs-12">{{ commodity.commodity_name }}</p>
                                        <p class="price mb-0">{{ formatPriceRange(commodity.price_range) }}</p>
                                    </div>
                                </td>
                                <td style="width:40%;">
                                    <p class="text-muted mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                </td>
                                <td class="text-end">
                                    <p :class="getStatusClass(commodity.status)" class="fw-medium mb-0">
                                        <i :class="getStatusIcon(commodity.status)" class="align-middle"></i>
                                        {{ commodity.percentage_change }}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div><!-- end card body -->
    </div><!-- end card -->
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import chroma from 'chroma-js';
import { getSvgSrc } from '~/helpers/svg.helper';
import CommodityImage from '../helpers/CommodityImage.vue';

export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
        CommodityImage,
    },
    data() {
        return {
            DoughtnutSeries: [],
            DoughtnutChartOptions: {},
            lastUpdatedDate: '',
            colors: [],
        }
    },
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Array,
            required: true,
            default: () => []
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
    },
    watch: {
        metricData: {
            immediate: true,
            handler(newVal) {
                this.updateDoughnutChart(newVal);
                this.lastUpdatedDate = this.getDateAcquired(newVal);
            }
        },
    },
    methods: {
        formatPriceRange(priceRange) {
            return priceRange; // Optional: format price range
        },
        getStatusClass(status) {
            return status === 'Naik' ? 'text-danger' : 'text-success';
        },
        getStatusIcon(status) {
            return status === 'Naik' ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill';
        },
        updateDoughnutChart(commodities) {
            const colorPalette = this.generateColorPalette(commodities.length);

            const totalPercentageChange = commodities.reduce((acc, commodity) => acc + (parseFloat(commodity.percentage_change) || 0), 0);

            if (commodities && Array.isArray(commodities) && commodities.length > 0) {
                // Update the series and labels for the doughnut chart
                this.DoughtnutSeries = commodities.map(commodity => parseFloat(commodity.percentage_change));
                this.DoughtnutChartOptions = {
                    labels: commodities.map(commodity => commodity.commodity_name),
                    chart: {
                        type: 'donut',
                        height: 320,
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '75%',
                                labels: {
                                    show: true,
                                    name: {
                                        fontSize: '16px',
                                        fontWeight: 'bold'
                                    },
                                    value: {
                                        fontSize: '14px',
                                        fontWeight: 'normal'
                                    },
                                    total: {
                                        show: false,
                                        label: 'Total Kenaikan Harga',
                                        fontSize: '14px',
                                        fontWeight: 'normal',
                                        formatter: () => {
                                            return `${totalPercentageChange.toFixed(2)}%`;
                                        },
                                    }
                                }
                            },
                            stroke: {
                                show: true,  // Enable the stroke (border) of the donut
                                width: 4,  // Width of the border (tick)
                                colors: ['#e74c3c'],  // Color of the border (white in this case)
                            }
                        }
                    },
                    colors: [
                        '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#6610f2', '#e83e8c', '#fd7e14', '#20c997', '#17a2b8',
                        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
                        '#8bc34a', '#cddc39', '#ffeb3b', '#ff9800', '#ff5722', '#795548', '#607d8b', '#9e9e9e', '#3e2723', '#d32f2f',
                        '#1976d2', '#0288d1', '#0097a7', '#00796b', '#388e3c', '#689f38', '#c2185b', '#7b1fa2', '#8e24aa', '#d500f9',
                        '#ff4081', '#f50057', '#c51162', '#3d5afe', '#6200ea', '#0288d1', '#039be5', '#00acc1', '#00897b', '#00796b',
                        '#004d40', '#e65100', '#f57c00', '#f44336', '#00c853', '#7b1fa2', '#4caf50', '#c2185b', '#8e24aa', '#9e9e9e'
                    ],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                height: 250
                            },
                        }
                    }],
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return `${val}%`;
                            }
                        }
                    },
                    legend: {
                        show: false,
                        position: 'right',
                        horizontalAlign: 'center',
                        markers: {
                            width: 10,
                            height: 10,
                            radius: 10
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        formatter: function (val) {
                            return `${val.toFixed(2)}%`;
                        }
                    }
                };
            }
        },
        generateRadiantColor(baseColor, step, totalSteps) {
            // Create a color scale with the base color, and adjust based on step and total steps.
            return chroma(baseColor)
                .set('hsl.h', '+=' + (step * 10)) // Adjust hue to create a shift for each color
                .set('hsl.s', '+=' + (step * 0.05)) // Adjust saturation for uniqueness
                .set('hsl.l', '+=' + (step * 0.02)) // Adjust lightness slightly for variation
                .brighten(1.5)  // Optional: brighten colors to make them more radiant
                .saturate(1)   // Optional: increase saturation for more vivid colors
                .hex();        // Return the color in hex format
        },

        generateColorPalette(numberOfCommodities) {
            const baseColors = [
                '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#6610f2', '#e83e8c', '#fd7e14', '#20c997', '#17a2b8',
                '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
                '#8bc34a', '#cddc39', '#ffeb3b', '#ff9800', '#ff5722', '#795548', '#607d8b', '#9e9e9e', '#3e2723', '#d32f2f',
                '#1976d2', '#0288d1', '#0097a7', '#00796b', '#388e3c', '#689f38', '#c2185b', '#7b1fa2', '#8e24aa', '#d500f9',
                '#ff4081', '#f50057', '#c51162', '#3d5afe', '#6200ea', '#0288d1', '#039be5', '#00acc1', '#00897b', '#00796b',
                '#004d40', '#e65100', '#f57c00', '#f44336', '#00c853', '#7b1fa2', '#4caf50', '#c2185b', '#8e24aa', '#9e9e9e'
            ];

            const colors = [];
            const totalBaseColors = baseColors.length;

            // Calculate how many full cycles of the base colors we need to cover the number of commodities
            let cycles = Math.ceil(numberOfCommodities / totalBaseColors);

            // Generate a color palette based on the number of commodities
            for (let cycle = 0; cycle < cycles; cycle++) {
                for (let step = 0; step < totalBaseColors; step++) {
                    // Generate unique color for each commodity
                    let color = this.generateRadiantColor(baseColors[step], step, totalBaseColors);
                    colors.push(color);
                }
            }

            // Ensure the length matches the required number of commodities
            this.colors = colors.slice(0, numberOfCommodities); // Adjust to the exact number of required commodities
        },
        // // Method to generate color palette
        // generateColorPalette(numberOfCommodities) {
        //     // Use chroma scale to generate a color gradient between two colors
        //     const colorScale = chroma.scale(['#fafa6e', '#2A4858'])
        //         .mode('lch') // Set color mode to 'lch'
        //         .colors(numberOfCommodities); // Generate colors based on the number of commodities

        //     // Update the colors array with the generated colors
        //     this.colors = colorScale;
        // },
        getDateAcquired(data) {
            // Step 1: Get the most recent date from each commodity's `latest_price_date` or `previous_price_date`
            const dates = this.metricData.map(item => {
                const latestDate = new Date(item.latest_price_date);
                const previousDate = new Date(item.previous_price_date);

                // Return the latest of the two dates
                return latestDate > previousDate ? latestDate : previousDate;
            });

            // Step 2: Filter out any invalid dates
            const validDates = dates.filter(date => !isNaN(date));

            // Step 3: Get the most recent date from all valid dates
            const latestDate = new Date(Math.max(...validDates.map(date => date.getTime())));

            // Step 4: Format the date to Indonesian format (e.g., dd/MM/yyyy)
            const formattedDate = latestDate.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });

            if (latestDate) {
                // Step 5: Return the result
                return `Update data terakhir : <span class="badge badge-outline-primary badge-primary">${formattedDate}</span>`;
            } else {
                return 'Update data terakhir : <span class="badge badge-outline-danger badge-danger">No data</span>';
            }
        },
        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },
    }
}
</script>