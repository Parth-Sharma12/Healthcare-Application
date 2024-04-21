import React,{useEffect, useState} from 'react';
import './Responder_Profile.css';
import { NAV } from '../../../Moderator/components/NAV/NAV';
import axios from 'axios'
import { NAV_RESP } from '../NAV_RESP/NAV_RESP';
export default function Responder_Profile() {
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
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/api/responder/getbyid/${userId}`, {
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
                const response = await axios.put(`http://localhost:8082/api/responder/update-password`, {
                    newPassword: passwordFields.newPassword,
                    oldPassword: passwordFields.oldPassword,
                    userId : userId
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json',
                    }
                });
                alert("Password upadated successfully");
                console.log('Password updated successfully:', response.data);

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
            <NAV_RESP/>
            <div className='resp7-profile-details-wrapper'>
                <div className="resp7-profile-inner">
                    <div className="resp7-profile-image-holder">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="image" />
                    </div>
                    <form>
                        <h3>Your Profile</h3>
                        <div className="resp7-form-group-profile">
                            <label className='resp7-view-profile-label'>Name</label>
                            <input type="text" placeholder='First Name' className='resp7-form-control-profile' value={profileData.firstName + " " + profileData.middleName + " " + profileData.lastName} readOnly />
                        </div>
                        <div className="resp7-form-wrapper-profile">
                            <label className='resp7-view-profile-label'>Email</label>
                            <input type="text" placeholder='Email Address' className='resp7-form-control-profile' value={profileData.email} readOnly />
                        </div>
                       
                        {showChangePassword && (<>
                            <div className="resp7-form-wrapper-profile">
                                <label className='resp7-view-profile-label'>Old Password</label>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    className='resp7-form-control-profile'
                                    value={passwordFields.oldPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="resp7-form-wrapper-profile">
                                <label className='resp7-view-profile-label'>New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    className='resp7-form-control-profile'
                                    value={passwordFields.newPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                            <div className="resp7-form-wrapper-profile">
                                <label className='resp7-view-profile-label'>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    className='resp7-form-control-profile'
                                    value={passwordFields.confirmPassword}
                                    onChange={handleChangePasswordFields}
                                />
                            </div>
                        </>

                        )}
                        {errorMessage && <p className="resp7-error-message">{errorMessage}</p>}
                        <div className='resp7-view-profile-buttons'>
                            
                            <button className='resp7-view-profile-button' onClick={(e) => { e.preventDefault(); toggleChangePassword(); }}>{showChangePassword ? "update" : "update password"}</button>
                           
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
