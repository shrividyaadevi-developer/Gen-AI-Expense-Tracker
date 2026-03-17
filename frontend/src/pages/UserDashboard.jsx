// UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function UserDashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const loadExpenses = async () => {
    try {
      const res = await API.get("/expenses/my-expenses");
      setExpenses(res.data);
    } catch (error) {
      console.log("Expense load error", error);
    }
  };

  const loadProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setProfile(res.data);
    } catch (error) {
      console.log("Profile error", error);
    }
  };

  useEffect(() => {
    loadExpenses();
    loadProfile();
  }, []);

  const toggleSummary = async () => {
    if (showSummary) {
      setShowSummary(false);
    } else {
      if (!summary) {
        try {
          const res = await API.get("/ai/user-summary");
          setSummary(res.data);
        } catch (error) {
          console.log("AI summary error:", error);
        }
      }
      setShowSummary(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  const income = profile?.salary || 0;
  const remaining = income - totalExpense;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflow: "hidden"
      }}
    >

      {/* BLURRED BACKGROUND */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('https://wallpapercave.com/wp/wp2015308.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: -2
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          zIndex: -1
        }}
      />

      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px 30px",
          background: "linear-gradient(135deg, #cba647, #f3a65f)",
          color: "#282828",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <h2 style={{ margin: 0 }}>Expense Tracker</h2>

        <div style={{ position: "absolute", right: "30px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
              background: "#4CAF50",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            Profile
          </button>

          <button
            onClick={logout}
            style={{
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
              background: "#f44336",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight:"bold"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>

        {/* INCOME / EXPENSE CARDS */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          {[
            { title: "Total Income", value: income },
            { title: "Total Expense", value: totalExpense },
            { title: "Remaining Balance", value: remaining },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                flex: "1 1 200px",
                padding: "20px",
                borderRadius: "10px",
                background: "#e6e2e2",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              <h3>{item.title}</h3>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* FORM + LIST */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            width: "100%",
            marginBottom: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ExpenseForm refresh={loadExpenses} />
          <ExpenseList expenses={expenses} refresh={loadExpenses} />
        </div>

        {/* BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "30px" }}>
          <button
            onClick={() => navigate("/analysis")}
            style={{
              padding: "12px 25px",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            View Spending Analysis
          </button>

          <button
            onClick={toggleSummary}
            style={{
              padding: "12px 25px",
              background: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {showSummary ? "Hide Summary" : "Generate AI Summary"}
          </button>
        </div>

        {/* AI SUMMARY */}
        {showSummary && summary && (
          <div
            style={{
              borderRadius: "10px",
              padding: "20px",
              background: "#e6e2e2",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <h3>AI Spending Insights</h3>

            <p><b>Total Spent:</b> {summary.total_spent}</p>
            <p><b>Highest Category:</b> {summary.highest_category}</p>

            <h4>Category Spending</h4>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {Object.entries(summary.category_spent).map(([cat, val]) => (
                <div
                  key={cat}
                  style={{
                    background: "#b1aeae",
                    padding: "10px 15px",
                    borderRadius: "8px",
                  }}
                >
                  <b>{cat}:</b> {val}
                </div>
              ))}
            </div>

            <h4 style={{ marginTop: "20px" }}>AI Suggestions</h4>

            {summary.suggestions.map((s, i) => (
              <p key={i}>"{s}"</p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default UserDashboard;