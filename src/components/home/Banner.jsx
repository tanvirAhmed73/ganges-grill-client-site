"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./banner.css";
import Title from "@/components/ui/Title";

export default function Banner() {
  return (
    <div>
      <Swiper navigation modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img
            src="https://i.ibb.co/vmgBy8c/pexels-sebastian-coman-photography-1598188-3475617.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/7jmND6V/pexels-marceloverfe-19524049.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/tZ0RtHM/pexels-bertellifotografia-13869852.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/hMWpTMQ/pexels-chanwalrus-958545.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/KjwxZ9r/pexels-jonathanborba-14048843.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <Title
        title={"---From 11:00am to 10:00pm---"}
        subtitle={"Order Now"}
      />
    </div>
  );
}
