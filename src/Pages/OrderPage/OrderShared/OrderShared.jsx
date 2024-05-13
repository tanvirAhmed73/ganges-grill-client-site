import React from 'react';
import OrderPageCard from '../OderPageCard/OrderPageCard';

const OrderShared = ({menu}) => {
    
    return (
        <div className='grid mt-6 mb-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3 w-3/4 mx-auto'>
            {
                menu.map(item => <OrderPageCard key={item._id} item={item}></OrderPageCard>)
            }        
        </div>
    );
};

export default OrderShared;