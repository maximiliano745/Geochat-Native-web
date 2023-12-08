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
    <h3>Mis Lugares</h3>
    <MapContainer style={{ height: "100%", width: "100%" }} center={[lat, lon]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcadores, etc., de react-leaflet */}
    </MapContainer>
  </div>
  )
}

export default Mapa