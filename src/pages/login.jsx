import React, { useState } from "react";
import { useAuth } from "../context/userAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isLoggedIn = login(email, password);
    if (isLoggedIn) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <img
        src="src\assets\Netflix-Logo.png"
        alt="Netflix Logo"
        className="netflix-logo"
      />
      <form className="login-box" onSubmit={handleSubmit}>
        <h1 className="login-title">Sign In</h1>
        {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}
        <input
          type="email"
          placeholder="Email or mobile number"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">Sign In</button>
        <a href="#" className="forgot">
          Forgot password?
        </a>

        <div className="remember-section">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <div className="signup-section">
          <span>
            New to Netflix? <a href="#">Sign up now.</a>
          </span>
        </div>

        <p className="captcha-text">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#">Learn more.</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
