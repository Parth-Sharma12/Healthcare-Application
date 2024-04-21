import React from 'react';
import './InformationCard.css';

export const InformationCard = ({ profilePhoto, name, id , email , experience, age }) => {
  
  

  return (
    <div className="Senior1-doctor-card">
      <img src='/images/adminpanel.png' alt={name} className="Senior1-profile-photo" />
      {/* <img src={profilePhoto} alt={name} className="Senior1-profile-photo" /> */}
      <div className="Senior1-details">
        <h2>{name}</h2>
        <p>Doctor-Id: <b>{id}</b></p>
        <p>Email:<b>{email} </b></p>
        <p>Experience:<b>{experience} </b> years</p>
        <p>Age:<b>{age}</b> </p>
        <button className="Senior-view-appointments-btn">View Appointment History</button>
      </div>
    </div>
  );
};
