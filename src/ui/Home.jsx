import { useState, useEffect } from 'react';
import { useMovies } from '../useMovies';

import NavBar from './NavBar';
import Loader from './Loader';
import Search from './Search';
import Logo from './Logo';
import Menu from './Menu';
// import NumResults from './NumResults';
import UserInfo from './UserInfo';
import Main from './Main';
import Box from './Box';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import WatchedSummary from './WatchedSummary';
import useLocalStorageState from '../useLocalStorageState';
import WatchedMoviesList from './WatchedMoviesList';
import Header from './Header';
// import { useMoviesById } from '../useMoviesById';

// const KEY = 'd8bed612';

export default function Home({ movieId }) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(movieId ? movieId : null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  const [loggedInUsername, setLoggedInUsername] = useState('');

  // const {
  //   movies: preselectedMovies,
  //   isLoading: preselectedLoading,
  //   error: preselectedError,
  // } = useMoviesById([
  //   'tt15239678',
  //   'tt12037194',
  //   'tt11389872',
  //   'tt1684562',
  //   'tt21692408',
  // ]);

  const images = [
    {
      src: '../src/assets/img/slider/wish.jpg',
      alt: 'Wish',
    },
    {
      src: '../src/assets/img/slider/dune2.jpg',
      alt: 'Dune',
    },
    {
      src: '../src/assets/img/slider/furiosa.jpg',
      alt: 'Furiosa',
    },
    {
      src: '../src/assets/img/slider/pussinboots.jpg',
      alt: 'Apes',
    },
    {
      src: '../src/assets/img/slider/panda.png',
      alt: 'Panda',
    },
  ];

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

  //Hanle logout
  function handleLogout() {
    localStorage.clear();
    setLoggedInUsername('');
    setWatched([]);
  }

  return (
    <>
      <Header images={images}>
        <NavBar>
          <Logo />
          <Menu />
          <Search query={query} setQuery={setQuery} />
          <UserInfo username={loggedInUsername} onLogout={handleLogout} />
        </NavBar>

        {/* <Slider images={images} /> */}
      </Header>

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
