import { useRef } from 'react';
import { useKey } from '../useKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useKey('Enter', () => {
    if (inputElement.current == document.activeElement) {
      inputElement.current.focus();
      setQuery('');
    }
  });

  return (
    <div className="z-10 ml-10 rounded-xl border border-zinc-700 px-7 py-3 text-3xl text-text ">
      <span className=" border-r border-gray-500 pr-6">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        className="  border-none bg-transparent pl-6 placeholder:text-text-dark focus:-translate-y-0.5 focus:shadow-shadow-custom focus:outline-none"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default Search;
