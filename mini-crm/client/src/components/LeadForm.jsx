import React, { useState } from "react";
import axios from "axios";

/*
  API Base URL:
  - Uses environment variable in production (Vercel)
  - Falls back to localhost for local development
*/
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const API = `${API_BASE}/api/leads`;

function LeadForm({ onLeadAdded }) {
  // ================= STATE =================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= HANDLE FORM SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Send POST request to backend
      await axios.post(API, formData);

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: ""
      });

      // Notify parent component to refresh leads
      if (onLeadAdded) {
        onLeadAdded();
      }

    } catch (error) {
      console.error("Error adding lead:", error);
      alert("Failed to add lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <div className="form-row">

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="add-lead-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Lead"}
        </button>

      </div>
    </form>
  );
}

export default LeadForm;