import { useParams } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import NavBar from './NavBar';
import Search from './Search';

export default function MoviePage() {
  const { selectedId } = useParams();
  return (
    <div>
      <NavBar>
        <Search />
      </NavBar>
      <MovieDetails selectedId={selectedId} />
    </div>
  );
}
