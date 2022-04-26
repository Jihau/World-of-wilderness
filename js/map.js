let map = L.map('map').setView([1, 1], 1.5);

L.tileLayer('https://api.mapbox.com/styles/v1/jihau/cl2gazbo0000u16o66jok0xt4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamloYXUiLCJhIjoiY2wyZzM4MnptMDAybTNlbDVydWd4NG1tNCJ9.xX5DfnTTX30CKCHNJnlJpg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'jihau/cl2gazbo0000u16o66jok0xt4',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXJra2lrZWtrb25lbiIsImEiOiJjbDJnOW9qMXEwMTJnM2puemloYzlrZ290In0.VjgzSrX13CE24Mqy3_a9VQ'
}).addTo(map);

L.marker([60.17604, 24.9386]).addTo(map);