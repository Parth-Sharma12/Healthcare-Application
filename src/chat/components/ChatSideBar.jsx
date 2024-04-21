import React from 'react'
import '../CSS/ChatSideBar.css'
import ChatNavbar from './ChatNavbar'
import ChatSearch from './ChatSearch'
export default function ChatSideBar(props) {
  const patient=props.patient;
  console.log(patient);
  return (
    <div className='chatSidebar'>
      <ChatNavbar patient={patient}/>
      <ChatSearch patient={patient}/>
    </div>
  )
}
