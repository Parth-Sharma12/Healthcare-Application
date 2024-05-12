import React,{useState,useEffect} from 'react'
import CommentModal from '../../Modals/CommentModal/CommentModal';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar'
import '../ViewPosts/ViewPosts.css'
import { TiTick } from "react-icons/ti";
import { FaComments } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {BaseUrl} from '../../../BaseUrl'
export default function YourPosts() {
    const [postComments, setSelectedPostComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postId,setPostId]=useState(null);

    //getting user token 
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const userId = authToken ? parseInt(authToken.userId) : null;
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

    const handleDeletePost = async (postId) => {
        console.log("post id in your post is",postId);
        try {
            const response = await axios.delete(`${BaseUrl}/api/post/delete/${postId}`,{
                data:{"userId":userId},
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                console.log('Post has been deleted successfully!');
                // Filter out the deleted post from the posts array
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            }
        } catch (error) {
            console.error('Error deleting post:', error.message);
            console.log('Failed to delete post. Please try again.');
        }
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
                                <FaComments className='comment-icon-view-posts' onClick={() => openModal(post.comments,post.id)} />
                                <p className='view-comment-para'>View Comments</p>
                                {userId === post.postedBy && (
                                    <>
                                    <MdDelete className='comment-icon-view-posts'  onClick={() => handleDeletePost(post.id)}/>
                                    <p className='view-comment-para'>Delete Post</p>
                                    </>
                                )}
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
            />
        </>
  )
}
