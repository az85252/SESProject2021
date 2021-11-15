import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png';
import logoText from '../images/logoText.png';
import {BrowserView, MobileView} from 'react-device-detect';

const NavBar = () => {
    return (
        <div>
            
            <BrowserView>
            <div className="footer">
                <Link to='/' style={{ textDecoration: 'none', }}>
                    <button className="footerbutton">Home</button>
                </Link>
                <Link to='/webcams' style={{ textDecoration: 'none' }}>
                    <button className="footerbutton">Web Cams</button>
                </Link>
                <div className="barspacing"/>
                <img src={logoText} className='logo'/>
                </div>
            </BrowserView>
            <MobileView>
            <div className="footer">
                <Link to='/' style={{ textDecoration: 'none', }}>
                    <button className="footerbutton mobile">Home</button>
                </Link>
                <img src={logo} className='logo'/>
                <Link to='/webcams' style={{ textDecoration: 'none' }}>
                    <button className="footerbutton mobile">Web Cams</button>
                </Link>
                </div>
            </MobileView>
        </div>
    )
}

export default NavBar
