<template>
    <div>
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <!-- <YoYCard /> -->
                <IPHProfilCard />
            </div>

            <div class="col-xl-3 col-md-6">
                <ActionPlanAndStrategicCard />
            </div>

            <div class="col-xl-3 col-md-6">
                <BudgetRealizationCard />
            </div>

            <div class="col-xl-3 col-md-6">
                <ProfilInflationControllingWorkunits />
            </div>
        </div>

        <div class="row">
            <div class="col-xl-12">
                <!-- <FiveYearTrendChart /> -->
                <YearlyIPHTrend />
            </div>
        </div>
    </div>
</template>

<script>
import DynamicPopover from '~/components/DynamicPopover.vue';
import CustomPopover from '~/components/Popover.vue';
import YearlyIPHTrend from './chart/YearlyIPHTrend.vue';
import ProfilInflationControllingWorkunits from "./card/ProfilInflationControllingWorkunits.vue";
import IPHProfilCard from './card/IPHProfilCard.vue';
import YoYCard from './card/IndexYoYCard.vue';
import MtMCard from './card/IndexMtMCard.vue';
import BudgetRealizationCard from './card/BudgetRealizationCard.vue';
import ActionPlanAndStrategicCard from './card/ActionPlanAndStrategicCard.vue';


export default {
    name: 'ProfilInflasiComponent',
    components: {
        DynamicPopover,
        CustomPopover,
        YearlyIPHTrend,
        IPHProfilCard,
        ProfilInflationControllingWorkunits,
        YoYCard,
        MtMCard,
        ActionPlanAndStrategicCard,
        BudgetRealizationCard,
    },
    props: {
        filter: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        filter: {
            handler(newFilter) {
                this.applyFilter(newFilter);
            },
            immediate: true
        }
    },
    methods: {
        applyFilter(filter) {
            if (filter.profile) {
                console.log('Applying filter:', filter);
                // Implement your filter logic here
            } else {
                console.log('No filter applied.');
            }
        }
    },
    data() {
        return {
            isFixed: false,
            containerWidth: 0,
        }
    }
}
</script>