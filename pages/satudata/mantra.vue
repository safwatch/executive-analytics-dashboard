<script>
import VueApexCharts from 'vue-apexcharts'
import { satudataService } from '../../helpers/satudata/satudata.service';
import Swal from "sweetalert2";

export default {
  /**
 * System level page
 */
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    components: {
        apexchart: () => import('vue-apexcharts')
    },
    data() {
        return {
            moduleId : 'mantra',
            permissionIndex : false,
            page : null,
            tryToSend : false,
            submitting : false,
            start : 0,
            limit : 10,
            title: "MANTRA",
            series: [{
                    name: "series1",
                    data: [31, 40, 28, 51, 42, 109, 100],
                },
                {
                    name: "series2",
                    data: [11, 32, 45, 32, 34, 52, 41],
                },
            ],
            chartOptions: {
                chart: {
                    height: 350,
                    type: "area",
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "smooth",
                },
                colors: ['#3bafda', '#1abc9c'],
                xaxis: {
                    type: "datetime",
                    categories: [
                        "2018-09-19T00:00:00.000Z",
                        "2018-09-19T01:30:00.000Z",
                        "2018-09-19T02:30:00.000Z",
                        "2018-09-19T03:30:00.000Z",
                        "2018-09-19T04:30:00.000Z",
                        "2018-09-19T05:30:00.000Z",
                        "2018-09-19T06:30:00.000Z",
                    ],
                },
                tooltip: {
                    x: {
                        format: "dd/MM/yy HH:mm",
                    },
                },
            },
        };
    },
    async mounted() {
        this.checkAuth().then((status) =>{
            if (status == 500){
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            }else{
                this.$store.dispatch('notification/clear');
            }
        });
    },
    methods: {
        async checkAuth(){
            return this.$userCheckAuth.checkAuth(this.moduleId);
        },
        getData(){
        },
        //check token health
        checkTokenHealth(token_data){
                this.$store.dispatch('satudata/validate').then((status) => {
                        // if(status){
                        //     let response = this.$store.state.healthCovid.covidCaseRecList;
                        //     for (var i=0; i<response.result.length; i++){
                        //             this.widgetData.push({
                        //                 id: i + 1,
                        //                 title: response.result[i].title,
                        //                 value: response.result[i].total.toString(),
                        //                 status: response.result[i].status,
                        //                 val: {
                        //                     _1: response.result[i].data.val_1,
                        //                     _2: response.result[i].data.val_2,
                        //                     _3: response.result[i].data.val_3
                        //                 }
                        //             })
                        //     }

                        //     this.covidCaseLoading = false;
                        // }
                    }).catch((error) => {
                        console.log('error in check health token', error);
                    });
            },
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },

        onStore(id){
            this.submitting = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }else{
                 //init payload
                 this.tryToSend = true;

                this.status = 0;

                if (this.tempStatus){
                    this.status = 1;
                }

                if (id == null){
                    //insert
                    let payload = {'name' : this.name, 'email' : this.email, 'group' : this.level, 'username': this.username, 'workunit': this.workUnit, 'status': this.status};

                    this.patchStore(payload, "users/insertUser");
                }else{
                    //update
                    let payload = {'name' : this.name, 'email' : this.email, 'group' : this.level, 'status': this.status, 'workunit': this.workUnit, 'username': this.username, 'id': id};

                    this.patchStore(payload, "users/updateUser");
                }
            }
        },

        onDelete(){
            let payload = {'id' : this.id};

            this.tryToSend = true;

            this.patchStore(payload, 'users/deleteUser');
        },

        patchStore(payload, patch){
            this.$store.dispatch(patch, {
                    payload: payload,
                })
                .then((response) => {
                  if (response.status == "OK"){
                    this.tryToSend = false;
                    this.submitting = false;
                    this.$refs['modal-form-delete'].hide();
                    this.$refs['modal-form-store'].hide();
                    this.$refs['reset-password-modal'].hide();

                    this.$store.dispatch('notification/success', response.message, { root: true });

                    this.getData();
                  }else{
                    this.tryToSend = false;
                    this.submitting = false;
                    this.$refs['modal-form-delete'].hide();
                    this.$refs['modal-form-store'].hide();
                    this.$refs['reset-password-modal'].hide();
                    this.$store.dispatch('notification/error', response.message, { root: true });
                  }

                  this.initFormValue();

                })
                .catch((error) => {
                    this.tryToSend = false;
                    this.submitting = false;
                    this.$store.dispatch('notification/error', error.message, { root: true });
                    console.log('error in module store', error);
                });

               //for multiple action
               this.$store.dispatch('notification/clear');
        },

        initFormValue(){
            this.idSelected = null;
            this.dataSelected = null;
            this.name = null;
            this.email = null;
            this.username = null;
            this.role= null,
            this.status=null,
            this.level =null,
            this.id = null;
            this.levelOptions= [{ item: null, name: 'Pilih Level Pengguna' },];
            this.workUnit = null;
        },

        onShowDelete(id){
            this.id = id;
        },

        onShowUpdate(data){
            this.getDataWorkUnit().then(() => {
                this.initFormValue();
                this.getDataLevel();

                this.titleModal = "Ubah Pengguna";
                this.dataSelected = data;
                this.idSelected = data.id;
                this.name = data.name;
                this.email = data.email;
                this.username = data.username;
                this.level = data.role;
                this.workUnit = data.workUnit


                if(data.status == 1){
                    this.tempStatus = true;
                }else{
                    this.tempStatus = false
                }
            });

        },

        async getDataWorkUnit(){
            // this.workUnitOptions = null;
            this.workUnitOptions= [{ value: null, text: '- Pilih Perangkat Daerah -' }];
            this.$store.dispatch('workunit/getWorkUnitAll', {
                    start: 0,
                    limit: 300,
                    search:''
                })
                .then(() => {
                    let response = this.$store.state.workunit.workunitListAll;

                   for (var i=0; i<response.result.length; i++){
                        this.workUnitOptions.push({
                            text: response.result[i].name,
                            value:  response.result[i].id,
                        })
                   }
                   return this.workUnitOptions;
                })
                .catch((error) => {
                    console.log('error in get module options', error);
                });
        },

       onShowCreate () {
            this.initFormValue();
            this.tempStatus=true,
            this.getDataLevel();
            this.titleModal = "Tambah Pengguna";
            this.getDataWorkUnit();

        },

       onResetPassword (id) {
          this.id = id;
       },

        onReset(){
            let payload = {'id' : this.id};

            this.tryToSend = true;

            this.patchStore(payload, 'users/updatePassword');
        },

        getDataLevel(){
            this.levelOptions= [{ item: null, name: 'Pilih Level Pengguna' },];
            this.$store.dispatch('group/getGroup', {
                    start: 0,
                    limit: 100,
                })
                .then(() => {
                    let response = this.$store.state.group.groupList;

                   for (var i=0; i<response.result.length; i++){
                        this.levelOptions.push({
                            item: response.result[i].id,
                            name:  response.result[i].name,
                        })
                   }

                })
                .catch((error) => {
                    console.log('error in group', error);
                });
        },

        showAlert() {
            Swal.fire("Any fool can use a computer!");
        },
        titleText() {
            Swal.fire("The Internet?", "That thing is still around?", "question");
        },
        successmsg() {
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                type: "success",
                confirmButtonClass: "btn btn-confirm mt-2",
            });
        },
        content() {
            Swal.fire({
                imageUrl: "https://placeholder.pics/svg/300x1500",
                imageHeight: 1500,
                imageAlt: "A tall image",
                confirmButtonClass: "btn btn-confirm mt-2",
            });
        },
        position() {
            Swal.fire({
                position: "top-end",
                type: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
        },
        errorIcon() {
            Swal.fire({
                type: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonClass: "btn btn-confirm mt-2",
                footer: "<a>Why do I have this issue?</a>",
            });
        },
        confirm() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.value) {
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                }
            });
        },
        cancel() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                confirmButtonClass: "btn btn-success mt-2",
                cancelButtonClass: "btn btn-danger ml-2 mt-2",
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        type: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        type: "error",
                    });
                }
            });
        },
        imageHeader() {
            Swal.fire({
                title: "Minton",
                text: "Responsive Bootstrap 4 Admin Dashboard",
                imageUrl: require("~/assets/images/logo-sm-dark.png"),
                imageHeight: 50,
                animation: false,
                confirmButtonClass: "btn btn-confirm mt-2",
            });
        },
        timer() {
            var timerInterval;
            Swal.fire({
                title: "Auto close alert!",
                html: "I will close in <strong></strong> seconds.",
                timer: 2000,
                onBeforeOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector("strong").textContent =
                            Swal.getTimerLeft() + "";
                    }, 100);
                },
                onClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        },
        custom() {
            Swal.fire({
                title: "<strong>HTML <u>example</u></strong>",
                type: "info",
                html: "You can use <b>bold text</b>, " +
                    '<a href="//github.com">links</a> ' +
                    "and other HTML tags",
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: "Thumbs up, great!",
                cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: "Thumbs down",
            });
        },
        customBackground() {
            Swal.fire({
                title: "Custom width, padding, background.",
                width: 600,
                padding: 100,
                confirmButtonClass: "btn btn-confirm mt-2",
                background: "#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)",
            });
        },
        ajax() {
            Swal.fire({
                title: "Submit your Github username",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Look up",
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                    return fetch(`//api.github.com/users/${login}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .catch((error) => {
                            Swal.showValidationMessage(`Request failed: ${error}`);
                        });
                },
                allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: `${result.value.login}'s avatar`,
                        imageUrl: result.value.avatar_url,
                    });
                }
            });
        },
        chain() {
            Swal.mixin({
                    input: "text",
                    confirmButtonText: "Next &rarr;",
                    showCancelButton: true,
                    progressSteps: ["1", "2", "3"],
                })
                .queue([{
                        title: "Question 1",
                        text: "Chaining swal2 modals is easy",
                    },
                    "Question 2",
                    "Question 3",
                ])
                .then((result) => {
                    if (result.value) {
                        Swal.fire({
                            title: "All done!",
                            html: "Your answers: <pre><code>" +
                                JSON.stringify(result.value) +
                                "</code></pre>",
                            confirmButtonText: "Lovely!",
                        });
                    }
                });
        },
        dynamicQueue() {
            var ipAPI = "https://api.ipify.org?format=json";
            Swal.queue([{
                title: "Your public IP",
                confirmButtonText: "Show my public IP",
                text: "Your public IP will be received " + "via AJAX request",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return fetch(ipAPI)
                        .then((response) => response.json())
                        .then((data) => Swal.insertQueueStep(data.ip))
                        .catch(() => {
                            Swal.insertQueueStep({
                                type: "error",
                                title: "Unable to get your public IP",
                            });
                        });
                },
            }, ]);
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
            }
        },
    middleware: ["router-auth","satudata-auth"]
};
</script>

<template>
  <div>
    <PageHeader :title="title" />
    <div class="row">
        <div class="col-xl-3 col-lg-4">

            <div class="card">
                <div class="card-body">
                    <i class="fa fa-info-circle text-muted float-right" v-b-tooltip.hover title="More Info"></i>
                    <h4 class="m-0 font-16">Active Users</h4>
                    <G2 class="my-3 text-center" id="active-users-count">121</G2>
                    <p class="text-muted m-0">
                        Since last month: 22506
                        <span class="float-right">
                            <i class="mdi mdi-arrow-up-bold mr-1 text-success"></i>10.25%
                        </span>
                    </p>
                </div>
                <!-- end card-body-->
            </div>
            <!--end card-->

            <div class="card">
                <div class="card-body">
                    <i class="fa fa-info-circle text-muted float-right" v-b-tooltip.hover title="More Info"></i>
                    <h4 class="m-0 font-16">Views Per Minute</h4>
                    <h2 class="my-3 text-center" id="active-views-count">485</h2>
                    <p class="text-muted m-0">
                        Since previous week: 8541
                        <span class="float-right">
                            <i class="mdi mdi-arrow-down-bold mr-1 text-danger"></i>2.63%
                        </span>
                    </p>
                </div>
                <!-- end card-body-->
            </div>
            <!--end card-->
        </div>
        <!-- end col -->

        <div class="col-xl-9 col-lg-8">
            <div class="card">
                <div class="card-body">
                    <ul class="nav float-right d-none d-lg-flex">
                        <li class="nav-item">
                            <a class="nav-link text-muted" href="#">Today</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-muted" href="#">7d</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">15d</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-muted" href="#">1m</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-muted" href="#">1y</a>
                        </li>
                    </ul>
                    <h4 class="header-title mb-3">Sessions Overview</h4>

                    <div class="row align-items-center">
                        <div class="col-xl-8">
                            <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
                        </div>
                        <!-- end col -->
                        <div class="col-xl-4">
                            <h5 class="mb-1 mt-0">
                                1,12,540
                                <small class="text-muted ml-2">www.getbootstrap.com</small>
                            </h5>
                            <div class="row align-items-center no-gutters mb-2 pb-1">
                                <div class="col">
                                    <div class="progress progress-sm">
                                        <div class="progress-bar" role="progressbar" style="width: 72%;" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="font-weight-medium ml-2">72%</div>
                                </div>
                            </div>

                            <h5 class="mb-1 mt-0">
                                51,480
                                <small class="text-muted ml-2">www.youtube.com</small>
                            </h5>
                            <div class="row align-items-center no-gutters mb-2 pb-1">
                                <div class="col">
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="font-weight-medium ml-2">65%</div>
                                </div>
                            </div>

                            <h5 class="mb-1 mt-0">
                                45,760
                                <small class="text-muted ml-2">www.dribbble.com</small>
                            </h5>
                            <div class="row align-items-center no-gutters mb-2 pb-1">
                                <div class="col">
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-warning" role="progressbar" style="width: 48%;" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="font-weight-medium ml-2">48%</div>
                                </div>
                            </div>

                            <h5 class="mb-1 mt-0">
                                98,512
                                <small class="text-muted ml-2">www.behance.net</small>
                            </h5>
                            <div class="row align-items-center no-gutters mb-2 pb-1">
                                <div class="col">
                                    <div class="progress progress-sm">
                                        <div class="progress-bar" role="progressbar" style="width: 59%;" aria-valuenow="59" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="font-weight-medium ml-2">59%</div>
                                </div>
                            </div>

                            <h5 class="mb-1 mt-0">
                                2,154
                                <small class="text-muted ml-2">www.vimeo.com</small>
                            </h5>
                            <div class="row align-items-center no-gutters">
                                <div class="col">
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: 21%;" aria-valuenow="21" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="font-weight-medium ml-2">21%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->
                </div>
                <!-- end card-body-->
            </div>
            <!-- end card-->
        </div>
        <!-- end col-->

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Examples</h4>

                    <p class="sub-header">A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes</p>

                    <table class="table table-borderless table-centered mb-0">
                        <thead class="thead-light">
                            <tr>
                                <th style="width:50%;">Alert Type</th>
                                <th>Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A basic message</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="showAlert">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A title with a text under</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="titleText">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A success message!</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="successmsg">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A modal window with a long content inside:</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="content">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A custom positioned dialog</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="position">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A modal with a title, an error icon, a text, and a footer</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="errorIcon">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A confirm dialog, with a function attached to the "Confirm"-button...</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="confirm">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>By passing a parameter, you can execute something else for "Cancel".</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="cancel">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A message with custom Image Header</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="imageHeader">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A message with auto close timer</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="timer">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Custom HTML description and buttons</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="custom">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>A message with custom width, padding and background</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="customBackground">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Ajax request example</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="ajax">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Chaining modals (queue) example</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="chain">Click me</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Dynamic queue example</td>
                                <td>
                                    <button id="sa-basic" type="button" class="btn btn-info btn-xs" @click="dynamicQueue">Click me</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- end table -->
                </div>
            </div>
        </div>
        <!--end col -->
        </div>
  </div>
</template>
