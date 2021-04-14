import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, GeolocateControl } from 'react-map-gl';


const navControlStyle = {
    right: 10,
    top: 10
};

const geolocateControlStyle = {
    right: 10,
    top: 10
};

function WeatherMap({Coord}) {

    const [lnglat, setCoordinates] = useState({coordinates:[23.727539, 37.7577]})

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        longitude: 23.727539,
        latitude: 37.983810,
        zoom: 14,
        mapboxApiAccessToken: "pk.eyJ1IjoiZGlzdHVyZ3V5IiwiYSI6ImNrbHc5MHJsbzEwNXoycG8zM2FtanR3cTEifQ.0fjFyIzfk9bEfVX4qzlMHg"
    });


    return (
        <>
        <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)} onDblClick={(obj) => {setCoordinates({coordinates: obj.lngLat}); Coord(lnglat);}}>
            <NavigationControl style={navControlStyle} />
            <Marker longitude={lnglat.coordinates[0]} latitude={lnglat.coordinates[1]} offsetLeft={-20} offsetTop={-10}>
                <div>Forecast Location</div>
            </Marker>
            <GeolocateControl
                style={geolocateControlStyle}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                auto
            />
        </ReactMapGL>
        </>
    );
}

export default WeatherMap


// pk.eyJ1IjoiZGlzdHVyZ3V5IiwiYSI6ImNrbHc5MHJsbzEwNXoycG8zM2FtanR3cTEifQ.0fjFyIzfk9bEfVX4qzlMHg