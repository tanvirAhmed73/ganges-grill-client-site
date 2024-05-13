import React, { useContext, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { AuthContext } from '../Provider/AuthProvider';
import { CircleLoader, ClimbingBoxLoader, ClockLoader, PacmanLoader } from 'react-spinners';

const Layout = () => {
    const {user, loading} = useContext(AuthContext)
    const navigation = useNavigation()
    if(loading){
        return <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><ClockLoader 
        color="#36d7b7"
        speedMultiplier={4}
        size={250}
        /> </div>
                
            
    }
    return (
        <div>
            <Navbar></Navbar>  
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;