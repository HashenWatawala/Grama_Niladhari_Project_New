import React, { useState } from "react";
import axios from "axios";
import '../../styles/login.css';

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
      console.log("Logged-in Admin:", res.data.admin);

      // you can save to localStorage/sessionStorage if needed
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      // redirect to dashboard
      window.location.href = "/admin/SelectWork";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

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
        <h1 className="text-white heading2" style={{ textAlign: "center" }}>
          Grama Niladhari Login
        </h1>
        <div className="loginbox text-white">
          <form onSubmit={handleSubmit}>
            <div className="row mb-5">
              <label htmlFor="inputRNumber" className="col-md-6 col-form-label">
                Registration No.
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputRNumber"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-5">
              <label htmlFor="inputPassword3" className="col-md-6 col-form-label">
                Password
              </label>
              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <button type="submit" className="btn btn-dark d-block mx-auto">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
