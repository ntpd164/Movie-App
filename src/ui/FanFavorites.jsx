import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faPlus,
  faPlay,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function FanFavorites({ fanFavoritesMovies }) {
  const [startIndex, setStartIndex] = useState(0);
  const moviesPerPage = 6;

  const handleNext = () => {
    const newIndex = startIndex + moviesPerPage;
    if (newIndex < fanFavoritesMovies.length) {
      setStartIndex(newIndex);
    } else {
      setStartIndex(0); // Reset về đầu khi hết phim
    }
  };

  const currentMovies = fanFavoritesMovies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  return (
    <div id="fan-favorites" className="mx-[140px] mb-[50px] pt-[30px]">
      <div>
        <div className="mb-4 flex">
          <div className="mr-4 rounded-sm border-2 border-primary"></div>
          <h2 className="font-poppins-semibold text-5xl font-semibold text-white">
            Fan favorites
          </h2>
          <a className="relative">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="absolute left-2 top-1 ml-4 text-4xl text-white"
            />
          </a>
        </div>
        <span className="pfont-poppins-bold text-3xl font-light text-[#a2a2a2]">
          This week&apos;s most popular TV shows and movies
        </span>
      </div>
      <div className="relative mx-auto mt-8 grid grid-cols-6 gap-10">
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
                <button className="ml-auto mr-14 text-[#6588f4]">
                  <FontAwesomeIcon icon={faStar} />
                </button>
              </div>
              <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap pl-8 pt-4 font-poppins-semibold font-medium text-white">
                {movie.Title}
              </p>
              <div className="mx-8 mt-6 flex cursor-pointer items-center justify-center space-x-3 bg-[#2c2c2c] py-2 font-poppins-semibold font-semibold text-[#6588f4]">
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
                <button className="my-1 ml-auto rounded-full px-6 text-4xl hover:bg-[#333333]">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          className="absolute -right-24 top-[44%] z-20 cursor-pointer rounded-md border border-zinc-400 px-6 pb-3 pt-1 text-[30px]"
          onClick={handleNext}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
