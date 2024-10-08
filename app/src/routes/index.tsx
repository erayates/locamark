import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import HomePage from "@/pages/home";
import ProtectedRoute from "./protected-route";
import DashboardPage from "@/pages/dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import UsersPage from "@/pages/dashboard/users";
import { Outlet } from "react-router-dom";
import NotFound from "@/not-found";
import GeometriesPage from "@/pages/dashboard/geometries";
import { _getAllUsers } from "@/pages/dashboard/users/actions";
import { _getAllUsersGeometries } from "@/pages/dashboard/geometries/actions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      {
        path: "dashboard",
        element: (
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        ),
        children: [
          { path: "", element: <DashboardPage /> },
          { path: "users", element: <UsersPage />, loader: _getAllUsers },
          {
            path: "geometries",
            element: <GeometriesPage />,
            loader: _getAllUsersGeometries,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
