import { useParams } from 'react-router-dom';
import Home from './ui/Home';

export default function SelectedMovie() {
  let { selectedId } = useParams();
  return <Home movieId={selectedId} />;
}
