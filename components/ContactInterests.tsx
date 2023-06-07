import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { Typography } from "@mui/material";

interface Props {
  interests: String[];
}

export const ContactInterests = ({ interests }: Props) => {
  return (
    <div className="space-y-3 mb-8">
      <Typography variant="subtitle1">Interests</Typography>
      <div className="text-base rounded-xl">
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
