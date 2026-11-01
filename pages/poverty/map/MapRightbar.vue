<script>
import Switches from 'vue-switches'
/**
 * Map Map Right-sidebar component
 */
export default {
    data() {
        return {
            config: {
                handler: this.handleMapRightBarClick,
                middleware: this.middleware,
                events: ["click"]
            },
            small: false,
        };
    },
    methods: {
        handleMapRightBarClick(e, el) {
            console.log('this is called');
            this.$parent.hideMapRightSidebar();
        },
        middleware(event, el) {
            return !event.target.classList.contains("toggle-right");
        },
    },
    components: {
        Switches,
    },
};
</script>

<template>
    <div>
        <!-- Map Right Sidebar -->
        <div class="map-right-bar" v-click-outside="config">
            <simplebar class="h-100">
                <b-tabs content-class="pt-0" justified class="nav-bordered">
                    <b-tab active>
                        <template v-slot:title>
                            <i class="ri-road-map-fill d-block font-22 my-1"></i>
                        </template>

                        <h6 class="font-weight-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
                            <span class="d-block py-1">Map Spatial Settings</span>
                        </h6>

                        <div class="p-3">
                            <div class="alert alert-warning" role="alert">
                                Sumber data spasial yang digunakan adalah <strong>Civic Datangahiji </strong>
                            </div>
                            <form class="app-search">
                                <div class="app-search-box">
                                    <div class="input-group">
                                        <input type="search" class="form-control" :placeholder="$t('navbar.search.text')"
                                            id="top-search" />
                                        <div class="input-group-append">
                                            <button class="btn" type="submit">
                                                <i class="fe-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="btn btn-secondary mt-2">
                                <span>
                                    <i class="mdi mdi-cloud-download mr-1"></i>Import
                                </span>
                            </div>
                            <h4 class="font-weight-medium font-14 mt-4 mb-2 pb-1">
                                Base Map Layer
                            </h4>
                            <b-form-radio-group v-model="layout" stacked @input="changeLayout($event)">
                                <div class="inline-block p-1">
                                    <switches v-model="small"></switches> <label for="OSM" class="d-inline">OSM</label>
                                </div>
                                <div class="inline-block p-1">
                                    <switches v-model="small"></switches> <label for="ORBI-BIG"
                                        class="d-inline">ORBI-BIG</label>
                                </div>
                                <div class="inline-block p-1">
                                    <switches v-model="small"></switches> <label for="OSM"
                                        class="d-inline">Arcgis-Imagery</label>
                                </div>
                                <div class="inline-block p-1">
                                    <switches v-model="small"></switches> <label for="OSM" class="d-inline">Tidak ada
                                        (Blank)</label>
                                </div>
                            </b-form-radio-group>
                            <div class="col-md-12 mt-4 pl-0 pr-0">
                                <h4 class="header-title">Data Layer</h4>
                                <div class="mt-3">
                                    <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted"
                                        unchecked-value="not_accepted">
                                        Kecamatan
                                    </b-form-checkbox>
                                    <b-form-checkbox id="checkbox-2" v-model="status2" name="checkbox-2" value="accepted"
                                        unchecked-value="not_accepted">
                                        Kelurahan
                                    </b-form-checkbox>
                                </div>
                                <div class="mt-3">
                                    <h4 class="header-title">Data Overlay</h4>
                                    <b-form-group>
                                        <b-form-radio v-model="selected" name="some-radios" value="A">Pesebaran
                                            Rumah</b-form-radio>
                                        <b-form-radio v-model="selected" name="some-radios" value="B">Foto</b-form-radio>
                                    </b-form-group>
                                </div>
                                <div class="mt-3">
                                    <h4 class="header-title">Data Overlay</h4>
                                    <b-form-group>
                                        <b-form-checkbox v-model="checked" name="check-button" switch>
                                            OSM
                                        </b-form-checkbox>
                                        <b-form-checkbox v-model="checked" name="check-button" switch>
                                            ORBI-BIG
                                        </b-form-checkbox>
                                        <b-form-checkbox v-model="checked" name="check-button" switch>
                                            Arcgis-Imagery
                                        </b-form-checkbox>
                                        <b-form-checkbox v-model="checked" name="check-button" switch>
                                            Tidak Ada (Blank)
                                        </b-form-checkbox>
                                    </b-form-group>
                                </div>
                            </div>
                            <div class="button-list">
                                <b-button block variant="primary" size="lg"><i class="ri ri-airplay-line mr-1"></i>Proses</b-button>
                            </div>
                        </div>
                    </b-tab>
            </b-tabs>
            <!-- Nav tabs -->
        </simplebar>
        <!-- end slimscroll-menu-->
    </div>
    <!-- /Right-bar -->

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
</div></template>
