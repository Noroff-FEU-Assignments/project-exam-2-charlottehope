import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo/ordinary/logo-azure.png";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="konnected Logo - Azure" height="25" />
        </Link>
        <div className="d-flex">
          <Link className="nav-link me-3" to="/profiles">
            <FontAwesomeIcon className="nav-icon" icon={faUsers} />
          </Link>
          <Link className="nav-link me-3" to="/profile">
            <FontAwesomeIcon className="nav-icon" icon={faUser} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
