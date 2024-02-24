import React from "react";
import "../styles/Register.scss"

const RegisterPage = () => {
  return (
    <div className="register">
      <div className="register-content">
        <form>
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            required
          />
          <input type="text" placeholder="Last Name" name="lastname" required />
          <input placeholder="Email" name="email" type="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            required
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
