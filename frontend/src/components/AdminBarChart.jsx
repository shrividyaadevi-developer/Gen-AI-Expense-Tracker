// src/components/AdminBarChart.jsx
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminBarChart({ users, expenses }) {
  // Compute total expenses per user
  const userExpensesMap = {};
  users.forEach(u => (userExpensesMap[u.email] = 0));
  expenses.forEach(e => {
    if (userExpensesMap[e.user_email] !== undefined) {
      userExpensesMap[e.user_email] += e.amount || 0;
    }
  });

  const chartData = {
    labels: Object.keys(userExpensesMap),
    datasets: [
      {
        label: "Expenses per User",
        data: Object.values(userExpensesMap),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
}

export default AdminBarChart;