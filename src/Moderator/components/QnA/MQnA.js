import React, { useState } from 'react';
import './MQnA.css'
import QuestionAnswerCard from '../QuestionAnswerCard/MQuestionAnswerCard';
import { Link } from 'react-router-dom';


export const MQnA = () => {
  const numberOfFlaggedQuestion = 2;
  const qaData = [
    {
      question: 'What are the health concerns due to obesity?',
      answer: 'Obesity is associated with a wide range of health concerns, both physical and psychological...',
      time : '7:04:41 PM'
      
    },
    {
      question: 'How can I improve my mental health?',
      answer: 'Improving mental health involves various strategies such as regular exercise, maintaining...',
      time : '8:01:20 PM',
     
    },
    // Add more Q&A objects as needed
  ];
  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };
  return (
    <div className="mod2-app-container">
    {/* Navbar */}
    <nav className="mod2-navbar mod2-navbar-expand-lg ">
    {/* <img className = "mod2-logo" src="images/logo.png" alt="Logo" /> */}
      <a className="mod2-navbar-brand"  style={linkStyle} href="#">Tranquil Minds</a>
   

      <div className="mod2-collapse " id="navbarSupportedContent">
        <ul className="mod2-navbar-nav mod2-mr-auto">

          <li className="mod2-nav-item">
            <a className="mod2-nav-link" href="#"><Link to="/home" style={linkStyle}>Home</Link></a>
          </li>
         
          <li className="mod2-nav-item">
            <a className="mod2-nav-link" href="#"> <Link to="/profile_moderator" style={linkStyle}>Profile</Link></a>
          </li>
          <li className="mod2-nav-item">
            <a className="mod2-nav-link"  style={linkStyle} href="#"><b>QnA's</b></a>
          </li>
        
        </ul>

      </div>
    </nav>
    <div className='mod2-main-content_mod1'>
    <img className = "mod2-flag-img1" src="images/flag.png" alt="Column 1 Image" />
      <div className='mod2-QnAs'>
        {qaData.map((qa, index) => (
          <div className="mod2-column-item" key={index}>
            <QuestionAnswerCard
              question={qa.question}
              answer={qa.answer}
              time = {qa.time}
              onUpvote={() => {}}
              onDownvote={() => {}}
            />
          </div>
        ))}

      </div>
      <div className='mod2-box1'>
          <h3>Number of Flagged Questions</h3>
          <div className='mod2-circle1'>{numberOfFlaggedQuestion}</div>
        </div>
    </div>
    

  </div>

  )
};
export default MQnA;

