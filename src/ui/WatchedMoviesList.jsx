function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li className="relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] items-center gap-x-6 border-b border-background-100 p-4 pb-4 pl-8 pr-8 text-base hover:cursor-pointer hover:bg-background-100">
      <img
        className="row-span-full w-full"
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3 className="flex text-3xl">{movie.title}</h3>
      <div className="flex items-center gap-12 text-2xl">
        <p className="flex items-center gap-2">
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
