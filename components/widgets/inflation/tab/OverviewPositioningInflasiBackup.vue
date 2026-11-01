<template>
    <div>
        <div>
            <div class="card">
                <div class="card-header align-items-center d-flex border-bottom bg-white position-relative">
                    <h4 class="card-title mb-0 flex-grow-1 text-muted">Positioning Pengendalian Inflasi Civic Administration</h4>
                    <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                        <a href="javascript:void(0);" id="positioning-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="positioning-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Positioning
                            </template>
                            <div>
                                Merupakan widget untuk menunjukan posisi pengendalian inflasi Civic Administration, baik dari
                                bandung raya, kab/kota se-Jawa
                                Barat yang menggunakan IPH sebagai tolak ukur pengukuran inflasi, dan juga sebagai upaya
                                kota dalam mengukur dan
                                mengendalikan perubahan harga komoditas selama periode waktu tertentu.
                            </div>
                        </b-popover>
                    </div>
                </div> <!-- end card-body-->
                <!-- card body -->
                <div class="card-body pt-1">
                    <div class="row align-items-end" :class="{ 'marginless-card': activeTab === 'Default' }"
                        :style="backgroundImageStyle">
                        <!-- Default content -->
                        <div v-if="activeTab === 'Default'" class="col-xl-12">
                            <!-- Check if summaryRankingIPHData is empty -->
                            <div v-if="summaryRankingIPHData.length === 0" class="col-xl-12 text-center mt-4">
                                <b-alert show variant="warning" class="bg-transparent border-0 py-4">
                                    <i class="fe-info mr-2"></i>Belum ada data di
                                    <span class="badge badge-dark">2025</span>.
                                </b-alert>
                            </div>
                            <div v-else>
                                <!-- <div v-for="data in rankingAggData" :key="data.title"
                                    class="col-xl-12 col-md-12 d-flex">
                                    <Ranking :title="data.title" :ranking="data.ranking" :inflation="data.inflation"
                                        :month="data.month" :year="data.year" />
                                </div> -->
                                <div v-for="data in summaryRankingIPHData" :key="data.title"
                                    class="col-xl-12 col-md-12 d-flex">
                                    <SummaryRankingIPH :title="data.title" :ranking="data.ranking || ''"
                                        :iph="data.iph || ''" :month="data.month || ''" :year="data.year || ''"
                                        :week_reference="data.week_ref || ''" :latest_iph="data.latest_iph || ''"
                                        :prev_iph="data.prev_iph || ''" :iph_change="data.iph_change || ''" />
                                </div>
                                <a href="javascript:void(0);" @click="activeTab = 'Vs. Jawa Barat'"
                                    class="pl-1 btn btn-light btn-sm bg-transparent text-primary border-0">
                                    Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                                </a>
                            </div>
                        </div>
                        <!-- <div v-else-if="activeTab === 'Vs. Jawa Barat'" class="col-xl-12">
                            <CompareJawaBarat :data="rankinginJabarData" />
                        </div> -->
                        <div v-else-if="activeTab === 'Vs. Jawa Barat'" class="col-xl-12">
                            <div class="row filter-card d-flex flex-row-reverse pt-2">
                                <a href="javascript:void(0);" @click="activeTab = 'Default'"
                                    class="pl-1 btn btn-light btn-sm bg-transparent text-danger border-0"><i
                                        class=" mdi mdi-close-circle-outline fs-16"></i>
                                    Tutup detail
                                </a>
                            </div>
                            <CompareIPHAmongJawaBarat :dataComparation="rankingIPHCivicCompareToJabarData" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { payloadHelper } from '~/helpers/payload.helper';

import CustomPopover from '~/components/Popover.vue';
// 1.0.1
import SummaryRankingIPH from './content/PositionRankingControllingIPH.vue';
import CompareIPHAmongBandungRaya from './content/PositioningIPHCompareAmongBandungRaya.vue';
import CompareIPHAmongJawaBarat from './content/PositioningIPHCompareAmongJawaBarat.vue';
import CompareIPHAmongNasional from './content/PositioningIPHCompareAmongNasional.vue';
// 1.0.0
import Ranking from './content/PositionRanking.vue';
import CompareBandungRaya from './content/PositioningCompareBandungRaya.vue';
import CompareJawaBarat from './content/PositioningCompareJawaBarat.vue';
import CompareNasional from './content/PositioningCompareNasional.vue';

export default {
    components: {
        CustomPopover,
        SummaryRankingIPH,
        CompareIPHAmongBandungRaya,
        CompareIPHAmongJawaBarat,
        CompareIPHAmongNasional,
        Ranking,
        CompareBandungRaya,
        CompareJawaBarat,
        CompareNasional
    },
    data() {
        return {
            activeTab: 'Default',
            hoverTab: '',
            tabs: ['Default', 'Vs. Jawa Barat'],
            isLoading: true,
            // 1.0.1
            summaryRankingIPHData: [],
            rankingIPHCivicCompareToJabarData: [],
        }
    },
    computed: {
        backgroundImageStyle() {
            if (this.activeTab === 'Default') {
                return {
                    backgroundImage: `url(${require('~/assets/images/inflation/civic-banner-positioning.png')})`,
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain'
                };
            } else {
                return {};
            }
        },
    },
    mounted() {
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchAllDataSimultaneously();
            }
        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        async fetchAllDataSimultaneously() {
            try {
                // Use Promise.all to make all calls at the same time
                await Promise.all([
                    this.fetchSummaryRankingIPHCivic(),
                    this.fetchIPHCivicCompareToJabarData(),
                ]);
            } catch (error) {
                console.error("Error fetching one or more APIs:", error);
            }
        },
        // 1.0.1
        fetchSummaryRankingIPHCivic() {
            console.log('fetch IPH CivicRankingData started');
            let normalParam = payloadHelper.normalParam('');
            return this.$summaryCivicRankJabarRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        const result = response.result;
                        this.summaryRankingIPHData.push({
                            title: `Indeks Perkembangan Harga ${result.data[0].nama_kabupaten_kota}`,
                            ranking: result.data[0].rank,
                            iph: result.data[0].indeks_perkembangan_harga,
                            month: result.data[0].nama_bulan,
                            year: result.data[0].tahun,
                            week_ref: result.data[0].periode_minggu,
                            latest_iph: result.latestIPH,
                            prev_iph: result.previousIPH,
                            iph_change: result.iphChange,
                        });
                    }
                })
                .finally(() => {
                    console.log('IPH CivicRankingData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching ranking data:', error);
                });
        },
        fetchIPHCivicCompareToBandungRayaData() {
            console.log('fetch IPH Civic Compare to Jabar Data started');
            let normalParam = payloadHelper.normalParam('');
            return this.$summaryCivicIPHCompareBandungRayaRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        const result = response.result;
                        this.rankingIPHCivicCompareToBandungRayaData = result;
                    }
                })
                .finally(() => {
                    console.log('IPH Civic Compare to Jabar completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching iph civic compare jabar data:', error);
                });
        },
        fetchIPHCivicCompareToJabarData() {
            console.log('fetch IPH Civic Compare to Jabar Data started');
            let normalParam = payloadHelper.normalParam('');
            return this.$summaryCivicIPHCompareJabarRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        const result = response.result.data;
                        this.rankingIPHCivicCompareToJabarData = result;
                    }
                })
                .finally(() => {
                    console.log('IPH Civic Compare to Jabar completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching iph civic compare jabar data:', error);
                });
        },
        fetchIPHCivicCompareToNasionalData() {
            console.log('fetch IPH Civic Compare to Nasional Data started');
            let normalParam = payloadHelper.normalParam('');
            return this.$summaryCivicIPHCompareNasionalRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        const result = response.result;
                        this.rankingIPHCivicCompareToNasionalData = result;
                    }
                })
                .finally(() => {
                    console.log('IPH Civic Compare to Nasional completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching iph civic compare nasional data:', error);
                });
        },
        // 1.0.0
        fetchRankingData() {
            console.log('fetchRankingData started');
            let normalParam = payloadHelper.normalParam('');
            return this.$aggCivicRankInJabarRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        const result = response.result;
                        this.rankingAggData.push({
                            title: `Inflasi ${result.nama_kabupaten_kota}`,
                            ranking: result.ranking,
                            inflation: result.tingkat_inflasi,
                            month: result.bulan,
                            year: result.tahun
                        });
                    }
                })
                .finally(() => {
                    console.log('fetchRankingData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching ranking data:', error);
                });
        },

        fetchCivicWithinBandungRayaData() {
            console.log('fetchCivicWithinBandungRayaData started');
            let normalParam = payloadHelper.normalParam('');
            return this.$civicRankInBandungRayaRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        this.rankinginBandungRayaData = response.result;
                    }
                })
                .finally(() => {
                    console.log('fetchCivicWithinBandungRayaData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching Bandung Raya data:', error);
                });
        },

        fetchCivicWithinJabarData() {
            console.log('fetchCivicWithinJabarData started');
            let normalParam = payloadHelper.normalParam('');
            return this.$civicRankInJabarRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        this.rankinginJabarData = response.result;
                    }
                })
                .finally(() => {
                    console.log('fetchCivicWithinJabarData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching Jabar data:', error);
                });
        },

        fetchCivicCompareNationalData() {
            console.log('fetchCivicCompareNationalData started');
            let normalParam = payloadHelper.normalParam('');
            return this.$civicRankInNationalRepo.getByParam(normalParam)
                .then(response => {
                    if (response.status === 'OK') {
                        this.rankinginNationalData = response.result;
                    }
                })
                .finally(() => {
                    console.log('fetchCivicCompareNationalData completed');
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching national data:', error);
                });
        }
    },
    middleware: "router-auth"
}
</script>
<style scoped>
.marginless-card {
    margin: 0px -1.5rem -1.5rem;
}
</style>