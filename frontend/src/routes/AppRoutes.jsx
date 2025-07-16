import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/admin/AdminLayout";
import UserPage from "@/pages/UserPage";
import ProductPage from "@/pages/ProductPage";


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/admin/users" element={<UserPage />} />
                <Route path="/admin/products" element={<ProductPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;