import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../PatientDetails/PatientDetails.css'
import {useLocation} from 'react-router-dom';
export default function PatientDetails() {
  const location = useLocation();
  const patientId = location.state ? location.state.patientId : null;
  console.log(patientId);
  return (
  <>
  <Navbar />
            <div className='container-view-patient'>
                <div className="form-view-patient">
                    <div className="img-view-patient">
                        <img src="https://c8.alamy.com/comp/M3YY2G/doctor-with-patient-cartoon-M3YY2G.jpg" alt="" />
                        <p className='img-text-view-patient'>Vivek Maltare<br/>23<br/>Male</p>
                    </div>
                    <div className="view-patient-form">
                        <span className="circle-view-patient-one"></span>
                        <span className='circle-view-patient-two'></span>
                        <form className='view-a-patient'>
                            <h3 className='patient-page-title'>Appointment Details</h3>
                            <div className="input-container-view-patient focus">
                                <input type="text" name="patient-name" className='input-view-patient' placeholder='Vivek Maltare' readOnly/>
                                <label className='view-patient-label' for="">Patient Name</label>
                                <span>Patient Name</span>
                            </div>
                            <div className="input-container-view-patient focus">
                                <input type="text" name="patient-age" className='input-view-patient' placeholder='23' readOnly/>
                                <label className='view-patient-label' for="">Age</label>
                                <span>Age</span>
                            </div>
                            <div className="input-container-view-patient focus">
                                <input type="text" name="patient-gender" className='input-view-patient' placeholder='male' readOnly/>
                                <label className='view-patient-label' for="">Gender</label>
                                <span>Gender</span>
                            </div>
                            <div className="input-container-view-patient focus">
                                <input type="text" name="patient-appointment-date" className='input-view-patient' placeholder='23/10/2000' readOnly/>
                                <label className='view-patient-label' for="">Appointment Date</label>
                                <span>Appointment Date</span>
                            </div>
                            <div className="input-container-view-patient focus">
                                <input type="text" name="patient-appointment-time" className='input-view-patient' placeholder='8:00 PM' readOnly/>
                                <label className='view-patient-label' for="">Appointment Time</label>
                                <span>Appointment Time</span>
                            </div>
                            <div className="input-container-view-patient focus">
                                <input type="text" name="appointment-duration" className='input-view-patient' placeholder='1 hrs' readOnly/>
                                <label className="view-patient-label" htmlFor="">Duration</label>
                                <span>Duration</span>
                            </div>   
                            <div className="view-patient-buttons">              
                            <button className='view-patient-button' type="submit">Chat Now</button>
                            <button className='view-patient-button' type="submit">Call</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
  </>
  )
}
