import React from 'react';
import './CommentModal.css';
const CommentModal = ({ isOpen, comments, onClose }) => {
  if (!isOpen) return null;

  //method to show time in format like 2 days ago etc.
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    return 'Just now';
  };
  
  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Comments</h2>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-time">{formatTimeAgo(comment.uploadedAt)}</span>
              </div>
              <div className="comment-body">{comment.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;