import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import '../PatientDetailsA/PatientDetailsA.css'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
export default function PatientDetailsA() {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
    const fetchData = async () => {
      try {
        //first get the accessToken to pass in header
        const authTokenString = localStorage.getItem('authToken');
        const authToken = JSON.parse(authTokenString);
        const accessToken = authToken.accessToken;
        const response = await axios.get('http://localhost:8082/api/admin/patients', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response.data);
        const extractedPatients = response.data.map((patient, index) => ({
          id: index + 1,
          fullName: `${patient.firstName || ''} ${patient.middleName || ''} ${patient.lastName || ''}`,
          Email: patient.email,
          age:patient.age,
          Mobileno:patient.mobileNo,
          Gender:patient.gender
        }));
        setPatients(extractedPatients);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Email', headerName: 'Email', width: 160 },
        { field: 'age', headerName: 'age', width: 160 },
        { field: 'Mobileno', headerName: 'Mobile No.', width: 160 },
        { field: 'Gender', headerName: 'Gender', width: 160 },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 190,
        },
      ];
  return (
    <div className='MainPatientContainer'>
        <Navbar/>
        <div className="PatientTable">
        <div>
          <DataGrid
            rows={patients}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
        </div>
    </div>
  )
}
