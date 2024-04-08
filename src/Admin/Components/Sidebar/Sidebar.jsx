import React from 'react'
import '../Sidebar/Sidebar.css'
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom'
export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
  };
  return (
    <div className='mainSidebarContainer'>
      <div>
        <ul className='ulContainer'>
          <h4 className='menu'>Menu</h4>
          <li className='liContainer'>
            <FaHome className='sidebarIcons' />
            <Link to='/home' style={{ textDecoration: 'none' }}><p className='itemNames'>Home</p></Link>
          </li>
          <li className='liContainer'>
            <FaUser className='sidebarIcons' />
            <Link to='/doctors' style={{ textDecoration: 'none' }}><p className='itemNames'>Doctors</p></Link>
          </li>
          <li className='liContainer'>
            <FaUser className='sidebarIcons' />
            <Link to='/moderators' style={{ textDecoration: 'none' }}><p className='itemNames'>Moderators</p></Link>
          </li>
          <li className='liContainer'>
            <FaUser className='sidebarIcons' />
            <Link to='/responders' style={{ textDecoration: 'none' }}><p className='itemNames'>Responders</p></Link>
          </li>
          <li className='liContainer'>
            <IoLogOut className='sidebarIcons' />
            <Link to="/" onClick={handleLogout} style={{ textDecoration: 'none' }}><p className='itemNames'>Logout</p></Link>
          </li>
        </ul>
        <div className='mainScheduledContainer'>
          <h4 className='RequestTitle'>Requests</h4>
          <div className="RequestContainer">
            <Link to="/Requests">View Requests</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
