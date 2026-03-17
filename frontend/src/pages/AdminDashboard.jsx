import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import AdminBarChart from "../components/AdminBarChart";
import AdminLineChart from "../components/AdminLineChart";

function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [aiSummary, setAiSummary] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

  // Load users
  const loadUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Load users error", err);
    }
  };

  // Load expenses
  const loadExpenses = async () => {
    try {
      const res = await API.get("/admin/all-expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log("Load expenses error", err);
    }
  };

  // Toggle AI summary
  const loadAiSummary = async () => {
    if (aiSummary) {
      setAiSummary(null);
      return;
    }

    try {
      const res = await API.get("/ai/admin-summary");
      setAiSummary(res.data);
    } catch (err) {
      console.log("Load AI summary error", err);
    }
  };

  useEffect(() => {
    loadUsers();
    loadExpenses();
  }, []);

  const totalIncome = users.reduce((sum, u) => sum + (u.salary || 0), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remainingBalance = totalIncome - totalExpense;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url('https://wallpapercave.com/wp/wp2015308.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: -2,
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          zIndex: -1,
        }}
      />

      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px 30px",
          background: "linear-gradient(135deg,#cba647,#f3a65f)",
          color: "#000",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>

        <button
          onClick={logout}
          style={{
            position: "absolute",
            right: "30px",
            padding: "8px 15px",
            borderRadius: "6px",
            border: "none",
            background: "#f44336",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto" }}>
        {/* Summary Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              flex: "1 1 220px",
              background: "#e0d9d9",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h3>Total Income</h3>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              {totalIncome}
            </p>
          </div>

          <div
            style={{
              flex: "1 1 220px",
              background: "#e0d9d9",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h3>Total Expense</h3>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              {totalExpense}
            </p>
          </div>

          <div
            style={{
              flex: "1 1 220px",
              background: "#e0d9d9",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h3>Remaining Balance</h3>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              {remainingBalance}
            </p>
          </div>
        </div>

        {/* Charts */}
        {showCharts && (
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                background: "#e0d9d9",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "30px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <h3>Expenses per User</h3>
              <AdminBarChart users={users} expenses={expenses} />
            </div>

            <div
              style={{
                background: "#e0d9d9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <h3>Monthly Expenses Trend</h3>
              <AdminLineChart expenses={expenses} />
            </div>
          </div>
        )}

        {/* Users Table */}
        <div
          style={{
            background: "#e0d9d9",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h3>All Users</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ background: "#d88a8a" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Email</th>
                <th style={{ padding: "10px" }}>Phone</th>
                <th style={{ padding: "10px" }}>Salary</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: "10px", borderTop: "1px solid #2f302d" }}>
                    {u.name}
                  </td>
                  <td style={{ padding: "10px", borderTop: "1px solid #2f302d" }}>
                    {u.email}
                  </td>
                  <td style={{ padding: "10px", borderTop: "1px solid #2f302d" }}>
                    {u.phone}
                  </td>
                  <td style={{ padding: "10px", borderTop: "1px solid #2f302d" }}>
                    {u.salary || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CENTER BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <button
              onClick={loadAiSummary}
              style={{
                padding: "10px 20px",
                background: "#2196F3",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {aiSummary ? "Hide AI Summary" : "Load AI Summary"}
            </button>

            <button
              onClick={() => setShowCharts(!showCharts)}
              style={{
                padding: "10px 20px",
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {showCharts ? "Hide Analysis Report" : "View Analysis Report"}
            </button>
          </div>
        </div>

        {/* AI SUMMARY */}
        {aiSummary && (
          <div
            style={{
              background: "#e0d9d9",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h3>AI Insights</h3>

            <p>
              <b>Highest Spender:</b> {aiSummary.highest_spender}
            </p>

            {aiSummary.suggestions && (
              <ul>
                {aiSummary.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            )}

            {aiSummary.over_limit && aiSummary.over_limit.length > 0 && (
              <p>Users over allowance: {aiSummary.over_limit.join(", ")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;