import React,{useState,useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../AddPost/AddPost.css'
import axios from 'axios'
import {BaseUrl} from '../../../BaseUrl'
export default function AddPost() {
    //add a post backend logic 
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postImage, setPostImage] = useState(null);
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const userId = authToken ? parseInt(authToken.userId) : null;
    const token = authToken ? authToken.accessToken : '';
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postImage) {
            console.error('Please select an image');
            return;
        }

        try {
            const base64Image = await convertImageToBase64(postImage);
            //console.log(base64Image);
            const uploadedTime = new Date();
            const uploadedAtString = uploadedTime.toISOString().slice(0, -1) + '+00:00';
            // Prepare post data
            const postData = {
                title: postTitle,
                description: postDescription,
                name:"john vivek",
                image: base64Image,
                flagged: 0,
                isApproved: false,
                isDisabled: false,
                comments:[],
                uploadedAt:uploadedTime,
                postedBy:userId
            };
            //console.log(postData);
            // Send POST request to backend
            const response = await axios.post(`${BaseUrl}/api/post/add-post`, postData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json',
                  }
            });
            console.log(response.data); // Handle response if needed

            // Reset form fields after successful submission
            setPostTitle('');
            setPostDescription('');
            setPostImage(null);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleImageChange = (e) => {
        setPostImage(e.target.files[0]);
    };

    return (
        <>
            <Navbar />
            <div className='container-add-post'>
                <div className="form-add-post">
                    <div className="img-add-post">
                        <img src="https://img.freepik.com/premium-vector/awareness-mental-health-day-concept-with-smiley-brain-crossed-hands-as-hug-white-background_1302-38048.jpg" alt="" />
                        <p className='img-text-add-post'>
                            Share Your Insights, Illuminate Minds!</p>
                    </div>
                    <div className="add-post-form">
                        <span className="circle-add-post-one"></span>
                        <span className='circle-add-post-two'></span>
                        <form className='add-a-post' onSubmit={handleSubmit}>
                            <h3 className='post-title'>What's on your mind??</h3>
                            <div className="input-container-add-post focus">
                                <input type="text" name="post-title" className='input-add-post' value={postTitle} onChange={(e) => setPostTitle(e.target.value)}/>
                                <label className='add-post-label' htmlFor="">Title</label>
                                <span>Title</span>
                            </div>
                            <div className="input-container-add-post focus textarea">
                                <textarea name="post-description" className="input-add-post" value={postDescription} onChange={(e) => setPostDescription(e.target.value)}></textarea>
                                <label className='add-post-label' htmlFor="">Description</label>
                                <span>Description</span>
                            </div>                 
                             <div className="input-container-add-post focus">
                                <input type="file" name="add-post-image" id="image-upload" accept="image/*" className='input-add-post' onChange={handleImageChange}/>
                                <label className='add-post-label img-label' htmlFor="image-upload">Image</label>
                                <span>Image</span>
                            </div>
                            <button className='add-post-button' type="submit">Add Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
