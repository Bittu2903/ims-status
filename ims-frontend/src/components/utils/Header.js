import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postCall } from '../../Helpers/api';
import { getCookie, setCookie } from '../../Helpers/authHelpers';
import { config } from '../../config';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = {
        refresh: getCookie('ims_refresh_token'),
      };

      await postCall({
        path: config.url.logout,
        data,
        onSuccess: (response) => {
          toast.success(response.message || "Logout successful");
          setCookie('ims_auth_token', null);
          setCookie('ims_refresh_token', null);
          navigate('/'); // Redirect to login page after logout
        },
        onFailure: (error) => {
          console.error("Logout failed:", error);
          toast.error("Logout failed. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  return (
    <header style={headerStyle}>
      <span onClick={() => navigate('/dashboard')} style={linkStyle}>Home</span>
      <span onClick={handleLogout} style={linkStyle}>Logout</span>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  boxShadow: '0 4px 2px -2px gray',
  maxWidth: '100%',
  margin: '0 auto',
};

const linkStyle = {
  cursor: 'pointer',
  fontSize: '16px',
  color: '#007bff',
  textDecoration: 'none',
  padding: '5px 10px',
};

export default Header;
