<template>
  <div>
    <div class="row">
      <div class="col-xl-6">

        <div class="row">
          <div class="col-xl-12">
            <PositioningInflasi />
          </div> <!-- end col-->
        </div> <!-- end row-->

        <div class="row">
          <div class="col-md-6">
            <!-- <AnalisisMtMCard /> -->
            <IPHPriceChangesIndexCard />
          </div>
          <div class="col-md-6">
            <!-- <PriceChangesIndexCard /> -->
            <CheapMarketAvailableCard />
          </div> <!-- end col-->
        </div> <!-- end row-->

        <div class="row">
          <div class="col-md-6">
            <!-- <FoodSustainabilityCard /> -->
            <CheapMarketInterventionRecipientCard />
          </div> <!-- end col-->

          <div class="col-md-6">
            <!-- <ImportQuotaCard /> -->
            <RegionalCooperationCard />
          </div>
        </div> <!-- end row-->

      </div> <!-- end col-->

      <div class="col-xl-6">
        <div class="row h-100">
          <div class="col-xl-12">
            <FoodCommodityDistribution />
          </div><!-- end col -->

        </div> <!-- end row-->
      </div><!-- end col -->
    </div> <!-- end row-->

    <div class="row">
      <div class="col-xl-6">
        <ConsumerPriceIndex />
      </div> <!-- end col-->

      <div class="col-xl-6">
        <!-- <InflationYearSeriesRate /> -->
        <IPHYearSeriesTrend />
      </div>
    </div>


    <div class="row">
      <div class="col-xl-6">
        <FoodBalanceTreeMap />
      </div><!-- end col -->

      <div class="col-xl-6 col-md-6">
        <InflationContributedByCommodity />

      </div><!-- end col -->
    </div><!-- end row -->
  </div>

  <!-- Analisis content goes here -->
</template>

<script>
import CustomPopover from '~/components/Popover.vue';
import AnalisisMtMCard from "./card/AnalisisMtMCard.vue";
// v 1.0.1
import IPHPriceChangesIndexCard from "./card/IPHPriceChangesIndexCard.vue";
import CheapMarketAvailableCard from "./card/CheapMarketAvailableCard.vue";
import CheapMarketInterventionRecipientCard from "./card/CheapMarketInterventionRecipientCard.vue";
import RegionalCooperationCard from "./card/RegionalCooperationCard.vue";
import IPHYearSeriesTrend from "./chart/IPHYearSeriesTrend.vue";

// v 1.0.0
import PriceChangesIndexCard from "./card/PriceChangesIndexCard.vue";
import ImportQuotaCard from "./card/ImportQuotaCard.vue";
import FoodSustainabilityCard from "./card/FoodSustainabilityCard.vue";
import InflationContributedByCommodity from "./card/InflationContributedByCommodity.vue";
import FoodCommodityDistribution from "./card/FoodCommodityDistribution.vue";
import ConsumerPriceIndex from "./chart/ConsumerPriceIndex.vue";
import InflationYearSeriesRate from "./chart/InflationYearSeriesRate.vue";
import FoodBalanceTreeMap from "./chart/FoodBalanceTreeMap.vue";

import PositioningInflasi from "./tab/PositioningInflasi.vue";




export default {
  name: 'AnalisisComponent',
  components: {
    CustomPopover,
    PositioningInflasi,
    ConsumerPriceIndex,
    InflationYearSeriesRate,
    FoodBalanceTreeMap,
    AnalisisMtMCard,

    IPHPriceChangesIndexCard,
    CheapMarketAvailableCard,
    CheapMarketInterventionRecipientCard,
    RegionalCooperationCard,

    IPHYearSeriesTrend,

    PriceChangesIndexCard,
    ImportQuotaCard,
    FoodSustainabilityCard,
    InflationContributedByCommodity,
    FoodCommodityDistribution
  },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    // Simulate loading time or fetch data
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 2000); // Example delay of 2 seconds
  }
}
</script>