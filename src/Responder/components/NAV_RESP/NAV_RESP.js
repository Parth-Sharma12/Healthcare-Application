import React from 'react'
import "./NAV_RESP.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const NAV_RESP = () => {
    const handleLogout = () =>{
      localStorage.removeItem("authToken");
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      // Redirect to the login page or any other appropriate page after logout
    }
    const linkStyle = {
        color: "rgb(234, 232, 232)",
        textDecoration: 'none',
      };
  return (
    <div className="app-container">
    {/* Navbar */}
    <nav className="resp6-navbar mod6-navbar-expand-lg ">
    <img className = "resp6-logo" src="images/first logo.png" alt="Logo" />
      <a className="resp6-navbar-brand" style={linkStyle}>Tranquil Minds</a>
    

      <div className="resp6-collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="resp6-navbar-nav mr-auto">
        
         
          <li className="resp6-nav-item">
            <a className="resp6-nav-link"> <Link to="/home"  style={linkStyle}>Home</Link></a>
          </li>
          <li className="resp6-nav-item">
            <a className="resp6-nav-link"> <Link to="/profile_responder"  style={linkStyle}>Profile</Link></a>
          </li>
          <li className="resp6-nav-item">
            <a className="resp6-nav-link"> <Link to="/" onclick ={handleLogout} style={linkStyle}>Logout</Link></a>
          </li>
         
        
        </ul>

      </div>
    </nav>
    

  </div>
);
  
}
