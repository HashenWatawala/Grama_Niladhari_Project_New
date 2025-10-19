import React, { useEffect, useState } from "react";
import axios from "axios";
import DataEnter from "./DataEnter";

const InstituteRequest = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin?.id) return;
    axios
      .get(`http://localhost:5000/api/institutes/requests/${admin.id}`)
      .then((res) => {
        console.log("Fetched requests:", res.data); // confirm in console
        setRequests(res.data);
      })
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);
    const handleIssue = async (regNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/certificates/institute/${regNumber}`
        );
        setCertificateData(res.data);
        setShowModal(true);
    } catch (err) {
      console.error("Error fetching certificate:", err);
      alert("Certificate not found for this Registration Number.");
    }
    };
    return (
    <div className="table-container">
      <table className="table">
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
                <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                        No requests found
                    </td>
                </tr>
            ) : (
                requests.map((req) => (
                    <tr key={req._id}>
                        <td>{req._id}</td>
                        <td>{req.regNumber}</td>   
                        <td>{req.reason}</td>
                        <td>{req.nicNumber}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleIssue(req.regNumber)}>
                                Issue Certificate
                            </button>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
      </table>
        {showModal && (
        <DataEnter
            certificateData={certificateData}
            onClose={() => setShowModal(false)}
        />
        )}
    </div>
  );
}
export default InstituteRequest;