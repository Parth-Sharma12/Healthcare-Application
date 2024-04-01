import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import '../CSS/Home.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
export default function Home() {
  const orangeDates = ['2024-04-01', '2024-04-05', '2024-04-15'].map(date => new Date(date));
  const [selectedDate, setSelectedDate] = useState(null);
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
  const onClickDay = (date) => {
    console.log("Selected date:", date);
    setSelectedDate(date);
  };
  // const handleDateChange = (date) => {
  //   // Do something with the selected date
  //   console.log('Selected date:', date);
  // };
  // Custom renderDay function to render badges for specific dates
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
      <div className="calender">
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker orientation="portrait" markedDates={orangeDates}/>
    </LocalizationProvider> */}
     <Calendar onClickDay={onClickDay}
            tileClassName={({ date }) => {
              // Check if the date is in the orangeDates array
              return orangeDates.some(d => dayjs(d).isSame(date, 'day')) ? 'orange-date' : null;
            }}
          />
      </div>
    </div>
    </>
  )
}
