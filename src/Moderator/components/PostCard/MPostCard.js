// PostCard.js
import React, { useState } from 'react';
import CommentModal from '../../../Doctor/Modals/CommentModal/CommentModal';
import './MPostCard.css'; // Add styles for your post card here
import { use } from 'i18next';

export const MPostCard = ({ title, description,imageSrc,userName, onDisable,uploaded_at,onUnflag,Comments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can customize the format further if needed
  };
  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleCommentsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };


  const truncatedDescription = description ? description.split(' ').slice(0, 50).join(' ') : '';
  const remainingDescription = description ? description.split(' ').slice(50).join(' ') : '';

  return (
    <div className="post-card">
        
        <div className='Header'>
        <div className="user-name">
            <p>{userName}</p>
        </div>
        <div className="post-time">
            <p>{formatTimestamp(uploaded_at)}</p>
          </div>
        </div>
        
      <div className="flag-indicator">
        <span>Flagged Post</span>
      </div>
      <div className="content-box">
      
        <div className='Title'>
          <h3>{title}</h3>
        </div>
        <div className='Description-box'>
          <div className='Description'>
            <p>
              {showFullDescription ? description : truncatedDescription}
              {!showFullDescription && remainingDescription.length > 0 && (
                <span>
                  {' '}
                  <a href="#show-more" className="show-more-link" onClick={toggleDescription}>
                    Show More
                  </a>
                </span>
              )}
              {showFullDescription && remainingDescription.length > 0 && (
                <span>
                  {' '}
                  <a href="#show-less" className="show-less-link" onClick={toggleDescription}>
                    Show Less
                  </a>
                </span>
              )}
            </p>
            {imageSrc && (
              <div className="image-container">
                <img src={imageSrc} alt="Post" />
              </div>
            )}
          </div>
        </div>
         
          <div className="button-container">
            <button className='btn-disable' onClick={onDisable}>Disable</button>
            <button className='btn-disable' onClick={onUnflag}>Unflag</button>
            <button className='btn-disable' onClick={handleCommentsClick}>Comments</button>
          </div>
        </div>
        <CommentModal isOpen={isModalOpen} onClose={handleCloseModal}  comments={Comments} />
      </div>
   
  );
};

export default MPostCard;
