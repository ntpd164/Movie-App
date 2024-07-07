import { useState, useEffect } from 'react';
import Loader from './Loader';
import StarRating from '../StarRating';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const KEY = 'd8bed612';

function MovieDetails({ selectedId, onAddWatched, watched = [], username }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  console.log(selectedId);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await response.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
        setUserRating('');
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = `Movie | ${movie.Title}`;

      return function () {
        document.title = 'DNC';
      };
    },
    [movie.Title]
  );

  function handleAdd() {
    if (!username) {
      navigate('/login');
      return;
    }

    const newWatchedMovie = {
      imdbID: selectedId,
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
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    console.log(newWatchedMovie);
  }
  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="flex ">
            <img className=" w-1/3" src={movie.Poster}></img>
            <div className=" px-8 py-8">
              <h2 className="mb-8 items-center text-5xl">{movie.Title}</h2>
              <div className="space-y-4 text-2xl">
                <p>
                  {movie.Released} &bull; {movie.Runtime}
                </p>
                <p>{movie.Genre}</p>
                <p className=" pr-5">
                  <span>🎬 Director: </span>
                  {movie.Director}
                </p>
                <p>
                  <span>🎭 Actors: </span>
                  {movie.Actors}
                </p>
                <p>
                  <span>⭐️ </span>
                  {movie.imdbRating} IMDb rating
                </p>
              </div>
            </div>
          </header>

          <section className=" text-center">
            <div className="flex flex-col items-center justify-center py-16">
              {!isWatched ? (
                <>
                  <StarRating max={10} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <div className="mt-8">
                      <button
                        className=" rounded bg-blue-500 px-4 py-2 text-2xl font-bold text-white hover:bg-blue-700"
                        onClick={handleAdd}
                      >
                        Add to list
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-3xl">Movie already added to list!</p>
              )}
            </div>
            <h2 className="px-12 py-8 text-2xl">{movie.Plot}</h2>
          </section>

          {showPopup && (
            <div className=" fixed left-1/2 top-0 m-4 -translate-x-1/2 transform rounded-lg bg-green-500 p-4 shadow-lg transition-transform duration-500 ease-out">
              <p className="text-2xl font-medium">
                Movie added to list successfully!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieDetails;
