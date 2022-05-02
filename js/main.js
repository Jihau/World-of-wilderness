let map = L.map('map').setView([30, 1], 1.5);
map.setMaxBounds(map.getBounds());
map.setMinZoom( map.getBoundsZoom( map.options.maxBounds ) );
let consoleOutput = document.getElementById("console");
let markersLayer = L.layerGroup().addTo(map);
L.tileLayer('https://api.mapbox.com/styles/v1/jihau/cl2gazbo0000u16o66jok0xt4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamloYXUiLCJhIjoiY2wyZzM4MnptMDAybTNlbDVydWd4NG1tNCJ9.xX5DfnTTX30CKCHNJnlJpg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'jihau/cl2gazbo0000u16o66jok0xt4',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXJra2lrZWtrb25lbiIsImEiOiJjbDJnOW9qMXEwMTJnM2puemloYzlrZ290In0.VjgzSrX13CE24Mqy3_a9VQ'
}).addTo(map);

function addMarker(x, y, name, image, observedOn, markerOnClick) {
    let marker = L.marker([x, y]);
    let clickFunction = () => {
        markerOnClick();
        focusConsoleMessage();
    }
    marker.on('click', clickFunction);
    marker.addTo(markersLayer).bindPopup(generateLeafletPopUp(!name ? "" : name, image, observedOn));
}

function clearMarkers(){
    markersLayer.clearLayers();
}

function addGeoJSONToMap(geoJSON, name, image, observedOn, markerOnClick) {
    const myStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };
    let geoJson = L.geoJSON(geoJSON, {
        style: myStyle
    });


    let clickFunction = () => {
        markerOnClick();
        focusConsoleMessage();
    }
    geoJson.on('click', clickFunction);

    geoJson.addTo(markersLayer).bindPopup(generateLeafletPopUp(!name ? "" : name, image, observedOn));
}

function generateLeafletPopUp(name, image, observedOn) {
    return `<div class="dialogMarker"><div class="markerTitle">${name}</div><img src="${image}" style="height: 75px; width: 75px"><div class="observedOn">${observedOn}</div></div>`;
}

async function getImages(birdName, sciName, date, lat,lng, location){
    try {
        const api = await fetch(`https://dev-api.mol.org/2.x/species/images/list?scientificname=${sciName}`);
        if (api.ok) {
            const result = await api.json();
            let image = result[0].images[0].asset_url;
            let consoleMessage = `Name: ${birdName}\nLocation: ${location}\nCoordinates: ${lat}, ${lng}\nDate: ${date}\n****************************************************\n`;
            addMarker(lat, lng, birdName, image, date, () => {consoleOutput.value += consoleMessage});
        }
    } catch (error){
        console.log(error);
    }
}