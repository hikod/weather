var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=6381ffc04045f8a634c40c9d3d759174';
var searchTxtBox = document.getElementById('search-input').value;
var searchBtn = document.getElementById("search-button");


function getCityWeatherData() {
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
        .then(function (data, error) {
            if (data !== undefined) {
                console.log(data.name);
                console.log(data.main.temp);
            } else {
                console.log(error);
            }
        });
}