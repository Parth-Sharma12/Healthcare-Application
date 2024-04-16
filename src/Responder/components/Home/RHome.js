import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RHome.css';

export const RHome = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalUnansweredQuestions, setTotalUnansweredQuestions] = useState(0);

  useEffect(() => {
    const fetchQuestionStats = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken ? authToken.accessToken : '';
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(
          'http://localhost:8082/api/question/question-data', // Adjust the URL as per your backend endpoint
          { headers: headers }
        );

        if (response.status === 200) {
          console.log(response.data)
          const totalQuestions = response.data[0];
          const totalUnansweredQuestions = response.data[1];
          console.log(totalQuestions)

          setTotalQuestions(totalQuestions);
          setTotalUnansweredQuestions(totalUnansweredQuestions);
        } else {
          console.error('Failed to fetch question stats');
        }
      } catch (error) {
        console.error('Error fetching question stats:', error);
      }
    };

    fetchQuestionStats();
  }, []);

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };

  return (
    <div className="resp1-app-container">
      {/* Navbar */}
      <nav className="resp1-navbar">
        <Link to="#" style={linkStyle} className="resp1-navbar-brand">
          Tranquil Minds
        </Link>
      
        <div className="resp1-collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="resp1-navbar-nav ml-auto">
            <li className="resp1-nav-item">
              <Link to="/home" style={linkStyle} className="resp1-nav-link"><b>Home</b></Link>
            </li>
            <li className="resp1-nav-item">
              <Link to="/profile_responder" style={linkStyle} className="resp1-nav-link">Profile</Link>
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
            <div className="resp1-circle1">{totalQuestions}</div>
          </div>
          <div className="resp1-info-row">
            <p>Total Unanswered Questions:</p>
            <div className="resp1-circle2">{totalUnansweredQuestions}</div>
          </div>
          <Link to="/RUnanswered"><button className='resp1-button'>Answer Now</button></Link>
        </div>
      </div>
    </div>
  );
};
