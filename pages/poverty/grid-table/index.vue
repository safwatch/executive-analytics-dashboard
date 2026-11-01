<script>
import VueApexCharts from "vue-apexcharts";

import {
    sparklineSalesChart,
    sparklineExpensesChart,
    sparklineProfitsChart,
    linewithDataChart,
    gradientLineChart,
    stackedAreaChart,
    basicColumChart,
    basicBarChart,
    nagativeValueBarChart,
    lineColumAreaChart,
    multipleYAxisChart,
    simpleBubbleChart,
    scatterChart,
    simplePieChart,
    gradientDonutChart,
    patternedDonutChart,
    basicRadialBarChart,
    multipleRadialBars,
    strokedCircularGuage,
} from "./data";

import { AgGridVue } from "@ag-grid-community/vue";

import { ProficiencyFilter } from './proficiencyFilter';
import { SkillFilter } from './skillFilter';
import DateComponent from './DateComponent.vue';
import HeaderGroupComponent from './HeaderGroupComponent.vue';
import RefData from './refData'

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
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import { ViewportRowModelModule } from "@ag-grid-enterprise/viewport-row-model";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";

import Multiselect from 'vue-multiselect';
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
            isFixed: false,
            containerWidth: 0,
            value: null,
            value1: null,
            value2: null,
            options_tahun: [
                '2018',
                '2019',
                '2020',
                '2021',
                '2022',
            ],
            options_bulan: [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember',
            ],
            options_kelurahan: [
                'MELONG',
                'CIBEUREUM',
                'CIBEBER',
                'LEUWIGAJAH',
                'UTAMA',
                'BAROS',
                'SETIAMANAH',
                'PADASUKA',
                'KARANGMEKAR',
                'CIMAHI',
                'CIGUGUR TENGAH',
                'CIBABAT',
                'CITEUREUP',
                'CIPAGERAN',
                'PASIRKALIKI',
            ],
            options: [
                'Alaska',
                'Hawaii',
                'California',
                'Nevada',
                'Oregon',
                'Washington',
                'Arizona',
                'Colorado',
                'Idaho',
                'Montana',
                'Nebraska',
                'New Mexico',
                'North Dakota',
                'Utah',
                'Wyoming',
                'Alabama',
                'Arkansas',
                'Illinois',
                'Iowa',
            ],
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
                StatusBarModule,
                ViewportRowModelModule,
                ClipboardModule
            ],
            sparklineSalesChart: sparklineSalesChart,
            sparklineExpensesChart: sparklineExpensesChart,
            sparklineProfitsChart: sparklineProfitsChart,
            linewithDataChart: linewithDataChart,
            gradientLineChart: gradientLineChart,
            stackedAreaChart: stackedAreaChart,
            basicColumChart: basicColumChart,
            basicBarChart: basicBarChart,
            nagativeValueBarChart: nagativeValueBarChart,
            lineColumAreaChart: lineColumAreaChart,
            multipleYAxisChart: multipleYAxisChart,
            simpleBubbleChart: simpleBubbleChart,
            scatterChart: scatterChart,
            simplePieChart: simplePieChart,
            gradientDonutChart: gradientDonutChart,
            patternedDonutChart: patternedDonutChart,
            basicRadialBarChart: basicRadialBarChart,
            multipleRadialBars: multipleRadialBars,
            strokedCircularGuage: strokedCircularGuage,
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
        MarketingReports,
        Multiselect,
        apexchart: () => import("vue-apexcharts"),
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
        this.statusBar = {
            statusPanels: [
                {
                    statusPanel: 'agTotalAndFilteredRowCountComponent',
                    align: 'left',
                }
            ]
        };
        this.paginationPageSize = 10;
    },
    methods: {

        // get data p3ke individu
        getDataP3keIndividu() {
            this.$store.dispatch('p3ke/getAllP3keIndividu', {
                start: 0,
                limit: 1000,
            }).then((status) => {
                if (status) {

                    let responseIndividu = this.$store.state.p3ke.p3keIndividuList.result.individu;

                    for (var i = 0; i < responseIndividu.length; i++) {
                        this.individuData.push({
                            no: responseIndividu[i].no,
                            id_keluarga_program_ppke: responseIndividu[i].id_keluarga_program_ppke,
                            dimuktakhirkan_tahun: responseIndividu[i].dimuktakhirkan_tahun,
                            provinsi: responseIndividu[i].provinsi,
                            kabupaten_kota: responseIndividu[i].kabupaten_kota,
                            kecamatan: responseIndividu[i].kecamatan,
                            desa_kelurahan: responseIndividu[i].desa_kelurahan,
                            kode_kemdagri: responseIndividu[i].kode_kemdagri,
                            desil_kesejahteraan: responseIndividu[i].desil_kesejahteraan,
                            persentil: responseIndividu[i].persentil,
                            alamat: responseIndividu[i].alamat,
                            id_individu: responseIndividu[i].id_individu,
                            prioritas_verval: responseIndividu[i].prioritas_verval,
                            nama: responseIndividu[i].nama,
                            nik: responseIndividu[i].nik,
                            tanggal_lahir: responseIndividu[i].tanggal_lahir,
                            padan_dukcapil: responseIndividu[i].no,
                            jenis_kelamin: responseIndividu[i].jenis_kelamin,
                            hubungan_dengan_kepala_keluarga: responseIndividu[i].hubungan_dengan_kepala_keluarga,
                            status_kawin: responseIndividu[i].status_kawin,
                            pekerjaan: responseIndividu[i].pekerjaan,
                            status_pekerjaan: responseIndividu[i].status_pekerjaan,
                            pendidikan: responseIndividu[i].pendidikan,
                            usia_dua_ribu_dua_tiga: responseIndividu[i].usia_dua_ribu_dua_tiga,
                            kelompok_usia_dua_ribu_dua_tiga: responseIndividu[i].kelompok_usia_dua_ribu_dua_tiga,
                            penerima_bpnt: responseIndividu[i].penerima_bpnt,
                            penerima_bpum: responseIndividu[i].penerima_bpum,
                            penerima_bst: responseIndividu[i].penerima_bst,
                            penerima_pkh: responseIndividu[i].penerima_pkh,
                            penerima_sembako: responseIndividu[i].penerima_sembako,
                            penerima_prakerja: responseIndividu[i].penerima_prakerja,
                            penerima_kur: responseIndividu[i].penerima_kur,
                        });
                    }

                    // console.log(this.individuData);
                    this.createRowByData();
                    this.createColumnDefs();
                    this.showGrid = true;
                }

            }).catch((error) => {
                console.log('error in poverty get p3ke individu', error);
            });
        },

        createRowByData() {
            let data = this.$store.state.p3ke.p3keIndividuList.result.individu;

            const rowData = [];

            for (let i = 0; i < data.length; i++) {
                rowData.push({
                    nama: normalizeText(data[i].nama),
                    kecamatan: normalizeText(data[i].kecamatan),
                    dimuktakhirkan_tahun: data[i].dimuktakhirkan_tahun,
                    desil_kesejahteraan: normalizeText(data[i].desil_kesejahteraan),
                    persentil: data[i].persentil,
                    nik: data[i].nik,
                    alamat: normalizeAddress(data[i].alamat),
                    kecamatan: normalizeText(data[i].kecamatan),
                    desa_kelurahan: normalizeText(data[i].desa_kelurahan),
                    id_individu: data[i].id_individu,
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
                    headerName: '#', minWidth: 60, width: 60, checkboxSelection: true, sortable: false,
                    suppressMenu: true, pinned: true
                },
                {
                    headerName: 'Daftar P3KE Individu',
                    headerGroupComponent: 'HeaderGroupComponent',
                    children: [
                        {
                            headerName: "Nama", field: "nama",
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
                    headerName: 'Data Individu',
                    children: [
                        {
                            headerName: "NIK",
                            width: 125,
                            sortable: false,
                            cellRenderer: '',
                            filter: SkillFilter,
                            field: 'nik'
                        },
                        {
                            headerName: "Alamat",
                            width: 500,
                            sortable: false,
                            field: 'alamat',
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
                            field: "proficiency",
                            width: 320,
                            cellRenderer: '',
                            field: 'desa_kelurahan'
                        },
                        {
                            headerName: "ID Individu",
                            field: "proficiency",
                            width: 220,
                            cellRenderer: '',
                            field: 'id_individu'
                        },
                    ]
                },
                {
                    headerName: 'Data Intervensi',
                    children: [
                        { headerName: "Penerima BPNT", field: "penerima_bpnt", width: 170, filter: 'text' },
                        { headerName: "Penerima BPUM", field: "penerima_bpum", width: 170, filter: 'text' },
                        { headerName: "Penerima BST", field: "penerima_bst", width: 170, filter: 'text' },
                        { headerName: "Penerima PKH", field: "penerima_pkh", width: 170, filter: 'text' },
                        { headerName: "Penerima SEMBAKO", field: "penerima_sembako", width: 170, filter: 'text' },
                        { headerName: "Penerima Prakerja", field: "penerima_sembako", width: 170, filter: 'text' },
                        { headerName: "Penerima KUR", field: "penerima_kur", width: 170, filter: 'text' }
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
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.isFixed = scrollTop > 70;
        },

        getColumnContainerWidth() {
            console.log("column : " + this.$refs.column);
            // const columnWidth = this.$refs.column;
            // console.log('Column Width:', columnWidth);
        }
    },
    beforeMount() {
        this.gridOptions = {};
        this.getDataP3keIndividu();
        this.getColumnContainerWidth();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
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
.fixed {
    position: fixed;
    top: 70px;
    z-index: 9999;
    margin: 0 -15px;
    /* Add your desired styles for the fixed component */
}

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

        <!-- start of parameter -->
        <div class="row">
            <div class="col-12 p-0">
                <div class="body-parameter" :class="{ 'fixed': isFixed }" ref="content">
                    <div class="container p-0">
                        <div class="col-12 p-0">
                            <div class="row align-items-start">
                                <div class="col">
                                    <label for="inputEmail3" class="col-sm-4 col-form-label float-left">Kelurahan</label>
                                    <div class="col-sm-8 float-left">
                                        <multiselect v-model="value" :options="options_kelurahan"></multiselect>
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label float-left">Tahun</label>
                                    <div class="col-sm-10 float-left">
                                        <multiselect v-model="value1" :options="options_tahun"></multiselect>
                                    </div>
                                </div>
                                <div class="col">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label float-left">Bulan</label>
                                    <div class="col-sm-10 float-left">
                                        <multiselect v-model="value2" :options="options_bulan"></multiselect>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-rounded btn-dark"><i
                                            class=" ri-filter-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of parameter -->
        <!-- end of PageHeader -->
        <div class="row">
            <div class="col-12">
                <Portlet :headertitle="'Sparkline Charts'">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card-body pt-0 pr-0">
                                <!-- sparkline total sales chart -->
                                <apexchart class="apex-charts" type="area" height="160" :series="sparklineSalesChart.series"
                                    :options="sparklineSalesChart.chartOptions"></apexchart>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card-body pt-0 pr-0 pl-0">
                                <!-- sparkline expenses chart -->
                                <apexchart class="apex-charts" type="area" height="160"
                                    :series="sparklineExpensesChart.series" :options="sparklineExpensesChart.chartOptions">
                                </apexchart>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card-body pt-0 pl-0">
                                <!-- sparkline profits chart -->
                                <apexchart class="apex-charts" type="area" height="160"
                                    :series="sparklineProfitsChart.series" :options="sparklineProfitsChart.chartOptions">
                                </apexchart>
                            </div>
                        </div>
                    </div>
                </Portlet>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-6">
                <Portlet :headertitle="'Line with Data Labels'">
                    <div class="card-body pt-0">
                        <!-- line with data labels chart -->
                        <apexchart class="apex-charts" height="380" type="line" :series="linewithDataChart.series"
                            :options="linewithDataChart.chartOptions"></apexchart>
                    </div>
                </Portlet>
            </div>

            <div class="col-xl-6">
                <Portlet :headertitle="'Gradient Line Chart'">
                    <div class="card-body pt-0">
                        <!-- Gradient Line Chart -->
                        <apexchart class="apex-charts" height="380" type="line" :series="gradientLineChart.series"
                            :options="gradientLineChart.chartOptions"></apexchart>
                    </div>
                </Portlet>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6">
                <Portlet :headertitle="'Stacked Area'">
                    <!-- Stacked Area chart -->
                    <div class="card-body pt-0">
                        <apexchart class="apex-charts" height="380" type="area" :series="stackedAreaChart.series"
                            :options="stackedAreaChart.chartOptions"></apexchart>
                    </div>
                </Portlet>
            </div>
            <div class="col-xl-6">
                <Portlet :headertitle="'Basic Column Chart'">
                    <div class="card-body pt-0">
                        <!-- basic column chart -->
                        <apexchart height="380" type="bar" class="apex-charts" :series="basicColumChart.series"
                            :options="basicColumChart.chartOptions"></apexchart>
                    </div>
                </Portlet>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4 col-lg-6">
                <RevenueReport />
            </div>
            <!-- end col -->
            <div class="col-xl-4 col-lg-6">
                <ProductsSales />
            </div>
            <!-- end col -->
            <div class="col-xl-4 col-lg-6">
                <MarketingReports />
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column w-100 flex-grow-1 flex-shrink-1">
                            <div style="padding: 4px;">
                                <div>
                                    <b>Daftar Individu Desil 1 - 4 Menurut Program PPKE di Civic Administration</b>
                                    {{ rowCount }}
                                </div>
                            </div>
                            <div style="clear: both;"></div>
                            <div v-if="showGrid" class="d-flex flex-column flex-grow-1 flex-shrink-1">
                                <div style="padding: 4px;" class="btn-toolbar">
                                </div>
                                <div class="btn-toolbar d-flex align-items-center justify-content-between py-2">
                                    <button class="btn btn-primary">P3KE Keluarga</button>
                                    <div style="float: right;" class="d-flex">
                                        <input class="mr-1 form-control d-inline-block" @keyup="onQuickFilterChanged"
                                            type="text" id="quickFilterInput" placeholder="Cari data..." />
                                        <button class="btn btn-primary py-0" style="white-space: nowrap;"><i
                                                class="ri-search-eye-line"></i></button>
                                    </div>
                                </div>
                                <ag-grid-vue style="width: 100%; height:500px;"
                                    class="flex-grow-1 flex-shrink-1 ag-theme-alpine" :gridOptions="gridOptions"
                                    :columnDefs="columnDefs" :rowData="rowData" :sideBar="sideBar" :modules="modules"
                                    :statusBar="statusBar" :pagination="true" :defaultColDef="{
                                        sortable: true,
                                        resizable: true,
                                        filter: true
                                    }" :groupHeaders="true" :suppressRowClickSelection="true"
                                    rowSelection="multiple" @grid-ready="onReady" @model-updated="onModelUpdated"
                                    @cell-clicked="onCellClicked" @cell-double-clicked="onCellDoubleClicked"
                                    @cell-context-menu="onCellContextMenu" @cell-value-changed="onCellValueChanged"
                                    @cell-focused="onCellFocused" @row-selected="onRowSelected"
                                    @selection-changed="onSelectionChanged" @filter-modified="onFilterModified"
                                    @virtual-row-removed="onVirtualRowRemoved" @row-clicked="onRowClicked"
                                    @column-everything-changed="onColumnEvent" @column-row-group-changed="onColumnEvent"
                                    @column-value-Changed="onColumnEvent" @column-moved="onColumnEvent"
                                    @column-visible="onColumnEvent" @column-group-Opened="onColumnEvent"
                                    @column-resized="onColumnEvent" @column-pinned-count-changed="onColumnEvent">
                                </ag-grid-vue>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>