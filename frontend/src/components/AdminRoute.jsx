import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role === 'admin' ? children : <Navigate to="/" />;
};

export default AdminRoute;
