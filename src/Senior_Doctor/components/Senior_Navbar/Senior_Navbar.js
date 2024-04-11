import React,{useState} from 'react'
import './Senior_Navbar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"
export default function Senior_Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
      };
    const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
    <nav className='Senior-main-nav-class'>
        {/* the navbar is divided in three parts first one=logo */}
        <div className='Senior-logo'>
            <h2>
                <span>T</span>ranquil
                <span>M</span>inds
            </h2>
        </div>
        {/* second one is for all links */}
        <div className={
            showMediaIcons ? "Senior-nav-links Senior-mobile-menu-link" : "Senior-nav-links"
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
        <div className='Senior-media-links'>
            <ul className='Senior-ul-links-desktop'>
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
            <div className="Senior-hamburger-menu">
            <Link to="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu />
            </Link>
            </div>
        </div>
    </nav>
    </>
  )
}
