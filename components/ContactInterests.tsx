import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

interface Props {
  interests: String[];
}

export const ContactInterests = ({ interests }: Props) => {
  return (
    <div>
      <div className="text-base md:text-lg lg:text-xl mb-3">Interests</div>
      <div className="text-base mb-8 rounded-xl">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={8}
          freeMode={true}
          modules={[FreeMode]}
        >
          {interests?.map((interest, index) => (
            <SwiperSlide
              key={`interest-${index}`}
              className="!w-auto inline-block bg-white bg-opacity-[0.12] text-white rounded-2xl px-4 py-[6px] text-sm md:text-base lg:text-lg"
            >
              {interest}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
