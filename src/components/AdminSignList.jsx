import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerTodosLosSignos } from '../services/api';
import AdminNavBar from '../components/AdminNavBar';
import api from '../services/api'; 

const BACKEND_BASE_URL = api.defaults.baseURL;

const AdminSignList = () => {
  const [signos, setSignos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  obtenerTodosLosSignos()
    .then(res => {
      const ordenados = Object.entries(res).map(([nombre, datos]) => ({
        nombre,
        ...datos
      })).sort((a, b) => a.nombre.localeCompare(b.nombre));
      setSignos(ordenados);
    })
    .catch(err => console.error('Error al cargar signos:', err));
}, []);

  const handleEditar = (signo) => {
    navigate(`/admin/editor?signo=${signo}`);
  };

  return (
    <>
      <AdminNavBar />

      <div
        className="admin-editor-container"
        style={{
          padding: '60px 40px',
          backgroundColor: '#1e1e1e',
          color: '#fff',
          minHeight: '100vh',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{
          marginBottom: '40px',
          fontSize: '2rem',
          textAlign: 'center'
        }}>
          📋 Lista de Signos Zodiacales
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table
            className="admin-table"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '900px'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#333', color: '#fff' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #555', textAlign: 'left' }}>Signo</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #555', textAlign: 'left' }}>Imagen</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #555', textAlign: 'left' }}>Texto predeterminado</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #555', textAlign: 'left' }}>Frases activas</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #555', textAlign: 'left' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {signos.map(signo => (
                <tr key={signo.nombre} style={{ backgroundColor: '#2a2a2a' }}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>
                    {signo.nombre}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>
                    {signo.accesoImagen && signo.imagen ? (
                      <img
                        src={`${BACKEND_BASE_URL}${signo.imagen}`}
                        alt="Imagen"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                    ) : '—'}
                  </td>
                  <td style={{
  padding: '10px',
  borderBottom: '1px solid #444',
  maxWidth: '400px',
  whiteSpace: 'normal',
  wordBreak: 'break-word'
}}>
  {signo.default}
</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>
                    {signo.frases?.filter(f => f.activo).length || 0} activas
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>
                    <button
                      className="admin-button"
                      onClick={() => handleEditar(signo.nombre)}
                      style={{
                        backgroundColor: '#555',
                        color: '#fff',
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                      onMouseOver={e => (e.target.style.backgroundColor = '#777')}
                      onMouseOut={e => (e.target.style.backgroundColor = '#555')}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSignList;