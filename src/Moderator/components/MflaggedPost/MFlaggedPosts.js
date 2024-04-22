import React from 'react'
import './MFlaggedPosts.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { NAV } from '../NAV/NAV';
import PostCard from '../PostCard/MPostCard';
export const MFlaggedPosts = () => {
    const [flaggedPosts, setFlaggedPosts] = useState([]);

    useEffect(() => {
        // Fetch data from the database
        fetchFlaggedPosts();
    }, []);
    const handleLogout = () =>{
        localStorage.removeItem("authToken");
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
    // Redirect to the login page or any other appropriate page after logout
    
    }
    const fetchFlaggedPosts = async () => {
        try {

            // Get the authentication token from wherever it's stored in your application
            const authToken = JSON.parse(localStorage.getItem("authToken"));
            const token = authToken ? authToken.accessToken : '';
            console.log(token);
            
            const userId = parseInt(authToken.userId);
            // Make an HTTP GET request to fetch flagged posts from the database
            const response = await fetch('http://192.168.198.236:8082/api/moderator/flagged-posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Include the auth token in the header
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch flagged posts',response.error);
            }
    
            const data = await response.json();
            // Ensure that each post object includes the uploaded_at property
            // Filter the flagged posts where post.flagged > 0
            const Flaggeddata = data.filter(post => post.flagged > 0);
            // Sort flagged posts in decreasing order of flagged values
            Flaggeddata.sort((a, b) => b.flagged - a.flagged);

            console.log(data);
          
            setFlaggedPosts(Flaggeddata);
        } catch (error) {
            console.error('Error fetching flagged posts:', error);
        }
    };
    const handleUnflag  = async (postId) =>{
        try {
            const authToken = JSON.parse(localStorage.getItem("authToken"));
            const token = authToken ? authToken.accessToken : '';
            console.log(authToken);
            
            const userId = parseInt(token.userId);
            // Make an HTTP PUT request to update the flagged status of the post
            const response = await fetch(`http://192.168.198.236:8082/api/moderator/unflag/${postId}`, {
               method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              },
              body: JSON.stringify(false) // Set flagged status to 0
            });
      
            if (!response.ok) {
              throw new Error('Failed to unflag post');
            }
      
            // Remove the post from the state
            const updatedPosts = flaggedPosts.filter(post => post.id !== postId);
            setFlaggedPosts(updatedPosts);
            // Show alert
            alert('Post unflagged successfully');
          } catch (error) {
            console.error('Error unflagging post:', error);
          }
        };
        const handleDisable  = async (postId) =>{
            try {
                const authToken = JSON.parse(localStorage.getItem("authToken"));
                const token = authToken ? authToken.accessToken : '';
                console.log(authToken);
                
                const userId = parseInt(token.userId);
                // Make an HTTP PUT request to update the flagged status of the post
                const response = await fetch(`http://192.168.198.236:8082/api/moderator/disable/${postId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                  },
                  body: JSON.stringify(true) // Set flagged status to 0
                });
          
                if (!response.ok) {
                  throw new Error('Failed to disable post');
                }
          
                // Remove the post from the state
                const updatedPosts = flaggedPosts.filter(post => post.id !== postId);
                setFlaggedPosts(updatedPosts);
                // Show alert
                alert('Post Disabled successfully');
              } catch (error) {
                console.error('Error disabling post:', error);
              }
            };
 
    const linkStyle = {
    color: 'black',
    textDecoration: 'none',
  };
    return (
        <div className="mod1-app-container">
            {/* Navbar */}
            <NAV/>
            <div className='mod1-main-content1'>
                <div className='mod1-img'>
                <img className = "mod1-flag-img" src="images/flag.png" alt="Column 1 Image" />
                </div>
                
                <div className='mod1-Posts'>
                {flaggedPosts.map((post) => (
                    <div className="mod1-column" key={post.id}>
                        
                        <PostCard
                            Comments = {post.comments}
                            title={post.title}
                            description={post.description}
                            imageSrc={post.image}
                            userName={post.name}
                            uploaded_at={post.uploadedAt}
                            onDisable={() => handleDisable(post.id)} // Add your disable post function
                            onUnflag={()  => handleUnflag(post.id)} // Add your unflag post function
                        />
                        </div>
                    ))} 
                </div>
                <div className='mod1-box'>
          <h3 className='mod1-heading-big'>Number of Flagged Posts</h3>
          <div className='mod1-circle'>{flaggedPosts.length}</div>
        </div>

            </div>
        </div>

    );
}
