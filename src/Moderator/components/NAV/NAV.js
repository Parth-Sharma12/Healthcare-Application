import React from 'react'
import "./NAV.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const NAV = () => {
    const handleLogout = () =>{
      localStorage.clear();
      // Redirect to the login page or any other appropriate page after logout
    }
    const linkStyle = {
        color: "rgb(234, 232, 232)",
        textDecoration: 'none',
      };
  return (
    <div className="app-container">
    {/* Navbar */}
    <nav className="mod6-navbar mod6-navbar-expand-lg ">
    <img className = "mod6-logo" src="images/first logo.png" alt="Logo" />
      <a className="mod6-navbar-brand" style={linkStyle}>Tranquil Minds</a>
    

      <div className="mod6-collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="mod6-navbar-nav mr-auto">
        <li className="mod6-nav-item dropdown">
            <a className="mod6-nav-link mod6-dropdown-toggle" style={linkStyle} > <Link to="/home" style={linkStyle}>Home</Link>
            </a> 
          </li>
         
          <li className="mod6-nav-item">
            <a className="mod6-nav-link"> <Link to="/QNA"  style={linkStyle}>QNA's</Link></a>
          </li>
          <li className="mod6-nav-item">
            <a className="mod6-nav-link"> <Link to="/Moderator_profile"  style={linkStyle}>Profile</Link></a>
          </li>
          <li className="mod6-nav-item">
            <a className="mod6-nav-link"> <Link to="/" onclick ={handleLogout} style={linkStyle}>Logout</Link></a>
          </li>
         
        
        </ul>

      </div>
    </nav>
    

  </div>
);
  
}
