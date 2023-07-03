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
      <Typography variant="h3" sx={{ mx: "16px", fontWeight: 600 }}>
        Interests
      </Typography>
      <div className="ml-4">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={8}
          freeMode={true}
          modules={[FreeMode]}
        >
          {interests?.map((interest, index) => (
            <SwiperSlide
              key={`interest-${index}`}
              className="!w-auto bg-white bg-opacity-[0.12] rounded-2xl px-4 py-[6px]"
            >
              <Typography variant="body1">{interest}</Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
