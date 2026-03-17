import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";


function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const register = async () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address (e.g., user@example.com).");
      return;
    }
    if (!password || password.length < 4) {
      alert("Password must be at least 4 characters long.");
      return;
    }

    try {
      await registerUser({ name, email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error.response);
      const msg = error.response?.data?.detail || "Failed to register. Check your details.";
      alert(msg);
    }
  };

    return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url('https://wallpapercave.com/wp/wp9764008.jpg')`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Add style block for placeholder */}
      <style>
        {`
          .authInput::placeholder {
            color: rgba(255, 255, 255, 0.7); /* placeholder color */
          }
        `}
      </style>

      <div
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>Register</h2>

        <input
          className="authInput"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            background: "rgba(0, 0, 0, 0.3)",
            color: "#fff",
          }}
        />

        <input
          className="authInput"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            background: "rgba(0, 0, 0, 0.3)",
            color: "#fff",
          }}
        />

        <input
          className="authInput"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            background: "rgba(0, 0, 0, 0.3)",
            color: "#fff",
          }}
        />

        <button
          onClick={register}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            color: "#ffffff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.6)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.4)")
          }
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;