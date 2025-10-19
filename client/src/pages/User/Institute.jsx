import React from 'react'
import axios from "axios";
import "../../styles/citizen.css"

const Institute = () => {
  const [regNumber, setRegNumber] = React.useState("");
  const [secretCode, setSecretCode] = React.useState("");
  const [nicNumber, setNicNumber] = React.useState("");
  const [gDivision, setGDivision] = React.useState("");
  const [reason, setReason] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/institutes/request", {
        regNumber,
        secretCode,
        nicNumber,
        gDivision,
        reason,
      });
      alert("Request submitted successfully ✅");
      // clear form
      setRegNumber("");
      setSecretCode("");
      setNicNumber("");
      setGDivision("");
      setReason("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit request ❌");
    }
  };
  const handleClear = () => {
    setRegNumber("");
    setSecretCode("");
    setNicNumber("");
    setGDivision("");
    setReason("");
  };

  return (
    <div>
      <center><h1 className="my-4">Institute Form</h1></center>
      <div style={{ padding: "10px 10px" }}>
        <div className="container my-2 bg-light py-5" style={{ borderRadius: "30px" }} id="CitizenForm">
          <form className="row g-3 py-1 px-3 te"
            onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="InputRnumber" className="form-label text-dark">Institute Registration Number</label>
              <input 
              type="text" 
              className="form-control"
              id="regNumber"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCode" className="form-label text-dark">Secrete Code</label>
              <input
              type="password"
              className="form-control"
              id="secretCode"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              required />
            </div>
            <div className="col-md-6">
              <label htmlFor="InputNIC" className="form-label text-dark">Person's NIC Number</label>
              <input
              type="text"
              className="form-control"
              id="nicNumber"
              value={nicNumber}
              onChange={(e) => setNicNumber(e.target.value)} 
              required />
            </div>
            <div className="col-md-6">
              <label htmlFor="InputNIC" className="form-label text-dark">Division</label>
              <input
              type="text"
              className="form-control"
              id="gDivision"
              value={gDivision}
              onChange={(e) => setGDivision(e.target.value)}
              required />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleFormControlTextarea1" className="form-label text-dark">Reason for Applying</label>
              <textarea
              className="form-control"
              id="reason"
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              ></textarea>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-6 mb-2">
                  <button type="submit" className="btn btn-dark w-100" id="submit">Apply</button>
                </div>
                <div className="col-6 mb-2">
                  <button
                  type="button"
                  className="btn btn-dark w-100"
                  onClick={handleClear}>Clear</button>
                </div>
              </div>
              <div className="text-center">
                <a href="#" onClick={() => window.history.back()}>Back</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Institute
