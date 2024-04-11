import React, { useState,useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../ViewPosts/ViewPosts.css'
import CommentModal from '../../Modals/CommentModal/CommentModal';
import { FaFlag } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { FiFlag } from "react-icons/fi";
import axios from 'axios';

export default function ViewPosts() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [postComments,setSelectedPostComments]=useState([]);
    useEffect(() => {
        // Fetch posts from the backend
        async function fetchPosts() {
            try {
                const response = await axios.get('http://localhost:8082/api/post/get-posts');
                console.log(response.data);
                setPosts(response.data); // Assuming the response contains an array of posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);
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
        // Static comments
        // const staticComments = [
        //     { author: 'User1', time: '2 hours ago', body: 'Great post!' },
        //     { author: 'User2', time: '1 hour ago', body: 'Interesting perspective.' },
        //     { author: 'User3', time: '30 minutes ago', body: 'I totally agree!' },
        // ];
        // setComments(staticComments);
        setSelectedPostComments(comments);
        setIsModalOpen(true);
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
                            <p>Uploaded By: {post.postedBy} at {formatUploadedAt(post.uploadedAt)}.</p>
                            <div className="button-flag">
                                <MdOutlineInsertComment className='comment-icon-view-posts' />
                                <button className='View-Comments' onClick={() => openModal(post.comments)}>View Comments</button>
                                <FiFlag className='flag' />
                                <button className='View-Comments'>View Comments</button>
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
        </>
    )
}
