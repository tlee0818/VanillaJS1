const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = "0fa003adb8e8112c46a8a9bcae21d191";

function getWeather(lat, long){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} Celcius @ ${place}`;
    });
}

function saveCoords(coords){

    console.log(coords);

    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        lat: latitude,
        long: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function handleGeoError(){
    console.log("Can't access location");
    alert("Refresh and allow");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoors(){
    const loaded = localStorage.getItem(COORDS);
    if(loaded === null){
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loaded);
        getWeather(parseCoords.lat, parseCoords.long);
    }
}


function init(){
    loadCoors();
}

init();
