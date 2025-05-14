let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");

let searchInputValue = "";
let countriesList = [];



function createAppendCountry(country) {
    // Creating and appending countryElement to the resultCountriesElement 
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);

    // Creating and appending county Flag Element to the counrty Element
    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mb-auto", "mt-auto");
    countryEl.appendChild(countryFlagEl);

    // Creating and appending county Info Element to the counrty Element
    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("ml-4", "d-flex", "flex-column");
    countryEl.appendChild(countryInfoEl);

    // Creating and appending county Name Element to the  Country Info Element
    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    // Creating and appending county population Element to the counrty Info Element
    let countrypopulationEl = document.createElement("p");
    countrypopulationEl.textContent = country.population;
    countrypopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countrypopulationEl);
}

function displaySearchResults() {
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputValue)) {
            createAppendCountry(country)
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    }
    resultCountriesEl.textContent = "";
    spinner.classList.toggle("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            countriesList = jsonData;
            displaySearchResults();
            spinner.classList.toggle("d-none");
        })
}

function onChangeSearchInput(event) {
    searchInputValue = event.target.value;
    getCountries();
}

getCountries();
searchInputEl.addEventListener("keyup", onChangeSearchInput);