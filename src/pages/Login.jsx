import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import useAuthStore from '../store/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setAuthorized = useAuthStore((state) => state.setAuthorized);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/token/', { username, password });
      const token = res.data.access;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('authorized', 'true');
        setAuthorized(true);
        navigate('/citas');
      } else {
        alert("Login inválido");
      }
    } catch (err) {
      console.error("Error al hacer login", err);
      alert("Login fallido");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Imagen lateral */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/login/login.jpg')" }} />

      {/* Formulario */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Iniciar sesión</h2>

          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? (
                // 👁️ Icono de ojo abierto
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // 🙈 Icono de ojo tachado
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.05 0-9.28-3.07-11-7 1.046-2.494 2.92-4.615 5.25-5.835M15 12a3 3 0 01-3 3M9.88 9.88a3 3 0 014.24 4.24M6.1 6.1l11.8 11.8" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
