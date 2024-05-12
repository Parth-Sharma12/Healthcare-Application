import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../ViewPosts/ViewPosts.css'
import CommentModal from '../../Modals/CommentModal/CommentModal';
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { FaComments } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";
import {BaseUrl} from '../../../BaseUrl'
export default function ViewPosts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    // const [comments, setComments] = useState([]);
    const [postComments, setSelectedPostComments] = useState([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [postId,setPostId]=useState(null);
    //getting user token 
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const userId = authToken ? parseInt(authToken.userId) : null;
    const token = authToken ? authToken.accessToken : '';

    const addCommentToPost = (postId, comment) => {
        console.log("function called");
        // Find the post in the state and update its comments
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, comments: [...post.comments, comment] };
            }
            return post;
        });
        console.log("updated posts are",updatedPosts);
        setPosts(updatedPosts);
    };

    useEffect(() => {
        // Fetch posts from the backend
        async function fetchPosts() {
            try {
                const response = await axios.get(`${BaseUrl}/api/post/get-posts`);
                console.log(response.data);
                setPosts(response.data); // Assuming the response contains an array of posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);

    const handleFlagPost = async (postId) => {
        try {
            const response = await axios.put(`${BaseUrl}/api/post/flag/${postId}`, true, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Post has been flagged successfully!');
                openSuccessModal();
            }
        } catch (error) {
            console.error('Error flagging post:', error.message);
            console.log('Failed to flag post. Please try again.');
        }
    };

    const formatUploadedAt = (dateString) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };
    const openModal = (comments,postId) => {
        setSelectedPostComments(comments);
        setIsModalOpen(true);
        setPostId(postId);
    };
    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
            setIsSuccessModalOpen(false);
        }, 2000); // Close the modal after 2 seconds
    };

    return (
        <>
            <Navbar />
            <div className="post-card-doc-container">
                {posts.map(post => (
                    <div className="post-card-doc" key={post.id}>
                        <img src={post.image} alt="" />
                        <div className="card-content">
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                            <p>Uploaded By: {post.name} at {formatUploadedAt(post.uploadedAt)}.</p>
                            <div className="button-flag">
                            <p className='view-comment-para'>{post.flagged}</p><IoFlagSharp className='flag' onClick={() => handleFlagPost(post.id)}/>
                                <FaComments className='comment-icon-view-posts' onClick={() => openModal(post.comments,post.id)} />
                                <p className='view-comment-para'>View Comments</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <CommentModal
                isOpen={isModalOpen}
                comments={postComments}
                onClose={() => setIsModalOpen(false)}
                postId={postId}
                addCommentToPost={addCommentToPost}
            />
            {isSuccessModalOpen && (
                <div className="success-modal">
                    <TiTick className='tick-icon'/> Successfully flagged post!!
                </div>
            )}

        </>
    )
}
