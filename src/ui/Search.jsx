import { useRef } from 'react';
import { useKey } from '../useKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MovieDetails from './MovieDetails';
import Box from './Box';

function Search({
  query,
  setQuery,
  selectedId,
  setSelectedId,
  onCloseMovie,
  onAddWatched,
  watched,
  username,
  movies,
  children,
}) {
  const inputElement = useRef(null);

  useKey('Enter', () => {
    if (inputElement.current == document.activeElement) {
      inputElement.current.focus();
      setQuery('');
    }
  });

  const handleInputChanged = (e) => {
    setQuery(e.target.value);
    setSelectedId(null);
  };

  return (
    <div>
      <div className="relative z-10 ml-10 rounded-xl border  bg-white px-7 py-3 text-3xl text-text ">
        <span className=" border-r border-gray-500 pr-6 text-[#5a5a5a]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          className="border-none  bg-transparent pl-6 text-[#414141] placeholder:text-text-dark focus:-translate-y-0.5  focus:outline-none"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChanged}
        />
      </div>
      {query && movies.length > 0 && (
        <div className="absolute right-[120px] top-[70px] z-50 flex h-[500px] overflow-y-auto">
          {selectedId ? (
            <Box>
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={onCloseMovie}
                onAddWatched={onAddWatched}
                watched={watched}
                username={username}
              />
            </Box>
          ) : null}
          {children}
        </div>
      )}
    </div>
  );
}

export default Search;
