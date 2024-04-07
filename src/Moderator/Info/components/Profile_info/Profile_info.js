import React from 'react';
import { useState } from 'react';
import './Profile_info.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Profile_info = () => {
  const [showModal, setShowModal] = useState(false);



  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {

    setShowModal(false);
  };
  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg ">
        <img className="logo" src="images/logo.png" alt="Logo" />
        <a className="navbar-brand" href="#">Tranquil Minds</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item">
              <a><Link to="/home" style={linkStyle}>Home</Link></a>

            </li>
            <span onClick={handleShowModal} style={{ cursor: 'pointer' }}>
              Requests
            </span>

         

          </ul>

        </div>
      </nav>
      <div className='main-content'>

        <div className="vertical-column">

        </div>
        <div className='theme'>
          <img className="adminprofile" src="/images/adminprofile.png" alt="" />
        </div>
        {/* PROFILE CARD */}
        <div className="card_profile">
          <div className="card-header">Profile</div>
          <div className="card-body text-center">

            <img className="img-account-profile rounded-circle mb-2" src="/images/Profile_pic.jpeg" alt="" />

            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

            <button className="btn btn-primary" type="button">Upload new image</button>
            <div className="profile-info">
              <p><b>Name</b>: Parth Sharma</p>
              <p><b>Email</b>: sharmaparth1208@gmail.com</p>
              <p><b>Contact Number</b>: (123) 456-7890</p>
              <p><b> Age </b>: 22</p>
              <p><b>Gender</b>: Male</p>
            </div>
          </div>
        </div>


      </div>
    </div >
  );
}