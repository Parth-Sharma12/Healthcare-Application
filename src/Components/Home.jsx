import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import '../CSS/Home.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import CalenderComponent from './CalenderComponent'
import AppointmentTable from './AppointmentTable'
export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
    try {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const token = authToken ? authToken.accessToken : '';
      const userId = parseInt(authToken.userId);
      const response = await axios.get(`http://192.168.233.236:8082/api/appointment/doctor-appointments/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        }
      });
      console.log(response.data);
      const extractedAppointments = response.data.map((Appointment, index) => ({
        id: Appointment.appointmentId,
        fullName: `${Appointment.Patient.first_name || ''} ${Appointment.Patient.middle_name || ''} ${Appointment.Patient.lastName || ''}`,
        gender: Appointment.Patient.gender,
        date: Appointment.date,
        start_time: Appointment.startTime,
        end_time: Appointment.endTime,
        age: Appointment.Patient.age,
        description: Appointment.description
      }));
      //console.log(extractedAppointments);
      setAppointments(extractedAppointments);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  const columns = [
    { field: 'id', headerName: 'Appointment Id', width: 120 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 140,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
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
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log("Selected date by you is:", date);
  };
  return (
    <>
    <Navbar/>
    <div className='mainHomeContainer'>
      {/* <div className='appointmentgrid'>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={appointments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
      <button className="logoutButton" onClick={handleLogout}>Logout</button> */}
      <div className="middlePageContainer">
        <CalenderComponent onDateSelect={handleDateSelect}/>
        {selectedDate && (<div className="appointment-slots-table">
        <AppointmentTable date={selectedDate} />
        </div>)}
      </div>
    </div>
    </>
  )
}
