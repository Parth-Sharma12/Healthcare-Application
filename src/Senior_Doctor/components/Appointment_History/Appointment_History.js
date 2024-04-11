import React from 'react';
import './Appointment_History.css';
import Senior_Navbar from '../Senior_Navbar/Senior_Navbar';

export const Appointment_History = () => {
    const doctorInfo = {
        name: "Dr. John Doe",
        profilePic: "/images/adminpanel.png",
        email: "john.doe@example.com",
        gender: "Male"
    };
    const appointments = [
        { appointment_id: 1, date: "2024-04-15", time: "10:00 AM" },
        { appointment_id: 2, date: "2024-04-20", time: "2:30 PM" },
        { appointment_id: 3, date: "2024-04-25", time: "11:45 AM" },
        // Add more appointments as needed
    ];
    
    const handleViewChat = (appointment_id) => {
        // Handle view chat action
        console.log(`View Chat for appointment ${appointment_id}`);
    };

    return (
        <div>
            <Senior_Navbar />
            <div className="Senior3-Doctor-Info">
                <img src={doctorInfo.profilePic} alt="Doctor" className="Senior3-Doctor-Profile-Pic" />
                <div className="Senior3-Doctor-Details">
                    <h2>{doctorInfo.name}</h2>
                    <p>Email: {doctorInfo.email}</p>
                    <p>Gender: {doctorInfo.gender}</p>
                </div>
            </div>
            <div className="Appointment-History-container">
                <h2 className="Appointment-History-title">Appointment History</h2>
                <ul className="Appointment-History-list">
                    {appointments.map(appoint => (
                        <li key={appoint.appointment_id} className="Appointment-History-item">
                            <p>Appointment ID: {appoint.appointment_id}</p>
                            <p>Date: {appoint.date}</p>
                            <p>Time: {appoint.time}</p>
                            <button className='Senior3-Viewchat' onClick={() => handleViewChat(appoint.appointment_id)}>View Chat</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};


