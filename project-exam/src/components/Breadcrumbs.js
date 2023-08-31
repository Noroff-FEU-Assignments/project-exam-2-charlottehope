import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Breadcrumbs = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromTitle = location.state?.fromTitle || "Back";

  const handleFeedClick = () => {
    const pageTitle = document.title.split("|")[1]?.trim();
    navigate(-1, { state: { fromTitle: pageTitle } });
  };

  const buttonStyle = {
    cursor: "pointer",
    color: "var(--bs-primary)",
    border: "none",
    background: "none",
    padding: "0",
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <button onClick={handleFeedClick} style={buttonStyle}>
            {fromTitle}
          </button>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
