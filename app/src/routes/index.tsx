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
          { path: "", element: <DashboardPage /> }, // Render DashboardPage by default
          { path: "users", element: <UsersPage /> }, // UsersPage as a child route
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
