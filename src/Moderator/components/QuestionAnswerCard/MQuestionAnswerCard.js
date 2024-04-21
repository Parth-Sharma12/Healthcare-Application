import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './MQuestionAnswerCard.css'; // Add styles for your question-answer card here

const MQuestionAnswerCard = ({ question }) => {
  // Set flag to 0
  console.log(question.questionId);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State variable to track button disable state
  const handleApprove = async (Id) => {
    try {
      // Get authToken from localStorage
      const authToken = JSON.parse(localStorage.getItem("authToken"));

      const token = authToken ? authToken.accessToken : '';
      console.log(token);
      const userId = parseInt(token.userId);
      // Create a data object to send to the backend
      console.log(userId);
      console.log(Id);
      setIsButtonDisabled(true); // Disable the button
      const response = await fetch(
        `http://localhost:8082/api/moderator/approve-answer/${Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        console.log('Answer Approved successfully');
        // Optionally, you can clear the answer field after successful submission
        window.alert('Approved successfully!');

      } else {
        console.error('Failed to Approve answer');
        window.alert('Failed to Approve answer. Please try again later.');
      }
    } catch (error) {
      console.error('Error Approving answer:', error.message);
      window.alert('Error Approving answer. Please try again later.');
    }
  };

  return (
    <div className="question-answer-card">

      <div className="header_user">
        <h3>Asked By : {question.questionBy.email}</h3>
      </div>
      <div className="header">
        <h3>Question:</h3>
      </div>
      <div className="ques-content">
        <p>{question.question}</p>
      </div>
      <div className="header">
        <h3>Answer:</h3>
      </div>
      <div className="ans-content">
        <p>{question.answer}</p>
      </div>
      <div>
        <div className="answer-timing">
          <p>Answered at: {question.answeredAt}</p>
        </div>
        <div className="vote-buttons">
          <button
            className="unflag-button"
            onClick={() => handleApprove(question.questionId)}

            disabled={isButtonDisabled} // Disable the button if isButtonDisabled is true
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default MQuestionAnswerCard;
