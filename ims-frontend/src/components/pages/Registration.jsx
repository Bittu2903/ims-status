import React, { useState } from "react";
import { postCall } from "../../Helpers/api";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import { config } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";

const Registration = ({ handleToggle }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    entity: "Individual",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    mobile_number: "",
    fax: "",
    country_code: "+1",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePinChange = async (e) => {
    const pincode = e.target.value;
    setFormData({ ...formData, pincode });

    if (pincode) {
      try {
        const response = await axios.get(`https://api.zippopotam.us/in/${pincode}`);
        const locationData = response.data;

        if (locationData && locationData.places && locationData.places.length > 0) {
          const place = locationData.places[0];
          setFormData((prevData) => ({
            ...prevData,
            city: place['place name'],
            state: place['state'],
            country: place['country'],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch location data:", error);
        setError("Failed to fetch location data. Please check the pincode.");
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        city: "",
        state: "",
        country: "",
      }));
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.warn("Passwords do not match!");
      setError("Passwords do not match!");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobile_number)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    const payload = {
      entity: formData.entity,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      address: formData.address,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      country_code: formData.country_code,
      mobile_number: formData.mobile_number,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    if (formData.fax) {
      payload.fax = formData.fax;
    }

    try {
      await postCall({
        path: config.url.signup,
        data: payload,
        isOpen: true,
        onSuccess: (response) => {
          toast.success(response.data.message || "Registration successful");
          handleToggle();
          navigate("/");
        },
        onFailure: (error) => {
          console.error("Registration failed:", error);
          setError("Registration failed. Please try again.");
          toast.error("Registration failed. A user with this email already exists.");
        },
      });
    } catch (error) {
      console.error("Error in handleRegistration:", error);
      setError("Registration failed. A user with this email already exists.");
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleRegistration} className="registration-form">
        {error && <div className="error-message">{error}</div>}

        <label htmlFor="entity" className="required">
          Individual/Enterprise/Government
        </label>
        <div className="radio-group">
          {["Individual", "Enterprise", "Government"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="entity"
                value={type}
                checked={formData.entity === type}
                onChange={handleInputChange}
                required
              />{" "}
              {type}
            </label>
          ))}
        </div>

        <div className="input-group">
          <div>
            <label htmlFor="first_name" className="required">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="required">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <label htmlFor="email" className="required">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="address" className="required">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />

        <div className="input-group">
          <div>
            <label htmlFor="country" className="required">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="required">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div>
            <label htmlFor="city" className="required">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="pincode" className="required">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handlePinChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div>
            <label htmlFor="phoneCode" className="required">
              Country Code
            </label>
            <select
              name="country_code"
              id="phoneCode"
              value={formData.country_code}
              onChange={handleInputChange}
              required
            >
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              <option value="+44">+44 (UK)</option>
            </select>
          </div>
          <div>
            <label htmlFor="mobile" className="required">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile_number"
              id="mobile"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <label htmlFor="fax">Fax (optional)</label>
        <input
          type="text"
          name="fax"
          id="fax"
          placeholder="Fax"
          value={formData.fax}
          onChange={handleInputChange}
        />

        <label htmlFor="password" className="required">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="confirm_password" className="required">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleInputChange}
          required
        />

        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
