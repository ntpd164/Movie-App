import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faPlus,
  faPlay,
  faCircleInfo,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
// import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from './SuccessPopup';
import FailPopup from './FailPopup';
import RatingPopup from './RatingPopup';
import MovieDetailsPopup from './MovieDetailsPopup';
import DeleteWatchedPopup from './DeleteWatchedPopup';
import { useMoviesById } from '../hooks/useMoviesByID';
import Loader from './Loader';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

export default function TopPicks({
  username,
  topPicksMovieIds,
  onAddWatched,
  onDeleteWatched,
  watched = [],
}) {
  // const [startIndex, setStartIndex] = useState(0);
  const [userRating, setUserRating] = useState('');
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [showPopupFail, setShowPopupFail] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showMovieDetail, setShowMovieDetail] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  // const moviesPerPage = 6;
  const navigate = useNavigate();

  const {
    movies: topPicksMovies,
    isLoading: topPicksIsLoading,
    error: topPicksError,
  } = useMoviesById(topPicksMovieIds);

  useEffect(() => {
    if (
      showPopupSuccess ||
      showPopupFail ||
      showRating ||
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
    showPopupSuccess,
    showPopupFail,
    showRating,
    showMovieDetail,
    showPopupDelete,
  ]);

  // const handleNext = () => {
  //   const newIndex = startIndex + moviesPerPage;
  //   if (newIndex < topPicksMovies.length) {
  //     setStartIndex(newIndex);
  //   } else {
  //     setStartIndex(0);
  //   }
  // };

  // const currentMovies = topPicksMovies.slice(
  //   startIndex,
  //   startIndex + moviesPerPage
  // );

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

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
      {(showPopupSuccess ||
        showPopupFail ||
        showRating ||
        showMovieDetail ||
        showPopupDelete) && <div className="popup-overlay"></div>}
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
      {topPicksIsLoading && <Loader />}
      {topPicksError && <div>Error loading movies</div>}
      {!topPicksIsLoading && !topPicksError && (
        <div className="relative">
          <Slider {...settings}>
            {topPicksMovies.map((movie, index) => (
              <div key={index} className="px-4">
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
                {/* {showRating && currentMovie === movie && (
                  <RatingPopup
                    setShowRating={setShowRating}
                    movie={movie}
                    setUserRating={setUserRating}
                    userRating={userRating}
                    handleRating={handleRating}
                  />
                )}
                {showMovieDetail && currentMovie === movie && (
                  <MovieDetailsPopup
                    movie={movie}
                    isWatched={isWatched}
                    handleAdd={handleAdd}
                    handleDeleteWatched={handleDeleteWatched}
                    setShowMovieDetail={setShowMovieDetail}
                  />
                )}
                {showPopupDelete && currentMovie === movie && (
                  <DeleteWatchedPopup
                    setShowPopupDelete={setShowPopupDelete}
                    confirmDeleteWatched={confirmDeleteWatched}
                    movie={movie}
                  />
                )} */}
              </div>
            ))}
          </Slider>
          {/* <button
            className="absolute -right-24 top-[44%] z-10 cursor-pointer rounded-md border border-zinc-400 px-6 pb-3 pt-1 text-[30px]"
            onClick={handleNext}
          >
            {'>'}
          </button> */}
        </div>
      )}
      {showRating && (
        <RatingPopup
          setShowRating={setShowRating}
          movie={currentMovie}
          setUserRating={setUserRating}
          userRating={userRating}
          handleRating={handleRating}
        />
      )}
      {showMovieDetail && (
        <MovieDetailsPopup
          movie={currentMovie}
          isWatched={isWatched}
          handleAdd={handleAdd}
          handleDeleteWatched={handleDeleteWatched}
          setShowMovieDetail={setShowMovieDetail}
        />
      )}
      {showPopupDelete && (
        <DeleteWatchedPopup
          setShowPopupDelete={setShowPopupDelete}
          confirmDeleteWatched={confirmDeleteWatched}
          movie={currentMovie}
        />
      )}
      {showPopupSuccess && (
        <SuccessPopup setShowPopupSuccess={setShowPopupSuccess} />
      )}
      {showPopupFail && <FailPopup setShowPopupFail={setShowPopupFail} />}
    </div>
  );
}
