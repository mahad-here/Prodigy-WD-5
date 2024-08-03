// script.js

const getLocationBtn = document.getElementById('get-location-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeather, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'ae1cfdfba7444bc982b213644242207';  // Your API key
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const current = data.current;
            cityName.textContent = `${data.location.name}, ${data.location.country}`;
            temperature.textContent = `${current.temp_c}°C`;
            conditions.textContent = current.condition.text;
            humidity.textContent = `Humidity: ${current.humidity}%`;
            wind.textContent = `Wind: ${current.wind_kph} kph`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}
