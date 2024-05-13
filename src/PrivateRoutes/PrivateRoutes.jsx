import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><ClockLoader 
        color="#36d7b7"
        speedMultiplier={4}
        size={250}
        /> </div>
    }
    if(user){
        return children
    }
    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default PrivateRoutes;