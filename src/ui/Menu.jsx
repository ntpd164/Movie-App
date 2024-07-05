import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
      {showButton && (
        <div className="fixed right-[46%] top-10 z-50 w-[130px] cursor-pointer rounded-full bg-primary py-4 pl-5 pr-4 font-poppins-bold text-2xl font-medium text-black hover:bg-[#deca17]">
          <FontAwesomeIcon
            icon={faChevronUp}
            className="fixed top-[37px] text-3xl"
            onClick={scrollToTop}
          />
          <button onClick={scrollToTop} className="ml-10">
            Back to top
          </button>
        </div>
      )}
    </div>
  );
}
