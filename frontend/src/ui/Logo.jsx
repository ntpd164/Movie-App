function Logo() {
  return (
    <div className="z-10 ml-[20px] mr-4 flex cursor-pointer items-center gap-3 md:ml-[50px] md:mr-14 lg:ml-[100px] xl:mr-20 ">
      {/* <span className="text-6xl" role="img">
        🍿
      </span> */}
      {/* <img className="w-16" src="./src/assets/logo.png"></img> */}
      <div className="rounded-xl bg-yellow-300 px-4 py-1 text-4xl font-semibold uppercase text-black">
        DN
      </div>
      <h1 className="text-yellow text-4xl font-semibold uppercase text-primary ">
        Movie
      </h1>
    </div>
  );
}
export default Logo;
