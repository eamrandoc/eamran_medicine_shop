import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import bgimg1 from '../../assets/Slider01.jpg'
import bgimg2 from '../../assets/Slidder02.avif'
import bgimg3 from '../../assets/Slider03.jpg'
import Slide from "./Slide";

const Hero = () => {
    return (
        <div>
            <div className=' px-6 py-10 mx-auto'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className='mySwiper'
                >
                    <SwiperSlide>
                        <Slide
                            image={bgimg1}
                            headline='Your Trusted Medicine Shop'
                            text='A wide range of medicines and health essentials at your fingertips.'
                            buttonText='Shop Now'
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Slide
                            image={bgimg2}
                            headline='Order Medicines Online'
                            text='Convenient home delivery for all your prescription needs.'
                            buttonText='Order Now'
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Slide
                            image={bgimg3}
                            headline='24/7 Medicine Delivery'
                            text='Always there when you need us, with fast delivery.'
                            buttonText='Get Medicine Now'
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Hero;
