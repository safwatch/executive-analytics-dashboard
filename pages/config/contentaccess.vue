	<script>

import Multiselect from 'vue-multiselect'
import {required} from "vuelidate/lib/validators";

/**
 * System module
 */
export default {
    head() {
        return {
            title: `${this.title} Pengaturan Sistem - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            moduleId : 'contentaccess',
            permissionIndex : false,
            page : null,
            tryToSend : false,
            submitting : false,
            start : 0,
            limit : 10,
            title: "Akses Saya",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengaturan Konten",
                },
                {
                    text: "Akses Saya",
                    active: true,
                },
            ],
            tableData: [],
            isBusy: false,            
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: '',
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
                    label: 'Nama Fitur',
                    key: 'module',
                    sortable: true
                },
                {
                    label: 'SKPD Pemilik',
                    key: 'workunitOwner',
                    sortable: true
                },
                {
                    label: 'Status',
                    key: 'statusName',
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
            task: null,
            dataSelected : null,
            idSelected : null,
            titleModal :null,
            moduleOptions :[],
            module:null,
            taskOptions: [
                { value: 'index', text: 'Lihat' },
                { value: 'create', text: 'Tambah' },
                { value: 'update', text: 'Ubah' },
                { value: 'delete', text: 'Hapus' },
                { value: 'print', text: 'Cetak' },
                { value: 'detail', text: 'Detail' },
                { value: 'import', text: 'Import' },
                { value: 'export', text: 'Eksport' },
            ]
        };
    },
    validations: {
        module: {
            required
        },
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
            this.$store.dispatch('access/getAccesList', {
                    start: this.start,
                    limit: this.limit,
                    search : this.filter,
                    type:'request'
                })
                .then(() => {
                   this.toggleBusy();
                   let response = this.$store.state.access.accessList;
                   for (var i=0; i<response.result.length; i++){
                        this.tableData.push({
                            module: response.result[i].module.name, 
                            module_id: response.result[i].module.id, 
                            workunitOwner:  response.result[i].workunit.owner,
                            workunitRequest:  response.result[i].workunit.request,
                            statusName:  response.result[i].status.name,
                            statusId:  response.result[i].status.id,
                            statusColor:  response.result[i].status.color,
                            id:  response.result[i].id,
                        })
                   }

                   this.totalRows = response.paging.data_total;
                })
                .catch((error) => {
                    console.log('error in access', error);
                });
        },

        async getDataModule(){
            this.moduleOptions= [{ id: null, text: '- Pilih Fitur -' }];
            this.$store.dispatch('module/getModule', {
                    start: 0,
                    limit: 1000,
                    search : '',
                    share : '1'
                })
                .then(() => {
                   let response = this.$store.state.module.moduleList;
                   for (var i=0; i<response.result.length; i++){

                    // work unit id temporary
                    let workunit_temp = response.result[i].workunit_id;

                    // check in module options
 
                    if (workunit_temp != null) {
                        var idx = this.moduleOptions.findIndex(p => p.label === workunit_temp);

                        if (idx < 0){
                            this.moduleOptions.push({
                                label: workunit_temp,
                                options :[]
                            });
                            for (var j=0; j<response.result.length; j++){
                                var moduleOptionsIdx = this.moduleOptions.findIndex(p => p.label == workunit_temp);
                                if (response.result[j].workunit_id === workunit_temp){
                                    this.moduleOptions[moduleOptionsIdx].options.push({
                                        id: response.result[j].id, text: response.result[j].name
                                    });
                                }
                            }
                        }
                    }else{
                        this.moduleOptions.push({
                            id: response.result[i].id, text: response.result[i].name
                        });
                    }                     
                  
                   }
                })
                .catch((error) => {
                    console.log('error in module', error);
                });
        },

        toggleBusy() {
            this.isBusy = !this.isBusy
        },

        onStore(id){
            
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }else{
                this.tryToSend = true;
                 //init payload

                if (id == null){
                    //insert
                    let payload = {'module_id' : this.module.id};
                    this.patchStore(payload, "access/insertAccess");
                }else{
                    //update
                    let payload = {'id' : this.id, 'module_id' : this.module.id};
                    this.patchStore(payload, "access/updateAccess");
                }

            }
           
        },

        onDelete(){
            let payload = {'id' : this.id};

            this.tryToSend = true;

            this.patchStore(payload, 'access/deleteAccess'); 
        },

        patchStore(payload, patch){
            this.$store.dispatch(patch, {
                    payload: payload,
                })
                .then((response) => {
                    console.log('response.status', response);
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
                    this.$store.dispatch('notification/error', error.message, { root: true });
                    console.log('error in access store', error);
                });

                //for multiple action
                this.$store.dispatch('notification/clear');
        },

        initFormValue(){
            this.idSelected = null;
            this.dataSelected = null;
            this.module = null;
            this.id = null;
        },

        onShowDelete(id){
            this.id = id;
        },

        onShowUpdate(data){
            console.log(data.module);
            this.titleModal = "Ubah Permohonan";
            this.getDataModule().then(() => {
                this.initFormValue();
                this.dataSelected = data;
                this.idSelected = data.id;
                this.module = data.module_id;
                this.id = data.id;
            }).catch((error) => {
                console.log(error);
            });           
        },

        onShowCreate(){
            this.titleModal = "Buat Permohonan";
            this.initFormValue();
            this.getDataModule();
        }
        
    },
    watch: {
            currentPage: {
                handler: function(value) {
                    
                    let start = value * 10;

                    this.start = start - 10;
                    console.log(this.start);

                    this.getData(this.start);

                    //change page
                    this.page = value;
                }
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
                            <h4 class="header-title">Akses Saya</h4>
                        </div>
                        <div class="col-md-6 text-center text-md-right mt-2 mt-md-0">
                            <a href="javascript:void(0);" class="btn btn-sm btn-primary waves-effect waves-light" v-b-modal.modal-form variant="primary" @click="onShowCreate()">
                                <i class="ri-add-line mr-2"></i> Buat Permohonan
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
                        <div class="col-sm-12 col-md-12">
                            <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                                <label class="d-inline-flex align-items-center">
                                    <b-form-input v-model="filter" type="search" v-on:keydown.enter="getData" placeholder="Pencarian..." class="form-control form-control-sm ml-2"></b-form-input>
                                </label>
                                <button type="button" class="btn btn-sm btn-success position-relative" style="top:-1px;" @click="getData"><i class="ri-search-line mr-1 position-relative" style="top:1px"></i> Cari </button>
                            </div>
                        </div>
                        <!-- End search -->
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0">
                        <b-table :items="tableData" primary-key="uniqueId" :key="tableData.name" :fields="fields" responsive="sm" :per-page="0" :busy="isBusy" :current-page="currentPage"  :sort-desc.sync="sortDesc" show-empty>
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
                                    <!-- <li class="list-inline-item">
                                        <b-tooltip target="tooltip-edit">Ubah</b-tooltip>
                                        <a href="javascript:void(0);" class="action-icon px-1" id="tooltip-edit" v-b-modal.modal-form @click="onShowUpdate(item)"> 
                                            <i class="ri-pencil-line"></i>
                                        </a>
                                    </li> -->
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
                                        <label class="control-label">Nama Fitur <span class="text-danger">*</span> </label>
                                        <!-- <b-form-select  v-model="module" :options="moduleOptions" value-field="id" text-field="text" disabled-field="notEnabled" :class="{ 'is-invalid': submitting && $v.module.$error }"></b-form-select> -->
                                        <multiselect v-model="module" :values=id track-by="text" group-values="options" group-label="label" label="text" :options="moduleOptions"></multiselect>
                                        
                                        <div v-if="submitting && $v.module.$error" class="invalid-feedback">
                                            <span v-if="!$v.module.required">Nama Fitur tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                    <!-- <div class="form-group">
                                        <label class="control-label">Nama Fitur <span class="text-danger">*</span> </label>
                                        <vue-select class="vue-select2" name="select2"
                                                :options="options2" :model.sync="result2"
                                                :searchable="true" language="en-US">
                                        </vue-select>
                                    </div> -->
                                    <!-- <div class="form-group">
                                        <label class="control-label">Nama Fitur <span class="text-danger">*</span> </label>
                                        <Select2 v-model="module" :options="moduleOptions"  />
                                    </div> -->
                                    
                                </div>
                                <div class="col-md-12 text-right">
                                    <button type="button" class="btn btn-secondary my-2" @click="$bvModal.hide('modal-form')">Batal</button>
                                    <button type="submit" v-if="!tryToSend" class="btn btn-primary my-2" >Ajukan</button>
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
