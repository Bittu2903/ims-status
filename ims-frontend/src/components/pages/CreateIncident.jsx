import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCall } from "../../Helpers/api"; // Import postCall
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { config } from "../../config";
import Header from "../utils/Header";
import { toast } from "react-toastify"; // Import toast

const CreateIncident = () => {
  const [formData, setFormData] = useState({
    reporter_name: "",
    incident_details: "", // Matches payload key
    priority: "Medium",
    status: "Open",
    entity: "Individual", // Default value for entity
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    try {
      await postCall({
        path: config.url.incident, // API endpoint
        data: formData,
        onSuccess: () => {
          toast.success("Incident created successfully"); // Success message
          navigate("/dashboard");
        },
        onFailure: (error) => {
          console.error("Failed to create incident:", error);
          toast.error("Failed to create incident"); // Error message
        },
      });
    } catch (error) {
      console.error("Error in handleCreateIncident:", error);
      toast.error("Failed to create incident"); // Error message
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <form onSubmit={handleCreateIncident}>
          <h2>Create Incident</h2>
          {/* Reporter Name Input */}
          <div className="mb-3">
            <input
              type="text"
              name="reporter_name"
              className="form-control"
              placeholder="Reporter Name"
              value={formData.reporter_name}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Incident Details Input */}
          <div className="mb-3">
            <textarea
              name="incident_details"
              className="form-control"
              placeholder="Incident Details"
              value={formData.incident_details}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          {/* Priority Dropdown */}
          <div className="mb-3">
            <select
              name="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          {/* Status Dropdown */}
          <div className="mb-3">
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Open">Open</option>
              <option value="IN-Progress">In progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          {/* Entity Dropdown */}
          <div className="mb-3">
            <select
              name="entity"
              className="form-select"
              value={formData.entity}
              onChange={handleInputChange}
            >
              <option value="Individual">Individual</option>
              <option value="Government">Government</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIncident;
