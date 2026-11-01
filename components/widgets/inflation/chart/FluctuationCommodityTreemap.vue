<template>

    <div v-if="isChartLoading || !chartData" class="card stretch stretch-full">
        <div class="card-header">
            <SieShimmer :shape="'rectangle'" :width="'25%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body custom-card-action">
            <div class="card-body pt-3">
                <div class="row filter-card d-flex">
                    <div class="card-body pt-3 h-100 px-0">
                        <div class="row filter-card d-flex px-3">
                            <div class="tab-content col-xl-12">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div><!-- end card body -->
            </div><!-- end card -->
        </div>


        <!-- end of shimmer -->
    </div>

    <div v-else class="card stretch stretch-full card-change bg-transparent">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Fluktuasi 20 Komoditas Penyumbang IPH</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="fluctuation-commodity-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="fluctuation-commodity-popover" triggers="hover" placement="right"
                    custom-class="custom-popover">
                    <template v-slot:title>
                        Fluktuasi 20 Komoditas Penyumbang IPH
                    </template>
                    <div>
                        Fluktuasi harga dari 20 komoditas ini berkontribusi secara signifikan terhadap perubahan
                        Indeks Perkembangan Harga (IPH). Berikut merupakan Komoditas-komoditas yang mempengaruhi
                        fluktuasi ini penting
                        untuk merumuskan kebijakan yang
                        dapat menjaga stabilitas harga pangan.
                    </div>
                </b-popover>
            </div>
        </div><!-- end card header -->
        <div class="card-body custom-card-action">
            <div class="card-body pt-3">
                <apexchart ref="treemapChart" type="treemap" height="400" :options="IPHCommodityTreemapOptions"
                    :series="IPHCommodityTreemapSeries">
                </apexchart>
            </div><!-- end card -->
        </div>
    </div>
</template>


<script>
import CommodityImage from '../helpers/CommodityImage.vue';
import { convertMonth } from '~/components/helpers/convertMonth';
import { getSvgSrc } from '~/helpers/svg.helper';

export default {
    name: 'FluctuationCommodityTreeMap',
    components: {
        CommodityImage,
    },
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    props: {
        isChartLoading: {
            type: Boolean,
            required: true
        },
        chartData: {
            type: Array,
            required: true,
            default: []
        },
        chartStatus: {
            type: String,
            required: true,
            default: ""
        },
    },
    data() {
        return {
            IPHCommodityTreemapSeries: [],
            IPHCommodityTreemapOptions: {},
        }
    },
    watch: {
        chartData: {
            immediate: true,
            handler(newData) {
                this.updateIPHCommodityTreemapData(newData);
            }
        }
    },
    methods: {
        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },
        getMonthName(monthNumber) {
            return convertMonth(monthNumber);
        },
        updateIPHCommodityTreemapData(data) {
            if (Array.isArray(data) && data.length > 0) {
                const seriesData = [
                    {
                        data: data.map(item => ({
                            x: item.name,
                            y: item.persentase_perubahan,
                            tanggal_data: item.tanggal_akhir,
                            tahun: item.tahun,
                            status: item.status_perubahan,
                            harga_awal: item.harga_awal,
                            harga_akhir: item.harga_akhir,
                            bulan: this.getMonthName(item.bulan),
                            fillColor: this.getColorByStatus(item.status_perubahan)
                        }))
                    }
                ];

                this.IPHCommodityTreemapSeries = seriesData;

                this.IPHCommodityTreemapOptions = {
                    chart: {
                        height: 550,
                        type: 'treemap',
                        toolbar: {
                            show: false
                        },
                    },
                    title: {
                        text: '',
                    },
                    legend: {
                        show: false,
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '12px',
                        },
                        formatter: function (text, op) {
                            return [text, op.value] + " %";
                        },
                        offsetY: -4,
                    },
                    tooltip: {
                        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                            const item = w.config.series[seriesIndex].data[dataPointIndex];

                            // Conditional logic to choose the right icon based on item.status
                            let iconHtml = '';
                            let text_status = '';
                            if (item.status === 'TURUN') {
                                iconHtml = '<i class="ri-arrow-down-line align-middle"></i>';
                                text_status = 'text-success';
                            } else if (item.status === 'NAIK') {
                                iconHtml = '<i class="ri-arrow-up-line align-middle"></i>';
                                text_status = 'text-danger';
                            } else {
                                iconHtml = '<i class="ri-checkbox-blank-circle-line align-middle"></i>'; 
                                text_status = 'text-warning';
                            }
                            
                            return `
                        <div style="padding: 10px;font-size:11px;">
                            <div class="col-xl-12 px-0 py-0 d-flex justify-content-between align-items-center">
                                <p class="text-truncate mb-0 fs-12">${item.x}</p> 
                                <p class="${text_status} fw-medium mb-0"> ${iconHtml}
                                ${item.y} %
                            </p></div>
                            <hr class="my-2">
                            Tanggal Data: ${formatDateToIndonesian(item.tanggal_data.toLocaleString('id-ID'))}<br>
                            Harga Awal: ${item.harga_awal}<br>
                            Harga Akhir: ${item.harga_akhir}<br>
                        </div>`;
                        },
                        // y: {
                        //     formatter: function (val) {
                        //         return "Rp " + val.toLocaleString("id-ID");
                        //     },
                        // },
                    },
                    plotOptions: {
                        treemap: {
                            enableShades: true,
                            shadeIntensity: 0.5,
                            reverseNegativeShade: true,
                            colorScale: {
                                ranges: [
                                    {
                                        from: -6,
                                        to: 0,
                                        color: '#52B12C',
                                    },
                                    {
                                        from: 0,
                                        to: 600,
                                        color: '#CD363A',
                                    },
                                ],
                            },
                        },
                    },
                }
            }
        },

        getColorByStatus(status) {
            switch (status) {
                case 'NAIK':
                    return '#D64D46'; // Red for "NAIK"
                case 'TURUN':
                    return '#98D687'; // Green for "TURUN"
                case 'STABIL':
                    return '#F5D166'; // Yellow for "STABIL"
                default:
                    return '#808080'; // Default gray color if status is unknown
            }
        },
    },
}
function formatDateToIndonesian(dateString) {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero
    const month = months[date.getMonth()]; // Get month name in Indonesian
    const year = date.getFullYear(); // Get the full year

    return `${day} ${month} ${year}`;
}
</script>