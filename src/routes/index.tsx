import { RouteObject, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import LoginPage from "../modules/login/screens/LoginPage";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../modules/Dashboard/screens/DashboardPage";
import Templates from "../modules/template/screens/TemplatesPage";
import { UploadsPage } from "../modules/Uploads/screens/UploadsPage";
import { GerenciarTemplatesPage } from "../modules/template/screens/GerenciarTemplatesPage";
import { UsuariosPage } from "../modules/user/screens/UsuariosPage";
import { loginRoutes } from "../modules/login/routes";
import { mainRoutes } from "../modules/Dashboard/routes";



export const router = createBrowserRouter(
  [
    ...mainRoutes, 
    ...loginRoutes,
  ]);

// export const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <div>Pagina não encontrada</div>,
//     children: [
//       {
//         path: "/",
//         element: <LoginPage />,
//       },
//       {
//         element: <MainLayout />,
//         children: [
//           {
//             path: "dashboard",
//             element: <DashboardPage />
//           },
//         ]
//       },
//       {
//         element: <MainLayout />,
//         children: [
//           {
//             path: "templates",
//             element: <Templates />
//           }
//         ]
//       },
//       {
//         element: <MainLayout />,
//         children: [
//           {
//             path: "uploads",
//             element: <UploadsPage />
//           }
//         ]
//       },
//       {
//         element: <MainLayout />,
//         children: [
//           {
//             path: "gerenciar-templates",
//             element: <GerenciarTemplatesPage />
//           }
//         ]
//       },
//       {
//         element: <MainLayout />,
//         children: [
//           {
//             path: "usuarios",
//             element: <UsuariosPage />
//           }
//         ]
//       }

//     ]
//   }
// ]);