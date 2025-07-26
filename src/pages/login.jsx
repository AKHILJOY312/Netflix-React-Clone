// src/pages/Login.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/userAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values.email, values.password);
        navigate("/");
      } catch (error) {
        setErrors({ general: "Invalid email or password" });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <img
        src="src/assets/Netflix-Logo.png"
        alt="Netflix Logo"
        className="netflix-logo"
      />
      <form className="login-box" onSubmit={formik.handleSubmit}>
        <h1 className="login-title">Sign In</h1>

        {formik.errors.general && (
          <p className="error-message">{formik.errors.general}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email or mobile number"
          className="login-input"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error-message">{formik.errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error-message">{formik.errors.password}</p>
        )}

        <button
          className="login-button"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <div className="button-content">
              <span className="spinner"></span>
              <span>Signing in...</span>
            </div>
          ) : (
            <span className="button-content">Sign In</span>
          )}
        </button>

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
