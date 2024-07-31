import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToTop from './BackToTopButton';

export default function Menu({ username }) {
  const [showButton, setShowButton] = useState(false);
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
      <ul className="z-10 ml-4 mt-1 flex ">
        {/* <li className="group relative mr-20 mt-1 cursor-pointer font-poppins-regular text-3xl">
          <a href="#home">Home</a>
          <div className="absolute -bottom-3 hidden h-[1px] w-full bg-white group-hover:block "></div>
        </li> */}
        <li className="link mr-20 cursor-pointer font-poppins-regular text-3xl">
          <a href="#top-picks">Top Picks</a>
        </li>
        <li className="link mr-20 cursor-pointer font-poppins-regular text-3xl">
          <a href="#fan-favorites">Fan Favorites</a>
        </li>
        <li className="link mr-20 cursor-pointer font-poppins-regular text-3xl">
          <a href="#popular-celebrities">Celebrities</a>
        </li>
        <li className="link mr-20 cursor-pointer font-poppins-regular text-3xl">
          <button onClick={onWatchlist}>Watch List</button>
        </li>
      </ul>
      {showButton && <BackToTop />}
    </div>
  );
}
