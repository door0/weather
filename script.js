let latitude, longitude;
const API_KEY = `17f3cd69b66748594cd1742315476b05`;

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
        console.log(json);
        const temperature = json.main.temp;
        const min_temperature = json.main.temp_min;
        const max_temperature = json.main.temp_max;
        const place = json.name;
        weather.innerText = `평균 기온 : ${temperature} °C 
        최저 기온 : ${min_temperature}°C 
        최고 기온 : ${max_temperature}°C  / @ ${place}`;
    })
};