import { useState, useEffect } from 'react';
import { useMovies } from '../useMovies';

import NavBar from './NavBar';
import Loader from './Loader';
import Search from './Search';
// import NumResults from './NumResults';
import UserInfo from './UserInfo';
import Main from './Main';
import Box from './Box';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import WatchedSummary from './WatchedSummary';
import useLocalStorageState from '../useLocalStorageState';
import WatchedMoviesList from './WatchedMoviesList';

// const KEY = 'd8bed612';

export default function Home({ movieId }) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(movieId ? movieId : null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('loggedInUsername');
    if (username) {
      setLoggedInUsername(username);
    }
  }, []); // Load username từ localStorage khi component được mount lần đầu

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
        {/* <NumResults movies={movies} /> */}
        <UserInfo username={loggedInUsername} />
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
              username={loggedInUsername}
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
