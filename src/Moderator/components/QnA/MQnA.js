import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MQnA.css';
import QuestionAnswerCard from '../QuestionAnswerCard/MQuestionAnswerCard';
import { Link } from 'react-router-dom';
import { NAV } from '../NAV/NAV';
import { BaseUrl } from '../../../BaseUrl';
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
      const response = await fetch(`${BaseUrl}/api/moderator/unapproved-answers`, {
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
      <NAV/>
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
          <h3 className="mod2-heading-big">Number of Flagged Questions</h3>
          <div className="mod2-circle1">{numberOfUnapprovedQuestion}</div>
        </div>
      </div>
    </div>
  );
};

export default MQnA;
