<template>
    <div>
        <div v-if="isLoading">
            <!-- shimmer -->
            <div class="widget-simple text-center card">
                <div class="card-body">
                    <div class="card-head-title position-relative">
                        <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="boxed-section col-lg-6 p-0 pr-1 pt-2">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'" :borderRadius="'8px'" />
                        </div>
                        <div class="boxed-section col-lg-6 p-0 pl-1 pt-2">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'107px'" :borderRadius="'8px'" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- end of shimmer -->
        </div>
        <div v-else>
            <div class="widget-simple text-center card card-change">
                <div class="card-body">
                    <div class="card-head-title position-relative">
                        <h4 class="card-head text-muted mt-0">Pengendalian Inflasi</h4>
                        <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                            <a href="javascript:void(0);" id="pengendalian-inflasi" class="text-muted" variant="light">
                                <i class="fa fa-info-circle"></i>
                            </a>

                            <b-popover target="pengendalian-inflasi" triggers="hover" placement="right"
                                custom-class="custom-popover">
                                <template v-slot:title>
                                    Pengendalian Inflasi
                                </template>
                                <div>
                                    Total Strategi Pengendalian Inflasi dan Total Rencana Aksi yang dilakukan oleh
                                    Perangkat Daerah di Civic Administration.
                                </div>
                            </b-popover>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="boxed-section col-lg-6 py-4 bg-light border border-1 rounded">
                                <h3 class="text-muted font-13 counter mt-0">Strategi</h3>
                                <h2 class="text-muted m-0"><span><span>
                                            {{ strategi }}
                                        </span></span></h2>
                            </div>
                            <div class="spacer">&nbsp;&nbsp;&nbsp;</div>
                            <div class="boxed-section col-lg-6 bg-light py-4 border border-1 rounded">
                                <h3 class="text-muted font-13 counter mt-0">Rencana Aksi</h3>
                                <h2 class="text-muted m-0"><span><span>
                                            {{ rencanaAksi }}
                                        </span></span></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer position-relative w-100 bg-transparent pb-0 ">
                    <div class="position-absolute utl-bottom-0 utl-right-0">
                        <a
                            href="javascript:void(0);"
                            v-b-modal.modal-actionPlan
                            class="pl-4 btn btn-light btn-sm btn-goto-detail bg-transparent text-primary border-0"
                        >
                            Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                        </a>
                        <!-- <a
                            href="javascript:void(0);"
                            @click="scrollToActPlanList"
                            class="pl-4 btn btn-light btn-sm btn-goto-detail bg-transparent text-primary border-0"
                        >
                            Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                        </a> -->
                    </div>
                    <!-- Modal content -->
                    <b-modal id="modal-actionPlan" :title="`Strategi & Rencana Aksi ${strategiRencanaAksiList?.tahun ?? ''}`" title-class="font-14"
                        dialog-class="modal-xl custom-modal" hide-footer>
                        <!-- <h5>Strategi</h5>
                        <div class="table-responsive mb-5">
                            <table class="table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Sasaran Tematik</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-active">
                                        <th scope="row">1</th>
                                        <td>Mewujudkan keterjangkauan Harga</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Terwujudnya Ketersediaan Pasokan</td>
                                    </tr>
                                    <tr class="table-success">
                                        <th scope="row">3</th>
                                        <td>Terciptanya Alur Distribusi Pangan yang Lancar</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Terciptanya Komunikasi yang Efektif</td>
                                    </tr>
                                    <tr class="table-info">
                                        <th scope="row">5</th>
                                        <td>Tata Kelola Pengendalian Inflasi</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        <h5>Rencana Aksi</h5>
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Rencana Aksi</th>
                                        <th>Satuan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-active">
                                        <th scope="row">1</th>
                                        <td>Penyediaan  Informasi  Harga  Pangan  dan  Neraca Bahan Makanan masyarakat Civic Administration</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Pemantauan Stok, Pasokan dan Harga Pangan oleh Tim Satgas Pangan </td>
                                    </tr>
                                    <tr class="table-success">
                                        <th scope="row">3</th>
                                        <td>Monitoring dan sidak harga dan stok barang kebutuhan pokok dan barang penting pada distributor, agen, toko modern dan pasar swasta</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Monitoring dan sidak harga dan stok barang kebutuhan pokok dan barang penting pada 3 pasar pemerintah</td>
                                    </tr>
                                    <tr class="table-info">
                                        <th scope="row">5</th>
                                        <td>Melakukan Operasi Pasar Reguler Dan Pasar Khusus serta bazar murah</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Input harga bahan pokok pada aplikasi e-pasar bersumber dari pasar tradisional dan toko modern</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Melaksanakan Koordinasi dan Sinkronisasi Ketersediaan Barang Kebutuhan Pokok dan Barang Penting Di Tingkat Agen dan Pasar Rakyat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Monitoring Stok atau Ketersediaan Barang Kebutuhan Pokok dan Barang Penting Di Tingkat Agen dan Pasar Rakyat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Pemantauan Stok, Pasokan oleh Tim Satgas Pangan </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Pengadaaan beras CPPD</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Pembagian bibit tanaman</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Pelaksanaan Bazar Pangan segar Civic </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>1) Pembinaan terhadap pelanggar perda/perkada terkait pengendalian inflasi </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>2) Penegakan perda melalui sidang tipiring</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>3) Dukungan terhadap sidak ketersediaan bahan pokok penting yang dilakukan opd terkait (pengawasan)</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>4) Koordinasi dengan stakeholder terkait rencana aksi pemberantasan rokok ilegal di kota civic</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>5) Sosialisasi penekanan rokok ilegal di kota civic</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>6) Operasi gabungan dalam rangka pemberantasan rokok ilegal di kota civic</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Dukungan pelaksanaan Monitoring dan Evaluasi terkait kegiatan upaya pengendalian Inflasi</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Kegiatan kampanye penyebarluasan informasi terkait program/kegiatan yang mendukung pengendalian inflasi.(melalui media massasecara periodek ataupun program/insidental) </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Kegiatan kampanye penyebarluasan informasi terkait program/kegiatan yang mendukung pengendalian inflasi.(melalui media sosial, website, secara periodek ataupun program/insidental)</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Tindak lanjut Pengaduan masyarakat terkait pengendalian inflasi</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Penyusunan rencana aksi dan monev rencana aksi tingkat inflasi</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Rapat Koordinasi TPID</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Capacity Building Tim TPID</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Forum Group Discussion</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>High Level Meeting</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Pendampingan peningkatan kualitas dan kuantitas ketersediaan data sektoral produsen data pada portal satu data</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Integrasi dan penyajian harga pangan melalui dashboard eksekutif.</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Optimalisasi Pusat data Pemerintah Civic Administration Untuk Mendukung Penggunaan Sistem Informasi dalam Pengendalian Inflasi : Pengadaan Server  untuk mendukung Penggunaan Sistem Informasi dalam Pengendalian Inflasi</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Review pengendalian inflasi daerah</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">7</th>
                                        <td>Monitoring dan evaluasi upaya pengendalian inflasi yang telah dilakukan pemda melalui TPID</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  -->
                        <!-- Expand / Collapse Button -->
                        <button class="btn btn-primary mb-3" @click="toggleAll">
                            {{ allExpanded ? "Tutup Semua" : "Buka Semua" }}
                        </button>
                        <template>
                            <div class="table-responsive mb-5">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>#</th>
                                            <th>Sasaran Tematik</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(item, index) in dataStrategiRencanaAksi">
                                            <tr :key="item.id" :class="item.class" @click="toggleDetail(item.id)"
                                                style="cursor: pointer">
                                                <td width="30">
                                                    <span :class="{ rotate: expandedIds.includes(item.id) }"
                                                        class="arrow-icon"><i class="bx bx-chevron-right"></i></span>
                                                </td>
                                                <th scope="row">{{ index + 1 }}</th>
                                                <td>
                                                    {{ item.title }}
                                                    <span class="badge badge-secondary"
                                                        :style="getProgressStyle(item.percentage)">
                                                        {{ item.percentage }} %
                                                    </span>

                                                </td>
                                            </tr>

                                            <!-- Child table row -->
                                            <tr v-if="expandedIds.includes(item.id)">
                                                <td colspan="3">
                                                    <table class="table table-bordered mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Rencana Aksi</th>
                                                                <th>Satuan</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(child, cIndex) in item.details" :key="cIndex"
                                                                :class="child.rowClass">
                                                                <th scope="row">{{ cIndex + 1 }}</th>
                                                                <td>{{ child.rencanaAksi }}</td>
                                                                <td>
                                                                    <span
                                                                        v-if="(child.satuan === 'Laporan' || child.satuan === 'Publikasi') && child.status === 'Selesai'">
                                                                        {{ child.satuan }} -
                                                                        <a :href="child.link || '#'"
                                                                            target="_blank"><i :id="'tooltip-doc-' + item.id + '-' + cIndex" class="mdi mdi-file-document fs-18"></i></a>
                                                                            <b-tooltip :target="'tooltip-doc-' + item.id + '-' + cIndex" placement="right" variant="dark">Lihat Dokumen</b-tooltip>
                                                                    </span>
                                                                    <span v-else>
                                                                        {{ child.satuan }}
                                                                    </span>
                                                                </td>
                                                                <!-- <td>{{
                                                                    child.satuan }}</td> -->
                                                                <td width="10%"><span class="badge w-100"
                                                                        :class="getRencanaAksiClassColor(child.status)">{{
                                                                            child.status }}
                                                                    </span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </template>



                        <template v-slot:modal-footer>
                            <b-button variant="secondary" @click="closeModal">Close</b-button>
                        </template>
                    </b-modal>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            isLoading: true,
            expandedIds: [],
            allExpanded: false,
            dataStrategiRencanaAksi: [
                {
                    id: 1,
                    title: "Mewujudkan keterjangkauan Harga",
                    class: "table-success",
                    percentage: 100,
                    details: [
                        {
                            rencanaAksi:
                                "Penyediaan Informasi Harga Pangan dan Neraca Bahan Makanan masyarakat Civic Administration",
                            satuan: "Dokumen",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Pemantauan Stok, Pasokan dan Harga Pangan oleh Tim Satgas Pangan",
                            satuan: "Kali",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Monitoring dan sidak harga dan stok barang kebutuhan pokok dan barang penting pada distributor, agen, toko modern dan pasar swasta",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Monitoring dan sidak harga dan stok barang kebutuhan pokok dan barang penting pada 3 pasar pemerintah",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Melakukan Operasi Pasar Reguler Dan Pasar Khusus serta bazar murah",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Input harga bahan pokok pada aplikasi e-pasar bersumber dari pasar tradisional dan toko modern",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Selesai"
                        },
                    ],
                },
                {
                    id: 2,
                    title: "Terwujudnya Ketersediaan Pasokan",
                    class: "table-danger",
                    percentage: 0,
                    details: [
                        {
                            rencanaAksi:
                                "Melaksanakan Koordinasi dan Sinkronisasi Ketersediaan Barang Kebutuhan Pokok dan Barang Penting Di Tingkat Agen dan Pasar Rakyat",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Belum dimulai"
                        },
                        {
                            rencanaAksi:
                                "Monitoring Stok atau Ketersediaan Barang Kebutuhan Pokok dan Barang Penting Di Tingkat Agen dan Pasar Rakyat",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Belum dimulai"
                        },
                        {
                            rencanaAksi:
                                "Pemantauan Stok, Pasokan oleh Tim Satgas Pangan",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Belum dimulai"
                        },
                        {
                            rencanaAksi:
                                "Pengadaaan beras CPPD",
                            satuan: "Ton",
                            rowClass: "",
                            status: "Belum dimulai"
                        },
                        {
                            rencanaAksi:
                                "Pembagian bibit tanaman",
                            satuan: "Bibit",
                            rowClass: "",
                            status: "Belum dimulai"
                        },
                    ],
                },
                {
                    id: 3,
                    title: "Terciptanya Alur Distribusi Pangan yang Lancar",
                    class: "",
                    status: "Belum dimulai",
                    percentage: 74,
                    details: [
                        {
                            rencanaAksi:
                                "Pelaksanaan Bazar Pangan segar Civic",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Pembinaan terhadap pelanggar perda/perkada terkait pengendalian inflasi",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Masih berjalan"
                        },
                        {
                            rencanaAksi:
                                "Penegakan perda melalui sidang tipiring",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Masih berjalan"
                        },
                        {
                            rencanaAksi:
                                "Dukungan terhadap sidak ketersediaan bahan pokok penting yang dilakukan opd terkait (pengawasan)",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Koordinasi dengan stakeholder terkait rencana aksi pemberantasan rokok ilegal di kota civic",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Sosialisasi penekanan rokok ilegal di kota civic",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Operasi gabungan dalam rangka pemberantasan rokok ilegal di kota civic",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Belum dimulai"
                        },
                    ],
                },
                {
                    id: 4,
                    title: "Terciptanya Komunikasi yang Efektif",
                    class: "",
                    status: "Masih Berjalan",
                    percentage: 65,
                    details: [
                        {
                            rencanaAksi:
                                "Dukungan pelaksanaan Monitoring dan Evaluasi terkait kegiatan upaya pengendalian Inflasi",
                            satuan: "Laporan",
                            rowClass: "",
                            link: "#",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Kegiatan kampanye penyebarluasan informasi terkait program/kegiatan yang mendukung pengendalian inflasi.(melalui media massasecara periodek ataupun program/insidental) ",
                            satuan: "Publikasi",
                            rowClass: "",
                            status: "Masih berjalan"
                        },
                        {
                            rencanaAksi:
                                "Kegiatan kampanye penyebarluasan informasi terkait program/kegiatan yang mendukung pengendalian inflasi.(melalui media sosial, website, secara periodek ataupun program/insidental)",
                            satuan: "Publikasi",
                            rowClass: "",
                            status: "Masih berjalan"
                        },
                        {
                            rencanaAksi:
                                "Tindak lanjut Pengaduan masyarakat terkait pengendalian inflasi",
                            satuan: "Persentase",
                            rowClass: "",
                            status: "Selesai"
                        },
                    ],
                },
                {
                    id: 5,
                    title: "Tata Kelola Pengendalian Inflasi",
                    class: "",
                    status: "Masih Berjalan",
                    percentage: 89,
                    details: [
                        {
                            rencanaAksi:
                                "Penyusunan rencana aksi dan monev rencana aksi tingkat inflasi",
                            satuan: "Dokumen",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Rapat Koordinasi TPID",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Capacity Building Tim TPID",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Forum Group Discussion",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "High Level Meeting",
                            satuan: "Kegiatan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Pendampingan peningkatan kualitas dan kuantitas ketersediaan data sektoral produsen data pada portal satu data",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Integrasi dan penyajian harga pangan melalui dashboard eksekutif",
                            satuan: "Dashboard",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Optimalisasi Pusat data Pemerintah Civic Administration Untuk Mendukung Penggunaan Sistem Informasi dalam Pengendalian Inflasi : Pengadaan Server  untuk mendukung Penggunaan Sistem Informasi dalam Pengendalian Inflasi",
                            satuan: "Pusat Data",
                            rowClass: "",
                            status: "Selesai"
                        },
                        {
                            rencanaAksi:
                                "Review pengendalian inflasi daerah",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Belum dimulai"
                        },
                        {
                            rencanaAksi:
                                "Monitoring dan evaluasi upaya pengendalian inflasi yang telah dilakukan pemda melalui TPID",
                            satuan: "Laporan",
                            rowClass: "",
                            status: "Selesai"
                        },
                    ],
                },
            ],
        }
    },
    computed: {
        ...mapState('inflationProfile', {
            strategi: state => state.strategi,
            strategiStatus: state => state.strategiStatus,
            rencanaAksi: state => state.rencanaAksi,
            rencanaAksiStatus: state => state.rencanaAksiStatus,
            selectedYear: state => state.selectedYear,
            strategiRencanaAksiList: state => state.strategiRencanaAksiList,
        }),
    },
    watch: {
        strategiStatus(newStatus) {
            if (newStatus === 'success' || newStatus === 'failure') {
                this.isLoading = false; // Disable loading when the request completes
            }
        },
        rencanaAksiStatus(newStatus) {
            if (newStatus === 'success' || newStatus === 'failure') {
                this.isLoading = false; // Disable loading when the request completes
            }
        },
        selectedYear() {
            if (this.selectedYear) {
                this.isLoading = true;
                this.fetchAggActPlanStrategiesByYear(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            } else {
                this.fetchStrategiRencanaAksiRecap().then(() => {
                    this.isLoading = false;
                });
            }
        },
        strategiRencanaAksiList(response) {
            let newData = [];
            if (!response?.data) return;
            Object.keys(response?.data).forEach((item, index) => {
                let finished = 0;
                const details = response?.data[item]?.map((detail) => {
                    if (detail?.status === 'SELESAI') finished += 1;
                    return {
                        rencanaAksi: detail?.rencana_aksi,
                        satuan: detail?.satuan,
                        rowClass: "",
                        status: detail?.status
                    };
                });

                const detailLength = details?.length;
                const percentage = finished / detailLength * 100;

                const newItem = {
                    id: index,
                    title: item,
                    class: percentage > 0 ? "" : "table-danger",
                    status: "",
                    percentage: Number((percentage)?.toFixed(2)),
                    details
                }
                newData = [...newData, newItem];
            })
            this.dataStrategiRencanaAksi = newData;
        }
    },
    async mounted() {
        // Check if the data is already loaded in Vuex before showing shimmer
        if (this.rencanaAksiStatus === 'success' && this.strategiStatus === 'success') {
            this.isLoading = false;  // Data is already fetched, no need to show shimmer
        } else {
            if (this.selectedYear) {
                this.fetchAggActPlanStrategiesByYear(this.selectedYear);
            } else {
                this.fetchStrategiRencanaAksiRecap({ year: 2024 });
                this.fetchStrategiRencanaAksiList();
            }
        }
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchStrategiRencanaAksiRecap', 'fetchAggActPlanStrategiesByYear', 'fetchStrategiRencanaAksiList']),
        toggleDetail(id) {
            if (this.expandedIds.includes(id)) {
                this.expandedIds = this.expandedIds.filter((item) => item !== id);
            } else {
                this.expandedIds.push(id);
            }
        },
        toggleAll() {
            if (this.allExpanded) {
                this.expandedIds = [];
            } else {
                this.expandedIds = this.dataStrategiRencanaAksi.map((item) => item.id);
            }
            this.allExpanded = !this.allExpanded;
        },
        getProgressStyle(progress) {
            return {
                backgroundColor: this.getProgressColor(progress),
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
            };
        },
        getRencanaAksiClassColor(status) {
            if (status === 'SELESAI') return 'badge-success';
            if (status === 'SEDANG DIKERJAKAN') return 'badge-primary';
            if (status === 'BELUM DIKERJAKAN') return 'badge-danger';
            return 'badge-light';
        },
        getProgressColor(progress) {
            if (progress <= 10) return '#f1556c'; // Lowest - Red
            if (progress <= 20) return '#f77f82'; // Soft Red
            if (progress <= 30) return '#f9a39a'; // Peach
            if (progress <= 40) return '#fabf92'; // Orange Peach
            if (progress <= 50) return '#fdd282'; // Yellow Orange
            if (progress <= 60) return '#c3d682'; // Yellow Green
            if (progress <= 70) return '#81bf8c'; // Greenish Teal
            if (progress <= 80) return '#4fb8a7'; // Teal
            if (progress <= 90) return '#2e9fa1'; // Dark Teal
            return '#1abc9c'; // Highest - Green
        },
        scrollToActPlanList() {
            const element = document.getElementById('monitoring-inflation-control');
            if (element) {
                element.scrollIntoView({ top: 0, behavior: 'smooth' });
            }
        }
    }
};
</script>
<style scoped>
.arrow-icon {
    display: inline-block;
    transition: transform 0.2s ease;
}

.arrow-icon.rotate {
    transform: rotate(90deg);
}
</style>
