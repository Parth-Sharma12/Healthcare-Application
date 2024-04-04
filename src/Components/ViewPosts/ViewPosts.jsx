import React,{useState} from 'react'
import Navbar from '../Navbar/Navbar'
import '../ViewPosts/ViewPosts.css'
import CommentModal from '../CommentModal/CommentModal';
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
        <Navbar/>
        <div className="post-card-container">
            <div className="post-card">
                <img src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=" alt=""/>
                <div className="card-content">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                    <p>uploaded by</p>
                    <button className='View-Comments' onClick={openModal}>View Comments</button>
                </div>
            </div>
            <div className="post-card">
                <img src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=" alt=""/>
                <div className="card-content">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                    <p>uploaded by</p>
                    <button className='View-Comments' onClick={openModal}>View Comments</button>
                </div>
            </div>
            <div className="post-card">
                <img src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=" alt=""/>
                <div className="card-content">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                    <p>uploaded by</p>
                    <button className='View-Comments' onClick={openModal}>View Comments</button>
                </div>
            </div>
            <div className="post-card">
                <img src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=" alt=""/>
                <div className="card-content">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                    <p>uploaded by</p>
                    <button className='View-Comments' onClick={openModal}>View Comments</button>
                </div>
            </div>
            <div className="post-card">
                {/* <img src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=" alt=""/> */}
                <div className="card-content">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                    <p>uploaded by</p>
                    <button className='View-Comments' onClick={openModal}>View Comments</button>
                </div>
            </div>
            <div className="post-card">
                <img src="https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=" alt=""/>
                <div className="card-content">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, quod nemo sit molestias earum, consequatur, aliquam asperiores rem maxime dolor laboriosam rerum veniam totam veritatis perspiciatis dicta placeat ipsam possimus?
                    Veniam sint magnam doloribus? Deleniti ad tempore minima quia eligendi voluptas, at veniam, ratione optio a inventore earum provident libero? Facilis necessitatibus, quisquam autem eveniet sit sint. Animi, debitis a!
                    Eos dicta, blanditiis est quis, ex reprehenderit vitae eaque itaque, dolorem illo eligendi quidem atque aliquid repellendus maxime! Sunt, nihil magnam ea consequuntur vero molestiae. Nesciunt nisi corporis eos unde?
                    Fuga facilis voluptatem, dicta labore molestiae odio quod voluptate ducimus eum dolorum aut ipsum! Eum ea aperiam nesciunt impedit quisquam. Quaerat placeat unde modi necessitatibus, reiciendis sequi fuga ad consequuntur.
                    Aliquid consectetur distinctio soluta voluptas ex dolorem tempore delectus nisi iure exercitationem autem voluptates laudantium, facilis cupiditate quis voluptatum debitis aperiam facere veniam? Totam amet dolores earum voluptates deleniti nobis!
                    Corporis iste perferendis nostrum deserunt sint modi rerum beatae quia quis, nesciunt incidunt harum. Odit, architecto optio tempore incidunt, inventore quos necessitatibus atque nam laborum fugit, veritatis consequatur velit officia.
                    Maiores velit debitis expedita ducimus rerum facere aut ratione, delectus eum neque iste incidunt, modi pariatur aperiam veniam cupiditate laudantium numquam tempora illum ullam atque distinctio! Atque reiciendis dolor sunt?
                    Dolorum voluptates, aliquid, iure repellendus minima ratione tempora, pariatur eum distinctio culpa reprehenderit fugit animi nostrum. In vitae minima sapiente reiciendis suscipit, eligendi obcaecati quos ratione dicta possimus voluptatibus nam!
                    Non accusantium iste architecto necessitatibus nulla, pariatur alias modi asperiores optio nisi fugit voluptatum repellendus mollitia illo rerum veniam corrupti eligendi, porro officia exercitationem corporis magni molestiae. Minus, quos saepe.
                    Sequi quasi sapiente dolorem, quos sint architecto recusandae eum corporis illo hic earum ab minus ipsum illum ea assumenda voluptate excepturi repellat accusantium dignissimos, nisi laudantium! Assumenda eaque aut temporibus.Lorem ipsum dolor amet consectetur, adipisicing elit. Fuga quos quod eligendi magnam nisi rerum veritatis sint ut</p>
                    <p>uploaded by</p>
                    <button className='View-Comments' onClick={openModal}>View Comments</button>
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
