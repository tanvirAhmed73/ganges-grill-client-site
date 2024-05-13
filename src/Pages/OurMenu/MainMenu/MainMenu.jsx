import { Helmet } from "react-helmet-async";
import PageAndMenuCover from "../../../Shared/PageAndMenuCover/PageAndMenuCover";
import Title from "../../../Title/Title";
import Menucategory from "../MenuCategory/Menucategory";
import { NavLink } from "react-router-dom";

const MainMenu = () => {
    return (
        <div className="">
            <Helmet>
                <title>Ganges Grill | Our Menu</title>
            </Helmet>

            {/* popular */}
            <PageAndMenuCover 
            img={'https://i.ibb.co/5vJDpnM/banner3.jpg'}
            title={"Our Menu"}
            description={"WOULD YOU LIKE TO TRY A DISH"}
            >
            </PageAndMenuCover>
            <Title title={"---Don't Miss---"} subtitle={"TODAY'S OFFER"}></Title> 
            <Menucategory itemCategory={"popular"}></Menucategory>
            <NavLink to={`/order/popular`}>
                <button className='btn w-3/4 block mx-auto mb-20'>ORDER YOUR FAVOURITE FOOD</button>
            </NavLink>

            {/* Dessert */}
            <PageAndMenuCover 
            img={'https://i.ibb.co/WDKvBvM/chef-special.jpg'}
            title={"DESSERTS"}
            description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            >
            </PageAndMenuCover>
            <Menucategory itemCategory={"dessert"}></Menucategory>
            <NavLink to={`/order/dessert`}>
                <button className='btn w-3/4 block mx-auto mb-20'>ORDER YOUR FAVOURITE FOOD</button>
            </NavLink>
            
            {/* PIZZA */}
            <PageAndMenuCover 
            img={'https://i.ibb.co/WDKvBvM/chef-special.jpg'}
            title={"PIZZA"}
            description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            >
            </PageAndMenuCover>
            <Menucategory itemCategory={"pizza"}></Menucategory>
            <NavLink to={`/order/pizza`}>
                <button className='btn w-3/4 block mx-auto mb-20'>ORDER YOUR FAVOURITE FOOD</button>
            </NavLink>

            {/* salads */}
            <PageAndMenuCover 
            img={'https://i.ibb.co/WDKvBvM/chef-special.jpg'}
            title={"SALADS"}
            description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            >
            </PageAndMenuCover>
            <Menucategory itemCategory={"salad"}></Menucategory>
            <NavLink to={`/order/salad`}>
                <button className='btn w-3/4 block mx-auto mb-20'>ORDER YOUR FAVOURITE FOOD</button>
            </NavLink>

            {/* Soups */}
            <PageAndMenuCover 
            img={'https://i.ibb.co/WDKvBvM/chef-special.jpg'}
            title={"SOUPS"}
            description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            >
            </PageAndMenuCover>
            <Menucategory itemCategory={"soup"}></Menucategory>
            <NavLink to={`/order/soup`}>
                <button className='btn w-3/4 block mx-auto mb-20'>ORDER YOUR FAVOURITE FOOD</button>
            </NavLink>
        </div>
    );
};

export default MainMenu;