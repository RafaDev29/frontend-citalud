import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

function PrivateRoute({ children }) {
  const authorized = useAuthStore((state) => state.authorized);
  return authorized ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
