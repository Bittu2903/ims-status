import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCall } from "../../Helpers/api"; // Import getCall
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import Header from "../utils/Header";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchIncidents = () => {
      getCall({
        path: "/incident", // Adjust the path to match your API endpoint
        onSuccess: (response) => {
          // Access the incidents array from the response
          if (Array.isArray(response.data.incidents)) {
            setIncidents(response.data.incidents);
          } else {
            console.error(
              "Expected an array but got:",
              response.data.incidents
            );
          }
        },
        onFailure: (error) => {
          console.error("Failed to fetch incidents:", error);
        },
      });
    };
    fetchIncidents();
  }, []);

  const filteredIncidents = incidents.filter((incident) =>
    incident.incident_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4">Incident Dashboard</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Incident ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link to="/create-incident" className="mb-3">
          <button className="btn btn-primary">Create Incident</button>
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Incident ID</th>
              <th>Reporter</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((incident) => (
              <tr key={incident.incident_id}>
                <td>{incident.incident_id}</td>
                <td>{incident.reporter_name}</td>
                <td>{incident.status}</td>
                <td>{incident.priority}</td>
                <td>
                <div className="d-flex">
                    <Link to={`/view-incident/${incident.incident_id}`} className="mr-1">
                      <button className="btn btn-info d-flex align-items-center">
                        <VisibilityIcon className="mr-1" />
                        View
                      </button>
                    </Link>
                    <Link to={`/edit-incident/${incident.incident_id}`} className="mr-1">
                      <button className="btn btn-warning d-flex align-items-center">
                        <EditIcon className="mr-1" />
                        Edit
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentDashboard;
