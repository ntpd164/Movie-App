import Login from './ui/Login';
import Home from './ui/Home';
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
