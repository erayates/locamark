import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import HomePage from "@/pages/home";
import ProtectedRoute from "./protected-route";
import DashboardPage from "@/pages/dashboard";

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
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
]);
