import React, { useState } from 'react';
import Servicios from '../Servicios';
import { PropagateLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState({ email: '', password: '' });

  const handleChange = (fieldName: string, value: string) => {
    setInputValues({ ...inputValues, [fieldName]: value });
    // Puedes hacer algo con 'value' o el evento 'e' aquí si es necesario
  };
  

  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      try {
      e.preventDefault();
      setIsLoading(true);
      const resp = await Servicios.login(inputValues.email, inputValues.password);
      console.log("Respuesta del login: ", resp.message);

      if (resp.message === 'OK!!, Email EXISTENTE....!!!') {
        alert("Acceso Concedido....!!!!");
        console.log("Inicio de sesión exitoso");
        //onLogin();
        localStorage.setItem('email', inputValues.email);
        localStorage.setItem('id', resp.id);
        localStorage.setItem('nombre', resp.name);
        navigate('/mapa');
        setIsLoading(true);
        return resp.data;
      } else {
        setIsLoading(false);
        alert(resp.message)
        console.log("Error en la solicitud:" + resp);
        return null;
      }


    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#72bcd4' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%', marginLeft: '25%' }}>
      {isLoading && (
        <div className="spinner-container">
          <PropagateLoader color="#010c0a" />
        </div>
      )}
        <div onClick={() => console.log('Ir a Registro')} style={{ marginBottom: 20 }}>
          <span style={{ fontSize: '24px' }}>Login</span>
        </div>

        <Link to="/register">Registro</Link> {/* Enlace para ir a la pantalla de registro */}


        <div style={{ alignItems: 'center', marginBottom: 20 }}>
          <img src={require('../imagenes/logo.png')} alt="logo" style={{ width: 200, height: 200 }} />
        </div>

        <div style={{ width: '90%', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', border: '1px solid', borderRadius: 5 }}>
            <img src={require('../imagenes/account.png')} alt="icono cuenta" style={{ width: 20, height: 20, margin: 5 }} />
            <input
              name="email"
              value={inputValues.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Email"
              style={{ flex: 1, padding: 10, border: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', border: '1px solid', borderRadius: 5, marginTop: 10 }}>
            <img src={require('../imagenes/password.png')} alt="icono contraseña" style={{ width: 20, height: 20, margin: 5 }} />
            <input
              name="password"
              value={inputValues.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Password"
              type="password"
              style={{ flex: 1, padding: 10, border: 'none' }}
            />
          </div>
        </div>

        <div onClick={(e) => handleSubmit(e)} style={{ width: '100%', backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center', textAlign: 'center' }}>
          <span style={{ color: 'white' }}>Enviar</span>
        </div>

        {/* Otros componentes y elementos aquí */}
      </div>
    </div>
  );
};

export default Login;
