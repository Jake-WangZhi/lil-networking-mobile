import { Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { useSwiper } from "swiper/react";
import { Button } from "./Button";

interface Props {
  title: string;
  description?: string;
  image: StaticImageData;
  addImgPadding?: boolean;
}

const SwiperButtonNext = ({ children }: { children: ReactNode }) => {
  const swiper = useSwiper();

  return (
    <Button
      variant="contained"
      onClick={() => swiper.slideNext()}
      sx={{
        width: "172px",
        height: "48px",
        py: "12px",
      }}
    >
      {children}
    </Button>
  );
};

export const OnboardingIntroPage = ({
  title,
  description,
  image,
  addImgPadding,
}: Props) => {
  return (
    <div className="bg-dark-blue">
      <div
        className={`flex flex-col h-[400px] xs:h-[475px] lg:h-[650px] justify-end ${
          addImgPadding && "px-8 md:px-10 lg:px-12"
        }`}
      >
        <Image src={image} alt={title} className="w-full" />
      </div>
      <div className="px-8 text-white mt-12 space-y-6">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h3">{description}</Typography>
      </div>
      <div className="flex justify-center mt-6">
        <SwiperButtonNext>Next</SwiperButtonNext>
      </div>
    </div>
  );
};
