import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faChevronCircleDown,
  faUpLong,
  faDownLong,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Footer from '../ui/Footer';
import BackButton from '../ui/BackButton';

export default function WatchList() {
  const username = localStorage.getItem('loggedInUsername');
  const [showOrderMenu, setShowOrderMenu] = useState(false);
  const [order, setOrder] = useState('List order');
  const [sortDirection, setSortDirection] = useState('asc');
  const [watched, setWatched] = useState(
    JSON.parse(localStorage.getItem('watched')) || []
  );
  const [modeDisplay, setModeDisplay] = useState('details');
  const [showBtnBackToTop, setShowBtnBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBtnBackToTop(window.scrollY > innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log('Watched: ', watched);

  document.title = 'Your Watchlist';

  function handleShowOrderMenu() {
    setShowOrderMenu(!showOrderMenu);
  }

  function handleOrderChange(order) {
    setOrder(order);
    setShowOrderMenu(false);
    setSortDirection('asc');
    sortWatched(order, 'asc');
  }

  function handleSortDirection() {
    setSortDirection((prevDirection) => {
      const newDirection = prevDirection === 'asc' ? 'desc' : 'asc';
      sortWatched(order, newDirection);
      return newDirection;
    });
  }

  function sortWatched(order, direction) {
    let sortedWatched = [...watched];
    switch (order) {
      case 'Alphabetical':
        sortedWatched.sort((a, b) =>
          direction === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case 'IMDb rating':
        sortedWatched.sort((a, b) =>
          direction === 'asc'
            ? a.imdbRating - b.imdbRating
            : b.imdbRating - a.imdbRating
        );
        break;
      case 'Release date':
        sortedWatched.sort((a, b) =>
          direction === 'asc' ? a.year - b.year : b.year - a.year
        );
        break;
      case 'Runtime':
        sortedWatched.sort((a, b) =>
          direction === 'asc' ? a.runtime - b.runtime : b.runtime - a.runtime
        );
        break;
      case 'Your rating':
        sortedWatched.sort((a, b) =>
          direction === 'asc'
            ? a.userRating - b.userRating
            : b.userRating - a.userRating
        );
        break;
      default:
        sortedWatched = JSON.parse(localStorage.getItem('watched')) || [];
        if (direction === 'desc') {
          sortedWatched.reverse();
        }
        break;
    }
    setWatched(sortedWatched);
  }

  function handleModeChange(mode) {
    console.log('Mode: ', mode);
    setModeDisplay(mode);
  }

  return (
    <div>
      <BackButton />
      {showBtnBackToTop && (
        <div className="fixed right-[46%] top-10 z-10 w-[130px] cursor-pointer rounded-full bg-primary py-4 pl-5 pr-4 font-poppins-bold text-2xl font-medium text-black hover:bg-[#deca17]">
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
      <div className="my-20 ml-28 text-2xl">
        <h2 className="text-5xl font-semibold text-white">Your Watchlist</h2>
        <div className="relative mt-8">
          <span className=" mr-2  font-medium">by</span>
          <span className=" mr-2 cursor-pointer font-semibold text-[#278af4] hover:underline">
            {username}
          </span>
          <span className=" absolute -top-1 font-extrabold">.</span>
        </div>
        <p className="mt-10 font-poppins-medium font-extralight text-[#a9a9a9]">
          Your Watchlist is the place to track the titles you want to watch. You
          can sort your Watchlist by the IMDb rating, popularity score and
          arrange your titles in the order you want to see them.
        </p>
      </div>
      <div className=" bg-white pb-20 pl-28 pt-28">
        <div className="mb-10 flex font-poppins-semibold text-3xl font-normal text-black">
          <div className="mt-3">
            <span>{watched.length}</span>
            {watched.length > 1 ? ' movies' : ' movie'}
          </div>
          <div className="ml-[45rem] flex">
            <span className="mt-3">Sort by</span>
            <div
              onClick={handleShowOrderMenu}
              className="relative ml-8 cursor-pointer px-4 py-3 text-[#0472d2] hover:bg-[#ededed]"
            >
              <button className="">{order}</button>
              <FontAwesomeIcon icon={faChevronCircleDown} className="ml-3" />
              {showOrderMenu && (
                <div className="absolute -left-6 mt-2 w-[120%] rounded-md border border-zinc-400 bg-white font-poppins-medium font-light text-black">
                  <div
                    onClick={() => handleOrderChange('List order')}
                    className={`px-4 py-2 ${
                      order === 'List order' ? 'bg-[#ededed]' : ''
                    } hover:bg-[#ededed]`}
                  >
                    List order
                  </div>
                  <div
                    onClick={() => handleOrderChange('Alphabetical')}
                    className={`px-4 py-2 ${
                      order === 'Alphabetical' ? 'bg-[#ededed]' : ''
                    } hover:bg-[#ededed]`}
                  >
                    Alphabetical
                  </div>
                  <div
                    onClick={() => handleOrderChange('IMDb rating')}
                    className={`px-4 py-2 ${
                      order === 'IMDb rating' ? 'bg-[#ededed]' : ''
                    } hover:bg-[#ededed]`}
                  >
                    IMDb rating
                  </div>
                  <div
                    onClick={() => handleOrderChange('Release date')}
                    className={`px-4 py-2 ${
                      order === 'Release date' ? 'bg-[#ededed]' : ''
                    } hover:bg-[#ededed]`}
                  >
                    Release date
                  </div>
                  <div
                    onClick={() => handleOrderChange('Runtime')}
                    className={`px-4 py-2 ${
                      order === 'Runtime' ? 'bg-[#ededed]' : ''
                    } hover:bg-[#ededed]`}
                  >
                    Runtime
                  </div>
                  <div
                    onClick={() => handleOrderChange('Your rating')}
                    className={`px-4 py-2 ${
                      order === 'Your rating' ? 'bg-[#ededed]' : ''
                    } hover:bg-[#ededed]`}
                  >
                    Your rating
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                onClick={handleSortDirection}
                className="absolute -bottom-3 left-4 cursor-pointer rounded-full pb-5 pr-9 pt-10 hover:bg-[#ededed]"
              >
                <FontAwesomeIcon
                  icon={faUpLong}
                  className={`absolute top-5 ml-8 ${
                    sortDirection === 'asc'
                      ? 'text-[#0472d2]'
                      : 'text-[#7a7a7a]'
                  }`}
                />
                <FontAwesomeIcon
                  icon={faDownLong}
                  className={`ml-12 ${
                    sortDirection === 'desc'
                      ? 'text-[#0472d2]'
                      : 'text-[#7a7a7a]'
                  }`}
                />
              </div>
            </div>
            <div
              onClick={() => handleModeChange('details')}
              className="relative ml-[8rem] "
            >
              <div className="absolute -top-6 cursor-pointer rounded-full px-12 py-12 hover:bg-[#ededed]">
                <div className="absolute left-6 top-[1.1rem] flex">
                  <div
                    className={`absolute top-4 h-2 w-2 rounded-full ${
                      modeDisplay === 'details'
                        ? 'bg-[#0472d2]'
                        : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-[0.6rem] top-4 h-2 w-10 rounded-xl ${
                      modeDisplay === 'details'
                        ? 'bg-[#0472d2]'
                        : 'bg-[#5f5e5e]'
                    }`}
                  ></div>
                </div>
                <div className="absolute left-6 top-4 flex">
                  <div
                    className={`absolute top-7 h-2 w-2 rounded-full ${
                      modeDisplay === 'details'
                        ? 'bg-[#0472d2]'
                        : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-[0.6rem] top-7 h-2 w-10 rounded-xl ${
                      modeDisplay === 'details'
                        ? 'bg-[#0472d2]'
                        : 'bg-[#5f5e5e]'
                    }`}
                  ></div>
                </div>
                <div className="absolute left-6 top-[0.9rem] flex">
                  <div
                    className={`absolute top-10 h-2 w-2 rounded-full ${
                      modeDisplay === 'details'
                        ? 'bg-[#0472d2]'
                        : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-[0.6rem] top-10 h-2 w-10 rounded-xl ${
                      modeDisplay === 'details'
                        ? 'bg-[#0472d2]'
                        : 'bg-[#5f5e5e]'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleModeChange('grid')}
              className="relative ml-[7rem] "
            >
              <div className="absolute -left-4 -top-6 cursor-pointer rounded-full py-10 pb-14 pl-20 pr-4  hover:bg-[#ededed]">
                <div className="absolute left-8 top-4 flex">
                  <div
                    className={`absolute top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-3 top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-6 top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                </div>
                <div className="absolute left-8 top-7 flex">
                  <div
                    className={`absolute top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-3 top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-6 top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                </div>
                <div className="absolute left-8 top-10 flex">
                  <div
                    className={`absolute top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-3 top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                  <div
                    className={`absolute left-6 top-4 h-2 w-2 rounded-sm ${
                      modeDisplay === 'grid' ? 'bg-[#0472d2]' : 'bg-[#5f5e5e]'
                    } text-3xl`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modeDisplay === 'details' && (
          <div className="w-2/3 rounded-md border border-zinc-400 pb-10 pt-14">
            {watched.map((movie, index) => (
              <div key={movie.imdbID} className="mb-10 ml-10">
                <div className="flex">
                  <img
                    className="w-1/8 h-[120px]"
                    src={movie.poster}
                    alt={movie.title}
                  />
                  <div className="my-auto ml-4">
                    <h2 className=" font-poppins-medium text-3xl font-semibold text-black">
                      {index + 1}. {movie.title}
                    </h2>
                    <div className="mt-4 flex items-center font-poppins-medium text-2xl font-light text-[#7a7a7a]">
                      <span className="mr-6">{movie.year}</span>
                      <span>{movie.runtime} minutes</span>
                    </div>
                    <div className="relative -ml-1 mt-4 flex items-center font-poppins-medium text-2xl font-light text-[#7a7a7a]">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="absolute left-1 top-[1px] text-primary"
                      />
                      <span className="ml-10 mr-2">{movie.imdbRating}</span>
                      <span className="">({movie.imdbVotes})</span>
                      <div className="relative ml-14">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="absolute left-0 top-[1px] text-[#116bd9]"
                        />
                        <span className="ml-9">{movie.userRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 font-poppins-medium text-2xl font-thin text-black">
                  {movie.plot}
                </p>
                <div className="mt-4 flex font-poppins-medium text-2xl font-thin text-black">
                  <span className=" font-poppins-regular font-bold">
                    Director
                  </span>
                  <span className="mx-4 cursor-pointer text-[#02679d] hover:underline">
                    {movie.director}
                  </span>
                  <span className="mr-4 font-poppins-regular font-bold">
                    Stars
                  </span>
                  {movie.actors.map((actor, index) => (
                    <span
                      key={index}
                      className="mr-4 cursor-pointer text-[#02679d] hover:underline"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
                {index < watched.length - 1 && (
                  <div className="mr-10 mt-4 border"></div>
                )}
              </div>
            ))}
          </div>
        )}
        {modeDisplay === 'grid' && (
          <div className="grid w-2/3 grid-cols-4 gap-10">
            {watched.map((movie, index) => (
              <div
                key={movie.imdbID}
                className="flex flex-col items-center rounded-md border border-zinc-400 shadow-lg"
              >
                <img
                  className="mb-4  h-[30rem] w-full"
                  src={movie.poster}
                  alt={movie.title}
                />
                <h2 className=" px-10 font-poppins-medium text-2xl font-semibold text-black">
                  {index + 1}. {movie.title}
                </h2>
                <div className="mt-4 flex items-center font-poppins-medium text-2xl font-light text-[#7a7a7a]">
                  <span className="mr-6">{movie.year}</span>
                  <span>{movie.runtime} minutes</span>
                </div>
                <div className="relative my-4 -ml-1 flex items-center font-poppins-medium text-2xl font-light text-[#7a7a7a]">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="absolute left-1 top-[1px] text-primary"
                  />
                  <span className="ml-10 mr-2">{movie.imdbRating}</span>
                  <span className="">({movie.imdbVotes})</span>
                  <div className="relative ml-14">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="absolute left-0 top-[1px] text-[#116bd9]"
                    />
                    <span className="ml-9">{movie.userRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
