"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./category.css";

export default function Category() {
  return (
    <div className="category-swiper mx-auto mb-10 w-3/4">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <div className="relative flex items-center justify-center">
            <img src="https://i.ibb.co/Zz1sTFb/slide2.jpg" alt="" />
            <p className="catagoryTitle absolute bottom-0 text-white shadow-xl">
              SALADS
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center justify-center">
            <img
              className="w-[300px]"
              src="https://i.ibb.co/CwVMFNk/slide3.jpg"
              alt=""
            />
            <p className="catagoryTitle absolute bottom-0 text-white shadow-xl">
              SOUPS
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="pizza-slide">
          <div className="relative flex items-center justify-center">
            <img
              className="w-[300px]"
              src="https://i.ibb.co/cTPm8yt/slice-pizza-being-lifted-from-pizza-pan-with-melted-cheese-toppings-generative-ai-97167-4913.jpg"
              alt=""
            />
            <p className="catagoryTitle absolute bottom-0 text-white shadow-xl">
              PIZZAS
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center justify-center">
            <img
              className="w-[300px]"
              src="https://i.ibb.co/NyKXyqf/slide4.jpg"
              alt=""
            />
            <p className="catagoryTitle absolute bottom-0 text-white shadow-xl">
              DESERTS
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center justify-center">
            <img
              className="w-[300px]"
              src="https://i.ibb.co/Zz1sTFb/slide2.jpg"
              alt=""
            />
            <p className="catagoryTitle absolute bottom-0 text-white shadow-xl">
              SALADS
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
