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
                            <h4 class="card-head text-muted mt-0">Indeks Inflasi Tahunan (YoY)<br />&nbsp;</h4>
                            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                                <a href="javascript:void(0);" id="yoy-popover" class="text-muted" variant="light">
                                    <i class="fa fa-info-circle"></i>
                                </a>
                                <b-popover target="yoy-popover" triggers="hover" placement="right"
                                    custom-class="custom-popover">
                                    <template v-slot:title>
                                        Year of Year (YoY)
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
                                            <p class="mb-0 text-muted"> Dibanding tahun sebelumnya</p>
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
                            <h4 class="card-head text-muted mt-0">Indeks <br /> Perkembangan Harga (IPH)</h4>
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
                                        <span class="counter-value" data-target="28.05"
                                            style="line-height:34px">2,1</span>
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
                </div>
                <div v-else class="card card-animate card-danger">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <h4 class="card-head text-muted mt-0">Indeks <br /> Harga Konsumen (IHK)</h4>
                            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                                <a href="javascript:void(0);" id="ihk-popover" class="text-muted" variant="light">
                                    <i class="fa fa-info-circle"></i>
                                </a>
                                <b-popover target="ihk-popover" triggers="hover" placement="right"
                                    custom-class="custom-popover">
                                    <template v-slot:title>
                                        Indeks Harga Konsumen (IHK)
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
                                            style="line-height:34px">119,95</span>
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

                                </div>
                            </div>
                            <div class="align-self-center">

                            </div>
                        </div>
                    </div><!-- end card body -->
                </div>
            </div> <!-- end card-->

            <div class="col-xl-3 col-md-6">
                <!-- shimmer -->
                <div v-if="isLoading" class="widget-simple text-center card card-animate">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="w-100">
                                <ul class="list-group list-group-flush border-solid w-100 px-4 pt-1">
                                    <li class="list-group-item ps-0 px-0 py-2">
                                        <div class="row align-items-center g-3">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'20px'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                            <div class="col">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                        <!-- end row -->
                                    </li><!-- end -->
                                    <li class="list-group-item ps-0 px-0 py-2">
                                        <div class="row align-items-center g-3">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'20px'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                            <div class="col">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                        <!-- end row -->
                                    </li><!-- end -->
                                    <li class="list-group-item ps-0 px-0 py-2">
                                        <div class="row align-items-center g-3">
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'20px'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                            <div class="col">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                        </div>
                                        <!-- end row -->
                                    </li><!-- end -->
                                </ul><!-- end -->
                            </div>
                        </div>
                    </div><!-- end card body -->
                </div>
                <!-- end of shimmer -->
                <div v-else class="widget-simple text-center card card-animate card-danger bg-transparent">
                    <div class="card-body">
                        <div class="card-head-title position-relative">
                            <h4 class="card-head text-muted mt-0">Pemantauan Komoditas</h4>
                            <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                                <a href="javascript:void(0);" id="pemantauan-komoditas" class="text-muted"
                                    variant="light">
                                    <i class="fa fa-info-circle"></i>
                                </a>

                                <b-popover target="pemantauan-komoditas" triggers="hover" placement="right"
                                    custom-class="custom-popover">
                                    <template v-slot:title>
                                        Pemantauan Komoditas
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
                                <div class="boxed-section col-lg-12 py-2 rounded px-0 d-flex justify-content-center">
                                    <div class="text-left">
                                        <div class="d-flex gap-2">
                                            <div class="flex-shrink-0">
                                                <i class="ri-stop-fill align-middle text-danger mr-2"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2 text-muted">
                                                <b>4</b> Komoditas Naik
                                            </div>
                                        </div>
                                        <div class="d-flex mt-1  gap-2 border-top pt-2">
                                            <div class="flex-shrink-0">
                                                <i class="ri-stop-fill align-middle text-success mr-2"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2 text-muted">
                                                <b>2</b> Komoditas Turun
                                            </div>
                                        </div>
                                        <div class="d-flex mt-1  gap-2 border-top pt-2">
                                            <div class="flex-shrink-0">
                                                <i class="ri-stop-fill align-middle text-warning mr-2"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2 text-muted">
                                                <b>40</b> Komoditas Stabil
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div> <!-- end col-->
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
                <h4 class="card-title mb-0 flex-grow-1">Komoditas yang mengalami kenaikan</h4>
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
                                                        <p class="text-muted fw-medium mb-0 fs-12">Rp. 12.000,-
                                                        </p>
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
                                                        <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000,- </p>
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
                                                        <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000,- </p>
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
                                                        <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000,- </p>
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
                                                        <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000,- </p>
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
                                                        <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000,- </p>
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
        <div class="row">
            <div class="col-xl-8">
                <!-- shimmer -->
                <div v-if="isLoading" class="card card-height-100">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div>
                    <div class="card-body pt-3 h-100 px-4">
                        <div class="row filter-card d-flex px-2">
                            <div class="d-flex justify-content-between w-100">
                                <SieShimmer :shape="'rectangle'" :width="'320px'" :height="'30px'"
                                    :borderRadius="'8px'" />
                                <div class="tabs d-flex gap-2">
                                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'"
                                        :borderRadius="'8px'" />
                                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'30px'"
                                        :borderRadius="'8px'" />
                                </div>
                            </div>
                            <div class="tab-content col-xl-12">
                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'380px'"
                                    :borderRadius="'8px'" />
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
                <!-- end of shimmer -->
                <div v-else class="card card-height-100 card-danger bg-transparent">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <h4 class="card-title mb-0 flex-grow-1 text-muted">Analisa Regional</h4>
                        <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                            <a href="javascript:void(0);" id="tren-rerata-popover" class="text-muted" variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>
                            <b-popover target="tren-rerata-popover" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Tren Rata-rata Inflasi
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
                        <div class="row filter-card d-flex">
                            <div class="w-100 d-flex justify-content-between px-2">
                                <div class="filter-card w-50">
                                    <multiselect v-model="localSelectedCommodities" :options="commodityOptions"
                                        placeholder="Pilih Komoditas" @input="onFilterChange" label="name"
                                        track-by="id">
                                    </multiselect>
                                </div>
                                <h6 class="mb-4 text-muted">Update data terakhir : <span
                                        class="badge badge-outline-primary badge-primary">10 November 2024</span></h6>
                            </div>
                        </div><!-- end card body -->
                        <div class="row d-flex">
                            <div class="analisa-content col-xl-12">
                                <apexchart type="bar" height="490" :options="commodityChartOptions"
                                    :series="commoditySeriesData">
                                </apexchart>
                            </div>
                        </div>
                    </div><!-- end card -->
                </div>
            </div>
            <div class="col-xl-4 col-md-4">
                <!-- shimmer -->
                <div v-if="isLoading" class="card card-height-100">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div>
                    <div class="card-body pt-3 h-100 px-4">
                        <div class="row filter-card d-flex px-2">
                            <div class="col-xl-12">
                                <ul class="list-group list-group-flush border-solid w-100">
                                    <li class="list-group-item ps-0 px-0">
                                        <div class="row align-items-center g-3">
                                            <div class="col">
                                                <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                                    :borderRadius="'8px'" />
                                            </div>
                                            <div class="col-auto">
                                                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
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
                                                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
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
                                                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
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
                                                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
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
                                                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
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
                                                <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
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
                            </div>
                        </div><!-- end card body -->
                    </div><!-- end card -->
                </div>
                <!-- end of shimmer -->
                <div v-else class="card card-height-100 card-danger bg-transparent">
                    <div class="card-header align-items-center d-flex border-bottom bg-white">
                        <h4 class="card-title mb-0 flex-grow-1 text-muted">Pemantauan Harga Pasar</h4>
                        <div class="card-head-popover position-absolute utl-top-16 utl-right-20">
                            <a href="javascript:void(0);" id="kpit-popover" class="text-muted" variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>
                            <b-popover target="kpit-popover" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Pemantauan Harga Pasar
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

                    <div class="card-body">

                        <div class="table-responsive mt-3">
                            <table class="table table-sm table-centered align-middle table-nowrap mb-0">
                                <tbody class="border-0">
                                    <tr>
                                        <td class="d-flex gap-5">
                                            <div class="commodity d-flex flex-column justify-content-center">
                                                <p class="text-truncate mb-0 fs-12">Pasar Cimindi
                                                </p>
                                            </div>
                                        </td>
                                        <td style="width:40%;">
                                            <p class="text-muted mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </p>
                                        </td>
                                        <td class="text-end">
                                            <p class="text-muted fw-medium mb-0 fs-12">Rp. 12.000 / Kg
                                            </p>
                                        </td>
                                        <td>
                                            <span class="fs-10 badge badge-outline-primary badge-primary">+0.13</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex gap-5">
                                            <div class="commodity d-flex flex-column justify-content-center">
                                                <p class="text-truncate mb-0 fs-12">Pasar Atas
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-muted mb-0">&nbsp;</p>
                                        </td>
                                        <td class="text-end">
                                            <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000 / Kg </p>
                                        </td>
                                        <td>
                                            <span class="fs-10 badge badge-outline-danger badge-danger">+0.13</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex gap-5">
                                            <div class="commodity d-flex flex-column justify-content-center">
                                                <p class="text-truncate mb-0 fs-12">Pasar Rancabentang
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-muted mb-0">&nbsp;</p>
                                        </td>
                                        <td class="text-end">
                                            <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000 / Kg </p>
                                        </td>
                                        <td>
                                            <span class="fs-10 badge badge-outline-primary badge-primary">+0.13</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex gap-5">
                                            <div class="commodity d-flex flex-column justify-content-center">
                                                <p class="text-truncate mb-0 fs-12">Pasar Melong
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-muted mb-0">&nbsp;</p>
                                        </td>
                                        <td class="text-end">
                                            <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000 / Kg </p>
                                        </td>
                                        <td>
                                            <span class="fs-10 badge badge-outline-danger badge-danger">+0.13</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex gap-5">
                                            <div class="commodity d-flex flex-column justify-content-center">
                                                <p class="text-truncate mb-0 fs-12">Pasar Antri
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-muted mb-0">&nbsp;</p>
                                        </td>
                                        <td class="text-end">
                                            <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000 / Kg </p>
                                        </td>
                                        <td>
                                            <span class="fs-10 badge badge-outline-danger badge-danger">+0.13</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex gap-5">
                                            <div class="commodity d-flex flex-column justify-content-center">
                                                <p class="text-truncate mb-0 fs-12">Pasar Baros
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="text-muted mb-0">&nbsp;</p>
                                        </td>
                                        <td class="text-end">
                                            <p class="text-muted fw-medium mb-0 fs-12">Rp. 15.000 / Kg </p>
                                        </td>
                                        <td>
                                            <span class="fs-10 badge badge-outline-primary badge-primary">+0.13</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div><!-- end card body -->
                </div><!-- end card -->
            </div><!-- end col -->
        </div>
    </div> <!-- end row-->
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import VueApexCharts from "vue-apexcharts";
import Highcharts from 'highcharts';
import HeatmapModule from 'highcharts/modules/heatmap';
import Multiselect from 'vue-multiselect';
import commodityJsonData from "@/components/widgets/inflation/filter/commodity-item.json";

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

export default {
    name: 'FoodAnalysisComponent',
    components: {
        apexchart: VueApexCharts,
        VueSlickCarousel,
        Multiselect,
    },
    props: {
    },
    watch: {
    },
    data() {
        return {
            vizcharts: dataVizChart,
            //isLoading
            isLoading: true,
            trenActiveTab: 'Inflasi',
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
            localSelectedCommodities: [],
            commodityOptions: commodityJsonData.data || [],
            // Provided data
            city_region_name: [
                "Kota Bandung",
                "Civic Administration",
                "Kabupaten Bandung",
                "Kabupaten Bandung Barat",
                "sebagian Kabupaten Sumedang",
            ],
            commodityData: [8000, 12500, 7500, 9000, 10500],
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1500);
        // Log the carousel instance to make sure it's accessible
        console.log(this.$refs.carousel); // Should now log the Vue Slick Carousel component instance
    },
    computed: {
        // Analisa Regional
        combinedData() {
            return this.city_region_name.map((nama_daerah, index) => ({
                nama_daerah,
                tingkat_inflasi: this.commodityData[index],
            }));
        },
        sortedData() {
            return this.combinedData.sort();
        },
        meanData() {
            return this.calculateAverage(this.commodityData);
        },
        commoditySeriesData() {
            return [
                {
                    name: "Harga Komoditas [A]",
                    data: this.sortedData.map((item) => item.tingkat_inflasi),
                },
            ];
        },
        dataLabelColors() {
            return this.sortedData.map((item) =>
                item.nama_daerah === "Civic Administration" ? "#000" : "#0e0e0e"
            );
        },
        commodityChartOptions() {
            return {
                chart: {
                    type: "bar",
                    toolbar: {
                        show: false, // Disable the toolbar
                    },
                },
                plotOptions: {
                    bar: {
                        columnWidth: '55px',
                        horizontal: false,
                        borderRadius: 4,
                        borderRadiusApplication: 'end',
                        distributed: true,
                        dataLabels: {
                            position: "top",
                        },
                    },
                },
                colors: this.sortedData.map((item) =>
                    item.nama_daerah === "Civic Administration" ? '#f39c12' : '#1abc9c'
                ),
                dataLabels: {
                    enabled: true, // Enable data labels
                    formatter: function (val) {
                        return `Rp.${new Intl.NumberFormat('id-ID').format(val)}`; // Format as currency
                    },
                    offsetY: -20, // Adjust position above the bars
                    style: {
                        fontSize: "12px", // Adjust font size
                        fontWeight: "bold", // Bold text
                        colors: this.sortedData.map((item) =>
                            item.nama_daerah === "Civic Administration" ? "#f39c12" : "#1abc9c"
                        ), // Dynamically apply colors
                    },
                },
                xaxis: {
                    categories: this.sortedData.map((item) => item.nama_daerah),
                    labels: {
                        formatter: function (value) {
                            const maxLength = 15; // Set the maximum length of the label
                            if (value.length > maxLength) {
                                // Trim from the end and show the last words
                                const trimmedPart = value.substring(value.length - 12); // Last 12 characters (or adjust as needed)
                                return `...${trimmedPart}`;
                            }
                            return value; // Return full label if it's short enough
                        },
                        style: {
                            fontSize: "12px", // Adjust font size
                            fontWeight: "bold", // Optional: make the labels bold
                            colors: "#333", // Color for x-axis labels
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: "Harga",
                    },
                    labels: {
                        formatter: function (value) {
                            // Format the Y-axis labels as currency
                            return "Rp. " + new Intl.NumberFormat('id-ID').format(value);
                        },
                    },
                },
                title: {
                    text: "",
                    align: "center",
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "Rp. " + new Intl.NumberFormat("id-ID").format(val);
                        },
                    },
                    x: {
                        formatter: function (val, opts) {
                            // Show full x-axis category in the tooltip
                            const categoryIndex = opts.dataPointIndex; // Get the index of the current category
                            return this.sortedData[categoryIndex].nama_daerah; // Use the full label from sortedData
                        }.bind(this),
                    },
                },
                legend: {
                    show: false,
                },
                annotations: {
                    yaxis: [
                        {
                            y: this.meanData,
                            borderColor: '#FF5733',
                            label: {
                                borderColor: '#FF5733',
                                style: {
                                    color: '#ffffff',
                                    background: '#FF5733',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    padding: {
                                        left: 5,
                                        right: 5,
                                    },
                                },
                                // Dynamic text for the label, including the meanData value
                                text: `Rata-rata Harga: Rp. ${new Intl.NumberFormat("id-ID").format(
                                    this.meanData
                                )}`,
                            },
                        },
                    ],
                }
            };
        },
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

        // All related stuff for analisa regional
        onFilterChange(selectedCommodity) {
            console.log('onFilterChange called with:', selectedCommodity);
            // Check if selectedCommodity is a reactive object and unwrap it
            const selectedId = selectedCommodity && selectedCommodity.id ? selectedCommodity.id : null;
            this.$emit('filter-change', { commodityId: selectedId });
        },
        // Calculate the average (mean) of the commodity prices
        calculateAverage(data) {
            const sum = data.reduce((acc, val) => acc + val, 0); // Sum all values
            return sum / data.length; // Return the mean by dividing the sum by the number of elements
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


::v-deep(.apexcharts-point-annotations text),
::v-deep(.apexcharts-xaxis-annotations text),
::v-deep(.apexcharts-yaxis-annotations text) {
    fill: #fff !important;
}

::v-deep(.multiselect__option--highlight) {
    background-color: #17a2b8;
    color: white;
}

::v-deep(.multiselect__tag) {
    background-color: #6c757d;
    color: white;
    font-size: 9px;
}

::v-deep(.multiselect__placeholder) {
    color: #6c757d;
    font-size: 12px;
}

::v-deep(.multiselect__single) {
    font-size: 12px !important;
}

::v-deep(.multiselect__element) {
    font-size: 12px;
}

::v-deep(.apexcharts-datalabels.apexcharts-hidden-element-shown .apexcharts-datalabel) {
    fill: #98A6AD !important;
}
</style>