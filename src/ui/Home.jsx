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
      src: '../src/assets/img/slider/dune2.jpg',
      title: 'Dune: Part Two',
      genre: 'Action',
      year: '2024',
      time: '2 hours 46 minutes',
      rating: '8.6',
      vote: '449,148',
      plot: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
      alt: 'Dune',
    },
    {
      src: '../src/assets/img/slider/wish.jpg',
      title: 'Wish',
      genre: 'Comedy',
      year: '2023',
      time: '1 hour 35 minutes',
      rating: '5.6',
      vote: '38,595',
      plot: 'A young girl named Asha wishes on a star and gets a more direct answer than she bargained for when a trouble-making star comes down from the sky to join her.',
      alt: 'Wish',
    },
    {
      src: '../src/assets/img/slider/furiosa.jpg',
      title: 'Furiosa: A Mad Max Saga',
      genre: 'Sci-Fi',
      year: '2024',
      time: '2 hours 28 minutes',
      rating: '7.9',
      vote: '70,225',
      plot: 'The origin story of renegade warrior Furiosa before her encounter and teamup with Mad Max.',
      alt: 'Furiosa',
    },
    {
      src: '../src/assets/img/slider/badboys.jpg',
      title: 'Bad Boys: Ride or Die',
      genre: 'Action',
      year: '2024',
      time: '1 hour 55 minutes',
      rating: '7.0',
      vote: '19,267',
      plot: "This Summer, the world's favorite Bad Boys are back with their iconic mix of edge-of-your seat action and outrageous comedy but this time with a twist: Miami's finest are now on the run.",
      alt: 'Bad Boys',
    },
    {
      src: '../src/assets/img/slider/fallguy.jpg',
      title: 'The Fall Guy',
      genre: 'Comedy',
      year: '2024',
      time: '2 hours 6 minutes',
      rating: '7.3',
      vote: '112,173',
      plot: "A down-and-out stuntman must find the missing star of his ex-girlfriend's blockbuster film.",
      alt: 'Fallguy',
    },
    {
      src: '../src/assets/img/slider/panda.png',
      title: 'Kung Fu Panda 4',
      genre: 'Animation',
      year: '2024',
      time: '1 hours 34 minutes',
      rating: '6.3',
      vote: '42,112',
      plot: 'After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior, while a wicked sorceress plans to re-summon all the master villains whom Po has vanquished to the spirit re...',
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
