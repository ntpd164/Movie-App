import Login from './pages/Login';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import TopPicksOverview from './pages/TopPicksOverview';
import WatchListOverview from './pages/WatchListOverview';
import FanFavoritesOverview from './pages/FanFavoritesOverview';
import UserProfile from './pages/UserProfile';
import MoviePage from './ui/MoviePage';
import Test from './pages/Test';
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
        path: '/user/profile',
        element: <UserProfile />,
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
      {
        path: '/test',
        element: <Test />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
