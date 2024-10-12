import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function FailPopup({ setShowPopupFail }) {
  const navigate = useNavigate();
  return (
    <div className="fixed left-1/2 top-1/4 z-30 m-4 -translate-x-1/2 transform rounded-lg bg-background-500 p-4 shadow-lg transition-transform duration-500 ease-out">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="mx-auto mt-10 flex text-[8rem] text-red-dark"
      />
      <div className="">
        <p className="mt-14 flex justify-center font-poppins-regular text-4xl font-semibold text-white">
          Movie already added to list!
        </p>
        <p className="mt-2 flex justify-center font-poppins-medium text-3xl font-light text-[#9a9999]">
          Check your watchlist for more details.
        </p>
      </div>
      <div className="mt-10 flex justify-center">
        <button>
          <span
            onClick={() => navigate('/user/watchlist')}
            className="block w-[20rem] rounded-md bg-blue-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-blue-700"
          >
            Go to watchlist
          </span>
        </button>
        <button>
          <span
            onClick={() => setShowPopupFail(false)}
            className="ml-20 block w-[20rem] rounded-md bg-green-500 px-8 py-3 font-poppins-semibold text-3xl text-white hover:bg-green-600"
          >
            OK
          </span>
        </button>
      </div>
    </div>
  );
}
