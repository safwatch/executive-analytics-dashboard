<script>
import {tableData} from './data-keluarga'
/**
 * Advanced Table component
 */
export default {
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
        }
    },
    data() {
        return {
            tableData: tableData,
            title: 'Program PPKE',
            items: [{
                    text: 'Sampeu',
                    href: '/',
                },
                {
                    text: 'Kemiskinan',
                    href: '/',
                },
                {
                    text: 'Program PPKE',
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
            text: `
         Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
        `,
            content: `Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.`,
        }
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.tableData.length
        },
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
                    <!-- Table -->
                    <div class="table-responsive mb-0">
                        <b-table :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered"></b-table>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="dataTables_paginate paging_simple_numbers float-right">
                                <ul class="pagination pagination-rounded mb-0">
                                    <!-- pagination -->
                                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
