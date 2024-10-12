function Main({ children }) {
  // flex h-box justify-center gap-10
  return (
    <main className=" max-[739px]:-mt-10 md:mt-64 xl:mt-14">
      <h2 className="font-poppins-bold text-[36px] font-bold text-primary max-[739px]:ml-16 md:ml-28 xl:ml-[140px]">
        What to watch
      </h2>
      {children}
    </main>
  );
}

export default Main;
