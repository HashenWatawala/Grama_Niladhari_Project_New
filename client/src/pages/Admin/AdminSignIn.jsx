import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css"; // Uses the existing login.css
import emblem from "../../assets/emblem.png";

const AdminSignIn = () => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gDivision, setGDivision] = useState("");
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added for loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSignature(file);
  };

  return (
    <div className="admin-login-page">
      {/* Header */}
      <header className="header-container">
        <div className="emblem" style={{ backgroundImage: `url(${emblem})` }} aria-label="Government Emblem"></div>
        <h1 className="heading-text">GRAMA NILADHARI E-CERTIFICATION</h1>
      </header>

      {/* Main Content with Background */}
      <main className="main-content">
        <div className="login-section">
          <h2 className="admin-title">Admin Sign In</h2>

          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="inputRNumber" className="form-label">
                  <span className="icon">📋</span> Registration No. <span className="required">*</span>
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
                <small id="regNumberHelp" className="form-text">Enter your official registration number.</small>
              </div>

              <div className="form-group">
                <label htmlFor="inputPassword" className="form-label">
                  <span className="icon">🔒</span> Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-describedby="passwordHelp"
                />
                <small id="passwordHelp" className="form-text">Enter a secure password.</small>
              </div>

              <div className="form-group">
                <label htmlFor="inputGDivision" className="form-label">
                  <span className="icon">🏛️</span> Grama Niladhari Division <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputGDivision"
                  value={gDivision}
                  onChange={(e) => setGDivision(e.target.value)}
                  required
                  aria-describedby="gDivisionHelp"
                />
                <small id="gDivisionHelp" className="form-text">Enter your division name.</small>
              </div>

              <div className="form-group">
                <label htmlFor="inputSignature" className="form-label">
                  <span className="icon">✍️</span> Signature (Image)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputSignature"
                  accept="image/*"
                  onChange={handleFileChange}
                  aria-describedby="signatureHelp"
                />
                <small id="signatureHelp" className="form-text">
                  Upload a clear image of your signature (optional, but recommended).
                  {signature && <span> Selected: {signature.name}</span>}
                </small>
              </div>

              {error && <p className="error-message" role="alert">{error}</p>}

              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSignIn;