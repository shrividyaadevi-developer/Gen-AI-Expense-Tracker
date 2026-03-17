import React, { useState } from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { useNavigate } from "react-router-dom";

function AnalyticsPage() {
  const navigate = useNavigate();

  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");

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
          background: "rgba(0,0,0,0.35)",
          zIndex: -1
        }}
      />

      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: "linear-gradient(135deg, #cba647, #f3a65f)",
          color: "#000",
          padding: "15px 30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ margin: 0 }}>Spending Analysis</h2>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            position: "absolute",
            right: "30px",
            padding: "8px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
        >
          Dashboard
        </button>
      </div>

      {/* Charts */}
      <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>

        {/* Bar Chart */}
        <div
          style={{
            background: "#d2d1d1",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}
        >
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            Category Wise Spending
          </h3>

          <BarChart year={year} month={month} />
        </div>

        {/* Line Chart */}
        <div
          style={{
            background: "#d2d1d1",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}
        >
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            Monthly Spending Trend
          </h3>

          <LineChart year={year} month={month} />
        </div>

      </div>
    </div>
  );
}

export default AnalyticsPage;