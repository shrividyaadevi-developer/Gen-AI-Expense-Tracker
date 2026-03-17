import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Line } from "react-chartjs-2";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const monthOrder = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  useEffect(() => {
    const loadExpenses = async () => {
      const res = await API.get("/expenses/my-expenses");
      setExpenses(res.data);
    };
    loadExpenses();
  }, []);

  // Get unique years sorted ascending
  const years = [...new Set(expenses.map(e => new Date(e.date).getFullYear()))].sort((a,b) => a - b);

  // Filter expenses
  const filteredExpenses = expenses.filter(exp => {
    const date = new Date(exp.date);
    const year = date.getFullYear();
    const month = date.toLocaleString("default",{month:"short"});

    if(selectedYear !== "All" && year !== Number(selectedYear)) return false;
    if(selectedMonth !== "All" && month !== selectedMonth) return false;

    return true;
  });

  const monthlyTotals = {};
  filteredExpenses.forEach(exp => {
    const month = new Date(exp.date).toLocaleString("default",{month:"short"});
    if(!monthlyTotals[month]) monthlyTotals[month] = 0;
    monthlyTotals[month] += exp.amount;
  });

  const sortedMonths = monthOrder.filter(m => monthlyTotals[m]);

  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Monthly Spending",
        data: sortedMonths.map(m => monthlyTotals[m]),
        borderColor: "#FF5722",   // Line color
        backgroundColor: "rgba(255,87,34,0.2)", // Fill under line
        pointBackgroundColor: "#FF9800", // Points color
        pointBorderColor: "#E64A19",
        tension: 0.4, // smooth curve
        borderWidth: 3,
        pointRadius: 5
      }
    ]
  };

  return (
    <div>
      {/* Filters */}
      <div style={{marginBottom:"20px", display:"flex", gap:"20px", flexWrap:"wrap"}}>
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

      <Line data={data} />
    </div>
  );
}

export default LineChart;