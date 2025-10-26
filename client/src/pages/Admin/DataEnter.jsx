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
      // Define the form field names that should be populated
      const formFields = [
        'divisionOffice', 'gDivision', 'known', 'knownSince', 'gender', 'age',
        'fullName', 'address', 'civilStatus', 'religion', 'isSriLankan',
        'occupation', 'residentPeriod', 'divisionPeriod', 'nic', 'nicIssueDate',
        'fatherName', 'fatherAddress', 'evidence', 'convicted', 'communityWorks',
        'character', 'otherInfo', 'email', 'electoralRegister'
      ];

      formFields.forEach(key => {
        if (certificateData[key] !== undefined && form.elements[key]) {
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
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-header bg-primary text-white text-center py-4">
                <h1 className="h3 mb-0">Personal Data Form</h1>
                <p className="mb-0">Enter the required details for the certificate</p>
              </div>
              <div className="card-body p-4">
                <form
                  ref={formRef}
                  className="row g-4"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  {/* Administrative Details Section */}
                  <div className="col-12">
                    <h5 className="text-primary mb-3">Administrative Details</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="inputDivisional" className="form-label fw-semibold text-dark">
                          Division and Divisional Office
                        </label>
                        <input
                          name="divisionOffice"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputDivisional"
                          placeholder="Enter division and office"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputGDivision" className="form-label fw-semibold text-dark">
                          Grama Niladhari Division and Number
                        </label>
                        <input
                          name="gDivision"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputGDivision"
                          placeholder="Enter GN division and number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Information Section */}
                  <div className="col-12">
                    <h5 className="text-primary mb-3">Personal Information</h5>
                    <div className="row g-3">
                      <div className="col-md-3">
                        <label htmlFor="inputKnown" className="form-label fw-semibold text-dark">
                          Known to You?
                        </label>
                        <select
                          name="known"
                          id="inputKnown"
                          className="form-select form-select-lg text-dark"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Yes or No</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputTime" className="form-label fw-semibold text-dark">
                          If Yes, Since When?
                        </label>
                        <input
                          name="knownSince"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputTime"
                          placeholder="e.g., 5 years"
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputGender" className="form-label fw-semibold text-dark">
                          Gender
                        </label>
                        <select
                          name="gender"
                          id="inputGender"
                          className="form-select form-select-lg text-dark"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputAge" className="form-label fw-semibold text-dark">
                          Age
                        </label>
                        <input
                          name="age"
                          type="number"
                          className="form-control form-control-lg"
                          id="inputAge"
                          placeholder="Enter age"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputName" className="form-label fw-semibold text-dark">
                          Applicant's Full Name
                        </label>
                        <input
                          name="fullName"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputName"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputAddress" className="form-label fw-semibold text-dark">
                          Applicant's Address
                        </label>
                        <input
                          name="address"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputAddress"
                          placeholder="Enter address"
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputCivil" className="form-label fw-semibold text-dark">
                          Civil Status
                        </label>
                        <select
                          name="civilStatus"
                          id="inputCivil"
                          className="form-select form-select-lg text-dark"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Status</option>
                          <option value="Married">Married</option>
                          <option value="Single">Single</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputReligion" className="form-label fw-semibold text-dark">
                          Religion
                        </label>
                        <select
                          name="religion"
                          id="inputReligion"
                          className="form-select form-select-lg text-dark"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Religion</option>
                          <option value="Buddhism">Buddhism</option>
                          <option value="Islam">Islam</option>
                          <option value="Hinduism">Hinduism</option>
                          <option value="Christianity">Christianity</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputisSriLankan" className="form-label fw-semibold text-dark">
                          Is Sri Lankan?
                        </label>
                        <select
                          name="isSriLankan"
                          id="inputisSriLankan"
                          className="form-select form-select-lg"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Yes or No</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputOccupation" className="form-label fw-semibold text-dark">
                          Present Occupation
                        </label>
                        <input
                          name="occupation"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputOccupation"
                          placeholder="Enter occupation"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Residence and Identification Section */}
                  <div className="col-12">
                    <h5 className="text-primary mb-3">Residence and Identification</h5>
                    <div className="row g-3">
                      <div className="col-md-3">
                        <label htmlFor="inputVillage" className="form-label fw-semibold text-dark">
                          Period of Residence in Village
                        </label>
                        <input
                          name="residentPeriod"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputVillage"
                          placeholder="e.g., 10 years"
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputDivision" className="form-label fw-semibold text-dark">
                          Period of Residence in Division
                        </label>
                        <input
                          name="divisionPeriod"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputDivision"
                          placeholder="e.g., 8 years"
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputNIC" className="form-label fw-semibold text-dark">
                          NIC Number
                        </label>
                        <input
                          name="nic"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputNIC"
                          placeholder="Enter NIC number"
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputIdIssue" className="form-label fw-semibold text-dark">
                          NIC Issue Date
                        </label>
                        <input
                          name="nicIssueDate"
                          type="date"
                          className="form-control form-control-lg"
                          id="inputIdIssue"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Family Information Section */}
                  <div className="col-12">
                    <h5 className="text-primary mb-3">Family Information</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="inputFName" className="form-label fw-semibold text-dark">
                          Father's Name
                        </label>
                        <input
                          name="fatherName"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputFName"
                          placeholder="Enter father's name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputFAddres" className="form-label fw-semibold text-dark">
                          Father's Address
                        </label>
                        <input
                          name="fatherAddress"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputFAddres"
                          placeholder="Enter father's address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Details Section */}
                  <div className="col-12">
                    <h5 className="text-primary mb-3">Additional Details</h5>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="inputEvidance" className="form-label fw-semibold text-dark">
                          Evidence for Residence
                        </label>
                        <input
                          name="evidence"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputEvidance"
                          placeholder="Enter evidence details"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputCovicted" className="form-label fw-semibold text-dark">
                          Convicted by Court of Law?
                        </label>
                        <select
                          name="convicted"
                          id="inputCovicted"
                          className="form-select form-select-lg"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Yes or No</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputEmail" className="form-label fw-semibold text-dark">
                          Applicant's Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="form-control form-control-lg"
                          id="inputEmail"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputWorks" className="form-label fw-semibold text-dark">
                          Community Works
                        </label>
                        <textarea
                          name="communityWorks"
                          className="form-control form-control-lg"
                          id="inputWorks"
                          rows="3"
                          placeholder="Describe community works..."
                        ></textarea>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputElectoral" className="form-label fw-semibold text-dark">
                          Electoral Register Details
                        </label>
                        <input
                          name="electoralRegister"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputElectoral"
                          placeholder="Enter electoral register details"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputCharacter" className="form-label fw-semibold text-dark">
                          His/Her Character
                        </label>
                        <input
                          name="character"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputCharacter"
                          placeholder="Describe character"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputOther" className="form-label fw-semibold text-dark">
                          Other Information
                        </label>
                        <input
                          name="otherInfo"
                          type="text"
                          className="form-control form-control-lg"
                          id="inputOther"
                          placeholder="Enter any other information"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload Section */}
                  <div className="col-12">
                    <h5 className="text-primary mb-3">Uploads</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="inputSignature" className="form-label fw-semibold text-dark">
                          Upload PNG of Signature
                        </label>
                        <input
                          name="signature"
                          type="file"
                          accept="image/png,image/jpeg"
                          className="form-control form-control-lg"
                          id="inputSignature"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-dark my-3 btnMy mx-3">
                      Enter
                    </button>
                    <button type="reset" className="btn btn-dark my-3 btnMy mx-3">
                      Clear
                    </button>
                    <button
                      type="button"
                      className="btn btn-link my-3 mx-3"
                      onClick={() => window.history.back()}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEnter;
