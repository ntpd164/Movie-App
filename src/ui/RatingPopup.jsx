import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRating';

export default function RatingPopup({
  setShowRating,
  movie,
  setUserRating,
  userRating,
  handleRating,
}) {
  return (
    <div className="fixed left-1/2 top-1/4 z-30 m-4 w-[40rem] -translate-x-1/2 transform rounded-lg bg-background-500 p-4 shadow-lg transition-transform duration-500 ease-out">
      <FontAwesomeIcon
        icon={faStar}
        className="mx-auto mt-10 flex text-[8rem] text-blue-400"
      />
      <div className="absolute right-3 top-2 text-red-dark">
        <button className=" text-5xl " onClick={() => setShowRating(false)}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
      <div className="">
        <p className="my-10 flex justify-center font-poppins-regular text-4xl font-semibold text-primary">
          Please rate the movie!
        </p>
      </div>
      <div className="flex justify-center">
        <StarRating max={10} onSetRating={setUserRating} />
      </div>
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => handleRating(movie)}
          className={`${
            userRating > 0
              ? 'bg-primary text-black'
              : 'pointer-events-none cursor-default bg-background-100'
          } mb-5 block w-[20rem] rounded-md px-8 py-3 font-poppins-semibold text-3xl `}
        >
          Rate
        </button>
      </div>
    </div>
  );
}
