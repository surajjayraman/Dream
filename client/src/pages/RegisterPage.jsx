import React, { useState } from "react";
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            required
            value={formData.firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            required
            value={formData.lastName}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={formData.password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
          />
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            required
            value={formData.profileImage}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="Add profile pic" />
            <p>Upload Your Photo</p>
          </label>
          <button type="submit">REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
