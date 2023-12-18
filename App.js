import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login';
import Register from './Paginas/Register';
import Mapa from './Paginas/Mapa'
//import io from 'socket.io-client';

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
    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  );
};

export default App;
