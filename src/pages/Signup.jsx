import React, { useState } from 'react';
import '../css/Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!fullName) e.fullName = "Full name is required";
        if (!username) e.username = "Username is required";
        if (!email) e.email = "Email is required";
        if (!password) e.password = "Password is required";
        if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const e2 = validate();
        setErrors(e2);
        if (Object.keys(e2).length > 0) return;

        const newUser = {
            id: Date.now(),
            fullName,
            username,
            email,
            phone,
            bio,
            password
        };

        const existing = JSON.parse(localStorage.getItem("users") || "[]");

        const duplicate = existing.find(
            u => u.email === email || u.username === username
        );
        if (duplicate) {
            setErrors({ form: "Account with this email or username already exists" });
            return;
        }

        existing.push(newUser);
        localStorage.setItem("users", JSON.stringify(existing));

        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        navigate("/dashboard");
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Create Account</h1>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        {errors.fullName && <small className="error">{errors.fullName}</small>}
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} />
                        {errors.username && <small className="error">{errors.username}</small>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <small className="error">{errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Bio</label>
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <small className="error">{errors.password}</small>}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
                    </div>

                    {errors.form && <p className="error">{errors.form}</p>}

                    <button className="btn-signup">Sign Up</button>
                </form>

                <p className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}