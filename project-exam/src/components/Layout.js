import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, onLogout }) => {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      {children}
    </div>
  );
};

export default Layout;
