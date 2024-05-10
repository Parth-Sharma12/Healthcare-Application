import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RHome.css';
import { NAV_RESP } from '../NAV_RESP/NAV_RESP';
import { BaseUrl } from '../../../BaseUrl';
export const RHome = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalUnansweredQuestions, setTotalUnansweredQuestions] = useState(0);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');

  }
  useEffect(() => {
    const fetchQuestionStats = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken ? authToken.accessToken : '';
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(
          `${BaseUrl}/api/question/question-data`, // Adjust the URL as per your backend endpoint
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
      <NAV_RESP />
      <div className='resp1-main-content'>
        <div className='resp1-img'>
          <img className='resp1-img1' src="images/Answer.png" />
        </div>
        <div className="resp1-data-container">
          <div className="resp1-data resp1-data1">
            <div className="resp1-info-row">
              <p className='resp1-heading-big'>Total Questions:</p>
              <div className="resp1-circle1">{totalQuestions}</div>
            </div>
            <div className="resp1-info-row">
              <p className='resp1-heading-big'>Total Unanswered Questions:</p>
              <div className="resp1-circle2">{totalUnansweredQuestions}</div>
            </div>
            <Link to="/RUnanswered"><button className='resp1-button'>Answer Now</button></Link>
          </div>
        </div>
      </div>

    </div>
  );
};
