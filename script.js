//open string for "city" so it can take on the value of any location
//global vars for different weather attributes
var city ="";
var citySearch = $("#search-city");
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");
var currentUV = $("#uv-index");
var sCity = [];

//To find the city
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}

var APIKey="ba16492eb916e36730d06ac08e215281";

//Displaying the overall weather
function displayWeather(event){
    event.preventDefault();
    if(citySearch.val().trim()!==""){
        city=citySearch.val().trim();
        currentWeather(city);
    }
}

//Gathering the current weather
function currentWeather(city){   
//The url to "get" the weather data from the api for the city
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
    console.log(response);

//Var for the weather icon/var for url to access icons/access dates
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        var date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");

//Converting the temp to farenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemp).html((tempF).toFixed(2)+"&#8457");

//Humidity
        $(currentHumidity).html(response.main.humidity+"%");

//Wind speed and convert to MPH
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(currentWind).html(windsmph+"MPH");
       
//UV display/using coordinagtes as a paramenter to gather the data
        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }

    });
}

