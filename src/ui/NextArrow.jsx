import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function NextArrow(props) {
  const { onClick } = props;

  return (
    <div
      className="absolute -right-20 top-[46%] cursor-pointer border p-5 text-4xl"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

export default NextArrow;
