import React from 'react'
import '../Responder/Responder.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ResponderDetails from '../../Components/ResponderDetails/ResponderDetails'
export default function Responder() {
  return (
    <div className='responderContainer'>
      <Sidebar />
      <ResponderDetails />
    </div>
  )
}
