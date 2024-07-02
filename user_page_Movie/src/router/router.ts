import { createBrowserRouter } from "react-router-dom";
import mainRoute from "./mainroute";
import authRoute from "./authroute";

const initRoutes = () => {
  const routes: object[] = [];
  authRoute(routes);
  mainRoute(routes);
  return routes;
};

const appRoutes = initRoutes();

const router = createBrowserRouter(appRoutes);

export default router;
