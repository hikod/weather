var today = new Date();
var month = today.getUTCMonth() + 1; //months from 1-12
var day = today.getUTCDate();
var year = today.getUTCFullYear();

//var url = 'https://api.openweathermap.org/data/2.5/onecall?';
var apiKey = '&appid=6381ffc04045f8a634c40c9d3d759174';
var searchTxtBox = document.getElementById('search-input').value;
var searchBtn = document.getElementById("search-button");
var weatherData;
var datesArray = document.getElementsByClassName("card-title");
var detailsTempArray = document.getElementsByClassName("temp");
var detailsWindArray = document.getElementsByClassName("wind");
var detailsHumidityArray = document.getElementsByClassName("humidity");
var lat;
var lon;




async function getCityWeatherData() {
        searchTxtBox = document.getElementById('search-input').value;

    await fetch(
        'https://api.openweathermap.org/geo/1.0/direct?q=' + searchTxtBox + apiKey
    )
        .then(function (resp, error) {
            if (resp.status === 200) {
                return resp.json();
            } else {
                console.log(error);
            }
        })
        .then((data) => {
            lat = data[0].lat;
            lon = data[0].lon;
        });

    await fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&cnt=6&' + apiKey
    )
        .then(function (resp, error) {
            if (resp.status === 200) {
                return resp.json();
            } else {
                console.log(error);
            }
        })
        .then((data) => {
            weatherData = data;
            setTheDatesForTheNext5Days();
            setTemperatures();
            setWinds();
            setHumidity();

        });
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return (t.getMonth() + 1) + '/' + (t.getDate()) + '/' + t.getFullYear();
}

function setTheDatesForTheNext5Days() {
    var counter = 0;
    for (let index = 0; index < datesArray.length; index++) {
        var text = weatherData.daily[index].dt;
        if (index === 0) {
            datesArray[index].innerText = searchTxtBox + " (" + toDateTime(text) + ")";
            var uvi = document.getElementById("UV");
            console.log(weatherData.daily[0]);
            if (weatherData.daily[index].uvi > 3){
                uvi.style.background = "red";
                uvi.innerText = weatherData.daily[index].uvi;
            } else{
                uvi.style.background = "green";
                uv.innerText = weatherData.daily[index].uvi;
            }
        } else
            datesArray[index].innerText = toDateTime(text);
    }
}
function setTemperatures() {
    var counter = 0;
    for (let index = 0; index < detailsTempArray.length; index++) {
        var text = (((weatherData.daily[index].temp.day) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F";
        detailsTempArray[index].textContent = text;

    }
}
function setWinds() {
    var counter = 0;
    for (let index = 0; index < detailsTempArray.length; index++) {
        var text = weatherData.daily[index].wind_speed + " MPH";
        detailsWindArray[index].textContent = text;

    }
}
function setHumidity() {
    var counter = 0;
    for (let index = 0; index < detailsTempArray.length; index++) {
        var text = weatherData.daily[index].humidity + " %";
        detailsHumidityArray[index].textContent = text;

    }
}