import React, { useEffect, useState } from 'react';
import Title from '../../../Title/Title';
import MenuItem from '../../../Shared/MenuItem/MenuItem';
import useMenu from '../../../CustomHooks/useMenu';
import { NavLink } from 'react-router-dom';

const PopularItem = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')
    return (
        <section className="mb-12 mt-56 md:mt-0">
            <Title 
                title="- - - From Our Menu - - -"
                subtitle="Popular Items"
            ></Title>
            <div className="grid md:grid-cols-2 gap-10 w-3/4 mx-auto">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <NavLink to={'/ourMenu'}>

            <button className="btn btn-outline mx-auto block border-0 border-b-4 mt-4">View Full Menu</button>

            </NavLink>
        </section>
    );
};

export default PopularItem;