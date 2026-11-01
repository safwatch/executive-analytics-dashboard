<script>
/**
 * Vacccine page
 */

import BarChart from "~/components/widgets/covid19/Covid-vaccine";

export default {
    head() {
        return {
            title: `${this.title} (Kesehatan) - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    components: {
        BarChart
    },
    mounted() {
            this.checkAuth().then((response) =>{
                if (response.status == 'ERROR'){
                    this.$nuxt.error({ statusCode: 500, message: 'err message' })
                }
            });
    },
    data() {
        return {
            moduleId : 'covidvaccine',
            permissionIndex : false,
            title: "Vaksinasi Covid 19",
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
                    text: "Vaksinasi",
                    active: true,
                },
            ],
            widgetData: [{
                    id: 1,
                    title: "Vaksinasi Dosis 1",
                    value: "16093",
                    class: "text-warning"
                },
                {
                    id: 2,
                    title: "Vaksinasi Dosis 2",
                    value: "13500",
                    class: "text-primary"
                },
                {
                    id: 3,
                    title: "Vaksinasi Dosis 3",
                    value: "3500",
                    class: "text-success"
                },
                {
                    id: 4,
                    title: "Target Sasaran",
                    value: "12965",
                    class: ""
                },
            ],
        };
    },
    methods: {
        async checkAuth(){
                return this.$userCheckAuth.checkAuth(this.moduleId);   
            },
        formatThousand(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
    middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <!-- Card Deck -->
    <div class="row">
        <div class="col-md-3" v-for="data in widgetData">
            <div class="card">
                <div class="card-body text-center">
                    <small>Total (Orang)</small>
                    <h3 class="mt-2" :class="data.class">{{ formatThousand(data.value) }}</h3>
                    <p class="text-muted mb-0">{{ data.title }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <h4 class="header-title mb-3 text-center">Pemetaan Vaksin Dosis 1,2 dan 3 Berdasarkan Target</h4>
            <!-- Bar Chart -->
            <BarChart :height="350" />
        </div>
    </div>
</div>
</template>
