<script>
import {required} from "vuelidate/lib/validators";
/**
 * System level page
 */
export default {
    head() {
        return {
            title: `${this.title} Pengguna - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
        };
    },
    mounted() {
        this.getData();
    },
    data() {
        return {
            tryToSend: false,
            title: "Profil",
            name : '-',
            username : '-',
            email : '-',
            phone : '-',
            role : '-',
            items: [
                {
                    text: "Sampeu",
                },
                {
                    text: "Pengguna",
                },
                {
                    text: "Profil",
                    active: true,
                },
            ]
        }
    },
    methods :{
        getData(){
            this.$store.dispatch('authstate/getProfile', {}).then(() => {
                let response = this.$store.state.authstate.profile;
                this.name =  response.result.name;
                this.username =  response.result.username;
                this.email =  response.result.email;
                this.phone =  response.result.phone;
                this.role =  response.result.role;
               
            })
            .catch((error)=>{
                console.log('on get profile error', error);
            });
        }
    },
    middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
        <div class="col-md-5">
            <div class="card">
                <div class="card-body">
                    <div class="text-center mb-3">
                        <img src="~/assets/images/users/sie-user.jpg" alt="user-image" class="rounded-circle" width="128" />
                         <h4 class="mb-0 mt-3">{{name}}</h4>
                         <span class="text-muted">{{role}}</span>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-5"><b>Nama Pengguna</b></div>
                        <div class="col-md-7">: {{username}}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-5"><b>No. Ponsel</b></div>
                        <div class="col-md-7">: {{phone}}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-md-5"><b>Email</b></div>
                        <div class="col-md-7">: {{email}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
