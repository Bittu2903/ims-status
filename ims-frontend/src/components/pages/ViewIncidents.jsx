import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCall } from "../../Helpers/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../utils/Header";

const ViewIncident = () => {
  const { id } = useParams(); // Get the incident ID from the route
  const [incident, setIncident] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getCall({
      path: `/incident/${id}`, 
      onSuccess: (response) => {
        if (response.data.incidents && response.data.incidents.length > 0) {
          const incidentData = response.data.incidents[0];
          setIncident(incidentData);
        } else {
          setError("Incident not found.");
        }
      },
      onFailure: (error) => {
        console.error("Error fetching incident details:", error);
        setError("Failed to load incident details.");
      },
    });
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!incident) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4">Incident Details</h1>

        <div className="card">
          <div className="card-header">
            <h4>Incident ID: {incident.incident_id}</h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Reporter Name</th>
                  <td>{incident.reporter_name}</td>
                </tr>
                <tr>
                  <th>Priority</th>
                  <td>
                    <span
                      className={`badge bg-${
                        incident.priority === "High"
                          ? "danger"
                          : incident.priority === "Medium"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {incident.priority}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span
                      className={`badge bg-${
                        incident.status === "Closed" ? "secondary" : "primary"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Entity</th>
                  <td>{incident.entity}</td>
                </tr>
                <tr>
                  <th>Reported Date</th>
                  <td>{new Date(incident.reported_date).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Incident Details</th>
                  <td>{incident.incident_details}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted">
            User ID: {incident.user_id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewIncident;
