// Profile Section Requirements
interface Props {
  title: string;
  list: { title: string; value: string | number; logo: React.ReactNode }[];
}
// Profile Section Main Function
function ProfileSection({ title, list }: Props) {
  // Return Profile Section
  return (
    <section className="flex flex-col gap-3 text-gray-300">
      {/* Profile Section Title */}
      <h2 className="font-semibold text-xl">{title}</h2>
      {/* Profile Section Container */}
      <div className="flex flex-wrap gap-3 min-[477px]:items-center">
        {list.map((info, index) => (
          // Profile Section Information Section
          <section
            key={index}
            className="flex gap-4 place-content-between bg-gray-800 place-items-center p-2 rounded-md w-full max-[333px]:text-sm min-[621px]:w-[48%] min-[880px]:w-[32%]"
          >
            <div className="flex flex-col gap-1">
              {/* Profile Section Information Title */}
              <span className="font-semibold text-gray-300">{info.title}</span>
              {/* Profile Section Information Value */}
              <span>{info.value}</span>
            </div>
            {info.logo}
          </section>
        ))}
      </div>
    </section>
  );
}

export default ProfileSection;
