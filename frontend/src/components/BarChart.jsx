import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      const res = await API.get("/expenses/my-expenses");
      setExpenses(res.data);
    };
    loadExpenses();
  }, []);

  const categoryTotals = {};
  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0;
    categoryTotals[exp.category] += exp.amount;
  });

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8BC34A",
    "#E91E63",
    "#00BCD4",
    "#FFC107"
  ];

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Category",
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map((_, idx) => colors[idx % colors.length]),
        borderColor: "#d2d1d1",
        borderWidth: 2,
        hoverBackgroundColor: Object.keys(categoryTotals).map((_, idx) => colors[idx % colors.length] + "cc"), // slightly transparent on hover
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
          color: "#333"
        }
      },
      title: {
        display: true,
        text: "Spending by Category",
        font: { size: 18 },
        color: "#111"
      },
      tooltip: {
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 6
      }
    },
    scales: {
      x: {
        ticks: { color: "#333", font: { size: 14 } },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#333", font: { size: 14 }, beginAtZero: true },
        grid: { color: "#eee" }
      }
    }
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;