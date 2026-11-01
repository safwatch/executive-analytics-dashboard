<script>
import Pusher from 'pusher-js';
import CryptoJS from 'crypto-js';

export default {
    data() {
        return {
            activetab: 1,
            activemenu: null,
            activesub: null,
            mainMenus:[],
            sub: {
                icon: 'mdi-icon-name' 
            }
        };
    },
    mounted: function () {
        //init data
        this.getData();

        // Pusher.logToConsole = true;

        const pusher = new Pusher("f2e153ed33e996a8f85d", {cluster: "ap1", forceTLS: true,});

        const channel = pusher.subscribe("my-channel");

        channel.bind("my-event", (data) => {

             // get data token in local storage
            let encryptedText = localStorage.getItem("auth.hash")

            //passphrase
            let passphrase = this.$config.myPassphrase;

            // decrypt text
            const decryptedText = CryptoJS.AES.decrypt(encryptedText, passphrase).toString(CryptoJS.enc.Utf8);

            //json parsing
            var userGroup = JSON.parse(decryptedText);

            if(userGroup.group === data['group']){
                 // let userGroup = respon.
                localStorage.removeItem('currentMenu');
                localStorage.setItem('currentMenu', JSON.stringify(data['permission']));
                let response = JSON.parse(localStorage.getItem("currentMenu"));

                this.renderData(response);
            }

        });

        // Get active tab from local storage
        if (localStorage.layoutActiveTab) {
          this.activetab = parseInt(localStorage.layoutActiveTab);
        }

        // Get active menu from local storage
        if (localStorage.layoutActiveMenu) {
          this.activemenu = parseInt(localStorage.layoutActiveMenu);
        }

        // Get active menu from local storage
        if (localStorage.layoutActiveSub) {
          this.activesub = parseInt(localStorage.layoutActiveSub);
        }

        this._activateMenuDropdown();
        this.$router.afterEach((routeTo, routeFrom) => {
            this._activateMenuDropdown();
        });
    },
    methods: {
        getStyle(icon) {
            return icon.includes('mdi') ? { top: '2px', fontSize: '18px' } : { top: '2px'};
        },

        getData(){
            this.mainMenus = [];
            this.$store.dispatch('permission/getPermissionMenu', {
                })
                .then((status) => {
                    if(status){
                        let response = JSON.parse(localStorage.getItem("currentMenu"));

                        this.renderData(response);
                    }
                })
                .catch((error) => {
                    console.log('error on get data permission menu', error);
                });
        },

        renderData(response){
            this.mainMenus = [];
            for (var i=0; i<response.length; i++){
                //for level one
                this.mainMenus.push({
                        id: response[i].id,
                        title: response[i].title,
                        icon: response[i].icon,
                        link : response[i].link,
                        hasSub : response[i].has_sub,
                        subs : []
                });

                if (response[i].has_sub == true){
                    for (var j=0; j<response[i].subs.length; j++){
                        //for level two
                        this.mainMenus[i].subs.push({
                            id: response[i].subs[j].id,
                            title: response[i].subs[j].title,
                            link: response[i].subs[j].link,
                            icon: response[i].subs[j].icon,
                            hasSub : response[i].subs[j].has_sub,
                            subs : []
                        });

                        if (response[i].subs[j].has_sub == true){
                            for (var k=0; k<response[i].subs[j].subs.length; k++){
                                //for level tree
                                this.mainMenus[i].subs[j].subs.push({
                                    id : response[i].subs[j].subs[k].id,
                                    title: response[i].subs[j].subs[k].title,
                                    link: response[i].subs[j].subs[k].link
                                });
                            }
                        }
                    }
                }
            }
        },

        /**
         * Returns true or false if given menu item has child or not
         * @param item menuItem
         */
        hasItems(item) {
            return item.subItems !== undefined ? item.subItems.length > 0 : false;
        },

        _activateMenuDropdown() {
            const resetParent = (el) => {
                el.classList.remove("active");
                var parent = el.parentElement;
                if (parent) {
                    parent.classList.remove("menuitem-active");
                    const parent2 = parent.parentElement;
                    if (parent2) {
                        const parent3 = parent2.parentElement;
                        if (parent3) {
                            parent3.classList.remove("show");
                            const parent4 = parent3.parentElement;
                            if (parent4) {
                                parent4.classList.remove("menuitem-active");
                            }
                        }
                    }
                }
            };
            var links = document.getElementsByClassName("side-nav-link-ref");
            var matchingMenuItem = null;
            const paths = [];
            for (let i = 0; i < links.length; i++) {
                // reset menu
                resetParent(links[i]);
            }
            for (var i = 0; i < links.length; i++) {
                paths.push(links[i]["pathname"]);
            }
            var itemIndex = paths.indexOf(window.location.pathname);
            if (itemIndex === -1) {
                const strIndex = window.location.pathname.lastIndexOf("/");
                const item = window.location.pathname.substr(0, strIndex).toString();
                matchingMenuItem = links[paths.indexOf(item)];
            } else {
                matchingMenuItem = links[itemIndex];
            }

            if (matchingMenuItem) {
                matchingMenuItem.classList.add("active");
                var parent = matchingMenuItem.parentElement;

                /**
                 * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
                 * We should come up with non hard coded approach
                 */
                if (parent) {
                    parent.classList.add("menuitem-active");
                    const parent2 = parent.parentElement;
                    if (parent2) {
                        const parent3 = parent2.parentElement;
                        if (parent3) {
                            parent3.classList.add("show");
                            const parent4 = parent3.parentElement;
                            if (parent4) {
                                parent4.classList.add("menuitem-active");
                            }
                        }
                    }
                }
            }


        },

        changeMenu(id, link){

            // Chane active tab in localstorage
            this.activetab = id;
            localStorage.layoutActiveTab = this.activetab;

            // Open submenu
            var body = document.getElementsByTagName('body');
                body[0].removeAttribute('data-sidebar-size');

            if (link !== "javascript:void(0)"){
                this.$router.push(
                        this.$route.query.redirectFrom || {
                            path: link
                        }
                    );
            }

        },

        changeSubMenu(id, link, subid){

            // Chane active tab in localstorage
            this.activemenu = id;
            localStorage.layoutActiveMenu = this.activemenu;

            // Chane active tab in localstorage
            this.activesub = subid;
            localStorage.layoutActiveSub = this.activesub;

            if (link !== "javascript:void(0)"){
                console.log('here');
                this.$router.push(
                        this.$route.query.redirectFrom || {
                            path: link
                        }
                    );
            }

        }
    },
};
</script>

<template>
<!-- ========== Left Sidebar Start ========== -->
<div class="left-side-menu">
    <div class="h-100">
        <div class="sidebar-content">
            <simplebar class="sidebar-icon-menu h-100" data-simplebar>
                <!-- LOGO -->
                <a href="/" class="logo">
                    <span>
                        <img src="~/assets/images/executive-analytics/executive-analytics-white-text.png" alt="Logo Executive Analytics" height="40" />
                    </span>
                </a>
                <nav class="nav flex-column" id="two-col-sidenav-main">
                    <a v-for="(menu, index) in mainMenus" :key="index" href="javascript: void(0);" class="nav-link" :id="'menu_' + menu.id" v-on:click="changeMenu(menu.id, menu.link)" v-bind:class="[ activetab === menu.id ? 'active' : '' ]">
                        <i :class="menu.icon"></i>  <span class="text-white nav-label">{{ menu.title }}</span>
                    </a>
                </nav>
            </simplebar>
            <!--- Sidemenu -->
            <div class="sidebar-main-menu">
                <simplebar id="two-col-menu" class="h-100" data-simplebar>

                    <div v-for="(menu, idx) in mainMenus" :key="idx" class="twocolumn-menu-item d-block" id="dashboard"  >
                        <div v-if="activetab === menu.id">
                            <div class="title-box">
                                <h5 class="menu-title">{{ menu.title }}</h5>
                                <ul class="nav flex-column" v-if="menu.hasSub">
                                    <li v-for="(sub, subIdx) in menu.subs" :key="subIdx" class="nav-item" v-bind:class="[ activemenu === sub.id ? 'menuitem-active' : '' ]">
                                        <!-- Has multi sub -->
                                        <a href="javascript: void(0);" v-b-toggle="'sidebar_' + sub.id" data-toggle="collapse" class="nav-link" v-if="sub.hasSub">
                                            <span>
                                                <i :class="sub.icon" class="mr-1 position-relative" :style="getStyle(sub.icon)"></i>
                                                {{ sub.title }}
                                            </span>
                                            <span class="menu-arrow"></span>
                                        </a>
                                        <b-collapse :id="'sidebar_' + sub.id" v-if="sub.hasSub" v-bind:class="[ activemenu === sub.id ? 'show' : '' ]" v-bind:style="[ activemenu === sub.id ? { 'display': 'inline' } : { 'display': 'none' } ]">
                                            <ul class="nav-second-level">
                                                <li v-for="(multi, mulIdx) in sub.subs" :key="mulIdx" v-bind:class="[ activesub === multi.id ? 'menuitem-active' : '' ]">
                                                    <nuxt-link :to="multi.link" class="side-nav-link-ref" v-bind:class="[ activesub === multi.id ? 'active' : '' ]"><span v-on:click="changeSubMenu(sub.id, sub.link, multi.id)">{{ multi.title }}</span></nuxt-link>
                                                </li>
                                            </ul>
                                        </b-collapse>

                                        <!-- Hasn't multi sub -->
                                        <nuxt-link class="nav-link side-nav-link-ref" :to="sub.link" v-if="!sub.hasSub">
                                            <i :class="sub.icon" class="mr-1 position-relative" :style="getStyle(sub.icon)"></i>
                                            {{ sub.title }}
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </simplebar>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- End Sidebar -->
    </div>
    <!-- Sidebar -left -->
</div>
<!-- Left Sidebar End -->
</template>
