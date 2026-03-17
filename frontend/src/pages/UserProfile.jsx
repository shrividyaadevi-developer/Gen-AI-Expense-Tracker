import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function UserProfile() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");

  const loadProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setProfile(res.data);
      setName(res.data.name || "");
      setPhone(res.data.phone || "");
      setSalary(res.data.salary || 0);

    } catch (error) {
      console.log("Profile load error", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateProfile = async () => {

    if (!salary || Number(salary) <= 0) {
      alert("Please enter your salary (income) before saving.");
      return;
    }

    try {

      await API.put("/users/profile", {
        name: name,
        phone: phone,
        salary: Number(salary)
      });

      alert("Profile updated successfully");

      loadProfile();

    } catch (error) {
      console.log("Update error", error);
    }

  };

  const logout = () => {

    localStorage.removeItem("token");
    navigate("/login");

  };

  if (!profile) return <p style={{padding:"20px"}}>Loading profile...</p>;

  return (

    <div
      style={{
        position:"relative",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflow:"hidden"
      }}
    >

      {/* BLURRED BACKGROUND */}
      <div
        style={{
          position:"fixed",
          top:0,
          left:0,
          width:"100%",
          height:"100%",
          backgroundImage:`url('https://wallpapercave.com/wp/wp2015308.jpg')`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          filter:"blur(8px)",
          zIndex:-2
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position:"fixed",
          top:0,
          left:0,
          width:"100%",
          height:"100%",
          background:"rgba(0,0,0,0.35)",
          zIndex:-1
        }}
      />

      {/* NAVBAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: "linear-gradient(135deg, #cba647, #f2aa66)",
          color: "#282828",
          padding: "15px 30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
        }}
      >

        <h2 style={{margin:0}}>Expense Tracker</h2>

        <div
          style={{
            position:"absolute",
            right:"30px",
            display:"flex",
            gap:"10px"
          }}
        >

          <button
            onClick={()=>navigate("/dashboard")}
            style={{
              padding:"8px 15px",
              border:"none",
              borderRadius:"6px",
              background:"#4CAF50",
              color:"white",
              cursor:"pointer",
              fontWeight:"bold"
            }}
          >
            Dashboard
          </button>

          <button
            onClick={logout}
            style={{
              padding:"8px 15px",
              border:"none",
              borderRadius:"6px",
              background:"#f44336",
              color:"white",
              cursor:"pointer",
              fontWeight:"bold"
            }}
          >
            Logout
          </button>

        </div>

      </div>


      {/* PROFILE CARD */}

      <div
        style={{
          display:"flex",
          justifyContent:"center",
          marginTop:"60px"
        }}
      >

        <div
          style={{
            background:"#eee2e2",
            padding:"30px",
            width:"400px",
            borderRadius:"12px",
            boxShadow:"0 8px 32px rgba(0,0,0,0.25)"
          }}
        >

          <h2 style={{textAlign:"center", marginBottom:"20px"}}>
            User Profile
          </h2>

          {/* NAME */}

          <div style={{marginBottom:"15px"}}>
            <label><b>Name</b></label>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={{
                width:"100%",
                padding:"8px",
                marginTop:"5px",
                borderRadius:"6px",
                border:"1px solid #ccc"
              }}
            />
          </div>

          {/* EMAIL */}

          <p style={{marginBottom:"15px"}}>
            <b>Email:</b> {profile.email}
          </p>

          {/* PHONE */}

          <div style={{marginBottom:"15px"}}>
            <label><b>Phone</b></label>
            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              style={{
                width:"100%",
                padding:"8px",
                marginTop:"5px",
                borderRadius:"6px",
                border:"1px solid #ccc"
              }}
            />
          </div>

          {/* SALARY */}

          <div style={{marginBottom:"20px"}}>
            <label><b>Salary (Income)</b></label>
            <input
              type="number"
              min="1"
              value={salary}
              onChange={(e)=>setSalary(e.target.value)}
              style={{
                width:"100%",
                padding:"8px",
                marginTop:"5px",
                borderRadius:"6px",
                border:"1px solid #ccc"
              }}
            />
          </div>

          <button
            onClick={updateProfile}
            style={{
              width:"100%",
              padding:"10px",
              background:"#2196F3",
              color:"white",
              border:"none",
              borderRadius:"8px",
              cursor:"pointer",
              fontWeight:"bold",
              fontSize:"15px"
            }}
          >
            Update Profile
          </button>

        </div>

      </div>

    </div>

  );

}

export default UserProfile;