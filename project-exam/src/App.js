import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyProfilePage from "./pages/MyProfilePage";
import ProfilesPage from "./pages/ProfilesPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("accessToken");
  };

  const ProtectedRoute = ({ path, element }) => {
    return isLoggedIn ? element : <Navigate to="/login" replace={true} />;
  };

  return (
    <div>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <HomePage /> : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace={true} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              path="/profile"
              element={<MyProfilePage onLogout={handleLogout} />}
            />
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute path="/profiles" element={<ProfilesPage />} />
          }
        />
        <Route path="/profiles/:name" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
