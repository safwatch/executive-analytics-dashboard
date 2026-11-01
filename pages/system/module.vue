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
            moduleId : 'sysmodule',
            permissionIndex : false,
            page : null,
            tryToSend : false,
            submitting : false,
            start : 0,
            limit : 10,
            title: "Fitur",
            tempShare : false,
            share : 0,
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengaturan Sistem",
                },
                {
                    text: "Fitur",
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
            workUnitOptions: [],
            workunit:null,
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
                    key: 'name',
                    sortable: true
                },
                {
                    label: 'Fungsi',
                    key: 'task',
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
        id: {
            required
        },
        name: {
            required
        },
        task: {
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
            this.$store.dispatch('module/getModule', {
                    start: this.start,
                    limit: this.limit,
                    search : this.filter,
                    share : '0'
                })
                .then((status) => {
                    if(status){
                        this.toggleBusy();
                        let response = this.$store.state.module.moduleList;
                        for (var i=0; i<response.result.length; i++){
                                this.tableData.push({
                                    name: response.result[i].name, 
                                    task:  response.result[i].task,
                                    id:  response.result[i].id,
                                    workunit : response.result[i].workunit_id,
                                    share : response.result[i].share
                                })
                        }

                        this.totalRows = response.paging.data_total;
                    }
                })
                .catch((error) => {
                    console.log('error in module', error);
                });
        },

        async getDataWorkUnit(){
            // this.workUnitOptions = null;
            this.workUnitOptions= [{ value: null, text: '- Pilih SKPD -' }];
            this.$store.dispatch('workunit/getWorkUnitAll', {
                    start: 0,
                    limit: 300,
                    search:''
                })
                .then((status) => {
                    if (status){
                        let response = this.$store.state.workunit.workunitListAll;
                   
                        for (var i=0; i<response.result.length; i++){
                                this.workUnitOptions.push({
                                    text: response.result[i].name, 
                                    value:  response.result[i].id,
                                })
                        }
                        return this.workUnitOptions;
                    }
                })
                .catch((error) => {
                    console.log('error in get module options', error);
                });
        },

        toggleBusy() {
            this.isBusy = !this.isBusy
        },

        onStore(id){
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.tempShare){
                this.share = 1;
            }

            if (this.$v.$invalid) {
                return;
            }else{
                this.tryToSend = true;
                 //init payload
                let arrTaskVal = [];

                for (let i=0; i< this.task.length; i++){
                    arrTaskVal.push(this.task[i].value);
                }

                let textTask = arrTaskVal.join(',');

                if (id == null){
                    //insert
                    let payload = {'id' : this.id, 'name' : this.name, 'task' : textTask, 'workunit' : this.workunit, 'share': this.share};
                    this.patchStore(payload, "module/insertModule");
                }else{
                    //update
                    let payload = {'id' : this.id, 'name' : this.name, 'task' : textTask, 'workunit' : this.workunit, 'share':this.share, 'id_old' : id};
                    this.patchStore(payload, "module/updateModule");
                }

            }
           
        },

        onDelete(){
            let payload = {'id' : this.id};

            this.tryToSend = true;

            this.patchStore(payload, 'module/deleteModule'); 
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
                    console.log('error in module store', error);
                });

                //for multiple action
                this.$store.dispatch('notification/clear');
        },

        initFormValue(){
            this.idSelected = null;
            this.dataSelected = null;
            this.name = null;
            this.task = null;
            this.id = null;
            this.share = null;
            this.tempShare = false;
            this.workunit = null;
        },

        onShowDelete(id){
            this.id = id;
        },

        async onShowUpdate(data){
            this.getDataWorkUnit().then(() => {
                this.titleModal = "Ubah Fitur";

            console.log('data', data);
            
            if(data.share == 1){
                this.tempShare = true;
            }else{
                this.tempShare = false
            }

            let arrayTask =  data.task.split(',');

            var arrayObjectTask = [];

            for (let i=0; i< arrayTask.length; i++){
                switch(arrayTask[i]) {
                    case "index":
                        arrayObjectTask.push({value: 'index', text: 'Lihat'});
                        break;
                    case "create":
                        arrayObjectTask.push({ value: 'create', text: 'Tambah' });
                        break;
                    case "update":
                        arrayObjectTask.push( {value: 'update', text: 'Ubah' });
                        break;
                    case "delete":
                        arrayObjectTask.push({ value: 'delete', text: 'Hapus' });
                        break;
                    case "print":
                        arrayObjectTask.push({ value: 'print', text: 'Cetak' });
                        break;
                    case "detail":
                        arrayObjectTask.push({ value: 'detail', text: 'Detail' });
                        break;
                    case "import":
                        arrayObjectTask.push({ value: 'import', text: 'Import' });
                        break;
                    case "export":
                        arrayObjectTask.push({ value: 'export', text: 'Export' });
                        break;
                } 
            }

            this.dataSelected = data;
            this.idSelected = data.id;
            this.name = data.name;
            this.workunit = data.workunit;
            this.task = arrayObjectTask;
            this.share = data.share;
            this.id = data.id;

            });
        },

        onShowCreate(){
            this.titleModal = "Tambah Fitur";
            this.initFormValue();
            this.getDataWorkUnit();
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
                            <h4 class="header-title">Fitur</h4>
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
                                        <label class="control-label">ID Fitur <span class="text-danger">*</span></label>
                                        <input type="text" v-model="id" :values=id class="form-control" placeholder="Masukan id" :class="{ 'is-invalid': submitting && $v.id.$error }"/>
                                        <div v-if="submitting && $v.id.$error" class="invalid-feedback">
                                            <span v-if="!$v.id.required">ID tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">Nama Fitur <span class="text-danger">*</span></label>
                                        <input type="text" v-model="name" :values=name class="form-control" placeholder="Masukan nama" :class="{ 'is-invalid': submitting && $v.name.$error }"/>
                                        <div v-if="submitting && $v.name.$error" class="invalid-feedback">
                                            <span v-if="!$v.name.required">Nama modul tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">Fungsi <span class="text-danger">*</span></label>
                                        <multiselect v-model="task" :values=task track-by="text" label="text" :options="taskOptions" :multiple="true" placeholder="Pilih fungsi" :class="{ 'is-invalid': submitting && $v.task.$error }"></multiselect>
                                        <div v-if="submitting && $v.task.$error" class="invalid-feedback">
                                            <span v-if="!$v.name.required">Fungsi tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">SKPD Pemilik</label>
                                        <b-form-select  v-model="workunit" :options="workUnitOptions" value-field="value" text-field="text" disabled-field="notEnabled" ></b-form-select>
                                        <!-- <multiselect v-model="workunit" :values=task track-by="text" label="text" :options="workUnitOptions"  placeholder="Pilih perangkat daerah pemilik" :class="{ 'is-invalid': submitting && $v.task.$error }"></multiselect> -->
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label">Berbagi Pakai</label>
                                        <b-form-checkbox v-model="tempShare" name="check-button" switch>
                                            <span class="font-weight-normal">Dapat digunakan oleh SKPD lain</span>
                                        </b-form-checkbox>   
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
