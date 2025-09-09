import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import { obtenerSignoPorNombre, actualizarSignoCompleto } from '../services/api';
import '../styles/Admin.css';
import api from '../services/api'; 

const BACKEND_BASE_URL = api.defaults.baseURL;


const signos = [
  'aries','taurus','gemini','cancer',
  'leo','virgo','libra','scorpio',
  'sagittarius','capricorn','aquarius','pisces'
];

const toAbsolute = (rel) => rel ? `${BACKEND_BASE_URL}${rel}` : '';

const AdminSignEditor = () => {
  const [signoSeleccionado, setSignoSeleccionado] = useState('');
  const [defaultText, setDefaultText] = useState('');
  const [frases, setFrases] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState('');
  const [accesoImagen, setAccesoImagen] = useState(false);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!signoSeleccionado) return;

    obtenerSignoPorNombre(signoSeleccionado, token)
      .then(data => {
        setDefaultText(data?.default || '');
        setFrases(Array.isArray(data?.frases) ? data.frases : []);
        setImagenSeleccionada(typeof data?.imagen === 'string' ? data.imagen : '');
        setAccesoImagen(Boolean(data?.accesoImagen));
      })
      .catch(() => {
        setDefaultText('');
        setFrases([]);
        setImagenSeleccionada('');
        setAccesoImagen(false);
      });
  }, [signoSeleccionado, token]);

  const toggleActivo = idx => {
    setFrases(frases.map((f, i) => ({
      ...f,
      activo: i === idx
    })));
  };

  const updateTexto = (idx, txt) => {
    const copia = [...frases];
    copia[idx].texto = txt;
    setFrases(copia);
  };

  const agregarFrase = () => {
    setFrases([
      ...frases.map(f => ({ ...f, activo: false })),
      { texto: '', activo: true }
    ]);
  };

  const handleGuardar = () => {
    if (!signoSeleccionado) return;

    const payload = {
      default: defaultText,
      frases,
      imagen: imagenSeleccionada,
      accesoImagen
    };

    actualizarSignoCompleto(signoSeleccionado, payload, token)
      .then(() => alert('Signo actualizado correctamente'))
      .catch(err => alert('Error al guardar: ' + err.message));
  };

  return (
    <>
      <AdminNavBar />
      <div className="admin-editor-container">
        <h2>Editor de Signos Zodiacales</h2>

        <label htmlFor="signo-select">Selecciona un signo:</label>
        <select
          id="signo-select"
          className="admin-select"
          value={signoSeleccionado}
          onChange={e => setSignoSeleccionado(e.target.value)}
        >
          <option value="">-- Selecciona --</option>
          {signos.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {signoSeleccionado && (
          <>
            <label htmlFor="default-text">Texto predeterminado:</label>
            <textarea
              id="default-text"
              className="admin-textarea"
              rows={4}
              value={defaultText}
              onChange={e => setDefaultText(e.target.value)}
            />

            <h3>Frases zodiacales:</h3>
            {frases.map((f, i) => (
              <div key={i} className="frase-item">
                <input
                  type="checkbox"
                  checked={f.activo}
                  onChange={() => toggleActivo(i)}
                />
                <input
                  type="text"
                  className="admin-textarea"
                  value={f.texto}
                  onChange={e => updateTexto(i, e.target.value)}
                />
              </div>
            ))}

            <div className="botonera">
              <button onClick={agregarFrase}>+ Agregar nueva frase</button>
              <button
                onClick={() => {
                  setImagenSeleccionada('');
                  setAccesoImagen(false);
                }}
                className="quitar-imagen-btn"
              >
                Quitar imagen
              </button>
              <button onClick={handleGuardar}>Guardar cambios</button>
            </div>

            <h3>Imagen para vista previa:</h3>
            {imagenSeleccionada && accesoImagen && (
              <div className="imagen-preview">
                <p>Imagen seleccionada:</p>
                <img
                  src={toAbsolute(imagenSeleccionada)}
                  alt="Vista previa"
                  className="sign-custom-image"
                />
              </div>
            )}

            <div className="imagen-galeria">
              {Array.from({ length: 12 }, (_, i) => {
                const rel = `/data/imagenes/img-${i + 1}.jpg`;
                const abs = toAbsolute(rel);
                const isSelected = imagenSeleccionada === rel;

                return (
                  <div key={i} className="imagen-item">
                    <button
                      type="button"
                      title={abs}
                      className={`imagen-opcion-btn ${isSelected ? 'seleccionada' : ''}`}
                      onClick={() => {
                        setImagenSeleccionada(rel);
                        setAccesoImagen(true);
                      }}
                    >
                      <img
                        src={abs}
                        alt={`Imagen ${i + 1}`}
                        className="imagen-opcion"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminSignEditor;