// INSTRUCTIONS:
// To complete this assignment, you will need to do each of the following AT LEAST ONCE in your code:
    // Convert a var declaration to const or let where appropriate.
    // Convert a promise-based function (a function call with .then) to instead use async and await.
    // Convert a function declaration into a arrow function.
    // Convert string concatenation to instead use template literals and string interpolation.
    // Convert some object-related code to use ES6 destructuring.


const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
// API Key: a8b8566d914e7ee5f3e4973ebeb94b48

const weatherAppDiv = document.getElementById('weather-app');
const form = document.querySelector('form');
const input = document.getElementById('weather-search');
const weatherDisplay = document.getElementById('weather');


// TODO Convert a function declaration into a arrow function.
form.onsubmit = function(e) {
    e.preventDefault();

    const userQuery = input.value.trim();
// TODO Convert string concatenation to template literals and string interpolation.
    console.log("User input:" + " " + userQuery);
// TODO Convert string concatenation to template literals and string interpolation.   
    const queryString = '?units=imperial&appid=a8b8566d914e7ee5f3e4973ebeb94b48&q=' + userQuery;
// TODO Convert string concatenation to template literals and string interpolation.
    const fetchURL = weatherURL + queryString;
    

// TODO Convert a promise-based function (a function call with .then) to instead use async and await.
    fetch(fetchURL)
        .then(function(response) {
            // TODO Convert string concatenation to template literals and string interpolation.
            console.log("Response Status:" + " " + response.status);
            
            // HANDLE LOCATION NOT FOUND
            if (response.status === 404) { // notify user location was not found
                showLocationNotFound();
                input.value = ''; // clear inpur value
                return; // exit if not found
            }  
            // HANDLE LOCATION FOUND
            return response.json(); // if user entered search term that is found, retrieve data
        })
        .then(function(data) { // UPDATE DISPLAY
            if (data) {
                console.log(data);
                updateDisplay(data); // call function to display weather info
                input.value = ''; // clear input value
            }
        });
}

// TODO Convert a function declaration into a arrow function.
function showLocationNotFound() {
    // create <h2>Location not found</h2> above the form
    const h2 = document.createElement('h2');
    h2.textContent = 'Location not found';
    weatherDisplay.innerHTML = ''; // clear
    weatherDisplay.appendChild(h2); // display "Location not found"
}


// TODO Convert a function declaration into a arrow function.
function updateDisplay(data) {
    weatherDisplay.innerHTML = ''; // clear

    const city = data.name; // city code
    const country = data.sys.country; // country code
// TODO Convert string concatenation to template literals and string interpolation.
    const mapLink = "https://www.google.com/maps/search/?api=1&query=" + data.coord.lat + "," + data.coord.lon; // google maps link to location
// TODO Convert string concatenation to template literals and string interpolation.
    const weatherIcon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'; // weather icon representing current conditions
    const weatherDescription = data.weather[0].description; // description of current weather
    const currentTemp = data.main.temp; // actual temp
    const feelsLike = data.main.feels_like; // feels like temp
    
    const dataTime = data.dt * 1000; // Time of data calculation, unix, UTC
    const date = new Date(dataTime); // time last updated   
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

// TODO Convert string concatenation to template literals and string interpolation.
    console.log("City:" + " " + city);
    console.log("Country:" + " " + country);
    console.log("Map link:" + " " + mapLink);
    console.log("Icon link:" + " " + weatherIcon);
    console.log("Description:" + " " + weatherDescription);
    console.log("Temp:" + " " + currentTemp);
    console.log("Feels like temp:" + " " + feelsLike);
    console.log("dt:" + " " + dataTime);
    console.log("Last updated:" + " " + timeString);


    const locationDisplay = document.createElement('h2');
// TODO Convert string concatenation to template literals and string interpolation.
    locationDisplay.textContent = city + ', ' + country;
    weatherDisplay.appendChild(locationDisplay);


    const mapLinkDisplay = document.createElement('a');
    mapLinkDisplay.href = mapLink;
    mapLinkDisplay.target = "_blank";
    mapLinkDisplay.textContent = "Click to view map";
    weatherDisplay.appendChild(mapLinkDisplay);


    const weatherIconDisplay = document.createElement('img');
    weatherIconDisplay.src = weatherIcon;
    weatherIconDisplay.innerText = 'Click to view map';
    weatherDisplay.appendChild(weatherIconDisplay);


    const weatherDescriptionDisplay = document.createElement('p');
    weatherDescriptionDisplay.textContent = weatherDescription;
    weatherDisplay.appendChild(weatherDescriptionDisplay);


    const currentTempDisplay = document.createElement('p');
// TODO Convert string concatenation to template literals and string interpolation.
    currentTempDisplay.textContent = 'Current: ' + currentTemp + '°F';
    weatherDisplay.appendChild(currentTempDisplay);


    const feelsLikeDisplay = document.createElement('p');
// TODO Convert string concatenation to template literals and string interpolation.
    feelsLikeDisplay.textContent = 'Feels like: ' + feelsLike + '°F';
    weatherDisplay.appendChild(feelsLikeDisplay);


    const lastUpdatedDisplay = document.createElement('p');
// TODO Convert string concatenation to template literals and string interpolation.
    lastUpdatedDisplay.textContent = 'Last updated: ' + timeString;
    weatherDisplay.appendChild(lastUpdatedDisplay);
    ;
}
