import React, { useState } from "react";
import { loginUser } from "../api/auth"; // your API call
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.access_token);
      const payload = JSON.parse(atob(res.access_token.split(".")[1]));
      const role = payload.role;
      if (role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed. Check email or password.");
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
        <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>Login</h2>

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
          onClick={login}
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
          Sign in
        </button>
      </div>
    </div>
  );
}

export default LoginPage;