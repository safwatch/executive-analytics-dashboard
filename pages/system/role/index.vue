<script>
/**
 * System level page
 */
export default {
    head() {
        return {
            title: `${this.title} Pengaturan Sistem - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    data() {
        return {
            moduleId : 'systask',
            permissionIndex : false,
            title: "Hak Akses",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengaturan Sistem",
                },
                {
                    text: "Hak Akses",
                    active: true,
                },
            ],
            tableData: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: 'module',
            sortDesc: false,
            fields: [
                {
                    label: 'No',
                    key: 'number',
                    sortable: true
                },
                {
                    label: 'ID',
                    key: 'id',
                    sortable: true
                },
                {
                    label: 'Nama',
                    key: 'name',
                    sortable: true
                },
                {
                    label: 'Aksi',
                    key: 'action',
                    sortable: false
                },
            ],
            id : null,
            name : null,
            dataSelected : null,
            idSelected : null,
            start : 0,
            limit : 10,
        };
    },
    computed: {
        /**
         * Total no. of records
         */
         rows() {
            return this.totalRows;
        },
    },
    mounted() {
        this.checkAuth().then((response) =>{
            if (response.status == 'ERROR'){
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            }
            this.$store.dispatch('notification/clear');
            this.getData(0);
            this.page = 1;
        });
    },
    methods: {
        async checkAuth(){
                return this.$userCheckAuth.checkAuth(this.moduleId);   
            },
        getData(){
            this.tableData = [];
            this.$store.dispatch('group/getGroup', {
                    start: this.start,
                    limit: this.limit,
                })
                .then(() => {
                    let response = this.$store.state.group.groupList;

                   for (var i=0; i<response.result.length; i++){
                        this.tableData.push({
                            name: response.result[i].name, 
                            id:  response.result[i].id,
                        })
                   }

                   this.totalRows = response.paging.data_total;
                })
                .catch((error) => {
                    console.log('error in group', error);
                });
        },
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
    },
    middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row d-flex align-items-center">
                        <div class="col-md-6 text-center text-md-left">
                            <h4 class="header-title">Hak Akses</h4>
                        </div>
                    </div>
                    
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
                        <b-table :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                            <template #empty="scope">
                                <div class="text-center my-2">{{ scope.emptyText }}</div>
                            </template>
                            <template #table-busy>
                                <div class="text-center my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>Loading...</strong>
                                </div>
                            </template>
                            <template v-slot:cell(number)="uniqueId">
                                <b> {{ (page * 10) - ( 10 - (uniqueId.index + 1))}}</b>
                            </template>
                            <template v-slot:cell(action) = data>
                                <ul class="list-inline table-action m-0">
                                    <li class="list-inline-item">
                                        <b-tooltip target="tooltip-edit">Ubah</b-tooltip>
                                        <nuxt-link class="action-icon px-1" id="tooltip-edit" :to="'/system/role/edit/' + data.item.id">
                                            <i class="ri-pencil-line"></i>
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </template>
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="dataTables_paginate paging_simple_numbers d-flex justify-content-center float-md-right">
                                <ul class="pagination pagination-rounded d-flex mb-0">
                                    <!-- pagination -->
                                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- End Table -->

                    <!-- Form Modal -->
                    <b-modal id="modal-form" title="Tambah Level Pengguna" hide-footer title-class="font-18">
                        <form>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">ID Level</label>
                                        <input type="text" class="form-control" placeholder="Masukan id" />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">Nama Level</label>
                                        <input type="text" class="form-control" placeholder="Masukan nama" />
                                    </div>
                                </div>
                                <div class="col-md-12 text-right">
                                    <button type="button" class="btn btn-secondary my-2" @click="$bvModal.hide('modal-form')">Batal</button>
                                    <button type="button" class="btn btn-primary my-2">Simpan</button>
                                </div>
                            </div>
                        </form>
                    </b-modal> 
                    <!-- End Form Modal -->
                </div>
            </div>
        </div>
    </div>
</div>
</template>
