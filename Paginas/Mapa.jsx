import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const Mapa = () => {
    let lon;
    let lat;
  
    lon = +sessionStorage.getItem("lon");
    lat = +sessionStorage.getItem("lat");
    lon = -57.9023753;
    lat= -34.8874779;
  return (
    <div>
      <h3 style={{display: 'flex', justifyContent: 'center'}}>Mis Lugares</h3>
      <MapContainer style={{ height: "90%", width: "1340px" }} center={[lat, lon]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcadores, etc., de react-leaflet */}
    </MapContainer>
  </div>
  )
}

export default Mapa