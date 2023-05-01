import React from "react";

const delay = 2500;

interface SlideshowProps {
  images: string[];
}

export default function Slideshow(props: SlideshowProps): JSX.Element {
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
          prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {props.images.map((image, index) => (
          <div className="slide"
            key={index}
            /*style={{ backgroundImage: `url(${image})` }}*/>
            <img src={image} alt="Alternate text"></img>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {props.images.map((_, idx) => (
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