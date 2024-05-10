import React from 'react';
import './InformationCard.css';
import { Link } from 'react-router-dom';

export const InformationCard = ({ Doctorinfo }) => {
  return (
    <div className="Senior1-doctor-card">
      <img src='/images/adminpanel.png' className="Senior1-profile-photo" />
      <div className="Senior1-details">
        <h2>{Doctorinfo.firstName}</h2>
        <p>Doctor-Id: <b>{Doctorinfo.userId}</b></p>
        <p>Email:<b>{Doctorinfo.email} </b></p>
        <p>Experience:<b>{Doctorinfo.experience} </b> years</p>
        <p>Age:<b>{Doctorinfo.age}</b> </p>
        
        <Link
          to={`/Appointment_History/${ Doctorinfo.userId}`} // Pass doctorId as URL parameter
          className="Senior-view-appointments-btn"
        >
          View Appointment History
        </Link>
      </div>
    </div>
  );
};
