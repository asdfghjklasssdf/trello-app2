import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const found = users.find(
            u => u.email === email && u.password === password
        );

        if (!found) {
            setError("Invalid email or password");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(found));
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button className="btn-login">Login</button>
                </form>

                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}