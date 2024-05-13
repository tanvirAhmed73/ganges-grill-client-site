import React, { Children, useContext } from 'react';
import useAdmin from '../CustomHooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../CustomHooks/useAuth';

const AdminRoutes = ({children}) => {
    const auth = useAuth(); 
    const [user, loading] = auth;
    const [isAdmin, isPending] = useAdmin()
    const location = useLocation();
    if(loading || isPending){
        return <progress className='progress w-56'></progress>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default AdminRoutes;