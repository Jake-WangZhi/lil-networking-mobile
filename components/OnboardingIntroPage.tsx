import { Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";

interface Props {
  title: string;
  description?: string;
  image: StaticImageData;
  addImgPadding?: boolean;
}

export const OnboardingIntroPage = ({
  title,
  description,
  image,
  addImgPadding,
}: Props) => {
  return (
    <div className="bg-dark-blue">
      <div
        className={`flex flex-col h-[450px] xs:h-[525px] lg:h-[700px] justify-end ${
          addImgPadding && "px-8 md:px-10 lg:px-12"
        }`}
      >
        <Image src={image} alt={title} className="w-full" />
      </div>
      <div className="px-8 text-white mt-12 space-y-6">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h3">{description}</Typography>
      </div>
    </div>
  );
};
