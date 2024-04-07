import React from 'react'
import '../ModeratorDetails/ModeratorDetails.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid'
export default function ModeratorDetails() {

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'middleName', headerName: 'Middle Name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.middleName || ''} ${row.lastName}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Sharma', middleName: 'Kumar', firstName: 'Anjali' },
    { id: 2, lastName: 'Sharma', middleName: 'Kumar', firstName: 'Milind' },
    { id: 3, lastName: 'Shivi', middleName: 'Singh', firstName: 'Moyade' },
  ];
  return (
    <div className='MainModeratorContainer'>
      <Navbar />
      <div className="ModeratorTable">
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
