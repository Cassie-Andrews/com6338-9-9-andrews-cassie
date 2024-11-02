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


// Convert a function declaration into a arrow function.
form.onsubmit = async (e) => {
    e.preventDefault();

    const userQuery = input.value.trim();
// Convert string concatenation to template literals and string interpolation.
    console.log(`User input: ${userQuery}`);
// Convert string concatenation to template literals and string interpolation.   
    const queryString = `?units=imperial&appid=a8b8566d914e7ee5f3e4973ebeb94b48&q=${userQuery}`;
// Convert string concatenation to template literals and string interpolation.
    const fetchURL = `${weatherURL}${queryString}`;
    

// Convert a promise-based function (a function call with .then) to instead use async and await.
    try {
        const response = await fetch(fetchURL)
// Convert string concatenation to template literals and string interpolation.
        console.log(`Response Status: ${response.status}`);
        // HANDLE LOCATION NOT FOUND
        if (response.status === 404) { // notify user location not found
            showLocationNotFound();
            input.value = ''; // clear inpur value
            return; // exit if not found
        } 

        // HANDLE LOCATION FOUND
        const data = await response.json(); // if search term found, retrieve data

// Convert a promise-based function (a function call with .then) to instead use async and await.
        // UPDATE DISPLAY
        if (data) {
            console.log(data);
            updateDisplay(data); // call function to display weather info
            input.value = ''; // clear input value
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Convert a function declaration into a arrow function.
const showLocationNotFound = () => {
    const h2 = document.createElement('h2');
    h2.textContent = 'Location not found';
    weatherDisplay.innerHTML = ''; // clear
    weatherDisplay.appendChild(h2); // display "Location not found"
}


// Convert a function declaration into a arrow function.
const updateDisplay = (data) => {
    weatherDisplay.innerHTML = ''; // clear
// Convert some object-related code to use ES6 destructuring.
// Convert string concatenation to template literals and string interpolation.
    const { name: city, sys: { country }, coord: { lat, lon }, weather, main, dt } = data;
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`; 
// Convert string concatenation to template literals and string interpolation.
    const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; // weather icon representing current conditions
    const weatherDescription = weather[0].description; // desc of current weather
    const currentTemp = main.temp; // actual temp
    const feelsLike = main.feels_like; // feels like temp
    
    const dataTime = dt * 1000; // time of data calculation, unix, UTC
    const date = new Date(dataTime); // time last updated   
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

// Convert string concatenation to template literals and string interpolation.
    console.log(`City: ${city}`);
    console.log(`Country: ${country}`);
    console.log(`Map link: ${mapLink}`);
    console.log(`Icon link: ${weatherIcon}`);
    console.log(`Description: ${weatherDescription}`);
    console.log(`Temp: ${currentTemp}`);
    console.log(`Feels like temp: ${feelsLike}`);
    console.log(`dt: ${dataTime}`);
    console.log(`Last updated: ${timeString}`);


    const locationDisplay = document.createElement('h2');
// Convert string concatenation to template literals and string interpolation.
    locationDisplay.textContent = `${city}, ${country}`;
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
// Convert string concatenation to template literals and string interpolation.
    currentTempDisplay.textContent = `Current: ${currentTemp}°F`;
    weatherDisplay.appendChild(currentTempDisplay);


    const feelsLikeDisplay = document.createElement('p');
// Convert string concatenation to template literals and string interpolation.
    feelsLikeDisplay.textContent = `Feels like: ${feelsLike}°F`;
    weatherDisplay.appendChild(feelsLikeDisplay);


    const lastUpdatedDisplay = document.createElement('p');
// Convert string concatenation to template literals and string interpolation.
    lastUpdatedDisplay.textContent = `Last updated: ${timeString}`;
    weatherDisplay.appendChild(lastUpdatedDisplay);
    ;
}
