// Your code here

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

// ON APP LOAD
    // only the input field and search button should be visible
    // this is already in the HTML

// ON SUBMIT 
form.onsubmit = function(e) {
    e.preventDefault();

    const userQuery = input.value.trim();
        console.log("User input:" + " " + userQuery);
    
        // construct the fetch URL
    const queryString = '?units=imperial&appid=a8b8566d914e7ee5f3e4973ebeb94b48&q=' + userQuery;
    const fetchURL = weatherURL + queryString;
    // app should call the Open Weather API's current weather endpoint using the JS fetch API to obtain weather data based on location entered by the user
    

// TODO Convert a promise-based function (a function call with .then) to instead use async and await.
    fetch(fetchURL)
        .then(function(response) {
            console.log("Response Status:" + " " + response.status);
            
            // LOCATION NOT FOUND
            if (response.status === 404) { 
                // notify the user that the location was not found
                showLocationNotFound();
                input.value = ''; // clear inpur value
                return; // exit if not found
            }  
            // LOCATION FOUND
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

function showLocationNotFound() {
    // create <h2>Location not found</h2> above the form
    const h2 = document.createElement('h2');
    h2.textContent = 'Location not found';
    weatherDisplay.innerHTML = ''; // clear
    weatherDisplay.appendChild(h2); // display "Location not found"
}


// DISPLAY CURRENT WEATHER INFO       
function updateDisplay(data) {
    weatherDisplay.innerHTML = ''; // clear

    const city = data.name; // city code
    const country = data.sys.country; // country code
    const mapLink = "https://www.google.com/maps/search/?api=1&query=" + data.coord.lat + "," + data.coord.lon; // google maps link to location
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
    locationDisplay.textContent = city + ', ' + country;
    weatherDisplay.appendChild(locationDisplay);

    const mapLinkDisplay = document.createElement('a');
    mapLinkDisplay.href = mapLink;
    mapLinkDisplay.target = "_blank";
    mapLinkDisplay.textContent = "Click to view map";
    weatherDisplay.appendChild(mapLinkDisplay);
        // <a href="" target="_BLANK"/a>

    const weatherIconDisplay = document.createElement('img');
    weatherIconDisplay.src = weatherIcon;
    weatherIconDisplay.innerText = 'Click to view map';
    weatherDisplay.appendChild(weatherIconDisplay);
        // <img src="">


// this one breaks the code when i change to let or const
    var breakElement = document.createElement('br');
    const weatherDescriptionDisplay = document.createElement('p');
    weatherDescriptionDisplay.textContent = weatherDescription;
    weatherDisplay.appendChild(weatherDescriptionDisplay);
    weatherDisplay.appendChild(breakElement);
        // <p style="text-transform: capitalize;"> </p><br>

    const currentTempDisplay = document.createElement('p');
    currentTempDisplay.textContent = 'Current: ' + currentTemp + '°F';
    weatherDisplay.appendChild(currentTempDisplay);
        // <p>Current: 53.74° F</p>

// this one breaks the code when i change to let or const
    var breakElement = document.createElement('br');
    const feelsLikeDisplay = document.createElement('p');
    feelsLikeDisplay.textContent = 'Feels like: ' + feelsLike + '°F';
    weatherDisplay.appendChild(feelsLikeDisplay);
    weatherDisplay.appendChild(breakElement);
        // <p>Feels like: 51.69° F</p><br>

    const lastUpdatedDisplay = document.createElement('p');
    lastUpdatedDisplay.textContent = 'Last updated: ' + timeString;
    weatherDisplay.appendChild(lastUpdatedDisplay);
        // <p>Last updated: 11:00 PM</p>
    ;
}
