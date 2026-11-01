<template>
    <div>
        <!-- shimmer -->
        <div v-if="isLoading" class="card card-animate">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'" :borderRadius="'8px'" />
                </div>
                <div class="d-flex justify-content-between">
                    <div class="w-100">
                        <div class="boxed-section col-lg-12 pt-2 px-0">
                            <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'105px'" :borderRadius="'8px'" />
                        </div>
                    </div>
                </div>
            </div><!-- end card body -->
        </div> <!-- end card-->
        <!-- end of shimmer  -->
        <div v-else class="card card-animate card-change">
            <div class="card-body">
                <div class="card-head-title position-relative">
                    <h4 class="card-head text-muted mt-0">Perangkat Daerah <br /> Pengendalian Inflasi
                    </h4>
                    <div class="card-head-popover position-absolute utl-top-minus-2 utl-right-0">
                        <a href="javascript:void(0);" id="impor-card-popover" class="text-muted" variant="light">
                            <i class="fa fa-info-circle"></i>
                        </a>
                        <b-popover target="impor-card-popover" triggers="hover" placement="right"
                            custom-class="custom-popover">
                            <template v-slot:title>
                                Perangkat Daerah Pengendalian Inflasi
                            </template>
                            <div>
                                Total Perangkat Daerah yang mengikut Pengendalian inflasi Berdasarkan Rencana Aksi
                                Pengendalian Inflasi.
                            </div>
                        </b-popover>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div class="boxed-section col-lg-12 py-4 bg-light border border-1 rounded text-center">
                        <h2 class="text-muted m-0"><span><span style="line-height: 43px;">
                                    <a href="javascript:void(0);" id="detail-workunit-popover" class="text-muted"
                                        variant="light">
                                        {{ workunit.total_workunits }}
                                    </a>
                                    <b-popover target="detail-workunit-popover" triggers="click" placement="top"
                                        custom-class="custom-popover">
                                        <template v-slot:title>
                                            Detail <b-badge class="badge-outline-secondary">{{
                                                workunit.total_workunits }}</b-badge> Perangkat Daerah
                                        </template>
                                        <div>
                                            <table class="table table-striped table-sm table-centered table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th>Perangkat Daerah</th>
                                                        <th>Total Strategi</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in performanceData" :key="index">
                                                        <td>
                                                            <h5 class="font-15 mb-1 font-weight-normal">{{ item.slug }}
                                                            </h5>
                                                            <span class="text-muted font-13">{{ item.name }}</span>
                                                        </td>
                                                        <td class="text-center">{{ item.tasks }}</td>
                                                        <td class="table-action">
                                                            <a href="javascript: void(0);" class="action-icon"
                                                                v-b-modal.login-modal data-toggle="modal"
                                                                data-target="#login-modal">
                                                                <i class="mdi mdi-eye"></i></a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </b-popover>
                                </span></span></h2>
                    </div>
                    <!-- SignIn modal content -->
                    <b-modal id="login-modal" hide-header hide-footer centered title="Center modal"
                        title-class="font-18">
                        <div class="text-center mt-2 mb-4">
                            Strategi Badan Perencanaan Pembangunan, Penelitian Pengembangan Daerah Civic Administration
                        </div>
                        <div class="px-3">
                            <table class="table table-sm table-centered mb-0 font-14">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Rencana Aksi</th>
                                        <th>Anggaran</th>
                                        <th style="width: 40%;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="width: 80%;">MEWUJUDKAN KETERJANGKAUAN HARGA</td>
                                        <td>300 Juta</td>
                                        <td>
                                            <div class="progress" style="height: 3px;">
                                                <div class="progress-bar" role="progressbar" style="width: 65%;"
                                                    aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>TERCIPTANYA KOMUNIKASI YANG EFEKTIF</td>
                                        <td>431 Juta</td>
                                        <td>
                                            <div class="progress" style="height: 3px;">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: 45%;"
                                                    aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-modal><!-- /.modal -->
                </div>
            </div><!-- end card body -->
            <div class="card-footer position-relative w-100 bg-transparent pb-0">
                <div class="position-absolute utl-bottom-0 utl-right-0">
                    <a href="javascript:void(0);" v-b-modal.modal-fullWidth
                        class="pl-4 btn btn-light btn-sm btn-goto-detail bg-transparent text-primary border-0">
                        Lihat detail <i class="mdi mdi-chevron-double-right"></i>
                    </a>
                </div>
            </div>
            <!-- Modal content -->
            <b-modal id="modal-fullWidth" title="Perangkat Daerah Pengendali Inflasi" title-class="font-14"
                dialog-class="modal-xl custom-modal" hide-footer>
                <!-- Here, dynamically load the component based on 'currentComponent' -->
                <component :is="currentComponent" />
                <template v-slot:modal-footer>
                    <b-button variant="secondary" @click="closeModal">Close</b-button>
                </template>
            </b-modal>
        </div> <!-- end card-->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

import DynamicComponentA from '@/pages/master/workunit.vue';

export default {
    data() {
        return {
            isLoading: true,
            performanceData: [{
                name: 'Badan Penanggulangan Bencana Daerah Civic Administration ',
                slug: 'BPBD',
                tasks: 2
            },
            {
                name: 'Badan Perencanaan Pembangunan, Penelitian  Pengembangan Daerah Civic Administration ',
                slug: 'Bappelitbanda',
                tasks: 3
            },
            {
                name: 'Inspektorat Civic Administration ',
                slug: 'Inspektorat',
                tasks: 1
            },
            {
                name: 'Dinas Perdagangan Koperasi UKM Perindustrian Civic Administration ',
                slug: 'Disdagkoperin',
                tasks: 2
            },
            ],
            currentComponent: null,
        };
    },
    computed: {
        ...mapState('inflationProfile', {
            workunit: state => state.workunit,
            workunitStatus: state => state.workunitStatus,
            selectedYear: state => state.selectedYear
        }),
    },
    watch: {
        workunitStatus(newStatus) {
            if (newStatus === 'success' || newStatus === 'failure') {
                this.isLoading = false; // Disable loading when data is fetched
            }
        },
        selectedYear() {
            if (this.selectedYear) {
                this.isLoading = true;
                this.fetchAggWorkunitByYear(this.selectedYear).then(() => {
                    this.isLoading = false;
                });
            } else {
                this.fetchAggWorkunitRecap().then(() => {
                    this.isLoading = false;
                });
            }
        },
        // Dynamically load a component when the modal is triggered
        'currentComponent': function (newComponent) {
            // You can dynamically change the component based on some condition
            if (newComponent === 'ComponentA') {
                this.currentComponent = DynamicComponentA;
            } else if (newComponent === 'ComponentB') {
                this.currentComponent = DynamicComponentB;
            }
        },
    },
    mounted() {
        // Check if the data is already loaded in Vuex before showing shimmer
        if (this.workunitStatus === 'success') {
            this.isLoading = false;  // Data is already fetched, no need to show shimmer
        } else {
            if (this.selectedYear) {
                this.fetchAggWorkunitByYear(this.selectedYear);
            } else {
                this.fetchAggWorkunitRecap();
            }
        }
    },
    methods: {
        ...mapActions('inflationProfile', ['fetchAggWorkunitRecap', 'fetchAggWorkunitByYear']),
        // Open modal and set dynamic component
        openModal(componentName) {
            this.currentComponent = componentName;
        },

        // Close modal
        closeModal() {
            this.$bvModal.hide('dynamic-modal');
        },
    },
    created() {
        // For demonstration, load a default component
        this.openModal('ComponentA');
    },
};
</script>
