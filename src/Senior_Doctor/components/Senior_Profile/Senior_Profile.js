import React, { useEffect, useState } from 'react';
import './Senior_Profile.css';
import Senior_Navbar from '../Senior_Navbar/Senior_Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {BaseUrl} from '../../../BaseUrl'
export const Senior_Profile = () =>{
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
            <Senior_Navbar />
            <div className='Senior-profile-details-wrapper'>
                <div className="Senior-profile-inner">
                    <div className="Senior-profile-image-holder">
                   
                        <img src={profileData.image} alt="" />
                    </div>
                    <form>
                        
                        <h3>Your Profile</h3>
                        <div className="Senior-form-group-profile">
                            <label className='Senior-view-profile-label'>Name</label>
                            <input type="text" placeholder='First Name' className='Senior-form-control-profile' value={profileData.firstName + " " + profileData.middleName + " " + profileData.lastName} readOnly />
                        </div>
                        <div className="Senior-form-wrapper-profile">
                            <label className='Senior-view-profile-label'>Email</label>
                            <input type="text" placeholder='Email Address' className='Senior-form-control-profile' value={profileData.user.email} readOnly />
                        </div>
                        <div className="Senior-form-wrapper-profile">
                            <label className='Senior-view-profile-label'>Contact</label>
                            <input type="text" placeholder='Mobile No.' name="mobileNo" className='Senior-form-control-profile' value={profileData.mobileNo} onChange={handleChange} />
                        </div>
                        <div className="Senior-form-wrapper-profile">
                            <label className='Senior-view-profile-label'>Consultation</label>
                            <input type="text" placeholder='Consultation Fee' name="consultationFee" className='Senior-form-control-profile' value={profileData.consultationFee} onChange={handleChange} />
                        </div>
                        <div className="Senior-form-wrapper-profile">
                            <label className='Senior-view-profile-label'>Gender</label>
                            <input type="text" placeholder='Gender' className='Senior-form-control-profile' value={profileData.gender} readOnly />
                        </div>
                        <div className="Senior-form-wrapper-profile">
                            <label className='Senior-view-profile-label'>License No.</label>
                            <input type="text" placeholder='License No.' className='Senior-form-control-profile' value={profileData.licenceNo} readOnly />
                        </div>
                        <div className="Senior-form-wrapper-profile">
                            <label className='Senior-view-profile-label'>Description</label>
                            <input type="text" placeholder='Description' name="description" className='Senior-form-control-profile' value={profileData.description} onChange={handleChange} />
                        </div>
                        {showChangePassword && (<>
                            <div className="Senior-form-wrapper-profile">
                                <label className='Senior-view-profile-label'>Old Password</label>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    className='Senior-form-control-profile'
                                    value={passwordFields.oldPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="Senior-form-wrapper-profile">
                                <label className='Senior-view-profile-label'>New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    className='Senior-form-control-profile'
                                    value={passwordFields.newPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="Senior-form-wrapper-profile">
                                <label className='Senior-view-profile-label'>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    className='Senior-form-control-profile'
                                    value={passwordFields.confirmPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                        </>

                        )}
                        {errorMessage && <p className="Senior-error-message">{errorMessage}</p>}
                        {showSuccessMessage && <p className="Senior-success-message">Password updated successfully</p>}
                        <div className='Senior-view-profile-buttons'>
                            <button className='Senior-view-profile-button' onClick={(e) => handleSave(e)}>Edit</button>
                            <button className='Senior-view-profile-button' onClick={(e) => { e.preventDefault(); toggleChangePassword(); }}>{showChangePassword ? "update" : "update password"}</button>
                            <button className='Senior-view-profile-button' onClick={handleCancel}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
