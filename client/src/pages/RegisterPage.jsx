import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    formData.password === formData.confirmPassword ||
    formData.confirmPassword === ""
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  console.log(formData);

  // handle form data
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const register_form = new FormData();
    for (let key in formData) {
      register_form.append(key, formData[key]);
    }
    console.log(`Submit Data: ${[...register_form]}`);
    try {
      const response = await fetch(
        "https://dream-api-seven.vercel.app/auth/register",
        {
          method: "POST",
          body: register_form,
        }
      );

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed!", err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>
              Passwords do not match. Please try again.
            </p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            required
            onChange={handleChange}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="Add profile pic" />
            <p>Upload Your Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
