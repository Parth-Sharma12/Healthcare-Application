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
    <div className="app-container">
    {/* Navbar */}
    <nav class="navbar navbar-expand-lg ">
    <img class = "logo" src="images/logo.png" alt="Logo" />
      <a class="navbar-brand" href="#">Tranquil Minds</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
            <a class="nav-link" href="#"> <Link to="/home" style={linkStyle}>Home</Link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><b>View Posts</b></a>
          </li>
          
        
        </ul>

      </div>
    </nav>
    <div className='Main-content1'>
   <div className='img_responder'>
    <img className="moving-img" src="images/unanswered3.png" alt="Moving Img" />
    </div>
    <div className='unanswered-ques'>
      <AnsweringCard question = "What are the ways to avoid obesity?" username = "Vivek-Maltare"></AnsweringCard>
      <AnsweringCard question = "What are the ways to avoid Heart Problems?" username = "parth-sharma"></AnsweringCard>
    </div>
    </div>


  </div>
)
};
