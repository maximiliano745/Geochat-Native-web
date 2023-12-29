import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login';
import Register from './Paginas/Register';
import Mapa from './Paginas/Mapa'





const App = () => {

  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
      console.log("Geolocation supported by this browser.");

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
  
    sessionStorage.setItem('lon',newLon );
    sessionStorage.setItem('lat',newLat);
    const storedLon = sessionStorage.getItem('lon');
    const storedLat = sessionStorage.getItem('lat');
    const llon=parseFloat(storedLon);
    const llat=parseFloat(storedLat);
    sessionStorage.setItem('lon',llon);
    sessionStorage.setItem('lat', llat);
    setLon(llon);
    setLat(llat);
    

    
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
    getLocation();
   }, []);


  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mapa" element={<Mapa lon={Number(lon)} lat={Number(lat)} />} />
      </Routes>
    </Router>
  );
};

export default App;
