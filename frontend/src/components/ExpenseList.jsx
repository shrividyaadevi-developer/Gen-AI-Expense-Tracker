// ExpenseList.jsx
import React, { useState } from "react";
import API from "../api/api";

function ExpenseList({ expenses, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/delete/${id}`);
    refresh();
  };

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setAmount(exp.amount);
    setCategory(exp.category);
  };

  const updateExpense = async (id) => {
    await API.put(`/expenses/update/${id}`, {
      amount: Number(amount),
      category: category,
    });
    setEditingId(null);
    refresh();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        background: "rgba(255,255,255,0.2)", // frosted look
        padding: "25px",
        borderRadius: "12px",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#282828",
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>My Expenses</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "rgba(255,255,255,0.3)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "12px", background: "rgba(0,0,0,0.05)" }}>Amount</th>
            <th style={{ padding: "12px", background: "rgba(0,0,0,0.05)" }}>Category</th>
            <th style={{ padding: "12px", background: "rgba(0,0,0,0.05)" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              {editingId === exp.id ? (
                <>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "none",
                        outline: "none",
                        width: "90%",
                        background: "rgba(255,255,255,0.3)",
                        color: "#000",
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "none",
                        outline: "none",
                        width: "90%",
                        background: "rgba(255,255,255,0.3)",
                        color: "#000",
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px", display: "flex", justifyContent: "center", gap: "5px" }}>
                    <button
                      onClick={() => updateExpense(exp.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1976D2")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2196F3")}
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: "8px" }}>{exp.amount}</td>
                  <td style={{ padding: "8px" }}>{exp.category}</td>
                  <td style={{ padding: "8px", display: "flex", justifyContent: "center", gap: "5px" }}>
                    <button
                      onClick={() => startEdit(exp)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#FFC107",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFB300")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFC107")}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(exp.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;