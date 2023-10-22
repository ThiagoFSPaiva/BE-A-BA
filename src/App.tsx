import { CssBaseline, GlobalStyles} from "@mui/material";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { loginRoutes } from "./modules/login/routes";
import { templateScreens } from "./modules/template/routes";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { getAuthorizationToken, verifyLoggedIn } from "./shared/functions/connection/auth";
import { useEffect } from "react";
import { useRequests } from "./shared/hooks/useRequests";
import { URL_USER } from "./shared/constants/urls";
import { MethodsEnum } from "./shared/enums/methods.enum";
import { useGlobalReducer } from "./store/reducers/globalReducer/useGlobalReducer";

const globalStyles = {
  span: {
    color: "#ccc",
  },
  a: {
    color: "unset",
    textDecoration: "none"
  }
};
const routes: RouteObject[] = [...loginRoutes];
 
 const routesLoggedIn: RouteObject[] = [...templateScreens,...firstScreenRoutes].map((route) => ({
   ...route,
   loader: verifyLoggedIn
 }));

 const router = createBrowserRouter(
   [
     ...routes,...routesLoggedIn
   ]);

function App() {
  
     
  const {setUser} = useGlobalReducer();
  const { request } = useRequests();

 
  useEffect(() => {
    const token = getAuthorizationToken();
    if(token){
      request(URL_USER, MethodsEnum.GET, setUser)

    }

  }, []);



  return (
    <>
    
      <CssBaseline />
      <GlobalStyles styles={globalStyles}/>
      <RouterProvider router={router} />

    </>
  );
}

export default App;

