let homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', showHome);

let homeContainer = document.getElementById('home');
let satelliteContainer = document.getElementById('satelliteContainer');
let mapContainer = document.getElementById('map');
let imageContainer = document.getElementById('imageContainer');
let consoleContainer = document.getElementById('consoleContainer');

function showMap() {
    setTimeout(function(){map.invalidateSize(true);},500);
    map.setZoom(0);
    mapContainer.classList.remove('hidden');
    satelliteContainer.classList.add('hidden');
    homeContainer.className = 'hidden';
    imageContainer.classList.remove('hidden');
    consoleContainer.classList.remove('hidden');
    dialogBirds.dialog("close");
}

function showSatellite() {
    mapContainer.classList.add('hidden');
    satelliteContainer.classList.remove('hidden');
    homeContainer.className = 'hidden';
    imageContainer.classList.add('hidden');
    consoleContainer.classList.add('hidden');
    dialogBirds.dialog("close");
}


function showHome() {
    mapContainer.classList.add('hidden');
    satelliteContainer.classList.add('hidden');
    homeContainer.className = 'aboutContent';
    imageContainer.classList.add('hidden');
    consoleContainer.classList.add('hidden');
    dialogBirds.dialog("close");

}