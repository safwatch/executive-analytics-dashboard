<script>
import { required } from "vuelidate/lib/validators";
import Axios from 'axios';
import CryptoJS from 'crypto-js';
import { userService } from '../../helpers/auth/user.service';


/**
 * Login component
 */

export default {
    head() {
        return {
            title: `Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    data() {
        return {
            username: '',
            password: '',
            submitted: false,
            authError: null,
            tryingToLogIn: false,
            isAuthError: false,
            showPassword: false
        }
    },
    computed: {
        notification() {
            return this.$store ? this.$store.state.notification : null;
        },
        notificationAutoCloseDuration() {
            return this.$store && this.$store.state.notification ? 5 : 0;
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
    async mounted() {

        // Recaptcha v3
        await this.$recaptcha.init()

        const messageRef = this.$fire.database.ref('config');

        Axios.get(messageRef.toString() + '.json').then(response => {
            this.$store.dispatch('flavors/changeFlavor', {
                clientId: response.data.develop.api.client_id,
                clientSecret: response.data.develop.api.client_secret,
                endpoint: response.data.develop.api.endpoint
            }, { root: true })

            let dataFirebase = JSON.stringify(response.data.develop);

            const encryptedText = CryptoJS.AES.encrypt(dataFirebase, this.$config.myPassphrase).toString();

            //save credential
            localStorage.setItem('api.hash', encryptedText);

            let userToken = userService.getToken();

            console.log('user token : ', userToken);

            if (userToken != null) {
                this.$router.push(
                    this.$route.query.redirectFrom || {
                        path: "/dashboard"
                    }
                );
            }

            // this.$store.dispatch('authstate/validate', {}).then((response) => {
            //     if (response){
            //         this.$router.push(
            //                 this.$route.query.redirectFrom || {
            //                     path: "/dashboard"
            //                 }
            //             );
            //     }else{
            //         console.log('on maounted login false');
            //     }
            // })
            // .catch((error)=>{
            //     console.log('on mounted login error', error);
            // });
        })
    },
    methods: {
        async loginUser() {
            this.submitted = true;

            // Recaptcha Token
            const token = await this.$recaptcha.execute('login')
            console.log('ReCaptcha token:', token)

            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            } else {
                this.tryingToLogIn = true;
                // Reset the authError if it existed.
                this.authError = null;

                this.$store.dispatch('authstate/logIn', {
                    username: this.username,
                    password: this.password,
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(() => {
                        let user = this.$store.getters["authstate/loggedIn"];

                        console.log('here login', user);

                        this.tryingToLogIn = false;
                        this.isAuthError = false;
                        // Redirect to the originally requested page, or to the home page
                        if (user) {
                            console.log('opd', user.group);
                            if (user.group === "opd") {
                                this.$router.push(
                                    this.$route.query.redirectFrom || {
                                        path: "/config/contentaccess"
                                    }
                                );
                            } else {
                                this.$router.push(
                                    this.$route.query.redirectFrom || {
                                        path: "/dashboard"
                                    }
                                );
                            }

                        }

                    })
                    .catch((error) => {
                        this.tryingToLogIn = false;
                        this.authError = error ? error : "";
                        this.isAuthError = true;
                    });

                this.$store.dispatch('notification/clear')
            }


        },

        tooglePassword() {
            this.showPassword = !this.showPassword;
        }
    },
    layout: "auth",
};
</script>

<template>
    <div>
        <!-- Logo -->
        <!-- <div class="auth-brand text-center text-lg-left">
        <div class="auth-logo">
            <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-lg">
                    <img src="~/assets/images/sie/logo-sm.png" alt="Logo SIE" height="60" />
                </span>
            </nuxt-link>

            <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-lg">
                    <img src="~/assets/images/sie/logo-white-sm.png" alt="Logo SIE" height="60" />
                </span>
            </nuxt-link>
        </div>
    </div> -->

        <!-- title-->
        <h3 class="text-center mt-0">Masuk Sistem</h3>
        <p class="text-muted mb-3 text-center">Masukan alamat email dan kata sandi yang anda miliki untuk mengakses
            sistem.</p>

        <!-- form -->
        <form action="#" @submit.prevent="loginUser">

            <!-- validate notif -->
            <b-alert :variant="notification.type" class="mt-3 text-center" v-if="notification.message"
                :show="notificationAutoCloseDuration" dismissible>{{ notification.message }}</b-alert>
            <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="notificationAutoCloseDuration"
                dismissible>{{ authError }}</b-alert>
            <!-- end validate notif -->

            <div class="form-group">
                <label for="emailaddress">Nama Pengguna</label>
                <input class="form-control" v-model="username" id="username"
                    placeholder="Masukan NIP/Nama Pengguna/Email"
                    :class="{ 'is-invalid': submitted && $v.username.$error }" />
                <div v-if="submitted && $v.username.$error" class="invalid-feedback">
                    <span v-if="!$v.username.required">Email atau nama pengguna harus diisi</span>
                </div>
            </div>
            <div class="form-group">
                <label for="password">Kata Sandi</label>
                <div class="input-group input-group-merge has-validation">
                    <input type="text" v-model="password" id="password" class="form-control"
                        placeholder="Masukan Kata Sandi" :class="{ 'is-invalid': submitted && $v.password.$error }"
                        v-if="showPassword" />
                    <input type="password" v-model="password" id="password" class="form-control"
                        placeholder="Masukan Kata Sandi" :class="{ 'is-invalid': submitted && $v.password.$error }"
                        v-else />
                    <div class="input-group-append" data-password="false" @click="tooglePassword"
                        :title="[showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi']" v-b-tooltip.hover.top>
                        <div class="input-group-text">
                            <span :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']"></span>
                        </div>
                    </div>
                    <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                        <span v-if="!$v.username.required">Kata sandi harus diisi</span>
                    </div>
                </div>
            </div>

            <div class="form-group mb-0 mt-3 text-center">
                <!-- <recaptcha /> -->
                <input type="hidden" name="token_captcha" id="token_captcha">
                <button v-if="!tryingToLogIn" class="btn btn-primary btn-block" type="submit">Masuk Sistem</button>
                <b-button v-if="tryingToLogIn" variant="primary" disabled class="w-100">
                    <b-spinner small></b-spinner>&nbsp;&nbsp;Mohon tunggu...
                </b-button>
            </div>
        </form>
        <!-- end form-->
        <!-- Footer-->
        <!-- <footer class="footer footer-alt">
        <p class="text-muted">
            &copy; 2022. Pemerintah Daerah Civic Administration
        </p>
    </footer> -->
    </div>
</template>
