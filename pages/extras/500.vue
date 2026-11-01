<script>
/**
 * Error-500 component
 */
export default {
    head() {
        return {
            title: `Error 500 - Sistem Informasi Pemerintah Eksekutif Umum`
        }
    },
    data() {
        return {}
    },
    layout: 'error'
}
</script>

<template>
<div class="row justify-content-center mt-5">
    <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">

            <div class="card-body p-4">

                <div class="text-center mt-4">
                    <h1 class="text-error">500</h1>
                    <h3 class="mt-3 mb-2">Terjadi Kesalahan</h3>
                    <p class="text-muted mb-3">Silahkan coba kembali beberapa saat lagi</p>

                    <nuxt-link to="/" class="btn btn-primary mt-3"><i class="mdi mdi-reply mr-1"></i> Kembali</nuxt-link>
                </div>

            </div> <!-- end card-body -->
        </div>
        <!-- end card -->

    </div> <!-- end col -->
</div>
<!-- end row -->
</template>
