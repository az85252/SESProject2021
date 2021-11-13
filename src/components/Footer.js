import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <Link to='/' style={{ textDecoration: 'none', }}><button className="footerbutton">Home</button></Link>
            <Link to='/Part2' style={{ textDecoration: 'none' }}><button className="footerbutton">WebCams</button></Link>
        </div>
    )
}

export default Footer
