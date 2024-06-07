function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* <span className="text-6xl" role="img">
        🍿
      </span> */}
      <img className="w-16" src="./src/assets/logo.png"></img>
      <h1 className="text-4xl font-semibold text-white">DNCinema</h1>
    </div>
  );
}
export default Logo;
