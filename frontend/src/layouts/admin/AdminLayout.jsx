import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-white dark:bg-slate-950 transition-all overflow-hidden">
      <SideBar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-6 lg:py-8 space-y-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
