import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';
import AdminNavBar from '../components/AdminNavBar';
import AriesImg from '../assets/signs/Aries.png';
import TaurusImg from '../assets/signs/Taurus.png';
import GeminiImg from '../assets/signs/Gemini.png';
import CancerImg from '../assets/signs/Cancer.png';
import LeoImg from '../assets/signs/Leo.png';
import VirgoImg from '../assets/signs/Virgo.png';
import LibraImg from '../assets/signs/Libra.png';
import ScorpioImg from '../assets/signs/Scorpio.png';
import SagittariusImg from '../assets/signs/Sagittarius.png';
import CapricornImg from '../assets/signs/Capricorn.png';
import AquariusImg from '../assets/signs/Aquarius.png';
import PiscesImg from '../assets/signs/Pisces.png';
import api from '../services/api'; // ✅ instancia de Axios con baseURL y token

const BACKEND_BASE_URL = api.defaults.baseURL;

const signs = [
  { name: 'aries', label: 'Aries', imageUrl: AriesImg },
  { name: 'taurus', label: 'Tauro', imageUrl: TaurusImg },
  { name: 'gemini', label: 'Géminis', imageUrl: GeminiImg },
  { name: 'cancer', label: 'Cáncer', imageUrl: CancerImg },
  { name: 'leo', label: 'Leo', imageUrl: LeoImg },
  { name: 'virgo', label: 'Virgo', imageUrl: VirgoImg },
  { name: 'libra', label: 'Libra', imageUrl: LibraImg },
  { name: 'scorpio', label: 'Escorpio', imageUrl: ScorpioImg },
  { name: 'sagittarius', label: 'Sagitario', imageUrl: SagittariusImg },
  { name: 'capricorn', label: 'Capricornio', imageUrl: CapricornImg },
  { name: 'aquarius', label: 'Acuario', imageUrl: AquariusImg },
  { name: 'pisces', label: 'Piscis', imageUrl: PiscesImg }
];

const SignCard = ({ name, imageUrl, defaultText, imagen }) => {
  const imagenFinal = imagen ? `${BACKEND_BASE_URL}${imagen}` : null;

  return (
    <div className="sign-card">
      <img src={imageUrl} alt={name} className="sign-image" />
      <p className="sign-name">{name}</p>
      {defaultText && <p className="sign-default">{defaultText}</p>}
      {imagenFinal && (
        <img
          src={imagenFinal}
          alt={`Imagen de ${name}`}
          className="sign-custom-image"
        />
      )}
    </div>
  );
};

const AdminPreview = () => {
  const [horoscopes, setHoroscopes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/signos'); // ✅ usa instancia con token
        setHoroscopes(res.data);
      } catch (err) {
        console.error('Error al cargar horóscopos:', err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <>
      <AdminNavBar />
      <div className="admin-preview-container">
        <h2 className="admin-preview-title">Vista previa del Home del usuario</h2>

        <div className="signs-grid">
          {signs.map(sign => {
            const data = horoscopes[sign.name] || {};
            const fraseActiva = data.frases?.find(f => f.activo);
            return (
              <SignCard
                key={sign.name}
                name={sign.label}
                imageUrl={sign.imageUrl}
                defaultText={fraseActiva?.texto || data.default}
                imagen={data.imagen}
              />
            );
          })}
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default AdminPreview;