import Login from './ui/Login';
import Home from './ui/Home';
import UserProfile from './ui/UserProfile';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import MovieDetails from './ui/MovieDetails';
// import SelectedMovie from './SelectedMovie';

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
        element: <UserProfile username={username} />,
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
