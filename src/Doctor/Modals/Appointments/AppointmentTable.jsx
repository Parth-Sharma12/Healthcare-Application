import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../Appointments/AppointmentTable.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {BaseUrl} from '../../../BaseUrl'
export default function AppointmentTable({ date }) {
  const [dateAppointments, setDateAppointments] = useState([]);
  const [idToUserIdMap, setIdToUserIdMap] = useState({});
  const [currentDateIdToUserIdMap, setCurrentDateIdToUserIdMap] = useState({});
  const [currentDateAppointments, setCurrentDateAppointments] = useState([]);

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
        // Print the generated map
        console.log('Generated ID to userId map:', idToUserId);
        setIdToUserIdMap(idToUserId);

        // Filter appointments to include only those for the current date
      const currentDateAppointments = response.data.filter(appointment => appointment.date === date);
      setCurrentDateAppointments(currentDateAppointments);

      // Construct the ID to userId map for appointments on the current date
      const currentDateIdToUserId = {};
      currentDateAppointments.forEach((appointment, index) => {
        const id = index + 1; // Assign an incremented ID starting from 1
        const fullName = `${appointment.patient.firstName} ${appointment.patient.middleName || ''} ${appointment.patient.lastName}`;
        currentDateIdToUserId[`${id},${fullName}`] = appointment.patient.userId;
      });
       // Print the generated map
       console.log('Generated ID to userId map for current date:', currentDateIdToUserId);
      setCurrentDateIdToUserIdMap(currentDateIdToUserId);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, [date]);


  const navigate = useNavigate();

  const handleRowClick = (event) => {
    const id = event.row.id;
    const patientName = event.row.patientName;
    console.log("id and patient name is", id, patientName);
    const userIdToFetch = currentDateIdToUserIdMap[`${id},${patientName}`];
    if (userIdToFetch) {
      const appointment = currentDateAppointments.find(appointment => appointment.patient.userId === userIdToFetch);

      if (appointment && appointment.patient) {
        navigate("/PatientDetails", { state: { patient: appointment.patient, date } });
      } else {
        console.error('Patient details not found for the selected appointment');
      }
    } else {
      console.error('User ID not found for the selected appointment');
    }
  };

  console.log("appointment for current date are", currentDateAppointments);

  // Transform currentDateAppointments to include only patient names
  const rows = currentDateAppointments
    .map((appointment, index) => ({
      id: index + 1, // Assign an incremented ID starting from 1
      patientName: `${appointment.patient.firstName} ${appointment.patient.middleName || ''} ${appointment.patient.lastName}`
    }));

  const handleChatNow = () => {
    // Check if patient object exists before navigating
    if (dateAppointments) {
        // Navigate to the chat page and pass the entire patient object in the state
        navigate('/chat', { state: { dateAppointments} });
    } else {
        console.error("Patient object is null or undefined");
    }
};

  console.log("appointment for current date are", dateAppointments);


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
      <button style={{marginTop:'1rem',borderRadius:'3px',color:'white',backgroundColor:'#86469C', outline:'none'}} onClick={handleChatNow}>chat now</button>
    </>
  )
}
