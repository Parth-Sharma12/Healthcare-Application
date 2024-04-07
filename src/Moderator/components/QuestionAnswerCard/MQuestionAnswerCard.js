import React from 'react';
import './MQuestionAnswerCard.css'; // Add styles for your question-answer card here
const MQuestionAnswerCard = ({ question, answer, onUpvote, onDownvote ,flag,time}) => {
  // question = 'what are the health concerns due to obesity?'
  // answer = 'Obesity is associated with a wide range of health concerns, both physical and psychological. Some of the most significant health risks and complications of obesity include const answer Obesity is associated with a wide range of health concerns, both physical and psychological. Some of the most significant health risks and complications of obesity include health risks and complications of obesity include const answer Obesity is associated with a wide range of health concerns, both physical and psychological. Some of the most significant health risks and complications of obesity include health risks and complications of obesity include const answer Obesity is associated with a wide range of health concerns, both physical and psychological. Some of the most significant health risks and complications of obesity include health risks and complications of obesity include const answer Obesity is associated with a wide range of health concerns, both physical and psychological. Some of the most significant health risks and complications of obesity include health risks and complications of obesity include const answer Obesity is associated with a wide range of health concerns, both physical and psychological. Some of the most significant health risks and complications of obesity include';
  flag = 1;
  // const currentTime = new Date().toLocaleTimeString();
  return (
   
    <div className="question-answer-card">
      <div className="flagged-indicator">Flagged</div>
      <div className="header">
        <h3>Question:</h3>
      </div>
      <div className="ques-content">
        <p>{question}</p>
      </div>
      <div className="header">
        <h3>Answer:</h3>
      </div>
      <div className="ans-content">
        <p>{answer}</p>
      </div>
      <div>
        <div className="answer-timing">
          <p>Answered at: {time}</p>
        </div>
        <div className="vote-buttons">
        
          {flag === 1 ? (
            <button className="unflag-button" onClick={() => console.log('Unflag clicked')}>Unflag</button>
          ) : (
            <button className="flag-button" onClick={() => console.log('Flag clicked')}>Flag</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MQuestionAnswerCard;
