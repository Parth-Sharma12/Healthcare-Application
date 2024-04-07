import React, { useState } from 'react'
import '../RequestsDetails/RequestDetails.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid'
export default function RequestDetails() {
  const [isApproved, setIsApproved] = useState(false);
  const handleToggle = () => {
    // Toggle the approval status
    setIsApproved(!isApproved);
    // Call a function here if you need to perform additional actions
  };
  const buttonClass = isApproved ? 'requestsButtonapproved' : 'requestsButtonnotApproved';
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 130,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'gender', headerName: 'Gender', width: 130, sortable: false, },
    { field: 'license_no', headerName: 'License No', width: 130 },
    { field: 'experience', headerName: 'experience', width: 130 },
    { field: 'mobileNo', headerName: 'Mobile No', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 130,
    },
    {
      field: 'Requests',
      headerName: 'Requests',
      width: 130,
      renderCell: (params) => {
        return (
          <button className={buttonClass} onClick={handleToggle}>{isApproved ? 'Approved' : 'Approve'}</button>
        )
      }
    },
  ];
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', MiddleName: 'lannister', age: 35,gender:'Male',license_no:'875678',experience:'12 years',mobileNo:'9648753739'},
    { id: 2, lastName: 'Sharma', firstName: 'Jyoti', MiddleName: '', age: 40,gender:'Female',license_no:'875383',experience:'15 years',mobileNo:'9642337391'},
    { id: 3, lastName: 'Patidar', firstName: 'Kumar', MiddleName: 'Saurabh', age: 29,gender:'Male',license_no:'871234',experience:'3 years',mobileNo:'9687534890'},
  ];
  return (
    <div className='MainRequestContainer'>
      <Navbar />
      <div className="RequestsTable">
        <div>
          <DataGrid
            rows={rows}
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
