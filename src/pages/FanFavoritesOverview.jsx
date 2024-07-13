import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faPlay,
  faPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
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

export default function FanFavoritesOverview() {
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

  document.title = 'Fan Favorites Overview';

  const fanFavoritesIds = [
    'tt22022452',
    'tt12037194',
    'tt12735488',
    'tt15239678',
    'tt1190634',
    'tt1684562',
    'tt23289160',
    'tt11198330',
    'tt19231492',
    'tt12637874',
    'tt17279496',
    'tt2096673',
    'tt0903747',
    'tt0944947',
    'tt22408160',
    'tt14452776',
    'tt0086960',
    'tt21454134',
    'tt16426418',
    'tt1392190',
    'tt14230458',
    'tt0378194',
    'tt1160419',
    'tt3581920',
  ];

  const {
    movies: fanFavoritesMovies,
    isLoading: fanFavoritesIsLoading,
    error: fanFavoritesError,
  } = useMoviesById(fanFavoritesIds);

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
        <div>
          <button
            onClick={() => navigate('/top-picks')}
            className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500"
          >
            top picks
          </button>
        </div>
        <div
          onClick={() => navigate('/fan-favorites')}
          className="relative cursor-pointer"
        >
          <div className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500">
            fan favorites
          </div>
          <div className="absolute bottom-[0.125rem] w-full border-2 border-blue-400"></div>
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
      {fanFavoritesIsLoading && <div>Loading...</div>}
      {fanFavoritesError && <div>Error fetching data</div>}
      {!fanFavoritesIsLoading && !fanFavoritesError && (
        <div className={`mx-[14rem] mt-20 grid grid-cols-6 gap-10`}>
          {fanFavoritesMovies.map((movie, index) => (
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
