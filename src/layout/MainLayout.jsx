import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

function MainLayout() {
  const navigate = useNavigate();
  const setAuthorized = useAuthStore((state) => state.setAuthorized);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authorized');
    setAuthorized(false);
    navigate('/login');
  };

  const linkStyle = ({ isActive }) =>
    `px-3 py-2 rounded transition hover:bg-blue-800 ${
      isActive ? 'bg-blue-900 font-semibold' : ''
    }`;

  return (
    <div className="min-h-screen flex text-sm">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Citalud</h2>
          <nav className="flex flex-col gap-2">
            <NavLink to="/pacientes" className={linkStyle}>Pacientes</NavLink>
            <NavLink to="/citas" className={linkStyle}>Citas</NavLink>
            <NavLink to="/atenciones" className={linkStyle}>Atenciones</NavLink>
            <NavLink to="/medicamentos" className={linkStyle}>Medicamentos</NavLink>
            <NavLink to="/servicios" className={linkStyle}>Servicios</NavLink>
          </nav>
        </div>
        <div className="pt-4 border-t border-blue-500">
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-300 hover:text-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
