import Login from './pages/Login';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import UserProfile from './ui/UserProfile';
import MoviePage from './ui/MoviePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const username = localStorage.getItem('loggedInUsername');

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
        path: '/watchlist',
        element: <WatchList username={username} />,
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
