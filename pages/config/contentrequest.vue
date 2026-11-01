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
            moduleId : 'contentrequest',
            permissionIndex : false,
            page : null,
            tryToSend : false,
            tryToSendKey : null,
            submitting : false,
            start : 0,
            limit : 10,
            title: "Permohonan Akses",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengaturan Konten",
                },
                {
                    text: "Permohonan Akses",
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
                    label: 'ID Permohonan',
                    key: 'id',
                    sortable: true
                },
                {
                    label: 'Nama Fitur',
                    key: 'module',
                    sortable: true
                },
                {
                    label: 'SKPD Pemohon',
                    key: 'workunitRequest',
                    sortable: true
                },
                {
                    label: 'Izin Akses',
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
            statusTemp : false
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
            this.toggleBusy();
            this.$store.dispatch('access/getAccesList', {
                    start: this.start,
                    limit: this.limit,
                    search : this.filter,
                    type:'provider'
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
                    console.log('error in access request', error);
                });
        },

        toggleBusy() {
            this.isBusy = !this.isBusy
        },

        onStore(id){
            this.submitting = true;
            this.tryToSend = true;       
            this.tryToSendKey = id;       
            let payload = {'id' : id, 'status' : this.statusTemp};
            this.patchStore(payload, "access/updateStatusAccess");
        },

        patchStore(payload, patch){
            this.$store.dispatch(patch, {
                    payload: payload,
                })
                .then((response) => {
                    console.log('response.status', response);
                  if (response.status == "OK"){
                    this.tryToSend = false;
                    this.tryToSendKey = null;
                    this.submitting = false;
                    
                    this.$store.dispatch('notification/success', response.message, { root: true });

                    this.makeToast('success', response.message);
                    this.getData();
                  }else{
                    this.tryToSend = false;
                    this.tryToSendKey = null;
                    this.submitting = false;
                    this.$store.dispatch('notification/error', response.message, { root: true });
                  }
                 
                })
                .catch((error) => {
                    this.tryToSend = false;
                    this.tryToSendKey = null;
                    this.$store.dispatch('notification/error', error.message, { root: true });
                    console.log('error in module store', error);
                });

                //for multiple action
                this.$store.dispatch('notification/clear');
        },

        makeToast(variant = null, message) {
            const h = this.$createElement
            const vNodesMsg = h(
                'p',
                { class: ['text-center', 'mb-0'] },
                [
                    h('strong', message)
                ]
            )
            this.$bvToast.toast( vNodesMsg, {
                noCloseButton: true,
                variant: variant,
                autoHideDelay: 5000,
                solid: true
            })
        },

        // onShowDelete(id){
        //     this.id = id;
        // },

        check(id, e) {
            console.log('idchange', id, e);
            this.statusTemp = "REJECTED"; 

            if (e){
                this.statusTemp = "ALLOWED";
            }

            this.onStore(id);
        },
        
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
                    <b-alert :variant="notification.type" class="mt-3 text-center" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible>{{notification.message}}</b-alert>
                    
                    <!-- <p class="text-muted font-13 mb-4"></p> -->
                    <div class="row mb-md-2">

                        <div class="col-md-6 text-center text-md-left">
                            <h4 class="header-title">Permohonan Akses</h4>
                        </div>

                        <!-- Search -->
                        <div class="col-sm-12 col-md-6">
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
                            <template v-slot:cell(action) = "data">
                                <ul class="list-inline table-action m-0">
                                    <li class="list-inline-item">
                                        <div v-if="tryToSend && tryToSendKey === data.item.id">
                                            <b-spinner small></b-spinner>&nbsp;&nbsp;Mohon tunggu...
                                        </div>
                                        <div v-else>
                                            <b-form-checkbox @change="check(data.item.id, $event)" :checked="data.item.statusId === 'ALLOWED' ? true : false" name="check-button" switch>
                                                <div v-if= "data.item.statusId === 'ALLOWED'">
                                                    <span class="font-weight-normal">Ditolak</span>
                                                </div>
                                                <div v-else>
                                                    <span class="font-weight-normal">Diizinkan</span>
                                                </div>
                                            </b-form-checkbox>  
                                        </div>
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
                    <!-- <b-modal id="delete-modal" ref="modal-form-delete" body-class="p-4" hide-header centered hide-footer size="sm">
                        <div class="text-center">
                            <i class="bx bxs-info-circle h1 text-danger"></i>
                            <h4 class="mt-2">Hapus Data</h4>
                            <p class="mt-3">Ada yakin akan menghapusnya?</p>
                            <button type="button" class="btn btn-secondary my-2" @click="$bvModal.hide('delete-modal')">Batal</button>
                            <button type="button" class="btn btn-danger my-2" @click="onDelete">Ya, Hapus</button>
                        </div>
                    </b-modal> -->
                    <!-- End Delete modal -->

                </div>
            </div>
        </div>
    </div>
</div>
</template>
