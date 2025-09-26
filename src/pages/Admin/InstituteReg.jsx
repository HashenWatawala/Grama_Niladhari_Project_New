import React from 'react';
import "../../styles/instituteReg.css";

const InstituteReg = () => {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="header row">
        <div className="col-2 emblem"></div>
        <div className="col-10 heading">
          <h1 className="heading-text">GRAMA NILADHARI E-CERTIFICATION</h1>
        </div>
      </div>

      {/* Main Body */}
      <div className="body-container">
        <h2 className="title">Institute Registration</h2>
        <div className="loginbox">
          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="inputName" className="form-label">Institute Name</label>
              <input type="text" className="form-control" id="inputName" />
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail" />
            </div>
            <div className="col-12">
              <label htmlFor="inputReg" className="form-label">Institute registration number</label>
              <input type="text" className="form-control" id="inputReg" />
            </div>
            <div className="col-12">
              <label htmlFor="inputPass" className="form-label">Passcode</label>
              <input type="password" className="form-control" id="inputPass" />
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-dark btnMy">Enter</button>
              <button type="reset" className="btn btn-dark btnMy">Clear</button>
              <a href="javascript:history.back()" className="btn btn-link back-link">Back</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstituteReg;
