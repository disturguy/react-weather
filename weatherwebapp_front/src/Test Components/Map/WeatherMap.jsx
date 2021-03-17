import React from 'react';
import GoogleMapReact from 'google-map-react';
import '../../assets/css/Map.css'
import LocationPin from './LocationPin'
import {location} from './locations.js'

const WeatherMap = ({zoomLevel}) => {
  return(
  <div className="map">
    <h2 className="map-h2">Εμφάνιση της Παρούσας Τοποθεσίας</h2>
    <div className="google-map">
      <GoogleMapReact
        // bootstrapURLKeys={{key: 'AIzaSyD4PB5OG4k5ZVItbzz4nFR5ECmBIuaqOiY'}}
        defaultCenter={location}
        defaultZoom={zoomLevel}>
        
        <LocationPin 
          lat={location.lat}
          lng={location.lng}
          text={location.address}/>
      </GoogleMapReact>
    </div>
  </div>
  );
}

export default WeatherMap