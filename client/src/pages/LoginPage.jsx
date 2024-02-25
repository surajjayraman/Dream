import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form">
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
