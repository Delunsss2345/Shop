import { configRoutes } from "@/configs/config";
import { Route, Routes } from "react-router-dom";

const renderRoute = ({
  component: Component,
  path,
  provider: Provider,
  children,
}) => {
  let routeChildren = [];
  if (children) {
    routeChildren = children.map((child) => renderRoute(child));
  }
  return (
    <Route
      path={path}
      element={
        Provider ? (
          <Provider>
            <Component />
          </Provider>
        ) : (
          <Component />
        )
      }
    >
      {routeChildren.map((item) => item)}
    </Route>
  );
};

const AppRoutes = () => {
  return <Routes>{configRoutes.map((route) => renderRoute(route))}</Routes>;
};

export default AppRoutes;
