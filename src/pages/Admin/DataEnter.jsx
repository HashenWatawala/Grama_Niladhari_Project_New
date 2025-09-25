import React from 'react'
import "../../styles/dataEnter.css"

const DataEnter = () => {
  return (
    <div>
      <center><h1>Personal Data Form</h1></center>
      <div className="container EnterForm">
        <form className="row g-3 container-fluid">
          <div className="col-md-6">
            <label htmlFor="inputDivisional" className="form-label">Division and divisional office</label>
            <input type="text" className="form-control" id="inputDivisional" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputGDivision" className="form-label">Grama Niladhari Division and Number</label>
            <input type="text" className="form-control" id="inputGDivision" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputKnown" className="form-label">State</label>
            <select id="inputKnown" className="form-select">
              <option value="" disabled selected hidden>Yes or No</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputTime" className="form-label">If so since when</label>
            <input type="text" className="form-control" id="inputTime" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputGender" className="form-label">State</label>
            <select id="inputGender" className="form-select">
              <option value="" disabled selected hidden>Male or Female</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputAge" className="form-label">Age</label>
            <input type="number" className="form-control" id="inputAge" />
          </div>
          <div className="col-3">
            <label htmlFor="inputName" className="form-label">Applicant's full name</label>
            <input type="text" className="form-control" id="inputName" placeholder="1234 Main St" />
          </div>
          <div className="col-3">
            <label htmlFor="inputAddress" className="form-label">Applicant's address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputCivil" className="form-label">Civil status</label>
            <select id="inputCivil" className="form-select">
              <option value="" disabled selected hidden>Married or Single</option>
              <option value="1">Married</option>
              <option value="2">Single</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputReligion" className="form-label">Religion</label>
            <select id="inputReligion" className="form-select">
              <option value="" disabled selected hidden>Select religion</option>
              <option value="1">Buddhism</option>
              <option value="2">Islam</option>
              <option value="3">Hinduism</option>
              <option value="4">Christianity</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputisSriLankan" className="form-label">Is Sri Lankan</label>
            <select id="inputisSriLankan" className="form-select">
              <option value="" disabled selected hidden>Yes or No</option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputOccupation" className="form-label">Present Occupation</label>
            <input type="text" className="form-control" id="inputOccupation" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputVillage" className="form-label">Period of residence in village</label>
            <input type="text" className="form-control" id="inputVillage" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputDivision" className="form-label">Period of residence in division</label>
            <input type="text" className="form-control" id="inputDivision" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputNIC" className="form-label">NIC Number</label>
            <input type="text" className="form-control" id="inputNIC" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputIdIssue" className="form-label">NIC Issue date</label>
            <input type="date" className="form-control" id="inputIdIssue" />
          </div>
          <div className="col-3">
            <label htmlFor="inputFName" className="form-label">Father's name</label>
            <input type="text" className="form-control" id="inputFName" placeholder="" />
          </div>
          <div className="col-3">
            <label htmlFor="inputFAddres" className="form-label">Father's address</label>
            <input type="text" className="form-control" id="inputFAddres" placeholder="1234 Main Street" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEvidance" className="form-label">Evidence for residence</label>
            <input type="text" className="form-control" id="inputEvidance" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputCovicted" className="form-label">Convicted by court of law</label>
            <select id="inputCovicted" className="form-select">
              <option value="" disabled selected hidden>Yes or No</option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="inputWorks" className="form-label">Community works</label>
            <input type="text" className="form-control" id="inputWorks" placeholder="About Community works..." />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputCharacter" className="form-label">His/Her Character</label>
            <input type="text" className="form-control" id="inputCharacter" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputOther" className="form-label">Other Information</label>
            <input type="text" className="form-control" id="inputOther" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputEmail" className="form-label">Applicant's email</label>
            <input type="email" className="form-control" id="inputEmail" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputElectoral" className="form-label">Electoral register details</label>
            <input type="text" className="form-control" id="inputElectoral" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputSignature" className="form-label">Upload png of signature</label>
            <input type="file" className="form-control" id="inputSignature" />
          </div>
        </form>
        <button type="submit" className="btn btn-dark my-3 btnMy mx-3">Enter</button>
        <button type="reset" className="btn btn-dark my-3 btnMy mx-3">Clear</button>
        <button type="button" className="btn btn-link my-3 mx-3"><a href="javascript:history.back()">Back</a></button>
      </div>
    </div>
  )
}

export default DataEnter
