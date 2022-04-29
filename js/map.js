let map = L.map('map').setView([1, 1], 1.5);
let consoleOutput = document.getElementById("console");

L.tileLayer('https://api.mapbox.com/styles/v1/jihau/cl2gazbo0000u16o66jok0xt4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamloYXUiLCJhIjoiY2wyZzM4MnptMDAybTNlbDVydWd4NG1tNCJ9.xX5DfnTTX30CKCHNJnlJpg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'jihau/cl2gazbo0000u16o66jok0xt4',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXJra2lrZWtrb25lbiIsImEiOiJjbDJnOW9qMXEwMTJnM2puemloYzlrZ290In0.VjgzSrX13CE24Mqy3_a9VQ'
}).addTo(map);
let markersLayer = L.layerGroup().addTo(map);

// TODO: Remove test marker
//  L.marker([60.17604, 24.9386]).addTo(map);

function addMarker(x, y, name, markerOnClick) {
    let marker = L.marker([x, y]);
    let clickFunction = () => {
        markerOnClick();
        focusConsoleMessage();
    }
    marker.on('click', clickFunction);
    marker.addTo(markersLayer).bindPopup(!name ? "" : name);
}

let birdsButton = document.getElementById('birdsButton');
birdsButton.addEventListener('click', displayCountrySelector);

function displayCountrySelector(){
    showHideCountrySelector(true);
    let birdsMenu = document.getElementById('birdsMenu');
    birdsMenu.value = "0";
}

function showHideCountrySelector(show){
    let countrySelector = document.getElementById('countrySelector');
    countrySelector.setAttribute('class', show ? 'visible' : 'hidden');
    clearMarkers();
    clearConsole();
}


async function birds(country) {
    let myHeaders = new Headers();
    myHeaders.append('X-eBirdApiToken', 'p291e2j3pm2c');

    let requestOptions = {
        method: 'GET', headers: myHeaders, redirect: 'follow'
    };

    let lat, lng, birdName, location, date;

    try {
        const api = await fetch(`https://api.ebird.org/v2/data/obs/${country}/recent`, requestOptions);
        if (api.ok) {
            const result = await api.json();
            for (let i = 0; i < result.length; i++) {
                lat = result[i].lat;
                lng = result[i].lng;
                birdName = result[i].comName;
                location = result[i].locName;
                date = result[i].obsDt;
                let consoleMessage = `Name: ${birdName}\nLocation: ${location}\nCoordinates: ${lat}, ${lng}\nDate: ${date}\n****************************************************\n`;
                addMarker(lat, lng, birdName, () => {consoleOutput.value += consoleMessage});
            }
            return result;
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}

function focusConsoleMessage(){
    const textarea = document.getElementById('console');
    const end = textarea.value.length;
    textarea.setSelectionRange(end, end);
    textarea.focus();
}

document.getElementById('birdsMenu').onchange = function (evt){
    let value = evt.target.value;
    clearMarkers();
    clearConsole();
    birds(value).then();
}

function clearMarkers(){
    markersLayer.clearLayers();
}


let whalesButton = document.getElementById('whalesButton');
whalesButton.addEventListener('click', displayWhales);

function displayWhales(){
    showHideCountrySelector(false);
    whales().then();
}

async function whales() {
    let lat, lng, name, content;
    try {
        const api = await fetch('https://api.mol.org/1.x/species/info?scientificname=Eschrichtius%20robustus');
        if (api.ok) {
            const result = await api.json();
            for (let i = 0; i < result.length; i++) {
                let record = result[i];
                lat = record.bounds.northEast.lat;
                lng = record.bounds.northEast.lng;
                name = record.family[0].name;
                content = record.info[0].content;
                let consoleMessage = `Name: ${name}\nCoordinates: ${lat}, ${lng}\nInfo: ${content}\n****************************************************\n`;
                addMarker(lat, lng, name, () => {consoleOutput.value = consoleMessage});
            }
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}
getImages().then();

async function getImages(){
    try {
        const api = await fetch('https://dev-api.mol.org/2.x/species/images/list?scientificname=Eschrichtius%20robustus');
        if (api.ok) {
            const result = await api.json();
            let image = result[0].images[0].asset_url;
            console.log(image);

        }
    } catch (error){
        console.log(error);
    }
}
