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
    <div className="z-10 ml-10 rounded-xl border  bg-white px-7 py-3 text-3xl text-text ">
      <span className=" border-r border-gray-500 pr-6 text-[#5a5a5a]">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        className="border-none  bg-transparent pl-6 text-[#414141] placeholder:text-text-dark focus:-translate-y-0.5  focus:outline-none"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default Search;
