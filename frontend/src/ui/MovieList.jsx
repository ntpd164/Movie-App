function Movie({ movie, onSelectMovie }) {
  return (
    <li
      className="0 grid cursor-pointer grid-cols-[6rem_1fr] grid-rows-[auto_auto] gap-x-8 gap-y-6 divide-solid border-b border-background-100 px-8 py-4 text-3xl hover:bg-background-100"
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img className="row-span-full w-full" src={movie.Poster}></img>
      <h3 className="">{movie.Title}</h3>
      <div className=" items-center">
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="">
      {movies.map((movie) => (
        <Movie key={movie.imbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

export default MovieList;
