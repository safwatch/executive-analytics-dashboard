<script>
import {required} from "vuelidate/lib/validators";
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
            moduleId : 'sysrole',
            permissionIndex : false,
            page : null,
            tryToSend : false,
            submitting : false,
            start : 0,
            limit : 10,
            title: "Level Pengguna",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengaturan Sistem",
                },
                {
                    text: "Level Pengguna",
                    active: true,
                },
            ],
            tableData: [],
            isBusy: false,            
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: 'name',
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
            titleModal :null,
        };
    },
    computed: {
        /**
         * Total no. of records
         */
         rows() {
            return this.totalRows;
        },

        notification() {
            return this.$store ? this.$store.state.notification : null;
        },
        notificationAutoCloseDuration() {
            return this.$store && this.$store.state.notification ? 5 : 0;
        },
    },
    validations: {
        id: {
            required
        },
        name: {
            required
        },
    },
    mounted() {
        this.checkAuth().then((status) =>{
            if (status == 500){
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            }else{
                this.$store.dispatch('notification/clear');
                this.getData(0);
                this.page = 1;
            }
        });
    },
    methods: {
        async checkAuth(){
                return this.$userCheckAuth.checkAuth(this.moduleId);   
            },

        getData(){
            this.tableData = [];
            this.toggleBusy();
            this.$store.dispatch('group/getGroup', {
                    start: this.start,
                    limit: this.limit,
                })
                .then((status) => {
                    if(status){
                        this.toggleBusy();
                        let response = this.$store.state.group.groupList;
                        
                        for (var i=0; i<response.result.length; i++){
                                this.tableData.push({
                                    name: response.result[i].name, 
                                    id:  response.result[i].id,
                                })
                        }

                        this.totalRows = response.paging.data_total;
                    }
                })
                .catch((error) => {
                    console.log('error in group', error);
                });
        },

        toggleBusy() {
            this.isBusy = !this.isBusy
        },
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },

        onStore(id){
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }else{
                this.tryToSend = true;
                if (id == null){
                    //insert
                    let payload = {'id' : this.id, 'name' : this.name, };
                    this.patchStore(payload, "group/insertGroup");
                }else{
                    //update
                    let payload = {'id' : this.id, 'name' : this.name, 'id_old' : id};
                    this.patchStore(payload, "group/updateGroup");
                }
            }
        },

        onDelete(){
            let payload = {'id' : this.id};

            this.tryToSend = true;

            this.patchStore(payload, 'group/deleteGroup'); 
        },

        patchStore(payload, patch){
            this.$store.dispatch(patch, {
                    payload: payload,
                })
                .then((response) => {
                  if (response.status == "OK"){
                    this.tryToSend = false;
                    this.submitting = false;
                    this.$refs['modal-form-delete'].hide();
                    this.$refs['modal-form-store'].hide();
                    
                    this.$store.dispatch('notification/success', response.message, { root: true });

                    this.getData();
                  }else{
                    this.tryToSend = false;
                    this.submitting = false;
                    this.$refs['modal-form-delete'].hide();
                    this.$refs['modal-form-store'].hide();
                    this.$store.dispatch('notification/error', response.message, { root: true });
                  }

                  this.initFormValue();
                   
                })
                .catch((error) => {
                    this.tryToSend = false;
                    this.submitting = false;
                    this.$store.dispatch('notification/error', error.message, { root: true });
                    console.log('error in module store', error);
                });

                //for multiple action
                this.$store.dispatch('notification/clear');
        },

        initFormValue(){
            this.idSelected = null;
            this.dataSelected = null;
            this.name = null;
            this.id = null;
        },

        onShowDelete(id){
            this.id = id;
        },

        onShowUpdate(data){
            this.titleModal = "Ubah Level Pengguna";

            this.dataSelected = data;
            this.idSelected = data.id;
            this.name = data.name;
            this.id = data.id;
        },

        onShowCreate(){
            this.titleModal = "Tambah Level Pengguna";
            this.initFormValue();
            
        }
    },
    watch: {
            currentPage: {
            handler: function(value) {
                let start = value * 10;

                this.start = start - 10;

                this.getData(this.start);

                //change page
                this.page = value;
            }
            }
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
                            <h4 class="header-title">Level Pengguna</h4>
                        </div>
                        <div class="col-md-6 text-center text-md-right mt-2 mt-md-0">
                            <a href="javascript:void(0);" class="btn btn-sm btn-primary waves-effect waves-light" v-b-modal.modal-form variant="primary" @click="onShowCreate()">
                                <i class="ri-add-line mr-2"></i> Tambah
                            </a>
                        </div>
                    </div>

                    <b-alert :variant="notification.type" class="mt-3 text-center" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible>{{notification.message}}</b-alert>
                    
                    <p class="text-muted font-13 mb-4"></p>
                    <div class="row mb-md-2">
                        <!-- <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_length" class="dataTables_length">
                                <label class="d-inline-flex align-items-center">
                                    Show&nbsp;
                                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                </label>
                            </div>
                        </div> -->
                        <!-- Search -->
                        <!-- <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                                <label class="d-inline-flex align-items-center">
                                    Search:
                                    <b-form-input v-model="filter" type="search" placeholder="Search..." class="form-control form-control-sm ml-2"></b-form-input>
                                </label>
                            </div>
                        </div> -->
                        <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0">
                        <b-table :items="tableData" primary-key="uniqueId" :key="tableData.name" :fields="fields" responsive="sm" :per-page="0" :busy="isBusy" :current-page="currentPage"  :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" show-empty>
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
                            <template v-slot:cell(action) = "{ item }">
                                <ul class="list-inline table-action m-0">
                                    <li class="list-inline-item">
                                        <b-tooltip target="tooltip-edit">Ubah</b-tooltip>
                                        <a href="javascript:void(0);" class="action-icon px-1" id="tooltip-edit" v-b-modal.modal-form @click="onShowUpdate(item)"> 
                                            <i class="ri-pencil-line"></i>
                                        </a>
                                    </li>
                                    <li class="list-inline-item">
                                        <b-tooltip target="tooltip-delete">Hapus</b-tooltip>
                                        <a href="javascript:void(0);" class="action-icon px-1 text-danger" id="tooltip-delete" v-b-modal.delete-modal @click="onShowDelete(item.id)"> 
                                            <i class="ri-delete-bin-line"></i>
                                        </a>
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

                    <!-- Delete Modal -->
                    <b-modal id="delete-modal" ref="modal-form-delete" body-class="p-4" hide-header centered hide-footer size="sm">
                        <div class="text-center">
                            <i class="bx bxs-info-circle h1 text-danger"></i>
                            <h4 class="mt-2">Hapus Data</h4>
                            <p class="mt-3">Ada yakin akan menghapusnya?</p>
                            <button type="button" class="btn btn-secondary my-2" @click="$bvModal.hide('delete-modal')">Batal</button>
                            <button type="button" class="btn btn-danger my-2" @click="onDelete">Ya, Hapus</button>
                        </div>
                    </b-modal>
                    <!-- End Delete modal -->

                    <!-- Form Modal -->
                    <b-modal id="modal-form" ref="modal-form-store" :title=titleModal hide-footer title-class="font-18">
                        <form action="#" @submit.prevent="onStore(idSelected)">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">ID Level <span class="text-danger">*</span></label>
                                        <input type="text" v-model="id" :values=id class="form-control" placeholder="Masukan id" :class="{ 'is-invalid': submitting && $v.id.$error }"/>
                                        <div v-if="submitting && $v.id.$error" class="invalid-feedback">
                                            <span v-if="!$v.id.required">ID tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">Nama Level <span class="text-danger">*</span></label>
                                        <input type="text" v-model="name" :values=name class="form-control" placeholder="Masukan nama" :class="{ 'is-invalid': submitting && $v.name.$error }"/>
                                        <div v-if="submitting && $v.name.$error" class="invalid-feedback">
                                            <span v-if="!$v.name.required">Nama tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 text-right">
                                    <button type="button" class="btn btn-secondary my-2" @click="$bvModal.hide('modal-form')">Batal</button>
                                    <button type="submit" v-if="!tryToSend" class="btn btn-primary my-2" >Simpan</button>
                                    <b-button v-if="tryToSend" variant="primary" disabled class="btn btn-primary my-2">
                                        <b-spinner small></b-spinner>&nbsp;&nbsp;Mohon tunggu...
                                    </b-button>
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
