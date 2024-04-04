import React from 'react'
import '../Footer/Footer.css'
export default function Footer() {
  return (
    <div>
        <footer>
            <div className="row">
                <div className="col">
                    <img src="" className='footer-logo'/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repudiandae ipsa, omnis iure ad voluptatibus nihil exercitationem sint explicabo ex autem, porro beatae perspiciatis aliquid ab magni assumenda illo dolor?</p>
                </div>
                <div className="col">
                    <h3>Office</h3>
                    <p>Abcde</p>
                    <p>huigdjdkgdjdf</p>
                    <p>sudodsosdods</p>
                    <p class="email-id">abc@gmail.com0000</p>
                    <h4>+91-0</h4>
                </div>
                <div className="col">
                    <h3>links</h3>
                    <ul>
                        <li className='link-style'><a href="/">Home</a></li>
                        <li className='link-style'><a href="/">Services</a></li>
                        <li className='link-style'><a href="/">About Us</a></li>
                        <li className='link-style'><a href="/">Features</a></li>
                        <li className='link-style'><a href="/">Contact us</a></li>
                    </ul>
                </div>
                <div className="col"></div>
            </div>
        </footer>
    </div>
  )
}
