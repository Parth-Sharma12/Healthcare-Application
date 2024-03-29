import React, { useState } from "react";
import "../CSS/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://9e50-119-161-98-68.ngrok-free.app/api/user/authenticate",
        userLoginDetails
      );
      if (response.status === 200) {
        console.log(response.data);
        const authToken = {
          accessToken: response.data.accessToken,
          tokenType: response.data.tokenType,
          userId: response.data.userId
        };
        window.localStorage.setItem("authToken", JSON.stringify(authToken));
        navigate("/home");
      }
    }
    catch (error) {
      console.error("Error posting data:", error.response.status);
      let errorStatus = error.response.status;
      console.log(errorStatus);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginDetails({ ...userLoginDetails, [name]: value });
  };
  return (
    <div className="login-wrapper">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Username"
              name="email"
              value={userLoginDetails.email}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userLoginDetails.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Accept T&C
            </label>
            <Link to="/home">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Dont have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
