import AdminLayout from "@/layouts/admin/AdminLayout";
import MainLayout from "@/layouts/main/MainLayout";
import ProductPageAdmin from "@/pages/ProductPageAdmin";

import ProductDetail from "@/components/products/ProductDetail";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import SignUpPage from "@/pages/SignUpPage";
import UserPage from "@/pages/UserPage";
import AdminRoute from "@/routes/AdminRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import PublicRoute from "@/routes/PublicRoute";

export const configRoutes = [
  {
    component: LoginPage,
    path: "/login",
    provider: PublicRoute,
  },
  {
    component: SignUpPage,
    path: "/signup",
    provider: PublicRoute,
  },
  {
    component: MainLayout,
    children: [
      {
        component: HomePage,
        path: "/",
      },
      {
        component: CheckoutPage,
        path: "/checkout",
      },
      {
        component: ProductDetail,
        path: "/product/:id",
      },
      {
        component: CartPage,
        path: "/cart",
        provider: PrivateRoute,
      },
    ],
  },
  {
    component: ProfilePage,
    path: "/profile",
    provider: PrivateRoute,
  },
  {
    component: AdminLayout,
    provider: AdminRoute,
    children: [
      {
        component: UserPage,
        path: "/admin/users",
      },
      {
        component: ProductPageAdmin,
        path: "/admin/products",
      },
    ],
  },
];
