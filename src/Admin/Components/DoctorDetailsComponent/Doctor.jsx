import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../DoctorDetailsComponent/Doctor.css'
import Navbar from '../Navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid';
import { BaseUrl } from '../../../BaseUrl';
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
      const response = await axios.get(`${BaseUrl}/api/admin/doctors`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": 'application/json',
        }
      });
      //console.log(response.data);
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
        isDisabled: doctor.isDisabled,
        userId:doctor.userId
      }));
      setDoctors(extractedDoctors);
      //console.log(extractedDoctors);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleToggle = async (userId) => {
    try{
      const updatedDoctors = doctors.map(doctor =>
        doctor.userId === userId ? { ...doctor, isDisabled: !doctor.isDisabled } : doctor
      );
      setDoctors(updatedDoctors);

      // Determine the value based on the current status (disabled or not)
    const valueToSend = !updatedDoctors.find(doctor => doctor.userId === userId).isDisabled;
    console.log(valueToSend);
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const token = authToken ? authToken.accessToken : '';

      await axios.put(`${BaseUrl}/api/admin/approve-doctor/${userId}`,valueToSend, {
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

   //console.log(doctors);
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
        return (     
        <button className={params.row.isDisabled ? 'requestsButtonapproved' : 'requestsButtonnotApproved'} onClick={() => handleToggle(params.row.userId)}>{params.row.isDisabled? 'Approve' : 'Approved'}</button>
        )
      }
    },
  ];
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
