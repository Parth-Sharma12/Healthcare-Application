import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import HomeRightBar from '../../Components/HomeRightBar/HomeRightBar'
import '../AdminHome/AdminHome.css'
export default function AdminHome() {
  return (
    <div className='mainHomeContaineradmin'>
      <Sidebar />
      <HomeRightBar />
    </div>
  )
}
