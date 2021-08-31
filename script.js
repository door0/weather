let latitude, longitude;
const API_KEY = ``;

const weather = document.querySelector(".weather");

navigator.geolocation.getCurrentPosition(position => {
    latitude = position.coords.latitude; // 위도
    longitude = position.coords.longitude; // 경도
    getWeather(latitude, longitude);
});

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(response => {
        return response.json();
    }).then(json => {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} °C / @ ${place}`;
    })
};