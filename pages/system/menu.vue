<script>

import Multiselect from 'vue-multiselect'
import {required, numeric} from "vuelidate/lib/validators";

/**
 * System menu page
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
            moduleId : 'sysmenu',
            permissionIndex : false,
            page : null,
            tryToSend : false,
            submitting : false,
            start : 0,
            limit : 10,
            title: "Menu",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengaturan Sistem",
                },
                {
                    text: "Menu",
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
                    label: 'Menu',
                    key: 'name',
                    sortable: true
                },
                {
                    label: 'Fitur',
                    key: 'module',
                    sortable: true
                },
                {
                    label: 'Alamat URL',
                    key: 'url',
                    sortable: true
                },
                {
                    label: 'Induk',
                    key: 'parent',
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
            module : null,
            url : null,
            icon : null,
            level : null,
            position : null,
            parent : null,
            dataSelected : null,
            idSelected : null,
            titleModal :null,
            tag :null,
            moduleOptions: [],
            parentOptions: [],
            parentDisable:true,
            levelOptions: [
                { item: null, name: '- Pilih Tingkat -' },
                { item: '1', name: 'Tingkat ke-1' },
                { item: '2', name: 'Tingkat ke-2' },
                { item: '3', name: 'Tingkat ke-3' },
            ],
            value1:null,
        };
    },
    validations: {
        name : {
            required
        },
       
        level : {
            required
        },
        url : {
            required
        },
        position : {
            required,
            numeric
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
            return this.$store && this.$store.state.notification ? 2 : 0;
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
            this.$store.dispatch('menu/getMenu', {
                    start: this.start,
                    limit: this.limit,
                    search : this.filter,
                    isFeature : '0'
                })
                .then((status) => {
                    if (status){
                        this.toggleBusy();
                        let response = this.$store.state.menu.menuList;
                        
                        for (var i=0; i<response.result.length; i++){
                                this.tableData.push({
                                    id : response.result[i].id,
                                    name: response.result[i].name,
                                    module: response.result[i].module.name,
                                    module_id: response.result[i].module.id,
                                    url: response.result[i].url,
                                    parent: response.result[i].parent.name,
                                    parent_id: response.result[i].parent.id,
                                    position : response.result[i].position,
                                    level : response.result[i].level,
                                    icon : response.result[i].icon,
                                    tag : response.result[i].tag
                                });
                        }

                        this.totalRows = response.paging.data_total;
                    }   
                })
                .catch((error) => {
                    console.log('error in menu', error);
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
                if (id == null){
                    //insert
                    let payload = {'name': this.name, 'module_id':this.module, 'url' : this.url, 'icon': this.icon, 'level':this.level, 'position': this.position, 'parent_id': this.parent, 'tag' : this.tag};
                    console.log('payload', payload);
                    this.patchStore(payload, "menu/insertMenu");
                }else{
                    //update
                    console.log('module', this.module);
                    let payload = {'id':this.idSelected,'name': this.name, 'module_id':this.module, 'url' : this.url, 'icon': this.icon, 'level':this.level, 'position': this.position, 'parent_id': this.parent, 'tag' : this.tag};
                    this.patchStore(payload, "menu/updateMenu");
                }
            }
        },

        onDelete(){
            let payload = {'id' : this.id};

            this.tryToSend = true;

            this.patchStore(payload, 'menu/deleteMenu'); 
        },

        async patchStore(payload, patch){
            await this.$store.dispatch(patch, {
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
                    this.submitting = false;
                    this.$refs['modal-form-delete'].hide();
                    this.$refs['modal-form-store'].hide();
                    this.$store.dispatch('notification/error', error.message);
                    console.log('error in module menu', error);
                });

                // //for multiple action
                // this.$store.dispatch('notification/clear');
        },

        initFormValue(){
            this.id = null;
            this.name = null;
            this.module = null;
            this.url = null;
            this.icon = null;
            this.level = null;
            this.position = null;
            this.parent = null;
            this.dataSelected = null;
            this.idSelected = null;
            this.tag = null;
        },

        onShowDelete(id){
            this.id = id;
        },

        async onShowUpdate(data){
            this.getDataModule().then(() => {
            
                this.titleModal = "Ubah Menu";

                this.idSelected = data.id;
                this.name = data.name;
                this.module = data.module_id;
                this.url = data.url;
                this.icon = data.icon;
                this.tag = data.tag;
                this.getDataParent().then(() => {
                    this.parent = data.parent_id;
                    this.position = data.position;
                    this.level = data.level; 
                    if (data.level == null || data.level == 1 ){
                        this.parentDisable = true;
                    }else{
                        this.parentDisable = false
                    }                 
                    this.$bvModal.show('modal-form');
                });
            });
        },

        onShowCreate(){
            this.titleModal = "Tambah Menu";
            this.initFormValue();
            this.parentDisable = true;
            this.getDataModule();
            this.getDataParent();
            this.getDataPosition();
            
        },

        async getDataModule(){
            this.moduleOptions= [{ item: null, name: '- Pilih Fitur -' },];
            this.$store.dispatch('module/getModule', {
                    start: 0,
                    limit: 100,
                    search:'',
                    share : '0'

                })
                .then((status) => {
                    if(status){
                        let response = this.$store.state.module.moduleList;
                    
                        for (var i=0; i<response.result.length; i++){
                                this.moduleOptions.push({
                                    name: response.result[i].name, 
                                    item:  response.result[i].id,
                                })
                        }
                        return this.moduleOptions;
                    }
                })
                .catch((error) => {
                    console.log('error in group', error);
                });
        },

        async getDataParent(){

            this.parentOptions= [{ item: null, name: '- Pilih Induk -' },];

            this.$store.dispatch('menu/getMenuAll', {
                    start: 0,
                    limit: 1000,
                })
                .then((status) => {
                    if(status){
                        let response = this.$store.state.menu.menuListAll;

                        for (var i=0; i<response.result.length; i++){
                            this.parentOptions.push({
                                name: response.result[i].name, 
                                item:  response.result[i].id,
                            })
                        }
                    }
                })
                .catch((error) => {
                    console.log('error in group', error);
                });
        },

        async getDataPosition(){

            this.$store.dispatch('menu/getMenuLastPostion', {
                })
                .then((response) => {
                    // console.log('response get data position ', response.result);
                    if(response.result != null){
                        this.position = response.result.position + 1;
                    }
                })
                .catch((error) => {
                    console.log('error in getDataPosition', error);
                });
        },

        onChangeLevel (value) {
            if (value == null || value == 1 ){
                this.parentDisable = true;
                this.parent = null;
            }else {
                this.parentDisable = false;
                let response = this.$store.state.menu.menuListAll;
                this.parentOptions = [];
                this.parentOptions= [{ item: null, name: 'Pilih Parent' },];
                
                if (value == 2){
                    for (var i=0; i<response.result.length; i++){
                        if (response.result[i].level == 1){
                            this.parentOptions.push({
                                name: response.result[i].name, 
                                item:  response.result[i].id,
                            })
                        }
                    }
                }else{
                    for (var i=0; i<response.result.length; i++){
                        if (response.result[i].level == 2){
                            this.parentOptions.push({
                                name: response.result[i].name, 
                                item:  response.result[i].id,
                            })
                        }
                    }
                }                
            }
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
                },
                
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
                            <h4 class="header-title">Menu</h4>
                        </div>
                        <div class="col-md-6 text-center text-md-right mt-2 mt-md-0">
                            <a href="#" class="btn btn-sm btn-primary waves-effect waves-light" v-b-modal.modal-form variant="primary" @click="onShowCreate()">
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
                        <!-- <b-table :items="tableData" primary-key="uniqueId" :key="tableData.name" :fields="fields" responsive="sm" :per-page="0" :busy="isBusy" :current-page="currentPage"  :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="changeFilter" show-empty> -->
                        <b-table :items="tableData" primary-key="uniqueId" :key="tableData.name" :fields="fields" responsive="sm" :per-page="0" :busy="isBusy" :current-page="currentPage"  :sort-desc.sync="sortDesc"  show-empty>
                            <template #empty="scope">
                                <div class="text-center my-2">{{ scope.emptyText }}</div>
                            </template>
                            <template #table-busy>
                                <div class="text-center my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>Loading...</strong>
                                </div>
                            </template>
                            <template v-slot:cell(parent)="item">
                                <div v-if="item.item.parent === null ">-</div>
                                <div v-else>{{item.item.parent}}</div>
                            </template>
                            <template v-slot:cell(number)="uniqueId">
                                <b> {{ (page * 10) - ( 10 - (uniqueId.index + 1))}}</b>
                            </template>
                            <template v-slot:cell(action) = "{ item }">
                                <ul class="list-inline table-action m-0">
                                    <li class="list-inline-item">
                                        <b-tooltip target="tooltip-edit">Ubah</b-tooltip>
                                        <!-- <a href="javascript:void(0);" class="action-icon px-1" id="tooltip-edit" v-b-modal.modal-form @click="onShowUpdate(item)">  -->
                                        <a href="javascript:void(0);" class="action-icon px-1" id="tooltip-edit" @click="onShowUpdate(item)"> 
                                            <i class="ri-pencil-line"></i>
                                        </a>
                                    </li>
                                    <li class="list-inline-item">
                                        <b-tooltip target="tooltip-delete">Hapus</b-tooltip>
                                        <a href="javascript:void(0);" class="action-icon px-1 text-danger" id="tooltip-delete" v-b-modal.delete-modal @click="onShowDelete(item.id)" > 
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
                    <b-modal id="delete-modal"  ref="modal-form-delete" body-class="p-4" hide-header centered hide-footer size="sm">
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
                    <b-modal id="modal-form" ref="modal-form-store" :title=titleModal hide-footer size="lg" title-class="font-18">
                        <form @submit.prevent="onStore(idSelected)">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Nama Menu<span class="text-danger">*</span></label>
                                        <input type="text" v-model="name" class="form-control" placeholder="Masukan Nama Menu" :class="{ 'is-invalid': submitting && $v.name.$error }"/>
                                        <div v-if="submitting && $v.name.$error" class="invalid-feedback">
                                            <span v-if="!$v.name.required">Nama menu tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Nama Fitur</label>
                                        <b-form-select  v-model="module" :options="moduleOptions" value-field="item" text-field="name" disabled-field="notEnabled" ></b-form-select>
                                     </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Alamat URL</label>
                                        <input type="text" v-model="url" class="form-control" placeholder="Contoh : /alamat-url" :class="{ 'is-invalid': submitting && $v.url.$error }"/>
                                        <small class="text-muted">Untuk menu dengan link kosong diisi: javascript:void(0)</small>
                                        <div v-if="submitting && $v.url.$error" class="invalid-feedback">
                                            <span v-if="!$v.url.required">URL tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Ikon</label>
                                        <input type="text" v-model="icon" class="form-control" placeholder="Contoh : ri-home-line" />
                                        <small class="text-muted">Lihat kode class icon pada link berikut: <a href="https://remixicon.com/" target="blank">https://remixicon.com/</a></small>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label">Tingkatan Menu<span class="text-danger">*</span></label>
                                        <b-form-select  @change="onChangeLevel($event)" v-model="level" :options="levelOptions" class="mb-3" value-field="item" text-field="name" disabled-field="notEnabled" :class="{ 'is-invalid': submitting && $v.level.$error }"></b-form-select>
                                        <div v-if="submitting && $v.level.$error" class="invalid-feedback">
                                            <span v-if="!$v.level.required">Tingkatan menu tidak boleh kosong !</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label">Urutan<span class="text-danger">*</span></label>
                                        <input type="text" v-model="position" class="form-control" placeholder="Masukan posisi" :class="{ 'is-invalid': submitting && $v.position.$error }"/>
                                        <div v-if="submitting && $v.position.$error" class="invalid-feedback">
                                            <span v-if="!$v.position.required">Posisi tidak boleh kosong !</span>
                                            <span v-if="!$v.position.numeric">Posisi harus angka !</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Menu Induk</label>
                                        <b-form-select  v-model="parent" :disabled="parentDisable" :options="parentOptions" class="mb-3" value-field="item" text-field="name" disabled-field="notEnabled"></b-form-select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Tag (Kata Kunci Pencarian)</label>
                                        <input type="text" v-model="tag" class="form-control" placeholder="Contoh : kemiskinan, kesehatan" />
                                        <small class="text-muted">Disipahkan menggunakan koma (,)</small>
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
