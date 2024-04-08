import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../AddPost/AddPost.css'
export default function AddPost() {
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
                        <form className='add-a-post'>
                            <h3 className='post-title'>What's on your mind??</h3>
                            <div className="input-container-add-post focus">
                                <input type="text" name="post-title" className='input-add-post' />
                                <label className='add-post-label' for="">Title</label>
                                <span>Title</span>
                            </div>
                            <div className="input-container-add-post focus textarea">
                                <textarea name="post-description" className="input-add-post"></textarea>
                                <label className='add-post-label' for="">Description</label>
                                <span>Description</span>
                            </div>                 
                             <div className="input-container-add-post focus">
                                <input type="file" name="add-post-image" id="image-upload" accept="image/*" className='input-add-post' />
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
