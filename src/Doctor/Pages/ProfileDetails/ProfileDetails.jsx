import React, { useEffect, useState } from 'react';
import '../ProfileDetails/ProfileDetails.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {BaseUrl} from '../../../BaseUrl'
export default function ProfileDetails() {
    const navigate = useNavigate();
    const [initialProfileData, setInitialProfileData] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [passwordFields, setPasswordFields] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [profileData, setProfileData] = useState({
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
    //fetching userId and token from local storage
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const token = authToken ? authToken.accessToken : '';
    console.log(authToken);
    const user_Id = parseInt(authToken.userId);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/doctor/doctorbyid/${user_Id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            });
            console.log(response.data);
            setProfileData(response.data);
            setInitialProfileData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    //edit profile 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // const payLoad={
            //     "consultationFee":profileData.consultationFee,
            //     "description":profileData.description,
            //     "mobileNo":profileData.mobileNo,
            //     "firstName":profileData.firstName,
            //     "middleName":profileData.middleName,
            //     "lastName":profileData.lastName,
            //     "age":profileData.age
            // };
           // console.log("to send",payLoad);
            // Send updated profileData to backend
            console.log("handle is called");
            const authToken = JSON.parse(localStorage.getItem("authToken"));
            const token = authToken ? authToken.accessToken : '';
            const response = await axios.put(`${BaseUrl}/api/doctor/update-doctor/${user_Id}`, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            });
            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    // Reset profile data to initial state
    const handleCancel = () => {
        setProfileData(initialProfileData);
    };

    const handleYourPosts = () => {
        navigate('/YourPosts'); // Navigate to '/other-page' when the button is clicked
      };

    const toggleChangePassword = async () => {
        if (!showChangePassword) {
            setShowChangePassword(true);
        }
        else {
            //logic to update the password in backend.
            if (passwordFields.newPassword!== passwordFields.confirmPassword) {
                setErrorMessage("Passwords do not match");
                return;
            }
            try {
                const response = await axios.put(`${BaseUrl}/api/doctor/update-password`, {
                    userId:user_Id,
                    oldPassword:passwordFields.oldPassword,
                    newPassword:passwordFields.newPassword
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json',
                    }
                });

                console.log('Password updated successfully:', response.data);
                setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);

                setPasswordFields({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

                setShowChangePassword(false);
            } catch (error) {
                console.error('Error updating password:', error.message);
            }
        }
    };
    const handleChangePasswordFields = (e) => {
        const { name, value } = e.target;
        setPasswordFields(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrorMessage("");
    };
    return (
        <>
            <Navbar />
            <div className='profile-details-wrapper'>
                <div className="profile-inner">
                    <div className="profile-image-holder">
                    <button className='Your-Posts' onClick={handleYourPosts}>Your Posts</button>
                        {/* <img src={profileData.image} alt="" /> */}
                        <img src="data:image/jpeg;base64,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" alt="" />
                    </div>
                    <form>
                        
                        <h3>Your Profile</h3>
                        <div className="form-group-profile">
                            <label className='view-profile-label'>Name</label>
                            <input type="text" placeholder='First Name' className='form-control-profile' value={profileData.firstName + " " + profileData.middleName + " " + profileData.lastName} readOnly />
                        </div>
                        <div className="form-wrapper-profile">
                            <label className='view-profile-label'>Email</label>
                            <input type="text" placeholder='Email Address' className='form-control-profile' value={profileData.user.email} readOnly />
                        </div>
                        <div className="form-wrapper-profile">
                            <label className='view-profile-label'>Contact</label>
                            <input type="text" placeholder='Mobile No.' name="mobileNo" className='form-control-profile' value={profileData.mobileNo} onChange={handleChange} />
                        </div>
                        <div className="form-wrapper-profile">
                            <label className='view-profile-label'>Consultation</label>
                            <input type="text" placeholder='Consultation Fee' name="consultationFee" className='form-control-profile' value={profileData.consultationFee} onChange={handleChange} />
                        </div>
                        <div className="form-wrapper-profile">
                            <label className='view-profile-label'>Gender</label>
                            <input type="text" placeholder='Gender' className='form-control-profile' value={profileData.gender} readOnly />
                        </div>
                        <div className="form-wrapper-profile">
                            <label className='view-profile-label'>License No.</label>
                            <input type="text" placeholder='License No.' className='form-control-profile' value={profileData.licenceNo} readOnly />
                        </div>
                        <div className="form-wrapper-profile">
                            <label className='view-profile-label'>Description</label>
                            <input type="text" placeholder='Description' name="description" className='form-control-profile' value={profileData.description} onChange={handleChange} />
                        </div>
                        {showChangePassword && (<>
                            <div className="form-wrapper-profile">
                                <label className='view-profile-label'>Old Password</label>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    className='form-control-profile'
                                    value={passwordFields.oldPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="form-wrapper-profile">
                                <label className='view-profile-label'>New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    className='form-control-profile'
                                    value={passwordFields.newPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="form-wrapper-profile">
                                <label className='view-profile-label'>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    className='form-control-profile'
                                    value={passwordFields.confirmPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                        </>

                        )}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {showSuccessMessage && <p className="success-message">Password updated successfully</p>}
                        <div className='view-profile-buttons'>
                            <button className='view-profile-button' onClick={(e) => handleSave(e)}>Edit</button>
                            <button className='view-profile-button' onClick={(e) => { e.preventDefault(); toggleChangePassword(); }}>{showChangePassword ? "update" : "update password"}</button>
                            <button className='view-profile-button' onClick={handleCancel}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
