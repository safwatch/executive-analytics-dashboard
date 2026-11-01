<template>
    <div v-if="isLoading">
        <div class="row justify-content-between d-flex">
            <div class="d-flex pt-2 pb-4 col col-lg-12">
                <SieShimmer :shape="'rectangle'" :width="'25%'" :height="'20px'" :borderRadius="'8px'" />
            </div>
            <div class="col col-xl-3">
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
            <div class="col col-xl-3">
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
            <div class="col col-xl-3">
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
            <div class="col col-xl-3">
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

        <div class="row justify-content-between d-flex">
            <div class="d-flex pt-2 pb-4 col col-lg-12">
                <h5 class="card-title fs-16 mb-1">Komoditas Andil Inflasi</h5>
            </div>
            <div class="col col-xl-3 mb-2">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityMonth4 && commodityMonth4[0] ?
                        getMonthName(commodityMonth4[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
                    <div class="flex-shrink-0">
                        <div class="dropdown card-header-dropdown">
                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </div>
                        </div>
                    </div>
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0 cardy-box">
                    <ul class="list-group list-group-flush border-dashed">

                        <li class="list-group-item ps-0" v-for="commodityMonth4 in commodityMonth4"
                            :key="commodityMonth4.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityMonth4.name)"
                                                :altText="commodityMonth4.name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityMonth4.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-danger badge-danger">{{
                                        commodityMonth4.percentage_change }}</span>
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3 mb-2">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityMonth3 && commodityMonth3[0] ?
                        getMonthName(commodityMonth3[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
                    <div class="flex-shrink-0">
                        <div class="dropdown card-header-dropdown">
                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </div>
                        </div>
                    </div>
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0 cardy-box">
                    <ul class="list-group list-group-flush border-dashed">

                        <li class="list-group-item ps-0" v-for="commodityMonth3 in commodityMonth3"
                            :key="commodityMonth3.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityMonth3.name)"
                                                :altText="commodityMonth3.name" />

                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityMonth3.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-danger badge-danger">{{
                                        commodityMonth3.percentage_change }}</span>
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3 mb-2">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityMonth2 && commodityMonth2[0] ?
                        getMonthName(commodityMonth2[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
                    <div class="flex-shrink-0">
                        <div class="dropdown card-header-dropdown">
                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </div>
                        </div>
                    </div>
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0 cardy-box">
                    <ul class="list-group list-group-flush border-dashed">

                        <li class="list-group-item ps-0" v-for="commodityMonth2 in commodityMonth2"
                            :key="commodityMonth2.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityMonth2.name)"
                                                :altText="commodityMonth2.name" />

                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityMonth2.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-danger badge-danger">{{
                                        commodityMonth2.percentage_change }}</span>
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3 mb-2">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityMonth1 && commodityMonth1[0] ?
                        getMonthName(commodityMonth1[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
                    <div class="flex-shrink-0">
                        <div class="dropdown card-header-dropdown">
                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span class="text-muted fs-18"><i class="mdi mdi-dots-vertical"></i></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Remove</a>
                            </div>
                        </div>
                    </div>
                </div><!-- end card header -->
                <div class="card-body pt-0 px-0 cardy-box">
                    <ul class="list-group list-group-flush border-dashed">

                        <li class="list-group-item ps-0" v-for="commodityMonth1 in commodityMonth1"
                            :key="commodityMonth1.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityMonth1.name)"
                                                :altText="commodityMonth1.name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityMonth1.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-danger badge-danger">{{
                                        commodityMonth1.percentage_change }}</span>
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
        </div>
    </div>
</template>

<script>
import DynamicPopover from '~/components/DynamicPopover.vue';
import { mapState, mapActions } from "vuex";
import { convertMonth } from '~/components/helpers/convertMonth';
import CommodityImage from '../helpers/CommodityImage.vue';
import { getSvgSrc } from '~/helpers/svg.helper';

export default {
    name: 'InflationCommodityMonth',
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        ...mapState('foodProfile', {
            selectedYear: state => state.selectedYear,
            inflationCommodityMonth1: state => state.inflationCommodityMonth1,
            inflationCommodityMonth2: state => state.inflationCommodityMonth2,
            inflationCommodityMonth3: state => state.inflationCommodityMonth3,
            inflationCommodityMonth4: state => state.inflationCommodityMonth4,
            // inflationPriceDevStatus: state => state.inflationPriceDevStatus,
        }),
    },
    watch: {
        selectedYear(newVal) {

            this.fetchDataCommodityMonth({
                yearObject: this.selectedYear,
                monthIndex: '1',
                type: 'inflasi'
            }).then(() => {
                this.isLoading = false;
            });

            this.fetchDataCommodityMonth({
                yearObject: this.selectedYear,
                monthIndex: '2',
                type: 'inflasi'
            }).then(() => {
                this.isLoading = false;
            });

            this.fetchDataCommodityMonth({
                yearObject: this.selectedYear,
                monthIndex: '3',
                type: 'inflasi'
            }).then(() => {
                this.isLoading = false;
            });

            this.fetchDataCommodityMonth({
                yearObject: this.selectedYear,
                monthIndex: '4',
                type: 'inflasi'
            }).then(() => {
                this.isLoading = false;
            });
        },
        inflationCommodityMonth1(newVal) {
            // console.log('whatcher inflationCommodityMonth1', newVal);
            this.commodityMonth1 = newVal;

        },
        inflationCommodityMonth2(newVal) {
            // console.log('whatcher inflationCommodityMonth1', newVal);
            this.commodityMonth2 = newVal;
        },
        inflationCommodityMonth3(newVal) {
            // console.log('whatcher inflationCommodityMonth1', newVal);
            this.commodityMonth3 = newVal;
        },
        inflationCommodityMonth4(newVal) {
            // console.log('whatcher inflationCommodityMonth1', newVal);
            this.commodityMonth4 = newVal;
        }

    },
    components: {
        DynamicPopover,
        CommodityImage,
        apexchart: () => import("vue-apexcharts"),
    },
    data() {
        return {
            chartKey: 0,
            isLoading: false,
            dataResult: {},
            activeIPHTab: 'IPH',
            commodityMonth1: {},
            commodityMonth2: {},
            commodityMonth3: {},
            commodityMonth4: {},
        }
    },
    mounted() {
        this.$store.dispatch('notification/clear');
        this.fetchDataCommodityMonth({
            yearObject: '2024',
            monthIndex: '1',
            type: 'inflasi'
        }).then(() => {
            this.isLoading = false;
        });

        this.fetchDataCommodityMonth({
            yearObject: '2024',
            monthIndex: '2',
            type: 'inflasi'
        }).then(() => {
            this.isLoading = false;
        });

        this.fetchDataCommodityMonth({
            yearObject: '2024',
            monthIndex: '3',
            type: 'inflasi'
        }).then(() => {
            this.isLoading = false;
        });

        this.fetchDataCommodityMonth({
            yearObject: '2024',
            monthIndex: '4',
            type: 'inflasi'
        }).then(() => {
            this.isLoading = false;
        });
        this.checkAuth().then((status) => {
            // if (status == 500) {
            //     this.$nuxt.error({ statusCode: 500, message: 'err message' })
            // } else {

            // }
        });
    },
    methods: {
        getMonthName(monthNumber) {
            return convertMonth(monthNumber);
        },
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },

        ...mapActions('foodProfile', ['fetchDataCommodityMonth', 'fetchDataCommodityMonth2', 'fetchDataCommodityMonth3', 'fetchDataCommodityMonth4']),
        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },
    },
}
</script>
<style scoped>
.cardy-box{
    height: 300px;
    min-height: 344px;
    overflow-y: scroll;
    background: #fff;
    border-radius: 0px 0px 3px 3px;
}
</style>