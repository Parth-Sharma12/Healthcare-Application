import React from 'react'
import '../DoctorDetails/DoctorDetails.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Doctor from '../../Components/DoctorDetailsComponent/Doctor'
export default function DoctorDetails() {
  return (
    <div className='DoctorContainer'>
      <Sidebar />
      <Doctor />
    </div>
  )
}
