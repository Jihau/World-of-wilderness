let map = L.map('map').setView([0, 0], 1);
map.setMaxBounds(map.getBounds());
map.setMinZoom(map.getBoundsZoom(map.options.maxBounds));
let consoleOutput = document.getElementById("console");
let markersLayer = L.layerGroup().addTo(map);

let cachedImages = [];
L.tileLayer('https://api.mapbox.com/styles/v1/jihau/cl2gazbo0000u16o66jok0xt4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamloYXUiLCJhIjoiY2wyZzM4MnptMDAybTNlbDVydWd4NG1tNCJ9.xX5DfnTTX30CKCHNJnlJpg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'jihau/cl2gazbo0000u16o66jok0xt4',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXJra2lrZWtrb25lbiIsImEiOiJjbDJnOW9qMXEwMTJnM2puemloYzlrZ290In0.VjgzSrX13CE24Mqy3_a9VQ'
}).addTo(map);

function addMarker(x, y, name, image, observedOn, markerOnClick, boolZoomToMarker) {
    let marker = L.marker([x, y]);
    let clickFunction = () => {
        markerOnClick();
        focusConsoleMessage();
    }
    marker.on('click', clickFunction);
    marker.addTo(markersLayer).bindPopup(generateLeafletPopUp(!name ? "" : name, image, observedOn, image));
    if (boolZoomToMarker) {
        zoomToMarker(marker);
    }
}

function clearMarkers() {
    markersLayer.clearLayers();
}

function addGeoJSONToMap(geoJSON, name, image, observedOn, imageMedium, markerOnClick) {
    const myStyle = {
        "color": "#ff7800", "weight": 5, "opacity": 0.65
    };
    let geoJson = L.geoJSON(geoJSON, {
        style: myStyle
    });

    let clickFunction = () => {
        markerOnClick();
        focusConsoleMessage();
    }
    geoJson.on('click', clickFunction);

    geoJson.addTo(markersLayer).bindPopup(generateLeafletPopUp(!name ? "" : name, image, observedOn, imageMedium));
}

function generateLeafletPopUp(name, image, observedOn, imageMedium) {
    return `<div class="dialogMarker"><div class="markerTitle">${name}</div><img src="${image}" alt="${name}" onclick="showImage('${name}','${imageMedium}')" style="height: 75px; width: 75px"><div class="observedOn">${observedOn}</div></div>`;
}

async function getImages(birdName, sciName, date, lat, lng, location, boolZoomToMarker) {
    try {
        let image = cachedImages[sciName];
        if (!image) {
            const api = await fetch(`https://dev-api.mol.org/2.x/species/images/list?scientificname=${sciName}`);
            if (api.ok) {
                const result = await api.json();
                image = result && result[0] ? result[0].images : false;
                image = image ? result[0].images[0].asset_url : false;
            }
        }
        image = (!image || image == undefined)? "https://www.freeiconspng.com/uploads/error-icon-3.png" : image;
        cachedImages[sciName] = image;
        let consoleMessage = `Name: ${birdName}\n\nLocation: ${location}\n\nCoordinates: ${lat}, ${lng}\n\nDate: ${date}`;
        addMarker(lat, lng, birdName, image, date, () => displayInfoToConsole(consoleMessage, sciName), boolZoomToMarker);
    } catch (error) {
        console.log(error);
    }
}

function displayInfoToConsole(message, scientificName) {
    consoleOutput.value = message + "\n\nInfo:\n" + scientificName;
}

const lastItem = (path) => path.substring(path.lastIndexOf('/') + 1);

async function getWikipediaContent(title) {
    let content = '';
    let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    try {
        const api = await fetch(url);
        if (api.ok) {
            const result = await api.json();
            content = result.extract;
        }
    } catch (error) {
        content = '';
    }
    return content;
}

function zoomToMarker(marker) {
    let latLngs = [marker.getLatLng()];
    let markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
    map.setZoom(5);
}