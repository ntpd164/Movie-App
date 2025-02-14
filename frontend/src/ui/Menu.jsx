import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToTop from './BackToTopButton';

export default function Menu({ username }) {
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setShowButton(window.scrollY > homeBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function onWatchlist() {
    if (username !== '') navigate('/user/watchlist');
    else navigate('/login');
  }

  return (
    <div className="z-10 flex items-center text-white">
      {/* Toggle button for dropdown on small screens */}
      <button
        className="relative flex pr-2 xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <span className="absolute left-12 top-0.5 cursor-pointer text-3xl">
          Menu
        </span>
      </button>

      {/* Menu for xl and larger screens */}
      <ul className="ml-4 mt-1  hidden xl:flex">
        <li className="link mr-20 cursor-pointer font-poppins-regular text-3xl">
          <a href="#top-picks">Top Pickssss</a>
        </li>
        <li className="link cursor-pointer font-poppins-regular text-3xl xl:mr-14">
          <a href="#fan-favorites">Fan Favorites</a>
        </li>
        <li className="link cursor-pointer font-poppins-regular text-3xl xl:mr-14">
          <a href="#popular-celebrities">Celebrities</a>
        </li>
        <li className="link cursor-pointer font-poppins-regular text-3xl xl:mr-14">
          <button onClick={onWatchlist}>Watch List</button>
        </li>
      </ul>

      {/* Dropdown menu for smaller screens */}
      {isOpen && (
        <div className="relative">
          <div className="pointer-events-none absolute -left-2 -top-1 h-0 w-0 rotate-180  transform border-x-[18px] border-y-[14px] border-solid border-transparent border-t-background-500"></div>
          <ul className=" absolute -left-20 top-8 w-48 bg-background-500 text-center xl:hidden">
            <li className="cursor-pointer py-4 font-poppins-regular text-2xl hover:bg-[#565656]">
              <a href="#top-picks" onClick={() => setIsOpen(false)}>
                Top Picks
              </a>
            </li>
            <li className="cursor-pointer py-4 font-poppins-regular text-2xl hover:bg-[#565656]">
              <a href="#fan-favorites" onClick={() => setIsOpen(false)}>
                Fan Favorites
              </a>
            </li>
            <li className="cursor-pointer py-4 font-poppins-regular text-2xl hover:bg-[#565656]">
              <a href="#popular-celebrities" onClick={() => setIsOpen(false)}>
                Celebrities
              </a>
            </li>
            <li className="cursor-pointer py-4 font-poppins-regular text-2xl hover:bg-[#565656]">
              <button
                onClick={() => {
                  onWatchlist();
                  setIsOpen(false);
                }}
              >
                Watch List
              </button>
            </li>
          </ul>
        </div>
      )}

      {showButton && <BackToTop />}
    </div>
  );
}
