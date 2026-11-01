<script>
/**
 * Auth-layout
 */
export default {
    data() {
        return {
            scrollPosition: null,
            activeMenu: 'login'
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY
        },
        handleScroll() {
            const els = document.querySelectorAll('#topic')
            els.forEach((el) => {
                const elTop = el.getBoundingClientRect().top
                const elBottom = el.getBoundingClientRect().bottom
                console.log(elBottom)
                if (elTop >= 0 || elBottom <= 0) {
                    // this.isActive = false
                } if (elTop <= 0 && elBottom >= 0) {
                    // this.isActive = true
                    this.activeMenu = 'login'
                }
            })

        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<template>
    <div id="nav-scroller">
        <!-- <div class="account-pages mt-5 mb-5">
        <div class="container">
            <Nuxt />
        </div>
    </div> -->

        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" :class="{ 'bg-primary': scrollPosition > 100 }"
            v-b-scrollspy:nav-scroller>
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="~/assets/images/executive-analytics/executive-analytics-white-text.png" alt="Logo Executive Analytics" height="80" />
                </a>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <ul class="navbar-nav ml-auto navbar-nav-scroll">
                        <!-- <li class="nav-item px-1" v-bind:class="[ activeMenu === 'login' ? 'active' : '' ]">
                        <a class="nav-link" href="#">Masuk Sistem <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item px-1">
                        <a class="nav-link" href="#topic">Kategori Topik</a>
                    </li>
                    <li class="nav-item px-1">
                        <a class="nav-link" href="#about">Tentang</a>
                    </li> -->
                        <!-- <li class="nav-item px-1">
                        <a class="btn btn-rounded btn-white" href="#">Masuk Sistem <span class="sr-only">(current)</span></a>
                    </li> -->
                    </ul>
                </b-collapse>
            </div>
        </nav>

        <!-- Content -->
        <section class="auth-hero">
            <div class="container h-100">
                <div class="row align-items-center h-100 auth-hero-content">
                    <div class="col-md-6 h-100 align-items-center d-none d-md-flex">
                        <div class="w-100">
                            <!-- <img src="~/assets/images/civic/logo.png" alt="Logo Civic" height="128" class="mb-2" /> -->
                            <h1 class="display-4 font-weight-bold text-white mb-3">Saluyu Ngawangun Jati Mandiri</h1>
                            <h4 class="text-white font-weight-normal">Sistem Informasi Pemerintah Eksekutif Umum Kota
                                Civic berperan aktif dalam perkembangan membangun Civic Administration.</h4>
                        </div>
                    </div>
                    <div class="col-md-5 h-100 d-flex align-items-center ml-auto">
                        <div class="card w-100 mx-md-3">
                            <!-- <div class="card-header py-3">
                            <h3 class="text-center text-white">Masuk Sistem</h3>
                            <p class="text-white mb-0 text-center">Masukan alamat email dan kata sandi yang anda miliki untuk mengakses sistem.</p>
                        </div> -->
                            <div class="card-body m-3">
                                <Nuxt />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- <div class="auth-hero-divider"></div> -->

        <!-- <section class="py-5" id="topic">
        <div class="container">
            <h2 class="text-center">Kategori Topik</h2>
            <p class="text-center">Lorem Ipsum is simply dummy text</p>
            <div class="row mt-4 justify-content-center">
                <div class="col-md-3 mb-3">
                    <div class="card mx-2">
                        <div class="card-body text-center">
                            <i class="ri-pencil-ruler-2-line text-primary" style="font-size: 3em;"></i>
                            <h4>Pendidikan</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card mx-2">
                        <div class="card-body text-center">
                            <i class="ri-hospital-line text-primary" style="font-size: 3em;"></i>
                            <h4>Kesehatan</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card mx-2">
                        <div class="card-body text-center">
                            <i class="ri-road-map-line text-primary" style="font-size: 3em;"></i>
                            <h4>Tata Ruang</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card mx-2">
                        <div class="card-body text-center">
                            <i class="ri-community-line text-primary" style="font-size: 3em;"></i>
                            <h4>Permukiman</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card mx-2">
                        <div class="card-body text-center">
                            <i class="ri-user-heart-line text-primary" style="font-size: 3em;"></i>
                            <h4>Sosial</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card mx-2">
                        <div class="card-body text-center">
                            <i class="ri-briefcase-4-line text-primary" style="font-size: 3em;"></i>
                            <h4>Tenaga Kerja</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card mx-2">
                        <div class="card-body text-center">
                            <i class="ri-folder-user-line text-primary" style="font-size: 3em;"></i>
                            <h4>Kependudukan</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

        <section class="py-5 bg-white" id="about">
            <div class="container">
                <div class="row align-items-center mb-0">
                    <div class="col-md-6">
                        <img src="~/assets/images/sie/illustration-sie.png" width="90%" alt />
                    </div>
                    <div class="col-md-6">
                        <h2 class="mb-3">Tetang <span class="text-primary">Sistem Informasi Eksekutif</span></h2>
                        <p>merupakan alat visual yang digunakan oleh eksekutif tingkat OPD untuk memantau KPI dan metrik
                            indeks hasil pekerjaan penting guna memandu aktivitas pemerintah kota secara efektif. Tujuan
                            dari dasbor eksekutif adalah untuk memberikan gambaran menyeluruh kepada Kepala OPD dan
                            eksekutif lainnya tentang kinerja pemerintah kota Civic.</p>
                        <p>Hal ini dapat dilakukan dengan memberikan ringkasan eksekutif informasi & data teratas di
                            seluruh OPD, atau dengan menyediakan dasbor pelaporan tingkat tinggi untuk setiap departemen
                            di Pemerintah Civic Administration.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section class="bg-white pb-5">
        <div class="container text-center">
            <div>&copy; 2023. <a href="https://civickota.go.id" title="">Pemerintah Daerah Civic Administration</a>. Sistem Informasi Pemerintah Eksekutif Umum</div>
        </div>
    </section> -->

        <!-- Footer -->
        <footer class="py-5">
            <div class="container">
                <div class="row equal align-items-center">
                    <div class="col-md-5">
                        <a class="navbar-brand d-flex align-items-center" href="#">
                            <img src="~/assets/images/executive-analytics/logo-sm.png" alt="CIMAHI Executive Analytics" height="60px"
                                class="d-inline-block align-text-top">
                        </a>
                        <p class="mt-3">Executive Analytics dikembangkan oleh Tim Pengembangan Aplikasi, Bidang Penyelengara
                            E-Government dan Persandian, Dinas Komunikasi dan Informatika Civic Administration.</p>
                        <p class="text-muted">Copyright 2022 - 2025. Pemerintah Daerah Civic Administration</p>
                    </div>
                    <div class="col-md-5 ml-auto">
                        <p>Didukung oleh:</p>
                        <a href="https://civickota.go.id/" class="mr-3" target="blank">
                            <img src="~/assets/images/civic/civic-logo.png" alt="Logo Civic Administration" height="60px">
                        </a>
                        <a href="https://smartcity.civickota.go.id/" target="blank">
                            <img src="~/assets/images/civic/smartcity-logo.png" alt="Logo Smart City" height="60px">
                        </a>
                    </div>
                </div>
            </div>
        </footer>
        <!-- / Footer / -->
        <!-- end page -->
    </div>
</template>
