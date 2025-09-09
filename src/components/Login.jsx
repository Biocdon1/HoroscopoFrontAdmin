import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Base común para toda la API
  const apiBase = import.meta.env.VITE_API_URL; // Ej: http://localhost:5000/api

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 🔹 Ruta completa al login
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: contrasena }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión');
    }
  };

  return (
    <div
      style={{
        maxWidth: 300,
        margin: '100px auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
        background: '#020202ff',
        color: '#fff'
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
        )}

        <button type="submit" style={{ width: '100%' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;