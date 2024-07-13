function Main({ children }) {
  // flex h-box justify-center gap-10
  return (
    <main className="mt-14 ">
      <h2 className="ml-[140px] font-poppins-bold text-[36px] font-bold text-primary">
        What to watch
      </h2>
      {children}
    </main>
  );
}

export default Main;
