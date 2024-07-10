import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      className="ml-20 mt-20 w-[8%] cursor-pointer rounded-lg bg-primary px-6 py-4 font-poppins-semibold text-4xl font-semibold text-black hover:bg-[#deca17]"
    >
      <button>
        <FontAwesomeIcon icon={faArrowLeft} className="" />
      </button>
      <span className="ml-4">Back</span>
    </div>
  );
}
