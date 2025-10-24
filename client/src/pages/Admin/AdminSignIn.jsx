import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css";
import emblem from "../../assets/emblem.png";

const AdminSignIn = () => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gDivision, setGDivision] = useState("");
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Registration_Number", regNumber);
    formData.append("Password", password);
    formData.append("gDivision", gDivision);
    if (signature) {
      formData.append("signature", signature);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/admin/adminSignIn", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      window.location.href = "/admin/login";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="admin-login-page">
      {/* Header */}
      <div className="header-container">
        <div className="emblem" style={{ backgroundImage: `url(${emblem})` }}></div>
        <h1 className="heading-text">GRAMA NILADHARI E-CERTIFICATION</h1>
      </div>

      {/* Background */}
      <div className="background">
        <div className="login-section">
          <h2 className="admin-title animate-fade-down">Admin Sign In</h2>

          <div className="login-card animate-fade-up">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="inputRNumber" className="form-label text-white">
                  Registration No.
                </label>
                <input
                  type="text"
                  className="form-control input-style"
                  id="inputRNumber"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="inputPassword" className="form-label text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control input-style"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="inputGDivision" className="form-label text-white">
                  Grama Niladhari Division
                </label>
                <input
                  type="text"
                  className="form-control input-style"
                  id="inputGDivision"
                  value={gDivision}
                  onChange={(e) => setGDivision(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="inputSignature" className="form-label text-white">
                  Signature (Image)
                </label>
                <input
                  type="file"
                  className="form-control input-style"
                  id="inputSignature"
                  accept="image/*"
                  onChange={(e) => setSignature(e.target.files[0])}
                />
              </div>

              {error && <p className="text-danger text-center">{error}</p>}

              <button type="submit" className="btn-login">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
