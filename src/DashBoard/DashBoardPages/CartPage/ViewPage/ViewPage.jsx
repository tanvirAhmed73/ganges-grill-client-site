import React from 'react';
import useAuth from '../../../../CustomHooks/useAuth';

const ViewPage = () => {
    const {user, logOut} = useAuth()
    // console.log(user.photoURL)
    return (
        <div>
            <h1 className='text-center underline text-orange-600 mt-3 text-4xl'>WELCOME BACK!</h1>
            <div className='w-3/4 mx-auto text-center justify-center'>
                <img className='my-7 w-[200px] h-[200px] mx-auto' src={user?.photoURL ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="You Didn't Have Your Profile Image" />
                <h1 className='text-3xl'>{user.displayName}</h1>
                <h2 className='md:text-2xl'>{user.email}</h2>
                <button className='btn bg-red-600 mb-4 text-white btn-sm' onClick={()=> logOut()} > Logout</button>
            </div>
        </div>
    );
};

export default ViewPage;