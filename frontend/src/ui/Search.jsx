import { useRef, useState } from 'react';
import { useKey } from '../hooks/useKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
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
  const [searchState, setSearchState] = useState(false);

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

  const onCLoseSearch = () => {
    setQuery('');
    setSelectedId(null);
    setSearchState(false);
  }

  return (
    <div className="">
      <div className="relative z-10 ml-40 hidden rounded-xl border bg-white px-7 py-3 text-3xl  text-text sm:mr-[20px] md:ml-28 md:mr-[40px] md:flex md:min-w-[320px] lg:mr-[60px] lg:min-w-[500px] xl:ml-10 xl:min-w-[360px] 2xl:min-w-[420px] min-[1600px]:min-w-[700px] ">
        <span className=" border-r border-gray-500 pr-6 text-[#5a5a5a]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          className="border-none bg-transparent flex-grow pl-6 text-[#414141] placeholder:text-text-dark focus:-translate-y-0.5 focus:outline-none  "
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChanged}
        />
        <div className='hidden md:flex'>
          {query && movies.length > 3 && (
            <div className="absolute right-0 bottom-0 top-[40px] left-0 z-50 flex h-[500px] overflow-y-auto">
              <div className='w-full'>
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
            </div>
          )}
        </div>
      </div>
      <div className="z-50 ml-0  flex cursor-pointer items-center text-3xl  md:ml-40 md:hidden">
        <span
          onClick={() => setSearchState(!searchState)}
          className="ml-20 py-2"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        {searchState && (
          <div className="absolute top-0 left-0 right-0 z-50 h-[40px] bg-background-100">
            <div className="relative w-full">
              <input
                ref={inputElement}
                className="w-full h-full border-none bg-background-100 pl-6 py-7 text-white placeholder:text-text-dark focus:outline-none"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={handleInputChanged}
              />
              <span
                onClick={onCLoseSearch}
                className="absolute top-6 right-4 text-5xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          </div>
        )}
      </div>
      <div className='flex md:hidden'>
        {query && movies.length > 3 && searchState > 0 && (
          <div className="absolute xl:right-[120px] right-0 bottom-0 top-[60px] left-0 z-50 flex h-[500px] overflow-y-auto">
            <div className='w-full'>
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
            </div>
        )}
      </div>
    </div>
  );
}

export default Search;
