import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { View, Dimensions } from 'react-native';
import { AiFillWarning } from "react-icons/ai";
// import { IoWarningOutline } from "react-icons/io5";
import FormDialog from './FormularioDialog';
import { TiHome } from "react-icons/ti";
//import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import ThreeDRotation from '@mui/icons-material/AccessibilityNew';


const Mapa = () => {

  const [iconCoords, setIconCoords] = useState({ x: 0, y: -100 });
  const [droppedIcons, setDroppedIcons] = useState([]);
  const [showDialog, setShowDialog] = useState(false); // Estado para mostrar el diálogo
  const { width: deviceWidth } = Dimensions.get('window');
  // const [lon, setLon] = useState(null);
  // const [lat, setLat] = useState(null);
  
  let lon=-57.9023753;
  let lat=-34.8874779;

  useEffect(() => {
    // const email = localStorage.getItem('email');
    // if (email === 'maxiargento745@gmail.com') {
    //   setLon(+(-57.9023753));
    //   setLat(+(-34.8874779));
    // } else {
    //   navigator.geolocation.getCurrentPosition(success, error, options);
    // }

    const mapDiv = document.querySelector('.leaflet-container');
    if (mapDiv) {
      const { top, right } = mapDiv.getBoundingClientRect();
      setIconCoords({ x: right, y: top });
    }
  }, []); // El efecto se ejecuta una sola vez al montar el componente


  function success(pos) {
    const crd = pos.coords;
    const newLat = parseFloat(`${crd.latitude}`);
    const newLon = parseFloat(`${crd.longitude}`);
  
    console.log(newLat, newLon);
  
    // Actualizar los estados de lon y lat
    setLon(newLon);
    setLat(newLat);
  
    sessionStorage.setItem("lon", newLon);
    sessionStorage.setItem("lat", newLat);
  }
  function error(err) {
    console.warn(`ERROR: ${err}`);
  }
  
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


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
      //description: description,
    };

    setDroppedIcons((prevIcons) => [...prevIcons, newIcon]);
    setShowDialog(true); // Mostrar el diálogo al soltar el ícono
  };
  const handleTouchStart = (event, draggedIcon) => {
    const touch = event.touches[0];
    const newIcon = {
      icon: draggedIcon,
      x: touch.clientX,
      y: touch.clientY,
    };

    setDroppedIcons((prevIcons) => [...prevIcons, newIcon]);
  };

  const handleTouchMove = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del desplazamiento en dispositivos táctiles

    const touch = event.touches[0];
    const updatedIcons = droppedIcons.map((icon, index) => {
      if (index === droppedIcons.length - 1) { // Actualiza la última posición del ícono mientras se mueve
        return {
          ...icon,
          x: touch.clientX,
          y: touch.clientY,
        };
      }
      return icon;
    });

    setDroppedIcons(updatedIcons);
  };

  const handleTouchEnd = () => {
    setShowDialog(true); // Mostrar el cuadro de diálogo al soltar el ícono
  };

  return (
    <div>
      {/* Mostrar el diálogo FormDialog cuando showDialog es true */}
      {showDialog && <FormDialog open={showDialog} onClose={() => setShowDialog(false)} />}

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h3>Mi MAPA</h3>
      </View>
      <MapContainer style={{ height: "90%", width: deviceWidth }} center={[lat, lon]} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Agrega el ícono en la posición de lon y lat */}
          {lat !== null && lon !== null && (
            <ThreeDRotation
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000, // Asegúrate de que el ícono esté en la parte superior del mapa
                fontSize: '4rem', // Tamaño más grande
              }}
              color='primary'
            />
          )}

      </MapContainer>

      <div style={iconsStyle}>
        <div style={{ top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}>
          <div
            style={{ ...iconContainerStyle, top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}
            draggable
            onDragEndCapture={(event) => handleDrop(event, <AiFillWarning size={35} style={{ color: 'red', margin: '5px' }} />)}
            onTouchStart={(event) => handleTouchStart(event, <AiFillWarning size={35} style={{ color: 'red', margin: '5px' }} />)}
            onTouchMove={(event) => handleTouchMove(event)}
            onTouchEnd={() => handleTouchEnd()} // Agrega esto para manejar el final del toque

          >
            <AiFillWarning size={30} style={{ color: 'red', margin: '5px' }} />
          </div>
        </div>

        <div style={{ top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}>
          <div
            style={{ ...iconContainerStyle, top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}
            draggable
            onDragEndCapture={(event) => handleDrop(event, <TiHome size={35} style={{ color: 'black', margin: '5px' }} />)}
            onTouchStart={(event) => handleTouchStart(event, <TiHome size={35} style={{ color: 'black', margin: '5px' }} />)}
            onTouchMove={(event) => handleTouchMove(event)}
            onTouchEnd={() => handleTouchEnd()} // Agrega esto para manejar el final del toque

          >
            <TiHome size={30} style={{ color: 'black', margin: '5px' }} />
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
