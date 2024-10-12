import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faPlay,
  faCheck,
  faStar,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import BackButton from '../ui/BackButton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../ui/Footer';
import BackToTop from '../ui/BackToTopButton';

export default function WatchListOverview() {
  // const watched = JSON.parse(localStorage.getItem('watched')) || [];
  // console.log(watched);
  const [showPopup, setShowPopup] = useState(false);
  const [showBtnBackToTop, setShowBtnBackToTop] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await fetch('https://movie-app-server-niy5.onrender.com/watchlist/get', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setWatchlist(data.data.watchlist);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchWatchlist();
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtnBackToTop(window.scrollY > innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showPopup]);

  document.title = 'Watchlist Overview';

  // function handleDeleteWatched(id) {
  //   const newWatched = watched.filter((movie) => movie.imdbID !== id);
  //   console.log(newWatched);
  //   localStorage.setItem('watched', JSON.stringify(newWatched));
  //   setShowPopup(false);
  // }

  async function handleDeleteWatchlist(id) {
    try {
      const response = await fetch(`https://movie-app-server-niy5.onrender.com/watchlist/remove`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imdbID: id }),
      });

      if (response.ok) {
        // Xóa thành công, cập nhật lại watchlist
        setWatchlist((prevWatchlist) =>
          prevWatchlist.filter((movie) => movie.imdbID !== id)
        );
        setShowPopup(false);
      } else {
        console.error('Failed to delete movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const navigate = useNavigate();
  return (
    <div>
      {showPopup && <div className="popup-overlay"></div>}
      <BackButton />
      {showBtnBackToTop && <BackToTop />}
      <h1 className="ml-[14rem] mt-20 font-poppins-semibold text-[5rem] font-medium text-white">
        What to watch
      </h1>
      <div className="ml-[12rem] mt-20 flex">
        <div>
          <button
            onClick={() => navigate('/top-picks')}
            className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500"
          >
            top picks
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate('/fan-favorites')}
            className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500"
          >
            fan favorites
          </button>
        </div>

        <div
          onClick={() => navigate('/watchlist')}
          className="relative cursor-pointer"
        >
          <div className="px-10 py-6 font-poppins-semibold text-3xl font-semibold uppercase text-white hover:bg-background-500">
            from your watchlist
          </div>
          <div className="absolute bottom-[0.125rem] w-full border-2 border-blue-400"></div>
        </div>
      </div>
      {watchlist.length === 0 && (
        <div className="mx-auto ml-[14rem] mt-20 font-poppins-regular text-4xl font-medium text-white">
          No movies in your watchlist
        </div>
      )}
      <div className={`mx-[14rem] mt-20 grid grid-cols-6 gap-10`}>
        {watchlist.map((movie, index) => (
          <div key={index} className="">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-[300px] w-full"
            />
            <div className="bg-[#1a1a1a] text-3xl">
              <div className="flex items-center pl-8 pt-6">
                <span className="mr-1">⭐️</span>
                <span>{movie.imdbRating}</span>
                <button className="ml-auto mr-3 cursor-default text-blue-500">
                  <FontAwesomeIcon icon={faStar} />
                </button>
                <span className="mr-11">{movie.userRating}</span>
              </div>
              <p className="overflow-hidden truncate text-ellipsis whitespace-nowrap pl-8 pt-4 font-poppins-semibold font-medium text-white">
                {movie.title}
              </p>
              <div
                onClick={() => {
                  setShowPopup(true);
                  setMovieToDelete(movie.imdbID);
                }}
                className="mx-8 mt-6 flex cursor-pointer items-center justify-center space-x-3 bg-[#2c2c2c] py-2 font-poppins-semibold font-semibold text-[#6588f4] hover:bg-[#414141]"
              >
                <button>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <span>Watchlist</span>
              </div>
              <div className="mx-8 flex py-8">
                <div className="mb-4 mt-5 cursor-pointer rounded-md text-2xl hover:bg-[#333333]">
                  <button className="my-3 ml-5 mr-4">
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                  <span className="mr-5 font-poppins-regular font-semibold">
                    Trailer
                  </span>
                </div>
                <button className="my-1 ml-auto rounded-full px-6 text-4xl hover:bg-[#333333]">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </div>
            </div>
            {showPopup && movieToDelete === movie.imdbID && (
              <div className="fixed left-1/2 top-1/4 z-30 m-4 -translate-x-1/2 transform rounded-lg bg-white p-4 shadow-lg transition-transform duration-500 ease-out">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="mx-auto mt-10 flex text-[8rem] text-red-dark"
                />
                <div className="">
                  <p className="mt-14 flex justify-center font-poppins-regular text-4xl font-semibold text-black">
                    Do you want to delete this movie from your watchlist?
                  </p>
                </div>
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
                  >
                    No
                  </button>
                  <button
                    onClick={() => handleDeleteWatchlist(movie.imdbID)}
                    className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
                  >
                    Yes
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
