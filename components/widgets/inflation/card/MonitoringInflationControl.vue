<template>
    <div class="card card-height-100" id="monitoring-inflation-control">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">Pemantauan Pengendalian Inflasi</h4>
            <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                <a href="javascript:void(0);" id="tren-rerata-popover" class="text-muted"
                    variant="light">
                    <i class="fa fa-info-circle"></i>
                </a>
                <b-popover target="tren-rerata-popover" triggers="hover" placement="right"
                    custom-class="custom-popover">
                    <template v-slot:title>
                        Pemantauan Pengendalian Inflasi
                    </template>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </div>
                </b-popover>
            </div>
        </div>
        <div class="card-body pt-0">
            <div class="card-body row pb-0">
                <div class="tabs">
                    <button type="button"
                        :class="['btn', 'btn-sm', quarterActiveTab === 'all' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        style="height: 29.31px;" @click="quarterActiveTab = 'all'">
                        <i class="ri-dashboard-2-line fs-18" style="line-height: 1.2em;"></i>
                    </button>
                    <!-- Triwulan 1 -->
                    <button type="button"
                        :class="['btn', 'btn-sm', quarterActiveTab === 'Triwulan 1' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="quarterActiveTab = 'Triwulan 1'">
                        Triwulan 1
                    </button>

                    <!-- Triwulan 2 -->
                    <button type="button"
                        :class="['btn', 'btn-sm', quarterActiveTab === 'Triwulan 2' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="quarterActiveTab = 'Triwulan 2'">
                        Triwulan 2
                    </button>

                    <!-- Triwulan 3 -->
                    <button type="button"
                        :class="['btn', 'btn-sm', quarterActiveTab === 'Triwulan 3' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="quarterActiveTab = 'Triwulan 3'">
                        Triwulan 3
                    </button>

                    <!-- Triwulan 4 -->
                    <button type="button"
                        :class="['btn', 'btn-sm', quarterActiveTab === 'Triwulan 4' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                        @click="quarterActiveTab = 'Triwulan 4'">
                        Triwulan 4
                    </button>
                </div>
                <div class="tab-content col-xl-12">
                    <div class="w-100 d-flex flex-column">
                        <div class="d-flex justify-content-center">
                            <div
                                class="boxed-section col-lg-6 py-4 bg-light border border-1 rounded text-center">
                                <h3 class="text-muted font-13 counter mt-0">Rencana Aksi</h3>
                                <h2 class="text-muted m-0">
                                    <span>
                                        <span>
                                            {{ selectedData?.total_rencana_aksi ?? 0 }}
                                        </span>
                                    </span>
                                </h2>
                            </div>
                            <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                            <div
                                class="boxed-section col-lg-6 bg-light py-4 border border-1 rounded text-center">
                                <h3 class="text-muted font-13 counter mt-0">Realisasi Anggaran</h3>
                                <h2 class="text-muted m-0">
                                    <span>
                                        <span>
                                            {{ selectedData?.total_realisasi_anggaran ?? 0 }}
                                        </span>
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mt-0 row">
                            <div class="col-12 col-sm-5 col-md-12 col-lg-6 px-0">
                                <ul id="actplan-list" class="p-0 m-0 list-group list-group-flush border-dashed" style="max-height: 400px; overflow-y: auto; overflow-x: hidden;">
                                    <li
                                        v-for="(item, index) in (selectedData?.bundled_strategi_rencana_aksi ?? [])"
                                        class="d-flex gap-4 align-items-center pb-3 list-group-item px-0"
                                    >
                                        <h3>
                                            <b-badge :class="`badge-soft-${index%2 === 0 ? 'primary' : 'success'}`">{{ item?.rencana_aksi ?? 0 }}</b-badge>
                                        </h3>
                                        <div>
                                            <h6 class="mb-0 text-wrap">{{ item?.kunci_strategi ?? '' }}
                                            </h6>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-12 col-sm-8 col-md-12 col-lg-6 d-flex h-100 align-items-center"
                                style="position: relative;">
                                <div id="actplan-tracker" class="tracker_with_description">
                                    <apexchart :options="trackerChart" :series="[Number(selectedData?.persentase_capaian_anggaran ?? '0')]"
                                        height="340">
                                    </apexchart>
                                    <div class="conversation-list mt-3" style="min-height: auto;">
                                        <div class="conversation-text" style="width: 100%;">
                                            <div class="ctext-wrap">Capaian berdasarkan perbandingan
                                                nilai
                                                anggaran (Target
                                                &
                                                Realisasi)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div><!-- end card -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            data: [],
            selectedData: null,
            quarterActiveTab: 'all',
            currentTheme: {
                primary: "#1abc9c", // Replace with your theme colors
                surface: "#f5f5f5",
                "on-background": "#000000",
            },
            variableTheme: {
                "disabled-opacity": 0.6,
                "high-emphasis-opacity": 1,
            },
        }
    },
    computed: {
        ...mapState('inflationProfile', {
            monitoringInflationControlList: state => state.monitoringInflationControlList,
            monitoringInflationControlStatus: state => state.monitoringInflationControlStatus,
        }),
        trackerChart() {
            return {
                labels: ["Capaian"],
                chart: { type: "radialBar" },
                plotOptions: {
                    radialBar: {
                        offsetY: 10,
                        startAngle: -140,
                        endAngle: 130,
                        hollow: { size: "65%" },
                        track: {
                            background: this.currentTheme.surface,
                            strokeWidth: "100%",
                        },
                        dataLabels: {
                            name: {
                                offsetY: -20,
                                color: `rgba(${this.hexToRgb(this.currentTheme["on-background"])},${this.variableTheme["disabled-opacity"]})`,
                                fontSize: "13px",
                                fontWeight: "400",
                                fontFamily: "Public Sans",
                            },
                            value: {
                                offsetY: 10,
                                color: `rgba(${this.hexToRgb(this.currentTheme["on-background"])},${this.variableTheme["high-emphasis-opacity"]})`,
                                fontSize: "38px",
                                fontWeight: "400",
                                fontFamily: "Public Sans",
                            },
                        },
                    },
                },
                colors: [this.currentTheme.primary],
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        shadeIntensity: 0.5,
                        gradientToColors: [this.currentTheme.primary],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 0.6,
                        stops: [30, 70, 100],
                    },
                },
                stroke: { dashArray: 10 },
                grid: {
                    padding: {
                        top: -20,
                        bottom: 5,
                    },
                },
                states: {
                    hover: { filter: { type: "none" } },
                    active: { filter: { type: "none" } },
                },
                responsive: [
                    {
                        breakpoint: 960,
                        options: { chart: { height: 340 } },
                    },
                ],
            };
        },
    },
    watch: {
        monitoringInflationControlList(result) {
            const dataTriwulan = result?.[0]?.data_triwulan;
            const triwulan = ['all', 'Triwulan 1', 'Triwulan 2', 'Triwulan 3', 'Triwulan 4'];
            let resultData = [];
            triwulan.forEach((triwulan) => {
                let data = dataTriwulan?.filter((data) => data?.triwulan === triwulan);
                if (triwulan === 'all') {
                    data = dataTriwulan;
                }
                const rawStrategyKey = data?.map((item) => item?.kunci_strategi?.replace(/\s*\n\s*/g, ' ').trim());
                const strategyKey = [... new Set(rawStrategyKey)];
                let filteredData = [];

                strategyKey?.forEach((strategy) => {
                    const itemStrategy = data?.filter((item) => item?.kunci_strategi === strategy);
                    let rencanaAksi = itemStrategy?.map((item) => item?.kunci_rencana_aksi);
                    rencanaAksi = [...new Set(rencanaAksi)];
                    if (rencanaAksi?.length > 0) {
                        const item = {
                            ...(itemStrategy?.[0] ?? {}),
                            jumlah_kegiatan: itemStrategy?.reduce((accumulator, data) => accumulator + data?.jumlah_kegiatan, 0),
                            rencana_aksi: rencanaAksi?.length
                        }
                        filteredData = [...filteredData, item];
                    }
                })

                const dataTarget = data?.filter((item) => item?.target_dan_realisasi === 'REALISASI');
                // const totalRencana = filteredData?.reduce((accumulator, data) => accumulator + data?.jumlah_kegiatan, 0);
                const totalRencana = filteredData?.reduce((accumulator, data) => accumulator + data?.rencana_aksi, 0);
                const totalRealisasi = dataTarget?.reduce((accumulator, data) => accumulator + 1, 0);
                console.log(totalRealisasi, totalRencana);
                const percentage = totalRealisasi / totalRencana * 100;

                const newItem = {
                    triwulan: triwulan,
                    total_rencana_aksi: totalRencana,
                    total_realisasi_anggaran: dataTarget?.reduce((accumulator, data) => accumulator + data?.jumlah_kegiatan, 0),
                    bundled_strategi_rencana_aksi: filteredData,
                    persentase_capaian_anggaran: Number(Number(percentage ?? 0)?.toFixed(2)),
                }
                resultData = [...resultData, newItem];
            })
            this.data = resultData;

            this.selectedData = resultData?.find((item) => item?.triwulan === 'all');
        },
        quarterActiveTab(activeTab) {
            const selectedData = this.data.find((item) => item?.triwulan === activeTab || (activeTab === 'all' && !item?.triwulan));
            this.selectedData = selectedData;
        }
    },
    components: {
        apexchart: () => import("vue-apexcharts"),
    },
    mounted() {
        this.fetchMonitoringInflationControl();
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchMonitoringInflationControl']),
        hexToRgb(hex) {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `${r},${g},${b}`;
        },
    },
}
</script>