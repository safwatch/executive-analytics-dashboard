<template>
    <div>
        <div v-if="isLoading">
            <!-- shimmer -->
            <div class="card">
                <div class="card-header align-items-center d-flex border-bottom bg-white position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div> <!-- end card-body-->
                <!-- card body -->
                <div class="card-body pt-3">
                    <div class="row filter-card d-flex flex-row-reverse px-2">
                        <div class="tabs d-flex gap-2">
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                            <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'" :borderRadius="'8px'" />
                        </div>
                    </div>
                    <div class="tab-content col-xl-12">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'108px'" :borderRadius="'8px'" />
                    </div>
                </div>
            </div>
            <!-- end of shimmer -->
        </div>
        <div v-else>
            <div class="card card-change">
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
                                Merupakan widget untuk menunjukan posisi pengendalian inflasi Civic Administration, baik dari bandung raya, kab/kota se-Jawa Barat yang menggunakan IPH sebagai tolak ukur pengukuran inflasi, dan juga sebagai upaya kota dalam mengukur dan mengendalikan perubahan harga komoditas selama periode waktu tertentu.
                            </div>
                        </b-popover>
                    </div>
                </div> <!-- end card-body-->
                <!-- card body -->
                <div class="card-body pt-3">
                    <div class="row filter-card d-flex flex-row-reverse">
                        <div class="tabs">
                            <!-- Default tab with SVG icon -->
                            <button type="button"
                                :class="['btn', 'btn-sm', activeTab === 'Default' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="activeTab = 'Default'" @mouseenter="hoverTab = 'Default'"
                                @mouseleave="hoverTab = ''">
                                <svg width="19" height="16" viewBox="0 0 19 16"
                                    :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 0.00992212C0.496076 0.00496136 0.98719 0.00496076 1.48327 0C1.56264 0 1.5924 0.0297651 1.58744 0.109137C1.58248 0.153784 1.58744 0.19347 1.58744 0.238117C1.58744 4.56886 1.58744 8.89959 1.58248 13.2303C1.58248 13.4089 1.61225 13.4635 1.80571 13.4635C7.46098 13.4585 13.1212 13.4585 18.7765 13.4536C18.9501 13.4536 19.0047 13.4883 18.9997 13.6718C18.9848 14.1282 18.9947 14.5896 18.9947 15.046C12.8632 15.046 6.72678 15.046 0.595291 15.046C0.317488 14.9269 0.119058 14.7285 0 14.4507C0 9.63875 0 4.82682 0 0.00992212Z"
                                        :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                                    <path
                                        d="M14.2427 6.64733C14.2427 4.73248 14.2427 2.81267 14.2427 0.897819C14.2427 0.31245 14.5503 0.00488281 15.1307 0.00488281C15.8599 0.00488281 16.5892 0.00488281 17.3184 0.00488281C17.8839 0.00488281 18.2014 0.322371 18.2014 0.887897C18.2014 4.75729 18.2014 8.63164 18.2064 12.501C18.2064 12.6399 18.1766 12.6747 18.0327 12.6747C16.8223 12.6697 15.6119 12.6697 14.3965 12.6747C14.2675 12.6747 14.2328 12.6449 14.2378 12.5109C14.2477 10.5564 14.2427 8.60187 14.2427 6.64733Z"
                                        :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                                    <path
                                        d="M8.7063 8.19532C8.7063 6.82119 8.72118 5.44706 8.70134 4.07789C8.69142 3.47268 9.123 3.14527 9.61908 3.16015C10.3483 3.18496 11.0775 3.16511 11.8068 3.16511C12.3326 3.16511 12.66 3.4826 12.66 3.99852C12.66 6.83607 12.66 9.67859 12.665 12.5161C12.665 12.6352 12.6352 12.6699 12.5162 12.6699C11.3008 12.665 10.0804 12.665 8.86504 12.6699C8.72118 12.6699 8.71126 12.6154 8.71622 12.4963C8.7063 11.0676 8.7063 9.63394 8.7063 8.19532Z"
                                        :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                                    <path
                                        d="M7.12372 9.83222C7.12372 10.7252 7.11876 11.6131 7.12868 12.5061C7.12868 12.645 7.09892 12.6797 6.96002 12.6797C5.75455 12.6747 4.54909 12.6747 3.34363 12.6797C3.1948 12.6797 3.16504 12.64 3.16504 12.4961C3.17 10.74 3.17 8.98393 3.17 7.22782C3.17 6.66229 3.49245 6.33984 4.05301 6.33984C4.78225 6.33984 5.51148 6.33984 6.24071 6.33984C6.80623 6.33984 7.12868 6.65733 7.12868 7.22286C7.12372 8.08603 7.12372 8.95912 7.12372 9.83222Z"
                                        :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                                </svg>
                                <!-- <svg width="18" height="19" viewBox="0 0 18 19"
                                :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.6 13C11.6 14.4 11.6 15.8 11.6 17.2C11.6 17.8 11.3 18.2 10.6 18.2C9.50001 18.2 8.39999 18.2 7.39999 18.2C6.79999 18.2 6.5 17.8 6.5 17.3C6.5 14.5 6.5 11.7 6.5 8.89999C6.5 8.29999 6.89999 8 7.39999 8C8.49999 8 9.60001 8 10.7 8C11.3 8 11.6 8.39999 11.6 8.89999C11.7 10.2 11.6 11.6 11.6 13ZM10.8 13C10.8 11.6 10.8 10.3 10.8 8.89999C10.8 8.69999 10.8 8.70001 10.6 8.70001C9.60001 8.70001 8.6 8.70001 7.5 8.70001C7.4 8.70001 7.29999 8.69999 7.29999 8.89999C7.29999 11.6 7.29999 14.4 7.29999 17.1C7.29999 17.2 7.3 17.3 7.5 17.3C8.5 17.3 9.50001 17.3 10.6 17.3C10.8 17.3 10.8 17.3 10.8 17.1C10.8 15.7 10.8 14.4 10.8 13Z"
                                    :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                                <path
                                    d="M12.9004 13.8001C12.9004 12.7001 12.9004 11.6001 12.9004 10.5001C12.9004 9.90012 13.2004 9.6001 13.8004 9.6001C14.9004 9.6001 16.0004 9.6001 17.1004 9.6001C17.7004 9.6001 18.0004 9.90012 18.0004 10.5001C18.0004 12.7001 18.0004 15.0001 18.0004 17.2001C18.0004 17.8001 17.6004 18.1001 17.1004 18.1001C16.0004 18.1001 14.9004 18.1001 13.8004 18.1001C13.2004 18.1001 12.9004 17.7001 12.9004 17.2001C12.9004 16.1001 12.9004 15.0001 12.9004 13.8001ZM17.2004 13.8001C17.2004 12.7001 17.2004 11.6001 17.2004 10.6001C17.2004 10.5001 17.2004 10.4001 17.0004 10.4001C16.0004 10.4001 14.9004 10.4001 13.9004 10.4001C13.7004 10.4001 13.7004 10.4001 13.7004 10.6001C13.7004 12.8001 13.7004 14.9001 13.7004 17.1001C13.7004 17.2001 13.7004 17.3001 13.9004 17.3001C14.9004 17.3001 16.0004 17.3001 17.0004 17.3001C17.2004 17.3001 17.2004 17.3001 17.2004 17.1001C17.2004 16.0001 17.2004 14.9001 17.2004 13.8001Z"
                                    :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                                <path
                                    d="M6.99977 2.1001C7.19977 2.1001 7.39978 2.1001 7.59978 2.1001C7.69978 2.1001 7.79977 2.10009 7.89977 1.90009C8.09977 1.40009 8.29977 1.0001 8.49977 0.600098C8.59977 0.300098 8.79978 0.100098 9.09978 0.100098C9.39978 0.100098 9.59979 0.300098 9.69979 0.600098C9.89979 1.0001 10.0998 1.50009 10.2998 1.90009C10.3998 2.00009 10.3998 2.1001 10.5998 2.1001C10.9998 2.1001 11.3998 2.1001 11.8998 2.1001C12.1998 2.1001 12.3998 2.20009 12.4998 2.50009C12.5998 2.80009 12.5998 3.0001 12.2998 3.2001C11.9998 3.5001 11.6998 3.8001 11.2998 4.1001C11.1998 4.2001 11.1998 4.30009 11.1998 4.40009C11.2998 4.90009 11.4998 5.50009 11.5998 6.00009C11.6998 6.30009 11.5998 6.60008 11.3998 6.80008C11.0998 7.00008 10.8998 7.00008 10.5998 6.80008C10.0998 6.50008 9.59979 6.30009 9.19979 6.00009C9.09979 5.90009 8.99977 5.90009 8.89977 6.00009C8.39977 6.30009 7.89977 6.50008 7.49977 6.80008C7.19977 7.00008 6.99979 7.00008 6.69979 6.80008C6.39979 6.60008 6.39977 6.30009 6.49977 6.00009C6.59977 5.50009 6.79977 4.90009 6.89977 4.40009C6.89977 4.30009 6.89976 4.2001 6.79976 4.1001C6.49976 3.8001 6.19976 3.5001 5.79976 3.2001C5.59976 3.0001 5.49978 2.80009 5.59978 2.50009C5.69978 2.20009 5.89976 2.1001 6.29976 2.1001C6.59976 2.1001 6.79977 2.1001 6.99977 2.1001ZM9.09978 1.30008C8.89978 1.70008 8.79978 2.10009 8.59978 2.50009C8.49978 2.80009 8.29977 3.00009 7.89977 2.90009C7.59977 2.90009 7.19976 2.90009 6.79976 2.90009C7.09976 3.20009 7.29977 3.4001 7.49977 3.6001C7.69977 3.8001 7.79979 4.10009 7.69979 4.40009C7.59979 4.90009 7.49976 5.30008 7.29976 5.80008C7.69976 5.60008 8.09977 5.4001 8.49977 5.1001C8.79977 4.9001 9.09977 4.9001 9.39977 5.1001C9.79977 5.3001 10.1998 5.50008 10.5998 5.80008C10.5998 5.70008 10.5998 5.7001 10.5998 5.7001C10.4998 5.3001 10.3998 4.80009 10.2998 4.40009C10.1998 4.10009 10.2998 3.9001 10.4998 3.6001C10.6998 3.4001 10.8998 3.20009 11.0998 3.00009L11.1998 2.90009C10.8998 2.90009 10.5998 2.90009 10.2998 2.90009C9.89976 2.90009 9.69977 2.70009 9.49977 2.40009C9.39977 2.10009 9.19978 1.70008 9.09978 1.30008Z"
                                    :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                                <path
                                    d="M5.19962 14.4999C5.19962 15.3999 5.19962 16.2999 5.19962 17.1999C5.19962 17.7999 4.89959 18.0999 4.29959 18.0999C3.19959 18.0999 2.0996 18.0999 0.999603 18.0999C0.399603 18.0999 0.0996094 17.7999 0.0996094 17.1999C0.0996094 15.3999 0.0996094 13.5999 0.0996094 11.7999C0.0996094 11.1999 0.399603 10.8999 0.999603 10.8999C2.0996 10.8999 3.19959 10.8999 4.29959 10.8999C4.89959 10.8999 5.19962 11.1999 5.19962 11.7999C5.19962 12.6999 5.19962 13.5999 5.19962 14.4999ZM4.3996 14.4999C4.3996 13.5999 4.3996 12.7999 4.3996 11.8999C4.3996 11.6999 4.39962 11.6999 4.19962 11.6999C3.19962 11.6999 2.09961 11.6999 1.09961 11.6999C0.999609 11.6999 0.899597 11.6999 0.899597 11.8999C0.899597 13.5999 0.899597 15.3999 0.899597 17.0999C0.899597 17.2999 0.899609 17.2999 1.09961 17.2999C2.09961 17.2999 3.09962 17.2999 4.19962 17.2999C4.39962 17.2999 4.3996 17.2999 4.3996 17.0999C4.2996 16.1999 4.3996 15.2999 4.3996 14.4999Z"
                                    :style="{ fill: activeTab === 'Default' || hoverTab === 'Default' ? '#4285f4' : '#6c757d' }" />
                            </svg> -->
                            </button>

                            <!-- Other tabs -->
                            <button type="button"
                                :class="['btn', 'btn-sm', activeTab === 'Vs. Bandung Raya' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="activeTab = 'Vs. Bandung Raya'">
                                Vs. Bandung Raya
                            </button>
                            <button type="button"
                                :class="['btn', 'btn-sm', activeTab === 'Vs. Jawa Barat' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="activeTab = 'Vs. Jawa Barat'">
                                Vs. Jawa Barat
                            </button>
                            <button type="button"
                                :class="['btn', 'btn-sm', activeTab === 'Vs. Nasional' ? 'btn-soft-primary' : 'btn-soft-secondary']"
                                @click="activeTab = 'Vs. Nasional'">
                                Vs. Nasional
                            </button>
                        </div>
                    </div>
                    <div class="row align-items-end" :class="{ 'marginless-card': activeTab === 'Default' }"
                        :style="backgroundImageStyle">
                        <!-- Default content -->
                        <div v-if="activeTab === 'Default'" class="col-xl-12">
                            <!-- Check if summaryRankingIPHData is empty -->
                            <div v-if="summaryRankingIPHData.length === 0" class="col-xl-12 text-center mt-4">
                                <b-alert show variant="warning" class="bg-transparent border-0 py-4">
                                    <i class="fe-info mr-2"></i>Belum ada data di
                                    <span class="badge badge-dark">{{ getCurrentYear() }}</span>.
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
                                        <SummaryRankingIPH :title="data.title" :ranking="data.ranking || ''" :iph="data.iph || ''"
                                        :month="data.month || ''" :year="data.year || ''" :week_reference="data.week_ref || ''" :latest_iph="data.latest_iph || ''" :prev_iph="data.prev_iph || ''"
                                        :iph_change="data.iph_change || ''"/>
                                </div>
                            </div>
                        </div>
                        <!-- Content for other tabs -->
                        <!-- <div v-else-if="activeTab === 'Vs. Bandung Raya'" class="col-xl-12">
                            <CompareBandungRaya :data="rankinginBandungRayaData" />
                        </div> -->
                        <div v-else-if="activeTab === 'Vs. Bandung Raya'" class="col-xl-12">
                            <CompareIPHAmongBandungRaya :dataComparation="rankingIPHCivicCompareToBandungRayaData" />
                        </div>
                        <!-- <div v-else-if="activeTab === 'Vs. Jawa Barat'" class="col-xl-12">
                            <CompareJawaBarat :data="rankinginJabarData" />
                        </div> -->
                        <div v-else-if="activeTab === 'Vs. Jawa Barat'" class="col-xl-12">
                            <CompareIPHAmongJawaBarat :dataComparation="rankingIPHCivicCompareToJabarData" />
                        </div>
                        <!-- <div v-else-if="activeTab === 'Vs. Nasional'" class="col-xl-12">
                            <CompareNasional :data="rankinginNationalData" />
                        </div> -->
                        <div v-else-if="activeTab === 'Vs. Nasional'" class="col-xl-12">
                            <CompareIPHAmongNasional :dataComparation="rankingIPHCivicCompareToNasionalData" />
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
            tabs: ['Default', 'Vs. Bandung Raya', 'Vs. Jawa Barat', 'Vs. Nasional'],
            isLoading: true,
            // 1.0.1
            summaryRankingIPHData: [],
            rankingIPHCivicCompareToBandungRayaData: [],
            rankingIPHCivicCompareToJabarData: [],
            rankingIPHCivicCompareToNasionalData: [],
            // 1.0.0
            rankingAggData: [],
            rankinginJabarData: [],
            rankinginBandungRayaData: [],
            rankinginNationalData: []
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
        getCurrentYear() {
            // Check if rankingAggData has any year data
            const yearsInData = this.rankingAggData.map(item => item.year);

            // If no year data in rankingAggData, return the current year
            if (yearsInData.length === 0) {
                return new Date().getFullYear();  // Return the current year if no data.year exists
            }

            // If there is year data, return the unique years in rankingAggData
            return [...new Set(yearsInData)].toString();
        },
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        async fetchAllDataSimultaneously() {
            try {
                // Use Promise.all to make all calls at the same time
                await Promise.all([
                    this.fetchSummaryRankingIPHCivic(),
                    this.fetchIPHCivicCompareToBandungRayaData(),
                    this.fetchIPHCivicCompareToJabarData(),
                    this.fetchIPHCivicCompareToNasionalData(),
                    // this.fetchRankingData(),
                    // this.fetchCivicWithinBandungRayaData(),
                    // this.fetchCivicWithinJabarData(),
                    // this.fetchCivicCompareNationalData(),
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