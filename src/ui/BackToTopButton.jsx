import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className="fixed left-[35%] top-10 z-10 w-[130px] cursor-pointer rounded-full bg-primary py-4 pl-5 pr-4 font-poppins-bold text-2xl font-medium text-black hover:bg-[#deca17] sm:left-[46%]"
    >
      <FontAwesomeIcon
        icon={faChevronUp}
        className="fixed top-[37px] text-3xl"
      />
      <button className="ml-10">Back to top</button>
    </div>
  );
}
