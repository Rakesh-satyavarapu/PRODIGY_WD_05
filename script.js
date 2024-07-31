document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('location-form');
    const locationInput = document.getElementById('location-input');
    const currentLocationBtn = document.getElementById('current-location-btn');
    const weatherInfo = document.getElementById('weather-info');
    
    const apiKey = 'aa4748c567ab1c9bd49c6e4d4b42a0c6';
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = locationInput.value;
        getWeather(location);
    });
    
    currentLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeather(null, lat, lon);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
    
    function getWeather(location, lat = null, lon = null) {
        let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
        
        if (location) {
            url += `&q=${location}`;
        } else if (lat && lon) {
            url += `&lat=${lat}&lon=${lon}`;
        } else {
            return;
        }
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p>Error fetching weather data.</p>';
            });
    }
    
    function displayWeather(data) {
        if (data.cod === 200) {
            const { name, main, weather, wind } = data;
            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <p>Temperature: ${main.temp}°C</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
            `;
        } else {
            weatherInfo.innerHTML = `<p>${data.message}</p>`;
        }
    }
});
