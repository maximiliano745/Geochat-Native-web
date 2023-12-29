import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login';
import Register from './Paginas/Register';
import Mapa from './Paginas/Mapa'


// useEffect(() => {
//     const socket = io(`wss://geochat-efn9.onrender.com/api/v2/users/join?roomID=${roomID}`); // Coloca la URL de tu servidor de WebSockets

//     const clientId = 'ID-del-cliente'; // Aquí colocarías el ID del cliente de la aplicación nativa

//     // Escuchar un evento específico desde la aplicación web
//     socket.on('evento-desde-aplicacion-web', (data) => {
//       // Verificar si el ID recibido coincide con el ID del cliente de la aplicación nativa
//       if (data.clientId === clientId) {
//         // Realizar acciones específicas en la aplicación nativa cuando se recibe el evento
//         console.log('Evento recibido desde la aplicación web:', data);
//         // Ejecutar la lógica correspondiente, como unir al usuario a una sala de chat
//         // o realizar otras acciones necesarias.
//       }
//     });

//     return () => {
//       // Desconectar el socket al desmontar el componente
//       socket.disconnect();
//     };
//   }, []);





const App = () => {

  
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Manejar el caso en que la geolocalización no esté disponible
    }
  }
  

  const success = (pos) => {
    const crd = pos.coords;
    const newLat = parseFloat(`${crd.latitude}`);
    const newLon = parseFloat(`${crd.longitude}`);

    console.log(newLat, newLon);

    setLon(newLon);
    setLat(newLat);

    sessionStorage.setItem('lon', newLon.toString());
    sessionStorage.setItem('lat', newLat.toString());
  };

  function error(err) {
    console.warn(`ERROR: ${err}`);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  useEffect(() => {
    if (lon === null || lat === null) {
      getLocation();
    }
  }, [lon, lat]);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mapa" element={<Mapa lon={Number(lon)} lat={Number(lat)} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
