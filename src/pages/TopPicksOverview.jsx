import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faPlay,
  faPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoviesById } from '../hooks/useMoviesByID';
import BackButton from '../ui/BackButton';
import Footer from '../ui/Footer';
import BackToTop from '../ui/BackToTopButton';
import SuccessPopup from '../ui/SuccessPopup';
import FailPopup from '../ui/FailPopup';
import RatingPopup from '../ui/RatingPopup';
import MovieDetailsPopup from '../ui/MovieDetailsPopup';
import DeleteWatchedPopup from '../ui/DeleteWatchedPopup';
import Loader from '../ui/Loader';

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
      {showBtnBackToTop && <BackToTop />}
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
      {topPicksIsLoading && (
        // print error in console
        <Loader />
      )}
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
              )}
            </div>
          ))}
          {showPopupSuccess && (
            <SuccessPopup setShowPopupSuccess={setShowPopupSuccess} />
          )}
          {showPopupFail && <FailPopup setShowPopupFail={setShowPopupFail} />}
        </div>
      )}
      <Footer />
    </div>
  );
}
