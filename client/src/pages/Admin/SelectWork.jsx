import React from 'react'
import "../../styles/adminPage.css"

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
            <button type="button" className="btn btn-dark my-3"><a href="Forms/DataEnter.html">Register Person</a></button>
            <button type="button" className="btn btn-dark my-3"><a href="Forms/InstituteRegistration.html">Register Institute</a></button>
            <button type="button" className="btn btn-dark my-3"><a href="Tables/Table1.html">Personal Request</a></button>
            <button type="button" className="btn btn-dark my-3"><a href="Tables/Table2.html">Institute Request</a></button>
            <button type="button" className="btn btn-dark my-3"><a href="GramaNiladhariLogin.html">Log out</a></button>
        </div>
    </div>
    </div>
  )
}

export default SelectWork
