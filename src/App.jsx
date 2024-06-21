import { useState } from 'react';
import { useMovies } from './useMovies';

import NavBar from './ui/NavBar';
import Loader from './ui/Loader';
import Search from './ui/Search';
import NumResults from './ui/NumResults';
import Main from './ui/Main';
import Box from './ui/Box';
import MovieList from './ui/MovieList';
import MovieDetails from './ui/MovieDetails';
import WatchedSummary from './ui/WatchedSummary';
import useLocalStorageState from './useLocalStorageState';
import WatchedMoviesList from './ui/WatchedMoviesList';

// const KEY = 'd8bed612';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    console.log(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
