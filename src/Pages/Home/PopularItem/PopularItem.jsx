import React, { useEffect, useState } from 'react';
import Title from '../../../Title/Title';
import MenuItem from '../../../Shared/MenuItem/MenuItem';

const PopularItem = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/popular')
            .then(res => res.json())
            .then(data => {
                const popularItems = data .filter(item => item.category === 'popular');
                setMenu(popularItems)
            })
    }, [])
    return (
        <section className="mb-12 mt-56 md:mt-0">
            <Title 
                title="- - - From Our Menu - - -"
                subtitle="Popular Items"
            ></Title>
            <div className="grid md:grid-cols-2 gap-10 w-3/4 mx-auto">
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <button className="btn btn-outline mx-auto block border-0 border-b-4 mt-4">View Full Menu</button>
        </section>
    );
};

export default PopularItem;