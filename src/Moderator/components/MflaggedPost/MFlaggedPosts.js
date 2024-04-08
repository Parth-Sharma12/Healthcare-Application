import React from 'react'
import './MFlaggedPosts.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PostCard from '../PostCard/MPostCard';
export const MFlaggedPosts = () => {
    const numberOfFlaggedPosts = 2;
    const flaggedPosts = [
        {
            title: 'Fast Food',
            description: 'Fast food refers to easily prepared and quickly served meals that are often consumed on the go. It has become an integral part of modern society, offering convenience and accessibility to people with busy lifestyles. The popularity of fast food is attributed to factors such as speed, affordability, and widespread availability. While it has its advantages, there are also concerns about its impact on health, the environment, and overall well-being.',
            imageSrc: '/images/adminprofile.png',
            userName: 'Rahul Sharma',
            postTime: '4/5/24 6:44 ',
        },
        {
            title: 'Heart Disease',
            description: 'Heart disease, also known as cardiovascular disease, refers to a range of conditions that affect the heart. These conditions can involve the blood vessels, such as coronary artery disease, or the heart muscle itself, such as cardiomyopathy. Heart disease can lead to serious complications, including heart attack, heart failure, or stroke.',
            imageSrc: '/images/adminpanel.png',
            userName: 'Avinash jain',
            postTime: '4/5/24 12:31 ',
        },
        // Add more posts as needed
    ];
    const handleUnflag = (index) => {
        // Perform unflag action
        console.log(`Unflag post ${index}`);
        // Show alert
        alert('Post unflagged successfully');
    };
 
    const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };
    return (
        <div className="mod1-app-container">
            {/* Navbar */}
            <nav className="mod1-navbar ">
               
                <a className="mod1-navbar-brand"  style={linkStyle} href="#">Tranquil Minds</a>
               

                <div className="mod1-collapse mod1-navbar-collapse" id="navbarSupportedContent">
                    <ul className="mod1-navbar-nav mr-auto">

                        <li className="mod1-nav-item">
                            <a className="mod1-nav-link"  style={linkStyle} href="#">Home</a>
                        </li>
                        
                        <li className="mod1-nav-item">
                            <a className="mod1-nav-link" href="#"> <Link to="/QnA" style={linkStyle}>QnA's</Link></a>
                        </li>
                        <li className="mod1-nav-item">
                            <a className="mod1-nav-link" href="#"> <Link to="/profile_moderator" style={linkStyle}>Profile</Link></a>
                        </li>  
                        <li className="mod1-nav-item">
                            <a className="mod1-nav-link"  style={linkStyle} href="/">Logout</a>
                        </li> 

                    </ul>

                </div>
            </nav>
            <div className='mod1-main-content1'>
                <div className='mod1-img'>
                <img className = "mod1-flag-img" src="images/flag.png" alt="Column 1 Image" />
                </div>
                
                <div className='mod1-Posts'>
                {flaggedPosts.map((post, index) => (
                    <div className="mod1-column" key={index}>
                        <PostCard
                            key={index} // Make sure to use a unique key for each post
                            title={post.title}
                            description={post.description}
                            imageSrc={post.imageSrc}
                            userName={post.userName}
                            postTime={post.postTime}
                            onDisable={() => console.log(`Disable post ${index}`)} // Add your disable post function
                            onUnflag={()  => handleUnflag(index)} // Add your unflag post function
                        />
                        </div>
                    ))} 
                </div>
                <div className='mod1-box'>
          <h3>Number of Flagged Posts</h3>
          <div className='mod1-circle'>{numberOfFlaggedPosts}</div>
        </div>

            </div>
        </div>

    );
}
