<template>
    <div class="card card-height-100">
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <h4 class="card-title mb-0 flex-grow-1 text-muted d-flex gap-2">
                <span>Peta Sebaran Komoditas Per Pasar</span>
                <div class="card-head-popover">
                    <!-- <div class="card-head-popover position-absolute utl-top-16 utl-right-20"> -->
                    <a href="javascript:void(0);" id="map-pasar-popover" class="text-muted" variant="light">
                        <i class="fa fa-info-circle"></i>
                    </a>
                    <b-popover target="map-pasar-popover" triggers="hover" placement="right" custom-class="custom-popover">
                        <template v-slot:title>
                            Peta Sebaran Komoditas Per Pasar
                        </template>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate repellendus
                            distinctio
                            neque pariatur quo molestiae enim, ea adipisci odio, perferendis iste ratione
                            quam
                            ipsam
                            sunt? Esse optio cupiditate placeat dicta!
                        </div>
                    </b-popover>
                </div>
            </h4>
            <FoodCommodityFilterComponent />
        </div>
        <div class="card-body col-xl-12 d-flex justify-content-center align-items-center">
            <div class="fullmap-wrapper d-flex w-100 flex-column">
                <div id="city-map" class="w-100 align-items-center" style="min-height: 500px;"></div>
                <div class="data-line-map">
                    <!-- <img src="data:image/png;base64,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"
                        class="line-map" alt="" style="width: 260px">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgUAAAAJCAYAAACiwV9fAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADaSURBVHgB7dq9EYJAEIbh+6EA7QBpQMwML6AQWzA00g5swRIMjfBKsALmSsDM5MBlBjJogHufGbid3Qa+2TurAABAcpxzuVAhhN/U0woAACRDwoCz1t6lLMfWM8Z49t4HQgEAAIkYA8F7ZhQkGByyYX2gAADA6kkguC6McmPMKRsTQ64AAEDK9pn8PvIFBQAAVq3v+1JrvZmbSf/LmwIAABJRVdVNgsHsFUKMcWcVAABIQtM0viiKrZTHqSchoTXGXOq6frEpAAAgMbIxcF3XOSlbOR/e+3bo/wHsyDvvFcBGlAAAAABJRU5ErkJggg=="
                        class="line-map" alt="" style="height: 7.2px">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgUAAAAICAYAAABpnYz6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC8SURBVHgB7dthDcIwEIbh3m1CigKQUDIDWEACCggOwAEOQEAz6oRJAAFbuf1dFgzc+yTLLfft/y69VAIAAHAjmaZpzvYaReQzTdOt7/v7nEkAAAAudF13sPJY9m04uOacTwwFAAA4YUPB20pcy8Zx3Lf2QQ0AAMA1Vd21VocAAAA8iP9C1gcAADhh24GXlbSW2fpgowEAALhgP/5jrXVY9q13KaUMnBQAAOBISimq6nwLYSsiX3ueOecyZz8+Hi7B5wthCwAAAABJRU5ErkJggg=="
                        class="line-map" alt="" style="height: 6.5px">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAccAAAAJCAYAAABHaefCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADSSURBVHgB7dmxDYJAFMbxdwcDUNoJmxAmYQRKW0srZQJ1Axe4iJ1bIBPABOA7pdBEWeD+v+Q9IEf/5csZmeV5nlhrS531OI6dzqVpmocAABAY45cGYxpF0VVf04+zQadyzp0FAICAWL80GI/yHYxeonPwjVIAAAiI8eGn4dgv/HOapukmAAAEIpZ3Q1xSGmNKAQAgEK87x6Ioeg3AfyFZa3McBACAQMTzc6uz/3FeO+cqAQAgIJFfbdvesyzrtD2m+rnyTdFau9Ng3AgAAAAAIGxPVnYx4OEx+G4AAAAASUVORK5CYII="
                        class="line-map" alt="" style="height: 6.7px">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAADiCAYAAADnGu3YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMUSURBVHgB7dfBjdNAAEBRO0sBW0I6ADoISgqBTpZKEBVAAVEWOtgSUgINJGGMEILD7hl/vSfZHnvm+DUaz9Nvu93ufrPZvB/D1+P6fr1evw3nCVZkXm4j5jd3d3ePY3j/19z5crm8EzVrslluI+Yv078xL7bj+6cJVmQ+HA672+32+MKa8wQr8WqclbfzPL+0ZjvBSixBf33uaDF27vOYfzvO0T8m+I/t9/vbeJw3S6xjh/74zLrPYmZNfv0UHo/Hh7EbfxjDp+V9BP60vJ9Op4cJVmSeIODPkWOCEEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAialJ+XaUdmIor2owAAAABJRU5ErkJggg=="
                        class="line-map" alt="" style="width: 162px">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAD9CAYAAABukl0fAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYSURBVHgB7c+xDcIwEEDR2JmACZJ0lJSUlrIAjMAEzMAIbBBKJqBJIrNBNrBLyiwQhXPkUIAiqNG/6s5+9t2pJIYxZqO1Piql8lCP43hp27YKeRqBSdP0JmArZUC55LuiKBLn3F0FVJali5cfMQzDSssn+RIIISPsdPIlpG2vrbVe8m4JSbtOx+Qg2/TvQM5O4ZNpO+/9I8uyq/TPpVzLpZd83zRNNc01vwovpP95Luu6tq/hkx8CBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAT6Y/QE2t9ATCT/sMcAAAAASUVORK5CYII="
                        class="line-map" alt="" style="width: 7.9px"> -->
                    <img
                        alt=""
                        v-for="item in data"
                        :src="item?.img_src"
                        :class="`${selectedCommodityFilter ? 'line-map' : 'd-none'}`"
                        :style="item?.img_style"
                    />
                </div>
                <div :class="['data-full-map']">
                    <div
                        v-for="item in data"
                        :id="item.id"
                        :key="item.id"
                        :class="`${selectedCommodityFilter ? 'card card-animate' : 'd-none'}`"
                        style="display: flex; 
                        flex-flow: column; 
                        justify-content: center; 
                        align-items: stretch; 
                        background-color: white; 
                        margin: 1rem; 
                        border-radius: 5px; 
                        padding: 1rem;"
                    >
                        <div v-if="isLoadingMap" class="commodity-title d-flex flex-column">
                            <span class="title-market py-2 border-bottom text-dark">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </span>
                        </div>
                        <div v-else class="commodity-title d-flex flex-column">
                            <span class="title-market py-2 border-bottom text-dark">{{ item?.name ?? '' }}</span>
                        </div>
                        <!-- Shimmer Effect while data is loading -->
                        <div v-if="isLoading" class="shimmer mt-2"></div>
    
                        <!-- Show selected commodity if available -->
                        <div v-else-if="selectedCommodity">
                            <div class="commodity-item">
                                <div class="" style="display: flex; flex-flow: column;">
                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">{{
                                        selectedCommodity.name }}</span>
                                    <h5 class="mt-0">Rp {{ selectedCommodity.price }}/kg</h5>
                                </div>
                                <div :class="getChangeClass(selectedCommodity.priceChange)"
                                    class="chip-custom">
                                    <span :style="getChangeStyle(selectedCommodity.priceChange)"
                                        class="fs-11">
                                        <i :class="getIconClass(selectedCommodity.priceChange)"
                                            class="align-middle"></i>
                                        {{ getChangeText(selectedCommodity.priceChange) }}
                                    </span>
                                </div>
                            </div>
                        </div>
    
                        <!-- Default commodities display -->
                        <div v-else>
                            <div v-if="isLoadingMap">
                                <div class="commodity-item">
                                    <div class="py-2" style="display: flex; flex-flow: column;">
                                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'13px'"
                                            :borderRadius="'8px'" class="mb-1" />
                                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'23.5px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                    <div class="" style="display: flex; flex-flow: column;">
                                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'40px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="commodity-item">
                                    <div class="" style="display: flex; flex-flow: column;">
                                        <span class="commodity-name pt-3 fs-11 text-dark pb-1">{{ selectedCommodityFilter?.name }}</span>
                                        <h5 class="mt-0">Rp 13.500/kg</h5>
                                    </div>
                                    <div class="" style="display: flex; flex-flow: column;">
                                        <div class="chip-custom">
                                            <div class=""
                                                style="display: flex; flex-flow: row; align-items: center; background-color: #FCCFC2; padding: 0.5rem; border-radius: 5px;">
                                                <span style="color: #F66451;" class="fs-11"><i
                                                        class="ri-arrow-up-line align-middle"></i> Naik
                                                    Rp.2.857
                                                    (7.69%)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Harga Komoditas Perpasar -->
         <div class="row">
            <b-modal id="market-detail-modal" :title="`Detail Komoditas ${clickedMarket?.name ?? ''}`" dialog-class="modal-xl custom-modal" hide-footer>
                <div class="container">
                    <ul class="commoditylist list-unstyled row mb-4">
                        <div
                            v-for="(commodity, index) in commodities2"
                            :key="commodity.id"
                            class="commodity-item"
                            :class="{
                                'col-sm-12 col-md-6 col-xl-4': selectedCommodity !== commodity.id,
                                'col-md-12': selectedCommodity === commodity.id,
                            }" ref="commodity"
                        >
                            <li class="w-100 mt-3 position-relative pb-0" :class="commodity.change_type === 'up' ? 'commodity-high' : 'commodity-low'">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <div class="avatar-sm p-1 py-2 h-auto bg-light rounded">
                                            <div class="text-center">
                                                <CommodityImage :src="getSvgSrc(commodity.name)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col">
                                        <a
                                            href="#"
                                            class="text-reset fs-14 mb-0 font-weight-bold"
                                            :class="{
                                                'multiline-ellipsis': selectedCommodity !== commodity.id,
                                                'no-ellipsis': selectedCommodity === commodity.id
                                            }"
                                        >
                                            {{ commodity.name }}
                                        </a>
                                        <span>
                                            Sebelumnya : {{ (commodity.change_type) === 'up' ? `Rp
                                            ${parseInt(commodity.current_price - ((commodity.current_price *
                                            commodity.price_change_percentage) / 100)).toLocaleString("id-ID")}/kg`
                                            : `Rp
                                            ${parseInt(commodity.current_price + ((commodity.current_price *
                                                commodity.price_change_percentage) / 100)).toLocaleString("id-ID")}/kg`
                                            }}
                                        </span>
                                        <br>
                                        <span :class="commodity.change_type === 'up' ? 'text-danger' : 'text-success'">
                                            Saat ini : {{ commodity.price }}
                                        </span>
                                    </div>

                                    <div class="col-auto">
                                        <span
                                            class="fs-12 badge"
                                            :class="commodity.change_type === 'up' ? 'badge-outline-danger badge-danger' : 'badge-outline-success badge-success'"
                                        >
                                            <!-- <i :class="commodity.change_type === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'" class="align-middle"></i> -->
                                            <i :class="[getCommodityIconClass(commodity.change_type), 'align-middle']"></i>
                                            {{ commodity.price_change }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Details Section -->
                                <div class="row detail-commodity" v-show="selectedCommodity === commodity.id">
                                    <div class="col-md-12 mt-3">
                                        <h6 class="text-muted">Perbandingan dengan kota/kab lain</h6>
                                        <hr />
                                    </div>
                                    <div class="col-md-4 mt-3">
                                        <div class="card p-2 mb-2">
                                            <div class="row align-items-center g-3">
                                                <div class="col">
                                                    <h5 class="mt-0 mb-1">Kota Bogor</h5>
                                                    <span class="font-13">Rp 12.400/kg</span>
                                                </div>
                                                <div class="col-auto">
                                                    <span class="badge float-right badge-soft-danger">
                                                        <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 mt-3">
                                        <div class="card p-2 mb-2">
                                            <div class="row align-items-center g-3">
                                                <div class="col">
                                                    <h5 class="mt-0 mb-1">Kota Bandung</h5>
                                                    <span class="font-13">Rp 12.111/kg</span>
                                                </div>
                                                <div class="col-auto">
                                                    <span class="badge float-right badge-soft-danger">
                                                        <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 mt-3 ">
                                        <div class="card p-2 mb-2">
                                            <div class="row align-items-center g-3">
                                                <div class="col">
                                                    <h5 class="mt-0 mb-1">Kota Banjar</h5>
                                                    <span class="font-13">Rp 12.320/kg</span>
                                                </div>
                                                <div class="col-auto">
                                                    <span class="badge float-right badge-soft-danger">
                                                        <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 mt-3 ">
                                        <div class="card p-2 mb-2">
                                            <div class="row align-items-center g-3">
                                                <div class="col">
                                                    <h5 class="mt-0 mb-1">Kota Bekasi</h5>
                                                    <span class="font-13">Rp 12.833/kg</span>
                                                </div>
                                                <div class="col-auto">
                                                    <span class="badge float-right badge-soft-danger">
                                                        <i class="ri-arrow-up-line align-middle"></i> Naik Rp 166
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="position-relative w-100 mb-3 text-right">
                                        <a
                                            @click="closeDetail"
                                            href="javascript:void(0);"
                                            class="btn btn-light btn-sm text-danger border-0"
                                        >
                                            Tutup perbandingan <i class="mdi mdi-chevron-double-left"></i>
                                        </a>
                                    </div>
                                </div>

                                <!-- View Detail Button -->
                                <div v-if="selectedCommodity !== commodity.id" class="position-relative w-100 mb-3 text-right">
                                    <a href="javascript:void(0);" @click="expandDetail(commodity.id, index)" class="btn btn-light btn-sm text-primary border-0">
                                        Lihat perbandingan <i class="mdi mdi-chevron-double-right"></i>
                                    </a>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </b-modal>
         </div>
    </div>
</template>

<script>
import { gsap } from "gsap";
import { mapState } from 'vuex';
import * as echarts from "echarts";
import FoodCommodityFilterComponent from '~/components/widgets/inflation/filter/Food-commodity-filter.vue';

//map data
import civicJsonData from "@/components/widgets/civic-kecamatan.json";
import marketPoints from "@/components/widgets/titik-pasar-inflation-iph.json";

import { getSvgSrc } from '~/helpers/svg.helper';
import commodityList from "../commodities-list.json";
import CommodityImage from '../helpers/CommodityImage.vue';

export default {
    name: 'CommodityDistributionMap',
    components: {
        CommodityImage,
        FoodCommodityFilterComponent,
    },
    data() {
        return {
            isLoading: false,
            isLoadingMap: false,
            geoJson: civicJsonData,
            points: marketPoints,
            commodities2: commodityList,
            selectedCommodity: null,
            clickedMarket: null,
            selectedMarketIds: [],
            data: [
                {
                    id: 1,
                    name: 'Pasar Atas',
                    img_src: 'data:image/png;base64,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',
                    img_style: 'width: 260px',
                },
                {
                    id: 2,
                    name: 'Pasar Antri',
                    img_src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgUAAAAJCAYAAACiwV9fAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADaSURBVHgB7dq9EYJAEIbh+6EA7QBpQMwML6AQWzA00g5swRIMjfBKsALmSsDM5MBlBjJogHufGbid3Qa+2TurAABAcpxzuVAhhN/U0woAACRDwoCz1t6lLMfWM8Z49t4HQgEAAIkYA8F7ZhQkGByyYX2gAADA6kkguC6McmPMKRsTQ64AAEDK9pn8PvIFBQAAVq3v+1JrvZmbSf/LmwIAABJRVdVNgsHsFUKMcWcVAABIQtM0viiKrZTHqSchoTXGXOq6frEpAAAgMbIxcF3XOSlbOR/e+3bo/wHsyDvvFcBGlAAAAABJRU5ErkJggg==',
                    img_style: 'height: 7.2px',
                },
                {
                    id: 3,
                    name: 'Pasar Baros',
                    img_src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgUAAAAICAYAAABpnYz6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC8SURBVHgB7dthDcIwEIbh3m1CigKQUDIDWEACCggOwAEOQEAz6oRJAAFbuf1dFgzc+yTLLfft/y69VAIAAHAjmaZpzvYaReQzTdOt7/v7nEkAAAAudF13sPJY9m04uOacTwwFAAA4YUPB20pcy8Zx3Lf2QQ0AAMA1Vd21VocAAAA8iP9C1gcAADhh24GXlbSW2fpgowEAALhgP/5jrXVY9q13KaUMnBQAAOBISimq6nwLYSsiX3ueOecyZz8+Hi7B5wthCwAAAABJRU5ErkJggg==',
                    img_style: 'height: 6.5px',
                },
                {
                    id: 4,
                    name: 'Pasar Cimindi',
                    img_src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAccAAAAJCAYAAABHaefCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADSSURBVHgB7dmxDYJAFMbxdwcDUNoJmxAmYQRKW0srZQJ1Axe4iJ1bIBPABOA7pdBEWeD+v+Q9IEf/5csZmeV5nlhrS531OI6dzqVpmocAABAY45cGYxpF0VVf04+zQadyzp0FAICAWL80GI/yHYxeonPwjVIAAAiI8eGn4dgv/HOapukmAAAEIpZ3Q1xSGmNKAQAgEK87x6Ioeg3AfyFZa3McBACAQMTzc6uz/3FeO+cqAQAgIJFfbdvesyzrtD2m+rnyTdFau9Ng3AgAAAAAIGxPVnYx4OEx+G4AAAAASUVORK5CYII=',
                    img_style: 'height: 6.7px',
                },
                {
                    id: 5,
                    name: 'Pasar Rancabentang',
                    img_src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAADiCAYAAADnGu3YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMUSURBVHgB7dfBjdNAAEBRO0sBW0I6ADoISgqBTpZKEBVAAVEWOtgSUgINJGGMEILD7hl/vSfZHnvm+DUaz9Nvu93ufrPZvB/D1+P6fr1evw3nCVZkXm4j5jd3d3ePY3j/19z5crm8EzVrslluI+Yv078xL7bj+6cJVmQ+HA672+32+MKa8wQr8WqclbfzPL+0ZjvBSixBf33uaDF27vOYfzvO0T8m+I/t9/vbeJw3S6xjh/74zLrPYmZNfv0UHo/Hh7EbfxjDp+V9BP60vJ9Op4cJVmSeIODPkWOCEEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAiaFEGTImhSBE2KoEkRNCmCJkXQpAialJ+XaUdmIor2owAAAABJRU5ErkJggg==',
                    img_style: 'width: 162px',
                },
                {
                    id: 6,
                    name: 'Pasar Melong',
                    img_src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAD9CAYAAABukl0fAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYSURBVHgB7c+xDcIwEEDR2JmACZJ0lJSUlrIAjMAEzMAIbBBKJqBJIrNBNrBLyiwQhXPkUIAiqNG/6s5+9t2pJIYxZqO1Piql8lCP43hp27YKeRqBSdP0JmArZUC55LuiKBLn3F0FVJali5cfMQzDSssn+RIIISPsdPIlpG2vrbVe8m4JSbtOx+Qg2/TvQM5O4ZNpO+/9I8uyq/TPpVzLpZd83zRNNc01vwovpP95Luu6tq/hkx8CBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAT6Y/QE2t9ATCT/sMcAAAAASUVORK5CYII=',
                    img_style: 'width: 7.9px',
                },
            ],
        }
    },
    computed: {
        ...mapState('overwatchIPHCommodity', {
            selectedMarket: state => Array.isArray(state.selectedMarket) ? state.selectedMarket : [], // Ensure it's always an array
            marketComodityDistribution: state => state.marketComodityDistribution,
        }),
        ...mapState('foodCommodity', {
            selectedCommodityFilter: state => state.selectedCommodity,
        })
    },
    watch: {
        selectedMarket(value) {
            this.selectedMarketIds = value?.map((item) => item?.id).filter(Boolean) ?? [];
        },
    },
    mounted() {
        // map
        this.$nextTick(() => {
        // Initial render with zoom level based on window size
            const windowWidth = window.innerWidth;
            let zoomLevel = windowWidth <= 480 ? 0.5 : windowWidth <= 768 ? 0.8 : 1;
            this.renderChart(zoomLevel);

            // Add resize listener
            window.addEventListener('resize', this.handleResize);
        });
    },
    methods: {
        getSvgSrc(commodityName) {
            return getSvgSrc(commodityName);
        },
        renderChart(zoomLevel) {
            let chartDom = document.getElementById("city-map");

            if (!chartDom) {
                console.error("Chart DOM element not found.");
                return;
            }

            // Check if the chart instance already exists
            let myChart = echarts.getInstanceByDom(chartDom);

            // If no existing chart instance, create one; otherwise, reuse the existing one
            if (!myChart) {
                myChart = echarts.init(chartDom);
            }

            echarts.registerMap("Civic", this.geoJson);

            // Set the market points with custom symbols based on inflation data
            let marketData = this.points.map(point => {
                return {
                name: point.name,
                value: [point.longitude, point.latitude],
                inflation: point.inflation,
                symbol: 'circle', // Default symbol
                symbolSize: 16, // Size of the symbol
                itemStyle: {
                    color: point.inflation ? '#FF0000' : '#1768e8', // Color based on inflation
                },
                // Animation for the symbol (waving effect)
                animation: true,
                animationDuration: 2000, // Duration of the animation
                animationEasing: 'cubicInOut',
                };
            });

            let option = {
                tooltip: {
                    trigger: "item",
                    showDelay: 0,
                    transitionDuration: 0.2,
                    backgroundColor: '#1768e8', // Background color of the tooltip
                    borderColor: '#1768e8', // Border color of the tooltip
                    borderWidth: 1, // Border width of the tooltip
                    textStyle: {
                        color: '#fff', // Font color
                        fontSize: 12, // Font size
                        fontFamily: 'Poppins, sans-serif', // Font family
                        fontWeight: 'bold', // Font weight
                    },
                    formatter: function (params) {
                        return `<div style="text-align: center;">
                            <strong>${params.name}</strong><br/>
                            <span style="color: #FFD700;">Coordinates: ${params.value[1]}, ${params.value[0]}</span>
                        </div>`;
                    },
                },
                geo: {
                    map: "Civic",
                    roam: false,
                    zoom: zoomLevel,
                    aspectScale: 0.75, // scale: [1.5, 1],
                    itemStyle: {
                        normal: {
                        borderColor: '#111', // Set the border color of regions
                        borderWidth: 0.5, // Set the border width of regions
                        areaColor: '#B3E5FC', // Set the fill color of regions
                        },
                        emphasis: {
                        areaColor: '#FFCC80', // Highlight color when hovered
                        },
                    },
                    emphasis: {
                        label: {
                        show: false,
                        },
                    },
                    label: {
                        show: false, // Disable labels by default
                        emphasis: {
                        show: false, // Disable labels on hover and click
                        },
                    },
                },
                series: [
                    {
                        name: "Civic Kelurahan",
                        type: "map",
                        roam: false,
                        map: "Civic",
                        zoom: zoomLevel,
                        itemStyle: {
                            normal: {
                                borderColor: '#AEB0C0', // Set the border color of regions
                                borderWidth: 0.5, // Set the border width of regions
                                areaColor: '#f3f6f9', // Set the fill color of regions
                            },
                            emphasis: {
                                areaColor: '#FFCC80', // Highlight color when hovered
                            },
                        },
                        emphasis: {
                            label: {
                                show: false,
                            },
                        },
                        label: {
                            show: false, // Disable labels by default
                            emphasis: {
                                show: false, // Disable labels on hover and click
                            },
                        },
                        tooltip: {
                        show: false, // Disable tooltip for this series
                        },
                    },
                    {
                        name: "Markets",
                        type: "scatter",
                        coordinateSystem: "geo",
                        data: marketData,
                        symbolSize: 15, // Fixed size for all points
                        itemStyle: {
                            normal: {
                                color: '#1768e8', // Color of the dots
                                borderColor: '#fff', // Border color of the dots
                                borderWidth: 2, // Border width of the dots
                                shadowColor: 'rgba(0, 0, 0, 0.0)', // Shadow color
                                shadowBlur: 10, // Shadow blur effect
                            },
                            emphasis: {
                                color: '#e5a016', // Color when a point is hovered
                                borderColor: '#fff', // Border color when hovered
                                borderWidth: 3, // Border width when hovered
                                shadowColor: 'rgba(0, 0, 0, 0.0)', // Stronger shadow when hovered
                                shadowBlur: 15, // Increased shadow blur when hovered
                            },
                        },
                        label: {
                            formatter: "{b}",
                            position: "top",
                            show: true,
                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                        },
                        tooltip: {
                            show: false,
                            formatter: function (params) {
                                return `${params.name}`;
                            },
                        },
                        // Add click event listener
                        events: {
                            click: (params) => {
                                console.log('Market Point Clicked:', params.name); // Log the name to the console
                            }
                        }
                    },
                ],
            };

            myChart.setOption(option);

            // Event listener for clicking on regions
            myChart.on('click', async (params) => {
                // console.log(params);
                if (params.componentType === 'series' && params.seriesType === 'map') {
                    const clickedRegionName = params.name;

                    // Reset all regions to the default color
                    option.series[0].data.forEach((region) => {
                        if (region.itemStyle) {
                            delete region.itemStyle;
                        }
                    });

                    // Set the clicked region to a new color
                    const region = option.series[0].data.find(
                        (item) => item.name === clickedRegionName
                    );
                    if (region) {
                        region.itemStyle = {
                            normal: {
                                areaColor: '#FFD700', // New color for the clicked region
                            },
                        };
                    }

                    myChart.setOption(option);
                }
                // Handle market point clicks (scatter)
                if (params.componentType === 'series' && params.seriesType === 'scatter') {
                    const clicked = params.data || {};
                    const marketName = String(params.name || clicked.market_name || '').trim();
                    const marketId   = clicked.market_id ?? clicked.pasar_id ?? null;

                    // simpan untuk keperluan lain di komponen
                    this.clickedMarket = clicked;

                    // set filter di Vuex (jangan timpa array data!)
                    this.$store.commit('overwatchIPHCommodity/SET_MARKET_NAME', marketName);
                    this.$store.commit('overwatchIPHCommodity/SET_MARKET_ID', marketId);

                    // ambil data (tetap kirim nama_pasar walau backend belum pakai — future-proof)
                    await this.$store.dispatch('overwatchIPHCommodity/fetchMarketComodityDistribution');

                    const items = this.marketComodityDistribution;
                    const selectedFilter = this.selectedCommodityFilter;
                    const selectedFilterId = selectedFilter ? Number(selectedFilter?.id) : null;

                    const newData = items?.map((item) => {
                        let change_type = null;
                        if (item?.status === 'NAIK') change_type = 'up';
                        if (item?.status === 'TURUN') change_type = 'down';
                        if (item?.status === 'STABIL')change_type = 'stable';

                        if (selectedFilterId && selectedFilterId !== item?.comodity_id) return null;

                        return {
                            change_type,
                            current_price: item?.harga_terbaru,
                            id: item?.comodity_id,
                            name: item?.nama_komoditas,
                            previous_price: item?.harga_sebelumnya,
                            price: `Rp ${item?.harga_terbaru?.toLocaleString('ID-id')}`,
                            price_change: `${item?.status === 'NAIK' ? '' : '-'}${item?.percentage_change}%`,
                            price_change_percentage: item?.percentage_change
                        }
                    });
                    this.commodities2 = newData.filter(Boolean);

                    // buka modal (cukup satu modal dinamis; kalau mau dua modal, silakan pertahankan else-if)
                    this.$bvModal.show('market-detail-modal');
                }
            });

            // Apply transform to all canvas elements under chartDom
            const canvasElements = chartDom.querySelectorAll('canvas');
            canvasElements.forEach(canvasElement => {
                canvasElement.classList.add('d-flex');
                canvasElement.style.transform = 'scale(1.25, 1)';
                canvasElement.style.transformOrigin = 'center center';
                canvasElement.style.transformOrigin = 'center'; // Ensure scaling happens from the center
                canvasElement.style.margin = '0 auto'; // Center the canvas element horizontally
            });

            // Resize the chart based on the window size
            this.resizeChart(myChart);
        },
        resizeChart(chartInstance) {
            window.addEventListener('resize', this.debounce(() => {
                if (window.innerWidth <= 767.98) {
                    chartInstance.getDom().style.width = '90%';
                } else {
                    chartInstance.getDom().style.width = '100%';
                }
                chartInstance.resize();
            }, 300));
        },
        handleResize() {
            const windowWidth = window.innerWidth;
            let zoomLevel;
            if (window.innerWidth <= 480) {
                zoomLevel = 0.5; // Smaller zoom for mobile or zoomed-out browsers
            } else if (window.innerWidth <= 768) {
                zoomLevel = 0.8; // Medium zoom for tablets/small desktops
            } else if (window.innerWidth <= 1866) {
                zoomLevel = 1.2; // Adjust for medium to large screens
            } else {
                zoomLevel = 1.3; // Default zoom for larger screens
            }

            // Update the chart with the new zoom level
            this.renderChart(zoomLevel);
        },
        debounce(func, wait) {
            let timeout;
            return function () {
                const context = this, args = arguments;
                const later = function () {
                    clearTimeout(timeout);
                    func.apply(context, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        expandDetail(id, index) {
            if (this.selectedCommodity === id) return; // Prevent unnecessary re-click

            this.selectedCommodity = id;

            this.$nextTick(() => {
                const commodityItems = Array.isArray(this.$refs.commodity)
                ? this.$refs.commodity
                : [this.$refs.commodity];

                const selectedItem = commodityItems[index];

                // Animate width change
                gsap.to(selectedItem, { width: "100%", duration: 0.5, ease: "power2.out" });

                // Hide other items
                commodityItems.forEach((item, i) => {
                    if (i !== index) {
                        gsap.to(item, {
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => {
                                item.style.display = "none";
                            },
                        });
                    }
                });

                gsap.to(selectedItem.querySelector(".w-100.position-relative"), {
                    minHeight: "80vh",
                    duration: 0.5,
                    ease: "power2.out",
                });

                gsap.to(selectedItem.querySelector(".detail-commodity"), {
                    opacity: 1,
                    duration: 1,
                });
            });
        },
        closeDetail() {
            if (this.selectedCommodity === null) return;

            this.$nextTick(() => {
                const commodityItems = Array.isArray(this.$refs.commodity)
                ? this.$refs.commodity
                : [this.$refs.commodity];

                const index = this.commodities2.findIndex(
                    (c) => c.id === this.selectedCommodity
                );
                const selectedItem = commodityItems[index];

                if (!selectedItem) {
                    console.warn("GSAP target not found: selectedItem is null.");
                    return;
                }
                gsap.to(selectedItem.querySelector(".w-100.position-relative"), {
                    minHeight: "auto",
                    duration: 0.2,
                    ease: "power2.out",
                });
                // Fade out details and collapse
                gsap.to(selectedItem.querySelector(".detail-commodity"), {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        this.selectedCommodity = null;

                        // Animate back to normal width
                        gsap.to(selectedItem, { width: "33.3333%", duration: 0.5 });

                        // Restore other items
                        commodityItems.forEach((item) => {
                            if (item) {
                                item.style.display = "block"; // Show all items again
                                gsap.to(item, { opacity: 1, duration: 0.5 });
                            }
                        });
                    },
                });
            });
        },
        getChangeClass(change) {
            if (change > 0) return 'background-up';
            if (change < 0) return 'background-down';
            return 'background-stable';
        },
        getChangeStyle(change) {
            if (change > 0) return { color: '#F66451' };
            if (change < 0) return { color: '#27AE60' };
            return { color: '#E67E22' };
        },
        getIconClass(change) {
            if (change > 0) return 'ri-arrow-up-line';
            if (change < 0) return 'ri-arrow-down-line';
            return 'ri-check-line'; // Example for stable; you can choose any other icon
        },
        getChangeText(change) {
            if (change > 0) return `Naik Rp${Math.abs(change).toLocaleString()} (${((change / this.selectedCommodity.price) * 100).toFixed(2)}%)`;
            if (change < 0) return `Turun Rp${Math.abs(change).toLocaleString()} (${((change / this.selectedCommodity.price) * 100).toFixed(2)}%)`;
            return 'Stabil';
        },
        getCommodityIconClass(type) {
            if (type === 'up') return 'ri-arrow-up-line'
            if (type === 'down') return 'ri-arrow-down-line'
            return 'ri-equal-fill'
        }
    },
    beforeDestroy() {
        // Clean up the resize event listener when the component is destroyed
        window.removeEventListener('resize', this.handleResize);
    },
}
</script>

<style scoped>
.fullmap-wrapper {
    width: 100%;
    position: relative;
    min-height: 200px;
    max-width: 1285px;
    align-items: center;
    justify-content: center;
    margin-bottom: 400px;
}

.fullmap-wrapper.single-wrapper {
    margin-bottom: 200px;
}

#city-map {
    width: 100%;
    height: 800px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* Allow absolute positioning within */
}

@media (max-width: 767.98px) {
    #city-map {
        width: 90%;
        /* Set width to 90% on small screens */
    }
}

.fullmap-wrapper .data-line-map>.line-map {
    position: absolute;
}

.fullmap-wrapper .data-line-map>.line-map:first-child {
    top: 89px;
    right: 390px;
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(2) {
    top: 398px;
    left: 205px;
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(3) {
    bottom: 295px;
    left: 185px;
    /* bottom: 435px; */
    /* 563px+128px; */
    /* left: 12px; */
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(4) {
    bottom: 288px;
    right: 234px;
    /* bottom: 418px; */
    /* 546px+128px; */
    /* right: 7px; */
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(5) {
    bottom: 45px;
    right: 395px;
    /* bottom: 240px; */
    /* 368px; +128px; */
    /* right: 108px; */
}

.fullmap-wrapper .data-line-map>.line-map:last-child {
    bottom: -23px;
    right: 575px;
}

.fullmap-wrapper .data-full-map>div {
    position: absolute;
    margin: 0 !important;
    width: 223px !important;
}

.fullmap-wrapper .data-full-map>div:first-child {
    top: 0;
    right: 180px;
}

.fullmap-wrapper .data-full-map>div:nth-child(2) {
    top: 280px;
    left: 140px;
}

.fullmap-wrapper .data-full-map>div:nth-child(3) {
    top: 450px;
    left: 100px;
}

.fullmap-wrapper .data-full-map>div:nth-child(4) {
    top: 400px;
    right: 30px;
}

.fullmap-wrapper .data-full-map>div:nth-child(5) {
    bottom: -103px;
    right: 179px;
}

.fullmap-wrapper .data-full-map>div:nth-child(6) {
    bottom: -160px;
    right: 420px;
}

.fullmap-wrapper .data-full-map.single-commodity>div:first-child {
    top: 130px;
    right: 90px;
}

.fullmap-wrapper .data-full-map.single-commodity>div:nth-child(2) {
    top: 525px;
    left: 25px;
}

.fullmap-wrapper .data-full-map.single-commodity>div:nth-child(3) {
    bottom: 316px;
    left: 0px;
}

.fullmap-wrapper .data-full-map.single-commodity>div:nth-child(4) {
    bottom: 345px;
    right: 0px;
}

.fullmap-wrapper .data-full-map.single-commodity>div:nth-child(5) {
    bottom: 110px;
    right: 35px;
}

.fullmap-wrapper .data-full-map.single-commodity>div:nth-child(6) {
    bottom: -165px;
    right: 420px;
}

.legend-map h4.counter {
    line-height: 50px;
    color: white;
    background: -webkit-linear-gradient(337deg, #14D87A 0%, #14D87A 19.37%, #018947 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    padding: 0 2px;
}

.legend-map>div:first-child h4.counter {
    background: -webkit-linear-gradient(337deg, #F66451 0%, #F66451 19.37%, #b22010 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}

.legend-map>div:last-child h4.counter {
    background: -webkit-linear-gradient(337deg, #FEC95F 0%, #FEC95F 19.37%, #a06e0b 61.81%);
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
}

/* Add styles for shimmer effect and commodity cards */
.background-up {
    display: flex;
    flex-flow: row;
    align-items: center;
    background-color: rgb(252, 207, 194);
    padding: 0.5rem;
    border-radius: 5px;
}

.background-down {
    display: flex;
    flex-flow: row;
    align-items: center;
    background-color: rgb(204, 238, 222);
    padding: 0.5rem;
    border-radius: 5px;
}

.background-stable {
    display: flex;
    flex-flow: row;
    align-items: center;
    background-color: rgb(248, 234, 217);
    padding: 0.5rem;
    border-radius: 5px;
}

.price {
    font-size: 18px;
    font-weight: bold;
}

.change-up {
    color: #e74c3c;
    background-color: #f8d7da;
    padding: 5px;
    border-radius: 5px;
}

.change-down {
    color: #27ae60;
    background-color: #d4edda;
    padding: 5px;
    border-radius: 5px;
}

.change-stable {
    color: #e67e22;
    background-color: #fcebb6;
    padding: 5px;
    border-radius: 5px;
}

.shimmer {
    height: 150px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
}
/* Add this to your component's <style scoped> section */
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

.multiline-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* Number of lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 140px;
}

.no-ellipsis {
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    overflow: visible;
    max-width: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.commodity-item {
    transition: all 0.5s ease;
}

.commodity-item.active {
    cursor: default;
}

.content {
    text-align: center;
}

.details {
    padding: 10px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
}

.close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>