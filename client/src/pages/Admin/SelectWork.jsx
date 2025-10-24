import React from "react";
import { Link } from "react-router-dom";
import "../../styles/adminPage.css";
import emblem from "../../assets/emblem.png";

const SelectWork = () => {
  return (
    <div className="full-bg">
      {/* Header Section */}
      <div className="header-container animate-slide-down">
        <div
          className="emblem"
          style={{
            backgroundImage: `url(${emblem})`,
          }}
        ></div>
        <h1 className="heading1">GRAMA NILADHARI E-CERTIFICATION</h1>
      </div>

      {/* Center Section */}
      <div className="center-box animate-fade-in">
        <h1 className="heading2 text-white mb-4 glow-text">
          Select Corresponding Work
        </h1>

        <div className="loginbox glass-box my-5">
          <Link to="/admin/DataEnter" className="animated-btn">
            Register Person
          </Link>
          <Link to="/admin/InstituteReg" className="animated-btn">
            Register Institute
          </Link>
          <Link to="/admin/CitizenRequest" className="animated-btn">
            Personal Request
          </Link>
          <Link to="/admin/InstituteRequest" className="animated-btn">
            Institute Request
          </Link>
          <Link
            to="/admin"
            className="animated-btn logout-btn"
            onClick={() => localStorage.removeItem("admin")}
          >
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectWork;
