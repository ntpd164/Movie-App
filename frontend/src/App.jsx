import Login from './pages/Login';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import TopPicksOverview from './pages/TopPicksOverview';
import WatchListOverview from './pages/WatchListOverview';
import FanFavoritesOverview from './pages/FanFavoritesOverview';
import MoviePage from './ui/MoviePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    // element: <Login />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/movie/:selectedId',
        element: <MoviePage />,
      },
      {
        path: '/top-picks',
        element: <TopPicksOverview />,
      },
      {
        path: '/fan-favorites',
        element: <FanFavoritesOverview />,
      },
      {
        path: '/watchlist',
        element: <WatchListOverview />,
      },
      {
        path: '/user/watchlist',
        element: <WatchList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
