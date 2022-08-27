import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useAuth } from "./lib/auth-context";

const LoginPage = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/Home"));

export default function AppRoutes(): JSX.Element {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
