import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../Appointments/AppointmentTable.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {BaseUrl} from '../../../BaseUrl'
export default function AppointmentTable({ date }) {
  const [dateAppointments, setDateAppointments] = useState([]);
  const [idToUserIdMap, setIdToUserIdMap] = useState({});
  // Fetch appointments and construct the ID to userId map
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken ? authToken.accessToken : '';
        const userId = authToken ? parseInt(authToken.userId) : null;
        
        if (!userId) {
          console.error('User ID not found in auth token');
          return;
        }
        
        //const dummyId = 5;
        const response = await axios.get(`${BaseUrl}/api/appointment/doctor-appointments/${userId}/date/${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
          }
        });

        setDateAppointments(response.data);

        // Construct the ID to userId map
        const idToUserId = {};
        response.data.forEach((appointment, index) => {
          const id = index + 1; // Assign an incremented ID starting from 1
          const fullName = `${appointment.patient.firstName} ${appointment.patient.middleName || ''} ${appointment.patient.lastName}`;
          idToUserId[`${id},${fullName}`] = appointment.patient.userId;
        });
        setIdToUserIdMap(idToUserId);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, [date]);


  const navigate = useNavigate();

  const handleRowClick = (event) => {
   const id=event.row.id;
   const patientName=event.row.patientName;
   console.log("id and patient name is",id,patientName);
    const userIdToFetch = idToUserIdMap[`${id},${patientName}`];
    if (userIdToFetch) {
      const appointment = dateAppointments.find(appointment => appointment.patient.userId === userIdToFetch);
  
      if (appointment && appointment.patient) {
        navigate("/PatientDetails", { state: { patient: appointment.patient, date } });
      } else {
        console.error('Patient details not found for the selected appointment');
      }
    } else {
      console.error('User ID not found for the selected appointment');
    }
  };

  const handleChatNow = () => {
    // Check if patient object exists before navigating
    if (dateAppointments) {
        // Navigate to the chat page and pass the entire patient object in the state
        navigate('/chat', { state: { dateAppointments } });
    } else {
        console.error("Patient object is null or undefined");
    }
};

  console.log("appointment for current date are", dateAppointments);

// Transform dateAppointments to include only patient names
const rows = dateAppointments
  .map((appointment, index) => ({
    id: index + 1, // Assign an incremented ID starting from 1
    patientName: `${appointment.patient.firstName} ${appointment.patient.middleName || ''} ${appointment.patient.lastName}`
  }));

  return (
   <>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={[
            { field: 'patientName', headerName: 'Patient Name', width: 200,cellClassName:'centered-cell' }
          ]}
          onRowClick={(event) => handleRowClick(event)} // Pass the event object
          pageSizeOptions={[5, 10]}
          hideFooterSelectedRowCount={true}
          getRowClassName={() => 'green-row'}
        />
      </div>
      <button style={{marginTop:'1rem'}} onClick={handleChatNow}>chat now</button>
    </>
  )
}
