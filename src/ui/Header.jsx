import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Header({ children, images }) {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => {
        return currentImage === images.length - 1 ? 0 : currentImage + 1;
      });
    }, 3000);
    return function () {
      clearInterval(interval);
    };
  }, [images.length]);

  function handlePrev() {
    setCurrentImage((currentImage) => {
      return currentImage === 0 ? images.length - 1 : currentImage - 1;
    });
  }

  function handleNext() {
    setCurrentImage((currentImage) => {
      return currentImage === images.length - 1 ? 0 : currentImage + 1;
    });
  }

  return (
    <div id="home" className="slider-container">
      {images.map((image, index) => (
        <div
          className={`header ${index === currentImage ? 'visible' : 'hidden'}`}
          key={index}
        >
          <div
            className="header-image blurred-image"
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
          {/* <div className="overlay"></div> */}
          <div
            className="header-image clear-image"
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
          <div className="absolute left-[100px] top-[200px] space-y-4">
            <h2 className=" max-w-[400px] whitespace-normal break-words font-poppins-semibold text-[45px] font-bold text-white">
              {image.title}
            </h2>
            <div className=" flex text-2xl">
              <span className=" mr-3 rounded-md bg-yellow-400 px-2 py-1 font-poppins-semibold font-extrabold text-black">
                IMDb
              </span>
              <div className="relative mt-1">
                <span className=" mr-2  font-medium">{image.rating}</span>
                <span className="mr-3 font-thin">({image.vote})</span>
                <span className=" absolute -top-1 font-extrabold">.</span>
                <span className="ml-5 mr-3 font-light ">{image.year}</span>
                <span className="absolute -top-0.5">|</span>
                <span className="ml-4 mr-3 font-light">{image.time}</span>
                <span className="absolute -top-0.5">|</span>
                <span className="ml-4 font-light">{image.genre}</span>
              </div>
            </div>
            <p className=" max-w-[400px] whitespace-normal break-words text-2xl">
              {image.plot}
            </p>
            <div className=" flex space-x-8 pt-10 text-3xl">
              <button className="z-20 cursor-pointer rounded-xl border border-zinc-400 px-10 py-5 font-poppins-regular font-semibold text-[#d4d4d4]">
                Watch trailer
              </button>
              <div className="z-20 cursor-pointer rounded-xl bg-primary px-10 py-5 font-poppins-regular font-semibold text-[#3c3b3b]">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mr-6 text-[#4b4b4b]"
                />
                <button className="">Watch now</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute left-[100px] top-[600px] flex items-center justify-center space-x-6">
        <button
          className=" z-20 cursor-pointer rounded-md border border-zinc-400 pb-3 pl-3 pr-4 text-5xl"
          onClick={handlePrev}
          style={{ cursor: 'pointer' }}
        >
          {'<'}
        </button>
        <button
          className="z-20 cursor-pointer rounded-md border border-zinc-400 pb-3 pl-4 pr-3 text-5xl"
          onClick={handleNext}
          style={{ cursor: 'pointer' }}
        >
          {'>'}
        </button>
      </div>
      <div className="absolute left-[360px] top-[550px] flex items-center justify-center"></div>
      <div className="header-content absolute top-0">{children}</div>
    </div>
  );
}
