import React from 'react';
import '../ProfileDetails/ProfileDetails.css';
import Navbar from '../../Components/Navbar/Navbar';

export default function ProfileDetails() {
    return (
        <div className='MainProfileContainerdoc'>
            <Navbar />
            <div className="viewProfileContainerdoc">
                <div className="userProfiledoc">
                    <div className="userAvatardoc">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt='' />
                    </div>
                    <h2 className="userNamedoc">Vivek Maltare</h2>
                    <h3 className="userEmaildoc">doctor@gmail.com</h3>
                </div>
                {/* <div className="aboutSectiondoc">
            <h2>About</h2>
            <p>
              I'm Yuki. Full Stack Designer. I enjoy creating user-centric, delightful
              and human experiences.
            </p>
          </div> */}
                <div className="personalDetailsdoc">
                    <h1 className='personalDetailsHeadingdoc'>Personal Details</h1>
                    <div className="formField">
                        <label htmlFor="fullName" className="formLabeldoc">Full Name</label>
                        <input readOnly type="text" id="fullName" className="formInputdoc non-editable-field-doc" placeholder="Vivek Maltare" />
                    </div>
                    <div className="formField">
                        <label htmlFor="email" className="formLabeldoc">Email</label>
                        <input type="email" id="email" className="formInputdoc" placeholder="maltarevivek@gmail.com" />
                    </div>
                    {/* Add more personal details fields here */}
                </div>
                <div className="addressSectiondoc">
                    {/* <h2>Address</h2> */}
                    <div className="formField">
                        <label htmlFor="street" className="formLabeldoc">Street</label>
                        <input type="text" id="street" className="formInputdoc" placeholder="24,Churchhill Road" />
                    </div>
                    <div className="formField">
                        <label htmlFor="city" className="formLabeldoc">City</label>
                        <input type="text" id="city" className="formInputdoc" placeholder="London" />
                    </div>
                    <div className="formField">
                        <label htmlFor="city" className="formLabeldoc">Age</label>
                        <input type="text" id="city" className="formInputdoc" placeholder="33" />
                    </div>
                    <div className="formField">
                        <label htmlFor="city" className="formLabeldoc">Gender</label>
                        <input readOnly type="text" id="city" className="formInputdoc non-editable-field-doc-doc" placeholder="Male" />
                    </div>
                    {/* Add more address fields here */}
                </div>
                <div className="buttonContainerdoc">
                    <button className="cancelButtondoc">Cancel</button>
                    <button className="updateButtondoc">Edit</button>
                </div>
            </div>
        </div>
    );
}
