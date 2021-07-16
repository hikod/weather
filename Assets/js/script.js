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
var detailsTempImgArray = document.getElementsByClassName("image");
var lat;
var lon;



async function getCityWeatherData(value) {
    if (value === "Search") {
        window.localStorage.setItem('city',document.getElementById('search-input').value);
        searchTxtBox = window.localStorage.getItem('city');
    } else {
        window.localStorage.setItem('city',value);
        searchTxtBox = window.localStorage.getItem('city');
    }

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
            setTemperatureImage();
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
            datesArray[index].innerText = searchTxtBox + " (" + toDateTime(text) + ") ";
            var img = document.createElement("img"); img.className="image";
            datesArray[index].appendChild(img);
            var uvi = document.getElementById("UV");
            if (weatherData.daily[index].uvi > 3) {
                uvi.style.background = "red";
                uvi.innerText = weatherData.daily[index].uvi;
            } else {
                uvi.style.background = "green";
                uvi.innerText = weatherData.daily[index].uvi;
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
    for (let index = 0; index < detailsWindArray.length; index++) {
        var text = weatherData.daily[index].wind_speed + " MPH";
        detailsWindArray[index].textContent = text;

    }
}
function setHumidity() {
    var counter = 0;
    for (let index = 0; index < detailsHumidityArray.length; index++) {
        var text = weatherData.daily[index].humidity + " %";
        detailsHumidityArray[index].textContent = text;

    }
}
function setTemperatureImage() {
    var counter = 0;
    for (let index = 0; index < detailsTempImgArray.length; index++) {
        switch (weatherData.daily[index].weather[0].description) {
            case "moderate rain":
                detailsTempImgArray[index].src = "./Assets/img/rain_light.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "heavy intensity rain":
                detailsTempImgArray[index].src = "./Assets/img/rain.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "rain":
                detailsTempImgArray[index].src = "./Assets/img/rain.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "light rain":
                detailsTempImgArray[index].src = "./Assets/img/rain_light.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;      
            case "cloudy":
                detailsTempImgArray[index].src = "./Assets/img/cloudy.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "scattered clouds":
                detailsTempImgArray[index].src = "./Assets/img/partly_cloudy.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "broken clouds":
                detailsTempImgArray[index].src = "./Assets/img/sunny_s_cloudy.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "overcast clouds":
                detailsTempImgArray[index].src = "./Assets/img/sunny_s_cloudy.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "few clouds":
                detailsTempImgArray[index].src = "./Assets/img/sunny_s_cloudy.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;    
            case "sunny":
                detailsTempImgArray[index].src = "./Assets/img/sunny.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
            case "clear sky":
                detailsTempImgArray[index].src = "./Assets/img/sunny.png";
                detailsTempImgArray[index].width="32"; 
                detailsTempImgArray[index].height="32"
                break;
                    
        }
    }
}