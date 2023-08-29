import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo/ordinary/logo-eastern-blue.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "konnected | Register";
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("/social/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage(
          "Registered successfully. Redirecting to login page..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const data = await response.json();
        console.error("Error during registration:", data.errors[0].message);
        setErrorMessage("Error during registration. Try again.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      setErrorMessage(
        `An error occurred during registration: ${error.message}`
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <div className="card border register-card">
        <img
          src={logo}
          alt="konnected logo - Eastern Blue"
          className="card-img-top mx-auto"
        />

        <div className="card-body">
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
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
            )}
            {successMessage && (
              <div className="mb-3 text-primary">{successMessage}</div>
            )}
            <button type="submit" className="btn btn-primary login-btn">
              Register
            </button>
          </form>
          <p className="mt-3 login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="text-center mt-3 register-disclaimer">
        <p className="p2">
          By signing up, you agree to our Terms and have read and acknowledged
          our Global Privacy Statement.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
