import React, { useState } from "react";
import "../styles/Login.scss";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

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

      // store the token in local storage
      

      console.log(data);
    } catch (err) {
      console.log(err);
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
