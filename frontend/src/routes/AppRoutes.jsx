import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/admin/AdminLayout";
import UserPage from "@/pages/UserPage";


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/admin/users" element={<UserPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;