import React, { useState } from 'react';
import axios from 'axios';
import './RAnsweringCard.css'; // Add styles for your question-answer card here

const RAnsweringCard = ({ question }) => {
  const Time = new Date(question.uploadedAt).toLocaleString();
  const [answer, setAnswer] = useState('');

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(question);

      const authToken = JSON.parse(localStorage.getItem("authToken"));
      console.log(authToken);
      const token = authToken ? authToken.accessToken : '';
      console.log(token);
      const userId = parseInt(authToken.userId);
      // Create a data object to send to the backend
      const currentTime = new Date().toISOString();
      console.log(userId)
      const modifiedQuestion = {

        answer: answer, // Change the answer field
        answeredAt: currentTime,
        answeredBy: userId,

        // You can change other fields if needed
      };


      // Make an API call using Axios to send the answer to the backend


      // Make an API call using Axios to send the answer to the backend
      const response = await axios.put(
        `http://192.168.198.236:8082/api/responder/add-answer/${question.questionId}`, modifiedQuestion, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        console.log('Answer submitted successfully');
        // Optionally, you can clear the answer field after successful submission
        setAnswer('');
        window.alert('Answer submitted successfully!');
      } else {
        console.error('Failed to submit answer');
        window.alert('Failed to submit answer. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      window.alert('Error submitting answer. Please try again later.');
    }
  };

  return (
    <div className="resp3-question-answer-card_responder">
      <div className="resp3-username">
        <h7>Asked By: <b>{question.questionBy.username}</b></h7>
      </div>
      <div className="resp3-header_responder">
        <h3>Question:</h3>
      </div>
      <div className="resp3-ques-content_responder">
        <p>{question.question}</p>
      </div>
      <div className="resp3-form-group">
        <label className="resp3-label" htmlFor="answerInput"><h3>Your Answer:</h3></label>
        <textarea
          type="text"
          className="resp3-form-control"
          id="answerInput"
          value={question.answer}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <div className="resp3-answer-timing">
          <p>Uploaded at: {Time}</p>
        </div>
        <button className="resp3-btn-submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default RAnsweringCard;
