import React from 'react';
import Title from '../../../Title/Title';

const MenuBanner = () => {
    return (
        <div>
            <div className='mx-auto w-full'>
                <p className='md:text-md text-center mt-5 text-orange-600'>"---Check it out---"</p>
                <p className='md:text-3xl text-center  text-black'>'FROM OUR MENU'</p>
            </div>
            <div className=' w-3/4  mb-10 mx-auto'>
                <img className=' h-max' src="https://i.ibb.co/L5mD67j/01.jpg" alt="" />
            </div>
        </div>
    );
};

export default MenuBanner;