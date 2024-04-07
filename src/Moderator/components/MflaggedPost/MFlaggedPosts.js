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
        <div className="app-container">
            {/* Navbar */}
            <nav class="navbar navbar-expand-lg ">
                <img class="logo" src="images/logo.png" alt="Logo" />
                <a class="navbar-brand" href="#">Tranquil Minds</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"> <Link to="/QnA" style={linkStyle}>QnA's</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"> <Link to="/profile_moderator" style={linkStyle}>Profile</Link></a>
                        </li>   

                    </ul>

                </div>
            </nav>
            <div className='main-content1'>
                <div className='img'>
                <img className = "flag-img" src="images/flag.png" alt="Column 1 Image" />
                </div>
                
                <div className='Posts'>
                {flaggedPosts.map((post, index) => (
                    <div className="column" key={index}>
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
                <div className='box'>
          <h3>Number of Flagged Posts</h3>
          <div className='circle'>{numberOfFlaggedPosts}</div>
        </div>

            </div>
        </div>

    );
}
