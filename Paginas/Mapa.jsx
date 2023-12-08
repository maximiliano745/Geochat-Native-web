import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { AiFillWarning } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";

const Mapa = () => {
  const [iconCoords, setIconCoords] = useState({ x: 0, y: 0 });

  let lon = -57.9023753;
  let lat = -34.8874779;

  useEffect(() => {
    // Obtén las dimensiones del mapa al cargarse
    const mapDiv = document.querySelector('.leaflet-container');
    if (mapDiv) {
      const { top, right } = mapDiv.getBoundingClientRect();
      setIconCoords({ x: right, y: top });
    }
  }, []); // Se ejecutará solo una vez al cargar la página

  const iconsStyle = {
    position: 'fixed',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const iconContainerStyle = {
    marginBottom: '10px', // Agrega un espacio entre los iconos
    cursor: 'move', // Hace que el cursor se convierta en una mano para indicar que se pueden arrastrar
  };

  const handleDrop = (event) => {
    setIconCoords({ x: event.clientX, y: event.clientY });
  };

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'center' }}>Mis Lugares</h3>
      <MapContainer style={{ height: "90%", width: "1300px" }} 
      center={[lat, lon]} zoom={6} onMouseUp={handleDrop}
>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Marcadores, etc., de react-leaflet */}
      </MapContainer>

      {/* Contenedor de iconos */}
      
      <div style={iconsStyle}>
        <div style={iconContainerStyle} draggable={true}>
          <AiFillWarning size={30} style={{ color: 'red', margin: '5px' }} />
        </div>
        <div style={iconContainerStyle} draggable={true}>
          <IoWarningOutline size={30} style={{ color: 'yellow', margin: '5px' }} />
        </div>
      </div>
    </div>
  )
}

export default Mapa;
