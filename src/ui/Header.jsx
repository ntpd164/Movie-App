import { useEffect, useState } from 'react';

export default function Header({ children, images }) {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => {
        return currentImage === images.length - 1 ? 0 : currentImage + 1;
      });
    }, 3000);
    return function () {
      clearInterval(interval);
    };
  }, [images.length]);
  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <div
          className={`header ${index === currentImage ? 'visible' : 'hidden'}`}
          key={index}
        >
          <div
            className="header-image blurred-image"
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
          <div
            className="header-image clear-image"
            style={{ backgroundImage: `url(${image.src})` }}
          ></div>
        </div>
      ))}
      <div className="header-content absolute top-0">{children}</div>
    </div>
  );
}
