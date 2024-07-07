import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Footer from '../ui/Footer';

export default function WatchList({ username }) {
  const navigate = useNavigate();

  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  console.log('Watched: ', watched);

  document.title = 'Your Watchlist';

  function handleBack() {
    navigate('/');
  }

  return (
    <div>
      <div
        onClick={handleBack}
        className="ml-20 mt-20 w-[14%] cursor-pointer rounded-lg bg-primary px-6 py-4 font-poppins-semibold text-4xl font-semibold text-black hover:bg-[#deca17]"
      >
        <button>
          <FontAwesomeIcon icon={faArrowLeft} className="" />
        </button>
        <span className="ml-4">Back to home</span>
      </div>
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
        <div className="mb-10 font-poppins-semibold text-3xl font-normal text-black">
          <span>{watched.length}</span>
          {watched.length > 1 ? ' movies' : ' movie'}
        </div>
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
                  <div className="-ml-1 mt-4 flex items-center font-poppins-medium text-2xl font-light text-[#7a7a7a]">
                    <span>⭐️</span>
                    <span className="ml-1 mr-2">{movie.imdbRating}</span>
                    <span>({movie.imdbVotes})</span>
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
      </div>
      <Footer />
    </div>
  );
}
