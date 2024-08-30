import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

export default function PopularCelebrities({ celebrities }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div id="popular-celebrities" className="mx-[140px] pt-[30px]">
      <div>
        <div className="mb-4 flex">
          <div className="mr-4 rounded-sm border-2 border-primary"></div>
          <h2 className="font-poppins-semibold text-5xl font-semibold text-white">
            Most popular celebrities
          </h2>
          <a className="relative">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="absolute left-2 top-1 ml-4 text-4xl text-white"
            />
          </a>
        </div>
      </div>
      <div>
        <div className="relative">
          <Slider {...settings}>
            {celebrities.map((celebrity, index) => (
              <div key={index} className="px-4">
                <img
                  src={celebrity.src}
                  alt={celebrity.name}
                  className="h-[192px] w-full rounded-full"
                ></img>
                <h2 className="mt-4 flex items-center justify-center text-3xl font-semibold text-white">
                  {celebrity.name}
                </h2>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
