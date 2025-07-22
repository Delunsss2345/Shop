import { useAuthStore } from "@/store/useAuthStore";

import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { userAuth } = useAuthStore();

  if (userAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
