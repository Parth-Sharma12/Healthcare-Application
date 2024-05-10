import React from 'react'
import '../CSS/ChatSideBar.css'
import ChatNavbar from './ChatNavbar'
import ChatSearch from './ChatSearch'
export default function ChatSideBar(props) {
  const { patient, dateAppointments,onPatientClick } = props;
  console.log(patient);
  console.log("date appointments in sidebar",dateAppointments);
  return (
    <div className='chatSidebar'>
      <ChatNavbar patient={patient}/>
      <ChatSearch patient={patient} dateAppointments={dateAppointments} onPatientClick={onPatientClick}/>
    </div>
  )
}
