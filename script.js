let latitude, longitude;
const API_KEY = `17f3cd69b66748594cd1742315476b05`;

let card = document.querySelector(".card");
let average1 = document.getElementById("average1");
let place1 = document.getElementById("place1");
let icon1 = document.getElementById("icon1");
let min1 = document.getElementById("min1");
let max1 = document.getElementById("max1");

let weatherDayIcon = {
    '01d' : 'wi-day-sunny', 
    '02d' : 'wi-day-cloudy', 
    '03d' : 'wi-cloud', 
    '04d' : 'wi-cloudy', 
    '09d' : 'wi-day-showers', 
    '10d' : 'wi-rain', 
    '11d' : 'wi-day-lightning', 
    '13d' : 'wi-day-snow', 
    '50d' : 'wi-day-fog'
};

let weatherNightIcon = {
    '01n' : 'wi-night-clear', 
    '02n' : 'wi-night-alt-cloudy', 
    '03n' : 'wi-cloud', 
    '04n' : 'wi-cloudy', 
    '09n' : 'wi-night-alt-showers', 
    '10n' : 'wi-rain', 
    '11n' : 'wi-night-alt-lightning', 
    '13n' : 'wi-night-snow', 
    '50n' : 'wi-night-fog'
};

// 위치 출력
navigator.geolocation.getCurrentPosition(position => {
    latitude = position.coords.latitude; // 위도
    longitude = position.coords.longitude; // 경도
    getWeather(latitude, longitude);
});

// 날씨 출력
function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=current,daily&appid=${API_KEY}&units=metric`
    ).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        let temperature = json.main.temp;
        let min_temperature = json.main.temp_min;
        let max_temperature = json.main.temp_max;
        let place = json.name;
        let country = json.sys.country;
        let icon = json.weather[0].icon;

        average1.innerText = `${temperature}`;
        place1.innerText = `${place}, ${country}`;
        min1.innerHTML = `${min_temperature}` + ` <i class="wi wi-celsius fsize20"></i>`;
        max1.innerHTML = `${max_temperature}` + ` <i class="wi wi-celsius fsize20"></i>`;
        // document.getElementById("icon1").src = `http://openweathermap.org/img/w/`+json.weather[0].icon+`.png`;

        //낮과 밤
        let today = new Date();
        let hour = today.getHours();

        if( hour >= 7 && hour <= 18 ) {
            //낮
            icon1.innerHTML = `<i class="wi `+ weatherDayIcon[icon] + `"></i>`;
        } else {
            icon1.innerHTML = `<i class="wi `+ weatherNightIcon[icon] + `"></i>`;
        }
        


        
    })
    
};


