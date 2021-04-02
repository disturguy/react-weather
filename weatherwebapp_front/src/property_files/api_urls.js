import {locationQ_apikey} from './api_keys';

export const cur_weather_url = (lnglat) =>{

    //return `api/weather/current/coordinates?latitude=` + lnglat.coordinates[1] + `&longitude=` + lnglat.coordinates[0];
    return `weather?lat=` + lnglat.coordinates[1] + `&lon=` + lnglat.coordinates[0];
    //return `error_generator`
}

export const revGeoloc_url = (lnglat) =>{

    return `v1/reverse.php?key=`+ locationQ_apikey +`&lat=`+ lnglat.coordinates[1] +`&lon=`+ lnglat.coordinates[0] +`&format=json`;
}

export const fetchLocationQ_url = (city) =>{

    return `v1/search.php?key=`+ locationQ_apikey +`&q=` + city + `&format=json`
}

export const forecastDaily_url = (latlng) =>{

    //return `api/weather/forecast/daily?lat=` + latlng.lat + `&lon=` + latlng.lon + `&units=metric&lang=en`
    return `onecall?lat=` + latlng.lat + `&lon=` + latlng.lon + `&exclude=current,minutely,hourly,alerts`;
}

export const autoComplete_url = (city) =>{

    return `v1/autocomplete.php?key=`+ locationQ_apikey +`&q=`+city;
}