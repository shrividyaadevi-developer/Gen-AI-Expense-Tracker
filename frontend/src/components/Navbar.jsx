import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{background:"#222",color:"#fff",padding:"10px"}}>

      <span style={{marginRight:"20px"}}>AI Expense Tracker</span>

      <button onClick={()=>navigate("/profile")}>Profile</button>

      <button onClick={()=>navigate("/dashboard")}>Dashboard</button>

      <button onClick={logout}>Logout</button>

    </div>
  );
}

export default Navbar;