import React from 'react'
import '../CSS/Chat.css'
import { IoIosMore } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import Messages from './Messages'
import Input from './Input'
export default function Chat(props) {
  const { patient, dateAppointments,onPatientClick } = props;
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Vivek Maltare</span>
        <div className="chatIcons">
          <FaVideo/>
          <AiOutlineUserAdd/>
          <IoIosMore/>
        </div> 
      </div>
      <Messages patient={patient}/>
      <Input patient={patient} dateAppointments={dateAppointments} onPatientClick={onPatientClick}/>
    </div>
  )
}
