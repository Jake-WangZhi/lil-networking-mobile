interface Props {
  interests?: String[];
}

export const ContactInterests = ({ interests }: Props) => {
  return (
    <div>
      <div className="text-base mb-2">Interests</div>
      <div className="bg-white bg-opacity-5 w-full p-4 space-x-2 text-base mb-6 rounded-xl">
        {interests?.map((interest, index) => (
          <span
            key={`interest-${index}`}
            className="inline-block bg-white bg-opacity-[0.12] text-white rounded-2xl px-4 py-[6px]"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};
