<template>
    <!-- shimmer -->
    <div v-if="isMetricLoading || !metricData" class="widget-simple text-center card">
        <div class="card-body">
            <div class="card-head-title position-relative">
                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
            </div>
            <div class="d-flex justify-content-center">
                <div class="boxed-section col-lg-6 pt-2">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'" :borderRadius="'8px'" />
                </div>
                <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                <div class="boxed-section col-lg-6 py-2">
                    <div class="text-left">
                        <div class="d-flex gap-2">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'39px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex mt-1  gap-2 pt-3">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'39px'" :borderRadius="'8px'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end of shimmer -->
    <div v-else class="widget-simple text-center card">
        <div class="card-body">
            <div class="card-head-title position-relative">
                <h4 class="card-head text-muted mt-0">Sebaran Pasar</h4>
                <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                    <a href="javascript:void(0);" id="pengendalian-inflasi" class="text-muted" variant="light">
                        <i class="fa fa-info-circle"></i>
                    </a>

                    <b-popover target="pengendalian-inflasi" triggers="hover" placement="right"
                        custom-class="custom-popover">
                        <template v-slot:title>
                            Total Pasar
                        </template>
                        <div>
                            Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                            periode satu
                            tahun. Ini
                            adalah cara untuk
                            menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan
                            indeks
                            harga
                            konsumen (CPI) atau
                            indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan
                            atau kuartal
                            yang sama
                            pada tahun
                            sebelumnya.
                        </div>
                    </b-popover>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="boxed-section col-lg-6 py-4 bg-light border border-1 rounded">
                        <h3 class="text-muted font-13 counter mt-0">Total Pasar</h3>
                        <h2 class="text-muted m-0"><span><span>
                            {{ totalPasar }}
                                </span></span></h2>
                    </div>
                    <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                    <div class="boxed-section col-lg-6 py-2 rounded px-0 d-flex align-items-center">
                        <div class="text-left">
                            <div class="d-flex gap-2">
                                <div class="flex-shrink-0">
                                    <svg id="fi_9697055" enable-background="new 0 0 512 512" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 139.781c-13.213 0-25.876 5.619-34.742 15.416-8.865 9.796-13.195 22.955-11.881 36.101 1.85 18.5 1.455 14.549 3.299 32.994 2.235 22.353 20.861 39.208 43.324 39.208s41.089-16.855 43.324-39.208c1.842-18.423 1.447-14.472 3.299-32.993 1.314-13.146-3.016-26.305-11.881-36.102-8.866-9.797-21.529-15.416-34.742-15.416zm0 15c9.115 0 17.504 3.723 23.62 10.48 4.788 5.291 7.585 11.782 8.139 18.703l-4.99-4.99c-5.345-5.344-13.49-6.645-20.269-3.234-4.072 2.049-8.932 2.049-13.002 0-6.776-3.408-14.923-2.109-20.269 3.234l-4.99 4.99c.554-6.921 3.351-13.412 8.139-18.703 6.118-6.758 14.507-10.48 23.622-10.48zm28.398 68.019c-1.466 14.651-13.674 25.7-28.398 25.7s-26.933-11.049-28.398-25.7l-1.907-19.075 14.144-14.143c.76-.76 1.933-.937 2.92-.441 8.291 4.171 18.19 4.171 26.483 0 .988-.496 2.161-.32 2.921.441l14.144 14.143z"></path><path d="m419.344 357.219h-.531v-185.775c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v185.774h-16.063v-233.5h8.987c2.424 0 4.791-.252 7.075-.73v13.456c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-20.733c7.588-6.334 12.425-15.859 12.425-26.493v-16.486c0-4.293-.899-8.454-2.671-12.369-.009-.02-.017-.039-.026-.059-1.494-3.283-3.544-6.239-6.09-8.786l-42.731-42.732c-5.667-5.666-13.2-8.786-21.214-8.786h-205.01c-8.014 0-15.547 3.12-21.214 8.786l-42.732 42.733c-2.546 2.547-4.596 5.503-6.09 8.786-.009.02-.017.039-.026.059-1.772 3.915-2.671 8.076-2.671 12.369v16.486c0 10.634 4.836 20.159 12.425 26.493v241.507h-.531c-8.271 0-15 6.729-15 15v16.062c0 8.271 6.729 15 15 15h.531v101.219c0 4.143 3.357 7.5 7.5 7.5h310.625c4.143 0 7.5-3.357 7.5-7.5v-101.219h.531c8.271 0 15-6.729 15-15v-16.062c.001-8.272-6.728-15-14.999-15zm-46.594 0h-31.594v-35.185c0-23.419-19.053-42.472-42.472-42.472h-85.369c-23.419 0-42.472 19.053-42.472 42.472v35.185h-31.593v-233.5h5.881c10.922 0 20.674-5.102 27-13.047 6.326 7.945 16.078 13.047 27 13.047h29.869c10.922 0 20.674-5.102 27-13.047 6.326 7.945 16.078 13.047 27 13.047h29.869c10.922 0 20.674-5.102 27-13.047 6.326 7.945 16.078 13.047 27 13.047h5.881zm-70.156-31.1c-4.143 0-7.5 3.357-7.5 7.5v23.6h-16.062v-62.656h19.653c15.147 0 27.472 12.324 27.472 27.472v35.185h-16.062v-23.6c-.001-4.143-3.359-7.501-7.501-7.501zm-85.688 31.1v-23.6c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v23.6h-16.062v-35.185c0-15.147 12.324-27.472 27.472-27.472h19.653v62.656h-16.063zm47.125-46.594h-16.062v-16.062h16.062zm-16.062 15h16.062v31.594h-16.062zm-43.246-310.625h43.777v40.912h-64.234zm102.554 0 20.457 40.912h-64.234v-40.912zm-127.646 55.912h68.869v18.307c0 10.752-8.748 19.5-19.5 19.5h-29.869c-10.752 0-19.5-8.748-19.5-19.5zm83.869 0h68.869v18.307c0 10.752-8.748 19.5-19.5 19.5h-29.869c-10.752 0-19.5-8.748-19.5-19.5zm103.369 37.807c-10.752 0-19.5-8.748-19.5-19.5v-18.307h68.759c.072.601.109 1.208.109 1.82v16.486c0 10.752-8.748 19.5-19.5 19.5h-29.868zm-8.364-93.719c4.007 0 7.773 1.561 10.606 4.394l36.519 36.519h-61.125l-20.457-40.913zm-215.616 4.394c2.833-2.833 6.6-4.394 10.606-4.394h34.457l-20.457 40.912h-16.582c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h13.717v18.307c0 10.752-8.748 19.5-19.5 19.5h-29.868c-10.752 0-19.5-8.748-19.5-19.5v-16.487c0-.612.037-1.22.109-1.82h20.042c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-9.544zm-34.701 103.595c2.284.478 4.651.73 7.075.73h8.987v233.5h-16.062zm311.156 265.292h-269.114c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h253.582v93.719h-295.624v-93.719h6.043c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-21.575v-16.062h326.688z"></path><path d="m294.562 480.938h78.188c8.271 0 15-6.729 15-15v-31.594c0-8.271-6.729-15-15-15h-78.188c-8.271 0-15 6.729-15 15v31.594c0 8.271 6.729 15 15 15zm0-46.594h78.188l.01 31.594c-4.584 0-73.569 0-78.197 0v-31.594z"></path></g></svg>
                                </div>
                                <div class="flex-grow-1 ms-2 text-muted">
                                    Pedagang : <b>{{totalJumlahPedagangKios}}</b>
                                </div>
                            </div>
                            <div class="d-flex mt-2  gap-2 border-top pt-3">
                                <div class="flex-shrink-0">
                                    <svg id="fi_3275219" enable-background="new 0 0 512 512" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m465.533 118.618v-10.102h-.006c0-.855-.14-1.714-.438-2.541l-36.366-101.016c-1.071-2.975-3.894-4.959-7.056-4.959h-331.334c-3.163 0-5.985 1.984-7.057 4.959l-36.365 101.017c-.297.826-.438 1.686-.438 2.541h-.006v10.102c0 14.247 6.259 27.054 16.163 35.837v43.615c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-34.571c5.215 1.952 10.856 3.026 16.744 3.026.195 0 .387-.012.581-.015v127.45h-17.325v-60.89c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v60.89h-8.66c-4.142 0-7.5 3.358-7.5 7.5v32.32c0 4.142 3.358 7.5 7.5 7.5h8.66v163.219c0 4.142 3.358 7.5 7.5 7.5h371.74c4.142 0 7.5-3.358 7.5-7.5v-85.86c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v78.36h-49.65v-155.72h49.65v42.36c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-42.36h8.66c4.142 0 7.5-3.358 7.5-7.5v-32.32c0-4.142-3.358-7.5-7.5-7.5h-8.66v-139.505c9.904-8.783 16.163-21.59 16.163-35.837zm-47.907 32.906c-18.145 0-32.906-14.762-32.906-32.907v-2.602h65.813v2.602c0 18.146-14.762 32.907-32.907 32.907zm-47.906-50.508h-65.813v-86.016h65.813zm-80.813 0h-65.813v-86.016h65.813zm-80.814 0h-65.813v-86.016h65.813zm-65.813 15h65.813v2.602c0 18.145-14.762 32.907-32.906 32.907-18.145 0-32.907-14.762-32.907-32.907zm80.813 0h65.813v2.602c0 18.145-14.762 32.907-32.907 32.907s-32.907-14.762-32.907-32.907v-2.602zm80.814 0h65.813v2.602c0 18.145-14.762 32.907-32.907 32.907s-32.906-14.762-32.906-32.907zm143.454-15h-62.641v-86.016h31.676zm-351.757-86.016h31.676v86.016h-62.641zm-34.137 103.618v-2.602h65.813v2.602c0 18.145-14.762 32.907-32.906 32.907-18.145-.001-32.907-14.762-32.907-32.907zm48.488 45.291c10.32-3.56 19.048-10.549 24.825-19.604 8.513 13.344 23.438 22.22 40.407 22.22 16.968 0 31.893-8.875 40.406-22.22 8.513 13.344 23.438 22.22 40.407 22.22s31.893-8.875 40.407-22.22c8.513 13.344 23.438 22.22 40.406 22.22 16.969 0 31.893-8.875 40.407-22.22 5.777 9.055 14.505 16.044 24.825 19.604v130.051h-17.325v-38.97c0-4.142-3.358-7.5-7.5-7.5h-242.44c-4.142 0-7.5 3.358-7.5 7.5v38.97h-17.325zm-32.325 177.371h49.651v155.72h-49.651zm211.277 121.222v34.498h-65.813v-34.498zm-99.578-15c-1.435 0-2.602-1.167-2.602-2.602v-52.528c0-1.435 1.167-2.602 2.602-2.602h133.342c1.435 0 2.602 1.167 2.602 2.602v52.528c0 1.435-1.167 2.602-2.602 2.602zm33.765-72.731v-33.491h65.813v33.491zm-15 0h-18.765c-9.706 0-17.602 7.896-17.602 17.602v52.527c0 9.706 7.896 17.602 17.602 17.602h18.765v34.498h-65.812v-155.72h65.812zm161.626 122.229h-65.813v-34.498h18.764c9.706 0 17.602-7.896 17.602-17.602v-52.528c0-9.706-7.896-17.602-17.602-17.602h-18.764v-33.49h65.813zm80.81-170.72h-389.06v-17.32h257.84c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-177.03v-31.47h227.44v31.47h-15.41c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h96.22zm-16.16-32.32h-17.325v-127.45c.194.002.386.015.581.015 5.888 0 11.529-1.074 16.744-3.026z"></path></g></svg>
                                </div>
                                <div class="flex-grow-1 ms-2 text-muted">
                                    LOS : <b>{{totalJumlahPedagangLos}}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
export default {
    props: {
        isMetricLoading: {
            type: Boolean,
            required: true
        },
        metricData: {
            type: Array,
            required: true,
            default: [],
        },
        metricStatus: {
            type: String,
            required: true,
            default: "",
        },
    },
    computed: {
        // Accessing marketSpreadMetric from the Vuex store
        marketSpreadMetric() {
            return this.metricData || [];
        },
        totalPasar() {
            return this.marketSpreadMetric.length; // Count the total number of markets
        },
        totalJumlahPedagangLos() {
            // Calculate the total number of traders in los
            return this.marketSpreadMetric.reduce((total, market) => {
                return total + (parseInt(market.jumlah_pedagang_los) || 0);
            }, 0);
        },
        totalJumlahPedagangKios() {
            // Calculate the total number of traders in kios
            return this.marketSpreadMetric.reduce((total, market) => {
                return total + (parseInt(market.jumlah_pedagang_kios) || 0);
            }, 0);
        },
    },
}
</script>