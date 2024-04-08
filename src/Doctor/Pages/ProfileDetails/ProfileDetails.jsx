import React from 'react';
import '../ProfileDetails/ProfileDetails.css';
import Navbar from '../../Components/Navbar/Navbar';

export default function ProfileDetails() {
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
                            <input type="text" placeholder='First Name' className='form-control-profile' />
                            <input type="text" placeholder='Middle Name' className='form-control-profile' />
                            <input type="text" placeholder='Last Name' className='form-control-profile' />
                        </div>
                        <div className="form-wrapper-profile">

                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Email Address' className='form-control-profile' readOnly />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Mobile No.' className='form-control-profile' />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Address' className='form-control-profile' />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Consultation Fee' className='form-control-profile' />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Gender' className='form-control-profile' />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='License No.' className='form-control-profile' />
                        </div>
                        <div className="form-wrapper-profile">
                            <input type="text" placeholder='Description' className='form-control-profile' />
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
