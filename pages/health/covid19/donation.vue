<script>
/**
 * Donation page
 */

import BarChart from "~/components/widgets/covid19/Covid-complaint";
import { userService } from '../../../helpers/auth/user.service';
import SimpleShimmer from "simple-shimmer";

export default {
    head() {
        return {
            title: `${this.title} (Kesehatan) - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    components: {
        SimpleShimmer,
        BarChart
    },
    mounted() {
        this.checkAuth().then((status) =>{
            if (status == 500){
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            }else{
                this.$store.dispatch('notification/clear');
                this.getDataCovidDonation();
                this.getDataCovidDonationYear();
            }
        });        
    },
    data() {
        return {
            moduleId : 'coviddonation',
            permissionIndex : false,
            covidDonationLoading : true,
            series : [
                    {
                        name: 'Layak',
                        data: [],
                        color: '#88CA63'
                    }, 
                    {
                        name: 'Tidak Layak',
                        data: [],
                        color: '#D84542'
                   }
            ],
            year:[],
            title: "Bantuan Covid 19",
            items: [{
                    text: "Sampeu",
                },
                {
                    text: "Kesehatan",
                },
                {
                    text: "Covid 19",
                },
                {
                    text: "Bantuan",
                    active: true,
                },
            ],
            widgetData: [],
        };
    },
    methods : {
        async checkAuth(){
            return this.$userCheckAuth.checkAuth(this.moduleId);   
        },
        //data covid case
        getDataCovidDonation(){
                this.$store.dispatch('healthCovid/getCovidDonation'
                    ).then((status) => {
                        if(status){
                            let response = this.$store.state.healthCovid.covidDonationList;

                            this.widgetData = [{
                                                id: 1,
                                                title: "Total Pengaduan",
                                                value: response.result.total,
                                                class: ""
                                            },
                                            {
                                                id: 2,
                                                title: "Pengaduan Layak",
                                                value: response.result.worthy,
                                                class: "text-success"
                                            },
                                            {
                                                id: 3,
                                                title: "Pengaduan Tidak Layak",
                                                value: response.result.not_worthy,
                                                class: "text-danger"
                                            }];
                                            
                            this.covidDonationLoading = false;
                        }
                    }).catch((error) => {
                        console.log('error in covid get recap', error);
                    });
            },
        //data covid case
        getDataCovidDonationYear(){
            this.$store.dispatch('healthCovid/getCovidDonationYear'
                    ).then((status) => {
                        if(status){
                            let response = this.$store.state.healthCovid.covidDonationYearList;

                            let worthy = [];
                            let not_worthy = [];

                            for (var i=0; i<response.result.length; i++){
                                this.year.push(
                                    response.result[i].year
                                );

                                //insert into worthy 
                                worthy.push(
                                    response.result[i].worthy
                                )

                                //insert into not worthy 
                                not_worthy.push(
                                    response.result[i].not_worthy
                                )
                            } 

                            this.series[0].data = worthy;
                            this.series[1].data = not_worthy;

                        }
                    }).catch((error) => {
                        console.log('error in covid get worthy', error);
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
        <div class="col-md-3" v-if="covidDonationLoading">
            <div class="card">
                <div class="card-body text-center">
                    <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                    <simple-shimmer :style="{height:'20px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                    <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                </div>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                    <simple-shimmer :style="{height:'20px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                    <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                </div>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                    <simple-shimmer :style="{height:'20px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                    <simple-shimmer :style="{height:'12px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'150px', borderRadius:'8px'}"/>
                </div>
            </div>
        </div>  

        <div class="col-md-3" v-else>
            <div class="card" v-for="data in widgetData" :key="data.id">
                <div class="card-body text-center">
                    <small>Jumlah Data</small>
                    <h3 class="mt-2" :class="data.class">{{ data.value }}</h3>
                    <p class="text-muted mb-0">{{ data.title }}</p>
                </div>
            </div>
        </div>  
        <div class="col-md-9">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3 text-center">Jumlah Pengaduan Dari Tahun Ke Tahun</h4>
                    <!-- Bar Chart -->
                    <BarChart :height="350" :categories = "year" :series ="series"/>
                </div>
            </div>
        </div> 
    </div>

</div>
</template>
