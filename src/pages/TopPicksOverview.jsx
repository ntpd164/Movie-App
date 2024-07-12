import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faPlay,
  faPlus,
  faStar,
  faCircleCheck,
  faCircleXmark,
  faCheck,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import StarRating from '../StarRating';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoviesById } from '../useMoviesById';
import BackButton from '../ui/BackButton';
import Footer from '../ui/Footer';

export default function TopPicksOverview() {
  const [userRating, setUserRating] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [showPopupFail, setShowPopupFail] = useState(false);
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showBtnBackToTop, setShowBtnBackToTop] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (
      showRating ||
      showPopupSuccess ||
      showPopupFail ||
      showMovieDetail ||
      showPopupDelete
    ) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [
    showRating,
    showPopupSuccess,
    showPopupFail,
    showMovieDetail,
    showPopupDelete,
  ]);

  document.title = 'Top Picks Overview';

  const topPicksMovieIds = [
    'tt0468569',
    'tt0167260',
    'tt0111161',
    'tt0108052',
    'tt0114369',
    'tt0816692',
    'tt1375666',
    'tt1745960',
    'tt0060196',
    'tt0120737',
    'tt0073486',
    'tt0372784',
    'tt2582802',
    'tt0120815',
    'tt0944947',
    'tt0903747',
    'tt0068646',
    'tt0172495',
    'tt0407887',
    'tt4154756',
    'tt7286456',
    'tt2788316',
    'tt0773262',
    'tt0086250',
  ];

  const {
    movies: topPicksMovies,
    isLoading: topPicksIsLoading,
    error: topPicksError,
  } = useMoviesById(topPicksMovieIds);

  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  console.log('watched: ', watched);
  const username = localStorage.getItem('loggedInUsername');

  const isWatched = (movie) =>
    watched.map((m) => m.imdbID).includes(movie.imdbID);

  function handleAddWatched(movie) {
    const newWatched = [...watched, movie];
    localStorage.setItem('watched', JSON.stringify(newWatched));
  }

  function handleAdd(movie) {
    if (!username) {
      navigate('/login');
      return;
    }

    setShowMovieDetail(false);

    if (isWatched(movie)) {
      setShowPopupFail(true);
      return;
    }

    console.log('user rating: ', userRating);

    if (userRating === '') {
      setCurrentMovie(movie);
      setShowRating(true);
      return;
    }

    const newWatchedMovie = {
      imdbID: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      director: movie.Director,
      actors: movie.Actors.split(', '),
      plot: movie.Plot,
      imdbRating: Number(movie.imdbRating),
      imdbVotes: movie.imdbVotes,
      runtime: Number(movie.Runtime.split(' ')[0]),
      userRating,
    };

    handleAddWatched(newWatchedMovie);
    setShowPopupSuccess(true);
    console.log('Add movie: ', newWatchedMovie);
  }

  function handleRating() {
    if (currentMovie) {
      setShowRating(false);
      handleAdd(currentMovie);
      setUserRating('');
    }
  }

  function handleShowMovieDetail(movie) {
    setCurrentMovie(movie);
    setShowMovieDetail(true);
  }

  function handleDeleteWatched() {
    setShowMovieDetail(false);
    setShowPopupDelete(true);
  }

  function confirmDeleteWatched(movie) {
    const newWatched = watched.filter((m) => m.imdbID !== movie.imdbID);
    localStorage.setItem('watched', JSON.stringify(newWatched));
    setShowPopupDelete(false);
  }

  return (
    <div>
      {(showPopupSuccess ||
        showPopupFail ||
        showRating ||
        showMovieDetail ||
        showPopupDelete) && <div className="popup-overlay"></div>}
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
      <h1 className="ml-[14rem] mt-20 font-poppins-semibold text-[5rem] font-medium text-white">
        What to watch
      </h1>
      <div className="ml-[12rem] mt-20 flex">
        <div
          onClick={() => navigate('/top-picks')}
          className="relative cursor-pointer"
        >
          <div className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500">
            top picks
          </div>
          <div className="absolute bottom-[0.125rem] w-full border-2 border-blue-400"></div>
        </div>
        <div>
          <button
            onClick={() => navigate('/fan-favorites')}
            className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500"
          >
            fan favorites
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate('/watchlist')}
            className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500"
          >
            from your watchlist
          </button>
        </div>
      </div>
      {topPicksIsLoading && <div>Loading...</div>}
      {topPicksError && <div>Error fetching data</div>}
      {!topPicksIsLoading && !topPicksError && (
        <div className={`mx-[14rem] mt-20 grid grid-cols-6 gap-10`}>
          {topPicksMovies.map((movie, index) => (
            <div key={index} className="">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="h-[300px] w-full"
              />
              <div className="bg-[#1a1a1a] text-3xl">
                <div className="flex items-center pl-8 pt-6">
                  <span className="mr-1">⭐️</span>
                  <span>{movie.imdbRating}</span>
                  <button
                    className={`ml-auto mr-14 cursor-default ${
                      isWatched(movie) ? 'text-blue-500' : 'text-[#f8f5f5]'
                    }`}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </button>
                </div>
                <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap pl-8 pt-4 font-poppins-semibold font-medium text-white">
                  {movie.Title}
                </p>
                <div
                  onClick={() => handleAdd(movie)}
                  className="mx-8 mt-6 flex cursor-pointer items-center justify-center space-x-3 bg-[#2c2c2c] py-2 font-poppins-semibold font-semibold text-[#6588f4] hover:bg-[#414141]"
                >
                  <button>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <span>Watchlist</span>
                </div>
                <div className="mx-8 flex py-8">
                  <div className="mb-4 mt-5 cursor-pointer rounded-md text-2xl hover:bg-[#333333]">
                    <button className="my-3 ml-5 mr-4">
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <span className="mr-5 font-poppins-regular font-semibold">
                      Trailer
                    </span>
                  </div>
                  <button
                    onClick={() => handleShowMovieDetail(movie)}
                    className="my-1 ml-auto rounded-full px-6 text-4xl hover:bg-[#333333]"
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </button>
                </div>
              </div>
              {showRating && currentMovie === movie && (
                <div className="fixed left-1/2 top-1/4 z-30 m-4 w-[40rem] -translate-x-1/2 transform rounded-lg bg-background-500 p-4 shadow-lg transition-transform duration-500 ease-out">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="mx-auto mt-10 flex text-[8rem] text-blue-400"
                  />
                  <div className="absolute right-3 top-2 text-red-dark">
                    <button
                      className=" text-5xl "
                      onClick={() => setShowRating(false)}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </div>
                  <div className="">
                    <p className="my-10 flex justify-center font-poppins-regular text-4xl font-semibold text-primary">
                      Please rate the movie!
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <StarRating max={10} onSetRating={setUserRating} />
                  </div>
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={() => handleRating()}
                      className={`${
                        userRating > 0
                          ? 'bg-primary text-black'
                          : 'pointer-events-none cursor-default bg-background-100'
                      } mb-5 block w-[20rem] rounded-md px-8 py-3 font-poppins-semibold text-3xl `}
                    >
                      Rate
                    </button>
                  </div>
                </div>
              )}
              {showMovieDetail && currentMovie === movie && (
                <div className="fixed left-1/2 top-1/4 z-30 m-4 -translate-x-1/2 transform rounded-lg bg-background-500 p-4 shadow-lg transition-transform duration-500 ease-out">
                  <div className="relative ml-6 mt-6">
                    <div className="absolute -top-6 right-0 text-red-dark">
                      <button
                        className=" text-5xl "
                        onClick={() => setShowMovieDetail(false)}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </button>
                    </div>
                    <div className="flex">
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="h-[15rem] w-[10rem]"
                      />
                      <div className="my-auto ml-6">
                        <h2 className="font-poppins-semibold text-4xl font-semibold text-white">
                          {movie.Title}
                        </h2>
                        <div className="my-2 flex text-2xl">
                          <div className="relative mt-1">
                            <span className=" mr-4  font-light">
                              {movie.Year}
                            </span>
                            <span className=" absolute -top-1 font-extrabold">
                              .
                            </span>
                            <span className="ml-5 mr-3 font-light">
                              {movie.Runtime}
                            </span>
                          </div>
                        </div>
                        <span className="block text-2xl font-light">
                          {movie.Genre}
                        </span>
                        <div className="my-2 -ml-1 flex text-2xl">
                          <span className="mr-1">⭐️</span>
                          <div>
                            <span className="font-semibold">
                              {movie.imdbRating}
                            </span>
                            <span className="font-light">/10</span>
                          </div>
                          <button
                            className={`ml-6 mr-14 cursor-default ${
                              isWatched(movie)
                                ? 'text-blue-500'
                                : 'text-[#f8f5f5]'
                            }`}
                          >
                            <FontAwesomeIcon icon={faStar} />
                          </button>
                        </div>
                        <p className="-ml-1 text-2xl font-light">
                          <span>🎭 Actors: </span>
                          {movie.Actors}
                        </p>
                      </div>
                    </div>

                    <h3 className="mr-6 mt-4 max-w-[50rem] font-poppins-semibold text-2xl font-medium text-white">
                      {movie.Plot}
                    </h3>
                    <div
                      onClick={() => {
                        isWatched(movie)
                          ? handleDeleteWatched()
                          : handleAdd(movie);
                      }}
                      className="mb-6 mr-6 mt-10 flex cursor-pointer items-center justify-center space-x-3 bg-[#2c2c2c] py-2 font-poppins-semibold text-3xl font-semibold text-[#6588f4] hover:bg-[#414141]"
                    >
                      {isWatched(movie) ? (
                        <button>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      ) : (
                        <button>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                      <span>Watchlist</span>
                    </div>
                  </div>
                </div>
              )}
              {showPopupDelete && currentMovie === movie && (
                <div className="fixed left-1/2 top-1/4 z-30 m-4 -translate-x-1/2 transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-500 ease-out">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="mx-auto mt-10 flex text-[8rem] text-red-dark"
                  />
                  <div className="">
                    <p className="mt-14 flex justify-center font-poppins-regular text-4xl font-semibold text-black">
                      Do you want to delete this movie from your watchlist?
                    </p>
                  </div>
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={() => setShowPopupDelete(false)}
                      className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
                    >
                      No
                    </button>
                    <button
                      onClick={() => confirmDeleteWatched(movie)}
                      className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {showPopupSuccess && (
            <div className="fixed left-1/2 top-1/4 z-30 m-4 -translate-x-1/2 transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-500 ease-out">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="mx-auto mt-10 flex text-[8rem] text-green-500"
              />
              <div className="">
                <p className="mt-14 flex justify-center font-poppins-regular text-4xl font-semibold text-black">
                  Movie added to list successfully!
                </p>
                <p className="mt-2 flex justify-center font-poppins-medium text-3xl font-light text-[#5c5c5c]">
                  Check your watchlist for more details.
                </p>
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => navigate('/user/watchlist')}
                  className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
                >
                  Go to watchlist
                </button>
                <button
                  onClick={() => setShowPopupSuccess(false)}
                  className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
                >
                  OK
                </button>
              </div>
            </div>
          )}
          {showPopupFail && (
            <div className="fixed left-1/2 top-1/4 z-30 m-4 -translate-x-1/2 transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-500 ease-out">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="mx-auto mt-10 flex text-[8rem] text-red-dark"
              />
              <div className="">
                <p className="mt-14 flex justify-center font-poppins-regular text-4xl font-semibold text-black">
                  Movie already added to list!
                </p>
                <p className="mt-2 flex justify-center font-poppins-medium text-3xl font-light text-[#5c5c5c]">
                  Check your watchlist for more details.
                </p>
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => navigate('/user/watchlist')}
                  className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
                >
                  Go to watchlist
                </button>
                <button
                  onClick={() => setShowPopupFail(false)}
                  className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
