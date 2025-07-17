import AdminLayout from "@/layouts/admin/AdminLayout";
import MainLayout from "@/layouts/main/MainLayout";
import ProductPageAdmin from "@/pages/ProductPageAdmin";

import ProductDetail from "@/components/products/ProductDetail";
import HomePage from "@/pages/HomePage";
import UserPage from "@/pages/UserPage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/admin/users" element={<UserPage />} />
        <Route path="/admin/products" element={<ProductPageAdmin />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
