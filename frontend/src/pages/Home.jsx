import { useState, useEffect } from 'react';
import { useMovies } from '../hooks/useMovies';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../ui/NavBar';
import Loader from '../ui/Loader';
import Search from '../ui/Search';
import Logo from '../ui/Logo';
import Menu from '../ui/Menu';
// import NumResults from './NumResults';
import UserInfo from '../ui/UserInfo';
import Main from '../ui/Main';
import Box from '../ui/Box';
import MovieList from '../ui/MovieList';
// import MovieDetails from './MovieDetails';
// import WatchedSummary from './WatchedSummary';
// import useLocalStorageState from '../hooks/useLocalStorageState';
// import WatchedMoviesList from './WatchedMoviesList';
import Header from '../ui/Header';
import TopPicks from '../ui/TopPicks';
import FanFavorites from '../ui/FanFavorites';
import PopularCelebrities from '../ui/PopularCelebrities';
import Footer from '../ui/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const KEY = 'd8bed612';

export default function Home({ movieId }) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(movieId ? movieId : null);
  const { movies, isLoading, error } = useMovies(query);

  // const [watched, setWatched] = useLocalStorageState([], 'watched');
  const [watched, setWatched] = useState([]);

  const [username, setUsername] = useState('');

  // const [loggedInUsername, setLoggedInUsername] = useState('');

  // const navigate = useNavigate();

  document.title = 'DN Movie';

  const topPicksMovieIds = [
    'tt0468569',
    'tt0167260',
    'tt0111161',
    'tt0108052',
    'tt0114369',
    'tt0816692',
    'tt1375666',
    'tt1745960',
    'tt0060196',
    'tt0120737',
    'tt0073486',
    'tt0944947',
  ];

  const fanFavoritesMovieIds = [
    'tt22022452',
    'tt12037194',
    'tt12735488',
    'tt15239678',
    'tt1190634',
    'tt1684562',
    'tt23289160',
    'tt11198330',
    'tt19231492',
    'tt12637874',
    'tt17279496',
    'tt2096673',
  ];

  const images = [
    {
      src: '/assets/img/slider/dune2.jpg',
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
      src: '/assets/img/slider/wish.jpg',
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
      src: '/assets/img/slider/furiosa.jpg',
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
      src: '/assets/img/slider/badboys.jpg',
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
      src: '/assets/img/slider/fallguy.jpg',
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
      src: '/assets/img/slider/panda.png',
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

  const celebrities = [
    {
      src: '/assets/img/celebrities/tamayoPerry.jpg',
      name: 'Tamayo Perry',
      role: 'Actor',
    },
    {
      src: '/assets/img/celebrities/martinMull.jpg',
      name: 'Martin Mull',
      role: 'Actor',
    },
    {
      src: '/assets/img/celebrities/emma.jpg',
      name: "Emma D'Arcy",
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/coughlan.jpg',
      name: 'Nicola Coughlan',
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/moriarty.jpg',
      name: 'Erin Moriarty',
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/sutherland.jpg',
      name: 'Jennifer Lawrence',
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/valorie.jpg',
      name: 'Valorie Curry',
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/olivia.jpg',
      name: 'Olivia Cooke',
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/alba.jpg',
      name: 'Jessica Alba',
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/dafne.jpg',
      name: 'Dafne Keen',
      role: 'Actress',
    },
    {
      src: '/assets/img/celebrities/cobbs.jpg',
      name: 'Bill Cobbs',
      role: 'Actor',
    },
    {
      src: '/assets/img/celebrities/adria.jpg',
      name: 'Adria Arjona',
      role: 'Actress',
    },
  ];

  // const {
  //   movies: topPicksMovies,
  //   isLoading: topPicksIsLoading,
  //   error: topPicksError,
  // } = useMoviesById(topPicksMovieIds);

  // const {
  //   movies: fanFavoritesMovies,
  //   isLoading: fanFavoritesIsLoading,
  //   error: fanFavoritesError,
  // } = useMoviesById(fanFavoritesMovieIds);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      console.log('decoded: ', decoded);
      // setLoggedInUsername(decoded.name);
      // console.log('loggedInUsername: ', loggedInUsername);
      setUsername(decoded.name);
      localStorage.setItem('loggedInUsername', decoded.name);
    }
  }, []);

  // useEffect(() => {
  //   const username = localStorage.getItem('loggedInUsername');
  //   if (username) {
  //     setLoggedInUsername(username);
  //   }
  // }, []);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch('https://movie-app-server-niy5.onrender.com/watchlist/get', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setWatched(data.data.watchlist);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchWatchlist();
  }, [token]);

  useEffect(() => {
    console.log('loginSuccess: ', localStorage.getItem('loginSuccess'));
    if (localStorage.getItem('loginSuccess') === 'true') {
      toast.success('Login successful', {
        className: 'large-font-toast',
      });
      localStorage.removeItem('loginSuccess');
    }
  }, []);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    console.log(id);
    // navigate(`/movie/${id}`);
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
    setUsername('');
    setWatched([]);
  }

  return (
    <>
      <ToastContainer />
      <div className="z-10 flex w-full items-center relative justify-between pt-10 lg:hidden">
        <Logo />
        <Menu username={username} />
        <Search
          query={query}
          setQuery={setQuery}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onCloseMovie={handleCloseMovie}
          onAddWatched={handleAddWatched}
          watched={watched}
          username={username}
          movies={movies}
        >
          <Box>
            {isLoading && <Loader />}
            {!isLoading && !error && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {error && <ErrorMessage message={error} />}
          </Box>
        </Search>
        <UserInfo username={username} onLogout={handleLogout} />
      </div>
      <Header images={images}>
        <NavBar>
          <Logo />
          <Menu username={username} />
          <Search
            query={query}
            setQuery={setQuery}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onCloseMovie={handleCloseMovie}
            onAddWatched={handleAddWatched}
            watched={watched}
            username={username}
            movies={movies}
          >
            <Box>
              {isLoading && <Loader />}
              {!isLoading && !error && (
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
              )}
              {error && <ErrorMessage message={error} />}
            </Box>
          </Search>
          <UserInfo username={username} onLogout={handleLogout} />
        </NavBar>

        {/* <Slider images={images} /> */}
      </Header>

      <Main>
        <TopPicks
          username={username}
          topPicksMovieIds={topPicksMovieIds}
          onAddWatched={handleAddWatched}
          onDeleteWatched={handleDeleteWatched}
          watched={watched}
        />
        <FanFavorites
          username={username}
          fanFavoritesMovieIds={fanFavoritesMovieIds}
          onAddWatched={handleAddWatched}
          onDeleteWatched={handleDeleteWatched}
          watched={watched}
        />

        <PopularCelebrities celebrities={celebrities} />
        {/* <Box>
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
              username={username}
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
        </Box> */}
      </Main>
      <Footer />
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
