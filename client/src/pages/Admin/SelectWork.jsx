import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/adminPage.css";

const SelectWork = () => {
  return (
    <div>
          <div className="container-fluid">
        <div className="row">
          <div className="col-2" id="Emblem"></div>
          <div className="col-10" id="heading">
            <h1 className="heading1 text-white">GRAMA NILADHARI E-CERTIFICATION</h1>
          </div>
        </div>
    </div>
    <div className="NewBody">
        <h1 className="text-white heading2 text-center">Select Corresponding Work</h1>
        <div className="loginbox text-white text-center">
            <button type="button" className="btn btn-dark my-3"><Link to="/admin/DataEnter" >Register Person</Link></button>
            <button type="button" className="btn btn-dark my-3"><Link to="/admin/InstituteReg" >Register Institute</Link></button>
            <button type="button" className="btn btn-dark my-3"><Link to="/admin/CitizenRequest" >Personal Request</Link></button>
            <button type="button" className="btn btn-dark my-3"><Link to="/admin/InstituteRequest" >Institute Request</Link></button>
            <button type="button" className="btn btn-dark my-3"><Link to="/admin" onClick={() => localStorage.removeItem('admin')}>Log out</Link></button>
        </div>
    </div>
    </div>
  )
}

export default SelectWork
