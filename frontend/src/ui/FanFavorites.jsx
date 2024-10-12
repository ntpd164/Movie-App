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

export default function FanFavorites({
  username,
  fanFavoritesMovieIds,
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
  const navigate = useNavigate();

  const {
    movies: fanFavoritesMovies,
    isLoading: fanFavoritesIsLoading,
    error: fanFavoritesError,
  } = useMoviesById(fanFavoritesMovieIds);

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
  //   if (newIndex < fanFavoritesMovies.length) {
  //     setStartIndex(newIndex);
  //   } else {
  //     setStartIndex(0);
  //   }
  // };

  // const currentMovies = fanFavoritesMovies.slice(
  //   startIndex,
  //   startIndex + moviesPerPage
  // );

  const isWatched = (movie) =>
    watched.map((m) => m.imdbID).includes(movie.imdbID);

  function handleSignIn() {
    navigate('/login');
  }

  async function handleAdd(movie) {
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
      year: String(movie.Year),
      poster: movie.Poster,
      director: movie.Director,
      actors: movie.Actors,
      plot: movie.Plot,
      imdbRating: String(movie.imdbRating),
      imdbVotes: movie.imdbVotes,
      runtime: String(movie.Runtime.split(' ')[0]),
      userRating: String(userRating),
    };

    onAddWatched(newWatchedMovie);
    setShowPopupSuccess(true);
    console.log('Add movie: ', newWatchedMovie);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://movie-app-server-niy5.onrender.com/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newWatchedMovie),
      });

      console.log('response: ', response);

      if (response.ok) {
        // onAddWatched(newWatchedMovie);
        setShowPopupSuccess(true);
        console.log('Add movie to database: ', newWatchedMovie);
      } else {
        setShowPopupFail(true);
        console.error('Error adding movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setShowPopupFail(true);
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    <div
      id="fan-favorites"
      className="mb-[50px] pt-[30px] max-[739px]:mx-16 md:mx-28 xl:mx-[140px]"
    >
      {(showPopupSuccess ||
        showPopupFail ||
        showRating ||
        showMovieDetail ||
        showPopupDelete) && <div className="popup-overlay"></div>}
      <div>
        <div>
          <div
            onClick={() => navigate('/fan-favorites')}
            className="group mb-4 flex w-[22rem] cursor-pointer"
          >
            <div className="mr-4 rounded-sm border-2 border-primary"></div>
            <h2 className="font-poppins-semibold text-4xl font-semibold text-white sm:text-5xl">
              Fan favorites
            </h2>
            <a className="relative">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="absolute left-2 top-2 ml-4 text-3xl text-white transition-all duration-300 ease-in-out group-hover:text-primary sm:text-4xl"
              />
            </a>
          </div>
          <span className="mb-5 block font-poppins-bold text-3xl font-light text-[#a2a2a2]">
            The most popular movies among our fans
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
      {fanFavoritesIsLoading && <Loader />}
      {fanFavoritesError && <p>Error: {fanFavoritesError.message}</p>}
      {!fanFavoritesIsLoading && !fanFavoritesError && (
        <div className="relative">
          <Slider {...settings}>
            {fanFavoritesMovies.map((movie, index) => (
              <div key={index} className="pl-10 pr-9 md:px-2 xl:px-4">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="h-[300px] w-full"
                />
                <div className="bg-[#1a1a1a] text-3xl">
                  <div className="flex items-center pl-14 pt-6 md:pl-4 xl:pl-8">
                    <span className="mr-1">⭐️</span>
                    <span>{movie.imdbRating}</span>
                    <button
                      className={`ml-auto mr-14 cursor-default md:mr-6 xl:mr-14 ${
                        isWatched(movie) ? 'text-blue-500' : 'text-[#f8f5f5]'
                      }`}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </button>
                  </div>
                  <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap pl-14 pt-4 font-poppins-semibold font-medium text-white md:pl-4 xl:pl-8">
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
                  <div className="mx-10 flex py-8 md:mx-0 xl:mx-8">
                    <div className="mb-4 mt-5 cursor-pointer rounded-md text-2xl hover:bg-[#333333]">
                      <button className="my-3 ml-5 mr-4">
                        <FontAwesomeIcon icon={faPlay} />
                      </button>
                      <span className="font-poppins-regular font-semibold md:mr-1 xl:mr-5">
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
                )} */}
                {/* {showMovieDetail && currentMovie === movie && (
                  <MovieDetailsPopup
                    movie={movie}
                    isWatched={isWatched}
                    handleAdd={handleAdd}
                    handleDeleteWatched={handleDeleteWatched}
                    setShowMovieDetail={setShowMovieDetail}
                  />
                )} */}
                {/* {showPopupDelete && currentMovie === movie && (
                  <DeleteWatchedPopup
                    setShowPopupDelete={setShowPopupDelete}
                    confirmDeleteWatched={confirmDeleteWatched}
                    movie={movie}
                  />
                )} */}
              </div>
            ))}
          </Slider>
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
