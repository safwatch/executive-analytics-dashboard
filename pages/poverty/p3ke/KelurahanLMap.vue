<template>
    <div>
        <div id="map" style="height: 500px; width: 1143px;"></div>
    </div>
</template>
  
<script>
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

/**
 * Leaflet Map component
 */
export default {
    name: 'LeafletMap',
    data() {
        return {
            map: null,
            geoJsonLayer: null,
            kelurahanData: [
                { name: 'CIBEUREUM', jumlah_kk_tidak_bekerja: 35, latLng: [-6.906268600986877, 107.55774686573238] },
                { name: 'PADASUKA', jumlah_kk_tidak_bekerja: 636, latLng: [-6.872162586059503, 107.52769539050314] },
                { name: 'LEUWIGAJAH', jumlah_kk_tidak_bekerja: 629, latLng: [-6.911986364976357, 107.52507166575498] },
                { name: 'MELONG', jumlah_kk_tidak_bekerja: 572, latLng: [-6.920212749124744, 107.55590223254967] },
                { name: 'CIGUGUR TENGAH', jumlah_kk_tidak_bekerja: 568, latLng: [-6.891454723578747, 107.54841915482075] },
                { name: 'CIPAGERAN', jumlah_kk_tidak_bekerja: 519, latLng: [-6.85198567094551, 107.54107316347643] },
                { name: 'CIBABAT', jumlah_kk_tidak_bekerja: 446, latLng: [-6.87413532012161, 107.55466557078353] },
                { name: 'CITEUREUP', jumlah_kk_tidak_bekerja: 371, latLng: [-6.859421823241661, 107.55047968454323] },
                { name: 'UTAMA', jumlah_kk_tidak_bekerja: 350, latLng: [-6.909268604289295, 107.54284812803996] },
                { name: 'SETIAMANAH', jumlah_kk_tidak_bekerja: 244, latLng: [-6.875548457894723, 107.53497990908642] },
                { name: 'CIBEBER', jumlah_kk_tidak_bekerja: 241, latLng: [-6.891083936628277, 107.5205660815239] },
                { name: 'BAROS', jumlah_kk_tidak_bekerja: 211, latLng: [-6.890772480533556, 107.53508226142463] },
                { name: 'CIMAHI', jumlah_kk_tidak_bekerja: 3, latLng: [-6.869438188320146, 107.54449737728072] },
                { name: 'KARANGMEKAR', jumlah_kk_tidak_bekerja: 1153, latLng: [-6.87747282612446, 107.54214544182668] },
                { name: 'PASIRKALIKI', jumlah_kk_tidak_bekerja: 119, latLng: [-6.880631879874244, 107.56578590105113] },

            ],
        }
    },
    mounted() {

        // Initialize the map with the zoomSnap option
        this.map = L.map('map', {
            zoomSnap: 0.75, // Set zoomSnap to a fractional value like 0.5 for more granular zoom levels
            zoomDelta: 0.5, // Sets the zoom increment when using the zoom controls
            wheelPxPerZoomLevel: 120 // Adjusts the scroll wheel sensitivity
        }).setView([-6.8841, 107.5413], 15);

        // Initialize the map
        // this.map = L.map('map').setView([-6.8841, 107.5413], 14); // You may need to adjust the coordinates

        // Add OpenStreetMap tile layer to the map
        L.tileLayer('https://maps.geoapify.com/v1/tile/toner-grey/{z}/{x}/{y}.png?apiKey=f1bda2b0475f4d32953d4f5e0d0c2799', {
            maxZoom: 18,
            attribution: '',
            attributionControl: false
        }).addTo(this.map);


        this.kelurahanData.forEach(kelurahan => {
            const label = L.divIcon({
                className: 'text-labels', // Refer to the .text-labels class in your CSS
                html: kelurahan.jumlah_kk_tidak_bekerja
            });
            L.marker(kelurahan.latLng, { icon: label })
                .addTo(this.map)
                .bindPopup(`${kelurahan.name}: ${kelurahan.jumlah_kk_tidak_bekerja} Kepala Keluarga Tidak Bekerja`);
        });

        // Load the GeoJSON data
        this.loadGeoJsonData();

        // After initializing the map and adding your geojson layer
        this.addLegend(); // Call this method to add the legend to the map
    },
    methods: {
        // Define your color ramp function
        getColor(value) {
            return value > 1000 ? '#800026' :
                value > 500 ? '#BD0026' :
                    value > 200 ? '#E31A1C' :
                        value > 100 ? '#FC4E2A' :
                            value > 50 ? '#FD8D3C' :
                                value > 20 ? '#FEB24C' :
                                    value > 10 ? '#FED976' :
                                        '#FFEDA0';
        },
        addLegend() {
            const legend = L.control({ position: 'bottomright' });

            legend.onAdd = () => {
                const div = L.DomUtil.create('div', 'info legend');
                const grades = [0, 10, 20, 50, 100, 200, 500, 1000]; // Data ranges
                const colors = grades.map(grade => this.getColor(grade + 1));

                // Generate a label with a colored square for each interval
                for (let i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + colors[i] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i> ' +
                        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                }
                return div;
            };

            legend.addTo(this.map);
        },
        getColorForKelurahan(kelurahanName) {
            // Find the kelurahan data by name and return the corresponding color
            const kelurahan = this.kelurahanData.find(k => k.name === kelurahanName.toUpperCase());
            console.log(kelurahanName.toUpperCase());
            console.log(kelurahan.jumlah_kk_tidak_bekerja);
            if (kelurahan) {
                return this.getColor(kelurahan.jumlah_kk_tidak_bekerja);
            }
            return '#FFFFFF'; // Default color if not found
        },
        loadGeoJsonData() {
            axios.get('/api/kelurahan_geojson') // Replace with the correct URL or path
                .then(response => {
                    this.geoJsonLayer = L.geoJSON(response.data, {
                        style: (feature) => {
                            // Use the feature's name property to get the color
                            const color = this.getColorForKelurahan(feature.properties.NAMOBJ);
                            return {
                                fillColor: color,
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            };
                        },
                        onEachFeature: (feature, layer) => {
                            if (feature.properties && feature.properties.NAMOBJ) {
                                layer.bindPopup(feature.properties.NAMOBJ);
                            }
                        }
                    }).addTo(this.map);
                    this.map.fitBounds(this.geoJsonLayer.getBounds());
                })
                .catch(error => {
                    console.error('Error fetching the GeoJSON data: ', error);
                });
        }
    }
};
</script>

<style>
/* Customize the appearance of your text labels */
.text-labels {
    background-color: rgba(255, 255, 255, 0.8);
    /* Semi-transparent white background */
    border: 1px solid #222;
    /* Black border */
    border-radius: 30px;
    /* Rounded corners */
    padding: 5px 4px;
    /* Some padding around the text */
    text-align: center;
    /* Center the text horizontally */
    white-space: nowrap;
    /* Prevent text from wrapping to the next line */
    font-size: 12px;
    /* Adjust font size as needed */
    color: #333;
    /* Text color */
    /* Set a specific width and height if needed */
    width: 30px !important;
    /* Or set a specific width like '100px' */
    height: 30px !important;
    /* Or set a specific width like '100px' */
    /* The height is usually determined by content and padding, but you can set it too */
}

/* To position the text in the center of where the marker point is, adjust iconAnchor */
.my-custom-pin {
    margin-left: -50%;
    /* Adjust the left margin to be half of the width of the element */
    margin-top: -50%;
    /* Adjust the top margin to be half of the height of the element */
}

.info.legend {
    padding: 0px 10px 0px 0px;
    background: white;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.info.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}

.leaflet-control-attribution.leaflet-control{
    visibility: hidden !important;
}
</style>
