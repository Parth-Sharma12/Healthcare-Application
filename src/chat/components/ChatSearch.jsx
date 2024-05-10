import React from 'react'
import '../CSS/ChatSearch.css'
export default function ChatSearch(props) {
  const { patient, dateAppointments,onPatientClick } = props;
  console.log(patient);
  console.log("date appointments in chat search",dateAppointments);
  const handlePatientClick = (selectedPatient) => {
    onPatientClick(selectedPatient);
  };
  return (
    <div className='chatSearch'>
    <div className="searchForm">
      <input type="text" placeholder='find a user'/>
    </div>
    <div className="userChats">
      {dateAppointments.map(appointment => (
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
