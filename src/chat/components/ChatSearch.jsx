import React from 'react'
import '../CSS/ChatSearch.css'
export default function ChatSearch(props) {
  const { patient, dateAppointments,onPatientClick } = props;
  console.log(patient);
  console.log("date appointments in chat search",dateAppointments);
  const handlePatientClick = (selectedPatient) => {
    onPatientClick(selectedPatient);
  };

  // Filter dateAppointments to get unique patients based on their IDs
  // Get unique patient names
  // Retrieve appointments with unique patient names
  const uniqueAppointments = [];
  const visitedPatients = new Set();
  dateAppointments.forEach(appointment => {
    const patientName = `${appointment.patient.firstName} ${appointment.patient.middleName || ''} ${appointment.patient.lastName}`;
    if (!visitedPatients.has(patientName)) {
      uniqueAppointments.push(appointment);
      visitedPatients.add(patientName);
    }
  });
  console.log("unique patients are",uniqueAppointments);
  return (
    <div className='chatSearch'>
    <div className="searchForm">
      <input type="text" placeholder='find a user'/>
    </div>
    <div className="userChats">
      {uniqueAppointments.map(appointment => (
        <div className="userChat" key={appointment.patient.id} onClick={() => handlePatientClick(appointment.patient)}>
          <img className='chatProfileImg' src={appointment.patient.profileImage} alt=""/>
          <div className="userChatInfo">
            <span>{appointment.patient.firstName} {appointment.patient.middleName} {appointment.patient.lastName}</span>
            <p>Hello</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
