import React, { useState } from "react";
import "../styles/Login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const loggedIn = await response.json();
      console.log(`login status : ${JSON.stringify(loggedIn)}`);

      // store the token in redux
      if (loggedIn) {
        dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
        navigate("/");
      }
    } catch (err) {
      console.log("Login failed!", err.message);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleFormChange}
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleFormChange}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
