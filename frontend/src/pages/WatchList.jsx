import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faChevronCircleDown,
  faUpLong,
  faDownLong,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Footer from '../ui/Footer';
import BackButton from '../ui/BackButton';
import BackToTop from '../ui/BackToTopButton';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function WatchList() {
  const username = localStorage.getItem('loggedInUsername');
  console.log('Username: ', username);
  const [showOrderMenu, setShowOrderMenu] = useState(false);
  const [order, setOrder] = useState('List order');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const [modeDisplay, setModeDisplay] = useState('details');
  const [showBtnBackToTop, setShowBtnBackToTop] = useState(false);

  const [watchlist, setWatchlist] = useState([]);
  const [inittialWatchlist, setInitialWatchlist] = useState([]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch('https://movie-app-server-niy5.onrender.com/watchlist/get', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setWatchlist(data.data.watchlist);
        setInitialWatchlist(data.data.watchlist);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchWatchlist();
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtnBackToTop(window.scrollY > innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // console.log('Watched: ', watched);

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
    let sortedWatched = [...watchlist];
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
        sortedWatched = [...inittialWatchlist];
        if (direction === 'desc') {
          sortedWatched.reverse();
        }
        break;
    }
    // setWatched(sortedWatched);
    setWatchlist(sortedWatched);
  }

  function handleModeChange(mode) {
    console.log('Mode: ', mode);
    setModeDisplay(mode);
  }

  return (
    <div>
      <BackButton />
      {showBtnBackToTop && <BackToTop />}
      <div className="my-20 ml-10 text-2xl md:ml-28">
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
      <div className=" bg-white pb-20 pl-10 pt-28 md:pl-28">
        <div className="mb-10 font-poppins-semibold text-3xl font-normal text-black md:flex">
          <div className="mb-10 mt-3 md:mb-0">
            <span>{watchlist.length}</span>
            {watchlist.length > 1 ? ' movies' : ' movie'}
          </div>
          <div className="flex md:ml-[20rem] lg:ml-[37rem] xl:ml-[60rem]">
            <span className="mt-3 hidden sm:block">Sort by</span>
            <div
              onClick={handleShowOrderMenu}
              className="relative cursor-pointer px-4 py-3 text-[#0472d2] hover:bg-[#ededed] sm:ml-8"
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
                  {/* <div
                    onClick={() => handleOrderChange('Release date')}
                    className={`px-4 py-2 ${
                      order === 'Release date' ? 'bg-[#ededed]' : ''
                    } hover:bg-[#ededed]`}
                  >
                    Release date
                  </div> */}
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
              className="relative ml-[7rem]"
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
          <div className="w-11/12 rounded-md border border-zinc-400 pb-10 pt-14 md:w-11/12 lg:w-3/4">
            {watchlist.map((movie, index) => (
              <div key={movie.imdbID} className="relative mb-10 ml-10">
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
                <p className="mr-4 mt-4 font-poppins-medium text-2xl font-thin text-black">
                  {movie.plot}
                </p>
                <div className="mt-4 font-poppins-medium text-2xl font-thin text-black md:flex">
                  <span className=" font-poppins-regular font-bold">
                    Director
                  </span>
                  <span className="mx-4 cursor-pointer text-[#02679d] hover:underline">
                    {movie.director}
                  </span>
                  <span className="mr-4 font-poppins-regular font-bold">
                    Stars
                  </span>
                  {/* {movie.actors.map((actor, index) => (
                    <span
                      key={index}
                      className="mr-4 cursor-pointer text-[#02679d] hover:underline"
                    >
                      {actor}
                    </span>
                  ))} */}
                  <span
                    key={index}
                    className="mr-4 cursor-pointer text-[#02679d] hover:underline"
                  >
                    {movie.actors}
                  </span>
                </div>
                <div className="absolute -top-4 right-10">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-4xl text-red-dark"
                  />
                </div>
                {index < watchlist.length - 1 && (
                  <div className="mr-10 mt-4 border"></div>
                )}
              </div>
            ))}
          </div>
        )}
        {modeDisplay === 'grid' && (
          <div className="grid w-4/5 gap-10 md:w-11/12 md:max-w-[770px] md:grid-cols-2 lg:w-11/12 lg:max-w-[980px] lg:grid-cols-3 xl:w-11/12 xl:max-w-[1200px] xl:grid-cols-4">
            {watchlist.map((movie, index) => (
              <div
                key={movie.imdbID}
                className="flex flex-col items-center rounded-md border border-zinc-400 shadow-lg"
              >
                <img
                  className="mb-4  w-full md:h-[40rem]"
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
