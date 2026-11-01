<script>
import {tableData} from '../p3ke/data-keluarga'
import WidgetChart  from "~/components/widgets/Widget-chart.vue";
import { CRS, latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

/**
 * Advanced Table component
 */
export default {
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
        }
    },
    components: {
        WidgetChart,
        LMap,
        LTileLayer,
    },
    data() {
        return {
            tableData: tableData,
            title: 'Profile Kemiskinan',
            items: [{
                    text: 'Sampeu',
                    href: '/',
                },
                {
                    text: 'Kemiskinan',
                    href: '/',
                },
                {
                    text: 'Profile Kemiskinan',
                    active: true,
                },
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: 'age',
            sortDesc: false,
            fields: [{
                    key: 'no',
                    sortable: true
                },
                {
                    key: 'id_keluarga_program_ppke',
                    sortable: true
                },
                {
                    key: 'dimuktakhirkan_tahun',
                    sortable: true
                },
                {
                    key: 'provinsi',
                    sortable: true
                },
                {
                    key: 'kabupaten_kota',
                    sortable: true
                },
                {
                    key: 'kecamatan',
                    sortable: true
                },
                {
                    key: 'desa_kelurahan',
                    sortable: true
                },
                {
                    key: 'kode_kemdagri',
                    sortable: true
                },
                {
                    key: 'desil_kesejahteraan',
                    sortable: true
                },
                {
                    key: 'persentil',
                    sortable: true
                },
                {
                    key: 'alamat',
                    sortable: true
                },
                {
                    key: 'prioritas_verval',
                    sortable: true
                },
                {
                    key: 'nama_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'nik_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'nik_kepala_keluarga_padan_kemdagri',
                    sortable: true
                },
                {
                    key: 'jenis_kelamin_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'tanggal_lahir_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'pekerjaan_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'status_pekerjaan_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'pendidikan_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'status_kawin_kepala_keluarga',
                    sortable: true
                },
                {
                    key: 'kepemilikan_rumah',
                    sortable: true
                },
                {
                    key: 'memiliki_simpanan_uang_perhiasan_ternak_lainnya',
                    sortable: true
                },
                {
                    key: 'jenis_atap',
                    sortable: true
                },
                
                {
                    key: 'kualitas_atap',
                    sortable: true
                },
                
                {
                    key: 'jenis_dinding',
                    sortable: true
                },          
            ],
            text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.`,
            content: `Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.`,
            widgetData: [{
                    number: "268.900",
                    text: "Angka Kemiskinan",
                    chartColor: "#1abc9c"
                },
                {
                    number: "8574",
                    text: "Angka Kelurahan Kategori Miskin",
                    chartColor: "#3bafda"
                },
                {
                    number: "1.25 Milyar",
                    text: "Dana Outstanding",
                    chartColor: "#f672a7"
                },
                {
                    number: "890238",
                    text: "Angka Pendidikan",
                    chartColor: "#6c757d"
                }
            ],
            zoom: 12,
            center: latLng(-6.899541, 107.533867),
            layerIndex: 0,
            layers: [
                { 
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                },
                {
                    url: 'https://vec01.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}',
                    subdomains: '1,2,3,4',
                    attribution: '&copy; <a href="http://yandex.ru/copyright">Yandex</a>',
                    crs: CRS.EPSG3395
                }
            ],
        }
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length
        },
        layer () {
            return this.layers[this.layerIndex]
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length
    },
    methods: {
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
    },
    middleware: 'router-auth'
}
</script>


<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div v-for="widget in widgetData" :key="widget.text" class="col-xl-3 col-md-6">
            <WidgetChart :number="widget.number" :text="widget.text" :chart-color="widget.chartColor" />
        </div>
        <!-- end col -->
    </div>
    <div class="row">
        <div class="col-xl-4 col-lg-6">
            <div class="card">
                <div class="card-body ribbon-box">
                    <div class="ribbon-two ribbon-two-dark"><span>Statistik</span></div>
                    <h4 class="header-title float-right mt-1  mb-3">Agregat Kemiskinan Berdasarkan Wilayah</h4>
                    <div class="ribbon-content">
                        <div class="table-responsive mb-0">
                            <table class="table table-sm table-centered mb-0 font-14 mt-1">
                                <tbody>
                                    <tr>
                                        <td>MELONG</td>
                                        <td  style="width: 50%;">
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"  v-b-tooltip.hover title="2248"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CIBEUREUM</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: 45%;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CIBEBER</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-warning" role="progressbar" style="width: 30%;" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>LEUWIGAJAH</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>UTAMA</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>BAROS</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>SETIAMANAH</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>PADASUKA</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>KARANGMEKAR</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CIMAHI</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CIGUGUR TENGAH </td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CIBABAT</td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CITEUREUP </td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CIGUGUR TENGAH </td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>CIPAGERAN </td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>PASIRKALIKI </td>
                                        <td>
                                            <div class="progress" style="height: 7px;">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- end table-responsive-->
                </div>
                <!-- end card-body-->
            </div>
            <!-- end card-->
        </div>
        <div class="col-xl-8 col-lg-6">
            <div class="card">
                <div class="card-body ribbon-box map-box">
                    <div class="ribbon ribbon-dark float-right"><i class="mdi mdi-map-legend mr-1"></i>
                        Spasial
                    </div>
                    <h5 class="text-dark float-left mt-0">Data Kemiskinan Civic Spasial</h5>
                    <l-map
                    ref="map"
                    :crs="layer.crs"
                    :zoom="zoom"
                    :center="center"
                    style="height: 400px; width: 100%;"
                    >
                    <l-tile-layer
                        :url="layer.url"
                        :subdomains="layer.subdomains"
                        :attribution="layer.attribution"
                    />
                    </l-map>
                </div>
            </div>

            <div class="card">
                <div class="card-body ribbon-box map-box">
                    <div class="ribbon-two ribbon-two-danger"><span>Deskripsi</span></div>
                    <h5 class="text-dark float-left mt-0 ml-2">Persentase Penduduk Miskin</h5>
                    <div class="ribbon-content">
                        <p class="mb-0">
                            <b-media class="mb-3">
                            <template v-slot:aside>
                                <b-img src="~/assets/images/executive-analytics/icon-kemiskinan.png" alt="Generic placeholder image" height="100"></b-img>
                            </template>
                            Kemiskinan di Civic Administration mengalami kenaikan dalam 5 tahun terakhir dari 3,56% di tahun 2018 menjadi 4,69% di tahun 2022
                        </b-media>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Program Percepatan Penghapusan Kemiskinan Ekstrem (Program PPKE)</h4>
                    <b-tabs content-class>
                        <b-tab title="Individu" active>
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Keluarga">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                    </b-tabs>
                    <p class="text-muted font-13 mb-4"></p>
                    <div class="row mb-md-2">
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_length" class="dataTables_length">
                                <label class="d-inline-flex align-items-center">
                                    Show&nbsp;
                                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                </label>
                            </div>
                        </div>
                        <!-- Search -->
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                                <label class="d-inline-flex align-items-center">
                                    Search:
                                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                                </label>
                            </div>
                        </div>
                        <!-- End search -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
