// =======================================================
// App.js
// Root Application Component
// Features:
// - Dark mode toggle (persisted in localStorage)
// - Layout wrapper
// - Toast notifications
// - Renders LeadForm and LeadList
// =======================================================

import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

import "./crm.css";

function App() {

  // ============================
  // DARK MODE STATE
  // ============================

  const [darkMode, setDarkMode] = useState(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  // ============================
  // APPLY DARK MODE TO BODY
  // ============================

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Save preference
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ============================
  // UI RENDER
  // ============================

  return (
    <div className="dashboard">

      {/* Header Section */}
      <div className="header-bar">
        <div className="title">Mini CRM</div>

        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Section Title */}
      <h2 className="section-title">Dashboard Overview</h2>

      {/* Lead Creation Form */}
      <div className="form-container">
        <LeadForm />
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Lead Management Table */}
      <LeadList />

    </div>
  );
}

export default App;