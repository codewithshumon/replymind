/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  const accessibleRoute = token ? children : <Navigate to="/" replace={true} />;
  return accessibleRoute;
};

export default ProtectedRoute;
