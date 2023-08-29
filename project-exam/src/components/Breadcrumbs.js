import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Breadcrumbs = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFeedClick = () => {
    const documentTitle = document.title;
    const pageTitle = documentTitle.split("|")[1].trim();
    navigate(-1 || "/", { state: { fromTitle: pageTitle } });
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <button
            onClick={handleFeedClick}
            style={{
              cursor: "pointer",
              color: "var(--bs-primary)",
              border: "none",
              background: "none",
              padding: "0",
            }}
          >
            {location.state && location.state.fromTitle
              ? location.state.fromTitle
              : "Back"}
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
