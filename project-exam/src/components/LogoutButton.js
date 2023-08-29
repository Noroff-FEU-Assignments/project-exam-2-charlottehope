import React from "react";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <button className="btn btn-secondary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
