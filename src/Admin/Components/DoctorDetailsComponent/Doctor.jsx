import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../DoctorDetailsComponent/Doctor.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid';
export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      //first get the accessToken to pass in header
      const authTokenString = localStorage.getItem('authToken');
      const authToken = JSON.parse(authTokenString);
      const accessToken = authToken.accessToken;
      const response = await axios.get('http://localhost:8082/api/admin/doctors', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": 'application/json',
        }
      });
      console.log(response.data);
      const extractedDoctors = response.data.map((doctor, index) => ({
        id: index + 1,
        fullName: `${doctor.firstName || ''} ${doctor.middleName || ''} ${doctor.lastName || ''}`,
        gender: doctor.gender,
        licence_no: doctor.licenceNo,
        experience: doctor.experience,
        consultationFee: doctor.consultationFee,
        isSenior: doctor.isSenior ? "yes" : "no",
        Email: doctor.email,
        age: doctor.age,
        isDisabled: doctor.isDisabled
      }));
      setDoctors(extractedDoctors);
      //console.log(extractedDoctors);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160
    },
    { field: 'gender', headerName: 'Gender', width: 130, sortable: false, },
    { field: 'licence_no', headerName: 'License No', width: 130 },
    { field: 'experience', headerName: 'experience', width: 130 },
    { field: 'consultationFee', headerName: 'Consultation Fee', width: 130 },
    { field: 'isSenior', headerName: 'Senior Doctor', width: 130 },
    { field: 'Email', headerName: 'Email', width: 180 },
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
        const doctor = params.row;
        const status = doctor.isDisabled ? "Pending" : "Approved";
        const buttonClass = doctor.isDisabled ? "requestsButton disabledButtonClass" : "requestsButton approvedButtonClass";
        return (
          <button className={buttonClass} onClick={setDoctorStatus(doctor, status)}>{status}</button>
        )
      }
    },
  ];
  const setDoctorStatus = () => {

  }
  return (
    <div className='MainDoctorContainer'>
      <Navbar />
      <div className="doctorDataTable">
        <div>
          <DataGrid
            rows={doctors}
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
