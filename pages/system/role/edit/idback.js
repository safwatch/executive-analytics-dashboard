// {/* <script>
// /**
//  * System level page
//  */
// export default {
//     head() {
//         return {
//             title: `${this.title} Pengaturan Sistem - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`,
//         };
//     },
//     data() {
//         return {
//             title: "Ubah Hak Akses",
//             tableDataKey: 0,
//             items: [
//                 {
//                     text: "Sampeu",
//                 },
//                 {
//                     text: "Pengaturan Sistem",
//                 },
//                 {
//                     text: "Hak Akses",
//                 },
//                 {
//                     text: "Ubah",
//                     active: true,
//                 },
//             ],
//             tableData: [],
//             totalRows: 1,
//             currentPage: 1,
//             perPage: 10,
//             pageOptions: [10, 25, 50, 100],
//             filter: null,
//             filterOn: [],
//             sortBy: 'module',
//             sortDesc: false,

//             fields: [
//                 {
//                     label: 'Menu',
//                     key: 'name',
//                     sortable: true
//                 },
//                 {
//                     label: 'Lihat',
//                     key: 'index',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//                 {
//                     label: 'Tambah',
//                     key: 'create',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//                 {
//                     label: 'Ubah',
//                     key: 'update',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//                 {
//                     label: 'Hapus',
//                     key: 'delete',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//                 {
//                     label: 'Cetak',
//                     key: 'print',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//                 {
//                     label: 'Detail',
//                     key: 'detail',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//                 {
//                     label: 'Import',
//                     key: 'import',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//                 {
//                     label: 'Ekport',
//                     key: 'export',
//                     sortable: false,
//                     class: 'text-center'
//                 },
//             ],
//             selected :[],
//             tryToSend : null,
//             checkedNames : []
//         };
//     },
//     computed: {
//         /**
//          * Total no. of records
//          */
//         rows() {
//             return this.tableData.length
//         },

//         notification() {
//             return this.$store ? this.$store.state.notification : null;
//         },

//         notificationAutoCloseDuration() {
//             return this.$store && this.$store.state.notification ? 5 : 0;
//         },
//     },
//     mounted() {
//         this.$store.dispatch('notification/clear');
//         // Set the initial number of items
//         this.totalRows = this.items.length
//         this.getData(0);
//     },
//     methods: {
//         getData(){
//             this.tableData = [];
//             this.$store.dispatch('role/getRoleDetail', {
//                     id: this.$route.params.id
//                 })
//                 .then(() => {
//                    let response = this.$store.state.role.roleList.result;

//                    for (var i=0; i<response.length; i++){
//                         //for level one
//                         this.tableData.push({
//                                 id: response[i].id,
//                                 name: response[i].title,
//                                 hasSub : response[i].has_sub, 
//                                 tasks : response[i].task, 
//                                 hasTask : response[i].task.length == 0 ? false : true,
//                                 subs : [], 
//                                 parentName:null,
//                                 childIndex:null,
//                                 childIndexStat:null,
//                                 childCreate:null,
//                                 childCreateStat:null,
//                                 childUpdate:null,
//                                 childUpdateStat:null,
//                                 childDelete:null,
//                                 childDetail:null,
//                                 childDetailStat:null,
//                                 childPrint:null,
//                                 childPrintStat:null,
//                                 childImport:null,
//                                 childImportStat:null,
//                                 childExport:null,
//                                 childExportStat:null,
//                         });

//                         // console.log('namaaaa', response[i].title+response[i].has_sub);

//                         //insert to task selected from level 1
//                         if(response[i].task.length > 0){
//                             let taskFirst = response[i].task;

//                             for (var a=0; a<taskFirst.length; a++){
//                                 if(taskFirst[a].status === 1){
//                                     this.selected.push(taskFirst[a].id);
//                                 }
//                             }        
//                         }

//                         //for level two   
//                         if (response[i].has_sub == true){
//                             for (var j=0; j<response[i].subs.length; j++){
//                                 this.tableData.push({
//                                     id: response[i].subs[j].id,
//                                     name: '- '+response[i].subs[j].title,
//                                     hasSub : response[i].subs[j].has_sub, 
//                                     tasks : response[i].subs[j].task, 
//                                     hasTask : response[i].subs[j].task.length == 0 ? false : true,
//                                     parentName: response[i].title,
//                                     subs : [], 
//                                     childIndex:null,
//                                     childIndexStat:null,
//                                     childCreate:null,
//                                     childCreateStat:null,
//                                     childUpdate:null,
//                                     childUpdateStat:null,
//                                     childDelete:null,
//                                     childDetail:null,
//                                     childDetailStat:null,
//                                     childPrint:null,
//                                     childPrintStat:null,
//                                     childImport:null,
//                                     childImportStat:null,
//                                     childExport:null,
//                                     childExportStat:null,
//                                 });

//                                 //insert to task selected from level 2
//                                 if(response[i].subs[j].task.length > 0){
//                                     let taskSecond = response[i].subs[j].task;

//                                     for (var b=0; b<taskSecond.length; b++){
//                                         if(taskSecond[b].status === 1){
//                                             this.selected.push(taskSecond[b].id);
//                                         }
//                                     }        
//                                 }

//                                 //sign to child level one
//                                 // if (response[i].subs[j].task.length > 0){
//                                     let idx = this.tableData.map(function(e) { return e.name; }).indexOf(response[i].title);


                                    
//                                     //cari berdasarkan title
//                                     // let a= response[i].find(key => key.title === response[i].title);

//                                     // console.log('name 1', response[i].title + j);
//                                     // console.log('cari index', response[i].subs[j].task.find(key => key.name === 'index'));
//                                     if(response[i].subs[j].task.find(key => key.name === 'create')){
//                                         this.tableData[idx].childCreate = true;
//                                         this.tableData[idx].childCreateStat = response[i].subs[j].task.find(key => key.name === 'create').status === 1 ? true : false;
//                                     }
//                                     if(response[i].subs[j].task.find(key => key.name === 'index')){
//                                         // console.log('name', response[i].title + i + j);
//                                         this.tableData[idx].childIndex = true;
//                                         this.tableData[idx].childIndexStat = response[i].subs[j].task.find(key => key.name === 'index').status === 1 ? true : false;
//                                     }
//                                     if(response[i].subs[j].task.find(key => key.name === 'update')){
//                                         this.tableData[idx].childUpdate = true;
//                                         this.tableData[idx].childUpdateStat = response[i].subs[j].task.find(key => key.name === 'update').status === 1 ? true : false;
//                                     }
//                                     if(response[i].subs[j].task.find(key => key.name === 'delete')){
//                                         this.tableData[idx].childDelete = true;
//                                         this.tableData[idx].childDeleteStat = response[i].subs[j].task.find(key => key.name === 'delete').status === 1 ? true : false;
//                                     }
//                                     if(response[i].subs[j].task.find(key => key.name === 'print')){
//                                         this.tableData[idx].childPrint = true;
//                                         this.tableData[idx].childPrintStat = response[i].subs[j].task.find(key => key.name === 'print').status === 1 ? true : false;
//                                     }
//                                     if(response[i].subs[j].task.find(key => key.name === 'detail')){
//                                         this.tableData[idx].childDetail = true;
//                                         this.tableData[idx].childDetailStat = response[i].subs[j].task.find(key => key.name === 'detail').status === 1 ? true : false;
//                                     }
//                                     if(response[i].subs[j].task.find(key => key.name === 'import')){
//                                         this.tableData[idx].childImport = true;
//                                         this.tableData[idx].childImportStat = response[i].subs[j].task.find(key => key.name === 'import').status === 1 ? true : false;
//                                     }
//                                     if(response[i].subs[j].task.find(key => key.name === 'export')){
//                                         this.tableData[idx].childExport = true;
//                                         this.tableData[idx].childExportStat = response[i].subs[j].task.find(key => key.name === 'export').status === 1 ? true : false;
//                                     }
//                                 // }

//                                 //=====/

//                                 // for level tree
//                                 if (response[i].subs[j].has_sub == true){
//                                     for (var k=0; k<response[i].subs[j].subs.length; k++){
//                                         this.tableData.push({
//                                             id: response[i].subs[j].subs[k].id,
//                                             name: '-- '+response[i].subs[j].subs[k].title,
//                                             hasSub : response[i].subs[j].subs[k].has_sub, 
//                                             tasks : response[i].subs[j].subs[k].task, 
//                                             hasTask : response[i].subs[j].subs[k].task.length == 0 ? false : true,
//                                             parentName : response[i].subs[j].title,
//                                             subs : [], 
//                                         });

//                                         //insert to task selected from level 3
//                                         if(response[i].subs[j].subs[k].task.length > 0){
//                                             let taskThird = response[i].subs[j].subs[k].task;

//                                             for (var c=0; c<taskThird.length; c++){
//                                                 if(taskThird[c].status === 1){
//                                                     this.selected.push(taskThird[c].id);
//                                                 }
//                                             }
//                                         }


//                                         // //sign to child level 2
//                                         // if (response[i].subs[j].subs[k].task.length > 0){
//                                             let idx = this.tableData.map(function(e) { return e.name; }).indexOf('- '+response[i].subs[j].title);

//                                             // console.log('name lev 2', response[i].title);

//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'create')){
//                                                 this.tableData[idx].childCreate = true;
//                                                 this.tableData[idx].childCreateStat = response[i].subs[j].subs[k].task.find(key => key.name === 'create').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'index')){
//                                                 this.tableData[idx].childIndex = true;
//                                                 this.tableData[idx].childIndexStat = response[i].subs[j].subs[k].task.find(key => key.name === 'index').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'update')){
//                                                 this.tableData[idx].childUpdate = true;
//                                                 this.tableData[idx].childUpdateStat = response[i].subs[j].subs[k].task.find(key => key.name === 'update').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'delete')){
//                                                 this.tableData[idx].childDelete = true;
//                                                 this.tableData[idx].childDeleteStat = response[i].subs[j].subs[k].task.find(key => key.name === 'delete').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'print')){
//                                                 this.tableData[idx].childPrint = true;
//                                                 this.tableData[idx].childPrintStat = response[i].subs[j].subs[k].task.find(key => key.name === 'print').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'detail')){
//                                                 this.tableData[idx].childDetail = true;
//                                                 this.tableData[idx].childDetailStat = response[i].subs[j].subs[k].task.find(key => key.name === 'detail').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'import')){
//                                                 this.tableData[idx].childImport = true;
//                                                 this.tableData[idx].childImportStat = response[i].subs[j].subs[k].task.find(key => key.name === 'import').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'export')){
//                                                 this.tableData[idx].childExport = true;
//                                                 this.tableData[idx].childExportStat = response[i].subs[j].subs[k].task.find(key => key.name === 'export').status === 1 ? true : false;
//                                             }
//                                         // }

//                                         // untuk yang punya level 3 tapi di level 2 kosong
//                                         let indx = this.tableData.map(function(e) { return e.name; }).indexOf(response[i].title);

//                                         console.log('name lev 3', response[i].title + indx);

//                                         if(response[i].subs[j].subs[k].task.find(key => key.name === 'create')){
//                                                 this.tableData[indx].childCreate = true;
//                                                 this.tableData[indx].childCreateStat = response[i].subs[j].subs[k].task.find(key => key.name === 'create').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'index')){
//                                                 this.tableData[indx].childIndex = true;
//                                                 this.tableData[indx].childIndexStat = response[i].subs[j].subs[k].task.find(key => key.name === 'index').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'update')){
//                                                 this.tableData[indx].childUpdate = true;
//                                                 this.tableData[indx].childUpdateStat = response[i].subs[j].subs[k].task.find(key => key.name === 'update').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'delete')){
//                                                 this.tableData[indx].childDelete = true;
//                                                 this.tableData[indx].childDeleteStat = response[i].subs[j].subs[k].task.find(key => key.name === 'delete').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'print')){
//                                                 this.tableData[indx].childPrint = true;
//                                                 this.tableData[indx].childPrintStat = response[i].subs[j].subs[k].task.find(key => key.name === 'print').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'detail')){
//                                                 this.tableData[indx].childDetail = true;
//                                                 this.tableData[indx].childDetailStat = response[i].subs[j].subs[k].task.find(key => key.name === 'detail').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'import')){
//                                                 this.tableData[indx].childImport = true;
//                                                 this.tableData[indx].childImportStat = response[i].subs[j].subs[k].task.find(key => key.name === 'import').status === 1 ? true : false;
//                                             }
//                                             if(response[i].subs[j].subs[k].task.find(key => key.name === 'export')){
//                                                 this.tableData[indx].childExport = true;
//                                                 this.tableData[indx].childExportStat = response[i].subs[j].subs[k].task.find(key => key.name === 'export').status === 1 ? true : false;
//                                             }

//                                     }
//                                 }
//                             }
//                         }

//                    }
//                    console.log('init selected', this.selected);
//                 })
//                 .catch((error) => {
//                     console.log('error in group', error);
//                 });
//         },

//         check(id, e) {
//             if (e.srcElement.checked){
//                 this.selected.push(id);
//             }else{
//                 this.selected.splice( this.selected.indexOf(id), 1);
//             }
            
//             console.log('after change', this.selected);
//         },

//         onStore(){
//             console.log('onstore', this.selected);
//             this.submitting = true;

//             this.tryToSend = true;

//             let textTask = this.selected.join(',');
            
//             //update role
//             let payload = {'id' : this.$route.params.id, 'tasks' : textTask, };

//             console.log('payload', payload);

//             this.patchStore(payload, "role/updateRole");
//         },

//         patchStore(payload, patch){
//             this.$store.dispatch(patch, {
//                     payload: payload,
//                 })
//                 .then((response) => {
//                     console.log('response.status', response);
//                   if (response.status == "OK"){
//                     this.tryToSend = false;
                    
//                     this.$store.dispatch('notification/success', response.message, { root: true });

//                   }else{
//                     this.tryToSend = false;
//                     this.$store.dispatch('notification/error', response.message, { root: true });
//                   }
                   
//                 })
//                 .catch((error) => {
//                     this.tryToSend = false;
//                     this.$store.dispatch('notification/error', error.message, { root: true });
//                     console.log('error in role update', error);
//                 });

//                 //for multiple action
//                 this.$store.dispatch('notification/clear');
//         },

        
//         /**
//          * Search the table data with search input
//          */
//         onFiltered(filteredItems) {
//             // Trigger pagination to update the number of buttons/pages due to filtering
//             this.totalRows = filteredItems.length
//             this.currentPage = 1
//         },

//         onChangeAll(name) {
//             // Trigger pagination to update the number of buttons/pages due to filtering
//            console.log(name);
//             var clist=document.getElementsByClassName(name);

//             console.log('onchange', clist.length);
//             for (var i = 0; i < clist.length; ++i) {
                
//                 clist[i].checked = "checked"; }
//         },
//     },
//     middleware: "router-auth",
// };
// </script>

// <template>
// <div>
//     <PageHeader :title="title" :items="items" />

//     <div class="row">
//         <div class="col-12">
//             <div class="card">
//                 <div class="card-body">
//                     <div class="row d-flex align-items-center">
//                         <div class="col-md-6 text-center text-md-left">
//                             <h4 class="header-title">Hak Akses : {{this.$route.params.id}}</h4>
//                         </div>
//                     </div>

//                     <b-alert :variant="notification.type" class="mt-3 text-center" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible>{{notification.message}}</b-alert>
                    
//                     <p class="text-muted font-13 mb-4"></p>
//                     <div class="row mb-md-2">
//                     </div>
//                     <!-- Table -->
//                     <div class="table-responsive mb-0">
//                     <b-form-checkbox-group id="checkbox-group-2"  name="flavour-2" >
//                         <b-table ref="table" :key="tableDataKey" :items="tableData" :fields="fields" responsive="sm" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                            
//                             <template v-slot:cell(index)="data">
//                                 <!-- {{data}} -->
//                                 <!-- {{data.item.childIndex}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'index')">
//                                         <input :class="data.parentName" type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'index').id, $event)" :checked="data.item.tasks.find(key => key.name === 'index').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div>
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childIndex == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childIndexStat" @change="onChangeAll(data.item.name)"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div>

                               
//                             </template>
//                             <template v-slot:cell(create)="data">
//                                 <!-- {{data}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'create')">
//                                         <input type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'create').id, $event)" :checked="data.item.tasks.find(key => key.name === 'create').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div> 
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childCreate == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childCreateStat"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div>
//                             </template>
//                             <template v-slot:cell(update)="data">
//                                 <!-- {{data}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'update')">
//                                         <input type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'update').id, $event)" :checked="data.item.tasks.find(key => key.name === 'update').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div> 
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childUpdate == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childUpdateStat"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div>
//                             </template>
//                             <template v-slot:cell(delete)="data">
//                                 <!-- {{data}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'delete')">
//                                         <input type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'delete').id, $event)" :checked="data.item.tasks.find(key => key.name === 'delete').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div> 
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childDelete == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childDeleteStat"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div>
//                             </template>
//                             <template v-slot:cell(print)="data">
//                                 <!-- {{data}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'print')">
//                                         <input type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'print').id, $event)" :checked="data.item.tasks.find(key => key.name === 'print').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div> 
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childPrint == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childPrintStat"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div>
                                
//                             </template>
//                             <template v-slot:cell(detail)="data">
//                                 <!-- {{data}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'detail')">
//                                         <input type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'detail').id, $event)" :checked="data.item.tasks.find(key => key.name === 'detail').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div> 
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childDetail == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childDetailStat"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div>
                                
//                             </template>
//                             <template v-slot:cell(import)="data">
//                                 <!-- {{data}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'import')">
//                                         <input type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'import').id, $event)" :checked="data.item.tasks.find(key => key.name === 'import').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div> 
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childImport == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childImportStat"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div>
                                
//                             </template>
//                             <template v-slot:cell(export)="data">
//                                 <!-- {{data}} -->
//                                 <div v-if= "data.item.tasks.length != 0">
//                                     <div v-if= "data.item.tasks.find(key => key.name === 'export')">
//                                         <input type="checkbox" @change="check(data.item.tasks.find(key => key.name === 'export').id, $event)" :checked="data.item.tasks.find(key => key.name === 'export').status === 1 ? true : false" :id="data.item.tasks.find(key => key.name === 'index').id">
//                                     </div> 
//                                     <div v-else>
//                                         -
//                                     </div> 
//                                 </div>
//                                 <div v-else>
//                                     <div v-if= "data.item.childExport == true">
//                                         <!-- <input type="checkbox" :checked="data.item.childExportStat"> -->
//                                     </div>
//                                     <div v-else>
                                        
//                                     </div>
//                                 </div> 
//                             </template>
//                         </b-table>
//                     </b-form-checkbox-group>
//                     </div>
//                     <div class="row">
//                         <div class="col-md-12">
//                             <nuxt-link class="btn btn-secondary my-2" to="/system/role">
//                                 Kembali
//                             </nuxt-link>
//                             <button @click="onStore()" v-if="!tryToSend" class="btn btn-primary my-2" >Simpan</button>
//                             <b-button v-if="tryToSend" variant="primary" disabled class="btn btn-primary my-2">
//                                 <b-spinner small></b-spinner>&nbsp;&nbsp;Mohon tunggu...
//                             </b-button>
//                         </div>
//                     </div>
//                     <!-- End Table -->
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </template>  */}
