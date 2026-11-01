<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <!-- shimmer -->
                <div v-if="isLoading" class="card card-animate">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="w-100">
                                <h2 class="my-3 ff-secondary fw-semibold d-flex justify-content-center">
                                    <SieShimmer :shape="'rectangle'" :width="'65px'" :height="'55px'"
                                        :borderRadius="'8px'" />
                                </h2>
                                <div class="d-flex justify-content-between  flex-row-reverse mt-4">
                                    <div class="align-self-center">
                                        <SieShimmer :shape="'rectangle'" :width="'50px'" :height="'20px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div> <!-- end card-->
                <!-- end of shimmer  -->
                <!-- card -->
                <div v-else class="card card-animate card-danger">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <h4 class="card-head text-muted mt-0">Indeks Inflasi Bulanan (MtM)<br />&nbsp;</h4>
                            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                                <a href="javascript:void(0);" id="mtm-popover" class="text-muted" variant="light">
                                    <i class="fa fa-info-circle"></i>
                                </a>
                                <b-popover target="mtm-popover" triggers="hover" placement="right"
                                    custom-class="custom-popover">
                                    <template v-slot:title>
                                        Month to Month (MtM)
                                    </template>
                                    <div>
                                        Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa
                                        selama
                                        periode satu tahun. Ini
                                        adalah cara untuk
                                        menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan
                                        membandingkan
                                        indeks harga
                                        konsumen (CPI) atau
                                        indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan
                                        bulan
                                        atau kuartal yang sama
                                        pada tahun
                                        sebelumnya.
                                    </div>
                                </b-popover>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between w-100">
                            <div class="w-100">
                                <div style="z-index:2" class="position-relative">
                                    <h2 class="mt-2 ff-secondary fw-semibold text-center">
                                        <span class="counter-value" data-target="28.05"
                                            style="line-height:34px">1,7</span>
                                    </h2>
                                    <div class="d-flex flex-row-reverse">
                                        <div class="align-self-center">
                                            <span class="badge bg-light text-success mb-0"> <i
                                                    class="ri-arrow-up-line align-middle"></i>
                                                10.05 %
                                            </span>
                                        </div>
                                        <div class="ml-2" style="visibility: hidden;">
                                            <p class="mb-0 text-muted"> Dibanding bulan sebelumnya</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="viz-small">
                                    <!-- sparkline total sales chart -->
                                    <apexchart class="apex-charts" type="area" height="90" :series="vizcharts.series"
                                        :options="vizcharts.chartOptions">
                                    </apexchart>
                                </div>
                            </div>
                            <div class="align-self-center">

                            </div>
                        </div>
                    </div><!-- end card body -->
                </div> <!-- end card-->
            </div> <!-- end col-->

            <div class="col-md-3">
                <div v-if="isLoading" class="card card-animate">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="boxed-section col-lg-12 p-0 pr-1 pt-2">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="card card-animate card-danger">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <h4 class="card-head text-muted mt-0">Operasi Pasar Murah </h4>
                            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                                <a href="javascript:void(0);" id="opm-popover" class="text-muted" variant="light">
                                    <i class="fa fa-info-circle"></i>
                                </a>

                                <b-popover target="opm-popover" triggers="hover" placement="right"
                                    custom-class="custom-popover">
                                    <template v-slot:title>
                                        Operasi Pasar Murah
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
                                <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded">
                                    <h3 class="text-muted font-13 counter mt-0">Bulan Januari: </h3>
                                    <h2 class="text-muted m-0"><span><span>
                                                6
                                            </span></span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- end card-->

            <div class="col-md-3">
                <div v-if="isLoading" class="card card-animate">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="boxed-section col-lg-12 p-0 pr-1 pt-2">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="card card-animate card-danger">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <h4 class="card-head text-muted mt-0">Pemantauan Pasar </h4>
                            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                                <a href="javascript:void(0);" id="pemantauan-pasar" class="text-muted" variant="light">
                                    <i class="fa fa-info-circle"></i>
                                </a>

                                <b-popover target="pemantauan-pasar" triggers="hover" placement="right"
                                    custom-class="custom-popover">
                                    <template v-slot:title>
                                        Pemantauan Pasar
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
                                <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded">
                                    <h3 class="text-muted font-13 counter mt-0">Kegiatan: </h3>
                                    <h2 class="text-muted m-0"><span><span>
                                                9
                                            </span></span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- end card-->

            <div class="col-md-3">
                <!-- shimmer -->
                <div v-if="isLoading" class="card card-animate">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="w-100">
                                <h2 class="my-3 ff-secondary fw-semibold d-flex justify-content-center">
                                    <SieShimmer :shape="'rectangle'" :width="'65px'" :height="'55px'"
                                        :borderRadius="'8px'" />
                                </h2>
                                <div class="d-flex justify-content-between  mt-4">
                                    <SieShimmer :shape="'rectangle'" :width="'150px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                    <div class="align-self-center">
                                        <SieShimmer :shape="'rectangle'" :width="'50px'" :height="'20px'"
                                            :borderRadius="'8px'" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div> <!-- end card-->
                <!-- end of shimmer  -->
                <!-- card -->
                <div v-else class="card card-animate card-danger">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <h4 class="card-head text-muted mt-0">Penerima Beras <br /> CPPD</h4>
                            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                                <a href="javascript:void(0);" id="iph-popover" class="text-muted" variant="light">
                                    <i class="fa fa-info-circle"></i>
                                </a>
                                <b-popover target="iph-popover" triggers="hover" placement="right"
                                    custom-class="custom-popover">
                                    <template v-slot:title>
                                        Indeks Perkembangan Harga (IPH)
                                    </template>
                                    <div>
                                        Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa
                                        selama
                                        periode satu tahun. Ini
                                        adalah cara untuk
                                        menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan
                                        membandingkan
                                        indeks harga
                                        konsumen (CPI) atau
                                        indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan
                                        bulan
                                        atau kuartal yang sama
                                        pada tahun
                                        sebelumnya.
                                    </div>
                                </b-popover>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between w-100">
                            <div class="w-100">
                                <div style="z-index:2" class="position-relative">
                                    <h2 class="mt-2 ff-secondary fw-semibold text-center">
                                        <span class="counter-value" style="line-height:34px">76</span>
                                    </h2>
                                    <div class="d-flex flex-row-reverse">
                                        <div class="align-self-center">
                                            <span class="badge bg-light text-success mb-0"> <i
                                                    class="ri-arrow-up-line align-middle"></i>
                                                2.05 %
                                            </span>
                                        </div>
                                        <div class="ml-2">
                                            <p class="mb-0 fs-12 pl-0 text-muted"> Dibanding bulan sebelumnya</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="viz-small">
                                    <!-- sparkline total sales chart -->

                                </div>
                            </div>
                            <div class="align-self-center">

                            </div>
                        </div>
                    </div><!-- end card body -->
                </div> <!-- end card-->
            </div> <!-- end col-->


        </div> <!-- end row-->
        <div class="row">
            <div class="col-xl-6">
                <!-- shimmer -->
                <div v-if="isLoading" class="card card-height-100">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div>
                    <div class="card-body pt-3 h-100 px-4">
                        <div class="row filter-card d-flex flex-row-reverse px-2">
                            <div class="tab-content col-xl-12 pt-1">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
                <!-- end of shimmer -->
                <div v-else class="card card-height-100 card-danger bg-transparent">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <h4 class="card-title mb-0 flex-grow-1 text-muted">Tren Indeks Perkembangan Harga</h4>
                        <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                            <a href="javascript:void(0);" id="tren-rerata-popover" class="text-muted" variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>
                            <b-popover target="tren-rerata-popover" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Tren Indeks Perkembangan Harga
                                </template>
                                <div>
                                    Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                                    periode satu tahun. Ini
                                    adalah cara untuk
                                    menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan
                                    indeks harga
                                    konsumen (CPI) atau
                                    indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan
                                    atau kuartal yang sama
                                    pada tahun
                                    sebelumnya.
                                </div>
                            </b-popover>
                        </div>
                    </div>
                    <div class="card-body pt-3">
                        <div class="row filter-card d-flex flex-row-reverse">
                            <div class="card-content col-xl-12">
                                <!-- Inflasi content -->
                                <div class="col-xl-12 px-0">
                                    <apexchart class="apex-charts" height="380" type="line"
                                        :series="linewithDataChart.series" :options="linewithDataChart.chartOptions">
                                    </apexchart>
                                </div>
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
            </div>
            <div class="col-xl-6">
                <!-- shimmer -->
                <div v-if="isLoading" class="card card-height-100">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div>
                    <div class="card-body pt-3 h-100 px-4">
                        <div class="row filter-card d-flex flex-row-reverse px-2">
                            <div class="tab-content col-xl-12 pt-1">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
                <!-- end of shimmer -->
                <div v-else class="card card-height-100 card-danger bg-transparent">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <h4 class="card-title mb-0 flex-grow-1 text-muted">Pemantauan HET 20 Komoditas</h4>
                        <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                            <a href="javascript:void(0);" id="tren-rerata-popover" class="text-muted" variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>
                            <b-popover target="tren-rerata-popover" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Pemantauan HET 20 Komoditas
                                </template>
                                <div>
                                    Metrik yang digunakan untuk mengukur perubahan harga barang dan jasa selama
                                    periode satu tahun. Ini
                                    adalah cara untuk
                                    menilai tingkat inflasi dari satu tahun ke tahun berikutnya dengan membandingkan
                                    indeks harga
                                    konsumen (CPI) atau
                                    indeks harga lainnya dari satu bulan atau kuartal pada tahun ini dengan bulan
                                    atau kuartal yang sama
                                    pada tahun
                                    sebelumnya.
                                </div>
                            </b-popover>
                        </div>
                    </div>
                    <div class="card-body pt-3">
                        <div class="row filter-card d-flex flex-row-reverse">
                            <div class="card-content col-xl-12">
                                <!-- Inflasi content -->
                                <div class="col-xl-12 px-0">
                                    <apexchart class="apex-charts" height="380" type="area"
                                        :series="linewithDataChart2.series" :options="linewithDataChart2.chartOptions">
                                    </apexchart>
                                </div>
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="row justify-content-between d-flex pb-3">
            <div class="d-flex pt-2 pb-4 col col-lg-12 justify-content-between">
                <SieShimmer :shape="'rectangle'" :width="'25%'" :height="'20px'" :borderRadius="'8px'" />
                <div class="tabs d-flex gap-2">
                    <SieShimmer :shape="'rectangle'" :width="'30px'" :height="'30px'" :borderRadius="'8px'" />
                    <SieShimmer :shape="'rectangle'" :width="'30px'" :height="'30px'" :borderRadius="'8px'" />
                </div>
            </div>

            <div class="col col-xl-4">
                <div class="card card-limit">
                    <div class="card-header bg-white align-items-center d-flex w-75">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div><!-- end card header -->
                    <div class="card-body pt-0 px-0">
                        <div class="col-xl-12 px-4">
                            <SieShimmer :shape="'rectangle'" :width="'215px'" :height="'29px'" :borderRadius="'6px'" />
                        </div>
                        <div class="col-xl-12 px-4 mt-2">
                            <SieShimmer :shape="'rectangle'" :width="'60px'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex align-items-center position-relative">
                            <ul class="list-group list-group-flush border-solid w-75 px-4">
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                            </ul><!-- end -->
                            <div
                                class="commodity-image bg-light rounded-circle d-flex align-items-center justify-content-center">
                                <SieShimmer :shape="'circle'" :width="'40px'" :height="'40px'" />
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div>
            </div>

            <div class="col col-xl-4">
                <div class="card card-limit">
                    <div class="card-header bg-white align-items-center d-flex w-75">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div><!-- end card header -->
                    <div class="card-body pt-0 px-0">
                        <div class="col-xl-12 px-4">
                            <SieShimmer :shape="'rectangle'" :width="'215px'" :height="'29px'" :borderRadius="'6px'" />
                        </div>
                        <div class="col-xl-12 px-4 mt-2">
                            <SieShimmer :shape="'rectangle'" :width="'60px'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex align-items-center position-relative">
                            <ul class="list-group list-group-flush border-solid w-75 px-4">
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                            </ul><!-- end -->
                            <div
                                class="commodity-image bg-light rounded-circle d-flex align-items-center justify-content-center">
                                <SieShimmer :shape="'circle'" :width="'40px'" :height="'40px'" />
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div>
            </div>

            <div class="col col-xl-4">
                <div class="card card-limit">
                    <div class="card-header bg-white align-items-center d-flex w-75">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div><!-- end card header -->
                    <div class="card-body pt-0 px-0">
                        <div class="col-xl-12 px-4">
                            <SieShimmer :shape="'rectangle'" :width="'215px'" :height="'29px'" :borderRadius="'6px'" />
                        </div>
                        <div class="col-xl-12 px-4 mt-2">
                            <SieShimmer :shape="'rectangle'" :width="'60px'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex align-items-center position-relative">
                            <ul class="list-group list-group-flush border-solid w-75 px-4">
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                                <li class="list-group-item ps-0 px-0">
                                    <div class="row align-items-center g-3">
                                        <div class="col">
                                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                        <div class="col-auto">
                                            <SieShimmer :shape="'rectangle'" :width="'40px'" :height="'20px'"
                                                :borderRadius="'8px'" />
                                        </div>
                                    </div>
                                    <!-- end row -->
                                </li><!-- end -->
                            </ul><!-- end -->
                            <div
                                class="commodity-image bg-light rounded-circle d-flex align-items-center justify-content-center">
                                <SieShimmer :shape="'circle'" :width="'40px'" :height="'40px'" />
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div class="w-100 card-header align-items-center d-flex px-3" style="background-color: unset;">
                <h4 class="card-title mb-0 flex-grow-1">Komoditas yang mengalami kenaikan berulang</h4>
                <div class="btn-group mb-2">
                    <b-button-group>
                        <b-button variant="primary" @click="prevSlide" class="btn-sm">
                            <i class="ri-arrow-left-s-fill"></i>
                        </b-button>
                        <b-button variant="primary" @click="nextSlide" class="border-left btn-sm">
                            <i class="ri-arrow-right-s-fill"></i>
                        </b-button>
                    </b-button-group>
                </div>
            </div><!-- end card header -->
            <div class="col-xl-12 px-0 mb-4 card-danger bg-transparent">
                <vue-slick-carousel ref="carousel" :dots="true" :arrows="false" :slidesToShow="3" :slidesToScroll="1"
                    :autoplay="true" :autoplaySpeed="4000">
                    <div v-for="(item, index) in items" :key="index" class="commodity-list">
                        <div class="card card-limit">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <div class="commodities-detail w-75">
                                        <div class="commodity-title d-flex flex-column">
                                            <span class="title-market pb-2 text-dark">{{ item.name }}</span>
                                        </div>
                                        <div class="commodity-item mb-2">
                                            <div class="d-flex flex-column">
                                                <h5 class="mt-0 fs-16"><span
                                                        class="badge py-2 badge-soft-primary badge-secondary w-100 text-dark">Rp
                                                        116.364/kg</span></h5>
                                            </div>
                                            <div class="d-flex flex-column">
                                                <div class="chip-custom">
                                                    <span class="badge bg-light text-success mb-0"> <i
                                                            class="ri-arrow-up-line align-middle"></i>
                                                        10.05 %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="table table-sm table-centered align-middle table-nowrap mb-0">
                                            <tbody class="border-0">
                                                <tr>
                                                    <td class="d-flex gap-5">
                                                        <div
                                                            class="commodity d-flex flex-column justify-content-center">
                                                            <p class="text-truncate mb-0 fs-12">Pasar Cimindi
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td style="width:40%;">
                                                        <p class="text-muted mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </p>
                                                    </td>
                                                    <td class="text-end">
                                                        <span
                                                            class="fs-10 badge badge-outline-primary badge-primary">1x</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="d-flex gap-5">
                                                        <div
                                                            class="commodity d-flex flex-column justify-content-center">
                                                            <p class="text-truncate mb-0 fs-12">Pasar Atas
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p class="text-muted mb-0">&nbsp;</p>
                                                    </td>
                                                    <td class="text-end">
                                                        <span
                                                            class="fs-10 badge badge-outline-primary badge-primary">3x</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="d-flex gap-5">
                                                        <div
                                                            class="commodity d-flex flex-column justify-content-center">
                                                            <p class="text-truncate mb-0 fs-12">Pasar Rancabentang
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p class="text-muted mb-0">&nbsp;</p>
                                                    </td>
                                                    <td class="text-end">
                                                        <span
                                                            class="fs-10 badge badge-outline-primary badge-primary">2x</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="d-flex gap-5">
                                                        <div
                                                            class="commodity d-flex flex-column justify-content-center">
                                                            <p class="text-truncate mb-0 fs-12">Pasar Melong
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p class="text-muted mb-0">&nbsp;</p>
                                                    </td>
                                                    <td class="text-end">
                                                        <span
                                                            class="fs-10 badge badge-outline-primary badge-primary">3x</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="d-flex gap-5">
                                                        <div
                                                            class="commodity d-flex flex-column justify-content-center">
                                                            <p class="text-truncate mb-0 fs-12">Pasar Antri
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p class="text-muted mb-0">&nbsp;</p>
                                                    </td>
                                                    <td class="text-end">
                                                        <span
                                                            class="fs-10 badge badge-outline-primary badge-primary">1x</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="d-flex gap-5">
                                                        <div
                                                            class="commodity d-flex flex-column justify-content-center">
                                                            <p class="text-truncate mb-0 fs-12">Pasar Baros
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p class="text-muted mb-0">&nbsp;</p>
                                                    </td>
                                                    <td class="text-end">
                                                        <span
                                                            class="fs-10 badge badge-outline-primary badge-primary">1x</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <div
                                        class="commodity-image bg-info-subtle rounded-circle d-flex align-items-center justify-content-center">
                                        <img :src="item.image" alt="Review image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </vue-slick-carousel>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import VueApexCharts from "vue-apexcharts";
import Highcharts from 'highcharts';
import HeatmapModule from 'highcharts/modules/heatmap';

// Initialize the Heatmap module
HeatmapModule(Highcharts);


const dataVizChart = {
    series: [{
        name: 'Month to Month',
        data: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]
    }],
    chartOptions: {
        chart: {
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        colors: ['#4fc6e1'],
        title: {
            text: '',
            offsetX: 10,
            style: {
                fontSize: '22px'
            }
        },
        subtitle: {
            text: '',
            offsetX: 10,
            offsetY: 35,
            style: {
                fontSize: '13px'
            }
        }
    },
};
const dataLine1 = {
    chartOptions: {
        chart: {
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#1abc9c'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth'
        },
        title: {
            text: '',
            align: 'left',
            style: {
                fontSize: '14px',
                color: '#666'
            }
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2
            },
            borderColor: '#f1f3fa'
        },
        markers: {
            style: 'inverted',
            size: 6
        },
        xaxis: {
            categories: ['Minggu ke-1', 'Minggu ke-2', 'Minggu ke-3', 'Minggu ke-4'],
            title: {
                text: 'Minggu'
            }
        },
        yaxis: {
            title: {
                text: 'Tingkat Inflasi (%)'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
            }
        }]
    },
    series: [
        {
            name: 'Indeks Perkembangan Harga',
            data: [12, 11, 14, 2]
        }],
};
const dataLine2 = {
    chartOptions: {
        chart: {
            height: 290,
            type: "area",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories: [
                "Pasar Rancabentang",
                "Pasar Cimindi",
                "Pasar Antri",
                "Pasar Atas",
                "Pasar Baros",
                "Pasar Melong",
            ],
            labels: {
                formatter: function (value) {
                    if (!value) {
                        return ""; // Return an empty string if value is undefined
                    }
                    // Check if the label contains "Pasar" and split
                    const splitValue = value.includes("Pasar") ? value.split("Pasar ")[1] : value;

                    return `${splitValue || value}`; // Return the text after "Pasar"
                },
            },
        },
        yaxis: {
            tickAmount: 5,
            min: 0,
            max: 6,
        },
        colors: ["#4fc6e1", "#1abc9c", "#FFC106"],
        fill: {
            opacity: 0.06,
            colors: ["#4fc6e1", "#1abc9c", "#FFC106"],
            type: "solid",
        },
        legend: {
            show: false,
        },
        tooltip: {
            x: {
                formatter: function (value, opts) {
                    // Return the full text for the tooltip
                    const categoryIndex = opts.dataPointIndex;
                    return dataLine2.chartOptions.xaxis.categories[categoryIndex];
                },
            },
        },
    },
    series: [
        {
            name: "Inflasi",
            data: [1, 1, 2, 4, 2, 3],
        },
        {
            name: "Deflasi",
            data: [4, 2, 4, 0, 4, 2],
        },
        {
            name: "Stabil",
            data: [3, 2, 0, 2, 1, 3],
        },
    ],
};

export default {
    name: 'FoodReportComponent',
    components: {
        apexchart: () => import("vue-apexcharts"),
        VueSlickCarousel,
    },
    props: {
    },
    watch: {
    },
    data() {
        return {
            vizcharts: dataVizChart,
            linewithDataChart: dataLine1,
            linewithDataChart2: dataLine2,
            isLoading: true,
            items: [
                {
                    name: "Ayam Broiler",
                    date: "1 day ago",
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    rating: 4.5,
                    image: "/commodity/minyak_goreng_kemasan.svg",
                },
                {
                    name: "Minyak Goreng",
                    date: "2 day ago",
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    rating: 4.5,
                    image: "/commodity/udang.svg",
                },
                {
                    name: "Gula Pasir Lokal",
                    date: "3 day ago",
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    rating: 4.5,
                    image: "/commodity/garam.svg",
                },
                {
                    name: "Pisang 1 Kg",
                    date: "4 day ago",
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    rating: 4.5,
                    image: "/commodity/lpg_3kg.svg",
                },
                {
                    name: "Kol / Kubis",
                    date: "5 day ago",
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    rating: 4.5,
                    image: "/commodity/kacang_hijau.svg",
                },
                // Add more items here...
            ],
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1500);
    },
    computed: {

    },
    methods: {
        // Slick Carousel
        prevSlide() {
            const carousel = this.$refs.carousel;
            if (carousel) {
                carousel.prev();
            }
        },
        nextSlide() {
            const carousel = this.$refs.carousel;
            if (carousel) {
                carousel.next();
            }
        },
    },
}
</script>

<style scoped>
.commodity-list {
    background-color: unset;
    border-radius: 10px;
    padding: 10px;
}

.commodity-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    right: -40px;
}

.commodities-detail {
    padding-right: 0px;
}

.rating {
    font-weight: bold;
}

.card-limit {
    width: 86% !important;
}
</style>