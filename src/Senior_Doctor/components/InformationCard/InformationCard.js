import React from 'react';
import './InformationCard.css';
import { withRouter } from 'react-router-dom'; 
export const InformationCard = ({ profilePhoto, name, id , email , experience, age }) => {
  
  
  const handleViewAppointments = () => {
    // Navigate to Appointment History page with doctor ID as a parameter
    history.push(`/appointment-history/${id}`);
  };
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
        <button className="Senior-view-appointments-btn" onClick={handleViewAppointments}>View Appointment History</button>
      </div>
    </div>
  );
};
export default withRouter(InformationCard);