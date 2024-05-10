import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../DoctorHome/DoctorHome.css'
import Navbar from '../../Components/Navbar/Navbar'
import CalenderComponent from '../../Components/Calender/CalenderComponent'
import AppointmentTable from '../../Modals/Appointments/AppointmentTable'
import { FaUser } from "react-icons/fa";
import { BaseUrl } from '../../../BaseUrl'
import {useAppointmentContext} from '../../Context/AppointmentContext'
export default function DoctorHome() {
  const { isModalOpen, selectedDate, openModal, closeModal } = useAppointmentContext();
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const token = authToken ? authToken.accessToken : '';
  const userId = parseInt(authToken.userId);
  const [doctorDetails,setDoctorDetails]=useState();
  const [stats,setStats]=useState([]);

  //fetching doctor details by id if needed
  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await axios.get(`${BaseUrl}/api/doctor/doctorbyid/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
          }
      });
      setDoctorDetails(response.data);
    }
     catch (error) {
      console.error('Error fetching doctor details:', error);
      return null;
    }
  };

  //fetching doctor stats
  const fetchStats = async () => {
    try {
      if (doctorDetails && doctorDetails.doctorId) {
        const response = await axios.get(`${BaseUrl}/api/doctor/get-stats/${doctorDetails.doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  //fetchDoctorDetails();
  useEffect(() => {
    fetchDoctorDetails();
  }, []);
  
  const handleDateSelect = (date) => {
    openModal(date);
    console.log("Selected date by you is:", date);
  };
  //fetch stats
  useEffect(() => {
    fetchStats();
  }, [doctorDetails]);
  console.log("stats are",stats);
  console.log(isModalOpen);
  console.log(selectedDate);
  return (
    <>
      <Navbar />
      <div className='mainHomeContainer'>
        <div className="statistics-cards">
          <div className="single-card">
            <div className="card-content">
              <div className="number">{stats[2]}</div>
              <div className="card-name">Pending Appointments</div>
            </div>
            <div className="icon-box">
              <FaUser className='icon' />
            </div>
          </div>
          <div className="single-card">
            <div className="card-content">
              <div className="number">{stats[0]}</div>
              <div className="card-name">patients</div>
            </div>
            <div className="icon-box">
              <FaUser className='icon' />
            </div>
          </div>
          <div className="single-card">
            <div className="card-content">
              <div className="number">1</div>
              <div className="card-name">Active Patients</div>
            </div>
            <div className="icon-box">
              <FaUser className='icon' />
            </div>
          </div>
          <div className="single-card">
            <div className="card-content">
              <div className="number">{stats[1]}</div>
              <div className="card-name">Appointments</div>
            </div>
            <div className="icon-box">
              <FaUser className='icon' />
            </div>
          </div>
        </div>
        <div className="statistics-graphs">
          <div className="greeting">
            <div className="greeting-image">
              <img src="https://img.freepik.com/free-vector/chemists-scientists-talk-illustration_33099-603.jpg?w=826&t=st=1712219212~exp=1712219812~hmac=6e5d20560de0db2bf6af841cd2aa01438e81d451a95268b32889f48003355bc9" alt="" />
            </div>
            <div className="greeting-text">
              <div><p>Hi Doctor!!!</p></div>
              <div><p>Have a great day at work...</p><button className='notifications-button'>view notifications</button></div>
            </div>
          </div>         
          <CalenderComponent onDateSelect={handleDateSelect}/>
        </div>
        <div className="middlePageContainer">
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <AppointmentTable date={selectedDate} />
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  )
}
