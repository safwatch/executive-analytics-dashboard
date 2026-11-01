<template>
    <div class="col-xl-6 mb-0">
        <div class="card stretch stretch-full">
            <div class="card-header align-items-center d-flex border-bottom bg-white">
                <h4 class="card-title mb-0 flex-grow-1 text-muted">Rencana Aksi Inflasi Civic Administration</h4>
            </div>
            <div class="card-body custom-card-action">
                <div v-if="loading">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'300px'" :borderRadius="'3px'" />
                </div>
                <div class="table-responsive mb-0" v-if="!loading">
                    <table class="table table-borderless table-hover table-centered m-0">
                        <thead class="thead-light">
                            <tr>
                                <th>Tahun</th>
                                <th>Kunci Strategi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.kunci_strategi" class="cursor-pointer" @click="selectItem(item)">
                                <td>{{ year ?? '' }}</td>
                                <td>{{ item?.kunci_strategi ?? '' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal
            v-model="showDetail"
            title-class="font-14"
            id="modal-actionPlan"
            :title="`Strategi & Rencana Aksi ${year ?? ''} - ${selectedItem?.kunci_strategi ?? ''}`"
            dialog-class="modal-xl custom-modal" hide-footer
            >
            <button class="btn btn-primary mb-3" @click="toggleAll">
                {{ allExpanded ? "Tutup Semua" : "Buka Semua" }}
            </button>
            <template>
                <div class="table-responsive mb-5">
                    <div v-if="loadingDetail">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'200px'" :borderRadius="'3px'" />
                    </div>
                    <table class="table mb-0" v-if="!loadingDetail">
                        <thead>
                            <tr>
                                <th></th>
                                <th>#</th>
                                <th>Perangkat Daerah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item, index) in itemsDetail">
                                <tr :class="item.class" @click="toggleDetail(item.opd)" style="cursor: pointer">
                                    <td width="30">
                                        <span
                                            class="arrow-icon"
                                            :class="{ rotate: expandedIds.includes(item?.opd) }"
                                        >
                                            <i class="bx bx-chevron-right"></i>
                                        </span>
                                    </td>
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>
                                        {{ item?.opd }}
                                        <span class="badge badge-secondary" :style="getProgressStyle(item.percentage)">
                                            {{ item.percentage }} %
                                        </span>
    
                                    </td>
                                </tr>
    
                                <tr v-if="expandedIds.includes(item?.opd)">
                                    <td colspan="3">
                                        <table class="table table-bordered mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Bulan</th>
                                                    <th>Rencana Aksi</th>
                                                    <th>Satuan</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(child, cIndex) in item?.rencana_aksi" :key="cIndex"
                                                    :class="child?.rowClass">
                                                    <th scope="row">{{ cIndex + 1 }}</th>
                                                    <td>{{ child?.bulan ?? '' }}</td>
                                                    <td>{{ child?.kunci_rencana_aksi ?? '' }}</td>
                                                    <td>
                                                        <span
                                                            v-if="(child.satuan === 'LAPORAN' || child.satuan === 'PUBLIKASI') && child.status === 'SELESAI'">
                                                            {{ child.satuan }} -
                                                            <a
                                                                :href="child.link || '#'"
                                                                target="_blank"
                                                            >
                                                                <i :id="'tooltip-doc-' + item.id + '-' + cIndex" class="mdi mdi-file-document fs-18"></i>
                                                            </a>
                                                            <b-tooltip :target="'tooltip-doc-' + item.id + '-' + cIndex" placement="right" variant="dark">Lihat Dokumen</b-tooltip>
                                                        </span>
                                                        <span v-else>
                                                            {{ child?.satuan }}
                                                        </span>
                                                    </td>
                                                    <td width="10%">
                                                        <span class="badge w-100" :class="getRencanaAksiClassColor(child.status)">{{ child.status }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </template>



            <template v-slot:modal-footer>
                <b-button variant="secondary" @click="closeModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex/dist/vuex.common.js';

export default {
    name: 'InflationActionPlan',
    data() {
        return {
            items: [],
            year: null,
            loading: false,

            selectedItem: null,

            itemsDetail: [],
            expandedIds: [],
            showDetail: false,
            allExpanded: false,
            loadingDetail: false,
        }
    },
    async mounted() {
        this.loading = true;
        await this.fetchInflationActionPlanList({ year: 2025 });
        this.loading = false;
    },
    computed: {
        ...mapState('inflationProfile', ['inflationActionPlanList', 'inflationActionPlanDetail']),
        ...mapState('inflationSummary', ['selectedYear', 'selectedMonth']),
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchInflationActionPlanList', 'fetchInflationActionPlanDetail']),
        async selectItem(item) {
            this.selectedItem = item;
            this.showDetail = true;

            this.expandedIds = [];
            this.itemsDetail = null;
            this.allExpanded = false;

            this.loadingDetail = true;

            const year = this.selectedYear?.year;

            await this.fetchInflationActionPlanDetail({ year: year ?? 2025 , kunci_strategi: item?.kunci_strategi })
            this.loadingDetail = false;
        },
        toggleDetail(id) {
            if (this.expandedIds.includes(id)) {
                this.expandedIds = this.expandedIds.filter((item) => item !== id);
            } else {
                this.expandedIds.push(id);
            }

            if (this.expandedIds?.length === this.itemsDetail?.length) {
                this.allExpanded = true;
            }
        },
        toggleAll() {
            if (this.allExpanded) {
                this.expandedIds = [];
            } else {
                this.expandedIds = this.itemsDetail.map((item) => item.opd);
            }
            this.allExpanded = !this.allExpanded;
        },
        getProgressStyle(progress) {
            return {
                backgroundColor: this.getProgressColor(progress),
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
            };
        },
        getRencanaAksiClassColor(status) {
            if (status === 'SELESAI') return 'badge-success';
            if (status === 'BERJALAN') return 'badge-primary';
            if (status === 'DIRENCANAKAN') return 'badge-danger';
            return 'badge-light';
        },
        getProgressColor(progress) {
            if (progress <= 10) return '#f1556c'; // Lowest - Red
            if (progress <= 20) return '#f77f82'; // Soft Red
            if (progress <= 30) return '#f9a39a'; // Peach
            if (progress <= 40) return '#fabf92'; // Orange Peach
            if (progress <= 50) return '#fdd282'; // Yellow Orange
            if (progress <= 60) return '#c3d682'; // Yellow Green
            if (progress <= 70) return '#81bf8c'; // Greenish Teal
            if (progress <= 80) return '#4fb8a7'; // Teal
            if (progress <= 90) return '#2e9fa1'; // Dark Teal
            return '#1abc9c'; // Highest - Green
        },
    },
    watch: {
        inflationActionPlanList(result) {
            const year = result?.tahun;
            const items = result?.data?.map((item) => item);

            this.year = year;
            this.items = items;
        },
        inflationActionPlanDetail(result) {
            const items = result?.map((item) => {
                const detailLength = item?.rencana_aksi?.length ?? 0;
                const finished = item?.rencana_aksi?.filter((data) => data?.status === 'SELESAI')?.length ?? 0;

                const percentage = finished / detailLength * 100;

                // let actionPlan = [];
                // item?.rencana_aksi?.forEach((item) => {
                //     const findData = actionPlan?.some((data) => data?.kunci_rencana_aksi === item?.kunci_rencana_aksi);
                //     if (!findData) {
                //         actionPlan = [...actionPlan, item];
                //     }
                // })

                return {
                    ...item,
                    percentage,
                    // rencana_aksi: actionPlan,
                }
            })

            this.itemsDetail = items ?? [];
        },
        selectedMonth(data) {
            console.log('month', data);
        },
        async selectedYear(data) {
            this.loading = true;
            await this.fetchInflationActionPlanList({ year: data?.year });
            this.loading = false;
        },
    }
}
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
.arrow-icon {
    display: inline-block;
    transition: transform 0.2s ease;
}

.arrow-icon.rotate {
    transform: rotate(90deg);
}
</style>