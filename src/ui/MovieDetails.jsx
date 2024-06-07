import { useState, useEffect } from 'react';
import Loader from './Loader';

const KEY = 'd8bed612';

function MovieDetails({ selectedId }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="flex ">
            <img className=" w-1/3" src={movie.Poster}></img>
            <div className="bg-background-100 px-8 py-8">
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

          <section>
            <h2 className="px-12 py-8 text-2xl">{movie.Plot}</h2>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
