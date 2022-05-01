const taxon_id_Whales = '152871';
const taxon_id_Mammals = '40151';
let whalesButton = document.getElementById('whalesButton');
whalesButton.addEventListener('click', displayWhales);

let animalsButton = document.getElementById('animalsButton');
animalsButton.addEventListener('click', displayMammals);

function displayWhales() {
    displayResults(taxon_id_Whales);
}

function displayMammals() {
    displayResults(taxon_id_Mammals);
}

function displayResults(taxon_id){
    showHideCountrySelector(false);
    showSpinner();
    getResults(taxon_id).then(() => hideSpinner());
}

function showSpinner() {
    let spinner = document.getElementById("loader-container");
    spinner.className = 'loaderContainer';

    let mainMenu = document.getElementById("main-menu");
    mainMenu.className = 'main-menu hidden'
}

function hideSpinner() {
    let spinner = document.getElementById("loader-container");
    spinner.className = 'hidden';

    let mainMenu = document.getElementById("main-menu");
    mainMenu.className = 'main-menu visible'
}

async function getResults(taxon_id) {
    const recordPerPage = 10000;
    let url = `https://api.inaturalist.org/v1/observations?verifiable=true&order_by=observations.id&order=desc&page=1&spam=false&taxon_id=${taxon_id}&locale=en-US&per_page=${recordPerPage}`;
    try {
        const api = await fetch(url);
        if (api.ok) {
            const result = await api.json();
            let whaleName = '';
            let consoleMessage = '';
            let lat = '';
            let lng = '';
            let image_url = '';
            let geojson = '';
            let content = '';
            let observedOn = '';
            for (let i = 0; i < result.results.length; i++) {
                let record = result.results[i];
                whaleName = record.taxon.name;
                whaleName = whaleName ? whaleName : '';
                geojson = record.geojson;
                lat = geojson? record.geojson.coordinates[0] : "";
                lng = geojson? record.geojson.coordinates[1] : "";

                image_url = record.taxon.default_photo;
                image_url = image_url? image_url.url : '';
                content = record.taxon.wikipedia_url;
                observedOn = record.observed_on_details.date;
                let consoleMessage = `Name: ${whaleName}\nCoordinates: ${lat}, ${lng}\nInfo: ${content}\n****************************************************\n`;
                addGeoJSONToMap(record.geojson, whaleName, image_url, observedOn, () => {consoleOutput.value += consoleMessage})
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong');
    }
}
