import { Alert, CssBaseline, GlobalStyles, Snackbar } from "@mui/material";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { loginRoutes } from "./modules/login/routes";
import { gerenciarScreen, templateScreens } from "./modules/template/routes";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { getAuthorizationToken, verifyAdmin, verifyLoggedIn } from "./shared/functions/connection/auth";
import { useEffect } from "react";
import { useRequests } from "./shared/hooks/useRequests";
import { URL_USER } from "./shared/constants/urls";
import { MethodsEnum } from "./shared/enums/methods.enum";
import { useGlobalReducer } from "./store/reducers/globalReducer/useGlobalReducer";
import { dashboardRoute } from "./modules/Dashboard/routes";
import { uploadsScreen } from "./modules/Uploads/routes";
import { usuarioScreen } from "./modules/user/screens/routes";
import { categoryScreens } from "./modules/category/routes";
import { NotificationComponent } from "./shared/hooks/useNotification";



const globalStyles = {
  '.swal-popup': {
    zIndex: '99999',
  },
  span: {
    color: "#ccc",
  },
  a: {
    color: "unset",
    textDecoration: "none"
  }
};

const routes: RouteObject[] = [...loginRoutes];

const routesLoggedIn: RouteObject[] =
  [
    ...templateScreens,
    ...firstScreenRoutes,
  ].map((route) => ({
    ...route,
    loader: verifyLoggedIn
  }));

const routesAdmin: RouteObject[] =
  [
    ...usuarioScreen,
    ...dashboardRoute,
    ...uploadsScreen,
    ...gerenciarScreen,
    ...categoryScreens
  ].map((route) => ({
    ...route,
    loader: verifyAdmin

  }));

const router = createBrowserRouter(
  [
    ...routes, ...routesLoggedIn, ...routesAdmin
  ]);

function App() {

  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      request(URL_USER, MethodsEnum.GET, setUser)
    }

  }, []);

  return (
    <>
      <NotificationComponent />
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <RouterProvider router={router} />

    </>
  );
}

export default App;

