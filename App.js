import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login';
import Register from './Paginas/Register';
import Mapa from './Paginas/Mapa'





const App = () => {

  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
 
  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          success,
          error,
          options,
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
        console.log("Geolocation supported by this browser.");
      } else {
        console.log("Geolocation is not supported by this browser.");
        // Manejar el caso en que la geolocalización no esté disponible
      }
    }

    function success(pos) {
      const crd = pos.coords;
      const newLat = crd.latitude;
      const newLon = crd.longitude;

      console.log(newLat, newLon);

      setLon(newLon);
      setLat(newLat);

      sessionStorage.setItem('lon', newLon);
      sessionStorage.setItem('lat', newLat);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  
  
    const storedLon = sessionStorage.getItem('lon');
    const storedLat = sessionStorage.getItem('lat');

    if (storedLon && storedLat) {
      setLon(parseFloat(storedLon));
      setLat(parseFloat(storedLat));
    } else {
      getLocation();
    }
  }, []);


  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mapa" element={<Mapa lon={lon} lat={lat} />} />
      </Routes>
    </Router>
  );
};

export default App;
