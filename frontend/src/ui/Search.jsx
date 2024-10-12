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

  return (
    <div className="">
      <div className="relative z-10 ml-40 hidden rounded-xl border bg-white px-7 py-3 text-3xl  text-text sm:mr-[20px] md:ml-28 md:mr-[40px] md:flex md:min-w-[320px] lg:mr-[60px] lg:min-w-[500px] xl:ml-10 xl:min-w-[360px] 2xl:min-w-[660px] ">
        <span className=" border-r border-gray-500 pr-6 text-[#5a5a5a]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          className="border-none bg-transparent pl-6 text-[#414141] placeholder:text-text-dark focus:-translate-y-0.5 focus:outline-none  "
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChanged}
        />
      </div>
      <div className="relative z-50 ml-0  flex cursor-pointer items-center text-3xl  md:ml-40 md:hidden">
        <span
          onClick={() => setSearchState(!searchState)}
          className="ml-20 py-2"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        {searchState && (
          <div className="absolute -top-2 right-[60%] z-50 h-[40px] w-[30rem] bg-background-100 focus:outline-none min-[270px]:right-[40%] min-[270px]:max-w-[250px]  min-[330px]:max-w-[270px] min-[390px]:max-w-[300px] min-[420px]:min-w-[310px] min-[520px]:w-[470px] min-[620px]:w-[570px] ">
            <input
              ref={inputElement}
              className="border-none bg-transparent pl-6  pt-4 text-white placeholder:text-text-dark focus:-translate-y-0.5 focus:outline-none min-[270px]:max-w-[220px] min-[330px]:min-w-[240px] min-[330px]:max-w-[290px] min-[390px]:min-w-[270px] min-[420px]:min-w-[280px] min-[520px]:w-[440px] min-[620px]:w-[540px]"
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={handleInputChanged}
            />
            <span
              onClick={() => setSearchState(!searchState)}
              className="text-4xl"
            >
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
        )}
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
