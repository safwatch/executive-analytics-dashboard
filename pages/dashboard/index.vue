<script>
/**
 * Dashboard page
 */
export default {
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    components: {

    },
    mounted(){
        this.checkAuth().then((status) =>{
            if (status == 500){
                this.$nuxt.error({ statusCode: 500, message: 'err message' })
            }else{
                this.getData();
                this.$store.dispatch('notification/clear');
            }
            // this.getCurentFiture(); 
        })
    },
    methods : {
        async checkAuth(){
                return this.$userCheckAuth.checkAuth(this.moduleId);   
        },
        getData(){
            this.$store.dispatch('config/getMainConfig', {
                    id: "MAIN_CONTENT"
                })
                .then((status) => {
                    console.log('status in config', status);
                    if(status){
                        let response = this.$store.state.config.mainPageConfig;

                        this.$router.push(
                                    this.$route.query.redirectFrom || {
                                        path: response.result.value
                                    }
                        );
                    }
                })
                .catch((error) => {
                    console.log('error in get data curent fiture', error);
                });
        },
    },
    data() {
        return {
            moduleId : 'dashboard',
            permissionIndex : false,
            title: "Ringkasan Utama",
            items: [{
                    text: "Sampeu",
                },
                {
                    text: "Ringkasan Utama",
                    active: true,
                },
            ],
        };
    },
    middleware: 'router-auth',
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    
</div>
</template>
