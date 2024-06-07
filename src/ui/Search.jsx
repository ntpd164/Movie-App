import { useRef } from 'react';
import { useKey } from '../useKey';

function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useKey('Enter', () => {
    if (inputElement.current == document.activeElement) {
      inputElement.current.focus();
      setQuery('');
    }
  });

  return (
    <input
      className="rounded-xl px-7 py-4 text-3xl text-text bg-primary-light  placeholder:text-text-dark focus:outline-none focus:shadow-shadow-custom focus:-translate-y-0.5"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
