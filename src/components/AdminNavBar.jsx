// src/components/AdminNavBar.jsx
import { Link, useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true }); // ✅ redirige al login y evita volver atrás
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
          <Link to="/admin" className="admin-title">🔮 Panel Admin</Link>
</div>


      <div className="admin-navbar-center">
        <Link to="/admin/preview" className="admin-link">Vista previa</Link>
        <Link to="/admin/editor" className="admin-link">Editor</Link>
        <Link to="/admin/signs" className="admin-link">Signos</Link>
      </div>

      <div className="admin-navbar-right">
        <button className="admin-button" onClick={handleLogout}>
          🔓 Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default AdminNavBar;