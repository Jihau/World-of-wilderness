let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/erkkikekkonen/cl2gaq835001514o7bo55yyc4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZXJra2lrZWtrb25lbiIsImEiOiJjbDJnOW9qMXEwMTJnM2puemloYzlrZ290In0.VjgzSrX13CE24Mqy3_a9VQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXJra2lrZWtrb25lbiIsImEiOiJjbDJnOW9qMXEwMTJnM2puemloYzlrZ290In0.VjgzSrX13CE24Mqy3_a9VQ'
}).addTo(map);


function addMarker(x, y){
    L.marker([x, y]).addTo(map);
}

let myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", "p291e2j3pm2c");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let api = fetch("https://api.ebird.org/v2/data/obs/FI/recent", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));