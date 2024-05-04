import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css'
import { PiEyeClosedFill } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";
const Navbar = () => {
    const linksRight = [
        { id: 1, name: 'Home', linkName: 'contact'},
        { id: 2, name: 'Contact Us', linkName: 'contact'},
        { id: 3, name: 'DashBoard', linkName: 'contact'},
    ]
    const linksLeft = [
        { id: 4, name: 'Our Menu', linkName: 'contact'},
        { id: 5, name: 'Our Shop', linkName: 'contact'},
        { id: 6, name: 'SignOut', linkName: 'contact'},
    ]

    let [open, setOpen] = useState(false);

    const handleMenu = ()=>{
        setOpen(!open);
    }

    return ( 
        <div>
            {/* navbar options*/}
            <div className=' nav-options fixed z-10 left-0 right-0 mx-auto'>
                <div className='menu-right'>
                    <ul  id="menu" className={open? 'open' : ''}>
                        {
                            linksRight.map(link => <li key={link.id} className='list-item  '><NavLink to={`./${link.linkName}`}>{link.name}</NavLink></li>)
                        }
                    </ul>
                    <div className='img-container'>
                        <img className={`logo ${open ? 'hidden' : ''}`} src="../../../Pictures/logo/Logo.webp" alt="" />
                    </div>
                    <ul  id="menu-left" className={open? 'open' : ''}>
                        {
                            linksLeft.map(link => <li key={link.id} className='list-item '><NavLink to={`./${link.linkName}`}>{link.name}</NavLink></li>)
                        }
                    </ul>
                </div>
                
                <div onClick={handleMenu} className="icon-close">
                    {open?   <PiEyeClosedFill/> : <PiEyeClosedLight />}
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;