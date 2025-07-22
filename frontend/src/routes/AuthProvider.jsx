import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const { userAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return children;
};

export default AuthProvider;
