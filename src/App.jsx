import { useEffect } from 'react';
import AppRoutes from './routes';
import useAuthStore from './store/auth';

function App() {
  const setAuthorized = useAuthStore((state) => state.setAuthorized);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authorized = localStorage.getItem('authorized') === 'true';
  
    if (token && authorized) {
      setAuthorized(true);
    }
  }, [setAuthorized]); // ✅ agregado
  

  return <AppRoutes />;
}

export default App;
