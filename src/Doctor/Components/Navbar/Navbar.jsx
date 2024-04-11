import React,{useState,useEffect} from 'react'
import './Navbar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from 'axios';
export default function Navbar() {
    //fetch doctor details to as props to other pages where needed
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const userId = authToken ? parseInt(authToken.userId) : null;
    const token = authToken ? authToken.accessToken : '';
    const fetchDoctorDetails = async (doctorId) => {
        try {
          const response = await axios.get(`http://localhost:8082/api/doctor/doctorbyid/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
              }
          });
          console.log(response.data);
        }
         catch (error) {
          console.error('Error fetching doctor details:', error);
          return null;
        }
      };
      useEffect(() => {
        fetchDoctorDetails();
      }, []);
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
      };
    const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
    <nav className='main-nav-class'>
        {/* the navbar is divided in three parts first one=logo */}
        <div className='logo'>
            <h2>
                <span>T</span>ranquil
                <span>M</span>inds
            </h2>
        </div>
        {/* second one is for all links */}
        <div className={
            showMediaIcons ? "nav-links mobile-menu-link" : "nav-links"
          }>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                <Link to="/addposts">Add Posts</Link>
                </li>
                <li>
                <Link to="/ViewPosts">Forums</Link>
                </li>
                <li>
                <Link to="/viewprofile">Profile</Link>
                </li>
            </ul>
        </div>
        {/* third one is social media links for now */}
        <div className='media-links'>
            <ul className='ul-links-desktop'>
                <li>
                <Link to="/" onClick={handleLogout}><p>Logout</p></Link>
                </li>
                <li>
                <FaUser style={{color:'#BC7FCD'}}/>
                </li>
                <li>
                    {/* <Link to="/"><FaFacebook/></Link> */}
                </li>
            </ul>
            <div className="hamburger-menu">
            <Link to="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu />
            </Link>
            </div>
        </div>
    </nav>
    </>
  )
}
