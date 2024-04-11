import React from 'react'
import '../Patient/Patient.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import PatientDetailsA from '../../Components/PatientDetailsA/PatientDetailsA'
export default function Patient() {
  return (
    <div className="mainPatientContainer">
        <Sidebar/>
        <PatientDetailsA/>
    </div>
  )
}
