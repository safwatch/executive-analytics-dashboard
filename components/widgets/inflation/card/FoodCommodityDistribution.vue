<template>
    <div class="card card-height-100">
        <!-- Card Header with Shimmer -->
        <div class="card-header align-items-center d-flex border-bottom bg-white">
            <template v-if="isTitleLoading">
                <!-- Shimmer for the card title -->
                <SieShimmer :shape="'rectangle'" :width="'200px'" :height="'20px'" :borderRadius="'8px'" />
            </template>
            <template v-else>
                <h4 class="card-title mb-0 flex-grow-1 text-muted">Sebaran Komoditas Pangan</h4>
            </template>
        </div>

        <!-- Card Body -->
        <div class="card-body">
            <!-- Shimmer for Map Component -->
            <template v-if="isMapLoading">
                <div class="col-xl-12 d-flex justify-content-center">
                    <SieShimmer :shape="'rectangle'" :width="'170px'" :height="'200px'" :borderRadius="'8px'" />
                </div>
            </template>
            <template v-else>
                <CivicPasarMap />
            </template>

            <!-- Table with Shimmer in Header and Dynamic Rows -->
            <!-- <div class="d-flex table-card mt-3"> -->
            <div class="d-flex mt-3 table-responsive">
                <table class="table table-borderless table-sm table-centered align-middle table-nowrap mb-1">
                    <thead class="text-muted border-dashed border border-start-0 border-end-0 bg-light-subtle">
                        <tr>
                            <th>
                                <template v-if="isTableHeaderLoading">
                                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </template>
                                <template v-else>
                                    Nama Pasar
                                </template>
                            </th>
                            <th style="width: 30%;">
                                <template v-if="isTableHeaderLoading">
                                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </template>
                                <template v-else>
                                    Kenaikan Harga Komoditas
                                </template>
                            </th>
                            <th style="width: 30%;" class="text-right">
                                <template v-if="isTableHeaderLoading">
                                    <SieShimmer :shape="'rectangle'" :width="'100px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </template>
                                <template v-else>
                                    Tanggal Verifikasi
                                </template>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="border-0">
                        <tr v-for="pasar in pasarList" :key="pasar.id">
                            <!-- Shimmer for Nama Pasar -->
                            <td>
                                <template v-if="pasar.isLoading">
                                    <SieShimmer :shape="'rectangle'" :width="'150px'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </template>
                                <template v-else>
                                    {{ pasar.nama_pasar }}
                                </template>
                            </td>
                            <td class="text-center">
                                <!-- Show shimmer if data is loading for this row -->
                                <template v-if="pasar.isLoading">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </template>
                                <template v-else>
                                    {{ pasar.commodity_price_increase_count }} dari total {{ pasar.total_commodities ||
                                    'No Data' }}
                                </template>
                            </td>
                            <td class="text-right">
                                <!-- Show shimmer if data is loading for this row -->
                                <template v-if="pasar.isLoading">
                                    <SieShimmer :shape="'rectangle'" :width="'100%'" :height="'20px'"
                                        :borderRadius="'8px'" />
                                </template>
                                <template v-else>
                                    <span v-html="getDateBadges(pasar.price_date)"></span>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import availablePasar from "@/components/widgets/pasar-civic.json";
import { payloadHelper } from '~/helpers/payload.helper';
import CivicPasarMap from "../spatial/CivicPasarMap.vue";

export default {
    components: {
        CivicPasarMap,
    },
    data() {
        return {
            isTitleLoading: true,
            isMapLoading: true,
            isTableHeaderLoading: true,
            pasarList: availablePasar.map(pasar => ({
                ...pasar,
                total_commodities: null,
                commodity_price_increase_count: null,
                price_date: null,
                isLoading: true, // Initialize isLoading to true for shimmer per row
            }))
        }
    },
    mounted() {
        // Simulate a delay for the static shimmers
        setTimeout(() => {
            this.isTitleLoading = false;
            this.isMapLoading = false;
            this.isTableHeaderLoading = false;
        }, 2000); // Adjust the timeout as necessary

        // Fetch dynamic data for the pasar
        this.fetchCommodityData();
        console.log(this.pasarList);
    },
    methods: {
        async fetchCommodityData() {
            try {
                // Fetch data for Pasar Cimindi
                await this.fetchCommodityForPasar('1', 0);

                // Fetch data for Pasar Atas
                await this.fetchCommodityForPasar('2', 1);

                // Fetch data for Rancabentang
                await this.fetchCommodityForPasar('3', 2);

                // Fetch data for Pasar Melong
                await this.fetchCommodityForPasar('4', 3);

                // Fetch data for Pasar Antri
                await this.fetchCommodityForPasar('5', 4);

                // Fetch data for Pasar Baros
                await this.fetchCommodityForPasar('6', 5);
            } catch (error) {
                console.error("Error fetching commodity data:", error);
            }
        },

        async fetchCommodityForPasar(pasarId, index) {
            try {
                // Generate the necessary parameters using payloadHelper
                const param = payloadHelper.normalParam(`&pasar_id=${pasarId}`);

                // Fetch data for the pasar
                const response = await this.$pasarWithCommodityPriceChangesRepo.getByParam(param);

                // Check if the response is OK and update pasar data
                if (response.status === 'OK') {
                    this.$set(this.pasarList, index, {
                        ...this.pasarList[index],
                        total_commodities: response.result.total_commodities,
                        commodity_price_increase_count: response.result.commodity_price_increase_count,
                        price_date: response.result.price_date,
                        isLoading: false, // Mark the loading as done for this pasar
                    });
                } else {
                    // If no data, update pasar with "No Data"
                    this.$set(this.pasarList, index, {
                        ...this.pasarList[index],
                        total_commodities: 'No Data',
                        commodity_price_increase_count: 'No Data',
                        price_date: 'No Data',
                        isLoading: false,
                    });
                }
            } catch (error) {
                console.error(`Error fetching data for Pasar ID ${pasarId}:`, error);
                // Set "No Data" if error occurs
                this.$set(this.pasarList, index, {
                    ...this.pasarList[index],
                    total_commodities: 'No Data',
                    commodity_price_increase_count: 'No Data',
                    price_date: 'No Data',
                    isLoading: false,
                });
            }
        },
        getDateBadges(date) {
            // Convert the date to Indonesian format (DD-MM-YYYY)
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = d.getFullYear();

            const formattedDate = `${day}-${month}-${year}`;

            if (date === "NO DATA") {
                return `<span class="badge badge-outline-danger badge-danger">${date}</span>`
            }
            return `<span class="badge badge-outline-primary badge-primary">${formattedDate}</span>`
        }

    }
}
</script>