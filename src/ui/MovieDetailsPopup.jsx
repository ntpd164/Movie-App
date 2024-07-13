import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faStar,
  faPlus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function MovieDetailsPopup({
  movie,
  isWatched,
  handleAdd,
  handleDeleteWatched,
  setShowMovieDetail,
}) {
  return (
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
                <span className=" mr-4  font-light">{movie.Year}</span>
                <span className=" absolute -top-1 font-extrabold">.</span>
                <span className="ml-5 mr-3 font-light">{movie.Runtime}</span>
              </div>
            </div>
            <span className="block text-2xl font-light">{movie.Genre}</span>
            <div className="my-2 -ml-1 flex text-2xl">
              <span className="mr-1">⭐️</span>
              <div>
                <span className="font-semibold">{movie.imdbRating}</span>
                <span className="font-light">/10</span>
              </div>
              <button
                className={`ml-6 mr-14 cursor-default ${
                  isWatched(movie) ? 'text-blue-500' : 'text-[#f8f5f5]'
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
            isWatched(movie) ? handleDeleteWatched() : handleAdd(movie);
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
  );
}
