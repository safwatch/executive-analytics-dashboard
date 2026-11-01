<script>
import {required} from "vuelidate/lib/validators";
import { satudataService } from '../../helpers/satudata/satudata.service';
import CryptoJS from 'crypto-js';
/**
 * System level page
 */
export default {
  head() {
        return {
            title: `${this.title} Pengaturan - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },

    data() {
        return {
          moduleId : 'satudata',
          title: "Satu Data",
          permissionIndex : false,
          isBusy: false,
          page : null,
          tryToSend : false,
          submitting : false,
          items: [
              {
                  text: "Sampeu",
              },
              {
                  text: "Pengaturan Sistem",
              },
              {
                  text: "Satu Data",
                  active: true,
              },
          ],
          username : null,
          password : null,
          titleModal :null,
          tokenCreated :  localStorage.getItem("satudata.token") != null ? true : false,
          tokenText : null
        };
    },
    mounted() {
        this.checkAuth().then((status) =>{
            if (status == 500){
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            }else{
                this.$store.dispatch('notification/clear');
            }
        });
    },
    computed:{
        notification() {
            return this.$store ? this.$store.state.notification : null;
        },
        notificationAutoCloseDuration() {
            return this.$store && this.$store.state.notification ? 5 : 0;
        },
        isDisabled: function(){
            console.log(this.tokenCreated);
            return this.tokenCreated;
        }
    },
    methods: {

        async signinSatuData() {
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }else{
                this.satudataTryToLogIn = true;
                // Reset the authError if it existed.
                this.tokenError = null;

                var param = '&username='+this.username+'&password='+this.password;

                this.$store.dispatch('satudata/getTokenByLogin', {
                    username: this.username,
                    password: this.password,
                }).then(()=>{
                    let satudataToken = this.$store.getters["satudata/signedIn"];

                    console.log(satudataToken);

                    if (satudataToken !== null){
                        this.satudataTryToLogIn = false;
                        this.tokenError = false;
                    
                        this.$store.dispatch('notification/success', "Success: Token created", { root: true });
                        this.tokenCreated = true;
                        setTimeout(() => {
                            this.$refs['modal-form-store'].hide();
                        }, 1250);
                    }else{
                        console.log('satudata token unavailable');
                    }

                });
            }

        },

        async checkAuth(){
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },

        initFormValue(){
            this.username = null;
            this.password = null;
        },

        onShowCreate () {
            this.initFormValue();
            this.tempStatus=true,
            this.titleModal = "Login dengan Akun Satu Data Anda";
        },
    },
    validations: {
        username: {
            required
        },
        password: {
            required
        },
    },
    middleware: "router-auth",
};
</script>

<template>
  <div>
    <PageHeader :title="title"/>

    <div class="row justify-content-center my-5">
      <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card">

              <div class="card-body p-4">
                  <div class="error-ghost text-center">
                      <img src="~/assets/images/satudata-logo.png" width="200" alt="error-image" />
                  </div>

                  <div class="text-center">
                      <h3 class="mt-4 text-uppercase font-weight-bold">SATUDATA KOTA.CIMAHI </h3>
                      <p class="text-muted mb-0 mt-3" style="line-height: 20px;">Integrasi antara Satu Data dan Sistem Informasi Pemerintah Eksekutif Umum bertujuan untuk meningkatkan efektivitas dan efisiensi dalam pengelolaan data dan perencanaan pembangunan di Civic Administration.</p>

                      <button v-if="tokenCreated === false" v-b-modal.modal-form variant="primary" @click="onShowCreate()" class="btn btn-primary mt-3" :disabled='isDisabled'><i class="mdi mdi-folder-key-outline mr-1"></i> Get Access</button>
                      <button v-else-if="tokenCreated === true" class="btn btn-success mt-3"><i class="mdi mdi-cloud-check mr-1"></i> Access Granted</button>
                  </div>

              </div> <!-- end card-body -->
          </div>
          <!-- end card -->

          <!-- Form Login Modal -->
          <b-modal id="modal-form" ref="modal-form-store" :title=titleModal hide-footer title-class="font-18">
            <b-alert :variant="notification.type" class="mt-3 text-center" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible>{{notification.message}}</b-alert>
              <form action="#" @submit.prevent="signinSatuData">
                  <div class="row">
                      <div class="col-md-12">
                          <div class="form-group">
                              <label class="control-label">Username <span class="text-danger">*</span></label>
                              <input type="text" v-model="username" class="form-control" placeholder="Masukan Username" :class="{ 'is-invalid': submitting && $v.username.$error }" />
                              <div v-if="submitting && $v.username.$error" class="invalid-feedback">
                                  <span v-if="!$v.username.required">Username tidak boleh kosong !</span>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-12">
                          <div class="form-group">
                              <label class="control-label">Password <span class="text-danger">*</span></label>
                              <input type="password" v-model="password" class="form-control" placeholder="Masukan Password" :class="{ 'is-invalid': submitting && $v.password.$error }" />
                              <div v-if="submitting && $v.password.$error" class="invalid-feedback">
                                  <span v-if="!$v.password.required">Password tidak boleh kosong !</span>
                              </div>
                          </div>
                      </div>

                      <div class="col-md-12 text-right">
                          <button type="button" class="btn btn-secondary my-2" @click="$bvModal.hide('modal-form')">Batal</button>
                          <button type="submit" v-if="!tryToSend" class="btn btn-primary my-2" >Sign In</button>
                          <b-button v-if="tryToSend" variant="primary" disabled class="btn btn-primary my-2">
                              <b-spinner small></b-spinner>&nbsp;&nbsp;Mohon tunggu...
                          </b-button>
                      </div>
                  </div>
              </form>
          </b-modal>
          <!-- End Form Login Modal -->

      </div> <!-- end col -->
    </div>
  </div>
  <!-- end row -->
  </template>
