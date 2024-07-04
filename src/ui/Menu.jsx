export default function Menu() {
  return (
    <div className="z-10 flex items-center text-white">
      <ul className="z-10 ml-4 flex ">
        <li className="group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          <a href="#home">Home</a>
          <div className="absolute -bottom-3 hidden h-[1px] w-full bg-white group-hover:block "></div>
        </li>
        <li className="group  relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          <a href="#top-picks">Top Picks</a>
          <div className="absolute -bottom-3  hidden h-[1px] w-full bg-white group-hover:block  "></div>
        </li>
        <li className=" group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          <a href="#fan-favorites">Fan Favorites</a>
          <div className="absolute -bottom-3  hidden h-[1px] w-full bg-white group-hover:block  "></div>
        </li>
        <li className=" group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          <a href="#popular-celebrities">Celebrities</a>
          <div className="absolute -bottom-3  hidden h-[1px] w-full bg-white group-hover:block  "></div>
        </li>
      </ul>
    </div>
  );
}
