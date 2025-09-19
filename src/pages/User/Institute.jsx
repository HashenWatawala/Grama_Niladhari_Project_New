import React from 'react'
import "../../styles/citizen.css"

const Institute = () => {
  return (
    <div>
      <center><h1 className="text-white my-4">Institute Form</h1></center>
      <div style={{ padding: "10px 10px" }}>
        <div className="container my-2 bg-light py-5" style={{ borderRadius: "30px" }} id="CitizenForm">
          <form className="row g-3 py-1 px-3">
            <div className="col-md-6">
              <label htmlFor="InputRnumber" className="form-label">Institute Registration Number</label>
              <input type="text" className="form-control" id="InputRnumber" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCode" className="form-label">Secrete Code</label>
              <input type="password" className="form-control" id="inputCode" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="InputNIC" className="form-label">Person's NIC Number</label>
              <input type="text" className="form-control" id="InputNIC" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Reason for Applying</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-6 mb-2">
                  <button type="submit" className="btn btn-dark w-100" id="submit">Apply</button>
                </div>
                <div className="col-6 mb-2">
                  <button type="button" className="btn btn-dark w-100">Clear</button>
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
