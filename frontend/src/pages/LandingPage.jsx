import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  // Prevent body scroll while on this page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    fontFamily: "Georgia, sans-serif",
    gap: "1rem",
    padding: "2rem",
    margin: 0,
    overflow: "hidden",
    zIndex: 1
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url('https://wallpapercave.com/wp/wp2015308.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "blur(4px)",
    zIndex: -2
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    zIndex: -1
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    zIndex: 2,
    position: "relative"
  };

  const subheadingStyle = {
    fontSize: "1.2rem",
    color: "#e0e7ff",
    marginBottom: "2rem",
    zIndex: 2,
    position: "relative"
  };

  const buttonStyle = {
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "0.5rem",
    transition: "0.3s",
    zIndex: 2,
    position: "relative"
  };

  return (
    <div style={containerStyle}>
      {/* Blurred Background */}
      <div style={backgroundStyle}></div>

      {/* Dark overlay for readability */}
      <div style={overlayStyle}></div>

      <h1 style={headingStyle}>Gen AI Expense Tracker</h1>

      <p style={subheadingStyle}>
        Track your expenses smarter with AI-powered insights and suggestions!
      </p>

      <button
        style={{ ...buttonStyle, backgroundColor: "white", color: "#4f46e5" }}
        onClick={() => navigate("/login")}
      >
        Login
      </button>

      <button
        style={{ ...buttonStyle, backgroundColor: "#ebc52d", color: "#1e293b" }}
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
}

export default LandingPage;
