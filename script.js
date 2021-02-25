//open string for "city" so it can take on the value of any location
var city ="";
var citySearch = $("#search-city");
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");
var currentUV = $("#uv-index");
var sCity = [];

function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}

