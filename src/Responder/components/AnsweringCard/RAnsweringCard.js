import React,{useState} from 'react';

import './RAnsweringCard.css'; // Add styles for your question-answer card here
const RAnsweringCard = ({question,username}) => {
 
  const currentTime = new Date().toLocaleTimeString();
  const [answer, setAnswer] = useState('');
      
  const handleChange = (event) => {
    setAnswer(event.target.value);
  };
  const handleSubmit = () => {
    // Implement your submit logic here
    console.log('Submitted answer:', answer);
    // Optionally, you can clear the answer field after submission
    window.alert('Answer submitted successfully!');
  };
  return (
       
    <div className="question-answer-card_responder">
        <div className="username">
        <h7>Asked By: <b>{username}</b></h7>
      </div>
      <div className="header_responder">
        <h3>Question:</h3>
      </div>
      <div className="ques-content_responder">
        <p>{question}</p>
      </div>
      <div className="form-group">
          <label htmlFor="answerInput"><h3>Your Answer:</h3></label>
          <textarea
          type="text"
            className="form-control"
            id="answerInput"
            value={answer}
            onChange={handleChange}
          ></textarea>

        </div>
      <div>
        <div className="answer-timing">
          <p>Answered at: {currentTime}</p>
        </div>
        <button className="btn-submit" onClick={handleSubmit}>Submit</button>
      </div>
      
      </div>
  );
};

export default RAnsweringCard;
