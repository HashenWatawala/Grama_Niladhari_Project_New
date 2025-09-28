import React, { useState } from "react";
import axios from "axios";
import "../../styles/instituteReg.css";

const InstituteReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regNumber: "",
    passcode: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/institutes", formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error registering institute");
    }
  };

  return (
    <div className="page-container">
      <div className="header row">
        <div className="col-2 emblem"></div>
        <div className="col-10 heading">
          <h1 className="heading-text">GRAMA NILADHARI E-CERTIFICATION</h1>
        </div>
      </div>

      <div className="body-container">
        <h2 className="title">Institute Registration</h2>
        <div className="loginbox">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="name" className="form-label">Institute Name</label>
              <input type="text" className="form-control" id="name"
                value={formData.name} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email"
                value={formData.email} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label htmlFor="regNumber" className="form-label">Institute Registration Number</label>
              <input type="text" className="form-control" id="regNumber"
                value={formData.regNumber} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label htmlFor="passcode" className="form-label">Passcode</label>
              <input type="password" className="form-control" id="passcode"
                value={formData.passcode} onChange={handleChange} />
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
