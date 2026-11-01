<script>
import {required, sameAs} from "vuelidate/lib/validators";
/**
 * System level page
 */
export default {
    head() {
        return {
            title: `${this.title} Pengguna - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    data() {
        return {
            tryToSend: false,
            submitting: false,
            current_password: null,
            new_password: null,
            confirm_password: null,
            title: "Pengaturan",
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengguna",
                },
                {
                    text: "Pengaturan",
                    active: true,
                },
            ]
        }
    },
    validations: {
        current_password : {
            required
        },
        new_password : {
            required
        },
        confirm_password : {
            required,
            sameAsPassword: sameAs('new_password')
        },
    },
    methods:{
        onStore(){
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }else{
                this.tryToSend = true;
    
                let payload = {'current_password':this.current_password, 'new_password':this.new_password, 'confirm_password':this.confirm_password};
                this.patchStore(payload, "authstate/changePassword");
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
                    console.log('response.status', response);
                  if (response.status == "OK"){
                    this.tryToSend = false;
                    this.submitting = false;

                    this.makeToast('success', response.message);
                    this.initFormValue();

                  }else{
                    this.tryToSend = false;
                    this.submitting = false;

                    this.makeToast('danger', response.message);
                    this.initFormValue();
                  }
                   
                })
                .catch((error) => {
                    this.tryToSend = false;
                    this.submitting = false;
                    this.makeToast('danger', error.message);
                    this.initFormValue();
                    console.log('error in module setting profile', error);
                });
        },
        initFormValue(){
            this.confirm_password = null;
            this.new_password = null;
            this.current_password = null;
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
                            <h4 class="header-title">Kata Sandi</h4>
                        </div>
                    </div>

                    <p class="text-muted">Silahkan ubah kata sandi anda disini.</p>
                    
                    <form @submit.prevent="onStore()">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label">Kata Sandi Lama <span class="text-danger">*</span></label>
                                    <input type="password" class="form-control" v-model="current_password" name="" placeholder="Masukan kata sandi lama" :class="{ 'is-invalid': submitting && $v.current_password.$error }">
                                    <div v-if="submitting && $v.current_password.$error" class="invalid-feedback">
                                        <span v-if="!$v.current_password.required">Kata sandi lama tidak boleh kosong !</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12"></div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label">Kata Sandi Baru <span class="text-danger">*</span></label>
                                    <input type="password" class="form-control" v-model="new_password" name="" placeholder="Masukan kata sandi baru" :class="{ 'is-invalid': submitting && $v.new_password.$error }">
                                    <div v-if="submitting && $v.new_password.$error" class="invalid-feedback">
                                        <span v-if="!$v.new_password.required">Kata sandi baru tidak boleh kosong !</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label">Ulangi Kata Sandi <span class="text-danger">*</span></label>
                                    <input type="password" class="form-control" v-model="confirm_password" name="" placeholder="Ulangi kata sandi" :class="{ 'is-invalid': submitting && $v.confirm_password.$error }">
                                    <div v-if="submitting && $v.confirm_password.$error" class="invalid-feedback">
                                        <span v-if="!$v.confirm_password.required">Kata sadi tidak boleh kosong !</span>
                                        <span v-else-if="!$v.confirm_password.sameAsPassword">Kata sandi tidak sama</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" v-if="!tryToSend" class="btn btn-primary mt-1">Simpan</button>
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
