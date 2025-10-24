import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/instituteReg.css";
import emblem from "../../assets/emblem.png";

const InstituteReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regNumber: "",
    passcode: "",
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);
  }, []);

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
      {/* Header */}
      <header className="header fade-in">
        <div
          className="emblem"
          style={{ backgroundImage: `url(${emblem})` }}
        ></div>
        <h1 className="heading-text">GRAMA NILADHARI E-CERTIFICATION</h1>
      </header>

      {/* Form Section */}
      <main className={`body-container ${animate ? "slide-up" : ""}`}>
        <div className="glass-card">
          <h2 className="form-title">Institute Registration</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Institute Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="regNumber">Institute Registration Number</label>
              <input
                type="text"
                id="regNumber"
                className="form-control"
                value={formData.regNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="passcode">Passcode</label>
              <input
                type="password"
                id="passcode"
                className="form-control"
                value={formData.passcode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-enter">Enter</button>
              <button type="reset" className="btn btn-clear">Clear</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InstituteReg;
