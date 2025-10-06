import React, { useEffect, useState } from "react";
import axios from "axios";

const CitizenRequest = () => {
  const [requests, setRequests] = useState([]);

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
                  <button className="btn btn-dark">Issue</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitizenRequest;
