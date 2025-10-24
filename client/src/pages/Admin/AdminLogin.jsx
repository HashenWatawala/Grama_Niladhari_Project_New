import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css";
import emblem from "../../assets/emblem.png";

const AdminLogin = () => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        Registration_Number: regNumber,
        Password: password,
      });

      alert(res.data.message);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      window.location.href = "/admin/SelectWork";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          <h2 className="admin-title animate-fade-down">Admin Login</h2>

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
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="inputPassword3" className="form-label text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control input-style"
                  id="inputPassword3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

export default AdminLogin;
