import React from "react";

import image1 from "../../images-places/eii.jpg";
import image2 from "../../images-places/calatrava.jpg";
import image3 from "../../images-places/catedral-oviedo.jpg";
import list from "../map/InfoWindow";
import setList from "../map/InfoWindow";

var pictureURL = [image1, image2, image3];
const delay = 2500;



export default function SlideshowPictures() {
    const [index, setIndex] = React.useState(0);
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => '', 0);
    const timeoutRef = React.useRef(timer);
  
    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    function setList(list:string[]) {
        pictureURL = list;
    }
  
    React.useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === pictureURL.length - 1 ? 0 : prevIndex + 1
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
            {pictureURL.map((image, index) => (
                <div
                className="slide"
                key={index}
                style={{ 
                    backgroundImage: `url(${image})`,  //AQUI ALGO HACE QUE SALTE AVISO EN EL NAVEGADOR
                    /*maxWidth: '100%', 
                    maxHeight: 350, 
                    width: 'auto', 
                    height: 'auto',*/
                    }}
                ></div>
          ))}
        </div>
  
        <div className="slideshowDots">
          {pictureURL.map((_, idx) => (
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
