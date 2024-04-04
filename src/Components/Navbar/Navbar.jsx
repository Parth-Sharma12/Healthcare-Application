import React,{useState} from 'react'
import './Navbar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import {Link} from 'react-router-dom'
import { FaUser } from "react-icons/fa"
export default function Navbar() {
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
                    <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/temp">Forums</Link>
                </li>
                <li>
                <Link to="/temp">Add Posts</Link>
                </li>
                <li>
                <Link to="/ViewPosts">View Posts</Link>
                </li>
            </ul>
        </div>
        {/* third one is social media links for now */}
        <div className='media-links'>
            <ul className='ul-links-desktop'>
                <li>
                    {/* <Link to="/"><FaFacebook/></Link> */}
                </li>
                <li>
                <Link to="/"><p>Your Profile</p></Link>
                </li>
                <li>
                <FaUser style={{color:'#BC7FCD'}}/>
                </li>
            </ul>
            <div className="hamburger-menu">
            <Link to="/" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu />
            </Link>
            </div>
        </div>
    </nav>
    </>
  )
}
