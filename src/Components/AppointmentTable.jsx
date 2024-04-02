import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../CSS/AppointmentTable.css'
export default function AppointmentTable({date}) {
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
  {id:7,slot:'13-14',firstName:'Vivek',lastName:'Maltare'},
];
const getRowClassName = (params) => {
  const slot = params.row.slot;
  // Define your condition to determine if the slot should be in green color
  if (slot === '9-10' || slot === '12-13') {
    return 'green-row non-clickable-row'; // Apply green color to specific slots
  }
  return '';
};
  return (
   <>
    <div style={{ height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={getRowClassName} // Use getRowClassName prop to apply custom row class
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5},
          }, 
        }}
        pageSizeOptions={[5, 10]}
        hideFooterSelectedRowCount={true}
      />
      </div>
    </>
  )
}
