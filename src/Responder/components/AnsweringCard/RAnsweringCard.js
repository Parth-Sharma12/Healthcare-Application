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
       
    <div className="resp3-question-answer-card_responder">
        <div className="resp3-username">
        <h7>Asked By: <b>{username}</b></h7>
      </div>
      <div className="resp3-header_responder">
        <h3>Question:</h3>
      </div>
      <div className="resp3-ques-content_responder">
        <p>{question}</p>
      </div>
      <div className="resp3-form-group">
          <label className="resp3-label" htmlFor="answerInput"><h3>Your Answer:</h3></label>
          <textarea
          type="text"
            className="resp3-form-control"
            id="answerInput"
            value={answer}
            onChange={handleChange}
          ></textarea>

        </div>
      <div>
        <div className="resp3-answer-timing">
          <p>Answered at: {currentTime}</p>
        </div>
        <button className="resp3-btn-submit" onClick={handleSubmit}>Submit</button>
      </div>
      
      </div>
  );
};

export default RAnsweringCard;
