import Login from './pages/Login';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import TopPicksOverview from './pages/TopPicksOverview';
import UserProfile from './ui/UserProfile';
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
        path: '/user/watchlist',
        element: <WatchList />,
      },
      // {
      //   path: '/movie/:selectedId',
      //   element: <SelectedMovie />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
