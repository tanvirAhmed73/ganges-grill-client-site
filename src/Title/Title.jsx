import React from 'react';

const Title = ({title, subtitle}) => {
    return (
        <div className=''>
            <p className='md:text-md text-center mt-5 text-orange-600'>{title}</p>
            <p className='md:text-3xl text-center text-black mb-4'>{subtitle}</p>
        </div>
    );
};

export default Title;