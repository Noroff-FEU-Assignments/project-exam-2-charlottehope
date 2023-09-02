import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyProfilePage from "../pages/MyProfilePage";
import ProfilesPage from "../pages/ProfilesPage";

const AppRoutes = ({ onLogin, onLogout }) => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profile" element={<MyProfilePage onLogout={onLogout} />} />
    <Route path="/profiles" element={<ProfilesPage />} />
  </Routes>
);

export default AppRoutes;
