import { RouteObject, createBrowserRouter } from "react-router-dom";
import { loginRoutes } from "../modules/login/routes";
import { templateScreens } from "../modules/template/routes";
import { firstScreenRoutes } from "../modules/firstScreen/routes";
import { userGlobalContext } from "../shared/hooks/useGlobalContext";
import { verifyLoggedIn } from "../shared/functions/connection/auth";





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