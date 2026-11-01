<script>
import CryptoJS from 'crypto-js';
import VueBootstrapAutocomplete from '@vue-bootstrap-components/vue-bootstrap-autocomplete';

import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'

exportingInit(Highcharts)

/**
 * Topbar component
 */
export default {
    components: { VueBootstrapAutocomplete },
    data() {
        return {
            query: null,
            autoCompleteData: [],
            selectedMenu: [],
            moduleOptions: [],
            languages: [{
                flag: require("~/assets/images/flags/us.jpg"),
                language: "en",
                title: "English",
            },
            {
                flag: require("~/assets/images/flags/french.jpg"),
                language: "fr",
                title: "French",
            },
            {
                flag: require("~/assets/images/flags/spain.jpg"),
                language: "es",
                title: "Spanish",
            },
            {
                flag: require("~/assets/images/flags/china.png"),
                language: "zh",
                title: "Chinese",
            },
            {
                flag: require("~/assets/images/flags/arabic.png"),
                language: "ar",
                title: "Arabic",
            },
            ],
            current_language: this.$i18n.locale,
            text: null,
            flag: null,
            value: null,
            valueAutoComplete: null,
            userName: null,
        };
    },
    mounted() {

        // Passphrase
        let passphrase = window.$nuxt.$config.myPassphrase;

        try{
            // Get encrypted text from local storage
            let encryptedText = localStorage.getItem("auth.hash");
            console.log('encryptedText',encryptedText);
            
            // Check if encryptedText is not null
            if (encryptedText) {
                
                // Decrypt text
                const decryptedText = CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);
                var userData = JSON.parse(decryptedText);
                console.log('on mounted', userData);
                this.userName = userData.name; // Set userName from decrypted data
            } else {
                console.error('No encrypted data found in localStorage.');
                // Optionally, handle the case when no data is found
                this.userName = "Guest"; // Fallback to a default user name
            }

            this.value = this.languages.find((x) => x.language === this.$i18n.locale);
            this.text = this.value.title;
            this.flag = this.value.flag;
            this.getDataMenu();
        } catch (error) {
            console.log('error', error);
            //redirect to login page
            window.$nuxt.$router.push('/auth/login');
        }

        // // Get encrypted text from local storage
        // let encryptedText = localStorage.getItem("auth.hash");
        // console.log(encryptedText);
        
        // // Check if encryptedText is not null
        // if (encryptedText) {
            
        //     // Decrypt text
        //     const decryptedText = CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);
        //     var userData = JSON.parse(decryptedText);
        //     console.log('on mounted', userData);
        //     this.userName = userData.name; // Set userName from decrypted data
        // } else {
        //     console.error('No encrypted data found in localStorage.');
        //     // Optionally, handle the case when no data is found
        //     this.userName = "Guest"; // Fallback to a default user name
        // }

        // this.value = this.languages.find((x) => x.language === this.$i18n.locale);
        // this.text = this.value.title;
        // this.flag = this.value.flag;
        // this.getDataMenu();
    },
    methods: {
        async getDataMenu() {
            this.$store.dispatch('menu/getMenu', {
                start: 0,
                limit: 1000,
                search: '',
                isFeature: '1'
            })
                .then((status) => {
                    if (status) {
                        let response = this.$store.state.menu.menuList;

                        for (var i = 0; i < response.result.length; i++) {
                            this.moduleOptions.push({
                                item: response.result[i].url,
                                name: response.result[i].name,
                            });
                            this.autoCompleteData.push(
                                response.result[i].name
                            );
                        }
                    }
                })
                .catch((error) => {
                    console.log('error in get data menu', error);
                });
        },

        async selectedItemSearch(value) {
            let url = this.moduleOptions.find(key => key.name === value).item;

            this.$router.push(
                this.$route.query.redirectFrom || {
                    path: url
                }
            );

            this.query = null;
        },
        /**
         * Toggle menu
         */
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        /**
         * Full screen
         */
        initFullScreen() {
            document.body.classList.toggle("fullscreen-enable");
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT
                    );
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        /**
         * Toggle rightbar
         */
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        /**
         * Set languages
         */
        setLanguage(locale, country, flag) {
            this.$i18n.locale = locale;
            this.current_language = locale;
            this.text = country;
            this.flag = flag;
        },
        /**
         * Horizontal-toggle menu
         */
        horizonalmenu() {
            let element = document.getElementById("topnav-menu-content");
            element.classList.toggle("show");
        },
        /**
         * Logout user
         */
        logoutUser() {
            return (
                this.$store.dispatch("authstate/logOut")
                    .then((respon) => {
                        console.log(respon);
                        if (respon === 'OK') {
                            this.$router.push(
                                this.$route.query.redirectFrom || {
                                    path: "/auth/logout"
                                }
                            );
                        }
                    })
                    .catch((error) => {
                        console.log('error topbar : ', error);
                    })
            );
        },
    },
    middleware: ['check-certificate', 'router-auth'],

};
</script>

<template>
    <!-- Topbar Start -->
    <div class="navbar-custom">
        <div class="container-fluid">
            <ul class="list-unstyled topnav-menu float-right mb-0">
                <li class="d-none d-lg-block">
                    <form class="app-search">
                        <div class="app-search-box">
                            <!-- <vue-bootstrap-autocomplete v-model="query" :data="autoCompleteData" :noResultsInfo="noResultsInfo" :minMatchingChars="1" @hit="selectedItemSearch($event)" placeholder="Pencarian..."/> -->
                            <vue-bootstrap-autocomplete v-model="query" :data="autoCompleteData" :minMatchingChars="1"
                                @hit="selectedItemSearch($event)" placeholder="Pencarian..." />
                        </div>
                    </form>
                </li>

                <li class="dropdown d-inline-block d-lg-none">
                    <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-toggle="dropdown"
                        href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <i class="fe-search noti-icon"></i>
                    </a>
                    <div class="dropdown-menu dropdown-lg dropdown-menu-right p-0">
                        <form class="p-3">
                            <input type="text" class="form-control" placeholder="Pencarian..."
                                aria-label="Recipient's username" />
                        </form>
                    </div>
                </li>

                <li class="dropdown d-none d-lg-inline-block">
                    <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light" @click="initFullScreen"
                        data-toggle="fullscreen" href="#">
                        <i class="fe-maximize noti-icon"></i>
                    </a>
                </li>

                <b-nav-item-dropdown right class="notification-list topbar-dropdown" menu-class="profile-dropdown"
                    toggle-class="p-0">
                    <template slot="button-content" class="nav-link dropdown-toggle">
                        <div class="nav-user mr-0">
                            <img src="~/assets/images/users/sie-user.jpg" alt="user-image" class="rounded-circle" />
                            <span class="pro-user-name ml-1">
                                {{ userName }}
                                <i class="mdi mdi-chevron-down"></i>
                            </span>
                        </div>
                    </template>

                    <b-dropdown-header>
                        <h6 class="text-overflow m-0 py-2">Halo, {{ userName }}</h6>
                    </b-dropdown-header>

                    <b-dropdown-item href="/user/profile">
                        <i class="remixicon-account-circle-line"></i>
                        <span>Profil</span>
                    </b-dropdown-item>

                    <b-dropdown-item href="/user/setting">
                        <i class="remixicon-settings-3-line"></i>
                        <span>Pengaturan</span>
                    </b-dropdown-item>

                    <b-dropdown-divider></b-dropdown-divider>
                    <a class="dropdown-item" @click="logoutUser" href="javascript: void(0);">
                        <i class="fe-log-out mr-1"></i>
                        <span>Keluar</span>
                    </a>
                </b-nav-item-dropdown>
            </ul>

            <!-- LOGO -->
            <!-- <div class="logo-box">
            <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/sie/logo-sm.png" alt height="45" />
                </span>
                <span class="logo-lg">
                    <img src="~/assets/images/sie/logo-sm.png" alt height="45" />
                </span>
            </nuxt-link>

            <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/logo-sm.png" alt height="24" />
                </span>
                <span class="logo-lg">
                    <img src="~/assets/images/logo-light.png" alt height="20" />
                </span>
            </nuxt-link>
        </div> -->

            <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
                <li>
                    <button class="button-menu-mobile waves-effect waves-light" @click="toggleMenu">
                        <i class="fe-menu"></i>
                    </button>
                </li>

                <li>
                    <!-- Mobile menu toggle (Horizontal Layout)-->
                    <a class="navbar-toggle nav-link" data-toggle="collapse" @click="horizonalmenu()"
                        data-target="#topnav-menu-content">
                        <div class="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                    <!-- End mobile menu toggle-->
                </li>
            </ul>
            <div class="clearfix"></div>
        </div>
    </div>
    <!-- end Topbar -->
</template>
