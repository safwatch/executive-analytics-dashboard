<script>

// add component
import SummaryExecutiveComponent from '~/components/widgets/inflation/Summary-executive.vue'

// add filter for content
import SummaryFilterComponent from '~/components/widgets/inflation/filter/Summary-executive-filter.vue'
import Multiselect from 'vue-multiselect';

export default {
    head() {
        return {
            title: `${this.title} - Sistem Informasi Pemerintah Eksekutif Umum Civic Administration`
        }
    },
    name: 'app-viz',
    components: {
        Multiselect,
        'summary-executive-component': SummaryFilterComponent,
        SummaryExecutiveComponent,
    },
    methods: {
        handleScroll() {
            console.log('scrolled');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.isFixed = scrollTop > 70;
        },
    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll);
        console.log("beforeMount: ",this.isFixed);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    data() {
        return {
            title: 'Ringkasan Eksekutif',
            items: [{
                text: 'Sampeu',
                href: '/',
            },
            {
                text: 'Inflasi Daerah',
                href: '/',
            },
            {
                text: 'Ringkasan Eksekutif',
                active: true,
            },
            ],
            currentFilter: {},
            isFixed: false,
        }
    },
    computed: {
        currentFilterComponent() {
            return 'summary-executive-component'
        },
    },
}
</script>
<template>
    <div>
        <PageHeader :title="title" :items="items" />
        <!-- start of parameter -->
        <div class="row">
            <div class="col-12 p-0">
                <div class="body-parameter" :class="{ 'fixed': isFixed }" ref="content">
                    <div class="container p-0">
                        <div class="col-12 p-0">
                            <component :is="currentFilterComponent"></component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of parameter -->
        <div class="row">
            <div class="col-xl-12">
                <SummaryExecutiveComponent />
            </div>
        </div>

        
    </div>
</template>
<style scoped>
.fixed {
    position: fixed;
    top: 70px;
    z-index: 9999;
    margin: 0 -15px;
    width: 100%;
    width: -webkit-fill-available;
    max-width: -moz-available;
}
</style>