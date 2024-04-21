import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../Appointments/AppointmentTable.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function AppointmentTable({ date }) {
  const [dateappointments, setDateAppointments] = useState([]);
  //logic to check appointment details and find which slots are booked
  useEffect(() => {
    // Fetch appointments for the given date from the backend API
    const fetchData = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken ? authToken.accessToken : '';
        const userId = authToken ? parseInt(authToken.userId) : null;
        console.log(token);
        if (!userId) {
          console.error('User ID not found in auth token');
          return;
        }
        //const dummyid = 23;
        const response = await axios.get(`http://localhost:8082/api/appointment/doctor-appointments/${userId}/date/${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
          }
        });
        setDateAppointments(response.data); // Assuming response.data is an array of appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, [date]);

  const navigate = useNavigate();
  const columns = [
    { field: 'slot', headerName: 'Total Slots', width: 130, align: 'center' },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
    // {
    //   field: 'patientName',
    //   headerName: 'Patient Name',
    //   width: 160,
    //   valueGetter: (params) => {
    //     const slot = params.row.slot;
    //     const booking = dateappointments.find(appointment => {
    //       const startHour = parseInt(appointment.startTime.split(':')[0]); // Extract hour part
    //       return slot.startsWith(`${startHour}-`);
    //     });

    //     if (booking && booking.patient) {
    //       return `${booking.patient.firstName} ${booking.patient.lastName}`;
    //     } else {
    //       return 'Available';
    //     }
    //   },
    // },
  ];

  const rows = [
    { id: 1, slot: '9 AM - 10 AM' },
    { id: 2, slot: '10 AM - 11 AM' },
    { id: 3, slot: '11 AM -12 PM' },
    { id: 4, slot: '12 PM - 13 PM' },
    { id: 5, slot: '13 PM - 14 PM' },
    { id: 6, slot: '14 PM -15 PM' },
    { id: 7, slot: '15 PM -16 PM' },
    { id: 8, slot: '16 PM - 17 PM' },
  ];
  console.log("appointment for current date are", dateappointments);
  const getRowClassName = (params) => {
    const slot = params.row.slot;
    const isBooked = dateappointments.some(appointment => {
      const startHour = parseInt(appointment.startTime.split(':')[0]); // Extract hour part
      return slot.startsWith(`${startHour} AM -`) || slot.startsWith(`${startHour} PM -`);
    });
    // Define your condition to determine if the slot should be in green color
    if (isBooked) {
      return 'green-row'; // Apply class to mark the slot as booked
    } else {
      return 'non-clickable-row'; // Default class if slot is not booked
    }
  };
  const handleRowClick = (params) => {
    // Check if the slot is booked
    const slotIsBooked = dateappointments.some(appointment => {
      const startHour = parseInt(appointment.startTime.split(':')[0]); // Extract hour part
      return params.row.slot.startsWith(`${startHour} AM -`) || params.row.slot.startsWith(`${startHour} PM -`);
    });

    // If the slot is booked, navigate to PatientDetails page
    if (slotIsBooked) {
      // Find the appointment corresponding to the clicked slot
      const appointment = dateappointments.find(appointment => {
        const startHour = parseInt(appointment.startTime.split(':')[0]); // Extract hour part
        return params.row.slot.startsWith(`${startHour} AM -`) || params.row.slot.startsWith(`${startHour} PM -`);
      });
      //console.log(appointment.patient.email);
      if (appointment && appointment.patient) {
        // Navigate to PatientDetails page only if appointment and patient exist
        navigate("/PatientDetails", { state: { patient: appointment.patient, date: appointment.date } });
      } else {
        // Handle the case where appointment or patient is null or undefined
        console.error('Appointment or patient object is null or undefined');
      }

    }
  };
  return (
    <>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowClassName={getRowClassName}  // Use getRowClassName prop to apply custom row class
          onRowClick={handleRowClick}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 4 },
            },
          }}
          pageSizeOptions={[5, 10]}
          hideFooterSelectedRowCount={true}
        />
      </div>
    </>
  )
}
