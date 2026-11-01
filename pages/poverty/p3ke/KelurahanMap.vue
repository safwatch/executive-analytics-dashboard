<template>
    <div>
        <highcharts :constructor-type="'mapChart'" :options="mapOptions" ref="highcharts"></highcharts>
    </div>
</template>
  
<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import mapInit from 'highcharts/modules/map';
import mapData from '@highcharts/map-collection/countries/us/us-all.geo.json';

// Initialize map module
mapInit(Highcharts);

export default {
    name: 'StaticMap',
    components: {
        HighchartsVue
    },
    data() {
        return {
            mapOptions: {
                chart: {
                    map: mapData
                },
                title: {
                    text: ''
                },
                series: [{
                    name: 'Random Data',
                    data: [
                        ['us-ma', 10], ['us-wa', 20], ['us-ca', 30], ['us-or', 40], ['us-wi', 50],
                        ['us-me', 60], ['us-mi', 70], ['us-nv', 80], ['us-nm', 90], ['us-co', 100],
                        ['us-wy', 110], ['us-ks', 120], ['us-ne', 130], ['us-ok', 140], ['us-mo', 150],
                        ['us-il', 160], ['us-in', 170], ['us-vt', 180], ['us-ar', 190], ['us-tx', 200]
                    ],
                    mapData: mapData,
                    joinBy: 'hc-key',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }]
            }
        };
    }
};
</script>
  