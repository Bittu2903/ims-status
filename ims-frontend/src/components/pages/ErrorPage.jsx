import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ statusCode, message }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <h1 style={styles.title}>Error {statusCode}</h1>
        <p style={styles.message}>
          {message || "An unexpected error occurred, please refresh and try again."}
        </p>
        <button style={styles.button} onClick={handleRedirect}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  errorBox: {
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
  },
  title: {
    fontSize: '36px',
    color: '#ff4d4d',
  },
  message: {
    fontSize: '16px',
    margin: '10px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ErrorPage;
