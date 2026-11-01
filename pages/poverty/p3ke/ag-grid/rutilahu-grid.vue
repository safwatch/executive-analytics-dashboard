<script>
import { AgGridVue } from 'ag-grid-vue';
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

import DateComponent from '../../grid-table/DateComponent.vue';
import CustomHeaderComponent from './CustomHeaderComponent.vue';

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { SparklinesModule } from "@ag-grid-enterprise/sparklines";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { ViewportRowModelModule } from "@ag-grid-enterprise/viewport-row-model";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";

import SimpleShimmer from "simple-shimmer";
import CustomLoadingOverlay from './CustomLoadingOverlay.vue';



export default {
    data() {
        return {
            rowData: [],
            p3keKeluargaLoading: true,
            gridOptions: {
                sideBar: {
                    toolPanels: [
                        {
                            id: 'columns',
                            labelDefault: 'Columns',
                            labelKey: 'columns',
                            iconKey: 'columns',
                            toolPanel: 'agColumnsToolPanel',
                        },
                        {
                            id: 'filters',
                            labelDefault: 'Filters',
                            labelKey: 'filters',
                            iconKey: 'filter',
                            toolPanel: 'agFiltersToolPanel',
                        },
                    ],
                    defaultToolPanel: 'filters'
                },
                frameworkComponents: {
                    customLoadingOverlay: CustomLoadingOverlay,
                },
                overlayLoadingTemplate:
                    '<span class="ag-overlay-loading-center"><span role="status" class="mt-3 spinner-border spinner-border-sm"><span class="sr-only">Small Spinner</span></span>Mohon menunggu data sedang diproses.....</span>',
                overlayNoRowsTemplate:
                    '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">No data available to display</span>',
            },
            api: null,
            columnDefs: null,
            rowData: null,
            showGrid: false,
            sideBar: true,
            sideBarVisibility: true,
            rowCount: null,
            individuData: [],
            keluargaData: [],
            modules: [
                ClientSideRowModelModule,
                ColumnsToolPanelModule,
                ExcelExportModule,
                FiltersToolPanelModule,
                SparklinesModule,
                GridChartsModule,
                MasterDetailModule,
                MenuModule,
                MultiFilterModule,
                RangeSelectionModule,
                RichSelectModule,
                RowGroupingModule,
                ServerSideRowModelModule,
                SetFilterModule,
                SideBarModule,
                ViewportRowModelModule,
                ClipboardModule
            ]
        };
    },
    components: {
        AgGridVue,
        CustomHeaderComponent,
        agDateInput: DateComponent,
        SimpleShimmer,
    },
    created() {
        this.autoGroupColumnDef = {
            minWidth: 200,
        };
        this.paginationPageSize = 10;
    },
    methods: {
        // get data p3ke keluarga
        getDataP3keKeluargaRutilahu() {
            setTimeout(() => {
                this.$store.dispatch('p3ke/getAllP3keKeluargaRutilahu', {
                    start: 0,
                    limit: 1000,
                }).then((status) => {
                    if (status) {
                        let responseKeluargaRutilahu = this.$store.state.p3ke.p3keKeluargaRutilahuList.result.keluarga;

                        for (var i = 0; i < responseKeluargaRutilahu.length; i++) {
                            this.keluargaData.push({
                                no: responseKeluargaRutilahu[i].no,
                                id_keluarga_program_ppke: responseKeluargaRutilahu[i].id_keluarga_program_ppke,
                                dimuktakhirkan_tahun: responseKeluargaRutilahu[i].dimuktakhirkan_tahun,
                                provinsi: responseKeluargaRutilahu[i].provinsi,
                                kabupaten_kota: responseKeluargaRutilahu[i].kabupaten_kota,
                                kecamatan: responseKeluargaRutilahu[i].kecamatan,
                                desa_kelurahan: responseKeluargaRutilahu[i].desa_kelurahan,
                                kode_kemdagri: responseKeluargaRutilahu[i].kode_kemdagri,
                                desil_kesejahteraan: responseKeluargaRutilahu[i].desil_kesejahteraan,
                                persentil: responseKeluargaRutilahu[i].persentil,
                                alamat: responseKeluargaRutilahu[i].alamat,
                                prioritas_verval: responseKeluargaRutilahu[i].prioritas_verval,
                                nama_kepala_keluarga: responseKeluargaRutilahu[i].nama_kepala_keluarga,
                                nik_kepala_keluarga: responseKeluargaRutilahu[i].nik_kepala_keluarga,
                                nik_kepala_keluarga_padan_kemdagri: responseKeluargaRutilahu[i].nik_kepala_keluarga_padan_kemdagri,
                                jenis_kelamin_kepala_keluarga: responseKeluargaRutilahu[i].jenis_kelamin_kepala_keluarga,
                                tanggal_lahir_kepala_keluarga: responseKeluargaRutilahu[i].tanggal_lahir_kepala_keluarga,
                                pekerjaan_kepala_keluarga: responseKeluargaRutilahu[i].pekerjaan_kepala_keluarga,
                                status_pekerjaan_kepala_keluarga: responseKeluargaRutilahu[i].status_pekerjaan_kepala_keluarga,
                                pendidikan_kepala_keluarga: responseKeluargaRutilahu[i].pendidikan_kepala_keluarga,
                                status_kawin_kepala_keluarga: responseKeluargaRutilahu[i].status_kawin_kepala_keluarga,
                                kepemilikan_rumah: responseKeluargaRutilahu[i].kepemilikan_rumah,
                                memiliki_simpanan_uang_perhiasan_ternak_lainnya: responseKeluargaRutilahu[i].memiliki_simpanan_uang_perhiasan_ternak_lainnya,
                                jenis_atap: responseKeluargaRutilahu[i].jenis_atap,
                                kualitas_atap: responseKeluargaRutilahu[i].kualitas_atap,
                                jenis_dinding: responseKeluargaRutilahu[i].jenis_dinding,
                                kualitas_dinding: responseKeluargaRutilahu[i].kualitas_dinding,
                                jenis_lantai: responseKeluargaRutilahu[i].jenis_lantai,
                                kualitas_lantai: responseKeluargaRutilahu[i].kualitas_lantai,
                                sumber_penerangan: responseKeluargaRutilahu[i].sumber_penerangan,
                                daya_listrik_terpasang: responseKeluargaRutilahu[i].daya_listrik_terpasang,
                                bahan_bakar_memasak: responseKeluargaRutilahu[i].bahan_bakar_memasak,
                                sumber_air_minum: responseKeluargaRutilahu[i].sumber_air_minum,
                                memiliki_fasilitas_buang_air_besar: responseKeluargaRutilahu[i].memiliki_fasilitas_buang_air_besar,
                                resiko_stunting: responseKeluargaRutilahu[i].resiko_stunting,
                                penerima_bpnt: responseKeluargaRutilahu[i].penerima_bpnt,
                                penerima_bpum: responseKeluargaRutilahu[i].penerima_bpum,
                                penerima_bst: responseKeluargaRutilahu[i].penerima_bst,
                                penerima_pkh: responseKeluargaRutilahu[i].penerima_pkh,
                                penerima_sembako: responseKeluargaRutilahu[i].penerima_sembako,
                                penerima_prakerja: responseKeluargaRutilahu[i].penerima_prakerja,
                                penerima_kur: responseKeluargaRutilahu[i].penerima_kur,
                            });
                        }

                        this.createRowByData();
                        this.createColumnDefs();
                        this.showGrid = true;
                        this.p3keKeluargaLoading = false;
                    }

                }).catch((error) => {
                    console.log('error in poverty get p3ke keluarga rutilahu', error);
                });
            }, 2500);
        },

        createRowByData() {
            let data = this.$store.state.p3ke.p3keKeluargaRutilahuList.result.keluarga;
            const rowData = [];

            for (let i = 0; i < data.length; i++) {
                rowData.push({
                    no: data[i].no,
                    id_keluarga_program_ppke: data[i].id_keluarga_program_ppke,
                    dimuktakhirkan_tahun: data[i].dimuktakhirkan_tahun,
                    provinsi: normalizeText(data[i].provinsi),
                    kabupaten_kota: normalizeText(data[i].kabupaten_kota),
                    kecamatan: normalizeText(data[i].kecamatan),
                    desa_kelurahan: normalizeText(data[i].desa_kelurahan),
                    kode_kemdagri: data[i].kode_kemdagri,
                    desil_kesejahteraan: data[i].desil_kesejahteraan,
                    persentil: data[i].persentil,
                    alamat: normalizeAddress(data[i].alamat),
                    prioritas_verval: normalizeText(data[i].prioritas_verval),
                    nama_kepala_keluarga: normalizeText(data[i].nama_kepala_keluarga),
                    nik_kepala_keluarga: data[i].nik_kepala_keluarga,
                    nik_kepala_keluarga_padan_kemdagri: normalizeText(data[i].nik_kepala_keluarga_padan_kemdagri),
                    jenis_kelamin_kepala_keluarga: normalizeText(data[i].jenis_kelamin_kepala_keluarga),
                    tanggal_lahir_kepala_keluarga: data[i].tanggal_lahir_kepala_keluarga,
                    pekerjaan_kepala_keluarga: normalizeText(data[i].pekerjaan_kepala_keluarga),
                    status_pekerjaan_kepala_keluarga: normalizeText(data[i].status_pekerjaan_kepala_keluarga),
                    pendidikan_kepala_keluarga: normalizeText(data[i].pendidikan_kepala_keluarga),
                    status_kawin_kepala_keluarga: normalizeText(data[i].status_kawin_kepala_keluarga),
                    kepemilikan_rumah: normalizeText(data[i].kepemilikan_rumah),
                    memiliki_simpanan_uang_perhiasan_ternak_lainnya: normalizeText(data[i].memiliki_simpanan_uang_perhiasan_ternak_lainnya),
                    jenis_atap: normalizeText(data[i].jenis_atap),
                    kualitas_atap: normalizeText(data[i].kualitas_atap),
                    jenis_dinding: normalizeText(data[i].jenis_dinding),
                    kualitas_dinding: normalizeText(data[i].kualitas_dinding),
                    jenis_lantai: normalizeText(data[i].jenis_lantai),
                    kualitas_lantai: normalizeText(data[i].kualitas_lantai),
                    sumber_penerangan: normalizeText(data[i].sumber_penerangan),
                    daya_listrik_terpasang: data[i].daya_listrik_terpasang,
                    bahan_bakar_memasak: normalizeText(data[i].bahan_bakar_memasak),
                    sumber_air_minum: normalizeText(data[i].sumber_air_minum),
                    memiliki_fasilitas_buang_air_besar: normalizeText(data[i].memiliki_fasilitas_buang_air_besar),
                    resiko_stunting: normalizeText(data[i].resiko_stunting),
                    penerima_bpnt: normalizeText(data[i].penerima_bpnt),
                    penerima_bpum: normalizeText(data[i].penerima_bpum),
                    penerima_bst: normalizeText(data[i].penerima_bst),
                    penerima_kur: normalizeText(data[i].penerima_kur),
                    penerima_pkh: normalizeText(data[i].penerima_pkh),
                    penerima_prakerja: normalizeText(data[i].penerima_prakerja),
                    penerima_sembako: normalizeText(data[i].penerima_sembako)
                });
            }
            this.rowData = rowData;
        },
        createColumnDefs() {
            this.columnDefs = [
                {
                    headerName: 'Daftar P3KE Kepala Keluarga',
                    headerGroupComponent: 'CustomHeaderComponent',
                    headerGroupComponentParams: {
                        icon: 'ri-parent-fill',
                    },
                    children: [
                        {
                            headerName: "Nama", field: "nama_kepala_keluarga",
                            width: 150, pinned: true,
                        },
                        {
                            headerName: "Kecamatan", field: "kecamatan", width: 210,
                            pinned: true,
                            filterParams: { cellHeight: 20 }
                        },
                        {
                            headerName: "Dimutakhirkan Tahun",
                            field: "dimuktakhirkan_tahun",
                            width: 200,
                            pinned: true,
                            filter: 'agDateColumnFilter',
                            columnGroupShow: 'open'
                        }
                    ],
                },
                {
                    headerName: 'Data Desil',
                    children: [
                        {
                            headerName: "Persentil",
                            width: 120,
                            field: 'persentil',
                            cellRenderer: percentCellRenderer,
                        },
                        {
                            headerName: "Desil Kesejahteraan",
                            width: 185,
                            sortable: false,
                            field: 'desil_kesejahteraan'
                        },
                    ]
                },
                {
                    headerName: 'Data Domisili',
                    children: [
                        {
                            headerName: "NIK",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'nik_kepala_keluarga'
                        },
                        {
                            headerName: "Alamat",
                            width: 500,
                            sortable: false,
                            field: 'alamat',
                        },
                        {
                            headerName: "Kecamatan",
                            width: 220,
                            cellRenderer: '',
                            field: 'kecamatan'
                        },
                        {
                            headerName: "Desa / Kelurahan",
                            width: 320,
                            cellRenderer: '',
                            field: 'desa_kelurahan'
                        },
                        {
                            headerName: "ID Keluarga",
                            width: 220,
                            cellRenderer: '',
                            field: 'id_keluarga_program_ppke'
                        },
                    ]
                },
                {
                    headerName: 'Data Pribadi',
                    children: [
                        {
                            headerName: "Tanggal Lahir",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'tanggal_lahir_kepala_keluarga'
                        },
                        {
                            headerName: "Pekerjaan Kepala Keluarga",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'pekerjaan_kepala_keluarga'
                        },
                        {
                            headerName: "Pendidikan Kepala Keluarga",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'pendidikan_kepala_keluarga'
                        },
                        {
                            headerName: "Status Kawin Kepala Keluarga",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'pendidikan_kepala_keluarga'
                        },
                    ]
                },
                {
                    headerName: 'Kondisi/Keadaan Rumah',
                    children: [
                        {
                            headerName: "Kepemilikan Rumah",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'kepemilikan_rumah'
                        },
                        {
                            headerName: "Memiliki Simpanan Uang/Perhiasan/Ternak (Harta Benda)",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'memiliki_simpanan_uang_perhiasan_ternak_lainnya'
                        },
                        {
                            headerName: "Jenis Atap",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'jenis_atap'
                        },
                        {
                            headerName: "Kualitas Atap",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'kualitas_atap'
                        },
                        {
                            headerName: "Jenis Dinding",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'jenis_dinding'
                        },
                        {
                            headerName: "Kualitas Dinding",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'kualitas_dinding'
                        },
                        {
                            headerName: "Jenis Lantai",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'jenis_lantai'
                        },
                        {
                            headerName: "Kualitas Lantai",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'kualitas_lantai'
                        },
                        {
                            headerName: "Sumber Penerangan",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'sumber_penerangan'
                        },
                        {
                            headerName: "Daya Listrik Terpasang",
                            width: 225,
                            sortable: false,
                            cellRenderer: '',
                            field: 'daya_listrik_terpasang'
                        },
                    ]
                },
                {
                    headerName: "Bahan Bakar Memasak",
                    width: 320,
                    cellRenderer: '',
                    field: 'bahan_bakar_memasak'
                },
                {
                    headerName: "Sumber Air Minum",
                    width: 320,
                    cellRenderer: '',
                    field: 'sumber_air_minum'
                },
                {
                    headerName: "Memiliki fasilitas Buang Air Besar",
                    width: 320,
                    cellRenderer: '',
                    field: 'memiliki_fasilitas_buang_air_besar'
                },
                {
                    headerName: "Resiko Stunting",
                    width: 320,
                    cellRenderer: '',
                    field: 'resiko_stunting'
                },
                {
                    headerName: 'Data Intervensi',
                    children: [
                        {
                            headerName: "Penerima BPNT",
                            field: "penerima_bpnt",
                            width: 170,
                            filter: 'text',
                            cellRenderer: statusBantuanCellRenderer,
                            cellStyle: { textAlign: 'center', fontSize: '22px' }
                            // cellStyle: params => params.value === 'Active' ? { backgroundColor: '#c8e6c9' } : { backgroundColor: '#ffcdd2' } // Green if active, red otherwise
                        },
                        {
                            headerName: "Penerima BPUM",
                            field: "penerima_bpum",
                            width: 170,
                            filter: 'text',
                            cellRenderer: statusBantuanCellRenderer,
                            cellStyle: { textAlign: 'center', fontSize: '22px' }
                        },
                        { headerName: "Penerima BST", field: "penerima_bst", width: 170, filter: 'text', cellRenderer: statusBantuanCellRenderer,
                            cellStyle: { textAlign: 'center', fontSize: '22px' } },
                        { headerName: "Penerima PKH", field: "penerima_pkh", width: 170, filter: 'text', cellRenderer: statusBantuanCellRenderer,
                            cellStyle: { textAlign: 'center', fontSize: '22px' } },
                        { headerName: "Penerima SEMBAKO", field: "penerima_sembako", width: 170, filter: 'text', cellRenderer: statusBantuanCellRenderer,
                            cellStyle: { textAlign: 'center', fontSize: '22px' } },
                        { headerName: "Penerima Prakerja", field: "penerima_sembako", width: 170, filter: 'text', cellRenderer: statusBantuanCellRenderer,
                            cellStyle: { textAlign: 'center', fontSize: '22px' } },
                        { headerName: "Penerima KUR", field: "penerima_kur", width: 170, filter: 'text', cellRenderer: statusBantuanCellRenderer,
                            cellStyle: { textAlign: 'center', fontSize: '22px' } }
                    ]
                }
            ];
        },
        calculateRowCount() {
            if (this.api && this.rowData) {
                let model = this.gridOptions.api.getModel();
                let totalRows = this.rowData.length;
                let processedRows = model.getRowCount();
                this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
            }
        },
        onModelUpdated() {
            console.log('onModelUpdated');
            this.calculateRowCount();
        },

        onReady(params) {
            console.log('onReady');

            this.api = params.api;
            this.calculateRowCount();

            this.api.sizeColumnsToFit();
        },
        onCellClicked(event) {
            console.log('onCellClicked: ' + event.rowIndex + ' ' + event.colDef.field);
        },

        onCellValueChanged(event) {
            console.log('onCellValueChanged: ' + event.oldValue + ' to ' + event.newValue);
        },

        onCellDoubleClicked(event) {
            console.log('onCellDoubleClicked: ' + event.rowIndex + ' ' + event.colDef.field);
        },

        onCellContextMenu(event) {
            console.log('onCellContextMenu: ' + event.rowIndex + ' ' + event.colDef.field);
        },

        onCellFocused(event) {
            console.log('onCellFocused: (' + event.rowIndex + ',' + event.colIndex + ')');
        },

        // taking out, as when we 'select all', it prints to much to the console!!
        // eslint-disable-next-line
        onRowSelected(event) {
            // console.log('onRowSelected: ' + event.node.data.name);
        },

        onSelectionChanged() {
            console.log('selectionChanged');
        },

        onFilterModified() {
            console.log('onFilterModified');
        },
        onRowClicked(event) {
            console.log('onRowClicked: ' + event.node.data.name);
        },

        onQuickFilterChanged(event) {
            this.gridOptions.api.setQuickFilter(event.target.value);
        },

        // here we use one generic event to handle all the column type events.
        // the method just prints the event name
        onColumnEvent(event) {
            console.log('onColumnEvent: ' + event);
        },

        onsideBarVisible(value) {
            this.gridOptions.api.setSideBarVisible(value);
        },
    },
    beforeMount() {
        this.gridOptions = this.gridOptions;
        this.getDataP3keKeluargaRutilahu();
    }
};


function normalizeText(text) {
    // Split the text into an array of words
    const words = text.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
    });

    // Join the capitalized words back into a single string
    const normalizedText = capitalizedWords.join(' ');

    return normalizedText;
}

function statusBantuanCellRenderer(params) {
    if (params.value === 'Ya') {
        // Example using Unicode Character for a check mark and simple CSS for color
        return '<i class="ri-checkbox-circle-fill text-success"></i>';
    } else {
        // Example using Unicode Character for a cross
        return '<i class="ri-close-circle-fill text-danger"></i>';
    }
}

function normalizeAddress(address) {
    // Trim leading and trailing whitespace
    const trimmedAddress = address.trim();

    // Split the address into an array of words
    const words = trimmedAddress.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
    });

    // Join the capitalized words back into a single string
    const normalizedAddress = capitalizedWords.join(' ');

    return normalizedAddress;
}


function percentCellRenderer(params) {
    let value = params.value;

    let eDivPercentBar = document.createElement('div');
    eDivPercentBar.className = 'div-percent-bar';
    eDivPercentBar.style.width = value + '%';
    if (value < 20) {
        eDivPercentBar.style.backgroundColor = 'red';
    } else if (value < 60) {
        eDivPercentBar.style.backgroundColor = '#ff9900';
    } else {
        eDivPercentBar.style.backgroundColor = '#00A000';
    }

    let eValue = document.createElement('div');
    eValue.className = 'div-percent-value';
    eValue.innerHTML = value + '%';

    let eOuterDiv = document.createElement('div');
    eOuterDiv.className = 'div-outer-div';
    eOuterDiv.appendChild(eValue);
    eOuterDiv.appendChild(eDivPercentBar);

    return eOuterDiv;
}

</script>
<style>
.ag-cell {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
}

label {
    font-weight: normal !important;
}

.div-percent-bar {
    display: inline-block;
    height: 100%;
    position: relative;
    z-index: 0;
}

.div-percent-value {
    position: absolute;
    padding-left: 4px;
    font-weight: bold;
    font-size: 13px;
    z-index: 100;
}

.div-outer-div {
    display: inline-block;
    height: 100%;
    width: 100%;
}

.ag-menu {
    z-index: 200;
}

.toolbar button {
    margin-left: 5px;
    margin-right: 5px;
    padding: 2px;
}
</style>

<template>
    <div>
        <ag-grid-vue style="width: 100%; height:260px;" class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
            :gridOptions="gridOptions" :columnDefs="columnDefs" :rowData="rowData" :sideBar="sideBar" :modules="modules"
            :pagination="true" :defaultColDef="{
                sortable: true,
                resizable: true,
                filter: true
            }" :groupHeaders="true" :suppressRowClickSelection="true" rowSelection="multiple" @grid-ready="onReady"
            @model-updated="onModelUpdated" @cell-clicked="onCellClicked" @cell-double-clicked="onCellDoubleClicked"
            @cell-context-menu="onCellContextMenu" @cell-value-changed="onCellValueChanged" @cell-focused="onCellFocused"
            @row-selected="onRowSelected" @selection-changed="onSelectionChanged" @filter-modified="onFilterModified"
            @row-clicked="onRowClicked" @column-everything-changed="onColumnEvent" @column-row-group-changed="onColumnEvent"
            @column-value-Changed="onColumnEvent" @column-moved="onColumnEvent" @column-visible="onColumnEvent"
            @column-group-Opened="onColumnEvent" @column-resized="onColumnEvent"
            @column-pinned-count-changed="onColumnEvent">
        </ag-grid-vue>
    </div>
</template>
  
