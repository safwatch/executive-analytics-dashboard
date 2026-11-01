<script>

import Multiselect from 'vue-multiselect'
import { required } from "vuelidate/lib/validators";
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
            moduleId: 'workunit',
            permissionIndex: false,
            page: null,
            tryToSend: false,
            submitting: false,
            start: 0,
            limit: 10,
            title: "Perangkat Daerah",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Master",
                },
                {
                    text: "Perangkat Daerah",
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
                    label: 'ID Perangkat Daerah',
                    key: 'id',
                    sortable: true
                },
                {
                    label: 'Nama Perangkat Daerah',
                    key: 'name',
                    sortable: true
                },
                {
                    label: 'Aksi',
                    key: 'action',
                    sortable: false
                },
            ],
            id: null,
            name: null,
            dataSelected: null,
            idSelected: null,
            titleModal: null,
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
        this.checkAuth().then((status) => {
            if (status == 500) {
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            } else {
                this.$store.dispatch('notification/clear');
                this.fetchData();
                // this.getData(0);
                this.page = 1;
            }

        });
    },
    methods: {
        async checkAuth() {
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        fetchData() {
            this.isBusy = true; // Set loading state
            this.$store.dispatch('workunit/getWorkUnit', {
                start: this.start,
                limit: this.limit,
                search: this.filter
            })
                .then(() => {
                    // After fetching data, update the table data
                    this.updateTableData();
                })
                .catch((error) => {
                    console.error('Error fetching work units:', error);
                })
                .finally(() => {
                    this.isBusy = false; // Reset loading state
                });
        },
        updateTableData() {
            const response = this.$store.state.workunit.workunitList;
            this.tableData = response.result.map(item => ({
                id: item.id,
                name: item.name,
            }));
            this.totalRows = response.paging.data_total; // Update total rows
        },
        getData() {
            this.tableData = [];
            this.toggleBusy();
            this.$store.dispatch('workunit/getWorkUnit', {
                start: this.start,
                limit: this.limit,
                search: this.filter
            })
                .then((status) => {
                    if (status) {
                        this.toggleBusy();
                        let response = this.$store.state.workunit.workunitList;
                        for (var i = 0; i < response.result.length; i++) {
                            this.tableData.push({
                                id: response.result[i].id,
                                name: response.result[i].name,
                            })
                        }

                        this.totalRows = response.paging.data_total;
                    }
                })
                .catch((error) => {
                    console.log('error in module', error);
                });
            console.log('table data : ', this.$store.state.workunit.workunitList);
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

        onStore(id) {
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            } else {
                this.tryToSend = true;

                if (id == null) {
                    //insert
                    let payload = { 'id': this.id, 'name': this.name };
                    this.patchStore(payload, "workunit/insertWorkUnit");
                } else {
                    //update
                    let payload = { 'id': this.id, 'name': this.name, 'id_old': id };
                    this.patchStore(payload, "workunit/updateWorkUnit");
                }

            }

        },

        onDelete() {
            let payload = { 'id': this.id };

            this.tryToSend = true;

            this.patchStore(payload, 'workunit/deleteWorkUnit');
        },

        // patchStore(payload, patch) {
        //     this.$store.dispatch(patch, {
        //         payload: payload,
        //     })
        //         .then((response) => {
        //             console.log('response.status', response);
        //             if (response.status == "OK") {
        //                 this.tryToSend = false;
        //                 this.submitting = false;
        //                 this.$refs['modal-form-delete'].hide();
        //                 this.$refs['modal-form-store'].hide();

        //                 this.$store.dispatch('notification/success', response.message, { root: true });

        //                 this.getData();
        //             } else {
        //                 this.tryToSend = false;
        //                 this.submitting = false;
        //                 this.$refs['modal-form-delete'].hide();
        //                 this.$refs['modal-form-store'].hide();
        //                 this.$store.dispatch('notification/error', response.message, { root: true });
        //             }

        //             this.initFormValue();

        //         })
        //         .catch((error) => {
        //             this.tryToSend = false;
        //             this.$refs['modal-form-delete'].hide();
        //             this.$refs['modal-form-store'].hide();
        //             this.$store.dispatch('notification/error', error.message, { root: true });
        //             console.log('error in module store', error);
        //         });

        //     //for multiple action
        //     this.$store.dispatch('notification/clear');
        // },

        async patchStore(payload, patch) {
            try {
                const response = await this.$store.dispatch(patch, { payload });

                if (response.status == "OK") {
                    this.tryToSend = false;
                    this.submitting = false;
                    this.$refs['modal-form-delete'].hide();
                    this.$refs['modal-form-store'].hide();
                    this.$store.dispatch('notification/success', response.message, { root: true });

                    await this.fetchData(); // Fetch updated data after save
                } else {
                    this.handleError(response);
                }

                this.initFormValue();
            } catch (error) {
                this.handleError(error);
            }

            // Clear notifications
            this.$store.dispatch('notification/clear');
        },

        initFormValue() {
            this.idSelected = null;
            this.dataSelected = null;
            this.name = null;
            this.id = null;
        },

        onShowDelete(id) {
            this.id = id;
        },

        onShowUpdate(data) {
            this.titleModal = "Ubah Perangkat Daerah";

            console.log('data', data);

            this.dataSelected = data;
            this.idSelected = data.id;
            this.name = data.name;
            this.id = data.id;
        },

        onShowCreate() {
            this.titleModal = "Tambah Perangkat Daerah";
            this.initFormValue();
        }

    },
    watch: {
        currentPage: {
            handler(value) {
                this.start = (value - 1) * this.limit; // Calculate the start index
                this.fetchData(); // Fetch data based on new page
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
                                <h4 class="header-title">Perangkat Daerah</h4>
                            </div>
                            <div class="col-md-6 text-center text-md-right mt-2 mt-md-0">
                                <a href="javascript:void(0);" class="btn btn-sm btn-primary waves-effect waves-light"
                                    v-b-modal.modal-form variant="primary" @click="onShowCreate()">
                                    <i class="ri-add-line mr-2"></i> Tambah
                                </a>
                            </div>
                        </div>

                        <b-alert :variant="notification.type" class="mt-3 text-center" v-if="notification.message"
                            :show="notificationAutoCloseDuration" dismissible>{{ notification.message }}</b-alert>

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
                                        <b-form-input v-model="filter" type="search" v-on:keydown.enter="fetchData"
                                            placeholder="Pencarian..."
                                            class="form-control form-control-sm ml-2"></b-form-input>
                                    </label>
                                    <button type="button" class="btn btn-sm btn-success position-relative"
                                        style="top:-1px;" @click="fetchData"><i
                                            class="ri-search-line mr-1 position-relative" style="top:1px"></i> Cari
                                    </button>
                                </div>
                            </div>
                            <!-- End search -->
                        </div>
                        <!-- Table -->
                        <div class="table-responsive mb-0">
                            <b-table :items="tableData" primary-key="uniqueId" :key="tableData.name" :fields="fields"
                                responsive="sm" :per-page="0" :busy="isBusy" :current-page="currentPage"
                                :sort-desc.sync="sortDesc" show-empty>
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
                                    <!-- Updated formula for number calculation -->
                                    <b> {{ (currentPage - 1) * perPage + (uniqueId.index + 1) }}</b>
                                </template>
                                <template v-slot:cell(action)="{ item }">
                                    <ul class="list-inline table-action m-0">
                                        <li class="list-inline-item">
                                            <b-tooltip target="tooltip-edit">Ubah</b-tooltip>
                                            <a href="javascript:void(0);" class="action-icon px-1" id="tooltip-edit"
                                                v-b-modal.modal-form @click="onShowUpdate(item)">
                                                <i class="ri-pencil-line"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <b-tooltip target="tooltip-delete">Hapus</b-tooltip>
                                            <a href="javascript:void(0);" class="action-icon px-1 text-danger"
                                                id="tooltip-delete" v-b-modal.delete-modal
                                                @click="onShowDelete(item.id)">
                                                <i class="ri-delete-bin-line"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </template>
                            </b-table>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div
                                    class="dataTables_paginate paging_simple_numbers d-flex justify-content-center float-md-right">
                                    <ul class="pagination pagination-rounded d-flex mb-0">
                                        <!-- pagination -->
                                        <b-pagination v-model="currentPage" :total-rows="rows"
                                            :per-page="perPage"></b-pagination>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- End Table -->

                        <!-- Delete Modal -->
                        <b-modal id="delete-modal" ref="modal-form-delete" body-class="p-4" hide-header centered
                            hide-footer size="sm">
                            <div class="text-center">
                                <i class="bx bxs-info-circle h1 text-danger"></i>
                                <h4 class="mt-2">Hapus Data</h4>
                                <p class="mt-3">Ada yakin akan menghapusnya?</p>
                                <button type="button" class="btn btn-secondary my-2"
                                    @click="$bvModal.hide('delete-modal')">Batal</button>
                                <button type="button" class="btn btn-danger my-2" @click="onDelete">Ya, Hapus</button>
                            </div>
                        </b-modal>
                        <!-- End Delete modal -->

                        <!-- Form Modal -->
                        <b-modal id="modal-form" ref="modal-form-store" :title=titleModal hide-footer
                            title-class="font-18">
                            <form action="#" @submit.prevent="onStore(idSelected)">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">ID Perangkat Daerah <span
                                                    class="text-danger">*</span></label>
                                            <input type="text" v-model="id" :values=id class="form-control"
                                                placeholder="Masukan id"
                                                :class="{ 'is-invalid': submitting && $v.id.$error }" />
                                            <div v-if="submitting && $v.id.$error" class="invalid-feedback">
                                                <span v-if="!$v.id.required">ID tidak boleh kosong !</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label">Nama Perangkat Daerah <span
                                                    class="text-danger">*</span></label>
                                            <input type="text" v-model="name" :values=name class="form-control"
                                                placeholder="Masukan nama"
                                                :class="{ 'is-invalid': submitting && $v.name.$error }" />
                                            <div v-if="submitting && $v.name.$error" class="invalid-feedback">
                                                <span v-if="!$v.name.required">Nama modul tidak boleh kosong !</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-secondary my-2"
                                            @click="$bvModal.hide('modal-form')">Batal</button>
                                        <button type="submit" v-if="!tryToSend"
                                            class="btn btn-primary my-2">Simpan</button>
                                        <b-button v-if="tryToSend" variant="primary" disabled
                                            class="btn btn-primary my-2">
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
