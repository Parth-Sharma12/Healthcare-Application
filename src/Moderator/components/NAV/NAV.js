import React from 'react'
import "./NAV.css"
export const NAV = () => {
    const linkStyle = {
        color: 'black',
        textDecoration: 'none',
      };
  return (
    <div className="app-container">
    {/* Navbar */}
    <nav className="mod6-navbar mod6-navbar-expand-lg ">
    <img className = "mod6-logo" src="images/logo.png" alt="Logo" />
      <a className="mod6-navbar-brand" style={linkStyle} href="#">Tranquil Minds</a>
    

      <div className="mod6-collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="mod6-navbar-nav mr-auto">

          <li className="mod6-nav-item">
            <a className="mod6-nav-link" style={linkStyle} href="#">Profile</a>
          </li>
          <li className="mod6-nav-item dropdown">
            <a className="mod6-nav-link mod6-dropdown-toggle" style={linkStyle} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Requests
            </a>
            
          </li>
        
        </ul>

      </div>
    </nav>
    

  </div>
);
  
}
