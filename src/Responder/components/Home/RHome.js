import React from 'react';
import { Link } from 'react-router-dom';
import './RHome.css';

export const RHome = () => {
  const totalQuestions1 = 10;
  const totalUnansweredQuestions1 = 2;

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };
  return (
    <div className="resp1-app-container">
      {/* Navbar */}
      <nav className="resp1-navbar">
        <Link to="#" style={linkStyle} className="resp1-navbar-brand">
          {/* <img className="resp1-logo" src="images/logo.png" alt="Logo" /> */}
          Tranquil Minds
        </Link>
      
        <div className="resp1-collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="resp1-navbar-nav ml-auto">
            <li className="resp1-nav-item">
              <Link to="/home" style={linkStyle} className="resp1-nav-link"><b>Home</b></Link>
            </li>
            <li className="resp1-nav-item">
              <Link to="/profile_moderator" style={linkStyle} className="resp1-nav-link">Profile</Link>
            </li>
            <li className="resp1-nav-item">
              <Link to="/" style={linkStyle} className="resp1-nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>

  
      
        <div className="resp1-data-container">
          <div className="resp1-data resp1-data1">
            <div className="resp1-info-row">
              <p>Total Questions:</p>
              <div className="resp1-circle1">{totalQuestions1}</div>
            </div>
            <div className="resp1-info-row">
              <p>Total Unanswered Questions:</p>
              <div className="resp1-circle2">{totalUnansweredQuestions1}</div>
            </div>
            <Link to="/RUnanswered"><button className='resp1-button'>Answer Now</button></Link>
          </div>
         

      </div>
    </div>
  );
};
