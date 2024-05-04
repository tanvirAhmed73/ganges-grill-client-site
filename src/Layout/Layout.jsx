import React, { useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const Layout = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
     
    return (
        <div>
            <Navbar></Navbar>
            {/* todo: loading need to update */}
            {
                navigation.state === 'loading' ? <P>Loading</P>
                :
                <Outlet></Outlet>
            }
            
            <Footer></Footer>
        </div>
    );
};

export default Layout;