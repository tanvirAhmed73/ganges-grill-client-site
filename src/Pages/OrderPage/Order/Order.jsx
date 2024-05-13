import React, { useEffect, useState } from 'react';
import PageAndMenuCover from '../../../Shared/PageAndMenuCover/PageAndMenuCover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../CustomHooks/useMenu';
import OrderShared from '../OrderShared/OrderShared';
import { useParams } from 'react-router-dom';

const Order = () => {
    const [menu] = useMenu();
    const {category} = useParams();
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks', 'popular', 'offered'];
    const [tabINdex, setTabIndex] = useState(category? categories.indexOf(category): 0);
    
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const dessert = menu.filter(item => item.category === 'dessert')
    const drinks = menu.filter(item => item.category === 'drinks')
    const popular = menu.filter(item => item.category === 'popular')
    const offered = menu.filter(item => item.category === 'offered')
    
    
    // console.log(category)
    // const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks', 'popular', 'offered']
    // const {category} = useParams();
    // let categoryIndex = categories.indexOf(category) 
    // setTabIndex(categoryIndex !== -1 ? categoryIndex : 0);
    // if(categoryIndex !== -1){
    //     setTabIndex(categoryIndex)
    // }else{
    //     setTabIndex(0)
    // }
    return (
        <div className=''>
            <PageAndMenuCover 
            img={'https://i.ibb.co/GsFcRwK/banner2.jpg'}
            title={'---OUR SHOP---'}
            description={'Would you like to try a dish?'}
            ></PageAndMenuCover>

            <div className='mt-5'>
                <Tabs defaultIndex={tabINdex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 justify-center">
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                    <Tab>Popular</Tab>
                    <Tab>Offered</Tab>
                </TabList>
                <TabPanel>
                    <OrderShared menu={salad}></OrderShared>
                </TabPanel>
                <TabPanel>
                    <OrderShared menu={pizza}></OrderShared>
                </TabPanel>
                <TabPanel>
                    <OrderShared menu={soup}></OrderShared>
                </TabPanel>
                <TabPanel>
                    <OrderShared menu={dessert}></OrderShared>
                </TabPanel>
                <TabPanel>
                    <OrderShared menu={drinks}></OrderShared>
                </TabPanel>
                <TabPanel>
                    <OrderShared menu={popular}></OrderShared>
                </TabPanel>
                <TabPanel>
                    <OrderShared menu={offered}></OrderShared>
                </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;