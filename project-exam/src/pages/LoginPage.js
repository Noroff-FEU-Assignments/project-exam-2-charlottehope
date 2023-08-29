import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo/ordinary/logo-eastern-blue.png";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "konnected | Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("/social/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("userProfile", JSON.stringify(data));
        onLogin();
        navigate("/");
      } else {
        const data = await response.json();
        console.error("Error during login:", data.error || response.statusText);
        setErrorMessage(data.error || "Error during login. Try again.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setErrorMessage(`An error occurred during login: ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card border login-card">
        <img
          src={logo}
          alt="konnected logo - Eastern Blue"
          className="card-img-top mx-auto"
        />

        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </div>
            {errorMessage && (
              <div className="mb-3 text-danger">{errorMessage}</div>
            )}{" "}
            <button type="submit" className="btn btn-primary login-btn">
              Log in
            </button>
          </form>
          <p className="mt-3 login-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
