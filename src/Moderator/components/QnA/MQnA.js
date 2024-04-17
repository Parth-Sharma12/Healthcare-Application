import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MQnA.css';
import QuestionAnswerCard from '../QuestionAnswerCard/MQuestionAnswerCard';
import { Link } from 'react-router-dom';

const MQnA = () => {
  const [qaData, setQaData] = useState([]);
  const [numberOfUnapprovedQuestion,setnumberOfUnapprovedQuestion] = useState(0);
  const [numberOfFlaggedQuestion, setNumberOfFlaggedQuestion] = useState(0);
  const handleLogout = () =>{
    localStorage.removeItem("authToken");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    // Redirect to the login page or any other appropriate page after logout
    
  }
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {

      // Get the authentication token from wherever it's stored in your application
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const token = authToken ? authToken.accessToken : '';
      console.log(token);
      
      const userId = parseInt(token.userId);
      // Make an HTTP GET request to fetch flagged posts from the database
      const response = await fetch('http://localhost:8082/api/moderator/unapproved-answers', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}` // Include the auth token in the header
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch unapproved Questions',response.error);
      }

      const data = await response.json();
      setnumberOfUnapprovedQuestion(data.length)
;      console.log(data);
    
      setQaData(data);
  } catch (error) {
      console.error('Error fetching flagged posts:', error);
  }
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };

  return (
    <div className="mod2-app-container">
      {/* Navbar */}
      <nav className="mod2-navbar mod2-navbar-expand-lg ">
        <a className="mod2-navbar-brand" style={linkStyle} href="#">
          Tranquil Minds
        </a>

        <div className="mod2-collapse " id="navbarSupportedContent">
          <ul className="mod2-navbar-nav mod2-mr-auto">
            <li className="mod2-nav-item">
              <a className="mod2-nav-link" href="#">
                <Link to="/home" style={linkStyle}>
                  Home
                </Link>
              </a>
            </li>

            <li className="mod2-nav-item">
            
                <Link to="/profile_moderator" style={linkStyle}>
                  Profile
                </Link>
            </li>
            <li className="mod2-nav-item">
            <Link to="/QnA" style={linkStyle}>
                  QnA's
                </Link>
            </li>
            <li className="mod2-nav-item">
            <Link to="/" style={linkStyle}>
                  LogOut
                </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="mod2-main-content_mod1">
        <img className="mod2-flag-img1" src="images/flag.png" alt="Column 1 Image" />
        <div className="mod2-QnAs">
          {qaData.map((qa, index) => (
            <div className="mod2-column-item" key={index}>
              <QuestionAnswerCard
               key = {index}
               question = {qa}
              />
            </div>
          ))}
        </div>
        <div className="mod2-box1">
          <h3>Number of Flagged Questions</h3>
          <div className="mod2-circle1">{numberOfUnapprovedQuestion}</div>
        </div>
      </div>
    </div>
  );
};

export default MQnA;
