import React from 'react';
import './CommentModal.css';

const CommentModal = ({ isOpen, comments, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Comments</h2>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-time">{comment.time}</span>
              </div>
              <div className="comment-body">{comment.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;