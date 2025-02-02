import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { postCall } from "../../Helpers/api"; // Helper to make POST requests
import { setCookie } from "../../Helpers/authHelpers"; // Helper to manage cookies
import { config } from "../../config"; // Import config for base URL
import { setToken, setAuthenticated } from "../../Helpers/authHelpers"; // Redux actions for token and authentication
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state
    setError(""); // Reset errors

    if (formData.email) {
      formData.username = formData.email; // Map email to username if needed
      delete formData.email;
    }

    postCall({
      path: config.url.login, // API endpoint
      data: formData, // Login data
      onSuccess: (response) => {
        const { access, refresh } = response.data;

        // Save tokens in cookies
        setCookie("ims_auth_token", access);
        setCookie("ims_refresh_token", refresh);

        // Set tokens in Redux store
        const tokenData = {
          token: access,
          refresh_token: refresh,
          expire_at: Date.now() + (response.data.expires_in * 1000), // Token expiry time
        };
        setToken(tokenData); // Update Redux state
        setAuthenticated(true); // Mark as authenticated

        toast.success(response.data.message || "Login successful");
        navigate("/dashboard"); // Redirect to dashboard after successful login
      },
      onFailure: (error) => {
        const errorMessage =
          error.response?.data?.error || "Incorrect email or password";
        setError(errorMessage); // Show error message
        toast.error(errorMessage);
        setIsLoading(false); // Reset loading state
      },
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="user-login-text">USER LOGIN</div>

        {/* Display error message */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging In..." : "LOG ME IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
