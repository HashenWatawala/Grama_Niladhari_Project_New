import React, { useEffect, useState } from "react";
import axios from "axios";
import DataEnter from "./DataEnter";

const CitizenRequest = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin?.id) return;

    axios
      .get(`http://localhost:5000/api/citizen/requests/${admin.id}`)
      .then((res) => {
        console.log("Fetched requests:", res.data); // confirm in console
        setRequests(res.data);
      })
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  const handleIssue = async (nicNumber) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/certificates/${nicNumber}`);
      setCertificateData(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching certificate:", err);
      alert("Certificate not found for this NIC.");
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NIC Number</th>
            <th>Reason for applying</th>
            <th>Issuing Certificate</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No requests found
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req._id}>
                <td>{req._id}</td>
                <td>{req.nicNumber}</td>
                <td>{req.reason}</td>
                <td>
                  <button className="btn btn-dark" onClick={() => handleIssue(req.nicNumber)}>Issue</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Certificate Data</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <DataEnter certificateData={certificateData} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => { alert('Certificate Issued!'); setShowModal(false); }}>Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenRequest;
