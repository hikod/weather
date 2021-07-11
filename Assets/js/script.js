var today = new Date();
var month = today.getUTCMonth() + 1; //months from 1-12
var day = today.getUTCDate();
var year = today.getUTCFullYear();

var url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var apiKey = '&appid=6381ffc04045f8a634c40c9d3d759174';
var searchTxtBox = document.getElementById('search-input').value;
var searchBtn = document.getElementById("search-button");
var weatherData;


console.log(url + searchTxtBox + apiKey)
function getCityWeatherData() {
    // searchTxtBox ="";
    searchTxtBox= document.getElementById('search-input').value;

    fetch(
        url + searchTxtBox + apiKey
    )
        .then(function (resp, error) {
            if (resp.status === 200) {
                console.log(resp)
                return resp.json();
            } else {
                console.log(error);
            }
        })
        .then( (data)=> {
            weatherData = data;
            });
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t.getDate() + '/' + (t.getMonth()+1) + '/' + t.getFullYear();
}