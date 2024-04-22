import React,{useState,useEffect} from 'react'
import '../ResponderDetails/ResponderDetails.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
export default function ResponderDetails() {
  const [responders, setResponders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      //first get the accessToken to pass in header
      const authTokenString = localStorage.getItem('authToken');
      const authToken = JSON.parse(authTokenString);
      const accessToken = authToken.accessToken;
      const response = await axios.get('http://192.168.198.236:8082/api/admin/responders', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
      const extractedResponders = response.data.map((responder, index) => ({
        id: index + 1,
        firstName:responder.firstName,
        MiddleName:responder.middleName,
        lastName:responder.lastName,
        fullName: `${responder.firstName || ''} ${responder.middleName || ''} ${responder.lastName || ''}`,
        Email: responder.email,
      }));
      setResponders(extractedResponders);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'MiddleName', headerName: 'Middle Name', width: 130 },
    { field: 'Email', headerName: 'Email', width: 160 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 190,
    },
  ];
  return (
    <div className='mainResponderContainer'>
      <Navbar />
      <div className="ResponderTable">
        <div>
          <DataGrid
            rows={responders}
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
