import Login from './ui/Login';
import Home from './ui/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import MovieDetails from './ui/MovieDetails';
// import SelectedMovie from './SelectedMovie';

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
