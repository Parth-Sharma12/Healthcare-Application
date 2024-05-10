import React, { useState, useEffect } from 'react';
import './RUnanswered.css';
import AnsweringCard from '../AnsweringCard/RAnsweringCard';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NAV_RESP } from '../NAV_RESP/NAV_RESP';
import { BaseUrl } from '../../../BaseUrl';
export const RUnanswered = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions(); // Fetch questions when component mounts
  }, []);
 

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    // Redirect to the login page or any other appropriate page after logout
    
  };

  const fetchQuestions = async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const token = authToken ? authToken.accessToken : '';
      console.log(token);

      const userId = parseInt(authToken.userId);
      // etch data from your backend API endpoint
      const response = await fetch(`${BaseUrl}/api/responder/get-unanswered-questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        }
      });
      const data = await response.json();
      console.log(data);
      setQuestions(data); // Update state with fetched questions
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };

  return (
    <div className="resp2-app-container">
      {/* Navbar */}
      <NAV_RESP/>
      <div className="resp2-Main-content1">
        <div className="resp2-img_responder">
          <img className="resp2-moving-img" src="images/unanswered3.png" alt="Moving Img" />
        </div>
        <div className="resp2-unanswered-ques">
          {/* Map over questions array and render AnsweringCard for each question */}
          {questions.map((question, index) => (
            <AnsweringCard
              key={index}
              question={question} // Pass the entire question object as prop
            />
          ))}
        </div>
      </div>
    </div>
  );
};
