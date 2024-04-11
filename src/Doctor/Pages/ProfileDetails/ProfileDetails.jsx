import React,{useEffect, useState} from 'react';
import '../ProfileDetails/ProfileDetails.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios'
export default function ProfileDetails() {
    const [profileData,setProfileData]=useState({
        firstName: "",
    middleName: "",
    lastName: "",
    user: {
        email: ""
    },
    mobileNo: "",
    consultationFee: "",
    gender: "",
    licenceNo: "",
    description: ""
    });
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
    try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken ? authToken.accessToken : '';
        console.log(authToken);
        const userId = parseInt(authToken.userId);
        const response = await axios.get(`http://localhost:8082/api/doctor/doctorbyid/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
          }
        });
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    return (
        <>
            <Navbar />
            <div className='profile-details-wrapper'>
                <div className="profile-inner">
                    <div className="profile-image-holder">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="image" />
                    </div>
                    <form>
                        <h3>Your Profile</h3>
                        <div className="form-group-profile">
                            <input type="text" placeholder='First Name' className='form-control-profile' value={profileData.firstName+" "+profileData.middleName+" "+profileData.lastName} readOnly/>
                        </div>
                        <div className="form-wrapper-profile">
                        <input type="text" placeholder='Email Address' className='form-control-profile' readOnly value={profileData.user.email} />                            
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Mobile No.' className='form-control-profile' value={profileData.mobileNo} readOnly/>
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Address' className='form-control-profile' />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Consultation Fee' className='form-control-profile' value={profileData.consultationFee} readonly/>
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Gender' className='form-control-profile' value={profileData.gender} readonly/>
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='License No.' className='form-control-profile' value={profileData.licenceNo} readonly />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Description' className='form-control-profile' value={profileData.description} readonly />
                        </div>
                        <div className='view-profile-buttons'>
                            <button className='view-profile-button'>Edit</button>
                            <button className='view-profile-button'>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
