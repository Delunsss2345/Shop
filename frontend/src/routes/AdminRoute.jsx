import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const authUser = null;
  if (!authUser || authUser.code !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
