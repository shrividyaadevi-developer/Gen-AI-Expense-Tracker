// src/components/AdminLineChart.jsx
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AdminLineChart({ expenses }) {

  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // Extract unique years
  const years = [...new Set(expenses.map(e => new Date(e.date).getFullYear()))];

  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Filter expenses
  const filteredExpenses = expenses.filter(exp => {

    const d = new Date(exp.date);
    const expMonth = monthOrder[d.getMonth()];
    const expYear = d.getFullYear();

    return (
      (selectedMonth === "All" || selectedMonth === expMonth) &&
      (selectedYear === "All" || selectedYear === expYear.toString())
    );

  });

  // Aggregate per month
  const monthlyData = {};
  monthOrder.forEach(m => (monthlyData[m] = 0));

  filteredExpenses.forEach(exp => {
    const d = new Date(exp.date);
    const month = monthOrder[d.getMonth()];
    monthlyData[month] += exp.amount || 0;
  });

  const chartData = {
    labels: monthOrder,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthOrder.map(m => monthlyData[m]),
        borderColor: "rgba(235, 163, 20, 0.83)",
        backgroundColor: "rgba(254, 185, 22, 0.83)",
        fill: true,
        tension: 0.3
      }
    ]
  };

  return (
    <div>

      {/* Filters */}
      <div style={{marginBottom:"20px", display:"flex", gap:"20px", flexWrap:"wrap"}}>

        {/* Year Filter */}
        <div style={{display:"flex", flexDirection:"column"}}>
          <label style={{marginBottom:"5px"}}>Year:</label>
          <select
            value={selectedYear}
            onChange={(e)=>setSelectedYear(e.target.value)}
            style={{
              padding:"8px 12px",
              borderRadius:"6px",
              border:"1px solid #1f1e1e",
              background:"#d2d1d1",
              cursor:"pointer"
            }}
          >
            <option value="All">All</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div style={{display:"flex", flexDirection:"column"}}>
          <label style={{marginBottom:"5px"}}>Month:</label>
          <select
            value={selectedMonth}
            onChange={(e)=>setSelectedMonth(e.target.value)}
            style={{
              padding:"8px 12px",
              borderRadius:"6px",
              border:"1px solid #1f1e1e",
              background:"#d2d1d1",
              cursor:"pointer"
            }}
          >
            <option value="All">All</option>
            {monthOrder.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Line Chart */}
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" }
          }
        }}
      />

    </div>
  );
}

export default AdminLineChart;