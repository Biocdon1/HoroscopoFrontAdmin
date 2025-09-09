// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AdminPreview from './components/AdminPreview';
import AdminSignEditor from './components/AdminSignEditor';
import AdminSignList from './components/AdminSignList';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const isAuth = Boolean(localStorage.getItem('authToken'));

  return (
    <Routes>
      {/* Ruta raíz: si hay token, va al dashboard; si no, al login */}
      <Route
        path="/"
        element={isAuth ? <Navigate to="/admin/dashboard" replace /> : <Login />}
      />

      {/* Login siempre público */}
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/admin/dashboard" replace /> : <Login />}
      />

      {/* Rutas protegidas */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/preview"
        element={
          <PrivateRoute>
            <AdminPreview />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/editor"
        element={
          <PrivateRoute>
            <AdminSignEditor />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/signs"
        element={
          <PrivateRoute>
            <AdminSignList />
          </PrivateRoute>
        }
      />
<Route
  path="/admin"
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  }
/>
      {/* Cualquier otra ruta → raíz */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;