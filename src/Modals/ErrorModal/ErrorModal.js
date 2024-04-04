import React from 'react';
import '../ErrorModal/ErrorModal.css';
const ErrorModal = ({ title, message, onClose }) => {
  return (
    <div className="error-modal">
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorModal;