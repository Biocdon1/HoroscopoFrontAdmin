import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/AdminNavBar';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminNavBar />

      <div className="admin-dashboard-container">
        <div className="admin-dashboard-content">
          <h1 className="admin-title">🛠 Página Dev</h1>
          <p className="admin-subtitle">Este panel te permite:</p>

          <ul className="admin-menu-list">
            <li onClick={() => navigate('/admin/preview')}>
              Ver vista previa
            </li>
            <li onClick={() => navigate('/admin/editor')}>
              ✏️ Editar texto zodiacal
            </li>
            <li onClick={() => navigate('/admin/signs')}>
              📝 Gestionar lista de signos
            </li>
            <li onClick={() => navigate('/admin/users')}>
              👥 Administrar usuarios
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;