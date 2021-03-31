export const cur_weather_url = (lnglat) =>{

    return `weather?lat=` + lnglat.coordinates[1] + `&lon=` + lnglat.coordinates[0] + `&appid=c5bca6977c807a27776c8a36988e68c3`
    //return `error_generator`
}

export const revGeoloc_url = () =>{

    return `v1/reverse.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&lat=-37.870662&lon=144.9803321&format=json`
}

export const fetchLocationQ_url = (city) =>{

    return `http://localhost:8080/v1/search.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q=` + city + `&format=json`
}

export const oneCall_url = (latlng) =>{

    return `http://localhost:8080/onecall?lat=` + latlng.lat + `&lon=` + latlng.lon + `&exclude=current,minutely,hourly,alerts&appid=c5bca6977c807a27776c8a36988e68c3`
}

export const autoComplete_url = () =>{

    return `http://localhost:8080/v1/autocomplete.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q=Athens`
}