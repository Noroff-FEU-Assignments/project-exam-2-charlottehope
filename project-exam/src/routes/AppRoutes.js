import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyProfilePage from "../pages/MyProfilePage";
import ProfilesPage from "../pages/ProfilesPage";

const ProtectedRoute = ({ path, element, isLoggedIn }) => {
  return isLoggedIn ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

const AppRoutes = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute
            path="/profile"
            element={<MyProfilePage onLogout={onLogout} />}
            isLoggedIn={isLoggedIn}
          />
        }
      />
      <Route
        path="/profiles"
        element={
          <ProtectedRoute
            path="/profiles"
            element={<ProfilesPage />}
            isLoggedIn={isLoggedIn}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
