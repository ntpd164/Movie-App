import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function DeleteWatchedPopup({
  setShowPopupDelete,
  confirmDeleteWatched,
  movie,
}) {
  return (
    <div className="fixed left-1/2 top-1/4 z-30 m-4 -translate-x-1/2 transform rounded-lg bg-background-500 p-4 shadow-lg transition-transform duration-500 ease-out">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="mx-auto mt-10 flex text-[8rem] text-red-dark"
      />
      <div className="mx-auto max-w-xl text-center">
        <p className=" mt-14 font-poppins-regular text-4xl font-semibold text-white">
          Do you want to delete this movie from your watchlist?
        </p>
      </div>
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setShowPopupDelete(false)}
          className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
        >
          No
        </button>
        <button
          onClick={() => confirmDeleteWatched(movie)}
          className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
        >
          Yes
        </button>
      </div>
    </div>
  );
}
