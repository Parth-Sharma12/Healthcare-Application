import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../ViewPosts/ViewPosts.css'
import CommentModal from '../../Modals/CommentModal/CommentModal';
import { FaFlag } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { FiFlag } from "react-icons/fi";
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import {BaseUrl} from '../../../BaseUrl'
export default function ViewPosts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [postComments, setSelectedPostComments] = useState([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    //getting user token 
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const token = authToken ? authToken.accessToken : '';
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
    const openModal = (comments) => {
        setSelectedPostComments(comments);
        setIsModalOpen(true);
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
                                <MdOutlineInsertComment className='comment-icon-view-posts' />
                                <button className='View-Comments' onClick={() => openModal(post.comments)}>View Comments</button>
                                <FiFlag className='flag' />
                                <button className='View-Comments' onClick={() => handleFlagPost(post.id)}>Flag</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <CommentModal
                isOpen={isModalOpen}
                comments={postComments}
                onClose={() => setIsModalOpen(false)}
            />
            {isSuccessModalOpen && (
                <div className="success-modal">
                    <TiTick className='tick-icon'/> Successfully flagged post!!
                </div>
            )}

        </>
    )
}
