import { useAuthStore } from "@/store/useAuthStore";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userAuth } = useAuthStore();

  if (!userAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
