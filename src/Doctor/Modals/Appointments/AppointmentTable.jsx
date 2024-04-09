import React,{useState,useEffect} from 'react'
import { DataGrid} from '@mui/x-data-grid';
import '../Appointments/AppointmentTable.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function AppointmentTable({date}) {
  const [dateappointments, setDateAppointments] = useState([]);
  //logic to check appointment details and find which slots are booked
  useEffect(() => {
    // Fetch appointments for the given date from the backend API
    const fetchData = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken ? authToken.accessToken : '';
        const userId = authToken ? parseInt(authToken.userId) : null;
        
        if (!userId) {
          console.error('User ID not found in auth token');
          return;
        }
        const dummyid=23;
        const response = await axios.get(`http://localhost:8082/api/appointment/doctor-appointments/${dummyid}/date/${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
          }
        });
        setDateAppointments(response.data); // Assuming response.data is an array of appointments
        console.log("appointment for current date are",response.data)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    
    fetchData();
  }, [date]);
  
  const navigate = useNavigate();
const columns = [
  { field: 'slot', headerName: 'Total Slots', width: 130 }, 
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  {id:1,slot:'8-9',firstName:'Vivek',lastName:'Maltare'},
  {id:2,slot:'9-10',firstName:'Vivek',lastName:'Maltare'},
  {id:3,slot:'10-11',firstName:'Vivek',lastName:'Maltare' },
  {id:4,slot:'11-12',firstName:'Vivek',lastName:'Maltare'},
  {id:5,slot:'12-13',firstName:'Vivek',lastName:'Maltare'},
  {id:6,slot:'13-14',firstName:'Vivek',lastName:'Maltare'},
];
const getRowClassName = (params) => {
  const slot = params.row.slot;
  const isBooked = dateappointments.some(appointment => {
    const startHour = parseInt(appointment.startTime.split(':')[0]); // Extract hour part
    return slot.startsWith(`${startHour}-`);
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
    return params.row.slot.startsWith(`${startHour}-`);
  });

  // If the slot is booked, navigate to PatientDetails page
  if (slotIsBooked) {
    // Find the appointment corresponding to the clicked slot
    const appointment = dateappointments.find(appointment => {
      const startHour = parseInt(appointment.startTime.split(':')[0]); // Extract hour part
      return params.row.slot.startsWith(`${startHour}-`);
    });

    if (appointment) {
      // Navigate to PatientDetails page and pass the patient ID as a state
      navigate("/PatientDetails",{ state: { patientId: 15 } });
    }
  }
};
  return (
   <>
    <div style={{ height: 350, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={getRowClassName}  // Use getRowClassName prop to apply custom row class
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4},
          }, 
        }}
        pageSizeOptions={[5, 10]}
        hideFooterSelectedRowCount={true}
      />
      </div>
    </>
  )
}
