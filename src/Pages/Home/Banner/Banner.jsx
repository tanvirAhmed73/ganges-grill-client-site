import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Navigation } from 'swiper/modules';
import Title from '../../../Title/Title';

const Banner = () => {
    return (
        <div>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img className='' src="https://i.ibb.co/vmgBy8c/pexels-sebastian-coman-photography-1598188-3475617.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='' src="https://i.ibb.co/7jmND6V/pexels-marceloverfe-19524049.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='' src="https://i.ibb.co/tZ0RtHM/pexels-bertellifotografia-13869852.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='' src="https://i.ibb.co/hMWpTMQ/pexels-chanwalrus-958545.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='' src="https://i.ibb.co/KjwxZ9r/pexels-jonathanborba-14048843.jpg" alt="" /></SwiperSlide>
        
      </Swiper>
      <Title title= {"---From 11:00am to 10:00pm---"} subtitle ={'Order Now'}></Title>
        </div>
    );
};

export default Banner;