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
            <div class="d-flex pt-4 pb-4 col col-lg-12">
                <h5 class="card-title fs-16 mb-1">Komoditas Andil Deflasi</h5>
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityDefMonth4 && commodityDefMonth4[0] ?
                        getMonthName(commodityDefMonth4[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
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

                        <li class="list-group-item ps-0" v-for="commodityDefMonth4 in commodityDefMonth4"
                            :key="commodityDefMonth4.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityDefMonth4.name)"
                                                :altText="commodityDefMonth4.name" />

                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityDefMonth4.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-primary badge-primary">{{
                                        commodityDefMonth4.percentage_change }}</span>
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityDefMonth3 && commodityDefMonth3[0] ?
                        getMonthName(commodityDefMonth3[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
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

                        <li class="list-group-item ps-0" v-for="commodityDefMonth3 in commodityDefMonth3"
                            :key="commodityDefMonth3.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityDefMonth3.name)"
                                                :altText="commodityDefMonth3.name" />

                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityDefMonth3.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-primary badge-primary">{{
                                        commodityDefMonth3.percentage_change }}</span>
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityDefMonth2 && commodityDefMonth2[0] ?
                        getMonthName(commodityDefMonth2[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
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

                        <li class="list-group-item ps-0" v-for="commodityDefMonth2 in commodityDefMonth2"
                            :key="commodityDefMonth2.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityDefMonth2.name)"
                                                :altText="commodityDefMonth1.name" />

                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityDefMonth2.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-primary badge-primary">{{
                                        commodityDefMonth2.percentage_change }}</span>
                                </div>
                            </div>
                            <!-- end row -->
                        </li><!-- end -->
                    </ul><!-- end -->
                </div><!-- end card body -->
            </div>
            <div class="col col-xl-3">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">{{ commodityDefMonth1 && commodityDefMonth1[0] ?
                        getMonthName(commodityDefMonth1[0].bulan) : 'Data bulan tidak tersedia' }}</h4>
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

                        <li class="list-group-item ps-0" v-for="commodityDefMonth1 in commodityDefMonth1"
                            :key="commodityDefMonth1.name">
                            <div class="row align-items-center g-3">
                                <div class="col-auto">
                                    <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                        <div class="text-center">
                                            <CommodityImage :src="getSvgSrc(commodityDefMonth1.name)"
                                                :altText="commodityDefMonth1.name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <a href="#" class="text-reset fs-14 mb-0">{{ commodityDefMonth1.name }}</a>
                                </div>
                                <div class="col-auto">
                                    <span class="fs-12 badge badge-outline-primary badge-primary">{{
                                        commodityDefMonth1.percentage_change }}</span>
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
    name: 'DeflasiCommodityMonth',
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        ...mapState('foodProfile', {
            selectedYear: state => state.selectedYear,
            inflationCommodityDefMonth1: state => state.inflationCommodityDefMonth1,
            inflationCommodityDefMonth2: state => state.inflationCommodityDefMonth2,
            inflationCommodityDefMonth3: state => state.inflationCommodityDefMonth3,
            inflationCommodityDefMonth4: state => state.inflationCommodityDefMonth4,
            // inflationPriceDevStatus: state => state.inflationPriceDevStatus,
        }),
    },
    watch: {
        selectedYear(newVal) {

            this.fetchDataCommodityDefMonth({
                yearObject: this.selectedYear,
                monthIndex: '1',
                type: 'deflasi'
            }).then(() => {
                this.isLoading = false;
            });

            this.fetchDataCommodityDefMonth({
                yearObject: this.selectedYear,
                monthIndex: '2',
                type: 'deflasi'
            }).then(() => {
                this.isLoading = false;
            });

            this.fetchDataCommodityDefMonth({
                yearObject: this.selectedYear,
                monthIndex: '3',
                type: 'deflasi'
            }).then(() => {
                this.isLoading = false;
            });

            this.fetchDataCommodityDefMonth({
                yearObject: this.selectedYear,
                monthIndex: '4',
                type: 'deflasi'
            }).then(() => {
                this.isLoading = false;
            });
        },
        inflationCommodityDefMonth1(newVal) {
            this.commodityDefMonth1 = newVal;
        },
        inflationCommodityDefMonth2(newVal) {
            // console.log('whatcher inflationCommodityMonth1', newVal);
            this.commodityDefMonth2 = newVal;
        },
        inflationCommodityDefMonth3(newVal) {
            // console.log('whatcher inflationCommodityMonth1', newVal);
            this.commodityDefMonth3 = newVal;
        },
        inflationCommodityDefMonth4(newVal) {
            // console.log('whatcher inflationCommodityMonth1', newVal);
            this.commodityDefMonth4 = newVal;
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
            commodityDefMonth1: {},
            commodityDefMonth2: {},
            commodityDefMonth3: {},
            commodityDefMonth4: {},
        }
    },
    mounted() {

        // console.log('DEFLASI HERE');
        this.$store.dispatch('notification/clear');
        this.fetchDataCommodityDefMonth({
            yearObject: '2024',
            monthIndex: '1',
            type: 'deflasi'
        }).then(() => {
            this.isLoading = false;
        });

        this.fetchDataCommodityDefMonth({
            yearObject: '2024',
            monthIndex: '2',
            type: 'deflasi'
        }).then(() => {
            this.isLoading = false;
        });

        this.fetchDataCommodityDefMonth({
            yearObject: '2024',
            monthIndex: '3',
            type: 'deflasi'
        }).then(() => {
            this.isLoading = false;
        });

        this.fetchDataCommodityDefMonth({
            yearObject: '2024',
            monthIndex: '4',
            type: 'deflasi'
        }).then(() => {
            this.isLoading = false;
        });

    },
    methods: {
        getMonthName(monthNumber) {
            return convertMonth(monthNumber);
        },
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },

        ...mapActions('foodProfile', ['fetchDataCommodityDefMonth']),
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