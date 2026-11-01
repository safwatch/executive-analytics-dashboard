<template>
    <div class="widget-simple card">
        <div class="card-header align-items-center d-flex bg-white border-bottom">
            <h4 class="card-title mb-0 flex-grow-1 text-muted">
                Pemantauan Komoditas - Bulan Maret 2025
            </h4>
        </div><!-- end card header -->
        <div class="card-body pt-0 px-0 cardy-box">
            <ul class="list-group list-group-flush border-dashed">
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Beras Medium')"
                                        :altText="'Beras Medium'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Beras Medium</a>
                        </div>
                        <div class="col-auto">
                            <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.19%
                            </span>
                            <!-- <span v-else-if="commodity.status === 'Stabil'"
                                class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> {{ commodity.percentage_change
                                }}%
                            </span> -->
                            <!-- <span v-else class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> {{ commodity.percentage_change }}%
                            </span> -->
                        </div>
                    </div>
                </li>
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Cabe Merah')"
                                        :altText="'Cabe Merah'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Cabe Merah</a>
                        </div>
                        <div class="col-auto">
                            <!-- <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.19%
                            </span> -->
                            <span class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> 0%
                            </span>
                            <!-- <span class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> {{ commodity.percentage_change }}%
                            </span> -->
                        </div>
                    </div>
                </li>
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Bawang Merah')"
                                        :altText="'Bawang Merah'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Bawang Merah</a>
                        </div>
                        <div class="col-auto">
                            <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.17%
                            </span>
                            <!-- <span class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> 2.19%
                            </span> -->
                            <!-- <span class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> {{ commodity.percentage_change }}%
                            </span> -->
                        </div>
                    </div>
                </li>
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Gula Pasir Lokal')"
                                        :altText="'Gula Pasir Lokal'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Gula Pasir Lokal</a>
                        </div>
                        <div class="col-auto">
                            <!-- <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.19%
                            </span> -->
                            <!-- <span class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> 2.19%
                            </span> -->
                            <span class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> 2.5%
                            </span>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Daging Sapi')"
                                        :altText="'Daging Sapi'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Daging Sapi</a>
                        </div>
                        <div class="col-auto">
                            <!-- <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.19%
                            </span> -->
                            <!-- <span class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> 2.19%
                            </span> -->
                            <span class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> 3.12%
                            </span>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Bawang Putih')"
                                        :altText="'Bawang Putih'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Bawang Putih</a>
                        </div>
                        <div class="col-auto">
                            <!-- <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.19%
                            </span> -->
                            <!-- <span class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> 2.19%
                            </span> -->
                            <span class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> 0.12%
                            </span>
                        </div>
                    </div>
                </li>
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Beras Premium')"
                                        :altText="'Beras Premium'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Beras Premium</a>
                        </div>
                        <div class="col-auto">
                            <!-- <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.19%
                            </span> -->
                            <span class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> 0%
                            </span>
                            <!-- <span class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> 0.12%
                            </span> -->
                        </div>
                    </div>
                </li>
                <li class="list-group-item ps-0">
                    <div class="row align-items-center g-3">
                        <div class="col-auto">
                            <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                <div class="text-center">
                                    <CommodityImage :src="getSvgSrc('Udang')" :altText="'Udang'" />
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <a href="#" class="text-reset fs-14 mb-0">Udang</a>
                        </div>
                        <div class="col-auto">
                            <!-- <span class="fs-12 badge badge-outline-success badge-secondary">
                                <i class="ri-arrow-down-line"></i> 0.19%
                            </span> -->
                            <!-- <span class="fs-12 badge badge-outline-warning badge-secondary">
                                <i class="ri-checkbox-blank-circle-line"></i> 0%
                            </span> -->
                            <span class="fs-12 badge badge-outline-danger badge-danger">
                                <i class="ri-arrow-up-line"></i> 1.00%
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div><!-- end card body -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getSvgSrc as generateSvg } from '~/helpers/svg.helper';
import CommodityImage from '../helpers/CommodityImage.vue';

export default {
    components: {
        CommodityImage,
        apexchart: () => import("vue-apexcharts"),
    },
    computed: {
        ...mapState('inflationProfile', {
            monitotingCommodityList: state => state.monitotingCommodityList,
            monitoringCommodityStatus: state => state.monitoringCommodityStatus,
        }),
    },
    data() {

        return {
            IPHDataChart: {
                series: [],
                chartOptions: {
                }
            },
        }
    },
    mounted() {
        this.fetchMonitoringCommodity();
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchMonitoringCommodity']),
        getSvgSrc(commodityName) {
            const image = generateSvg(commodityName);
            return image;
        },
    },
    watch: {
    }
}
</script>