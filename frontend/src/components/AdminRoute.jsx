import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.role === 'admin' ? children : <Navigate to="/" />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
