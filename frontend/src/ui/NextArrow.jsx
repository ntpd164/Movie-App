import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function NextArrow(props) {
  const { onClick } = props;

  return (
    <div
      className="absolute top-[46%] cursor-pointer border p-5 text-4xl max-[739px]:-right-10 md:-right-20"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

export default NextArrow;
