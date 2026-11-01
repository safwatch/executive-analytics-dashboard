<template>
    <div>
        <div id="map" style="height: 500px; width: 100%;"></div>
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
    name: 'SumberListrik',
    data() {
        return {
            map: null,
            geoJsonLayer: null,
            kelurahanData: [
                { name: 'CIBEUREUM', jumlah_rumah_tidak_menggunakan_listrik: 4, latLng: [-6.906268600986877, 107.55774686573238] },
                { name: 'PADASUKA', jumlah_rumah_tidak_menggunakan_listrik: 2, latLng: [-6.872162586059503, 107.52769539050314] },
                { name: 'LEUWIGAJAH', jumlah_rumah_tidak_menggunakan_listrik: 3, latLng: [-6.911986364976357, 107.52507166575498] },
                { name: 'MELONG', jumlah_rumah_tidak_menggunakan_listrik: 4, latLng: [-6.920212749124744, 107.55590223254967] },
                { name: 'CIGUGUR TENGAH', jumlah_rumah_tidak_menggunakan_listrik: 0, latLng: [-6.891454723578747, 107.54841915482075] },
                { name: 'CIPAGERAN', jumlah_rumah_tidak_menggunakan_listrik: 2, latLng: [-6.85198567094551, 107.54107316347643] },
                { name: 'CIBABAT', jumlah_rumah_tidak_menggunakan_listrik: 0, latLng: [-6.87413532012161, 107.55466557078353] },
                { name: 'CITEUREUP', jumlah_rumah_tidak_menggunakan_listrik: 3, latLng: [-6.859421823241661, 107.55047968454323] },
                { name: 'UTAMA', jumlah_rumah_tidak_menggunakan_listrik: 3, latLng: [-6.909268604289295, 107.54284812803996] },
                { name: 'SETIAMANAH', jumlah_rumah_tidak_menggunakan_listrik: 0, latLng: [-6.875548457894723, 107.53497990908642] },
                { name: 'CIBEBER', jumlah_rumah_tidak_menggunakan_listrik: 1, latLng: [-6.891083936628277, 107.5205660815239] },
                { name: 'BAROS', jumlah_rumah_tidak_menggunakan_listrik: 1, latLng: [-6.890772480533556, 107.53508226142463] },
                { name: 'CIMAHI', jumlah_rumah_tidak_menggunakan_listrik: 1, latLng: [-6.869438188320146, 107.54449737728072] },
                { name: 'KARANGMEKAR', jumlah_rumah_tidak_menggunakan_listrik: 0, latLng: [-6.87747282612446, 107.54214544182668] },
                { name: 'PASIRKALIKI', jumlah_rumah_tidak_menggunakan_listrik: 0, latLng: [-6.880631879874244, 107.56578590105113] },

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
        L.tileLayer('https://maps.geoapify.com/v1/tile/dark-matter-yellow-roads/{z}/{x}/{y}.png?apiKey=f1bda2b0475f4d32953d4f5e0d0c2799', {
            maxZoom: 18,
            attribution: '',
            attributionControl: false
        }).addTo(this.map);


        this.kelurahanData.forEach(kelurahan => {
            let icon;
            if (kelurahan.jumlah_rumah_tidak_menggunakan_listrik === 0) {
                icon = L.divIcon({
                    className: 'text-labels-icon', // Add a class for Font Awesome icons
                    html: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 34.4"><defs></defs><title>lamp-idea</title><path class="cls-1" d="M-50.1,601.2l-1-.5a2.7,2.7,0,0,1-.7-.8.2.2,0,0,0-.2-.2c-1.2-.1-1.4-.3-1.6-1.5h7.9a1.1,1.1,0,0,1-.2.8,1.1,1.1,0,0,1-1.2.7c-.3,0-.4.1-.6.4a2.4,2.4,0,0,1-1.4,1c-.1,0-.2,0-.2.1Z" transform="translate(64.7 -566.7)"/><path class="cls-2" d="M-53.6,593a7.9,7.9,0,0,0-2.6-3.8,9.8,9.8,0,0,1-3.3-6.3,9.9,9.9,0,0,1,2.8-8.1,9.7,9.7,0,0,1,5.5-2.8,9.7,9.7,0,0,1,8,2.3,9.7,9.7,0,0,1,3.2,5.6,9.4,9.4,0,0,1-3.2,9.3,9.7,9.7,0,0,0-2.5,3.8h-2.9c.7-2.9,1.5-5.8,2.2-8.6.3-.8.4-1.6.7-2.3s0-.3-.2-.4a.2.2,0,0,0-.3,0c-.5.3-.7.3-1.2-.1a1.2,1.2,0,0,0-1.6,0c-.5.4-.7.4-1.3,0a1.1,1.1,0,0,0-1.5,0c-.5.4-.7.4-1.2.1s-.3-.1-.4,0a.4.4,0,0,0-.1.3c0,.1.1.2.1.3l2.7,10.7h-2.9Z" transform="translate(64.7 -566.7)"/><path class="cls-3" d="M-45.7,598.2h-7.9a.8.8,0,0,1-.7-.8.7.7,0,0,1,.7-.7h7.9c.4.1.7.3.7.7A.8.8,0,0,1-45.7,598.2Z" transform="translate(64.7 -566.7)"/><path class="cls-3" d="M-45.7,594.2a.7.7,0,0,1,.7.7c0,.4-.2.6-.7.8h-7.9c-.4-.1-.6-.2-.7-.7a.7.7,0,0,1,.4-.8c.1,0,.2-.1.3,0Z" transform="translate(64.7 -566.7)"/><path class="cls-4" d="M-45.7,594.2h-7.9a4.8,4.8,0,0,0,0-1.2h7.9Z" transform="translate(64.7 -566.7)"/><path class="cls-5" d="M-53.6,595.7h7.9v1h-7.9Z" transform="translate(64.7 -566.7)"/><path class="cls-6" d="M-48.9,568.7v1.1c-.1.5-.3.8-.7.8a.7.7,0,0,1-.8-.8v-2.3a.7.7,0,0,1,.4-.7.8.8,0,0,1,.8.1c.2.1.2.4.3.6Z" transform="translate(64.7 -566.7)"/><path class="cls-6" d="M-36.6,581h1.1a.7.7,0,0,1,.8.7.7.7,0,0,1-.8.7h-2.2a.9.9,0,0,1-.8-.4.6.6,0,0,1,.1-.7c.2-.3.4-.3.7-.3Z" transform="translate(64.7 -566.7)"/><path class="cls-6" d="M-62.8,582.4h-1a.8.8,0,0,1-.9-.7.8.8,0,0,1,.9-.7h2.2a.8.8,0,0,1,.8.7.7.7,0,0,1-.8.7A4.8,4.8,0,0,1-62.8,582.4Z" transform="translate(64.7 -566.7)"/><path class="cls-6" d="M-57.4,590.1a1.4,1.4,0,0,1-.2.6c-.6.5-1.1,1.1-1.6,1.6a.9.9,0,0,1-1.1.1.7.7,0,0,1,0-1l1.2-1.3.7-.6a.8.8,0,0,1,.7,0A.7.7,0,0,1-57.4,590.1Z" transform="translate(64.7 -566.7)"/><path class="cls-6" d="M-38.8,591.8a1,1,0,0,1-.4.7.6.6,0,0,1-.7-.1h-.2l-1.6-1.6c-.3-.3-.4-.5-.2-.9s.7-.6,1-.3l1.9,1.9Z" transform="translate(64.7 -566.7)"/><path class="cls-6" d="M-59.8,570.9a.7.7,0,0,1,.6.3l1.6,1.5a.8.8,0,0,1,.2.8c-.1.3-.3.4-.6.5s-.5-.1-.6-.2l-1.6-1.6a.8.8,0,0,1-.3-.9A1,1,0,0,1-59.8,570.9Z" transform="translate(64.7 -566.7)"/><path class="cls-6" d="M-41.3,574c-.5,0-.9-.6-.6-1l.4-.5,1.3-1.3a.8.8,0,0,1,1.1-.2.7.7,0,0,1,.1,1l-1.8,1.9Z" transform="translate(64.7 -566.7)"/><path class="cls-7" d="M-50,593h-.7l-2.7-10.7c0-.1-.1-.2-.1-.3a.4.4,0,0,1,.1-.3c.1-.1.2-.1.4,0s.7.3,1.2-.1a1.1,1.1,0,0,1,1.5,0c.6.4.8.4,1.3,0a1.2,1.2,0,0,1,1.6,0c.5.4.7.4,1.2.1a.2.2,0,0,1,.3,0c.2.1.2.2.2.4s-.4,1.5-.7,2.3c-.7,2.8-1.5,5.7-2.2,8.6h-.6v-.4c.7-2.4,1.3-4.8,1.9-7.2.2-.8.5-1.7.7-2.6s.1-.3-.1-.3a2.1,2.1,0,0,1-1.1-.4c-.3-.3-.6-.3-1,0a1.3,1.3,0,0,1-1.8,0,.7.7,0,0,0-1,0,1.8,1.8,0,0,1-.9.4c-.3,0-.3.1-.2.4l.6,2.5Z" transform="translate(64.7 -566.7)"/><path class="cls-8" d="M-50,593l-2.1-7.6-.6-2.5c-.1-.3-.1-.4.2-.4a1.8,1.8,0,0,0,.9-.4.7.7,0,0,1,1,0,1.3,1.3,0,0,0,1.8,0c.4-.3.7-.3,1,0a2.1,2.1,0,0,0,1.1.4c.2,0,.1.2.1.3s-.5,1.8-.7,2.6c-.6,2.4-1.2,4.8-1.9,7.2v.4Z" transform="translate(64.7 -566.7)"/></svg>'
                });
            } else {
                icon = L.divIcon({
                    className: 'text-labels', // Use the default class for text labels
                    html: kelurahan.jumlah_rumah_tidak_menggunakan_listrik // Display the name as text
                });
            }
            let popupContent;
            if (kelurahan.jumlah_rumah_tidak_menggunakan_listrik === 0) {
                popupContent = `Semua Rumah Tangga Di Kelurahan <U>${kelurahan.name}</U> Sudah Menggunakan Listrik `;
            } else {
                popupContent = `${kelurahan.name}: <br/> Ada ${kelurahan.jumlah_rumah_tidak_menggunakan_listrik} rumah yang tidak menggunakan Listrik sebagai sumber penerangan`;
            }
            L.marker(kelurahan.latLng, { icon: icon })
                .addTo(this.map)
                .bindPopup(popupContent);
        });

        // Load the GeoJSON data
        this.loadGeoJsonData();

        // After initializing the map and adding your geojson layer
        this.addLegend(); // Call this method to add the legend to the map
    },
    methods: {
        // Define your color ramp function
        getColor(value) {
            return value > 7 ? '#000000' :
                value > 6 ? '#0f0f0f' :
                    value > 5 ? '#FF9800' :
                        value > 4 ? '#FFAC00' :
                            value > 3 ? '#FFC100' :
                                value > 2 ? '#FFD600' :
                                    value > 1 ? '#FFEB00' :
                                        '#FFEDA0';
        },
        // getColor(value) {
        //     // Assuming value is a numerical representation
        //     const intValue = parseInt(value);

        //     // Define the colors for the gradient from yellow to black
        //     const colors = ['#FFFF00', '#FFEB00', '#FFD600', '#FFC100', '#FFAC00', '#FF9800', '#000000'];

        //     // Calculate the index of the color based on the value
        //     const index = Math.min(Math.floor(intValue / 15), colors.length - 1);

        //     // Return the color corresponding to the index
        //     return colors[index];
        // },

        addLegend() {
            const legend = L.control({ position: 'bottomright' });

            legend.onAdd = () => {
                const div = L.DomUtil.create('div', 'info legend');
                const grades = [0, 1, 2, 3, 4, 5, 6, 7]; // Data ranges
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
            console.log(kelurahan.jumlah_rumah_tidak_menggunakan_listrik);
            if (kelurahan) {
                return this.getColor(kelurahan.jumlah_rumah_tidak_menggunakan_listrik);
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

.text-labels-icon {
    background-color: none;
    /* Semi-transparent white background */
    border: none;
    /* Black border */
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

.text-labels-icon #lampid {
    fill: #0f0f0f;
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

.leaflet-control-attribution.leaflet-control {
    visibility: hidden !important;
}
.cls-1 {
    fill: #354b5f;
}

.cls-2 {
    fill: #fed05c !important;
}

.cls-3 {
    fill: #425b6b;
}

.cls-4 {
    fill: #394d5e;
}

.cls-5 {
    fill: #344a5e;
}

.cls-6 {
    fill: #fff;
}

.cls-7 {
    fill: #fefdfa;
}

.cls-8 {
    fill: #fed05d;
}

</style>