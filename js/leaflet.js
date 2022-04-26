let map = L.map('leaflet').setView([1, 1], 0);
let circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#c96378',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
let marker = L.marker([51.5, -0.09]).addTo(map);
let polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/1/1/0/?access_token=sk.eyJ1IjoiamloYXUiLCJhIjoiY2wyZzNnZ29wMDA0djNjbm51ZXZ6NDdubCJ9.no31RSqFOh-DtrWQIr4EuA',
    {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

