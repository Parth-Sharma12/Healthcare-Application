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
    <div className="app-container">
    {/* Navbar */}
    <nav class="navbar navbar-expand-lg ">
    <img class = "logo" src="images/logo.png" alt="Logo" />
      <a class="navbar-brand" href="#">Tranquil Minds</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
            <a class="nav-link" href="#"><Link to="/home" style={linkStyle}>Home</Link></a>
          </li>
         
          <li class="nav-item">
            <a class="nav-link" href="#"> <Link to="/profile_moderator" style={linkStyle}>Profile</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link  " href="#"><b>QnA's</b></a>
          </li>
        
        </ul>

      </div>
    </nav>
    <div className='main-content_mod1'>
    <img className = "flag-img1" src="images/flag.png" alt="Column 1 Image" />
      <div className='QnAs'>
        {qaData.map((qa, index) => (
          <div className="column-item" key={index}>
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
      <div className='box1'>
          <h3>Number of Flagged Questions</h3>
          <div className='circle1'>{numberOfFlaggedQuestion}</div>
        </div>
    </div>
    

  </div>

  )
};
export default MQnA;

