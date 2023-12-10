import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { AiFillWarning } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import FormDialog from './FormularioDialog';

const Mapa = () => {

  const [iconCoords, setIconCoords] = useState({ x: 0, y: -100 });
  const [droppedIcons, setDroppedIcons] = useState([]);
  const [showDialog, setShowDialog] = useState(false); // Estado para mostrar el diálogo


  let lon = -57.9023753;
  let lat = -34.8874779;

  useEffect(() => {
    const mapDiv = document.querySelector('.leaflet-container');
    if (mapDiv) {
      const { top, right } = mapDiv.getBoundingClientRect();
      setIconCoords({ x: right, y: top });
    }
  }, []);

  const iconsStyle = {
    position: 'fixed',
    top: '10px', // Mueve los iconos hacia la parte superior
    right: '10px',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
  };

  const iconContainerStyle = {
    marginBottom: '10px',
    cursor: 'move',
  };

  const handleDrop = (event, draggedIcon) => {
    const newIcon = {
      icon: draggedIcon,
      x: event.clientX,
      y: event.clientY,
    };

    setDroppedIcons((prevIcons) => [...prevIcons, newIcon]);
    //alert(`${newIcon.icon.type.name} fue soltado en (${newIcon.x}, ${newIcon.y}) con el icono: (${newIcon.icon.type.name})`);
    setShowDialog(true); // Mostrar el diálogo al soltar el ícono
    //alert(showDialog);
  };

  return (
    <div>
      {/* Mostrar el diálogo FormDialog cuando showDialog es true */}
      {showDialog && <FormDialog open={showDialog} onClose={() => setShowDialog(false)} />}

      {/* <h3 style={{ display: 'flex', justifyContent: 'center' }}>Mis Lugares</h3> */}
      <h3 style={{ textAlign: 'center' }}>Mis Lugares</h3>
      <MapContainer style={{ height: "90%", width: "210vh" }} center={[lat, lon]} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>

      <div style={iconsStyle}>
        <div style={{ top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}>
          <div
            style={{ ...iconContainerStyle, top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}
            draggable
            onDragEndCapture={(event) => handleDrop(event, <AiFillWarning size={35} style={{ color: 'red', margin: '5px' }} />)}
          >
            <AiFillWarning size={30} style={{ color: 'red', margin: '5px' }} />
          </div>
        </div>

        <div style={{ top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}>
          <div
            style={{ ...iconContainerStyle, top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}
            draggable
            onDragEndCapture={(event) => handleDrop(event, <IoWarningOutline size={35} style={{ color: 'yellow', margin: '5px' }} />)}
          >
            <IoWarningOutline size={30} style={{ color: 'yellow', margin: '5px' }} />
          </div>
        </div>
      </div>

      {droppedIcons.map((icon, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            zIndex: 9999,
          }}
          draggable
          onDragStart={(e) => e.preventDefault()}
        >
          {icon.icon}
        </div>
      ))}

          
      

    </div>
  )
}

export default Mapa;
