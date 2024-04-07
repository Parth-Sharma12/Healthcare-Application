import React from 'react'
import '../ResponderDetails/ResponderDetails.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid'
export default function ResponderDetails() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'MiddleName', headerName: 'Middle Name', width: 130 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    // { field: 'UserId', headerName: 'User Id', width: 130 },
  ];

  const rows = [
    { id: 1, MiddleName:'kumar',lastName: 'vivek', firstName: 'Jon'},
    { id: 1, MiddleName:'singh',lastName: 'Sharma', firstName: 'Shivam'},
    { id: 1, MiddleName:'joshi',lastName: 'Modi', firstName: 'Rishabh'},
    { id: 1, MiddleName:'jen',lastName: 'Sharma', firstName: 'Vinay'},
  ];
  return (
    <div className='mainResponderContainer'>
      <Navbar />
      <div className="ResponderTable">
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
