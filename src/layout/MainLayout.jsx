import { Link, Outlet, useNavigate } from 'react-router-dom';
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

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-blue-700 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Citalud</h2>
        <nav className="flex flex-col gap-2">
        <Link to="/pacientes" className="hover:underline">Pacientes</Link>
          <Link to="/citas" className="hover:underline">Citas</Link>
          <Link to="/perfil" className="hover:underline">Perfil</Link>
          <button onClick={handleLogout} className="mt-4 text-red-300 hover:text-red-500 text-left">Cerrar sesión</button>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
