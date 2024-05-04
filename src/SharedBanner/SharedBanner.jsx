import React from 'react';

const SharedBanner = ({bannerTitle, description}) => {
    return (
        <div className='relative w-3/4  mx-auto'>
            <img className=' h-max' src="https://i.ibb.co/WDKvBvM/chef-special.jpg" alt="" />
            <div className=' text-left  absolute md:bottom-0 '>
                
                    <h1 className='text-black text-4xl font-semibold'>{bannerTitle}</h1>
                    <p className='text-gray-500 p-2'>{description}</p>
                
            </div>
        </div>
    );
};

export default SharedBanner;
