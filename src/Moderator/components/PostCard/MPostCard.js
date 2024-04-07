// PostCard.js
import React, { useState } from 'react';
import './MPostCard.css'; // Add styles for your post card here

export const MPostCard = ({ title, description,imageSrc,userName, onDisable,postTime,onUnflag }) => {

  const [showFullDescription, setShowFullDescription] = useState(false);

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
            <p>{postTime}</p>
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
            <button onClick={onUnflag}>Unflag</button>
          </div>
        </div>
      </div>
   
  );
};

export default MPostCard;
