import React,{useState,useEffect} from 'react'
import '../ModeratorDetails/ModeratorDetails.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
export default function ModeratorDetails() {
  const [moderators, setModerators] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      //first get the accessToken to pass in header
      const authTokenString = localStorage.getItem('authToken');
      const authToken = JSON.parse(authTokenString);
      const accessToken = authToken.accessToken;
      const response = await axios.get('http://localhost:8082/api/admin/moderators', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
      const extractedModerators = response.data.map((moderator, index) => ({
        id: index + 1,
        firstName:moderator.firstName,
        middleName:moderator.middleName,
        lastName:moderator.lastName,
        fullName: `${moderator.firstName || ''} ${moderator.middleName || ''} ${moderator.lastName || ''}`,
         Email: moderator.email,
      }));
      setModerators(extractedModerators);
      //console.log(extractedDoctors);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'middleName', headerName: 'Middle Name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 190,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Sharma', middleName: 'Kumar', firstName: 'Anjali' ,email:"maltareanjali@gmail.com"},
    { id: 2, lastName: 'Sharma', middleName: 'Kumar', firstName: 'Milind',email:"maltareanjali@gmail.com" },
    { id: 3, lastName: 'Shivi', middleName: 'Singh', firstName: 'Moyade' ,email:"maltareanjali@gmail.com"},
  ];
  return (
    <div className='MainModeratorContainer'>
      <Navbar />
      <div className="ModeratorTable">
        <div>
          <DataGrid
            rows={moderators}
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
