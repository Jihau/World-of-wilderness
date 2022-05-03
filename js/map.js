
// TODO: Remove test marker
//  L.marker([60.17604, 24.9386]).addTo(map);



let birdsButton = document.getElementById('birdsButton');
birdsButton.addEventListener('click', displayCountrySelector);

function displayCountrySelector(){
    showHideCountrySelector(true);
    let birdsMenu = document.getElementById('birdsMenu');
    birdsMenu.value = "0";
}

function showHideCountrySelector(show){
    let countrySelector = document.getElementById('countrySelector');
    let satellite = document.getElementById('satellite');
    countrySelector.setAttribute('class', show ? 'visible' : 'hidden');
    satellite.setAttribute('class', show ? 'visible' : 'hidden');
    clearMarkers();
    clearConsole();
}

async function birds(country) {
    let myHeaders = new Headers();
    myHeaders.append('X-eBirdApiToken', 'p291e2j3pm2c');

    let requestOptions = {
        method: 'GET', headers: myHeaders, redirect: 'follow'
    };

    let lat, lng, birdName, location, date, image, sciName;

    try {
        const api = await fetch(`https://api.ebird.org/v2/data/obs/${country}/recent`, requestOptions);
        if (api.ok) {
            const result = await api.json();
            for (let i = 0; i < result.length; i++) {
                lat = result[i].lat;
                lng = result[i].lng;
                birdName = result[i].comName;
                sciName = result[i].sciName;
                location = result[i].locName;
                date = result[i].obsDt;
                getImages(birdName, sciName, date, lat, lng, location);
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
}

document.getElementById('birdsMenu').onchange = function (evt){
    let value = evt.target.value;
    clearMarkers();
    clearConsole();
    birds(value).then();
}

