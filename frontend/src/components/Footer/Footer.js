import React from 'react'
import  './Footer.css'
import { assets } from '../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt='logo'/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec justo vel ex iaculis eleifend. Fusce id ante sit amet justo fermentum vehicula. Duis sit amet arcu id sapien faucibus consequat. Maecenas vitae placerat felis, eget sodales ipsum. Proin ac lectus sed odio aliquet varius. Integer vitae ex sed nulla posuere convallis. Vestibulum suscipit nunc in magna convallis, sed vulputate mi laoreet.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon}/>
                    <img src={assets.twitter_icon}/>
                    <img src ={assets.linkedin_icon}/>
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>Comapny</h2>
                <ul>
                    <li>Home</li>
                    <li>Aboutus</li>
                    <li>Delivery </li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91 -212-456-7890</li>
                    <li>8Df7H@example.com</li>
                </ul>
            </div>
        </div>
      <hr/>
      <p className='footer-copyright'>copyright 2024  Tomato.com -All Right Reserved</p>
    </div>
  )
}

export default Footer
