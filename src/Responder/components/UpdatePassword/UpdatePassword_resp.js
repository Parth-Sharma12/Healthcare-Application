import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BaseUrl } from '../../../BaseUrl';
import "./UpdatePassword_resp.css"
export const UpdatePassword_resp = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const token = authToken ? authToken.accessToken : '';
  console.log(authToken);
  const userId = parseInt(authToken.userId);
  console.log(userId)


   const handleLogout = () =>{
        localStorage.removeItem("authToken");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
    // Redirect to the login page or any other appropriate page after logout
    
    }
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password don't match");
      return;
    }

    try {

      const response = await axios.put(`${BaseUrl}/api/responder/update-password`, {
        newPassword: newPassword,
        oldPassword: currentPassword,
        userId: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        }
      });
      // Reset form fields and display success message
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      // setSuccessMessage(response.data.message); // Assuming the API sends a success message
      alert("Password Successfully Updated")
    } catch (error) {
      // Handle error from API
      if (error.response) {
        alert("Error Updating the password"); // Assuming the API sends an error message
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className='resp8-main'>
      <Link to="/" className="resp8-logout" onClick={handleLogout}>Logout</Link>

      <h2 className='resp8-mainheading'>You are Logged in for the first time! Please update the password.</h2>
      <div className="resp8-container">
        <h2 className="resp8-heading">Update Password</h2>
        <form onSubmit={handleUpdatePassword} className="resp8-form">
          <div className="resp8-input-container">
            <label htmlFor="currentPassword" className="resp8-label">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="resp8-input"
              required
            />
          </div>
          <div className="resp8-input-container">
            <label htmlFor="newPassword" className="resp8-label">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="resp8-input"
              required
            />
          </div>
          <div className="resp8-input-container">
            <label htmlFor="confirmPassword" className="resp8-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="resp8-input"
              required
            />
          </div>
          {errorMessage && <p className="resp8-error-message">{errorMessage}</p>}
          {successMessage && <p className="resp8-success-message">{successMessage}</p>}
          <button type="submit" className="resp8-button">Update Password</button>
        </form>
      </div>
    </div>

  );
};

export default UpdatePassword_resp;
