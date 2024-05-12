import React,{useState,useEffect} from 'react';
import './CommentModal.css';
import { TiTick } from "react-icons/ti";
import axios from 'axios'
import { BaseUrl } from '../../../BaseUrl';
import { GiConsoleController } from 'react-icons/gi';
const CommentModal = ({ isOpen, comments, onClose,postId,addCommentToPost}) => {
  console.log("post id is",postId);
  const [newComment, setNewComment] = useState('');
  const [addSuccess,setAddSuccess]=useState(false);

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const token = authToken ? authToken.accessToken : '';
  const userId = authToken ? parseInt(authToken.userId) : null;

  // Ensure re-render when isOpen prop changes
//   useEffect(() => {
//     setNewComment(''); // Reset new comment input field when modal opens
// }, [comments]);

if (!isOpen) return null;
  //method to show time in format like 2 days ago etc.
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    return 'Just now';
  };
  
  //add comment
  const handleSubmitComment = async () => {
    try {
      const uploadedAt = new Date();
      const commentData = {
        description: newComment,
        uploadedAt: uploadedAt,
        commentById:userId,
        postId: postId
    };
        // Make a POST request to your backend API endpoint to add the comment
        const response = await axios.post(`${BaseUrl}/api/post/add-comment`, commentData, {
          headers: {
              'Authorization':`Bearer ${token}`
          }
      });

        // Check if the comment was added successfully
        if (response.status === 201) {
            console.log('Comment added successfully:', newComment);
            // Call addCommentToPost function to update the state with the new comment
            addCommentToPost(postId, commentData);
            // Clear the input field after submission
            setNewComment('');
            // Open the comment success modal
            setAddSuccess(true);
            // Close the comment success modal after 2 seconds
            setTimeout(() => {
                setAddSuccess(false);
            }, 2000);
        } else {
            console.error('Failed to add comment');
            // Handle error case
        }
    } catch (error) {
        console.error('Error adding comment:', error.message);
        // Handle error case
    }
};

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
<div className="modal-overlay">
      <div className="comment-modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Listen, share, heal!!</h2>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-time">{formatTimeAgo(comment.uploadedAt)}</span>
              </div>
              <div className="comment-body">{comment.description}</div>
            </div>
          ))}
          {/* Always show input box for adding a comment */}
          <div className="add-comment">
            <input
              type="text"
              placeholder="Share Your Thoughts.."
              value={newComment}
              onChange={handleCommentChange}
            />
            <button onClick={handleSubmitComment} className='add-comment-submit'>Submit</button>
          </div>
        </div>
        {addSuccess && (
          <div className="success-modal-add-comment">
            <TiTick className='tick-icon-add-comment'/> Comment added successfully!!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentModal;