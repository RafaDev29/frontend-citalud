import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Citas from '../pages/Citas';
import Pacientes from '../pages/Pacientes';
import Atenciones from '../pages/Atenciones';
import Medicamentos from '../pages/Medicamentos'
import MainLayout from '../layout/MainLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import useAuthStore from '../store/auth';
import Servicios from '../pages/Servicios';

export default function AppRoutes() {
  const authorized = useAuthStore((state) => state.authorized);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/citas" element={<Citas />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/atenciones" element={<Atenciones />} />
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/servicios" element={<Servicios />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={authorized ? '/citas' : '/login'} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
