import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css";
import emblem from "../../assets/emblem.png";

const AdminLogin = () => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Header */}
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
        <div className="login-section">
          <h2 className="admin-title">Admin Login</h2>

          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="inputRNumber" className="form-label">
                  <span className="icon">📋</span> Registration No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRNumber"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  required
                  aria-describedby="regNumberHelp"
                />
                <small id="regNumberHelp" className="form-text">
                  Enter your registration number.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword3" className="form-label">
                  <span className="icon">🔒</span> Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-describedby="passwordHelp"
                />
                <small id="passwordHelp" className="form-text">
                  Enter your secure password.
                </small>
              </div>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="signin-link">
              <button
                type="button"
                className="btn-signin"
                onClick={() => (window.location.href = "/admin/adminsignin")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
