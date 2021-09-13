let latitude, longitude;
const API_KEY = `17f3cd69b66748594cd1742315476b05`;

let card = document.querySelector(".card");
let card2 = document.getElementById("card2");
card2.style.display = 'none';

let average1 = document.getElementById("average1");
let place1 = document.getElementById("place1");
let icon1 = document.getElementById("icon1");
let min1 = document.getElementById("min1");
let max1 = document.getElementById("max1");

// random bg
let bg = new Array();
bg[0] = "../img/sand.jpg";
bg[1] = "../img/cloudy.jpg";
bg[2] = "../img/rainy.jpg";
bg[3] = "../img/sunny.jpg";

function showBg() {
    let imgNum = Math.round(Math.random()*3);
    let objImg = document.querySelector(".wrapper");
    objImg.style.backgroundImage = 'url('+ bg[imgNum] + ')';
    console.log(bg[imgNum])
}

// day weather icon array
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

// night weather icon array
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

// get current location 
navigator.geolocation.getCurrentPosition(position => {
    latitude = position.coords.latitude; // 위도
    longitude = position.coords.longitude; // 경도
    getWeather(latitude, longitude);
});


// get current location weather 
function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=current,daily&appid=${API_KEY}&units=metric`
    ).then(response => {
        return response.json();
    }).then(json => {        
        let temperature = json.main.temp;
        let min_temperature = json.main.temp_min;
        let max_temperature = json.main.temp_max;
        let place = json.name;
        let country = json.sys.country;
        let icon = json.weather[0].icon;
   
        average1.innerText = `${temperature}`;
        place1.innerText = `${place}, ${country}`;
        min1.innerHTML = `<i class="wi wi-thermometer-exterior"></i>` + ` ${min_temperature}` + ` <i class="wi wi-celsius fsize20"></i>`;
        max1.innerHTML = `<i class="wi wi-thermometer"></i>` + ` ${max_temperature}` + ` <i class="wi wi-celsius fsize20"></i>`;

        // get current location time - use moment.js
        let timezone = json.timezone;
        let timezoneInMinutes = timezone / 60;

        let hour = moment().utcOffset(timezoneInMinutes).format("HH");

        // get day & night icon 
        if( hour >= 7 && hour <= 18 ) { 
            icon1.innerHTML = `<i class="wi `+ weatherDayIcon[icon] + `"></i>`;
        } else {
            icon1.innerHTML = `<i class="wi `+ weatherNightIcon[icon] + `"></i>`;
        }           
    })    
};


// get search location
function getSearchWeather() {
    const city = document.getElementById("cityInput").value;
    card2.style.display = "block";

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=current,daily&appid=${API_KEY}&units=metric`
        ).then(response => {
            return response.json();
        }).then(json => { 
            //console.log(json);
            let temperature = json.main.temp;
            let min_temperature = json.main.temp_min;
            let max_temperature = json.main.temp_max;
            let place = json.name;
            let country = json.sys.country;
            let icon = json.weather[0].icon;


            // get search location time - use moment.js
            let timezone = json.timezone;
            let timezoneInMinutes = timezone / 60;

            let hour = moment().utcOffset(timezoneInMinutes).format("HH");

            // get day & night icon 
            if( hour >= 7 && hour <= 18 ) { 
                var it = weatherDayIcon[icon];
            } else {
                var it = weatherNightIcon[icon];
            }  
                   
            card2.innerHTML = `
                <div class="cols left">
                    <div class="rows txt-center">
                        <span id="average2" class="average">${temperature}</span>
                        <i class="wi wi-celsius fsize30"></i>
                        <span id="icon2" class="w-icon-colorize"><i class="wi ${it}"></i></span>
                    </div>
        
                    <div class="rows txt-center">
                        <div id="place2" class="place">${place}, ${country}</div>
                    </div>
                </div>
    
                <div class="cols right">
                    <div class="ondo">
                        <div id="min2" class="min"><i class="wi wi-thermometer-exterior fsize20"></i> ${min_temperature} <i class="wi wi-celsius fsize20"></i></div>
                        <div id="max2" class="max"><i class="wi wi-thermometer fsize20"></i> ${max_temperature} <i class="wi wi-celsius fsize20"></i></div>
                    </div>
                </div>
            `;
        })

    if( document.getElementById("cityInput").focus() ) {
        set();
    }
}

function set () {
    city.reset();
}
