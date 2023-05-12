import Image, { StaticImageData } from "next/image";

interface Props {
  title: string;
  description?: string;
  image: StaticImageData;
}

export const OnboardingIntroPage = ({ title, description, image }: Props) => {
  return (
    <div>
      <Image
        src={image}
        alt={title}
        className="bottom-0 h-[500px] xs:h-[600px] w-full "
      />
      <div className="px-8 text-white md:mt-10">
        <h1 className="font-semibold text-3xl pb-6 md:text-5xl">{title}</h1>
        <p className="text-xl font-normal md:text-3xl">{description}</p>
      </div>
    </div>
  );
};
