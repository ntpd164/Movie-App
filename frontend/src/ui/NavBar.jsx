function NavBar({ children }) {
  return (
    <div className="z-10 hidden w-full items-center justify-between pt-10 lg:flex">
      {children}
    </div>
  );
}
export default NavBar;
