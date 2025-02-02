import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./components/pages/Auth";
import ForgotPassword from "./components/pages/ForgotPassword";
import IncidentDashboard from "./components/pages/IncidentDashboard";
import CreateIncident from "./components/pages/CreateIncident";
import EditIncident from "./components/pages/EditIncident";
import ViewIncident from "./components/pages/ViewIncidents";
import ErrorPage from "./components/pages/ErrorPage";
import { isAuthenticated } from "./Helpers/authHelpers";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <IncidentDashboard /> : <ErrorPage />}
        />
        <Route
          path="/create-incident"
          element={isAuthenticated() ? <CreateIncident /> : <ErrorPage />}
        />
        <Route
          path="/edit-incident/:id"
          element={isAuthenticated() ? <EditIncident /> : <ErrorPage />}
        />
        <Route
          path="/view-incident/:id"
          element={isAuthenticated() ? <ViewIncident /> : <ErrorPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
