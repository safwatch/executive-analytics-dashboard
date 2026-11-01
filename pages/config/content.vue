<script>
import {required} from "vuelidate/lib/validators";
/**
 * System level page
 */
export default {
    head() {
        return {
            title: `${this.title} Pengaturan Konten - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    mounted(){
        this.checkAuth().then((response) =>{
            if (response.status == 'ERROR'){
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            }
            this.getData();
        });
    },
    data() {
        return {
            moduleId : 'config',
            permissionIndex : false,
            tryToSend : false,
            submitting : false,
            fitures : null,
            title: "Konten Utama",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengaturan Konten",
                },
                {
                    text: "Konten Utama",
                    active: true,
                },
            ],
            moduleOptions: [
                { item: null, name: '- Pilih Fitur -' },
            ],
        }
    },
    validations: {
        fitures : {
            required
        },
    },
    methods:{
        async checkAuth(){
                return this.$userCheckAuth.checkAuth(this.moduleId);   
            },

        getData(){
            this.getDataMenu().then(() =>{
                this.getCurentFiture();
            })
        },

        async getDataMenu(){
            this.$store.dispatch('menu/getMenu', {
                    start: 0,
                    limit: 1000,
                    search: '',
                    isFeature: '1'
                })
                .then(() => {
                   let response = this.$store.state.menu.menuList;
                   
                   for (var i=0; i<response.result.length; i++){

                        if (response.result[i].module.id != null && response.result[i].module.id != 'dashboard'){
                            this.moduleOptions.push({
                                item: response.result[i].url, 
                                name: response.result[i].name,
                            });
                        }

                   }
                })
                .catch((error) => {
                    console.log('error in get data menu', error);
                });
        },

        async getCurentFiture(){
            this.$store.dispatch('config/getMainConfig', {
                    id: "MAIN_CONTENT"
                })
                .then(() => {
                   let response = this.$store.state.config.mainPageConfig;

                   this.fitures = response.result.value;
                })
                .catch((error) => {
                    console.log('error in get data curent fiture', error);
                });
        },

        onStore(){
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }else{
                this.tryToSend = true;
    
                let payload = {'id':'MAIN_CONTENT','value': this.fitures};
                this.patchStore(payload, "config/updateMainConfig");
            }
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

        async patchStore(payload, patch){
            await this.$store.dispatch(patch, {
                    payload: payload,
                })
                .then((response) => {
                  if (response.status == "OK"){
                    this.tryToSend = false;
                    this.submitting = false;

                    this.makeToast('success', response.message);

                  }else{
                    this.tryToSend = false;
                    this.submitting = false;

                    this.makeToast('danger', response.message);
                  }
                   
                })
                .catch((error) => {
                    this.tryToSend = false;
                    this.submitting = false;
                    this.makeToast('danger', error.message);
                    console.log('error in module menu', error);
                });
        },
    },
    middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <div class="row d-flex align-items-center">
                        <div class="col-md-12 text-center text-md-left">
                            <h4 class="header-title">Konten Utama</h4>
                        </div>
                    </div>

                    <p class="text-muted">Silahkan pilih fitur mana yang akan dijadikan sebagai konten utama (akan tampil pada saat login).</p>
                    
                    <form @submit.prevent="onStore()">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label class="control-label">Fitur <span class="text-danger">*</span></label>
                                    <b-form-select v-model="fitures" :options="moduleOptions" value-field="item" text-field="name" placeholder="- Pilih Fitur -" :class="{ 'is-invalid': submitting && $v.fitures.$error }"></b-form-select>
                                    <div v-if="submitting && $v.fitures.$error" class="invalid-feedback">
                                        <span v-if="!$v.fitures.required">Konten utama tidak boleh kosong !</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label class="control-label">&nbsp;</label>
                                <button type="submit" v-if="!tryToSend" class="btn btn-primary" style="margin-top: 30px;">Simpan</button>
                                    <b-button v-if="tryToSend" variant="primary" disabled class="btn btn-primary my-2">
                                    <b-spinner small></b-spinner>&nbsp;&nbsp;Mohon tunggu...
                                </b-button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
