import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State to store the user's email input
  const [message, setMessage] = useState(""); // State to store success message
  const [error, setError] = useState(""); // State to store error message

  // Handle email input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission to send reset password request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgot-password", { email }); // Make API call to send reset email
      setMessage(response.data.message || "Please check your email for further instructions.");
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Failed to send reset email. Please try again."); // Show error if the request fails
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Currently Unavailable</h2>
      <h2>Forgot Password</h2>
      {message && <div className="success-message">{message}</div>} {/* Display success message */}
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <form onSubmit={handleForgotPassword}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Send Reset Link
        </button>
      </form>

      {/* Link back to login page */}
      <div className="back-to-login">
        <Link to="/">Back to Login</Link> {/* Navigate back to login page */}
      </div>
    </div>
  );
};

export default ForgotPassword;
