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
        className={`flex flex-col h-[450px] md:h-[525px] lg:h-[700px] justify-end ${
          addImgPadding && "px-8"
        }`}
      >
        <Image src={image} alt={title} className="w-full" />
      </div>
      <div className="px-8 text-white mt-12">
        <h1 className="font-semibold text-3xl pb-6 md:text-3xl">{title}</h1>
        <p className="text-xl font-normal md:text-xl">{description}</p>
      </div>
    </div>
  );
};
