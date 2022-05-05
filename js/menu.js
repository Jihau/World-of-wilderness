let homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', showHome);
let aboutButton = document.getElementById('personButton');
aboutButton.addEventListener('click', showAboutUs);

let satelliteContainer = document.getElementById('satelliteContainer');
let mapContainer = document.getElementById('map');
let imageContainer = document.getElementById('imageContainer');
let consoleContainer = document.getElementById('consoleContainer');
let aboutContainer = document.getElementById('aboutContainer');

function showMap() {
    setTimeout(function(){map.invalidateSize(true);},500);
    map.setZoom(1);
    mapContainer.classList.remove('hidden');
    satelliteContainer.classList.add('hidden');
    imageContainer.classList.remove('hidden');
    consoleContainer.classList.remove('hidden');
    aboutContainer.classList.add('hidden');
    dialogBirds.dialog("close");
    clearConsole();
}

function showSatellite() {
    mapContainer.classList.add('hidden');
    satelliteContainer.classList.remove('hidden');
    imageContainer.classList.add('hidden');
    consoleContainer.classList.add('hidden');
    aboutContainer.classList.add('hidden');
    dialogBirds.dialog("close");
}

function showHome() {
    showMap();
    clearMarkers();
}

function showAboutUs() {
    mapContainer.classList.add('hidden');
    satelliteContainer.classList.add('hidden');
    aboutContainer.classList.remove('hidden');
    imageContainer.classList.add('hidden');
    consoleContainer.classList.add('hidden');
    dialogBirds.dialog("close");
}