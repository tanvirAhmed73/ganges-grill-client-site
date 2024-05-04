import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
const Category = () => {
  return (
    <div className="w-3/4 mx-auto mb-10">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className=" "
      >
        <SwiperSlide>
        <div className="relative flex justify-center items-center">
            <img className="" src="https://i.ibb.co/Zz1sTFb/slide2.jpg" alt="" />
            <p className="absolute catagoryTitle text-white shadow-xl bottom-0">SALADS</p>
        </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="relative flex justify-center items-center">
                <img className="w-[300px]" src="https://i.ibb.co/CwVMFNk/slide3.jpg" alt="" />
                <p className="absolute catagoryTitle text-white shadow-xl bottom-0">SOUPS</p>
            </div>
        </SwiperSlide>
        <SwiperSlide className="pizza-slide">
            <div className="relative flex justify-center items-center">
                <img className="w-[300px] " src="https://i.ibb.co/cTPm8yt/slice-pizza-being-lifted-from-pizza-pan-with-melted-cheese-toppings-generative-ai-97167-4913.jpg" alt="" />
                <p className="absolute catagoryTitle text-white shadow-xl bottom-0">PIZZAS</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="relative flex justify-center items-center">
                <img className="w-[300px]" src="https://i.ibb.co/NyKXyqf/slide4.jpg" alt="" />
                <p className="absolute catagoryTitle text-white shadow-xl bottom-0">DESERTS</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="relative flex justify-center items-center">
                <img className="w-[300px]" src="https://i.ibb.co/Zz1sTFb/slide2.jpg" alt="" />
                <p className="absolute catagoryTitle text-white shadow-xl bottom-0">SALADS</p>
            </div>
        </SwiperSlide>
        
      </Swiper>


    </div>
  );
};

export default Category;
