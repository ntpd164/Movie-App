export default function Menu() {
  return (
    <div className="z-10 flex items-center text-white">
      <ul className="z-10 ml-10 flex ">
        <li className=" mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          New Movie
        </li>
        <li className=" mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          Genre
        </li>
        <li className=" mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          Country
        </li>
        <li className=" mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          Movie
        </li>
        <li className=" mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          TV Series
        </li>
      </ul>
    </div>
  );
}
