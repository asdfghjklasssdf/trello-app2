import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">My Trolle App</div>

      <div className="nav-links">
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/userpages/*">Edit</Link>
        
      </div>
    </nav>
  );
}
