<template>
    <!-- shimmer -->
    <div v-if="isLoading" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pb-3">
            <div class="w-100 pb-3">
                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
            </div>
            <div class="w-100">
                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'400px'" :borderRadius="'8px'" />
            </div>
        </div><!-- end card body -->
    </div><!-- end card -->
    <!-- end of shimmer -->
    <div v-else class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Neraca Pangan</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="neraca-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="neraca-popover" triggers="hover" placement="right" custom-class="custom-popover">
                    <template v-slot:title>
                        Neraca Pangan
                    </template>
                    <div>
                        <b>Neraca Pangan</b> adalah salah satu instrumen untuk dapat memantau seberapa besar
                        ketersediaan pangan di suatu
                        wilayah dan jumlah kebutuhan pangan yang harus dipenuhi, serta dari mana sumbernya.
                    </div>
                </b-popover>
            </div>
        </div><!-- end card header -->
        <div class="card-body">
            <div v-if="foodBalanceDataStatus === 'success'">
                <h6 class="mt-0 mb-0 text-muted" v-html="getDateAcquired()"></h6>
                <!-- Treemap -->
                <apexchart ref="treemapChart" type="treemap" height="440" :options="chartOptions" :series="seriesData">
                </apexchart>
            </div>
            <div v-else>
                <div class="col-xl-12 py-5">
                    <p class="text-muted">No data available.</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            sliderValue: 50, // Default slider value in the middle
            monthFoodBalance: null,
            yearFoodBalance: null,
        };
    },
    computed: {
        ...mapState("InflationAnalysis", {
            foodBalanceData: (state) => state.foodBalanceData,
            foodBalanceDataStatus: (state) => state.foodBalanceDataStatus,
            // monthFoodBalance: state => state.monthFoodBalance,
            // yearFoodBalance: state => state.yearFoodBalance,
            isLoading: (state) => state.isLoadingFoodBalance
        }),
        ...mapState('inflationSummary', ['selectedYear', 'selectedMonth']),
        seriesData() {
            return [
                {
                    data: this.foodBalanceData?.data?.map((item) => ({
                        x: item.komoditas,
                        y: this.getTreemapSize(parseFloat(item.neraca)),
                        ketersediaan: parseFloat(item.ketersediaan),
                        kebutuhan: parseFloat(item.kebutuhan),
                        neraca: parseFloat(item.neraca),
                        fillColor: this.getTreemapColor(parseFloat(item.neraca)),
                    }))
                },
            ];
        },
        chartOptions() {
            const baseColor = '#4CAF50'; // Starting color (green)
            const lightnessFactor = this.sliderValue / 100;

            return {
                chart: {
                    height: 400,
                    type: "treemap",
                    toolbar: {
                        show: false
                    },
                },
                plotOptions: {
                    treemap: {
                        // layout: "horizontal",
                        // enableShades: true,
                        shadeIntensity: lightnessFactor,
                        // distributed: true,
                        distributed: true,
                        enableShades: false,
                    },
                },
                title: {
                    text: "",
                    align: "center",
                    style: {
                        fontSize: "20px",
                        fontWeight: "normal",
                    },
                },
                tooltip: {
                    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                        const item = w.config.series[seriesIndex].data[dataPointIndex];
                        return `
                        <div style="padding: 10px;font-size:11px;">
                            <strong>${item.x}</strong><br>
                            Harga : Rp ${item.y.toLocaleString('id-ID')}<br>
                            Ketersediaan: ${item.ketersediaan.toLocaleString('id-ID')} Ton<br>
                            Kebutuhan: ${item.kebutuhan.toLocaleString('id-ID')} Ton<br>
                            <b style="color:${item.fillColor}">Neraca: ${item.neraca.toLocaleString('id-ID')} Ton</b>
                        </div>`;
                    },
                    // y: {
                    //     formatter: function (val) {
                    //         return "Rp " + val.toLocaleString("id-ID");
                    //     },
                    // },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '11px',
                        fontFamily: 'Poppins, sans-serif', // Set your desired font family here
                        fontWeight: 'normal', // Make the text bold
                        colors: ['#000'], // Set the text color to black (or any other color)
                    },
                },
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        },
                        foreColor: '#fff',
                        backgroundColor: '#289CDB' // Change the background color to blue on hover
                    }
                },
            };
        },
        legendLabels() {
            return Object.keys(this.foodBalanceData);
        },
        minNeraca() {
            return Math.min(...Object.values(this.foodBalanceData).map(item => item.neraca));
        },
        maxNeraca() {
            return Math.max(...Object.values(this.foodBalanceData).map(item => item.neraca));
        },
        sliderWithLabel() {
            // Extract neraca values and names, then sort them from the most negative to the most positive
            const data = Object.keys(this.foodBalanceData)
                .map(key => ({
                    name: this.foodBalanceData[key].komoditas,
                    neraca: this.foodBalanceData[key].neraca
                }))
                .sort((a, b) => a.neraca - b.neraca);

            const range = data.map(item => ({
                label: this.getLabel(item.neraca, item.name),
                isHide: true
            }));

            return {
                value: data.find(item => item.neraca === 0) ? 0 : data[Math.floor(data.length / 2)].neraca, // Start at 0 if present, otherwise middle value
                data: data.map(item => `${item.name}`), // data.map(item => `${item.name}: ${item.neraca} Ton`)
                range,
                rangeValue: {},
            };
        },
        filteredTreemapData() {
            // Filter or select the data based on the current slider value
            const selectedValue = this.sliderWithLabel.rangeValue || this.sliderWithLabel.value;
            return [
                {
                    data: Object.keys(this.foodBalanceData)
                        .filter(key => this.foodBalanceData[key].neraca === selectedValue)
                        .map(key => ({
                            x: key,
                            y: this.foodBalanceData[key].neraca,
                            ketersediaan: this.foodBalanceData[key].ketersediaan,
                            kebutuhan: this.foodBalanceData[key].kebutuhan,
                            neraca: this.foodBalanceData[key].neraca,
                            fillColor: this.getTreemapColor(this.foodBalanceData[key].neraca)
                        })),
                },
            ];
        },
    },
    mounted() {
        this.fetchFoodBalanceData();
        this.removeInlineStyles();
    },
    /**
     * Removes the inline styles that ApexCharts adds to the SVG element.
     * This is needed because the styles prevent the component from being
     * properly responsive.
     */
    updated() {
        this.$nextTick(() => {
            this.removeInlineStyles();
        });
    },
    watch: {
        selectedMonth(value) {
            this.monthFoodBalance = value?.id;
        },
        selectedYear(value) {
            this.yearFoodBalance = value?.year;
        }
    },
    methods: {
        ...mapActions("InflationAnalysis", ["fetchFoodBalanceData"]),
        getShadeColor(color, factor) {
            let f = parseInt(color.slice(1), 16),
                t = factor < 0 ? 0 : 255,
                p = factor < 0 ? factor * -1 : factor,
                R = f >> 16,
                G = (f >> 8) & 0x00FF,
                B = f & 0x0000FF;
            return (
                "#" +
                (
                    0x1000000 +
                    (Math.round((t - R) * p) + R) * 0x10000 +
                    (Math.round((t - G) * p) + G) * 0x100 +
                    (Math.round((t - B) * p) + B)
                )
                    .toString(16)
                    .slice(1)
            );
        },
        updateColors() {
            this.$refs.treemapChart.updateOptions(this.chartOptions);
        },
        callbackRange(rangeValue) {
            this.sliderWithLabel.rangeValue = rangeValue;
            console.log('Current range:', rangeValue);

            // Clear previous selections
            const rects = document.querySelectorAll('.apexcharts-treemap-series rect[selected="true"]');
            rects.forEach(rect => rect.removeAttribute('selected'));

            // Set selected="true" for the corresponding rectangle
            const selectedIndex = this.sliderWithLabel.data.indexOf(rangeValue);
            if (selectedIndex !== -1) {
                const rect = document.querySelectorAll('.apexcharts-treemap-series rect')[selectedIndex];
                if (rect) {
                    rect.setAttribute('selected', 'true');
                }
            }
        },
        tooltipFormatter(value) {
            const color = this.getTreemapColor(value);
            return `<span style="color:${color}; font-weight:bold">•</span>`;
        },
        customTooltipFormatter(value) {
            const item = Object.entries(this.foodBalanceData).find(
                ([name, data]) => data.neraca === value
            );

            if (item) {
                const [name, data] = item;
                return `${name}: ${data.neraca.toLocaleString('id-ID')}`;
            }

            return `${value.toLocaleString('id-ID')}`;
        },
        getTreemapSize(neraca) {

            const negativeBreakpoints = [-12.76, -8.83, -5, -2]; 
            const positiveBreakpoints = [0, 1, 4]; 


            const negativeSizes = [60, 50, 40, 30];  
            const positiveSizes = [20, 15, 10]; 

            // If neraca is negative, check the range and assign a corresponding size
            if (neraca < 0) {
                for (let i = 0; i < negativeBreakpoints.length; i++) {
                    if (neraca <= negativeBreakpoints[i]) {
                        return negativeSizes[i];
                    }
                }
                return negativeSizes[negativeSizes.length - 1]; // If the value is below -12.76
            }

            // If neraca is positive, check the range and assign a corresponding size
            else {
                for (let i = 0; i < positiveBreakpoints.length; i++) {
                    if (neraca <= positiveBreakpoints[i]) {
                        return positiveSizes[i];
                    }
                }
                return positiveSizes[positiveSizes.length - 1]; // If the value is greater than 4
            }
        },
        getTreemapColor(neraca) {
            if (neraca > 100) {
                return "#388949"; // Dark green for surplus > 100
            } else if (neraca > 0) {
                return "#98d687"; // Green for surplus between 0 and 100
            } else if (neraca <= 0 && neraca > -5) {
                return "#f5d166"; // Light red for slight deficit
            } else if (neraca <= -5 && neraca > -10) {
                return "#f7894a"; // Darker red for moderate deficit
            } else if (neraca <= -10) {
                return "#d64d46"; // Dark red for large deficit
            } else {
                return "#CCCCCC"; // Default color if something goes wrong
            }
        },
        getLabel(value) {
            const color = this.getTreemapColor(value);
            const labelType = value > 0 ? "Surplus" : value < 0 ? "Deficit" : "Neutral";
            return `<span style="color:${color};">•</span>`;
        },
        removeInlineStyles() {
            const slideBarComponent = document.querySelector('.vue-slide-bar-component');
            console.log('component : ', slideBarComponent);
            if (slideBarComponent) {
                slideBarComponent.removeAttribute('style');
            }
        },
        // Method to get formatted date acquired
        getDateAcquired() {
            const months = [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];
            const month = new Date().getMonth();
            const year = new Date().getFullYear();
            const monthName = months[parseInt(this.monthFoodBalance ?? month) - 1]?.toUpperCase();
            return `Update data terakhir : <span class="badge badge-outline-primary badge-primary">${monthName} ${this.yearFoodBalance ?? year}</span>`;
        },
    }

};
</script>

<style>
.custom-legend {
    margin-bottom: 10px;
    text-align: center;
}

.custom-legend ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.custom-legend li {
    margin: 0 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #555;
}

.legend-color {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 50%;
}

/* Styles for the gradient slider */
.gradient-slider {
    position: relative;
    text-align: center;
}

.gradient-slider input[type="range"] {
    width: 100%;
    margin: 0 auto;
}

.gradient-bar {
    width: 100%;
    height: 10px;
    background: linear-gradient(to right, #dff3e3, #4CAF50, #004d1a);
    border-radius: 5px;
    margin-top: 10px;
}

.vue-slide-bar__thumb {
    background-color: #4CAF50;
    /* Customize thumb color */
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.vue-slide-bar-tooltip {
    font-size: 10px !important;
}
</style>