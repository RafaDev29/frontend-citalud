import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import useAuthStore from '../store/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setAuthorized = useAuthStore((state) => state.setAuthorized);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/token/', { username, password });

      const token = res.data.access;
      if (token) {
        console.log("Token recibido:", token);

        localStorage.setItem('token', token);
        localStorage.setItem('authorized', 'true'); 
setAuthorized(true);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-2 border mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
