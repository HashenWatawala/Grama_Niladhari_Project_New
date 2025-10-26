import React from "react";
import { Link } from "react-router-dom";
import "../../styles/selectWork.css"; // New separate CSS file
import emblem from "../../assets/emblem.png";

const SelectWork = () => {
  return (
    <div className="select-work-page">
      {/* Header Section */}
      <header className="header-container">
        <div
          className="emblem"
          style={{ backgroundImage: `url(${emblem})` }}
          aria-label="Government Emblem"
        ></div>
        <h1 className="heading-text">GRAMA NILADHARI E-CERTIFICATION</h1>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="center-box">
          <h1 className="page-title">Select Corresponding Work</h1>

          <div className="action-card">
            <Link to="/admin/DataEnter" className="action-btn">
              <span className="icon">👤</span> Register Person
            </Link>
            <Link to="/admin/InstituteReg" className="action-btn">
              <span className="icon">🏫</span> Register Institute
            </Link>
            <Link to="/admin/CitizenRequest" className="action-btn">
              <span className="icon">📄</span> Personal Request
            </Link>
            <Link to="/admin/InstituteRequest" className="action-btn">
              <span className="icon">📋</span> Institute Request
            </Link>
            <Link
              to="/admin"
              className="action-btn logout-btn"
              onClick={() => localStorage.removeItem("admin")}
              aria-label="Log out and return to admin login"
            >
              <span className="icon">🚪</span> Log out
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectWork;