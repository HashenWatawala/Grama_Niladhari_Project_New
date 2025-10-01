import React, { useState } from "react";
import axios from "axios";
import "../../styles/citizen.css";

const Citizen = () => {
  const [nicNumber, setNicNumber] = useState("");
  const [gDivision, setGDivision] = useState("");
  const [reason, setReason] = useState("");

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/citizen/request", {
        nicNumber,
        gDivision,
        reason,
      });
      alert("Request submitted successfully ✅");
      // clear form
      setNicNumber("");
      setGDivision("");
      setReason("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit request ❌");
    }
  };

  // Clear form
  const handleClear = () => {
    setNicNumber("");
    setGDivision("");
    setReason("");
  };

  return (
    <div>
      <center>
        <h1 className="my-4">Citizen Form</h1>
      </center>
      <div style={{ padding: "10px 10px" }}>
        <div
          className="container my-2 bg-light py-5"
          style={{ borderRadius: "30px" }}
          id="CitizenForm"
        >
          <form
            className="row g-3 py-1 px-3 form"
            onSubmit={handleSubmit}
          >
            <div className="col-md-6">
              <label
                htmlFor="InputNIC"
                className="form-label text-dark"
              >
                NIC Number
              </label>
              <input
                type="text"
                className="form-control"
                id="InputNIC"
                value={nicNumber}
                onChange={(e) => setNicNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label
                htmlFor="inputGDivision"
                className="form-label text-dark"
              >
                Division
              </label>
              <input
                name="gDivision"
                type="text"
                className="form-control Division"
                id="inputGDivision"
                value={gDivision}
                onChange={(e) => setGDivision(e.target.value)}
                required
              />
            </div>
            <div className="col-md-8">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label text-dark"
              >
                Reason for Applying
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-6 mb-2">
                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    id="submit"
                  >
                    Apply
                  </button>
                </div>
                <div className="col-6 mb-2">
                  <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="text-center">
                <a
                  href="#"
                  onClick={() => window.history.back()}
                >
                  Back
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Citizen;
