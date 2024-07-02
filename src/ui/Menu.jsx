export default function Menu() {
  return (
    <div className="z-10 flex items-center text-white">
      <ul className="z-10 ml-10 flex ">
        <li className="group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          New Movie
          <div className="absolute -bottom-3 hidden h-[1px] w-full bg-white group-hover:block "></div>
        </li>
        <li className="group  relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          Genre
          <div className="absolute -bottom-3  hidden h-[1px] w-full bg-white group-hover:block  "></div>
        </li>
        <li className=" group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          Country
          <div className="absolute -bottom-3  hidden h-[1px] w-full bg-white group-hover:block  "></div>
        </li>
        <li className=" group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          Movie
          <div className="absolute -bottom-3  hidden h-[1px] w-full bg-white group-hover:block  "></div>
        </li>
        <li className=" group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          TV Series
          <div className="absolute -bottom-3  hidden h-[1px] w-full bg-white group-hover:block  "></div>
        </li>
      </ul>
    </div>
  );
}
