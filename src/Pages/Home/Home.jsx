import React from 'react';
import Banner from './Banner/Banner';
import PopularItem from './PopularItem/PopularItem';
import Category from './Category/Category';
import SharedBanner from '../../SharedBanner/SharedBanner';
import ContactNumber from './ContactNumber/ContactNumber';
import MenuBanner from './MenuBanner/MenuBanner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <SharedBanner 
                bannerTitle={'Ganges-Grill'}
                description={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.'}>
            </SharedBanner>
            <PopularItem></PopularItem>
            <ContactNumber></ContactNumber>
            <MenuBanner></MenuBanner>
        </div>
    );
};

export default Home;