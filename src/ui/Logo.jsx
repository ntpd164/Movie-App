function Logo() {
  return (
    <div className="z-10 ml-[100px] mr-28 flex cursor-pointer items-center gap-3 ">
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
