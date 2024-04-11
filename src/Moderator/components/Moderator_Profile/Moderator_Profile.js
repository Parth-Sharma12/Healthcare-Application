import React,{useEffect} from 'react';
import './Moderator_Profile.css';
import { NAV } from '../NAV/NAV';
import axios from 'axios'
export default function Moderator_Profile() {
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
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    return (
        <>
            <NAV />
            <div className='mod5-profile-details-wrapper'>
                <div className="mod5-profile-inner">
                    <div className="mod5-profile-image-holder">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="image" />
                    </div>
                    <form>
                        <h3>Your Profile</h3>
                        <div className="mod5-form-group-profile">
                            <input type="text" placeholder='First Name' className='mod5-form-control-profile' />
                            <input type="text" placeholder='Middle Name' className='mod5-form-control-profile' />
                            <input type="text" placeholder='Last Name' className='mod5-form-control-profile' />
                        </div>
                        <div className="mod5-form-wrapper-profile">

                        </div>
                        <div className="mod5-form-wrapper-profile">
                            <input type="text" placeholder='Email Address' className='mod5-form-control-profile' readOnly />
                        </div>
                        <div className="mod5-form-wrapper-profile">
                            <input type="text" placeholder='Mobile No.' className='mod5-form-control-profile' />
                        </div>
                        <div className="mod5-form-wrapper-profile">
                            <input type="text" placeholder='Address' className='mod5-form-control-profile' />
                        </div>
                        <div className="mod5-form-wrapper-profile">
                            <input type="text" placeholder='Consultation Fee' className='mod5-form-control-profile' />
                        </div>
                        <div className="mod5-form-wrapper-profile">
                            <input type="text" placeholder='Gender' className='mod5-form-control-profile' />
                        </div>
                        <div className="mod5-form-wrapper-profile">
                            <input type="text" placeholder='License No.' className='mod5-form-control-profile' />
                        </div>
                        <div className="mod5-form-wrapper-profile">
                            <input type="text" placeholder='Description' className='mod5-form-control-profile' />
                        </div>
                        <div className='mod5-view-profile-buttons'>
                            <button className='mod5-view-profile-button'>Edit</button>
                            <button className='mod5-view-profile-button'>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
