import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/adminPage.css";

const SelectWork = () => {
  return (
    <div className="full-bg">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-2" id="Emblem"></div>
          <div className="col-10" id="heading">
            <h1 className="heading1 text-white">GRAMA NILADHARI E-CERTIFICATION</h1>
          </div>
        </div>
      </div>

      {/* Centered section */}
      <div className="center-box">
        <h1 className="text-white heading2 text-center mb-4">Select Corresponding Work</h1>

        <div className="loginbox text-white text-center">
          <Link to="/admin/DataEnter" className="btn btn-dark my-2 w-100">Register Person</Link>
          <Link to="/admin/InstituteReg" className="btn btn-dark my-2 w-100">Register Institute</Link>
          <Link to="/admin/CitizenRequest" className="btn btn-dark my-2 w-100">Personal Request</Link>
          <Link to="/admin/InstituteRequest" className="btn btn-dark my-2 w-100">Institute Request</Link>
          <Link to="/admin" className="btn btn-dark my-2 w-100" onClick={() => localStorage.removeItem('admin')}>
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SelectWork;
