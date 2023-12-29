import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { View, Dimensions } from 'react-native';
import { AiFillWarning } from "react-icons/ai";
import FormDialog from './FormularioDialog';
import { TiHome } from "react-icons/ti";
import ThreeDRotation from '@mui/icons-material/AccessibilityNew';


const Mapa = ({lon, lat}) => {

  const [iconCoords, setIconCoords] = useState({ x: 0, y: -100 });
  const [droppedIcons, setDroppedIcons] = useState([]);
  const [showDialog, setShowDialog] = useState(false); // Estado para mostrar el diálogo
  const { width: deviceWidth } = Dimensions.get('window');
  const [showDialog2, setShowDialog2] = useState(true); // estado para sacar el icono si no confirma
  const [selectedIcon, setSelectedIcon] = useState(null);

  const [acepta, setAcepta] = useState(false);

  



  // const email = localStorage.getItem('email');
  // if (email === 'maxiargento745@gmail.com') {
  //   lon = +(-57.9023753);
  //   lat = -34.8874779;
  // }

 

  useEffect(() => {

    
    const mapDiv = document.querySelector('.leaflet-container');
    if (mapDiv) {
      const { top, right } = mapDiv.getBoundingClientRect();
      setIconCoords({ x: right, y: top });
    }
  }, [lon,lat]); // El efecto se ejecuta una sola vez al montar el componente

  useEffect(() => {
    if (!showDialog2) {
      setDroppedIcons(prevIcons => prevIcons.slice(0, -1)); // Elimina el último ícono agregado
      const resetTimeout = setTimeout(() => {
        setShowDialog2(true);
        setShouldResetShowDialog2(false);
      }, 3000); // Cambia el tiempo a tu preferencia (en milisegundos)

      return () => clearTimeout(resetTimeout);
    } else {
      setAcepta(true);
    }
  }, [showDialog2]);



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

  const handleDrop = (event, draggedIcon, draggedIconType) => {
    const newIcon = {
      icon: draggedIcon,
      x: event.clientX,
      y: event.clientY,
      iconType: draggedIconType, // Agregar el tipo de ícono aquí

    };

    setDroppedIcons((prevIcons) => [...prevIcons, newIcon]);
    // Actualizar el estado para reflejar el tipo de ícono seleccionado
    setSelectedIcon(draggedIconType);
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

  const handleTouchEnd = (draggedIconType) => {
    // Actualizar el estado para reflejar el tipo de ícono seleccionado
    setSelectedIcon(draggedIconType);
    setShowDialog(true); // Mostrar el cuadro de diálogo al soltar el ícono
  };


  const handleSaveToDatabase = (confirmed, iconDescription) => {
    if (confirmed) {
      alert('aca se guarda');
      userId = localStorage.getItem('id');
      if (selectedIcon === 'Alerta') {
        // Guardar en la tabla Alertas: descripción de la alerta, id de quien la hizo, ubicación (lat, lon)
        // Ejemplo de cómo podrías hacerlo:
        const alertData = {
          descripcion: iconDescription,
          idUsuario: +userId, // Suponiendo que tienes la información del usuario actual
          latitud: convertirCoordenadaYALat(icon.y), // Convertir la coordenada y a latitud
          longitud: convertirCoordenadaXALon(icon.x), // Convertir la coordenada x a longitud
        };
        // Lógica para guardar en la tabla Alertas utilizando algún método o API

      } else if (selectedIcon === 'Vivienda') {
        // Identificar si es contacto o conocido
        const esContacto = false;
        // Guardar en la tabla Vivienda: descripción de la vivienda, ubicación (lat, lon), es contacto (true/false)
        // Ejemplo de cómo podrías hacerlo:
        const viviendaData = {
          idUsuario: +userId, // Suponiendo que tienes la información del usuario actual
          descripcion: iconDescription,
          latitud: convertirCoordenadaYALat(icon.y), // Convertir la coordenada y a latitud
          longitud: convertirCoordenadaXALon(icon.x), // Convertir la coordenada x a longitud
          esContacto: esContacto,
        };
        // Lógica para guardar en la tabla Vivienda utilizando algún método o API
      }

    }

  };


  const convertirCoordenadaYALat = (coordY, mapHeight, mapCenterLat) => {
    const latitud = mapCenterLat - (coordY - mapHeight / 2) * (90 / (mapHeight / 2));
    return latitud;
  };

  const convertirCoordenadaXALon = (coordX, mapWidth, mapCenterLon) => {
    const longitud = mapCenterLon + (coordX - mapWidth / 2) * (180 / (mapWidth / 2));
    return longitud;
  };


  return (
    <div>
      {/* Mostrar el diálogo FormDialog cuando showDialog es true */}
      {/* {<FormDialog open={showDialog} onClose={() => setShowDialog(false)} />} */}
      {(
        <FormDialog open={showDialog} onClose={(confirmed, iconDescription) => {
          setShowDialog(false);
          setShowDialog2(confirmed); // Actualiza showDialog2 con el valor confirmado
          if (acepta) {
            handleSaveToDatabase(confirmed, iconDescription);
            setAcepta(false);
          }
        }}
          selectedIcon={selectedIcon}
        />
      )}

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
            onDragEndCapture={(event) => handleDrop(event, <AiFillWarning size={35} style={{ color: 'red', margin: '5px' }} />, 'Alerta')}
            onTouchStart={(event) => handleTouchStart(event, <AiFillWarning size={35} style={{ color: 'red', margin: '5px' }} />)}
            onTouchMove={(event) => handleTouchMove(event)}
            onTouchEnd={() => handleTouchEnd('Alerta')} // Agrega esto para manejar el final del toque

          >
            <AiFillWarning size={30} style={{ color: 'red', margin: '5px' }} />
          </div>
        </div>

        <div style={{ top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}>
          <div
            style={{ ...iconContainerStyle, top: `${iconCoords.y}px`, right: `${window.innerWidth - iconCoords.x}px` }}
            draggable
            onDragEndCapture={(event) => handleDrop(event, <TiHome size={35} style={{ color: 'black', margin: '5px' }} />, 'Vivienda')}
            onTouchStart={(event) => handleTouchStart(event, <TiHome size={35} style={{ color: 'black', margin: '5px' }} />)}
            onTouchMove={(event) => handleTouchMove(event)}
            onTouchEnd={() => handleTouchEnd('Vivienda')} // Agrega esto para manejar el final del toque

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
