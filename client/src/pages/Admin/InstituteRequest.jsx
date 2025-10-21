import React, { useEffect, useState } from "react";
import axios from "axios";
import DataEnter from "./DataEnter";
import emblem from "../../assets/emblem.jpg";
import "../../styles/citizenRequest.css"; // same CSS as CitizenRequest table

const InstituteRequest = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin?.id) return;

    axios
      .get(`http://localhost:5000/api/institutes/requests/${admin.id}`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  const handleIssue = async (nicNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/certificates/${nicNumber}`
      );
      setCertificateData(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching certificate:", err);
      alert("Certificate not found for this NIC.");
    }
  };

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Institute Requests</h2>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Institute Registration Number</th>
              <th>Reason for applying</th>
              <th>NIC Number</th>
              <th>Issuing Certificate</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr className="fade-row">
                <td colSpan={5} className="text-center">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr
                  key={req._id}
                  className="fade-row"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td>{req._id}</td>
                  <td>{req.regNumber}</td>
                  <td>{req.reason}</td>
                  <td>{req.nicNumber}</td>
                  <td>
                    <button
                      className="btn-issue"
                      onClick={() => handleIssue(req.nicNumber)}
                    >
                      Issue Certificate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Keep your original modal as is */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Certificate Data</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <DataEnter certificateData={certificateData} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      await axios.post("http://localhost:5000/api/email/send", {
                        to: certificateData.email,
                        subject: "Your Citizen Certificate",
                        certificateData,
                      });
                      alert("Certificate PDF Sent!");
                      setShowModal(false);
                    } catch (err) {
                      console.error("Error sending email:", err);
                      alert("Failed to send email.");
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteRequest;
