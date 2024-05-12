import React, { useState } from 'react';
import '../ProfileDetails/ProfileDetails.css';
import Navbar from '../Navbar/Navbar';
import { BaseUrl } from '../../../BaseUrl'
import axios from 'axios';
export default function ProfileDetails(props) {
    const formType = props.formType;
    const [successMessage, setSuccessMessage] = useState('');
    const [failureMessage, setfailureMessage] = useState('');

      const authTokenString = localStorage.getItem('authToken');
      const authToken = JSON.parse(authTokenString);
      const accessToken = authToken.accessToken;

    //data to send while adding moderators and responders
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
    });

    //function to handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //function to handle form submit based on the if we are adding responder or moderator
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formType === 'AddModerator') {
                await handleAddModerator();
            } else if (formType === 'AddResponder') {
                await handleAddResponder();
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    //handel cancel
    const handleCancel = () => {
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            password: ''
        });
    };

    //function to add moderator
    const handleAddModerator = async (data) => {
        try {
            const response = await axios.post(`${BaseUrl}/api/admin/add-moderator`, {
                user: {
                    email: formData.email,
                    password: formData.password
                },
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                password: ''
            });
            // Display success message
            setSuccessMessage('Moderator has been added successfully.');
        // Clear success message after 2 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
            // Handle success response
        } catch (error) {
            console.error('Error adding moderator:', error);
            // Display success message
            setfailureMessage('Some problem occured....Retry again after sometime.');
            // Clear failure message after 2 seconds
            setTimeout(() => {
                setfailureMessage('');
            }, 2000);
            // Handle error
        }
    };

    //function to add responder
    const handleAddResponder = async (data) => {
        try {
            const response = await axios.post(`${BaseUrl}/api/admin/add-responder`, {
                user: {
                    email: formData.email,
                    password: formData.password
                },
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                password: ''
            });
            // Display success message
            setSuccessMessage('Responder has been added successfully.');
        // Clear success message after 2 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
            // Handle success response
        } catch (error) {
            console.error('Error adding responder:', error);
            // Display success message
            setfailureMessage('Some problem occured....Retry again after sometime.');
        // Clear failure message after 2 seconds
        setTimeout(() => {
            setfailureMessage('');
        }, 2000);
            // Handle error
        }
    };

    return (
        // <div className='MainProfileContainer'>
        <div className="MainProfileContainer"><Navbar />
            <div className='profile-details-wrapper-admin'>
                {formType === 'Profile' && (
                    <>
                        <div className="profile-inner-admin">
                            <div className="profile-image-holder-admin">
                                <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="" />
                            </div>
                            <form>
                                <h3>{formType === 'Profile' ? 'Your Profile' : formType === 'AddModerator' ? 'Add Moderator' : 'Add Responder'}</h3>
                                <div className="form-group-profile-admin">
                                    <input type="text" placeholder='First Name' className='form-control-profile-admin' value="Smit" />
                                    <input type="text" placeholder='Middle Name' className='form-control-profile-admin' value="Kumar" />
                                    <input type="text" placeholder='Last Name' className='form-control-profile-admin' value="Mehta" />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='Email Address' className='form-control-profile-admin' value="admin@gmail.com" readOnly />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='Mobile No.' className='form-control-profile-admin' value="9617077335" />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='Address' className='form-control-profile-admin' value="Ahmedabad" />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='DOB' className='form-control-profile-admin' value="23/10/2000"/>
                                </div>
                                {/* <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='Gender' className='form-control-profile-admin' />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='License No.' className='form-control-profile-admin' />
                                </div> */}
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='Description' className='form-control-profile-admin' value="Administrator"/>
                                </div>
                                <div className='view-profile-buttons-admin'>
                                    <button className='view-profile-button-admin'>Edit</button>
                                    <button className='view-profile-button-admin'>cancel</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
                {(formType === 'AddModerator' || formType === 'AddResponder') && (
                    <>
                        <div className="profile-inner-admin">
                            <div className="profile-image-holder-admin">
                                <img src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg" alt="" />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <h3>{formType === 'Profile' ? 'Your Profile' : formType === 'AddModerator' ? 'Add Moderator' : 'Add Responder'}</h3>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='First Name' name="firstName" value={formData.firstName} onChange={handleChange} className='form-control-profile-admin' />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='Middle Name' name="middleName" value={formData.middleName} onChange={handleChange} className='form-control-profile-admin' />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="text" placeholder='Last Name' name="lastName" value={formData.lastName} onChange={handleChange} className='form-control-profile-admin' />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="email" placeholder='Email Address' name='email' value={formData.email} onChange={handleChange} className='form-control-profile-admin' />
                                </div>
                                <div className="form-wrapper-profile-admin">
                                    <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange} className='form-control-profile-admin' />
                                </div>
                                {(successMessage && !failureMessage) && (
                                    <p className="success-message-add-admin">{successMessage}</p>
                                )}

                                {failureMessage && (
                                    <p className="failure-message-add-admin">{failureMessage}</p>
                                )}

                                <div className='view-profile-buttons-admin'>
                                    <button type='submit' className='view-profile-button-admin'>Add</button>
                                    <button onClick={handleCancel} className='view-profile-button-admin'>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
