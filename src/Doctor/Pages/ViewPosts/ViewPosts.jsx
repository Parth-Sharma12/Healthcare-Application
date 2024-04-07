import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../ViewPosts/ViewPosts.css'
import CommentModal from '../../Modals/CommentModal/CommentModal';
import { FaFlag } from "react-icons/fa";
export default function ViewPosts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const openModal = () => {
        // Static comments
        const staticComments = [
            { author: 'User1', time: '2 hours ago', body: 'Great post!' },
            { author: 'User2', time: '1 hour ago', body: 'Interesting perspective.' },
            { author: 'User3', time: '30 minutes ago', body: 'I totally agree!' },
        ];
        setComments(staticComments);
        setIsModalOpen(true);
    };
    return (
        <>
            <Navbar />
            <div className="post-card-doc-container">
                <div className="post-card-doc">
                    <img src="https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22028_16430272124432966.jpg" alt="" />
                    <div className="card-content">
                        <h1>Mental Sickness Causes</h1>
                        <p>childhood abuse, trauma, or neglect.social isolation or lonelines.experiencing discrimination and stigma, including racism.social disadvantage, poverty or debt</p>
                        <p>Uploaded By: Vivek Maltare at April 5, 2024, 12:34 PM.</p>
                        <div className="button-flag">
                            <button className='View-Comments' onClick={openModal}>View Comments</button>
                            <FaFlag className='flag' />
                        </div>
                    </div>
                </div>
                <div className="post-card-doc">
                    <img src="https://img.freepik.com/free-vector/mental-health-awareness-concept_52683-37916.jpg" alt="" />
                    <div className="card-content">
                        <h1>Overcoming Anxiety: Personal Stories and Support</h1>
                        <p>Offer support and encouragement to others who might be struggling with stress, and learn new coping strategies from fellow community members.Discuss how you navigate challenging situations and maintain emotional balance in your daily life.</p>
                        <p>Uploaded By: Subhra Jyoti Singh at April 5, 2024, 12:34 PM.</p>
                        <div className="button-flag">
                            <button className='View-Comments' onClick={openModal}>View Comments</button>
                            <FaFlag className='flag' />
                        </div>
                    </div>
                </div>
                <div className="post-card-doc">
                    <img src="https://www.healthcareradius.in/cloud/2021/11/15/Mental-Health-1.jpg" alt="" />
                    <div className="card-content">
                        <h1>Self-Care Sunday</h1>
                        <p>Discover new self-care rituals to pamper yourself, whether it's indulging in a luxurious bath, enjoying a nature walk, or treating yourself to a favorite meal.</p>
                        <p>Uploaded By: Kaushal Pancholi at April 5, 2024, 12:34 PM.</p>
                        <div className="button-flag">
                            <button className='View-Comments' onClick={openModal}>View Comments</button>
                            <FaFlag className='flag' />
                        </div>
                    </div>
                </div>
                <div className="post-card-doc">
                    <img src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=" alt="" />
                    <div className="card-content">
                        <h1>Coping Strategies: Share Your Best Techniques</h1>
                        <p>Take a moment to honestly assess your current mental state and share it with the community.Offer a listening ear and words of encouragement to those who may be struggling, fostering a sense of connection and support.</p>
                        <p>Uploaded By: Shivam Jaiswal at April 5, 2024, 12:34 PM.</p>
                        <div className="button-flag">
                            <button className='View-Comments' onClick={openModal}>View Comments</button>
                            <FaFlag className='flag' />
                        </div>
                    </div>
                </div>
                <div className="post-card-doc">
                     <img src="https://www.icrc.org/sites/default/files/styles/special_page_image/public/document_new/image/world_mental_health_day_2022.jpeg?itok=vgCX9sqT" alt=""/>
                    <div className="card-content">
                        <h1>Title</h1>
                        <p>Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                        <p>uploaded by</p>
                        <div className="button-flag">
                            <button className='View-Comments' onClick={openModal}>View Comments</button>
                            <FaFlag className='flag' />
                        </div>
                    </div>
                </div>
                <div className="post-card-doc">
                    <img src="https://neurosciencenews.com/files/2023/08/pain-mental-health-neuroscuece.jpg" alt="" />
                    <div className="card-content">
                        <h1>Title</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, quod nemo sit molestias earum, consequatur, aliquam asperiores rem maxime dolor laboriosam rerum veniam totam veritatis perspiciatis dicta placeat ipsam possimus?
                            animi nostrum. In vitae minima sapiente reiciendis suscipit, eligendi obcaecati quos ratione dicta possimus voluptatibus nam!
                            Non accusantium iste architecto necessitatibus nulla, pariatur alias modi asperiores optio nisi fugit voluptatum repellendus mollitia illo rerum veniam corrupti eligendi, porro officia exercitationem corporis magni molestiae. Minus, quos saepe.
                            Sequi quasi sapiente dolorem, quos sint architecto recusandae eum corporis illo hic earum ab minus ipsum illum ea assumenda voluptate excepturi repellat accusantium dignissimos, nisi laudantium! Assumenda eaque aut temporibus.Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                        <p>uploaded by</p>
                        <div className="button-flag">
                            <button className='View-Comments' onClick={openModal}>View Comments</button>
                            <FaFlag className='flag' />
                        </div>
                        <CommentModal
                            isOpen={isModalOpen}
                            comments={comments}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
