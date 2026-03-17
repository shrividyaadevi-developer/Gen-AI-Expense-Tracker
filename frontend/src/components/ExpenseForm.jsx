// ExpenseForm.jsx
import React, { useState } from "react";
import API from "../api/api";

function ExpenseForm({ refresh }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const submitExpense = async () => {
    if (!amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/expenses/add", {
        amount: Number(amount),
        category: category,
        description: description,
        date: date,
      });

      // clear form
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");

      // reload dashboard
      refresh();
    } catch (error) {
      console.log("Expense error:", error.response);
      alert("Failed to add expense");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      background: "rgba(255,255,255,0.2)",  // frosted look
      padding: "25px",
      borderRadius: "12px",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "#282828",
      maxWidth: "500px",
      margin: "0 auto",
      textAlign: "center"
    }}>
      <h3 style={{ marginBottom: "10px" }}>Add Expense</h3>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          background: "rgba(255,255,255,0.3)",
          color: "#000000"
        }}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          background: "rgba(255,255,255,0.3)",
          color: "#000000"
        }}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          background: "rgba(255,255,255,0.3)",
          color: "#000000"
        }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          background: "rgba(255,255,255,0.3)",
          color: "#000000"
        }}
      />

      <button
        onClick={submitExpense}
        style={{
          padding: "12px 25px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2196F3",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1976D2")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2196F3")}
      >
        Add Expense
      </button>
    </div>
  );
}

export default ExpenseForm;