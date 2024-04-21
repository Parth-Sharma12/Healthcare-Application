import React, { useEffect, useState } from 'react';
import './Moderator_Profile.css';
import { NAV } from '../NAV/NAV';
import axios from 'axios'
export default function Moderator_Profile() {
    const [initialProfileData, setInitialProfileData] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
    const userId = parseInt(authToken.userId);
    console.log(userId)
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/api/moderator/getbyid/${userId}`, {
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

    const toggleChangePassword = async () => {
        if (!showChangePassword) {
            setShowChangePassword(true);
        }
        else {
            //logic to update the password in backend.
            if (passwordFields.newPassword !== passwordFields.confirmPassword) {
                setErrorMessage("Passwords do not match");
                alert("Passwords do not match");
                return;
            }
            try {
                const response = await axios.put(`http://localhost:8082/api/moderator/update-password`, {
                    newPassword: passwordFields.newPassword,
                    oldPassword: passwordFields.oldPassword,
                    userId: userId
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json',
                    }
                });

                console.log('Password updated successfully:', response.data);
                alert('Password updated successfully');
                setPasswordFields({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

                setShowChangePassword(false);
            } catch (error) {
                alert('Error updating password:')
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
            <NAV/>
            <div className='mod7-profile-details-wrapper'>
                <div className="mod7-profile-inner">
                    <div className="mod7-profile-image-holder">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="image" />
                    </div>
                    <form>
                        <h3>Your Profile</h3>
                        <div className="mod7-form-group-profile">
                            <label className='mod7-view-profile-label'>Name</label>
                            <input type="text" placeholder='First Name' className='mod7-form-control-profile' value={profileData.firstName + " " + profileData.middleName + " " + profileData.lastName} readOnly />
                        </div>
                        <div className="mod7-form-wrapper-profile">
                            <label className='mod7-view-profile-label'>Email</label>
                            <input type="text" placeholder='Email Address' className='mod7-form-control-profile' value={profileData.email} readOnly />
                        </div>
                       
                        {showChangePassword && (<>
                            <div className="mod7-form-wrapper-profile">
                                <label className='mod7-view-profile-label'>Old Password</label>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    className='mod7-form-control-profile'
                                    value={passwordFields.oldPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="mod7-form-wrapper-profile">
                                <label className='mod7-view-profile-label'>New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    className='mod7-form-control-profile'
                                    value={passwordFields.newPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="mod7-form-wrapper-profile">
                                <label className='mod7-view-profile-label'>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    className='mod7-form-control-profile'
                                    value={passwordFields.confirmPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                        </>

                        )}
                        {errorMessage && <p className="mod7-error-message">{errorMessage}</p>}
                        <div className='mod7-view-profile-buttons'>
                            
                            <button className='mod7-view-profile-button' onClick={(e) => { e.preventDefault(); toggleChangePassword(); }}>{showChangePassword ? "update" : "update password"}</button>
                           
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
