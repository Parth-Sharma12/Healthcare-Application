import React from 'react';
import { Link } from 'react-router-dom';
import './RHome.css';

export const RHome = () => {
  const totalQuestions1 = 10;
  const totalUnansweredQuestions1 = 2;


  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <Link to="#" className="navbar-brand">
          <img className="logo" src="images/logo.png" alt="Logo" />
          Tranquil Minds
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link"><b>Home</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/profile_moderator" className="nav-link">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="responder-content">
        <div className="vertical-column1"></div>
        <div className="data-container">
          <div className="data data1">
            <div className="info-row">
              <p>Total Questions:</p>
              <div className="circle1">{totalQuestions1}</div>
            </div>
            <div className="info-row">
              <p>Total Unanswered Questions:</p>
              <div className="circle2">{totalUnansweredQuestions1}</div>
            </div>
            <Link to="/RUnanswered"><button>Answer Now</button></Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};
