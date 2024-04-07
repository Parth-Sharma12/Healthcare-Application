import React from 'react'
import '../Moderator/Moderator.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ModeratorDetails from '../../Components/ModeratorDetails/ModeratorDetails'
export default function Moderator() {
  return (
    <div className='ModeratorContainer'>
      <Sidebar />
      <ModeratorDetails />
    </div>
  )
}
