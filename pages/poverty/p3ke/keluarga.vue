<script>
import {AgGridVue} from "@ag-grid-community/vue";

import {ProficiencyFilter} from '../grid-table/proficiencyFilter';
import {SkillFilter} from '../grid-table/skillFilter';
import DateComponent from '../grid-table/DateComponent.vue';
import HeaderGroupComponent from '../grid-table/HeaderGroupComponent.vue';
import RefData from '../grid-table/refData'

import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {ExcelExportModule} from "@ag-grid-enterprise/excel-export";
import {FiltersToolPanelModule} from "@ag-grid-enterprise/filter-tool-panel";
import {SparklinesModule} from "@ag-grid-enterprise/sparklines";
import {GridChartsModule} from "@ag-grid-enterprise/charts";
import {MasterDetailModule} from "@ag-grid-enterprise/master-detail";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {MultiFilterModule} from "@ag-grid-enterprise/multi-filter";
import {RangeSelectionModule} from "@ag-grid-enterprise/range-selection";
import {RichSelectModule} from "@ag-grid-enterprise/rich-select";
import {RowGroupingModule} from "@ag-grid-enterprise/row-grouping";
import {ServerSideRowModelModule} from "@ag-grid-enterprise/server-side-row-model";
import {SetFilterModule} from "@ag-grid-enterprise/set-filter";
import {SideBarModule} from "@ag-grid-enterprise/side-bar";
import {ViewportRowModelModule} from "@ag-grid-enterprise/viewport-row-model";
import {ClipboardModule} from "@ag-grid-enterprise/clipboard";

import RevenueReport from "~/components/widgets/Revenue-report";
import ProductsSales from "~/components/widgets/Products-sales";
import MarketingReports from "~/components/widgets/Marketing-reports";
import SimpleShimmer from "simple-shimmer";

export default {
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
        }
    },
    data() {
        return {
            title: 'Program PPKE',
            items: [{
                    text: 'Sampeu',
                    href: '/',
                },
                {
                    text: 'Kemiskinan',
                    href: '/',
                },
                {
                    text: 'Program PPKE',
                    active: true,
                },
            ],
            p3keKeluargaLoading: true,
            gridOptions: null,
            api: null,
            columnDefs: null,
            rowData: null,
            showGrid: false,
            sideBar: false,
            sideBarVisibility: false,
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
        }
    },
    components: {
        AgGridVue,
        SkillFilter,
        HeaderGroupComponent,
        agDateInput: DateComponent,
        SimpleShimmer,
        RevenueReport,
        ProductsSales,
        MarketingReports
    },
    created() {
        this.autoGroupColumnDef = {
            minWidth: 200,
        };
        this.sideBar = {
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
            defaultToolPanel: '',
        };
        this.paginationPageSize = 10;
    },
    methods: {

        // get data p3ke keluarga
        getDataP3keKeluarga(){
            this.$store.dispatch('p3ke/getAllP3keKeluarga',{
                    start: 0,
                    limit: 1000,
                }).then((status) => {
                    if(status){

                        let responseKeluarga = this.$store.state.p3ke.p3keKeluargaList.result.keluarga;

                        for (var i=0; i<responseKeluarga.length; i++){
                            this.keluargaData.push({
                                no	                                            : responseKeluarga[i].no,
                                id_keluarga_program_ppke	                    : responseKeluarga[i].id_keluarga_program_ppke,
                                dimuktakhirkan_tahun	                        : responseKeluarga[i].dimuktakhirkan_tahun,
                                provinsi	                                    : responseKeluarga[i].provinsi,
                                kabupaten_kota	                                : responseKeluarga[i].kabupaten_kota,
                                kecamatan	                                    : responseKeluarga[i].kecamatan,
                                desa_kelurahan	                                : responseKeluarga[i].desa_kelurahan,
                                kode_kemdagri	                                : responseKeluarga[i].kode_kemdagri,
                                desil_kesejahteraan	                            : responseKeluarga[i].desil_kesejahteraan,
                                persentil	                                    : responseKeluarga[i].persentil,
                                alamat	                                        : responseKeluarga[i].alamat,
                                prioritas_verval	                            : responseKeluarga[i].prioritas_verval,
                                nama_kepala_keluarga	                        : responseKeluarga[i].nama_kepala_keluarga,
                                nik_kepala_keluarga	                            : responseKeluarga[i].nik_kepala_keluarga,
                                nik_kepala_keluarga_padan_kemdagri	            : responseKeluarga[i].nik_kepala_keluarga_padan_kemdagri,
                                jenis_kelamin_kepala_keluarga	                : responseKeluarga[i].jenis_kelamin_kepala_keluarga,
                                tanggal_lahir_kepala_keluarga   	            : responseKeluarga[i].tanggal_lahir_kepala_keluarga,
                                pekerjaan_kepala_keluarga	                    : responseKeluarga[i].pekerjaan_kepala_keluarga,
                                status_pekerjaan_kepala_keluarga	            : responseKeluarga[i].status_pekerjaan_kepala_keluarga, 
                                pendidikan_kepala_keluarga	                    : responseKeluarga[i].pendidikan_kepala_keluarga,
                                status_kawin_kepala_keluarga	                : responseKeluarga[i].status_kawin_kepala_keluarga,
                                kepemilikan_rumah	                            : responseKeluarga[i].kepemilikan_rumah,
                                memiliki_simpanan_uang_perhiasan_ternak_lainnya	: responseKeluarga[i].memiliki_simpanan_uang_perhiasan_ternak_lainnya,
                                jenis_atap	                                    : responseKeluarga[i].jenis_atap,
                                kualitas_atap	                                : responseKeluarga[i].kualitas_atap,
                                jenis_dinding	                                : responseKeluarga[i].jenis_dinding, 
                                kualitas_dinding	                            : responseKeluarga[i].kualitas_dinding,
                                jenis_lantai	                                : responseKeluarga[i].jenis_lantai,
                                kualitas_lantai	                                : responseKeluarga[i].kualitas_lantai,
                                sumber_penerangan	                            : responseKeluarga[i].sumber_penerangan,
                                daya_listrik_terpasang	                        : responseKeluarga[i].daya_listrik_terpasang,
                                bahan_bakar_memasak	                            : responseKeluarga[i].bahan_bakar_memasak, 
                                sumber_air_minum	                            : responseKeluarga[i].sumber_air_minum,
                                memiliki_fasilitas_buang_air_besar	            : responseKeluarga[i].memiliki_fasilitas_buang_air_besar,
                                resiko_stunting	                                : responseKeluarga[i].resiko_stunting,
                                penerima_bpnt	                                : responseKeluarga[i].penerima_bpnt,
                                penerima_bpum	                                : responseKeluarga[i].penerima_bpum,
                                penerima_bst	                                : responseKeluarga[i].penerima_bst,
                                penerima_pkh	                                : responseKeluarga[i].penerima_pkh,
                                penerima_sembako	                            : responseKeluarga[i].penerima_sembako,
                                penerima_prakerja	                            : responseKeluarga[i].penerima_prakerja,
                                penerima_kur	                                : responseKeluarga[i].penerima_kur,
                            });
                        } 

                        // console.log(this.individuData);
                        this.createRowByData();
                        this.createColumnDefs();
                        this.showGrid = true;
                        this.p3keKeluargaLoading = false;
                    }
            
                }).catch((error) => {
                    console.log('error in poverty get p3ke keluarga', error);
                });
        },

        createRowByData(){
            let data = this.$store.state.p3ke.p3keKeluargaList.result.keluarga;
            console.log(data);

            const rowData = [];
            
            for (let i = 0; i < data.length; i++) {
                rowData.push({
                    no	: data[i].no,
                    id_keluarga_program_ppke	: data[i].id_keluarga_program_ppke,
                    dimuktakhirkan_tahun	: data[i].dimuktakhirkan_tahun,
                    provinsi	:  normalizeText(data[i].provinsi),
                    kabupaten_kota	:  normalizeText(data[i].kabupaten_kota),
                    kecamatan	:  normalizeText(data[i].kecamatan),
                    desa_kelurahan	:  normalizeText(data[i].desa_kelurahan),
                    kode_kemdagri	:  data[i].kode_kemdagri,
                    desil_kesejahteraan	: data[i].desil_kesejahteraan,
                    persentil	:  data[i].persentil,
                    alamat	: normalizeAddress(data[i].alamat),
                    prioritas_verval	: normalizeText(data[i].prioritas_verval),
                    nama_kepala_keluarga	: normalizeText(data[i].nama_kepala_keluarga),
                    nik_kepala_keluarga	: data[i].nik_kepala_keluarga,
                    nik_kepala_keluarga_padan_kemdagri	:  normalizeText(data[i].nik_kepala_keluarga_padan_kemdagri),
                    jenis_kelamin_kepala_keluarga	: normalizeText(data[i].jenis_kelamin_kepala_keluarga),
                    tanggal_lahir_kepala_keluarga	: data[i].tanggal_lahir_kepala_keluarga,
                    pekerjaan_kepala_keluarga	: normalizeText(data[i].pekerjaan_kepala_keluarga),
                    status_pekerjaan_kepala_keluarga	: normalizeText(data[i].status_pekerjaan_kepala_keluarga),
                    pendidikan_kepala_keluarga	: normalizeText(data[i].pendidikan_kepala_keluarga),
                    status_kawin_kepala_keluarga	: normalizeText(data[i].status_kawin_kepala_keluarga),
                    kepemilikan_rumah	:  normalizeText(data[i].kepemilikan_rumah),
                    memiliki_simpanan_uang_perhiasan_ternak_lainnya	:  normalizeText(data[i].memiliki_simpanan_uang_perhiasan_ternak_lainnya),
                    jenis_atap	: normalizeText(data[i].jenis_atap),
                    kualitas_atap	: normalizeText(data[i].kualitas_atap),
                    jenis_dinding	: normalizeText(data[i].jenis_dinding),
                    kualitas_dinding	:  normalizeText(data[i].kualitas_dinding),
                    jenis_lantai	:  normalizeText(data[i].jenis_lantai),
                    kualitas_lantai	:  normalizeText(data[i].kualitas_lantai),
                    sumber_penerangan	:  normalizeText(data[i].sumber_penerangan),
                    daya_listrik_terpasang	:  data[i].daya_listrik_terpasang,
                    bahan_bakar_memasak	: normalizeText(data[i].bahan_bakar_memasak), 
                    sumber_air_minum	:  normalizeText(data[i].sumber_air_minum),
                    memiliki_fasilitas_buang_air_besar	:  normalizeText(data[i].memiliki_fasilitas_buang_air_besar),
                    resiko_stunting	: normalizeText(data[i].resiko_stunting),
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

        createRowData() {
            const rowData = [];

            for (let i = 0; i < 200; i++) {
                const countryData = RefData.COUNTRIES[i % RefData.COUNTRIES.length];
                rowData.push({
                    name: RefData.FIRST_NAMES[i % RefData.FIRST_NAMES.length] + ' ' + RefData.LAST_NAMES[i % RefData.LAST_NAMES.length],
                    skills: {
                        android: Math.random() < 0.4,
                        html5: Math.random() < 0.4,
                        mac: Math.random() < 0.4,
                        windows: Math.random() < 0.4,
                        css: Math.random() < 0.4
                    },
                    dob: RefData.DOBs[i % RefData.DOBs.length],
                    address: RefData.ADDRESSES[i % RefData.ADDRESSES.length],
                    years: Math.round(Math.random() * 100),
                    proficiency: Math.round(Math.random() * 100),
                    country: countryData.country,
                    continent: countryData.continent,
                    language: countryData.language,
                    mobile: createRandomPhoneNumber(),
                    landline: createRandomPhoneNumber()
                });
            }

            this.rowData = rowData;
        },
        createColumnDefs() {
            this.columnDefs = [
                {
                    headerName: 'Daftar P3KE Kepala Keluarga',
                    headerGroupComponent: 'HeaderGroupComponent',
                    children: [
                        {
                            headerName: "Nama", field: "nama_kepala_keluarga",
                            width: 150, pinned: true,
                        },
                        {
                            headerName: "Kecamatan", field: "kecamatan", width: 210,
                            pinned: true,
                            filterParams: {cellHeight: 20}
                        },
                        {
                            headerName: "Dimutakhirkan Tahun",
                            field: "dimuktakhirkan_tahun",
                            width: 200,
                            pinned: true,
                            filter: 'agDateColumnFilter',
                            columnGroupShow: 'open'
                        }
                    ]
                },
                {
                    headerName: 'Data Desil',
                    children: [
                        {
                            headerName: "Persentil",
                            field: "proficiency",
                            width: 120,
                            field: 'persentil',
                            cellRenderer: percentCellRenderer,
                            filter: ProficiencyFilter
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
                    headerName: 'Data Keluarga',
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
                            field : 'alamat',
                        },
                        {
                            headerName: "Kecamatan",
                            field: "proficiency",
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
                    headerName: 'Data Intervensi',
                    children: [
                        {headerName: "Penerima BPNT", field: "penerima_bpnt", width: 170, filter: 'text'},
                        {headerName: "Penerima BPUM", field: "penerima_bpum", width: 170, filter: 'text'},
                        {headerName: "Penerima BST", field: "penerima_bst", width: 170, filter: 'text'},
                        {headerName: "Penerima PKH", field: "penerima_pkh", width: 170, filter: 'text'},
                        {headerName: "Penerima SEMBAKO", field: "penerima_sembako", width: 170, filter: 'text'},
                        {headerName: "Penerima Prakerja", field: "penerima_sembako", width: 170, filter: 'text'},
                        {headerName: "Penerima KUR", field: "penerima_kur", width: 170, filter: 'text'}
                    ]
                }
            ];
        },
        pad(num, totalStringSize) {
            let asString = num + "";
            while (asString.length < totalStringSize) asString = "0" + asString;
            return asString;
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

        // eslint-disable-next-line
        onVirtualRowRemoved(event) {
            // because this event gets fired LOTS of times, we don't print it to the
            // console. if you want to see it, just uncomment out this line
            // console.log('onVirtualRowRemoved: ' + event.rowIndex);
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
        this.gridOptions = {};
        this.getDataP3keKeluarga();
    }
}

function skillsCellRenderer(params) {
    let data = params.data;
    let skills = [];
    RefData.IT_SKILLS.forEach(function (skill) {
        if (data && data.skills && data.skills[skill]) {
            skills.push('<img src="https://www.ag-grid.com/example-assets/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
        }
    });
    return skills.join(' ');
}

function createRandomPhoneNumber() {
    let result = '+';
    for (let i = 0; i < 12; i++) {
        result += Math.round(Math.random() * 10);
        if (i === 2 || i === 5 || i === 8) {
            result += ' ';
        }
    }
    return result;
}

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

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

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
        <PageHeader :title="title" :items="items" />
        <!-- end of PageHeader -->
        <div class="row">
            <div class="col-12"  v-if="p3keKeluargaLoading">
                <div class="card">
                    <div class="card-body">
                        <div class="w-100">
                            <div>
                                <simple-shimmer :style="{height:'29px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'440px', borderRadius:'8px', float:'left', marginTop:'0px'}"/>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="btn-toolbar align-items-center justify-content-between py-2">
                                <simple-shimmer :style="{height:'38px', display: 'block', width:'128px', borderRadius:'8px'}"/>
                                <div style="float: right;">
                                    <simple-shimmer :style="{height:'38px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'239px', borderRadius:'8px'}"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <simple-shimmer :style="{height:'600px', display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width:'100%', borderRadius:'8px', marginTop:'0px'}"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12" v-else>
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column w-100 flex-grow-1 flex-shrink-1">
                            <div style="padding: 4px;">
                                <div>
                                    <b>Daftar Keluarga Desil 1 - 4 Menurut Program PPKE di Civic Administration</b>
                                    {{ rowCount }}
                                </div>
                            </div>
                            <div style="clear: both;"></div>
                            <div v-if="showGrid" class="d-flex flex-column flex-grow-1 flex-shrink-1">
                                <div style="padding: 4px;" class="btn-toolbar">
                                </div>
                                <div class="btn-toolbar d-flex align-items-center justify-content-between py-2">
                                    <button class="btn btn-primary">P3KE Individu</button>
                                    <div style="float: right;" class="d-flex">
                                        <input class="mr-1 form-control d-inline-block" @keyup="onQuickFilterChanged" type="text" id="quickFilterInput"
                                            placeholder="Cari data..."/>
                                            <button class="btn btn-primary py-0" style="white-space: nowrap;"><i class="ri-search-eye-line"></i></button>
                                    </div>
                                </div>
                                <ag-grid-vue style="width: 100%; height:600px;" class="flex-grow-1 flex-shrink-1 ag-theme-alpine"
                                            :gridOptions="gridOptions"
                                            :columnDefs="columnDefs"
                                            :rowData="rowData"
                                            :sideBar="sideBar"
                                            :modules="modules"
                                            :pagination="true"

                                            :defaultColDef="{
                                                sortable: true,
                                                resizable: true,
                                                filter: true
                                            }"

                                            :groupHeaders="true"
                                            :suppressRowClickSelection="true"
                                            rowSelection="multiple"

                                            @grid-ready="onReady"
                                            @model-updated="onModelUpdated"
                                            @cell-clicked="onCellClicked"
                                            @cell-double-clicked="onCellDoubleClicked"
                                            @cell-context-menu="onCellContextMenu"
                                            @cell-value-changed="onCellValueChanged"
                                            @cell-focused="onCellFocused"
                                            @row-selected="onRowSelected"
                                            @selection-changed="onSelectionChanged"
                                            @filter-modified="onFilterModified"
                                            @virtual-row-removed="onVirtualRowRemoved"
                                            @row-clicked="onRowClicked"
                                            @column-everything-changed="onColumnEvent"
                                            @column-row-group-changed="onColumnEvent"
                                            @column-value-Changed="onColumnEvent"
                                            @column-moved="onColumnEvent"
                                            @column-visible="onColumnEvent"
                                            @column-group-Opened="onColumnEvent"
                                            @column-resized="onColumnEvent"
                                            @column-pinned-count-changed="onColumnEvent">
                                </ag-grid-vue>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
