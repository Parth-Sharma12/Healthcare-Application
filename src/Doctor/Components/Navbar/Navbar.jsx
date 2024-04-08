import React,{useState} from 'react'
import './Navbar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"
export default function Navbar() {
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
