<script>
    // import { CardShimmer, ParagraphShimmer, FreeStyleShimmer } from 'shimmer';
    import CovidCivic from "~/components/widgets/covid19/Covid-civic";
    import CovidCentral from "~/components/widgets/covid19/Covid-central";
    import BarChart from "~/components/widgets/covid19/Covid-barchart";
    import BarChartShimmer from "~/components/widgets/covid19/Covid-barchart-shimmer";
    import CovidCivicShimmer from "~/components/widgets/covid19/Covid-civic-shimmer";
    import CovidCentralShimmer from "~/components/widgets/covid19/Covid-central-shimmer";
    import SimpleShimmer from "simple-shimmer";
    
    /**
     * Covid page
     */
    export default {
        head() {
            return {
                title: `${this.title} (Kesehatan) - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
            };
        },
        components: {
            SimpleShimmer,
            CovidCivicShimmer,
            CovidCentralShimmer,
            CovidCivic,
            CovidCentral,
            BarChart
        },
        mounted() {
            this.checkAuth().then((status) =>{
                if (status == 500){
                    this.$nuxt.error({ statusCode: 500, message: 'err message' })
                }else{
                    this.$store.dispatch('notification/clear');
                    this.getDataCovidCase();
                    this.getDataCovidNation();
                    this.getDataCovidSubdistrict();
                    this.getDataCovidDistrict();
                }
            });
        },
        data() {
            return {
                moduleId : 'healt',
                permissionIndex : false,
                title: "Perkembangan Kasus Covid 19 Civic Administration",
                items: [{
                        text: "Sampeu",
                    },
                    {
                        text: "Kesehatan",
                    },
                    {
                        text: "Covid 19",
                        active: true,
                    },
                ],
                covidCaseLoading : true,
                covidNationLoading : true,
                covidSubdistrictLoading : true,
                covidDistrictLoading : true,
                widgetData: [],
                centralData: [],
                mapData: [],
                subdistrictCategories : [],
                series : [{
                    name: 'Sembuh',
                    data: [],
                    color: '#88CA63'

                }, {
                    name: 'Konfirmasi Aktif',
                    data: [],
                    color: '#FBE05A'

                }, {
                    name: 'Meninggal',
                    data: [],
                    color: '#D84542'

                 }],
                zonaData: []
            };
        },
        methods : {
            async checkAuth(){
                return this.$userCheckAuth.checkAuth(this.moduleId);   
            },
            //data covid case
            getDataCovidCase(){
                this.$store.dispatch('healthCovid/getCovidCaseRec'
                    ).then((status) => {
                        if(status){
                            let response = this.$store.state.healthCovid.covidCaseRecList;
                            for (var i=0; i<response.result.length; i++){
                                    this.widgetData.push({
                                        id: i + 1,
                                        title: response.result[i].title,
                                        value: response.result[i].total.toString(),
                                        status: response.result[i].status,
                                        val: {
                                            _1: response.result[i].data.val_1,
                                            _2: response.result[i].data.val_2,
                                            _3: response.result[i].data.val_3
                                        }
                                    })
                            }

                            this.covidCaseLoading = false;
                        }
                    }).catch((error) => {
                        console.log('error in covid get recap', error);
                    });
            },

            // get data covid nation
            getDataCovidNation(){
                this.$store.dispatch('healthCovid/getCovidNation'
                ).then((status) => {
                        if(status){
                            let response = this.$store.state.healthCovid.covidNationList;

                            if (response.result.indonesia){
                                this.centralData.push({
                                    title: 'Konfirmasi Indonesia',
                                    icon: 'ri-earth-line',
                                    value: response.result.indonesia.toString()

                                });
                            };

                            if (response.result.jabar){
                                this.centralData.push({
                                    title: 'Konfirmasi Jawa Barat',
                                    icon: 'ri-map-pin-2-line',
                                    value: response.result.jabar.toString()

                                });
                            }
                            this.covidNationLoading = false;
                        }
                    }).catch((error) => {
                        console.log('error in covid get recap', error);
                    });
            },

            // get data covid subdistrict
            getDataCovidSubdistrict(){
                this.$store.dispatch('healthCovid/getCovidSubdistrict'
                    ).then((status) => {
                        if (status){
                            let response = this.$store.state.healthCovid.covidSubdistrictList;

                            let healed = [];
                            let positive = [];
                            let died = [];


                            for (var i=0; i<response.result.length; i++){
                                this.subdistrictCategories.push(
                                    response.result[i].subdictrict
                                );

                                //insert into healed 
                                healed.push(
                                    response.result[i].healed
                                )

                                //insert into positive 
                                positive.push(
                                    response.result[i].positive
                                )

                                //insert into died 
                                died.push(
                                    response.result[i].died
                                )
                            } 

                            this.series[0].data = healed;
                            this.series[1].data = positive;
                            this.series[2].data = died;

                            this.covidSubdistrictLoading = false;
                        }                                             
                    }).catch((error) => {
                        console.log('error in covid get subdictrict', error);
                    });
            },

            // get data covid district
            getDataCovidDistrict(){
                this.$store.dispatch('healthCovid/getCovidDistrict'
                    ).then((status) => {
                        if(status){
                            let responseZone = this.$store.state.healthCovid.covidDistrictList.result.zone;
                            let responseDistrict = this.$store.state.healthCovid.covidDistrictList.result.district;

                            for (var i=0; i<responseZone.length; i++){
                                this.zonaData.push({
                                    id: responseZone[i].id,
                                    title: responseZone[i].name,
                                    min: responseZone[i].min,
                                    max: responseZone[i].max,
                                    color: responseZone[i].color,
                                });
                            } 

                            for (var i=0; i<responseDistrict.length; i++){
                                this.mapData.push({
                                    title: responseDistrict[i].name,
                                    percent: responseDistrict[i].percent,
                                    image: responseDistrict[i].map,
                                });
                            } 

                            this.covidDistrictLoading = false;
                        }                      
                    }).catch((error) => {
                        console.log('error in covid get district', error);
                    });
            },
        },
        middleware: "router-auth"
    };
    </script>
    
    <template>
    <div>
        <PageHeader :title="title" :items="items" />

        <!-- Preloading -->
        <div v-if="covidCaseLoading" class="row">
            <CovidCivicShimmer />
            <CovidCivicShimmer />
            <CovidCivicShimmer />
            <CovidCivicShimmer />
        </div>

        <!-- After Loading -->
        <div v-else>
            <div class="row">
                <div v-for="data in widgetData" :key="data.title" class="col-xl-3 col-md-3 d-flex">
                    <CovidCivic :id="data.id" :title="data.title" :value="data.value" :text="data.text" :status="data.status" :val="data.val" />
                </div>
            </div>
        </div>

        <!-- Preloading -->
        <div v-if="covidNationLoading" class="row">
            <CovidCentralShimmer/>
            <CovidCentralShimmer/>
        </div>
        
        <!-- After Loading -->
        <div v-else class="row">
            <div v-for="data in centralData" :key="data.title" class="col-md-6 d-flex">
                <CovidCentral :title="data.title" :value="data.value" :icon="data.icon" />
            </div>
        </div>
    
        <div class="card">
            <div class="card-body">
                <h4 class="header-title mb-3 text-center">Pemetaan Kasus Berdasarkan Kelurahan</h4>
                <!-- Bar Chart -->
                <BarChart :height="350"  :categories = "subdistrictCategories" :series ="series"/>
            </div>
        </div>
    
        <div class="card" v-if="!covidDistrictLoading">
            <div class="card-body">
                <h4 class="header-title mb-3 text-center">Zona Wilayah Kecamatan Berdasarkan Warna</h4>
                <div class="row justify-content-center">
                    <!-- <card-shimmer :is-loading="true" /> -->
                    <div v-for="data in zonaData" v-bind:key="data.id" class="col-md-2">
                        <span class="badge text-white" :style="{ background: `${data.color}`}">{{ data.title }}</span> : 
                        <span v-if="data.min === 0">
                            {{ data.max }}
                        </span>
                        <span v-else-if="data.min >= 50">
                            {{ data.min }} lebih
                        </span>
                        <span v-else>
                            {{ data.min }}-{{ data.max }}
                        </span>
                         kasus
                    </div>
                </div>
            </div>
        </div>
        <div class="card" v-if="covidDistrictLoading">
            <div class="card-body">
                <h4 class="header-title"><simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'250px', borderRadius:'8px'}"/></h4>
                <div class="row justify-content-center">
                    <!-- <card-shimmer :is-loading="true" /> -->
                    <!-- <div v-for="data in zonaData" v-bind:key="data.id" class="col-md-2"> -->
                    <div class="col-md-2">
                        <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'80px', borderRadius:'8px'}"/>
                    </div>
                    <div class="col-md-2">
                        <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'80px', borderRadius:'8px'}"/>
                    </div>
                    <div class="col-md-2">
                        <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'80px', borderRadius:'8px'}"/>
                    </div>
                    <div class="col-md-2">
                        <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'80px', borderRadius:'8px'}"/>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="row" v-if="covidDistrictLoading">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body text-center">
                        <h4 class="header-title"><simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/></h4>
                        <h4 class="header-title"><simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'100px', borderRadius:'8px'}"/></h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body text-center">
                        <h4 class="header-title"><simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/></h4>
                        <h4 class="header-title"><simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'100px', borderRadius:'8px'}"/></h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body text-center">
                        <h4 class="header-title"><simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/></h4>
                        <h4 class="header-title"><simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'100px', borderRadius:'8px'}"/></h4>
                    </div>
                </div>
            </div>
        </div>

        <div v-if = !covidDistrictLoading>
            <div class="row">
                <div v-for="data in mapData" v-bind:key="data.title" class="col-md-4">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4 class="header-title">{{ data.title }}</h4>
                            <span class="d-block mb-4 text-success fw-bold">{{ data.percent }} SEMBUH</span>
                            <img :src="data.image" class="img-fluid " />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    