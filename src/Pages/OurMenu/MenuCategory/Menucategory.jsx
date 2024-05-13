import React from 'react';
import useMenu from '../../../CustomHooks/useMenu';
import MenuItem from '../../../Shared/MenuItem/MenuItem';

const Menucategory = ({itemCategory}) => {
    const [menu] = useMenu();
    const specificDish = menu.filter(item => item.category === itemCategory)
    return (
        <div>
            <div className="grid md:grid-cols-2 mb-5 mt-5  gap-10 w-3/4 mx-auto">
                {
                    specificDish.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }

            </div>
            
        </div>
        
    );
};

export default Menucategory;