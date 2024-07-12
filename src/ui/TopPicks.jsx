import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faPlus,
  faPlay,
  faCircleInfo,
  faCircleCheck,
  faCircleXmark,
  faStar,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
// import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../StarRating';

export default function TopPicks({
  username,
  topPicksMovies,
  onAddWatched,
  onDeleteWatched,
  watched = [],
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [userRating, setUserRating] = useState('');
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [showPopupFail, setShowPopupFail] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const moviesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (showPopupSuccess || showPopupFail || showRating) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showPopupSuccess, showPopupFail, showRating]);

  const handleNext = () => {
    const newIndex = startIndex + moviesPerPage;
    if (newIndex < topPicksMovies.length) {
      setStartIndex(newIndex);
    } else {
      setStartIndex(0); // Reset về đầu khi hết phim
    }
  };

  const currentMovies = topPicksMovies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  const isWatched = (movie) =>
    watched.map((m) => m.imdbID).includes(movie.imdbID);

  function handleSignIn() {
    navigate('/login');
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

    onAddWatched(newWatchedMovie);
    setShowPopupSuccess(true);
    console.log('Add movie: ', newWatchedMovie);
  }

  function handleRating(movie) {
    console.log('movie: ', movie);
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
    onDeleteWatched(movie.imdbID);
    setShowPopupDelete(false);
  }

  return (
    <div id="top-picks" className="mx-[140px] mb-[50px] pt-[30px]">
      {(showPopupSuccess || showPopupFail || showRating) && (
        <div className="popup-overlay"></div>
      )}
      <div>
        <div>
          <div
            onClick={() => navigate('/top-picks')}
            className="group mb-4 flex w-[18rem] cursor-pointer"
          >
            <div className="mr-4 rounded-sm border-2 border-primary"></div>
            <h2 className="font-poppins-semibold text-5xl font-semibold text-white">
              Top picks
            </h2>
            <a className="relative">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="absolute left-2 top-2 ml-4 text-4xl text-white transition-all duration-300 ease-in-out group-hover:text-primary"
              />
            </a>
          </div>
          <span className="mb-5 block font-poppins-bold text-3xl font-light text-[#a2a2a2]">
            TV shows and movies recommended for you
          </span>
          {!username && (
            <a
              onClick={handleSignIn}
              className=" cursor-pointer font-poppins-semibold text-[18px] font-semibold text-blue-500"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
      <div className={`relative mx-auto mt-5 grid grid-cols-6 gap-10`}>
        {currentMovies.map((movie, index) => (
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
                    onClick={() => handleRating(movie)}
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
        <button
          className="absolute -right-24 top-[44%] z-20 cursor-pointer rounded-md border border-zinc-400 px-6 pb-3 pt-1 text-[30px]"
          onClick={handleNext}
        >
          {'>'}
        </button>
      </div>
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
            <button>
              <span
                onClick={() => navigate('/user/watchlist')}
                className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
              >
                Go to watchlist
              </span>
            </button>
            <button>
              <span
                onClick={() => setShowPopupSuccess(false)}
                className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
              >
                OK
              </span>
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
            <button>
              <span
                onClick={() => navigate('/user/watchlist')}
                className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
              >
                Go to watchlist
              </span>
            </button>
            <button>
              <span
                onClick={() => setShowPopupFail(false)}
                className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
              >
                OK
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
