import React, { useState, useEffect } from 'react';
import './Appointment_History.css';
import Senior_Navbar from '../Senior_Navbar/Senior_Navbar';
import axios from 'axios'; // Import Axios
import { useParams } from 'react-router-dom';
import { ChatModal } from '../ChatModal/ChatModal';

export const Appointment_History = () => {
    const { doctorId } = useParams();
    console.log("Doctor ID in Appointment History:", doctorId);

    const [appointments, setAppointments] = useState([]);
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [showChatModal, setShowChatModal] = useState(false);

    useEffect(() => {
        console.log('Inside useEffect');
        console.log('doctorId:', doctorId);
        const fetchData = async () => {
            if (doctorId) {
                console.log('Fetching data for doctorId:', doctorId);
                try {
                    const authToken = JSON.parse(localStorage.getItem("authToken"));
                    const token = authToken ? authToken.accessToken : '';

                    // Fetch doctor info
                    const doctorResponse = await axios.get(`http://localhost:8082/api/doctor/doctorbyid/${doctorId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(doctorResponse.data);
                    setDoctorInfo(doctorResponse.data);

                    // Fetch appointments
                    const appointmentsResponse = await axios.get(`http://localhost:8082/api/doctor/distinct-patient/${doctorId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(appointmentsResponse.data);
                    setAppointments(appointmentsResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [doctorId]); // Include doctorId in the dependency array

    const handleViewChat = (appointment_id) => {
        console.log(`View Chat for appointment ${appointment_id}`);
        setSelectedAppointmentId(appointment_id);
        setShowChatModal(true);
    };

    const handleCloseChatModal = () => {
        setShowChatModal(false);
    };

    return (
        <div>
            <Senior_Navbar />
            <div className="Senior3-Doctor-Info">
                <img src="/images/adminpanel.png" alt="Doctor" className="Senior3-Doctor-Profile-Pic" />
                <div className="Senior3-Doctor-Details">
                    <h2>{doctorInfo?.firstName + " " + doctorInfo?.lastName}</h2> {/* Use optional chaining to avoid errors if doctorInfo is null */}
                    <p>Email: {doctorInfo?.user.email}</p>
                    <p>Gender: {doctorInfo?.gender}</p>
                </div>
            </div>
            <div className="Appointment-History-container">
                <h2 className="Appointment-History-title">Appointment History</h2>
                <ul className="Appointment-History-list">
                    {appointments.map((appoint, index) => (
                        <li key={appoint.appointment_id} className="Appointment-History-item">
                            <p> Patient ID: {index + 1}</p>
                            <button className='Senior3-Viewchat' onClick={() => handleViewChat(appoint)}>View Chat</button>
                        </li>
                    ))}
                </ul>
            </div>
            {showChatModal && (
                <ChatModal
                    show={showChatModal}
                    handleClose={handleCloseChatModal}
                    userIdDoc={doctorId}
                    userIdPatient={selectedAppointmentId}
                />
            )}
        </div>
    );
};
