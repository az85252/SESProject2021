import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png';


const Footer = () => {
    return (
        <div>
            <div className="footer">
            <Link to='/' style={{ textDecoration: 'none', }}><button className="footerbutton">Home</button></Link>
            <img src={logo} className='logo'/>
            <Link to='/webcams' style={{ textDecoration: 'none' }}><button className="footerbutton">Web Cams</button></Link>
            </div>
        </div>
    )
}

export default Footer
