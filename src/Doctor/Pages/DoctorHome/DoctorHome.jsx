import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { PieChart, Pie } from 'recharts'
import axios from 'axios'
import '../DoctorHome/DoctorHome.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../Components/Navbar/Navbar'
import CalenderComponent from '../../Components/Calender/CalenderComponent'
import AppointmentTable from '../../Modals/Appointments/AppointmentTable'
import { FaUser } from "react-icons/fa";
import Footer from '../../Components/Footer/Footer'
export default function DoctorHome() {
  const data01 = [
    {
      "name": "Group A",
      "value": 400,
      "fill": "#86469C"
    },
    {
      "name": "Group B",
      "value": 300,
      "fill": "#BC7FCD"
    },
    {
      "name": "Group C",
      "value": 300,
      "fill": "#86469C"
    },
    {
      "name": "Group D",
      "value": 200,
      "fill": "#FB9AD1"
    },
    {
      "name": "Group E",
      "value": 278,
      "fill": "#FFCDEA"
    },
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 2400,
      "fill": "#BC7FCD"
    },
    {
      "name": "Group B",
      "value": 4567,
      "fill": "#86469C"
    },
    {
      "name": "Group C",
      "value": 1398,
      "fill": "#FB9AD1"
    },
    {
      "name": "Group D",
      "value": 9800,
      "fill": "#86469C"
    },
    {
      "name": "Group E",
      "value": 3908,
      "fill": "#FFCDEA"
    },
  ];
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const token = authToken ? authToken.accessToken : '';
  const userId = parseInt(authToken.userId);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails,setDoctorDetails]=useState();
  const [stats,setStats]=useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
    try {
      const response = await axios.get(`http://192.168.198.236:8082/api/appointment/doctor-appointments/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      const extractedAppointments = response.data.map((Appointment, index) => ({
        id: index + 1,
        fullName: `${Appointment.firstName || ''} ${Appointment.middleName || ''} ${Appointment.lastName || ''}`,
        gender: Appointment.gender,
        date: Appointment.date,
        start_time: Appointment.startTime,
        end_time: Appointment.endTime,
        age: Appointment.age,
        description: Appointment.description
      }));
      console.log(extractedAppointments);
      setAppointments(extractedAppointments);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  //fetching doctor details by id if needed
  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await axios.get(`http://192.168.198.236:8082/api/doctor/doctorbyid/${userId}`,{
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
        const response = await axios.get(`http://192.168.198.236:8082/api/doctor/get-stats/${doctorDetails.doctorId}`, {
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
  
  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 140,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',

      width: 130,
    },
    { field: 'gender', headerName: 'Gender', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'start_time', headerName: 'Start Time', width: 130 },
    { field: 'end_time', headerName: 'End Time', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log("Selected date by you is:", date);
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  //fetch stats
  useEffect(() => {
    fetchStats();
  }, [doctorDetails]);
  console.log("stats are",stats);
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
          <CalenderComponent onDateSelect={handleDateSelect} />
        </div>
        <div className="middlePageContainer">
          {/* <div className="pie-chart-class">
          <PieChart width={300} height={250}>
  <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50}/>
  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
</PieChart>
<div className='pie-chart-text'><p>Lets view your daily reports!</p></div>
</div> */}
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
