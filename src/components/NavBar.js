import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png';
import logoText from '../images/logoText.png';
import { BrowserView, MobileView } from 'react-device-detect';

const NavBar = () => {
    const buttonHome = <Link to='/' style={{ textDecoration: 'none', }}>
        <button className="footerbutton">Home</button>
    </Link>;
    const buttonWC = <Link to='/webcams' style={{ textDecoration: 'none' }}>
        <button className="footerbutton">Web Cams</button>
    </Link>;

    const barSpace = <div className="barspacing" />;
    const buttonWCMobile = <Link to='/webcams' style={{ textDecoration: 'none' }}>
        <button className="footerbutton mobile">Web Cams</button>
    </Link>;
    const buttonHomeMobile = <Link to='/' style={{ textDecoration: 'none', }}>
        <button className="footerbutton mobile">Home</button>
    </Link>;
    //Browser and Mobile NavBars are different
    return (
        <div>

            <BrowserView>
                <div className="footer">
                    {buttonHome}
                    {buttonWC}
                    {barSpace}
                    <img src={logoText} className='logo' alt=""/>
                </div>
            </BrowserView>

            <MobileView>
                <div className="footer">
                    {buttonHomeMobile}
                    <img src={logo} className='logo' alt=""/>
                    {buttonWCMobile}
                </div>
            </MobileView>
        </div>
    )
}

export default NavBar
