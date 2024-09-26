import { Navigate, RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "../pages/Dashboard";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <Signup />,
  },

  {
    path: "/application",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/application" />,
  },
];

export default routes;
