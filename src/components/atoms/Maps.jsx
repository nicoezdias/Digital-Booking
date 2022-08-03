import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};



const options={
  panControl:false,
  mapTypeControl: false,
  scrollwheel: false,
  fullscreenControl: false,
  zoomControl:true,
  streetViewControl:false,  
}

function Maps({info}) {
  const {latitude, longitude} = info
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAPS
  })

  const center = {
    lat: latitude,
    lng: longitude
  };

  return isLoaded ? (
      <GoogleMap mapContainerStyle={containerStyle} center={center} options={options} zoom={15}>
        <Marker position={center}/>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Maps)