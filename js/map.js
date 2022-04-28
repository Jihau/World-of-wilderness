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

// TODO: Remove test marker
//  L.marker([60.17604, 24.9386]).addTo(map);

function addMarker(x, y, name) {
    L.marker([x, y]).addTo(map).bindPopup(!name ? "" : name);
}

let birdsButton = document.getElementById('birdsButton');
birdsButton.addEventListener('click', birds);

async function birds() {
    let myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "p291e2j3pm2c");

    let requestOptions = {
        method: 'GET', headers: myHeaders, redirect: 'follow'
    };

    let lat, lng, birdName, location, date;

    try {
        const api = await fetch("https://api.ebird.org/v2/data/obs/FI/recent", requestOptions);
        if (api.ok) {
            const result = await api.json();
            for (let i = 0; i < result.length; i++) {
                lat = result[i].lat;
                lng = result[i].lng;
                birdName = result[i].comName;
                addMarker(lat, lng, birdName);
                location = result[i].locName;
                date = result[i].obsDt;
                consoleOutput.value += `Name: ${birdName}\nLocation: ${location}\nDate: ${date}\n****************************************************\n`;
            }
            return result;
        }
    } catch (error) {
        throw new Error("Something went wrong");
    }
}


let whalesButton = document.getElementById('whalesButton');
whalesButton.addEventListener('click', whales);

async function whales() {
    let lat, lng, name, content;
    try {
        const api = await fetch("https://api.mol.org/1.x/species/info?scientificname=Eschrichtius%20robustus");
        if (api.ok) {
            const result = await api.json();
            lat = result[0].bounds.northEast.lat;
            lng = result[0].bounds.northEast.lng;
            name = result[0].family[0].name;
            addMarker(lat, lng, name);
            content = result[0].info[0].content;
            consoleOutput.value = `Info: ${content}`;
        }
    } catch (error) {
        throw new Error("Something went wrong");
    }
}