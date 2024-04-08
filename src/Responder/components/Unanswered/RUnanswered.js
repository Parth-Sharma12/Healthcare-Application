import React from 'react'
import './RUnanswered.css';
import AnsweringCard from '../AnsweringCard/RAnsweringCard';
import { Link } from 'react-router-dom';
export const RUnanswered = () => {
  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };
  return (
    <div className="resp2-app-container">
    {/* Navbar */}
    <nav className="resp2-navbar  ">
    {/* <img className = "resp2-logo" src="images/logo.png" alt="Logo" /> */}
      <a className="resp2-navbar-brand" href="#" style={linkStyle}>Tranquil Minds</a>
      

      <div className="resp2-collapse" id="navbarSupportedContent">
        <ul className="resp2-navbar-nav">

          <li className="resp2-nav-item">
            <a className="resp2-nav-link" href="#"> <Link to="/home" style={linkStyle}>Home</Link></a>
          </li>
          <li className="resp2-nav-item">
            <a className="resp2-nav-link" href="#" style={linkStyle}><b>View Posts</b></a>
          </li>
          
        
        </ul>

      </div>
    </nav>
    <div className='resp2-Main-content1'>
   <div className='resp2-img_responder'>
    <img className="resp2-moving-img" src="images/unanswered3.png" alt="Moving Img" />
    </div>
    <div className='resp2-unanswered-ques'>
      <AnsweringCard question = "What are the ways to avoid obesity?" username = "Vivek-Maltare"></AnsweringCard>
      <AnsweringCard question = "What are the ways to avoid Heart Problems?" username = "parth-sharma"></AnsweringCard>
    </div>
    </div>


  </div>
)
};
