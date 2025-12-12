import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/navber";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import Signup from "../src/pages/Signup.JSX";
import UserPages from "./pages/UserPages.jsx";
export default function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup", "/"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userpages/*" element={<UserPages />} />
      </Routes>
    </>
  );
}
