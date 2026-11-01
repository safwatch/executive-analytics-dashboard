<template>
    <div>
        <div class="row">
            <div class="col-xl-12">
                <div class="row h-100 card-danger bg-transparent">
                    <div class="col-xl-12 d-flex justify-content-center align-items-center">
                        <div
                            :class="['fullmap-wrapper d-flex w-100 flex-column', selectedCommodity ? 'single-wrapper' : '']">
                            <div id="city-map" class="w-100 align-items-center" style="min-height: 500px;"></div>
                            <div class="data-line-map">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWsAAAFYCAYAAACVqN17AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAWPSURBVHgB7drBbdNgGIBhO2EA2KDqApQbx9AuUo6cugKbABuwQNWMwAQlbNAFmmAjcim0V+eVnkey/ev/7q+s3x6HJzabzdkAwEkZj4s50uv1+ucAwKnZvXq6czgcHsZx/DEAcBKmLv8b6znUt7e3HwYATsZqAODkiTVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAgFgDBIg1QIBYAwSINUCAWAMEiDVAwDjfrq6ubqbH5+l6/Xd/+/j4+HG73e4GABY3Xl5eXo/j+OU/s90U7HdTsB8GABa1mkJ988zsbLVaXQ8ALG4+s754Yf52AGBxc6x3L8x/DQAsbj4G+fbccL/ffx0AWNz6/v5+e35+/mZavz9uHg6H+aPip7u7u+0AwOLG42Kz2VxMHxT/nF9Pb9Tf/QUCcDp+AzxRPtMJ53bzAAAAAElFTkSuQmCC"
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
                                    class="line-map" alt="" style="width: 7.9px">
                            </div>
                            <div :class="['data-full-map', selectedCommodity ? 'single-commodity' : '']">
                                <div class="card card-animate" style="display: flex; 
                                    flex-flow: column; 
                                    justify-content: center; 
                                    align-items: stretch; 
                                    background-color: white; 
                                    margin: 1rem; 
                                    border-radius: 5px; 
                                    padding: 1rem;">
                                    <div v-if="isLoadingMap" class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </span>
                                    </div>
                                    <div v-else class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">Pasar Atas</span>
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
                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Beras</span>
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
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Minyak
                                                        Goreng</span>
                                                    <h5 class="mt-0">Rp 66.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #CCEEDE; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #00A859;" class="fs-11"> <i
                                                                    class="ri-arrow-down-line align-middle"></i> Turun
                                                                Rp.
                                                                779
                                                                (-1.16%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Daging
                                                        Sapi</span>
                                                    <h5 class="mt-0">Rp 96.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #F8EAD9; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #D78C2D" class="fs-11"> <i
                                                                    class=" ri-checkbox-blank-circle-line align-middle"></i>
                                                                Stabil</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-animate" style="display: flex; 
                                    flex-flow: column; 
                                    justify-content: center; 
                                    align-items: stretch; 
                                    background-color: white; 
                                    margin: 1rem; 
                                    border-radius: 5px; 
                                    padding: 1rem;">
                                    <div v-if="isLoadingMap" class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </span>
                                    </div>
                                    <div v-else class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">Pasar Antri</span>
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
                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Beras</span>
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
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Minyak
                                                        Goreng</span>
                                                    <h5 class="mt-0">Rp 66.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #CCEEDE; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #00A859;" class="fs-11"> <i
                                                                    class="ri-arrow-down-line align-middle"></i> Turun
                                                                Rp.
                                                                779
                                                                (-1.16%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Daging
                                                        Sapi</span>
                                                    <h5 class="mt-0">Rp 96.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #F8EAD9; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #D78C2D" class="fs-11"> <i
                                                                    class=" ri-checkbox-blank-circle-line align-middle"></i>
                                                                Stabil</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-animate" style="display: flex; 
                                    flex-flow: column; 
                                    justify-content: center; 
                                    align-items: stretch; 
                                    background-color: white; 
                                    margin: 1rem; 
                                    border-radius: 5px; 
                                    padding: 1rem;">
                                    <div v-if="isLoadingMap" class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </span>
                                    </div>
                                    <div v-else class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">Pasar Baros</span>
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
                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Beras</span>
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
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Minyak
                                                        Goreng</span>
                                                    <h5 class="mt-0">Rp 66.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #CCEEDE; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #00A859;" class="fs-11"> <i
                                                                    class="ri-arrow-down-line align-middle"></i> Turun
                                                                Rp.
                                                                779
                                                                (-1.16%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Daging
                                                        Sapi</span>
                                                    <h5 class="mt-0">Rp 96.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #F8EAD9; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #D78C2D" class="fs-11"> <i
                                                                    class=" ri-checkbox-blank-circle-line align-middle"></i>
                                                                Stabil</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-animate" style="display: flex; 
                                    flex-flow: column; 
                                    justify-content: center; 
                                    align-items: stretch; 
                                    background-color: white; 
                                    margin: 1rem; 
                                    border-radius: 5px; 
                                    padding: 1rem;">
                                    <div v-if="isLoadingMap" class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </span>
                                    </div>
                                    <div v-else class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">Pasar Cimindi</span>
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
                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Beras</span>
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
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Minyak
                                                        Goreng</span>
                                                    <h5 class="mt-0">Rp 66.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #CCEEDE; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #00A859;" class="fs-11"> <i
                                                                    class="ri-arrow-down-line align-middle"></i> Turun
                                                                Rp.
                                                                779
                                                                (-1.16%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Daging
                                                        Sapi</span>
                                                    <h5 class="mt-0">Rp 96.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #F8EAD9; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #D78C2D" class="fs-11"> <i
                                                                    class=" ri-checkbox-blank-circle-line align-middle"></i>
                                                                Stabil</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-animate" style="display: flex; 
                                    flex-flow: column; 
                                    justify-content: center; 
                                    align-items: stretch; 
                                    background-color: white; 
                                    margin: 1rem; 
                                    border-radius: 5px; 
                                    padding: 1rem;">
                                    <div v-if="isLoadingMap" class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </span>
                                    </div>
                                    <div v-else class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">Pasar
                                            Rancabentang</span>
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
                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Beras</span>
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
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Minyak
                                                        Goreng</span>
                                                    <h5 class="mt-0">Rp 66.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #CCEEDE; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #00A859;" class="fs-11"> <i
                                                                    class="ri-arrow-down-line align-middle"></i> Turun
                                                                Rp.
                                                                779
                                                                (-1.16%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Daging
                                                        Sapi</span>
                                                    <h5 class="mt-0">Rp 96.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #F8EAD9; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #D78C2D" class="fs-11"> <i
                                                                    class=" ri-checkbox-blank-circle-line align-middle"></i>
                                                                Stabil</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-animate" style="display: flex; 
                                    flex-flow: column; 
                                    justify-content: center; 
                                    align-items: stretch; 
                                    background-color: white; 
                                    margin: 1rem; 
                                    border-radius: 5px; 
                                    padding: 1rem;">
                                    <div v-if="isLoadingMap" class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </span>
                                    </div>
                                    <div v-else class="commodity-title d-flex flex-column">
                                        <span class="title-market py-2 border-bottom text-dark">Pasar Melong</span>
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
                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Beras</span>
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
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Minyak
                                                        Goreng</span>
                                                    <h5 class="mt-0">Rp 66.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #CCEEDE; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #00A859;" class="fs-11"> <i
                                                                    class="ri-arrow-down-line align-middle"></i> Turun
                                                                Rp.
                                                                779
                                                                (-1.16%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="commodity-item">
                                                <div class="" style="display: flex; flex-flow: column;">

                                                    <span class="commodity-name pt-3 fs-11 text-dark pb-1">Daging
                                                        Sapi</span>
                                                    <h5 class="mt-0">Rp 96.364/kg</h5>
                                                </div>
                                                <div class="" style="display: flex; flex-flow: column;">
                                                    <div class="chip-custom">
                                                        <div class=""
                                                            style="display: flex; flex-flow: row; align-items: center; background-color: #F8EAD9; padding: 0.5rem; border-radius: 5px;">
                                                            <span style="color: #D78C2D" class="fs-11"> <i
                                                                    class=" ri-checkbox-blank-circle-line align-middle"></i>
                                                                Stabil</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- end col -->
                    <div class="col-xl-12">
                        <div class="legend-map"
                            style="display: flex; flex-flow: row; justify-content: space-around; align-items: center;">
                            <div v-if="isLoadingMap" class=""
                                style="display: flex; flex-flow: column; justify-content: center; align-items: center;">
                                <SieShimmer :shape="'rectangle'" :width="'60px'" :height="'50px'" :borderRadius="'8px'"
                                    class="mb-2" />
                                <SieShimmer :shape="'rectangle'" :width="'120px'" :height="'20px'" :borderRadius="'8px'"
                                    class="mb-2" />
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </div>
                            <div v-else class=""
                                style="display: flex; flex-flow: column; justify-content: center; align-items: center;">
                                <h4 class="fs-30 counter">4</h4>
                                <div
                                    style="background-color: rgb(246, 100, 81); height: 8px; width: 100%; margin-bottom: 10px; border-radius: 10px 10px 0px 0px;">
                                </div>
                                <p>Harga Naik</p>
                            </div>
                            <div v-if="isLoadingMap" class=""
                                style="display: flex; flex-flow: column; justify-content: center; align-items: center;">
                                <SieShimmer :shape="'rectangle'" :width="'60px'" :height="'50px'" :borderRadius="'8px'"
                                    class="mb-2" />
                                <SieShimmer :shape="'rectangle'" :width="'120px'" :height="'20px'" :borderRadius="'8px'"
                                    class="mb-2" />
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </div>
                            <div v-else class=""
                                style="display: flex; flex-flow: column wrap; justify-content: center; align-items: center;">
                                <h4 class="fs-30 counter">5</h4>
                                <div
                                    style="background-color: rgb(23, 216, 122); height: 8px; width: 100%; margin-bottom: 10px; border-radius: 10px 10px 0px 0px;">
                                </div>
                                <p>Harga Turun</p>
                            </div>
                            <div v-if="isLoadingMap" class=""
                                style="display: flex; flex-flow: column; justify-content: center; align-items: center;">
                                <SieShimmer :shape="'rectangle'" :width="'60px'" :height="'50px'" :borderRadius="'8px'"
                                    class="mb-2" />
                                <SieShimmer :shape="'rectangle'" :width="'120px'" :height="'20px'" :borderRadius="'8px'"
                                    class="mb-2" />
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                    :borderRadius="'8px'" />
                            </div>
                            <div v-else class=""
                                style="display: flex; flex-flow: column wrap; justify-content: center; align-items: center;">
                                <h4 class="fs-30 counter">20</h4>
                                <div
                                    style="background-color: rgb(254, 201, 95); height: 8px; width: 100%; margin-bottom: 10px; border-radius: 10px 10px 0px 0px;">
                                </div>
                                <p>Harga Stabil</p>
                            </div>
                        </div>
                    </div>

                </div> <!-- end row-->
            </div><!-- end col -->
        </div> <!-- end row-->

        <InflationCommodityWeekChart />

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as echarts from "echarts";
import civicJsonData from "@/components/widgets/civic-kecamatan.json";
import marketPoints from "@/components/widgets/titik-pasar.json"; // Assuming your JSON is stored in this file
import SimpleShimmer from "simple-shimmer";
import InflationCommodityWeekChart from './chart/InflationCommodityWeekChart.vue';

import VueApexCharts from "vue-apexcharts";

const dataCommodity = {
    series: [
        {
            name: "Inflasi",
            data: [20, 25, 30, 35, 40, 55, 70, 110, 150, 180, 210, 250],
        },
        {
            name: "Deflasi",
            data: [12, 17, 45, 42, 24, 35, 42, 75, 102, 108, 156, 199],
        },
        {
            name: "Stabil",
            data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
        }
    ],
    chartOptions: {
        chart: {
            height: 290,
            type: "area",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return "Rp." + value + "k";
                },
            },
            tickAmount: 5,
            min: 0,
            max: 260,
        },
        colors: ["#F06548", "#0AB39C", "#FFC107"],
        fill: {
            opacity: 0.06,
            colors: ["#F06548", "#0AB39C", "#FFC107"],
            type: "solid",
        },
    },
};
export default {
    components: {
        apexchart: () => import("vue-apexcharts"),
        SimpleShimmer,
        InflationCommodityWeekChart
    },
    data() {
        return {
            geoJson: civicJsonData,
            points: marketPoints, // Using the provided market data
            commodityActiveTab: 'Satuan',
            commodityLineAreaChart: dataCommodity,
            isLoading: false,
            isLoadingChart: false,
            isLoadingMap: false,
        };
    },
    created() {
        // Add the colors property to chartOptions dynamically where `this` is accessible
        // this.commodityLineAreaChart.chartOptions.colors = this.getChartColorsArray('["--vz-success", "--vz-danger", "--vz-warning"]');
    },
    mounted() {
        console.log(this.geoJson);
        console.log(this.points);

        this.$nextTick(() => {
            // Initial render with zoom level based on window size
            const windowWidth = window.innerWidth;
            let zoomLevel = windowWidth <= 480 ? 0.5 : windowWidth <= 768 ? 0.8 : 1;
            this.renderChart(zoomLevel);

            // Add resize listener
            window.addEventListener('resize', this.handleResize);
        });
    },
    beforeDestroy() {
        // Clean up the resize event listener when the component is destroyed
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
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

            // Hub point and lines data setup (from your original method)
            const hubPoint = this.points.find(point => point.name === "Pasar Antri");

            if (!hubPoint) {
                console.error("Hub point 'Pasar Antri' not found in the points data.");
                return;
            }

            const linesData = this.points
                .filter(point => point.name !== "Pasar Antri") // Exclude the hub itself
                .map(point => ({
                    fromName: hubPoint.name, // Connecting from "Pasar Antri"
                    toName: point.name, // To each market point
                    coords: [[hubPoint.longitude, hubPoint.latitude], [point.longitude, point.latitude]], // Coordinates for the line
                }));

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
                        data: [
                            { name: "Civic Tengah", value: 1000 },
                            { name: "Civic Utara", value: 2000 },
                            // Additional region data
                        ],
                    },
                    // {
                    //     name: "Markets",
                    //     type: "scatter",
                    //     coordinateSystem: "geo",
                    //     data: this.points.map(point => ({
                    //         name: point.name,
                    //         value: [point.longitude, point.latitude],
                    //     })),
                    //     symbol: 'image://' + require('@/assets/images/executive-analytics/pasar-point-xscale.png'), // Use relative path with require
                    //     symbolSize: 15, // Fixed size for all points
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#1768e8', // Color of the dots
                    //             borderColor: '#fff', // Border color of the dots
                    //             borderWidth: 2, // Border width of the dots
                    //             shadowColor: 'rgba(0, 0, 0, 0.0)', // Shadow color
                    //             shadowBlur: 10, // Shadow blur effect
                    //         },
                    //         emphasis: {
                    //             color: '#e5a016', // Color when a point is hovered
                    //             borderColor: '#fff', // Border color when hovered
                    //             borderWidth: 3, // Border width when hovered
                    //             shadowColor: 'rgba(0, 0, 0, 0.0)', // Stronger shadow when hovered
                    //             shadowBlur: 15, // Increased shadow blur when hovered
                    //         },
                    //     },
                    //     label: {
                    //         formatter: "{b}",
                    //         position: "top",
                    //         show: false,
                    //     },
                    //     emphasis: {
                    //         label: {
                    //             show: false,
                    //         },
                    //     },
                    //     tooltip: {
                    //         formatter: function (params) {
                    //             return `${params.name}`;
                    //         },
                    //     },
                    //     // Add click event listener
                    //     events: {
                    //         click: (params) => {
                    //             console.log('Market Point Clicked:', params.name); // Log the name to the console
                    //         }
                    //     }
                    // },
                ],
            };

            myChart.setOption(option);

            // Event listener for clicking on regions
            myChart.on('click', (params) => {
                console.log(params);
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
            });

            // Apply transform to all canvas elements under chartDom
            const canvasElements = chartDom.querySelectorAll('canvas');
            canvasElements.forEach(canvasElement => {
                canvasElement.classList.add('d-flex');
                canvasElement.style.transform = 'scale(1.3, 1)';
                canvasElement.style.transformOrigin = 'center center';
                canvasElement.style.transformOrigin = 'center'; // Ensure scaling happens from the center
                canvasElement.style.margin = '0 auto'; // Center the canvas element horizontally
            });

            // Resize the chart based on the window size
            this.resizeChart(myChart);
        },
        getChartColorsArray(colors) {
            colors = JSON.parse(colors);
            return colors.map(function (value) {
                var newValue = value.replace(" ", "");
                if (newValue.indexOf(",") === -1) {
                    var color = getComputedStyle(document.documentElement).getPropertyValue(
                        newValue
                    );
                    if (color) {
                        color = color.replace(" ", "");
                        return color;
                    } else return newValue;
                } else {
                    var val = value.split(",");
                    if (val.length == 2) {
                        var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(
                            val[0]
                        );
                        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                        return rgbaColor;
                    } else {
                        return newValue;
                    }
                }
            });
        },

        // food change by selected option
        triggerShimmer() {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 1000); // Adjust duration as needed
        },
        getChangeClass(change) {
            if (change > 0) return 'background-up';
            if (change < 0) return 'background-down';
            return 'background-stable';
        },
        getIconClass(change) {
            if (change > 0) return 'ri-arrow-up-line';
            if (change < 0) return 'ri-arrow-down-line';
            return 'ri-check-line'; // Example for stable; you can choose any other icon
        },
        getChangeStyle(change) {
            if (change > 0) return { color: '#F66451' };
            if (change < 0) return { color: '#27AE60' };
            return { color: '#E67E22' };
        },
        getChangeText(change) {
            if (change > 0) return `Naik Rp${Math.abs(change).toLocaleString()} (${((change / this.selectedCommodity.price) * 100).toFixed(2)}%)`;
            if (change < 0) return `Turun Rp${Math.abs(change).toLocaleString()} (${((change / this.selectedCommodity.price) * 100).toFixed(2)}%)`;
            return 'Stabil';
        },

        // resize map based on window size
        // Debounced function to avoid rapid re-rendering
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

        // Resize chart only when necessary and debounce it
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
            console.log(windowWidth);
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
    },
    computed: {
        ...mapState('foodCommodity', {
            selectedCommodity: state => state.selectedCommodity,
        }),
    },
    watch: {
        selectedCommodity(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.triggerShimmer();
            }
        },
    },

};
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
    top: 77px;
    right: 350px;
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(2) {
    top: 396px;
    left: 158px;
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(3) {
    bottom: 278px;
    left: 138px;
    /* bottom: 435px; */
    /* 563px+128px; */
    /* left: 12px; */
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(4) {
    bottom: 268px;
    right: 176px;
    /* bottom: 418px; */
    /* 546px+128px; */
    /* right: 7px; */
}

.fullmap-wrapper .data-line-map>.line-map:nth-child(5) {
    bottom: 15px;
    right: 332px;
    /* bottom: 240px; */
    /* 368px; +128px; */
    /* right: 108px; */
}

.fullmap-wrapper .data-line-map>.line-map:last-child {
    bottom: -63px;
    right: 518px;
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
    top: 75px;
    left: 140px;
}

.fullmap-wrapper .data-full-map>div:nth-child(3) {
    bottom: -5px;
    left: 100px;
}

.fullmap-wrapper .data-full-map>div:nth-child(4) {
    bottom: 71px;
    right: 30px;
}

.fullmap-wrapper .data-full-map>div:nth-child(5) {
    bottom: -303px;
    right: 179px;
}

.fullmap-wrapper .data-full-map>div:nth-child(6) {
    bottom: -360px;
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

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>