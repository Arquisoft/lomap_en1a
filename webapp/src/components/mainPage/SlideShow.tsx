import React from "react";
import image1 from "../../images/placeHolder.png";
import image2 from "../../images/placeHolder.png";
import image3 from "../../images/placeHolder.png";
const colors = [image1, image2, image3];

const delay = 2500;



export default function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timer: ReturnType<typeof setTimeout> = setTimeout(() => '', 0);
  const timeoutRef = React.useRef(timer);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((image, index) => (
          <div
            className="slide"
            key={index}
            style={{ 
                backgroundImage: `url(${image})`  //AQUI ALGO HACE QUE SALTE AVISO EN EL NAVEGADOR
              }}
          ></div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}