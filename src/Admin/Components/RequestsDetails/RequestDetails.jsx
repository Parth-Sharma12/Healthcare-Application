import React, { useState,useEffect } from 'react'
import '../RequestsDetails/RequestDetails.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
export default function RequestDetails() {
  //fetch data from backend display only those whose isDisabled value is true.
  const [disabledDoctors,setDisabledDoctors] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const token = authToken ? authToken.accessToken : '';
      const response = await axios.get(`http://localhost:8082/api/admin/disabled-doctors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const extractedDoctors = response.data.map((doctor, index) => ({
        id: index + 1,
        fullName: `${doctor.firstName || ''} ${doctor.middleName || ''} ${doctor.lastName || ''}`,
        gender: doctor.gender,
        age: doctor.age,
        experience: doctor.experience,
        mobileNo: doctor.mobileNo,
        license_no: doctor.licenceNo,
        userId: doctor.userId,
        isDisabled: doctor.isDisabled
      }));
      setDisabledDoctors(extractedDoctors);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  
  console.log("list of disabled doctors is",disabledDoctors);
  const handleToggle = async (userId) => {
    try{
      const updatedDoctors = disabledDoctors.map(doctor =>
        doctor.userId === userId ? { ...doctor, isDisabled: !doctor.isDisabled } : doctor
      );
      setDisabledDoctors(updatedDoctors);
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const token = authToken ? authToken.accessToken : '';
      await axios.put(`http://localhost:8082/api/admin/approve-doctor/${userId}`, true, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        }
      });
      console.log("doctor updated successfully");
    }catch (error) {
      console.error('Error updating doctor:', error.message);
    } 
  };
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 130
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
          <button className={params.row.isDisabled ? 'requestsButtonapproved' : 'requestsButtonnotApproved'} onClick={() => handleToggle(params.row.userId)}>{params.row.isDisabled? 'Approve' : 'Approved'}</button>
        )
      }
    },
  ];
  console.log(disabledDoctors);
  return (
    <div className='MainRequestContainer'>
      <Navbar />
      <div className="RequestsTable">
        <div>
          <DataGrid
            rows={disabledDoctors}
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
