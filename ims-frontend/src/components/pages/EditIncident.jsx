import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCall, putCall } from "../../Helpers/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../utils/Header";
import { toast } from "react-toastify";

const EditIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    details: "",
    priority: "Medium",
    status: "Open",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        await getCall({
          path: `/incident/${id}`,
          onSuccess: (response) => {
            if (response.data.incidents?.length > 0) {
              const incident = response.data.incidents[0];
              setFormData({
                details: incident.incident_details,
                priority: incident.priority,
                status: incident.status,
              });
            }
          },
          onFailure: () => toast.error("Failed to fetch incident"),
        });
      } catch {
        toast.error("Failed to fetch incident");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchIncident();
    }
  }, [id, isLoading]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateIncident = async (e) => {
    e.preventDefault();
    try {
      await putCall({
        path: `/incident/${id}`,
        data: { ...formData, incident_details: formData.details },
        onSuccess: () => {
          toast.success("Incident updated successfully");
          navigate("/dashboard");
        },
        onFailure: () => toast.error("Failed to update incident"),
      });
    } catch {
      toast.error("Failed to update incident");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>Edit Incident</h2>
        <form onSubmit={handleUpdateIncident} className="mt-3">
          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Incident Details
            </label>
            <textarea
              name="details"
              id="details"
              className="form-control"
              placeholder="Incident Details"
              value={formData.details}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Open">Open</option>
              <option value="IN-Progress">In progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditIncident;
