var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = "C";
var currentTempInCelsius;

$(document).ready(function() {
    var message = document.getElementById("message");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var lat = "lat=" + position.coords.latitude;
                var lon = "lon=" + position.coords.longitude;
                showWeather(lat, lon);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }    

    $("#tempUnit").click(function(){
        var currentTempUnit = $("#tempUnit").text();
        var newTempUnit = (currentTempUnit == "C" ? "F" : "C");
        if(newTempUnit == "F"){
            var fahTemp = Math.round(parseInt($("#temperature").text()) * 9 / 5 + 32);
            $("#temperature").text(fahTemp + " " + String.fromCharCode(176));
        } else {
            $("#temperature").text(currentTempInCelsius + " " + String.fromCharCode(176));
        }
    });

    function showWeather(lat, lon) {
        var urlString = api + lat + "&" + lon;
        $.ajax({
            type: "GET",
            url: urlString,
            success: function(data){
                    currentTempInCelsius = Math.round(data.main.temp * 10) / 10;
                    $("#temperature").text(currentTempInCelsius + " " + String.fromCharCode(176));
                    $("#tempUnit").text(tempUnit);
                    $("#location").text(data.name+", "+data.sys.country);
                    $("#condition").text(data.weather[0].main);
                    $("#image").attr("src",data.weather[0].icon);
                },

            error: function(){
                alert("Erro na API");
            }
        });
            
    }
    getLocation();
});

    