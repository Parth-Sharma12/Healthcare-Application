import React from 'react';
import '../ProfileDetails/ProfileDetails.css';
import Navbar from '../Navbar/Navbar';
export default function ProfileDetails() {
    return (
        // <div className='MainProfileContainer'>
        <div className="MainProfileContainer"><Navbar />
           <div className='profile-details-wrapper-admin'>
                <div className="profile-inner-admin">
                    <div className="profile-image-holder-admin">
                        <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="image" />
                    </div>
                    <form>
                        <h3>Your Profile</h3>
                        <div className="form-group-profile-admin">
                            <input type="text" placeholder='First Name' className='form-control-profile-admin' />
                            <input type="text" placeholder='Middle Name' className='form-control-profile-admin' />
                            <input type="text" placeholder='Last Name' className='form-control-profile-admin' />
                        </div>
                        <div className="form-wrapper-profile-admin">

                        </div>
                        <div className="form-wrapper-profile-admin">
                            <input type="text" placeholder='Email Address' className='form-control-profile-admin' readOnly />
                        </div>
                        <div className="form-wrapper-profile-admin">
                            <input type="text" placeholder='Mobile No.' className='form-control-profile-admin' />
                        </div>
                        <div className="form-wrapper-profile-admin">
                            <input type="text" placeholder='Address' className='form-control-profile-admin' />
                        </div>
                        <div className="form-wrapper-profile-admin">
                            <input type="text" placeholder='Consultation Fee' className='form-control-profile-admin' />
                        </div>
                        <div className="form-wrapper-profile-admin">
                            <input type="text" placeholder='Gender' className='form-control-profile-admin' />
                        </div>
                        <div className="form-wrapper-profile-admin">
                            <input type="text" placeholder='License No.' className='form-control-profile-admin' />
                        </div>
                        <div className="form-wrapper-profile-admin">
                            <input type="text" placeholder='Description' className='form-control-profile-admin' />
                        </div>
                        <div className='view-profile-buttons-admin'>
                            <button className='view-profile-button-admin'>Edit</button>
                            <button className='view-profile-button-admin'>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            /* <div className="viewProfileContainer">
                <div className="userProfile">
                    <div className="userAvatar">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt='' />
                    </div>
                    <h2 className="userName">Vivek Maltare</h2>
                    <h3 className="userEmail">maltarevivek@gmail.com</h3>
                </div> */
                /* <div className="aboutSection">
            <h2>About</h2>
            <p>
              I'm Yuki. Full Stack Designer. I enjoy creating user-centric, delightful
              and human experiences.
            </p>
          </div> */
                /* <div className="personalDetails">
                    <h1 className='personalDetailsHeading'>Personal Details</h1>
                    <div className="formField">
                        <label htmlFor="fullName" className="formLabel">Full Name</label>
                        <input readOnly type="text" id="fullName" className="formInput non-editable-field" placeholder="Enter full name" />
                    </div>
                    <div className="formField">
                        <label htmlFor="email" className="formLabel">Email</label>
                        <input type="email" id="email" className="formInput" placeholder="Enter email" />
                    </div> */
                    /* Add more personal details fields here */
                /* </div>
                <div className="addressSection"> */
                    /* <h2>Address</h2> */
                    /* <div className="formField">
                        <label htmlFor="street" className="formLabel">Street</label>
                        <input type="text" id="street" className="formInput" placeholder="Enter street" />
                    </div>
                    <div className="formField">
                        <label htmlFor="city" className="formLabel">City</label>
                        <input type="text" id="city" className="formInput" placeholder="Enter city" />
                    </div>
                    <div className="formField">
                        <label htmlFor="city" className="formLabel">City</label>
                        <input type="text" id="city" className="formInput" placeholder="Enter city" />
                    </div>
                    <div className="formField">
                        <label htmlFor="city" className="formLabel">City</label>
                        <input readOnly type="text" id="city" className="formInput non-editable-field" placeholder="Enter city" />
                    </div> */
                    /* Add more address fields here */
                /* </div>
                <div className="buttonContainer">
                    <button className="cancelButton">Cancel</button>
                    <button className="updateButton">Edit</button>
                </div>
            </div>
        </div> */
    );
}
