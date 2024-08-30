import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function PrevArrow(props) {
  const { onClick } = props;

  return (
    <div
      className="absolute -left-20 top-[46%] cursor-pointer border p-5 text-4xl"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
}

export default PrevArrow;
