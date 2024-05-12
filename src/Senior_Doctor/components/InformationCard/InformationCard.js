import React from 'react';
import './InformationCard.css';
import { Link } from 'react-router-dom';

export const InformationCard = ({ Doctorinfo }) => {
  return (
    <div className="Senior1-doctor-card">
      <img src={Doctorinfo.image} alt="" className="Senior1-profile-photo" />
      <div className="Senior1-details">
        <h2>{"Dr." + Doctorinfo.firstName + " " + Doctorinfo.lastName}</h2>
        <p><b>Doctor-Id </b>: {Doctorinfo.userId}</p>
        <p><b>Email</b>:{Doctorinfo.email} </p>
        <p><b>Experience</b>:{Doctorinfo.experience}  years</p>
        <p><b>Age</b>:{Doctorinfo.age} </p>
        
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
