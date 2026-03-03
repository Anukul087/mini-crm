// =======================================================
// LeadList.jsx
// Complete Lead Management Component (Production Ready)
// Features:
// - Fetch leads from backend
// - Search, Sort, Pagination
// - KPI Dashboard with animated counters
// - Inline Edit & Delete
// - Status update
// - Toast notifications
// - Environment-based API configuration
// =======================================================

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardChart from "./DashboardChart";
import AnimatedNumber from "./AnimatedNumber";

/*
  API Base URL:
  - Uses environment variable in production (Vercel)
  - Falls back to localhost during development
*/
const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const API = `${API_BASE}/api/leads`;

function LeadList() {

  // ============================
  // STATE MANAGEMENT
  // ============================

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  // ============================
  // FETCH LEADS
  // ============================

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API);
      setLeads(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch leads");
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // DELETE LEAD
  // ============================

  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Lead deleted successfully");
      fetchLeads();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed");
    }
  };

  // ============================
  // UPDATE STATUS
  // ============================

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API}/${id}`, { status: newStatus });

      // Optimistic UI update
      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        )
      );

      toast.success("Status updated");
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Status update failed");
    }
  };

  // ============================
  // EDIT FUNCTIONS
  // ============================

  const startEditing = (lead) => {
    setEditingId(lead._id);
    setEditData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      notes: lead.notes || ""
    });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API}/${id}`, editData);

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === id ? { ...lead, ...editData } : lead
        )
      );

      toast.success("Lead updated successfully");
      setEditingId(null);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed");
    }
  };

  // ============================
  // SORTING
  // ============================

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // ============================
  // SEARCH FILTER
  // ============================

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.phone?.includes(search)
  );

  // ============================
  // SORT LOGIC
  // ============================

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue)
      return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue)
      return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  // ============================
  // PAGINATION
  // ============================

  const indexOfLast = currentPage * leadsPerPage;
  const indexOfFirst = indexOfLast - leadsPerPage;
  const currentLeads = sortedLeads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedLeads.length / leadsPerPage);

  // ============================
  // KPI CALCULATIONS
  // ============================

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const contactedLeads = leads.filter(l => l.status === "Contacted").length;
  const qualifiedLeads = leads.filter(l => l.status === "Qualified").length;
  const lostLeads = leads.filter(l => l.status === "Lost").length;

  // ============================
  // UI RENDER
  // ============================

  return (
    <div>

      <DashboardChart leads={leads} />

      <div className="stats-row">
        <div className="stat-card"><span>Total</span><strong><AnimatedNumber value={totalLeads} /></strong></div>
        <div className="stat-card"><span>New</span><strong><AnimatedNumber value={newLeads} /></strong></div>
        <div className="stat-card"><span>Contacted</span><strong><AnimatedNumber value={contactedLeads} /></strong></div>
        <div className="stat-card"><span>Qualified</span><strong><AnimatedNumber value={qualifiedLeads} /></strong></div>
        <div className="stat-card"><span>Lost</span><strong><AnimatedNumber value={lostLeads} /></strong></div>
      </div>

      <h2>Lead Management</h2>

      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading leads...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr className="table-header-row">
            <th onClick={() => requestSort("name")}>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th onClick={() => requestSort("status")}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentLeads.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                No leads yet. Add your first lead to begin.
              </td>
            </tr>
          ) : (
            currentLeads.map((lead) => (
              <tr key={lead._id}>
                {editingId === lead._id ? (
                  <>
                    <td><input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /></td>
                    <td><input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} /></td>
                    <td><input value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} /></td>
                    <td>Editing...</td>
                    <td>
                      <button className="btn-save" onClick={() => saveEdit(lead._id)}>Save</button>
                      <button className="btn-delete" onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>
                      <select value={lead.status} onChange={(e) => updateStatus(lead._id, e.target.value)}>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn-edit" onClick={() => startEditing(lead)}>Edit</button>
                      <button className="btn-delete" onClick={() => deleteLead(lead._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
}

export default LeadList;