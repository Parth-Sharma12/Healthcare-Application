import React from 'react'
import { FaUser, FaLock } from "react-icons/fa";
export default function ChangePassword() {
    const handleSubmit = async (e) => {
        //e.preventDefault();
      };
    
  return (
    <div className="login-wrapper">
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Change Password</h1>
        <div className="input-box">
          <input
            type="password"
            placeholder="Old Password"
            name="password"
            required
          />
          <FaLock className="icon"/>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="New Password"
            name="password"
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password"
            required
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  )
}
