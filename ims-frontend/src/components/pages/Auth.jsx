import React, { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import { toast } from "react-toastify";
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [isLoading, setIsLoading] = useState(false); // Form submission loading state
  const [error, setError] = useState(""); // To handle errors

  const handleToggle = () => {
    setIsLogin((prevState) => !prevState); // Toggle the login/signup state
  };

  const handleSetError = (errorMessage) => {
    setError(errorMessage);
    console.log(error)
    toast.error(errorMessage); // Display error toast
  };

  return (
    <div className="auth-container">
      <div className="blue-bar"></div> {/* Blue bar */}

      <div className="left-side"></div> {/* Left side placeholder */}

      <div className="right-side">
        <div className="slider-container">
          <div className="slider-options">
            <div
              className={`slider-option ${isLogin ? "active" : ""}`}
              onClick={handleToggle}
            >
              Login
            </div>
            <div
              className={`slider-option ${!isLogin ? "active" : ""}`}
              onClick={handleToggle}
            >
              Signup
            </div>
          </div>
          <div className="slider-bar" style={{ left: isLogin ? "0%" : "50%" }}></div>
        </div>

        <div className="form-container">
          {isLogin ? (
            <>
              <h2>Login</h2>
              <Login setIsLoading={setIsLoading} setError={handleSetError} />
            </>
          ) : (
            <>
              <h2>Signup</h2>
              <Registration 
                setIsLoading={setIsLoading} 
                setError={handleSetError} 
                handleToggle={handleToggle} 
              />
            </>
          )}

          {isLoading && <div className="loading-spinner">Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
