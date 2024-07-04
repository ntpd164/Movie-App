import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

export default function PopularCelebrities({ celebrities }) {
  const [startIndex, setStartIndex] = useState(0);
  const moviesPerPage = 6;

  const handleNext = () => {
    const newIndex = startIndex + moviesPerPage;
    if (newIndex < celebrities.length) {
      setStartIndex(newIndex);
    } else {
      setStartIndex(0); // Reset về đầu khi hết phim
    }
  };

  const currentCelebrities = celebrities.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  return (
    <div id="popular-celebrities" className="mx-[140px] mb-[200px] pt-[30px]">
      <div>
        <div className="mb-4 flex">
          <div className="mr-4 rounded-sm border-2 border-primary"></div>
          <h2 className="font-poppins-semibold text-5xl font-semibold text-white">
            Most popular celebrities
          </h2>
          <a className="relative">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="absolute left-2 top-1 ml-4 text-4xl text-white"
            />
          </a>
        </div>
      </div>
      <div>
        <div className="relative mx-auto mt-20 grid grid-cols-6 gap-10">
          {currentCelebrities.map((celebrity, index) => (
            <div key={index} className="">
              <img
                src={celebrity.src}
                alt={celebrity.name}
                className="h-[192px] w-full rounded-full"
              ></img>
              <h2 className="mt-4 flex items-center justify-center text-3xl font-semibold text-white">
                {celebrity.name}
              </h2>
            </div>
          ))}
          <button
            className="absolute -right-24 top-[44%] z-20 cursor-pointer rounded-md border border-zinc-400 px-6 pb-3 pt-1 text-[30px]"
            onClick={handleNext}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
