<script>
import vue2Dropzone from 'vue2-dropzone'
import VueExcelExport from 'vue-excel-export';
import {required } from "vuelidate/lib/validators";
import Axios from 'axios';
import { userService } from '/helpers/auth/user.service';

/**
 * File Uploads component
 */
export default {
    components: {
        vueDropzone: vue2Dropzone
    },
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
        }
    },
    data() {
        return {
            title: 'Import Data',
            items: [{
                    text: 'Sampeu',
                    href: '/',
                },
                {
                    text: 'Kemiskinan',
                    href: '/',
                },
                {
                    text: 'Import Data',
                    active: true,
                },
            ],
            dropzoneOptions: {
                url: 'http://localhost:8080/satudata/uploadFile',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                autoProcessQueue: false,
                headers: {
                    'My-Awesome-Header': 'header value'
                },
                previewTemplate: this.template(),
                maxFiles:1,
            },
            filecsv: null,
            file: null,
            sendSuccess: false,
            csvfile: {},
            destination: null,
            schema: null,
            table: null,
            tipeOperasi: null,
            load: false
        }
    },
    validations: {
		file: {
			required
		},
		destination: {
			required
		},
		schema: {
			required
		},
		table: {
			required
		},
		tipeOperasi: {
			required
		},
	},
    methods: {
        template: function () {
            return ` <div class="dropzone-previews mt-3">
            <div class="card mt-1 mb-0 shadow-none border">
                <div class="p-2">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <i class="h1 ri-file-3-fill"></i>
                        </div>
                        <div class="col pl-0">
                            <a href="javascript:void(0);" class="text-muted font-weight-bold" data-dz-name></a>
                            <p class="mb-0" data-dz-size></p>
                        </div>
                        <div class="col-auto">
                            <!-- Button -->
                            <a href="" class="btn btn-link btn-lg text-muted" data-dz-remove>
                                <i class="fe-x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        },
        afterUploadComplete: async function (response) {
        if (response.status == "success") {
            console.log("upload successful");
            this.sendSuccess = true;
        } else {
            console.log("upload failed");
        }
        },
        shootFile: async function () {
            this.$refs.myVueDropzone.processQueue();
        },
        // sendFile: async function (files, xhr, formData) {
        // formData.append("email", this.email);
        // formData.append("message", this.message);
        // formData.append("recipient", this.recipient);
        // },
        clearForm() {
            this.destination = null
            this.schema = null
            this.table = null
            this.tipeOperasi = null
            this.file = null
            this.$refs.filecsv.value = null
        },
        uploadFile() {
                this.load = true;
                if (this.destination == null || this.schema == null || this.table == null || this.tipeOperasi == null || this.file == null) {
                    this.load = false
                    this.makeToast('danger', 'Semua form harus diisi');
                } else {
                    // console.log(this.file);
                    // let payload = {
                    //     // headers: {
                    //     //     'Content-type' : 'multipart/form-data'
                    //     // },
                    //     'destination' :  this.destination,
                    //     'schema' :  this.schema,
                    //     'table' :  this.table,
                    //     'type' :  this.tipeOperasi,
                    //     'file' :  this.file
                    // }

                    // this.patchStore(payload, "config/importCSV");

                    let credential = userService.getCredentialApi();
                    let userToken = userService.getToken();
                    const fd = new FormData();
                    fd.append("destination", this.destination);
                    fd.append("schema", this.schema);
                    fd.append("table", this.table);
                    fd.append("type", this.tipeOperasi);
                    fd.append("file", this.file);
                    fd.append("client_id", credential.api.client_id);
                    fd.append("client_secret", credential.api.client_secret);
                    fd.append("token", userToken);


                    const res = Axios.post('/api/datastore/create', fd, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            "Access-Control-Allow-Origin" : ""
                        },
                    })
                    .then((res) => {
                        this.load = false;
                        if (res.data.status == 'ERROR') {
                            this.makeToast('danger', res.data.message);
                        } else if(res.data.status == 'OK') {
                            this.clearForm();
                            this.makeToast('success', res.data.message);
                        } else {
                            this.clearForm();
                            this.makeToast('danger', 'Periksa endpoint import');
                        }
                    }).catch((error) => {
                        this.load = false;
                        this.makeToast('danger : ', error.message);
                    }).finally(() => {
                        
                    });
                }
        },
        patchStore(payload, patch){
            this.$store.dispatch(patch, {
                payload: payload,
            })
            .then((response) => {
                if (response.status == "OK"){
                    this.load = false;
                    this.tryToSend = false;
                    this.submitting = false;
                    this.makeToast('success', response.message);

                }else{
                    this.load = false;
                    this.tryToSend = false;
                    this.submitting = false;
                    this.makeToast('danger', response.message);
                }
                
            })
            .catch((error) => {
                this.tryToSend = false;
                this.submitting = false;
                // this.makeToast('danger', error.message);
                console.log('error in import data', error);
            });
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
        async sendFile () {
            this.file = this.$refs.filecsv.files[0];
            
            if (this.file != undefined) {
                const reader = new FileReader();
                reader.readAsText(this.file);
                reader.onload = () => {
                    console.log(reader.result); // contains the file content as a string
                };
                reader.onerror = () => {
                    console.log(reader.error);
                };
                const formData = new FormData();
                formData.append('file', this.file);
    
                this.csv = this.file;
            }
		},
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();

            reader.onload = (e) => {
                this.csv = e.target.result;
            };
            reader.readAsDataURL(file);
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
                    <h4 class="header-title m-t-0">Import Data </h4>
                    <p class="text-muted font-13 m-b-30"><span class="text-muted font-13">(Tolong pastikan bahwa file yang diupload sudah sesuai dengan <b>format</b> yang sesuai dan sudah cleansing data.)</span></p>
                    <!-- file upload -->
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="import-fileinput">File CSV <span class="text-danger">*</span></label>
                        <div class="col-sm-10">
                            <input type="file" id="file" name="file" accept=".csv" ref="filecsv" multiple @change="sendFile($event)" class="form-control form-import"/>
                        </div>
                    </div>
                    <!-- <vue-dropzone id="dropzone" ref="myVueDropzone" :use-custom-slot="true" :options="dropzoneOptions" @vdropzone-complete="afterUploadComplete"
                        @vdropzone-sending-multiple="sendFile" >
                        <div class="dz-message needsclick">
                            <i class="h1 text-muted ri-upload-cloud-2-line"></i>
                            <h3>Drop file atau Klik disini untuk pilih file.</h3>
                            <span class="text-muted font-13">(Tolong pastikan bahwa file yang diupload sudah sesuai dengan <b>format</b> yang sesuai dan sudah cleansing data.)</span>
                        </div>
                    </vue-dropzone> -->
                    <b-form-group id="satudata text" label-cols-sm="2" label-cols-lg="2" label="Destinasi / Tujuan *" label-for="text" class="mt-3">
                        <b-form-input for="text" v-model="destination" value="" placeholder="satudata"></b-form-input>
                    </b-form-group>
                    <b-form-group id="schema text" label-cols-sm="2" label-cols-lg="2" label="Skema *" label-for="text" class="mt-3">
                        <b-form-input for="text" v-model="schema" value="" placeholder="dskc"></b-form-input>
                    </b-form-group>
                    <b-form-group id="table text" label-cols-sm="2" label-cols-lg="2" label="Tabel *" label-for="text" class="mt-3">
                        <b-form-input for="text" v-model="table" value="" placeholder="isi dengan nama tabel"></b-form-input>
                        <div v-if="$v.table.$error" class="invalid-feedback">
                            <span v-if="!$v.table.required">Tabel tidak boleh kosong !</span>
                        </div>
                    </b-form-group>

                    <!-- <div class="form-group row">
                        <label class="col-md-2 col-form-label">Skema</label>
                        <div class="col-md-10">
                            <select class="custom-select" v-model="schema">
                                <option selected>dskc</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-2 col-form-label">Tabel</label>
                        <div class="col-md-10">
                            <select class="custom-select" v-model="table">
                                <option selected>jumlah_disabilitas_di_kota_civic</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div> -->

                    <div class="form-group row">
                        <label class="col-md-2 col-form-label">Tipe Operasi <span class="text-danger">*</span></label>
                        <div class="col-md-10 col-form-label">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="tipeOperasi" name="inlineRadioOptions" id="inlineRadio1" value="append">
                                <label class="form-check-label" for="inlineRadio1">Tambah Data</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="tipeOperasi" name="inlineRadioOptions" id="inlineRadio2" value="replace">
                                <label class="form-check-label" for="inlineRadio2">Ganti Semua Data</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group d-block" v-if="!load">
                        <!-- <div class="fileupload btn btn-success waves-effect waves-light mb-3 float-right"> -->
                            <!-- <span>
                                <i class="mdi mdi-cloud-upload mr-1"></i> Upload Files
                            </span>
                            <form>
                                <input type="file" class="upload" @click="uploadFile($event)" />
                            </form> -->
                            <button class="fileupload btn btn-success mb-3 float-right" @click="uploadFile($event)">Upload File</button>
                        <!-- </div> -->
                    </div>
                    <div class="form-group f-block" v-else>
                        <button class="btn btn-success mb-3 float-right">Loading...</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
