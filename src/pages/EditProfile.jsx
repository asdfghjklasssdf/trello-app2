import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UserPages.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser")) || null;
    } catch {
      return null;
    }
  });

  const [form, setForm] = useState({ fullName: "", username: "", email: "", phone: "", bio: "" });

  useEffect(() => {
    if (user) {
      setForm({ fullName: user.fullName || "", username: user.username || "", email: user.email || "", phone: user.phone || "", bio: user.bio || "" });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Not signed in</h2>
          <p>Please <a href="/login">login</a> first.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!form.email.trim() || !form.username.trim()) {
      alert("Email and username are required");
      return;
    }

    const conflict = users.find(u => (u.email === form.email.trim() || u.username === form.username.trim()) && u.id !== user.id);
    if (conflict) {
      alert("Another user already uses that email/username");
      return;
    }

    const updatedUser = { ...user, fullName: form.fullName, username: form.username.trim(), email: form.email.trim(), phone: form.phone, bio: form.bio };
    const next = users.map(u => u.id === user.id ? updatedUser : u);

    localStorage.setItem("users", JSON.stringify(next));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    navigate("/profile");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Edit Profile</h2>

        <div className="form-group">
          <label>Full name</label>
          <input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn" onClick={handleSave}>Save</button>
          <button className="btn" onClick={() => navigate("/profile")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
