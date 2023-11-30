import React, { useState } from 'react';

const App = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });

  const handleChange = (fieldName, text) => {
    setInputValues({ ...inputValues, [fieldName]: text });
  };

  const handleSubmit = () => {
    // Lógica para enviar datos o realizar alguna acción al presionar "Enviar"
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#72bcd4' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
        <div onClick={() => console.log('Ir a Registro')} style={{ marginBottom: 20 }}>
          <span style={{ fontSize: '24px' }}>Login</span>
        </div>

        <div style={{ alignItems: 'center', marginBottom: 20 }}>
          <img src={require('./imagenes/logo.png')} alt="logo" style={{ width: 200, height: 200 }} />
        </div>

        <div style={{ width: '100%', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid', borderRadius: 5 }}>
            <img src={require('./imagenes/account.png')} alt="icono cuenta" style={{ width: 20, height: 20, margin: 5 }} />
            <input
              name="email"
              value={inputValues.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="Email"
              style={{ flex: 1, padding: 10, border: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid', borderRadius: 5, marginTop: 10 }}>
            <img src={require('./imagenes/password.png')} alt="icono contraseña" style={{ width: 20, height: 20, margin: 5 }} />
            <input
              name="password"
              value={inputValues.password}
              onChange={e => handleChange('password', e.target.value)}
              placeholder="Password"
              type="password"
              style={{ flex: 1, padding: 10, border: 'none' }}
            />
          </div>
        </div>

        <div onClick={handleSubmit} style={{ width: '100%', backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center', textAlign: 'center' }}>
          <span style={{ color: 'white' }}>Enviar</span>
        </div>

        {/* Otros componentes y elementos aquí */}
      </div>
    </div>
  );
};

export default App;
