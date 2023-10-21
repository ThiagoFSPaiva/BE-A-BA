import { CssBaseline, GlobalStyles} from "@mui/material";
import { RouteObject, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import { loginRoutes } from "./modules/login/routes";
import { templateScreens } from "./modules/template/routes";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { verifyLoggedIn } from "./shared/functions/connection/auth";
import { userGlobalContext } from "./shared/hooks/useGlobalContext";

const globalStyles = {
  span: {
    color: "#ccc",
  },
  a: {
    color: "unset",
    textDecoration: "none"
  }
};




function App() {

  const {user,setUser} = userGlobalContext();

  const routes: RouteObject[] = [...loginRoutes];
  
const routesLoggedIn: RouteObject[] = [...templateScreens,...firstScreenRoutes].map((route) => ({
  ...route,
  loader: () => verifyLoggedIn(setUser,user),
}));

const router = createBrowserRouter(
  [
    ...routes,...routesLoggedIn
  ]);

  
  
  return (
    <>
    
      <CssBaseline />
      <GlobalStyles styles={globalStyles}/>
      <RouterProvider router={router} />

    </>
  );
}

export default App
