<template>
    <!-- shimmer -->
    <div v-if="isTabLoading || !monthlyIPHData || !yearlyIPHData" class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
        </div>
        <div class="card-body pt-3 h-100 px-4">
            <div class="row filter-card d-flex flex-row-reverse px-2">
                <div class="tabs d-flex gap-2">
                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                </div>
                <div class="tab-content col-xl-12">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'" :borderRadius="'8px'" />
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>
    <!-- end of shimmer -->
    <div v-else class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Indeks Perkembangan Harga</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="iph-report-popover" class="text-muted" variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="iph-report-popover" triggers="hover" placement="right" custom-class="custom-popover">
                    <template v-slot:title>
                        Indeks Perkembangan Harga
                    </template>
                    <div>
                        Indeks perkembangan harga adalah angka yang menunjukkan perubahan harga rata-rata dari suatu
                        kelompok barang/jasa
                        dalam periode waktu mingguan, data minggu terakhir pada suatu bulan.
                    </div>
                </b-popover>
            </div>
        </div>
        <div class="card-body pt-3">
            <div class="row filter-card d-flex flex-row-reverse">
                <div class="tabs">

                    <!-- Bulan tab -->
                    <button type="button"
                        :class="['btn', 'btn-sm', activeTab === 'Bulan' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="activeTab = 'Bulan'">
                        Bulan
                    </button>

                    <!-- Tahun tab -->
                    <button type="button"
                        :class="['btn', 'btn-sm', activeTab === 'Tahun' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="activeTab = 'Tahun'">
                        Tahun
                    </button>
                </div>
                <div class="tab-content col-xl-12">
                    <!-- Bulan content -->
                    <div v-if="activeTab === 'Bulan'" class="col-xl-12 px-0">
                        <div v-if="isAllMontlyIPHNull" class="col-xl-12 px-0">
                            <b-alert show variant="warning">
                                <i class="fe-info mr-2"></i>Tidak ada data bulan yang tersedia.
                            </b-alert>
                        </div>
                        <apexchart v-else class="apex-charts" height="380" type="line" :series="monthSeriesData"
                            :options="monthChartOptions">
                        </apexchart>
                    </div>
                    <!-- Tahun content -->
                    <div v-else-if="activeTab === 'Tahun'" class="col-xl-12 px-0">
                        <div v-if="isAllYearlyIPHNull" class="col-xl-12 px-0">
                            <b-alert show variant="warning">
                                <i class="fe-info mr-2"></i>Tidak ada data tahun yang tersedia.
                            </b-alert>
                        </div>
                        <apexchart v-else class="apex-charts" height="380" type="line" :series="yearSeriesData"
                            :options="yearChartOptions">
                        </apexchart>
                    </div>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div>
</template>
<script>

export default {
    props: {
        selectedYear: {
            type: Object,
            required: true
        },
        isTabLoading: {
            type: Boolean,
            required: true
        },
        monthlyIPHData: {
            type: Array,
            required: true,
            default: () => [],
        },
        monthlyIPHStatus: {
            type: String,
            required: true,
            default: ""
        },
        yearlyIPHData: {
            type: Array,
            required: true,
            default: () => [],
        },
        yearlyIPHStatus: {
            type: String,
            required: true,
            default: ""
        },
    },
    data() {
        return {
            activeTab: 'Bulan',
            // Initialize your data
            monthlyIPHData: [],
            yearlyIPHData: [],
            monthSeriesData: [],
            yearSeriesData: [],
            monthChartOptions: {},
            yearChartOptions: {},
            isAllMontlyIPHNull: false,
            isAllYearlyIPHNull: false
        }
    },
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    watch: {
        // Watch for changes in monthlyIPHData and update the series and chart options
        monthlyIPHData: {
            handler(newData) {
                this.isAllMontlyIPHNull = newData.every(item => item.iph === null);
                this.updateMonthSeries(newData);
                this.updateMonthChartOptions(newData);
            },
            immediate: true // Ensure it runs immediately when the component is created
        },
        // Watch for changes in yearlyIPHData and update the series and chart options
        yearlyIPHData: {
            handler(newData) {
                this.isAllYearlyIPHNull = newData.every(item => item.average_iph === null);
                this.updateYearSeries(newData);
                this.updateYearChartOptions(newData);
            },
            immediate: true // Ensure it runs immediately when the component is created
        },
        selectedYear(newVal) {
            this.updateYearChartOptions(this.monthlyIPHData, newVal);
        }
    },
    methods: {
        isAllMontlyIPHNull() {
            // Check if all iph values in monthlyIPHData are null
            return this.monthlyIPHData.every(item => item.iph === null);
        },
        isAllYearlyIPHNull() {
            // Check if all iph average values in yearlyIPHData are null
            return this.yearlyIPHData.every(item => item.average_iph === null);
        },
        // Update method for month series
        updateMonthSeries(data) {
            const seriesData = data.length
                ? data.map(item => parseFloat(item.iph) || 0)
                : [0, 0, 0, 0]; // Default data in case of empty or null data
            this.monthSeriesData = [{
                name: 'Indeks Inflasi',
                data: seriesData,
            }];
        },

        // Update method for month chart options
        updateMonthChartOptions(data) {
            const categories = data.length
                ? ['Minggu ke-1', 'Minggu ke-2', 'Minggu ke-3', 'Minggu ke-4']
                : ['Minggu ke-1', 'Minggu ke-2', 'Minggu ke-3', 'Minggu ke-4']; // Default categories

            this.monthChartOptions = {
                chart: {
                    zoom: { enabled: false },
                    toolbar: { show: false }
                },
                colors: ['#4fc6e1'],
                dataLabels: { enabled: false },
                stroke: { width: [3, 3], curve: 'smooth' },
                title: {
                    text: '',
                    align: 'left',
                    style: { fontSize: '14px', color: '#666' }
                },
                grid: {
                    row: { colors: ['transparent', 'transparent'], opacity: 0.2 },
                    borderColor: '#f1f3fa'
                },
                markers: { style: 'inverted', size: 6 },
                xaxis: {
                    categories: categories,
                    title: { text: data.length && data[0].nama_bulan ? `Bulan ${data[0].nama_bulan}` : 'Bulan' }
                },
                yaxis: {
                    title: { text: 'Indeks Inflasi' },
                    min: Math.min(...this.monthSeriesData[0].data) - 1,
                    max: Math.max(...this.monthSeriesData[0].data) + 1
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
                        chart: { toolbar: { show: false } },
                        legend: { show: false }
                    }
                }]
            };
        },

        // Update method for year series
        updateYearSeries(data) {
            const seriesData = data.length
                ? data.map(item => parseFloat(item.average_iph) || 0)
                : Array(12).fill(0); // Default data in case of empty or null data
            this.yearSeriesData = [{
                name: 'Indeks Inflasi',
                data: seriesData,
            }];
        },

        // Update method for year chart options
        updateYearChartOptions(data, selectedYear) {

            const currentYear = selectedYear ? selectedYear.year : new Date().getFullYear();
            console.log('year: ', currentYear);

            const categories = data.length
                ? data.map(item => item.nama_bulan)
                : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']; // Default categories

            this.yearChartOptions = {
                chart: { zoom: { enabled: false }, toolbar: { show: false } },
                colors: ['#1abc9c'],
                dataLabels: { enabled: false },
                stroke: { width: [3, 3], curve: 'smooth' },
                title: {
                    text: '',
                    align: 'left',
                    style: { fontSize: '14px', color: '#666' }
                },
                grid: {
                    row: { colors: ['transparent', 'transparent'], opacity: 0.2 },
                    borderColor: '#f1f3fa'
                },
                markers: { style: 'inverted', size: 6 },
                xaxis: {
                    categories: categories,
                    title: { text: `Tahun ${currentYear}` }
                },
                yaxis: {
                    title: { text: 'Indeks Inflasi' },
                    min: Math.min(...this.yearSeriesData[0].data) - 1,
                    max: Math.max(...this.yearSeriesData[0].data) + 1
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
                        chart: { toolbar: { show: false } },
                        legend: { show: false }
                    }
                }]
            };
        }
    },
}
</script>