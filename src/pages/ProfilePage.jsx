import React from "react";
import "../css/ProfilePage.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const navigate = useNavigate();

    const rawUser = localStorage.getItem("loggedInUser");
    const user = rawUser ? JSON.parse(rawUser) : {};

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    return (
        <div className="profile-container">
            <div className="profile-card">

                <div className="avatar">
                    {(user.fullName || "U")[0].toUpperCase()}
                </div>

                <h2>{user.fullName}</h2>

                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Phone:</strong> {user.phone || "Not added"}</p>
                <p><strong>Bio:</strong> {user.bio || "No bio added"}</p>

                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    );
}