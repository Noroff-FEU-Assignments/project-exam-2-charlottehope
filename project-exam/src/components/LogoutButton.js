import React from "react";

const LogoutButton = ({ onLogout }) => (
  <button className="btn btn-secondary" onClick={onLogout}>
    Logout
  </button>
);

export default LogoutButton;
