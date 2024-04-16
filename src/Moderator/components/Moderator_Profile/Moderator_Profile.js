import React, { useEffect, useState } from 'react';
import './Moderator_Profile.css';
import { NAV } from '../NAV/NAV';
import axios from 'axios'
export default function Moderator_Profile() {
    const [profileData, setProfileData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        user: {
            email: ""
        },

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
        
            const response = await axios.get(`http://localhost:8082/api/moderator/getbyid/${userId}`, {
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
            <NAV />
            <div className='mod7-profile-details-wrapper'>
                <div className="mod7-profile-inner">
                    <div className="mod7-profile-image-holder">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="image" />
                    </div>
                    <form>
                        <h3>Your Profile</h3>

                        <div className="mod7-form-wrapper-profile">
                            <input
                                type="text"
                                placeholder='Name'
                                className='mod7-form-control-profile'
                                readOnly
                                value={profileData.firstName && profileData.middleName && profileData.lastName ? profileData.firstName + " " + profileData.middleName + " " + profileData.lastName : ''}
                            />
                        </div>
                        <div className="mod7-form-wrapper-profile">
                            <input type="text" placeholder='Email Address' className='mod7-form-control-profile' readOnly value={profileData.email} />
                        </div>

                        <div className='mod7-view-profile-buttons'>
                            <button className='mod7-view-profile-button'>Edit</button>
                            <button className='mod7-view-profile-button'>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
