// client/src/pages/DataEnter.jsx
import React, { useRef, useEffect } from "react";
import axios from "axios";
import "../../styles/dataEnter.css";

const DataEnter = ({ certificateData }) => {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(formRef.current);

    try {
      const res = await axios.post("http://localhost:5000/api/certificates", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Saved successfully.");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      alert("Error saving data. See console.");
    }
  };

  useEffect(() => {
    if (certificateData && formRef.current) {
      const form = formRef.current;
      Object.keys(certificateData).forEach(key => {
        if (form.elements[key]) {
          if (key === 'nicIssueDate' && certificateData[key]) {
            form.elements[key].value = new Date(certificateData[key]).toISOString().split('T')[0];
          } else {
            form.elements[key].value = certificateData[key];
          }
        }
      });
    }
  }, [certificateData]);

  return (
    <div>
      <center>
        <h1>Personal Data Form</h1>
      </center>

      <div className="container EnterForm">
        <form
          ref={formRef}
          className="row g-3 container-fluid"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Example: add name attributes for all inputs */}
          <div className="col-md-6">
            <label htmlFor="inputDivisional" className="form-label text-dark">
              Division and divisional office
            </label>
            <input name="divisionOffice" type="text" className="form-control DivisionOffice" id="inputDivisional" />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputGDivision" className="form-label text-dark">
              Grama Niladhari Division and Number
            </label>
            <input name="gDivision" type="text" className="form-control Division" id="inputGDivision" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputKnown" className="form-label text-dark">State</label>
            <select name="known" id="inputKnown" className="form-select" defaultValue="">
              <option value="" disabled>
                Yes or No
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="inputTime" className="form-label text-dark">If so since when</label>
            <input name="knownSince" type="text" className="form-control KnowTime" id="inputTime" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputGender" className="form-label text-dark">Gender</label>
            <select name="gender" id="inputGender" className="form-select Gender" defaultValue="">
              <option value="" disabled>
                Male or Female
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="inputAge" className="form-label text-dark">Age</label>
            <input name="age" type="number" className="form-control Age" id="inputAge" />
          </div>

          <div className="col-3">
            <label htmlFor="inputName" className="form-label text-dark">Applicant's full name</label>
            <input name="fullName" type="text" className="form-control FullName" id="inputName" placeholder="Full name" />
          </div>

          <div className="col-3">
            <label htmlFor="inputAddress" className="form-label text-dark">Applicant's address</label>
            <input name="address" type="text" className="form-control Address" id="inputAddress" placeholder="Address" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputCivil" className="form-label text-dark">Civil status</label>
            <select name="civilStatus" id="inputCivil" className="form-select CivilStatus" defaultValue="">
              <option value="" disabled>
                Married or Single
              </option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="inputReligion" className="form-label text-dark">Religion</label>
            <select name="religion" id="inputReligion" className="form-select Religion" defaultValue="">
              <option value="" disabled>Select religion</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Christianity">Christianity</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="inputisSriLankan" className="form-label text-dark">Is Sri Lankan</label>
            <select name="isSriLankan" id="inputisSriLankan" className="form-select Citizenship" defaultValue="">
              <option value="" disabled>Yes or No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="inputOccupation" className="form-label text-dark">Present Occupation</label>
            <input name="occupation" type="text" className="form-control Occupation" id="inputOccupation" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputVillage" className="form-label text-dark">Period of residence in village</label>
            <input name="residentPeriod" type="text" className="form-control ResidentPeriod" id="inputVillage" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputDivision" className="form-label text-dark">Period of residence in division</label>
            <input name="divisionPeriod" type="text" className="form-control DivisionPeriod" id="inputDivision" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputNIC" className="form-label text-dark">NIC Number</label>
            <input name="nic" type="text" className="form-control NIC" id="inputNIC" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputIdIssue" className="form-label text-dark">NIC Issue date</label>
            <input name="nicIssueDate" type="date" className="form-control NICIssueDate" id="inputIdIssue" />
          </div>

          <div className="col-3">
            <label htmlFor="inputFName" className="form-label text-dark">Father's name</label>
            <input name="fatherName" type="text" className="form-control FatherName" id="inputFName" />
          </div>

          <div className="col-3">
            <label htmlFor="inputFAddres" className="form-label text-dark">Father's address</label>
            <input name="fatherAddress" type="text" className="form-control FatherAddress" id="inputFAddres" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputEvidance" className="form-label text-dark">Evidence for residence</label>
            <input name="evidence" type="text" className="form-control Evidance" id="inputEvidance" />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputCovicted" className="form-label text-dark">Convicted by court of law</label>
            <select name="convicted" id="inputCovicted" className="form-select CourtStatus" defaultValue="">
              <option value="" disabled>Yes or No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="inputWorks" className="form-label text-dark">Community works</label>
            <input name="communityWorks" type="text" className="form-control ComunityWork" id="inputWorks" placeholder="About Community works..." />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputCharacter" className="form-label text-dark">His/Her Character</label>
            <input name="character" type="text" className="form-control Character" id="inputCharacter" />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputOther" className="form-label text-dark">Other Information</label>
            <input name="otherInfo" type="text" className="form-control Other" id="inputOther" />
          </div>

          <div className="col-md-4">
            <label htmlFor="inputEmail" className="form-label text-dark">Applicant's email</label>
            <input name="email" type="email" className="form-control Email" id="inputEmail" />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputElectoral" className="form-label text-dark">Electoral register details</label>
            <input name="electoralRegister" type="text" className="form-control ElectReg" id="inputElectoral" />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputSignature" className="form-label text-dark">Upload png of signature</label>
            <input name="signature" type="file" accept="image/png,image/jpeg" className="form-control Signature" id="inputSignature" />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-dark my-3 btnMy mx-3">Enter</button>
            <button type="reset" className="btn btn-dark my-3 btnMy mx-3">Clear</button>
            <button type="button" className="btn btn-link my-3 mx-3" onClick={() => window.history.back()}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataEnter;
